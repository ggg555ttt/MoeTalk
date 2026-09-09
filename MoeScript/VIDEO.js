/*@MoeScript/VIDEO.js@*/
/**
 * HEVC 角色头像动态替换脚本
 * 
 * 【核心功能】
 * 拦截网页中对特定角色头像（CharFace）静态图片（如 .webp）的请求，
 * 通过读取 manifest.json 映射表，将请求重定向到对应的 HEVC 编码视频文件，
 * 并在前端通过 <video> + <canvas> 提取指定帧，转换为 Data URL 替换原图片。
 * 
 * 【主要优势】
 * 1. 节省带宽：视频压缩率远高于大量零散的静态图片。
 * 2. 无感替换：通过劫持 src setter、setAttribute 和 fetch，实现对业务代码的零侵入。
 * 3. 性能优化：内置 Video 实例复用、帧缓存、请求队列串行化，避免重复解码和 Seek 冲突。
 */

const VIDEO =
{
	list: {},
	info: {},                  // 当前使用的主 manifest 对象
	downVideos: new Set(),     // 重新下载的视频文件
	videos: new Map(),         // 缓存已创建的 <video> 元素及其上下文 (Map<videoUrl, entry>)
	failedVideos: new Set(),   // 记录加载或解码失败的 video URL，避免重复尝试
	failedFrames: new Set(),   // 缺失的帧，避免写入缓存
	fallbacks: new Set(),      // 记录已通过 Service Worker 缓存的回退资源 URL
	observer: null,            // DOM MutationObserver 实例
	srcPatched: false,         // 标记 src setter 是否已被劫持
	fetchPatched: false        // 标记 fetch 是否已被劫持
};
(function()
{
	if(!localStorage['调试模式'])return
	"use strict";

	// 允许外部通过 window.mtHevcCharFaceConfig 传入自定义配置
	const userConfig = window.mtHevcCharFaceConfig || {};
	
	// 1x1 像素的透明 GIF，用于在异步提取帧期间占位，防止图片闪烁或显示破损图标
	const BLANK_IMAGE = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";
	
	// 缓存原生 HTMLImageElement.prototype.src 的属性描述符，用于绕过劫持直接赋值
	const imageSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");
	
	// 缓存原生 setAttribute 方法
	const originalSetAttribute = Element.prototype.setAttribute;
	
	// 缓存原生 fetch 方法
	const originalFetch = typeof window.fetch === "function" ? window.fetch.bind(window) : null;


	// 启动核心劫持逻辑
	patchImageSourceHooks();
	patchFetchHook();

	// 根据文档加载状态决定执行时机
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", start, { once: true });
	} else {
		start();
	}

	/**
	 * 规范化目录级别的资源路径
	 * 提取包含 "GameData/" 且包含 TestFace 的路径，去除查询参数和哈希
	 * @param {string} source 原始路径
	 * @returns {string|null} 规范化后的路径，若不匹配规则则返回 null
	 */
	function normalizeDirectorySource(source)
	{
		if (!source) return null;
		let raw = String(source);
		let matchIndex = raw.lastIndexOf("GameData/");
		if (matchIndex < 0) return null;
		
		// 截取 GameData/ 之后的部分，并去除 URL 参数和锚点，统一斜杠方向
		let normalized = raw.slice(matchIndex).split("?")[0].split("#")[0].replaceAll("\\", "/");
		
		// 必须是 CharFace 目录下的资源
		if(!normalized.includes(TestFace))return null;
		if(normalized.endsWith("/"))normalized = normalized.slice(0, -1);
		
		try
		{
			normalized = decodeURIComponent(normalized);
		}catch(error){}// 解码失败时保留原始字符串，避免崩溃
		return normalized;
	}

	/**
	 * 规范化完整的图片资源路径
	 * @param {string} source 原始路径
	 * @returns {string|null} 规范化后的路径，且必须以 .webp 结尾，否则返回 null
	 */
	function normalizeSource(source)
	{
		let normalized = normalizeDirectorySource(source);
		if (!normalized) return null;
		if (!normalized.toLowerCase().endsWith(".webp")) return null;
		return normalized;
	}

	/**
	 * 从 manifest 中解析特定图片的帧信息
	 * @param {string} source 原始图片路径
	 * @returns {Object|null} 包含 frameIndex, videoUrl, fps 等信息的对象，或标记 missing 的对象
	 */
	function getFrameInfoFromManifest(source)
	{//#
		let CharFaceId, frameIndex, isPlus = false
		if(source && source.includes(TestFace))
		{
			CharFaceId = source.split(TestFace).pop().replace('.webp','').split('/')
			frameIndex = CharFaceId.pop();
			isPlus = CharFaceId.length > 1
			CharFaceId = CharFaceId.join('/');
		}else return null;

		return {
			CharFaceId: CharFaceId,
			frameIndex: frameIndex,
			frameName: frameIndex,
			isPlus: isPlus,
			videoUrl: `GameData/${GAME}/Video/${CharFaceId}.mp4`,
			normalized: source
		};
	}

	/**
	 * 绕过劫持逻辑，直接设置 image 的 src 属性
	 * 通过设置 bypass 标志位，防止触发我们自己的 setter 导致无限递归
	 */
	function setImageSourceDirect(image, source) {
		if (!image || !imageSrcDescriptor || !imageSrcDescriptor.set) return;
		image.dataset.hevcCharfaceBypass = "1";
		try {
			imageSrcDescriptor.set.call(image, source);
		} finally {
			delete image.dataset.hevcCharfaceBypass;
		}
	}

	/**
	 * 绕过劫持逻辑，直接调用原生的 setAttribute 设置 src
	 */
	function setImageAttributeDirect(image, source) {
		if (!image) return;
		image.dataset.hevcCharfaceBypass = "1";
		try {
			originalSetAttribute.call(image, "src", source);
		} finally {
			delete image.dataset.hevcCharfaceBypass;
		}
	}

	/**
	 * 将图片替换任务加入异步队列
	 * @param {HTMLImageElement} image 目标图片元素
	 * @param {string} source 原始图片源
	 * @param {boolean} forceBlank 是否在等待期间强制显示空白占位图
	 * @returns {boolean} 是否成功接管了替换流程
	 */
	function queueImageReplacement(image, source, forceBlank = true)
	{
		const normalized = normalizeSource(source);
		if (!normalized) return false;
		
		// 如果已经是降级状态且源相同，避免重复处理
		if (image.dataset.hevcCharfaceState === "fallback" && image.dataset.hevcCharfaceSource === normalized) return false;
		
		const frameInfo = getFrameInfoFromManifest(normalized);
		if (frameInfo && frameInfo.missing) {
			image.dataset.hevcOriginalSrc = source;
			image.dataset.hevcCharfaceSource = normalized;
			image.dataset.hevcCharfaceState = "fallback";
			return false;
		}

		// 【关键防竞态机制】：使用递增的 requestId，确保异步回调只处理最后一次请求的结果
		// 防止快速切换 src 时，旧的慢请求覆盖了新的快请求的结果
		const requestId = String((parseInt(image.dataset.hevcRequestId || "0", 10) || 0) + 1);
		image.dataset.hevcRequestId = requestId;
		image.dataset.hevcOriginalSrc = source;
		image.dataset.hevcCharfaceSource = normalized;
		image.dataset.hevcCharfaceState = "processing";

		if (forceBlank) {
			setImageSourceDirect(image, BLANK_IMAGE);
			setImageAttributeDirect(image, BLANK_IMAGE);
		}

		// 异步执行帧提取，避免阻塞主线程
		Promise.resolve().then(async function()
		{
			const dataUrl = await getFrameDataUrl(normalized);
			// 检查 requestId 是否匹配，不匹配说明期间 src 又被修改了，直接丢弃结果
			if (image.dataset.hevcRequestId !== requestId) return;

			if (dataUrl) {
				image.dataset.hevcCharfaceState = "done";
				syncFallbackCache(normalized, dataUrl);
				setImageSourceDirect(image, dataUrl);
				setImageAttributeDirect(image, dataUrl);
				return;
			}

			// 提取失败，降级为原图
			image.dataset.hevcCharfaceState = "fallback";
			setImageSourceDirect(image, source);
			setImageAttributeDirect(image, source);
		}).catch(function(error) {
			if (image.dataset.hevcRequestId !== requestId) return;
			image.dataset.hevcCharfaceState = "fallback";
			console.warn("[HEVC_CHARFACE] queued replacement failed", error);
			setImageSourceDirect(image, source);
			setImageAttributeDirect(image, source);
		});

		return true;
	}

	/**
	 * 劫持 HTMLImageElement 的 src 属性 setter 和 setAttribute 方法
	 */
	function patchImageSourceHooks()
	{
		if (VIDEO.srcPatched || !imageSrcDescriptor || !imageSrcDescriptor.set) return;

		// 劫持 src 属性赋值
		Object.defineProperty(HTMLImageElement.prototype, "src", {
			configurable: imageSrcDescriptor.configurable,
			enumerable: imageSrcDescriptor.enumerable,
			get: imageSrcDescriptor.get,
			set: function(value) {
				// 检查 bypass 标志，如果是内部调用则放行
				if ((this.dataset && this.dataset.hevcCharfaceBypass === "1") || this.name) {
					imageSrcDescriptor.set.call(this, value);
					return;
				}
				// 尝试接管替换，如果接管成功（返回 true），则阻止原生赋值
				if (queueImageReplacement(this, value)) return;
				// 否则交由原生逻辑处理
				imageSrcDescriptor.set.call(this, value);
			}
		});

		// 劫持 setAttribute 方法
		Element.prototype.setAttribute = function(name, value) {
			if (this && this.tagName === "IMG" && String(name).toLowerCase() === "src" && !this.name) {
				if (this.dataset && this.dataset.hevcCharfaceBypass === "1") {
					return originalSetAttribute.call(this, name, value);
				}
				if (queueImageReplacement(this, value)) return;
			}
			return originalSetAttribute.call(this, name, value);
		};

		VIDEO.srcPatched = true;
	}

	/**
	 * 劫持 window.fetch 方法
	 * 当业务代码通过 fetch 请求被管理的图片时，直接返回提取好的 Data URL 构成的 Response
	 */
	function patchFetchHook()
	{
		if (VIDEO.fetchPatched || !originalFetch) return;

		window.fetch = async function(input, init) {
			const requestMethod = getFetchMethod(input, init);
			// 仅拦截 GET 请求
			if (requestMethod && requestMethod !== "GET") return originalFetch(input, init);

			const source = getFetchSource(input);
			const normalized = normalizeSource(source);
			// 如果不是目标资源，放行原生请求
			if (!normalized) return originalFetch(input, init);

			// 尝试获取帧的 Data URL
			const dataUrl = await getFrameDataUrl(normalized);
			if (!dataUrl) return originalFetch(input, init);

			// 成功获取则同步到 Service Worker 缓存，并返回伪造的 Response
			syncFallbackCache(normalized, dataUrl);
			return createFetchResponse(dataUrl, normalized);
		};

		VIDEO.fetchPatched = true;
	}

	function getFetchMethod(input, init) {
		const method = (init && init.method) || (input && input.method) || "GET";
		return String(method).toUpperCase();
	}

	function getFetchSource(input) {
		if (!input) return null;
		if (typeof Request !== "undefined" && input instanceof Request) return input.url;
		if (typeof URL !== "undefined" && input instanceof URL) return input.href;
		return String(input);
	}

	/**
	 * 根据 Data URL 创建一个伪造的 Fetch Response 对象
	 */
	async function createFetchResponse(dataUrl, source)
	{
		const response = await originalFetch(dataUrl);
		if (!response.ok) return response;

		const blob = await response.blob();
		return new Response(blob, {
			status: 200,
			statusText: "OK",
			headers:
			{
				"Content-Type": blob.type || "image/png",
				"Cache-Control": "public, max-age=31536000, immutable",
				"X-MT-Hevc-CharFace": "1", // 自定义响应头，标记此响应由本脚本生成
				"X-MT-Hevc-CharFace-Source": source
			}
		});
	}

	/**
	 * 解析资源对应的帧信息（包含等待 manifest 加载）
	 */
	async function resolveFrameInfo(source)
	{
		const frameInfo = getFrameInfoFromManifest(source);
		if (!frameInfo || frameInfo.missing || GAME === 'NONE') return null;

		let CharFaceId = frameInfo.CharFaceId
		let frameIndex = frameInfo.frameIndex
		let videoUrl = frameInfo.videoUrl

		// 初始化一个对象，专门用来缓存 Promise
		if(!VIDEO.cfPromises)VIDEO.cfPromises = {};
		if(!VIDEO.info[GAME])VIDEO.info[GAME] = {};
		if(!VIDEO.info[GAME][CharFaceId])VIDEO.info[GAME][CharFaceId] = [[],0];
		if(!VIDEO.list[GAME] && localStorage[GAME+'/Char'])
		{
			VIDEO.list[GAME] = new Set();
			let ARR = JSON.parse(pako.inflate(localStorage[GAME+'/Char'],{to:'string'}))
			for(let id in ARR.info)
			{
				if(ARR.info[id][1])
				{
					for(let ai=0,al=ARR.info[id][1].length;ai<al;ai++)
					{
						let page = ARR.info[id][1][ai]
						for(let pi=0,pl=page.length;pi<pl;pi++)
						{
							let cf = page[pi][2]
							let img = page[pi][0]
							if(localStorage['调试模式'] && typeof page[pi][3] == 'number')
							{
								const charid = ARR.info[id][0][3]
								if(typeof img == 'number')img = '-'+img
								else if(img != '')img = '_'+img
								img = `CFID_${page[pi][3]}/CharID_${charid}${img}`;//拓展差分
							}
							VIDEO.list[GAME].add(img)
						}
					}
					
				}
			}
		}
		// 如果该 ID 还没有对应的 Promise，说明是第一次请求，开始加载
		if(!VIDEO.cfPromises[CharFaceId] || VIDEO.failedVideos.has(videoUrl))
		{
			VIDEO.cfPromises[CharFaceId] = (async () =>
			{
				try
				{
					if(VIDEO.failedVideos.has(videoUrl) && !VIDEO.downVideos.has(videoUrl))
					{
						VIDEO.downVideos.add(videoUrl)//防止视频重复下载
						VIDEO.videos.delete(videoUrl)//删除旧视频件缓存
						VIDEO.failedVideos.delete(videoUrl)//删除标记
						if(!Caches.缓存)Caches.缓存 = await caches.open('缓存');
						await Caches.缓存.delete(videoUrl)
					}
					let json = await getfile(videoUrl)
					if(本地 && !json)//本地不存在，就将网络资源下载到本地
					{
						json = await getfile(`${MoeTalkURL}/${videoUrl}`)//$ajax
						await 保存文件(videoUrl,json)
					}
					json = JSON.parse(await ZipToJson(json));
					// json[0] = []//测试
					VIDEO.info[GAME][CharFaceId] = json;
					
				}
				catch(error)
				{
					console.error(`加载 ${CharFaceId} 失败:`, error);
					// 如果加载失败，必须从缓存中移除，否则后续请求会永远卡在这个失败的 Promise 上
					delete VIDEO.cfPromises[CharFaceId]; 
					throw error; // 继续抛出错误，让调用方知道失败了
				}
			})();
		}
		// 无论是正在加载还是已经加载完成，都 await 这个 Promise
		// 如果正在加载，这里会暂停等待；如果已经加载完，这里会瞬间通过
		await VIDEO.cfPromises[CharFaceId];
		if(!frameInfo.isPlus)frameInfo.frameIndex = VIDEO.info[GAME][CharFaceId][0].indexOf(frameIndex)
		return frameInfo;
	}

	/**
	 * 获取或创建 Video 元素的管理条目 (单例模式)
	 * @param {string} videoUrl 视频 URL
	 * @returns {Object} Video 管理条目
	 */
	function getVideoEntry(videoUrl)
	{
		if(VIDEO.videos.has(videoUrl))return VIDEO.videos.get(videoUrl);

		const video = document.createElement("video");
		video.preload = "auto";
		video.muted = true;
		video.playsInline = true;
		video.crossOrigin = "anonymous";
		// 将 video 元素隐藏并移出可视区域，避免影响页面布局
		video.style.cssText = "position:fixed;left:-99999px;top:-99999px;width:1px;height:1px;opacity:0;pointer-events:none;";
		(document.body || document.documentElement).appendChild(video);

		const entry = {
			videoUrl: videoUrl,
			video: video,
			cache: new Map(),        // 缓存已提取的帧 (frameIndex -> dataUrl)
			failed: false,           // 标记该视频是否已失效
			queue: Promise.resolve(),// 串行化 seek 操作，防止并发 seek 导致冲突
			canvas: document.createElement("canvas"),
			ctx: null
		};
		entry.ctx = entry.canvas.getContext("2d");
		
		// 包装一个 Promise 用于等待视频元数据加载完成
		entry.readyPromise = new Promise(function(resolve, reject)
		{
			let resolved = false;
			function cleanup()
			{
				video.removeEventListener("loadedmetadata", onReady);
				video.removeEventListener("loadeddata", onReady);
				video.removeEventListener("error", onError);
			}
			function onReady()
			{
				if (resolved) return;
				resolved = true;
				cleanup();
				resolve(video);
			}
			function onError()
			{
				cleanup();
				entry.failed = true;
				VIDEO.failedVideos.add(videoUrl);
				reject(new Error("Video load failed: " + videoUrl));
			}
			video.addEventListener("loadedmetadata", onReady);
			video.addEventListener("loadeddata", onReady);
			video.addEventListener("error", onError);
		});

		video.src = videoUrl;
		video.load();
		VIDEO.videos.set(videoUrl, entry);
		return entry;
	}

	/**
	 * 将成功提取的 Data URL 通知 Service Worker 进行缓存
	 * 这样后续原生的网络请求也能直接命中缓存，提升整体性能
	 */
	function syncFallbackCache(source, dataUrl)
	{
		if(dataUrl === BLANK_IMAGE || !dataUrl || !navigator.serviceWorker || 本地)return;
		let absoluteUrl = "";
		try
		{
			absoluteUrl = new URL(source, window.location.href).href;
		}catch(error){return;}
		if(VIDEO.fallbacks.has(source))return;
		VIDEO.fallbacks.add(source);

		const payload =
		{
			type: "MT_HEVC_CHARFACE_CACHE_PUT",
			url: absoluteUrl,
			dataUrl: dataUrl
		};

		Promise.resolve(navigator.serviceWorker.ready).then(function(registration)
		{
			const target = navigator.serviceWorker.controller || registration.active || registration.waiting;
			if(!target)
			{
				VIDEO.fallbacks.delete(source);
				return;
			}
			target.postMessage(payload);
		}).catch(() => VIDEO.fallbacks.delete(source));
	}

	/**
	 * 核心帧提取逻辑：控制 video 跳转到指定帧并绘制到 canvas
	 * @param {Object} entry Video 管理条目
	 * @param {number|Object} frameIndex 帧索引或包含 frameIndex 和 fps 的对象
	 * @returns {Promise<string>} 提取出的图片 Data URL
	 */
	async function captureFrame(entry, frameInfo)
	{
		const video = entry.video;
		const frameNumber = frameInfo.frameIndex;
		await entry.readyPromise;//加载视频
		// 【移动端兼容性 Hack】
		// 某些移动浏览器在 t=0 时报告视频已加载，但实际绘制到 canvas 时是空白帧。
		// 将 seek 时间微微向前偏移 (epsilon)，可以保持在第 0 帧的范围内，同时大幅提高首帧提取的可靠性。
		const frameEpsilon = 1000;
		const seekTime = frameNumber <= 0 ? 0.001 : (frameNumber*100+1)/frameEpsilon;
		const 缺帧 = frameNumber/10 >= video.duration || frameNumber < 0
		if(缺帧)
		{
			VIDEO.failedFrames.add(frameInfo.normalized)
			const 缺帧 = !VIDEO.failedVideos.has(frameInfo.videoUrl)
			if(缺帧 && !VIDEO.downVideos.has(frameInfo.videoUrl))
			{
				VIDEO.failedVideos.add(frameInfo.videoUrl)
			}
			return BLANK_IMAGE
		}
		await new Promise(function(resolve, reject)
		{
			let timeoutId = 0;

			function cleanup()
			{
				video.removeEventListener("seeked", onSeeked);
				video.removeEventListener("error", onError);
				if(timeoutId)clearTimeout(timeoutId);
			}

			function onSeeked()
			{
				cleanup();
				resolve();
			}

			function onError()
			{
				cleanup();
				reject(new Error("Video seek failed"));
			}

			video.pause();
			// 如果当前时间已经非常接近目标时间且已就绪，直接跳过 seek
			if(Math.abs(video.currentTime - seekTime) < 0.0001 && video.readyState >= 2)
			{
				resolve();
				return;
			}

			// 设置超时保护，防止 seek 永远不触发
			timeoutId = setTimeout(function() {
				cleanup();
				reject(new Error("Video seek timeout"));
			}, 10000);

			video.addEventListener("seeked", onSeeked);
			video.addEventListener("error", onError);
			
			
			video.currentTime = seekTime;
		});

		// 确保 canvas 尺寸与视频实际分辨率一致
		if (entry.canvas.width !== video.videoWidth || entry.canvas.height !== video.videoHeight) {
			entry.canvas.width = video.videoWidth;
			entry.canvas.height = video.videoHeight;
		}

		entry.ctx.clearRect(0, 0, entry.canvas.width, entry.canvas.height);
		entry.ctx.drawImage(video, 0, 0);
		return entry.canvas.toDataURL("image/png");
	}

	/**
	 * 获取指定来源图片的帧 Data URL
	 * 包含多级缓存和并发控制
	 */
	async function getFrameDataUrl(source)
	{
		const frameInfo = await resolveFrameInfo(source);//视频存在
		if(!frameInfo)return null;

		const entry = getVideoEntry(frameInfo.videoUrl);
		// 1. 检查内存缓存，如果已提取过直接返回
		if(entry.cache.has(frameInfo.frameIndex))return entry.cache.get(frameInfo.frameIndex);

		// 2. 使用 entry.queue 串行化提取任务
		// 防止多个相同的图片同时请求同一帧时，触发多次并发的 video seek 操作导致性能浪费或画面错乱
		const dataUrl = await (entry.queue = entry.queue.then(async function()
		{
			// 再次检查缓存（双重检查锁定模式），因为排队期间可能已被其他请求提取完毕
			if (entry.cache.has(frameInfo.frameIndex)) return entry.cache.get(frameInfo.frameIndex);

			const captured = await captureFrame(entry, frameInfo);
			if(!VIDEO.failedFrames.has(source))entry.cache.set(frameInfo.frameIndex, captured);
			return captured;
		}).catch(async function(error)
		{
			//视频缺帧
			//captureFrame会将缺失帧改为空白，此处可能没用了
			return null;
		}));

		if(dataUrl)return dataUrl;

		return null;
	}

	/**
	 * 手动对单个图片元素应用替换逻辑
	 */
	async function applyToImage(image) {
		if (!image || image.nodeType !== 1 || image.tagName !== "IMG" || image.name) return;

		const originalSource = image.dataset.hevcOriginalSrc || image.getAttribute("src") || image.currentSrc || image.src;
		const normalized = normalizeSource(originalSource);

		if (!normalized) return;
		
		const frameInfo = getFrameInfoFromManifest(normalized);
		if (frameInfo && frameInfo.missing) {
			image.dataset.hevcOriginalSrc = originalSource;
			image.dataset.hevcCharfaceSource = normalized;
			image.dataset.hevcCharfaceState = "fallback";
			return;
		}
		
		// 避免对正在处理、已完成或已降级的相同资源重复操作
		if (image.dataset.hevcCharfaceState === "processing" && image.dataset.hevcCharfaceSource === normalized) return;
		if (image.dataset.hevcCharfaceState === "done" && image.dataset.hevcCharfaceSource === normalized) return;
		if (image.dataset.hevcCharfaceState === "fallback" && image.dataset.hevcCharfaceSource === normalized) return;
		
		queueImageReplacement(image, originalSource, false);
	}

	/**
	 * 扫描指定 DOM 节点及其子节点中的所有图片并尝试应用替换
	 */
	function scanNode(node) {
		if (!node || node.nodeType !== 1) return;
		if (node.tagName === "IMG") applyToImage(node);
		if (node.querySelectorAll) {
			node.querySelectorAll("img").forEach(function(image) {
				applyToImage(image);
			});
		}
	}

	/**
	 * 劫持宿主环境可能存在的图片错误处理函数 (如 window.IMAGE_error)
	 * 在图片原生加载失败时，尝试作为最后的手段进行修复
	 */
	function patchImageError() {
	    // 1. 防止重复打补丁：检查 IMAGE_error 是否为函数，且是否已经包含 _hevcPatched 标记
	    if (typeof window.IMAGE_error !== "function" || window.IMAGE_error._hevcPatched) return;

	    // 2. 保存原始的 IMAGE_error 函数引用，以便在需要时回退调用
	    const original = window.IMAGE_error;

	    // 3. 定义新的异步拦截函数，用于替换原始的全局错误处理函数
	    const patched = async function (image, play) {
	        // 兼容处理：如果传入的是事件对象，则取 target，否则直接取 image 本身作为目标 DOM 元素
	        const target = image && image.target ? image.target : image;

	        if (target) {
	            // 获取原始的图片 src。优先使用之前缓存的 hevcOriginalSrc，否则读取当前的 src 属性
	            const originalSource = target.dataset && target.dataset.hevcOriginalSrc 
	                ? target.dataset.hevcOriginalSrc 
	                : (target.getAttribute && target.getAttribute("src")) || target.src;

	            // 对原始 src 进行标准化处理（通常用于生成备用图片的路径，如将视频帧路径转为立绘路径）
	            const normalized = normalizeSource(originalSource);
	            
	            // 从资源清单（manifest）中获取当前帧的详细信息
	            const frameInfo = getFrameInfoFromManifest(normalized);

	            // 【场景 A】：如果清单中明确标记该帧缺失（missing），则进入回退（fallback）逻辑
	            if (frameInfo && frameInfo.missing) {
	                target.dataset.hevcOriginalSrc = originalSource;       // 备份原始 src，防止丢失
	                target.dataset.hevcCharfaceSource = normalized || "";  // 设置备用 src（如角色立绘 charface）
	                target.dataset.hevcCharfaceState = "fallback";         // 标记当前状态为 fallback（回退中）
	                return original.apply(this, arguments);                // 执行原始的错误处理逻辑
	            }

	            // 【场景 B】：防死循环机制。如果当前已经是 fallback 状态，且当前 src 就是备用 src，说明备用图也加载失败了
	            if (normalized && target.dataset && 
	                target.dataset.hevcCharfaceState === "fallback" && 
	                target.dataset.hevcCharfaceSource === normalized) {
	                return original.apply(this, arguments); // 直接执行原始错误处理，不再重试，防止无限循环
	            }

	            // 【场景 C】：尝试异步获取该帧的 Data URL（可能是通过 Canvas 重新渲染、或从缓存解码得到的 base64/Blob 数据）
	            const dataUrl = await getFrameDataUrl(normalized);
	            
	            if (dataUrl) {
	                target.dataset.hevcCharfaceState = "done"; // 标记处理完成
	                if (!target.dataset.hevcOriginalSrc) {
	                    target.dataset.hevcOriginalSrc = originalSource; // 确保原始 src 被备份
	                }
	                // 将图片的 src 直接替换为获取到的 Data URL，从而绕过网络请求修复显示
	                setImageSourceDirect(target, dataUrl);
	                // 直接设置 DOM 属性（可能是为了绕过 Vue/React 等框架的虚拟 DOM 拦截，强制刷新视图）
	                setImageAttributeDirect(target, dataUrl);
	                return; // 修复成功，拦截结束
	            }
	        }
	        
	        // 【兜底逻辑】：如果 target 不存在，或上述修复手段均失败（如获取 dataUrl 失败），则调用原始的 IMAGE_error 处理函数
	        return original.apply(this, arguments);
	    };

	    // 4. 给新函数打上标记，防止 patchImageError 被多次调用时重复 patch
	    patched._hevcPatched = true;
	    
	    // 5. 用新函数覆盖全局的 IMAGE_error，完成拦截
	    window.IMAGE_error = patched;
	}

	/**
	 * 脚本启动入口
	 */
	function start() {
		patchImageError();
		
		// 扫描并处理当前页面已有的图片
		scanNode(document.documentElement);

		// 启动 DOM 监听，自动处理动态插入的图片或 src 属性的变更
		VIDEO.observer = new MutationObserver(function(records) {
			records.forEach(function(record) {
				if (record.type === "attributes") {
					applyToImage(record.target);
					return;
				}

				record.addedNodes.forEach(function(node) {
					scanNode(node);
				});
			});
		});

		VIDEO.observer.observe(document.documentElement, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ["src"] // 仅监听 src 属性变化，提升性能
		});
	}
})();