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

// 缓存原生 HTMLImageElement.prototype.src 的属性描述符，用于绕过劫持直接赋值
const imageSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");

/**
 * 规范化目录级别的资源路径
 * 提取包含 "GameData/" 且包含 '/CharFace/' 的路径，去除查询参数和哈希
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
	if(!normalized.includes('/CharFace/'))return null;
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
	if(!VIDEO.list[GAME])VIDEO.list[GAME] = new Set();
	if(localStorage[GAME+'/Char'])
	{
		for(let id in 角色信息.info)
		{
			if(角色信息.info[id][1])
			{
				for(let ai=0,al=角色信息.info[id][1].length;ai<al;ai++)
				{
					let page = 角色信息.info[id][1][ai]
					for(let pi=0,pl=page.length;pi<pl;pi++)
					{
						let cf = page[pi][2]
						let img = page[pi][0]
						if(typeof page[pi][3] == 'number')
						{
							const charid = 角色信息.info[id][0][3]
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
	let CharFaceId, frameIndex, isPlus = false
	if(source && source.includes('/CharFace/'))
	{
		CharFaceId = source.split('/CharFace/').pop().replace('.webp','').split('/')
		frameIndex = CharFaceId.pop();
		isPlus = CharFaceId.length > 1
		CharFaceId = CharFaceId.join('/');
	}else return null;
	if(!VIDEO.list[GAME].has(CharFaceId))return null;
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
function setImageSourceDirect(image, source)
{
	if (!image || !imageSrcDescriptor || !imageSrcDescriptor.set) return;
	image.dataset.hevcCharfaceBypass = "1";
	try {
		imageSrcDescriptor.set.call(image, source);
	} finally {
		delete image.dataset.hevcCharfaceBypass;
	}
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
					await 删除文件(videoUrl)//删除文件
				}
				let json = await getfile(videoUrl)
				if(本地 && !json && !离线)//本地不存在，就将网络资源下载到本地
				{
					json = await $ajax(`${MoeTalkURL}/${videoUrl}`)//$ajax
					await 保存文件(videoUrl,json)
				}
				json = JSON.parse(await ZipToJson(json));
				// json[0] = []//测试
				VIDEO.info[GAME][CharFaceId] = json;
				$('video').remove()
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
	if(本地)
	{
		Promise.resolve().then(async function()
		{
			await 保存文件(source,await Base64ToBlob(dataUrl))
		})
		return;
	}
	if(!navigator.serviceWorker || !isBase64(dataUrl) || dataUrl === BLANK_IMAGE)return;
	if(VIDEO.fallbacks.has(source))return;
	VIDEO.fallbacks.add(source);

	const payload =
	{
		type: "VIDEO",
		url: source,
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
	return entry.canvas.toDataURL("image/webp");
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
		if(!VIDEO.downVideos.has(frameInfo.videoUrl))
		{
			VIDEO.failedVideos.add(frameInfo.videoUrl)
		}
		return BLANK_IMAGE
	}));

	if(dataUrl)return dataUrl;

	return null;
}

/**
 * 劫持宿主环境可能存在的图片错误处理函数 (如 window.IMAGE_error)
 * 在图片原生加载失败时，尝试作为最后的手段进行修复
 */
function patchImageError()
{
    // 1. 防止重复打补丁：检查 IMAGE_error 是否为函数，且是否已经包含 _hevcPatched 标记
    if (typeof window.IMAGE_error !== "function" || window.IMAGE_error._hevcPatched) return;

    // 2. 保存原始的 IMAGE_error 函数引用，以便在需要时回退调用
    const original = window.IMAGE_error;

    // 3. 定义新的异步拦截函数，用于替换原始的全局错误处理函数
    const patched = async function (image, play)
    {
        // 兼容处理：如果传入的是事件对象，则取 target，否则直接取 image 本身作为目标 DOM 元素
        const target = image && image.target ? image.target : image;

        if(target)
        {
            // 获取原始的图片 src。优先使用之前缓存的 hevcOriginalSrc，否则读取当前的 src 属性
            const originalSource = target.dataset && target.dataset.hevcOriginalSrc 
                ? target.dataset.hevcOriginalSrc 
                : (target.getAttribute && target.getAttribute("src")) || target.src;

            // 对原始 src 进行标准化处理（通常用于生成备用图片的路径，如将视频帧路径转为立绘路径）
            const normalized = normalizeSource(originalSource);

            // 【场景 A】：如果清单中明确标记该帧缺失（missing），则进入回退（fallback）逻辑
            if(!normalized)
            {
                target.dataset.hevcOriginalSrc = originalSource;       // 备份原始 src，防止丢失
                target.dataset.hevcCharfaceSource = normalized || "";  // 设置备用 src（如角色立绘 charface）
                target.dataset.hevcCharfaceState = "fallback";         // 标记当前状态为 fallback（回退中）
                return original.apply(this, arguments);                // 执行原始的错误处理逻辑
            }

            // 【场景 B】：防死循环机制。如果当前已经是 fallback 状态，且当前 src 就是备用 src，说明备用图也加载失败了
            if (target.dataset && 
                target.dataset.hevcCharfaceState === "fallback" && 
                target.dataset.hevcCharfaceSource === normalized)
            {
                return original.apply(this, arguments); // 直接执行原始错误处理，不再重试，防止无限循环
            }

            // 【场景 C】：尝试异步获取该帧的 Data URL（可能是通过 Canvas 重新渲染、或从缓存解码得到的 base64/Blob 数据）
            const dataUrl = await getFrameDataUrl(normalized);
            
            if(dataUrl)
            {
                target.dataset.hevcCharfaceState = "done"; // 标记处理完成
                if(!target.dataset.hevcOriginalSrc && target.className !== '图片选项 图片文件')
                {
                    target.dataset.hevcOriginalSrc = originalSource; // 确保原始 src 被备份
                }
                syncFallbackCache(normalized, dataUrl);
                setImageSourceDirect(target, dataUrl);
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
function start(){patchImageError();}
start();