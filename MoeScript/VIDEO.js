/*@MoeScript/VIDEO.js@*/
/**
 * 角色头像动态替换脚本（高并发性能版）
 *
 * 【性能模型】
 * 1. 热路径零等待：seeked → drawImage → toBlob 直接出图，与原生同速。
 * 2. 解码池并发：每个视频 N 个 <video> 通道（VIDEO.concurrency），不同帧真并行提取。
 * 3. lookahead 预取：取第 N 帧后用空闲通道预取 N+1..N+K，连续提取后续请求直接命中缓存。
 * 4. rVFC 探针在 seek 前注册（绝不错过回调）：首帧校准 bias；稳态只做异步校验，
 *    发现异常才将该通道切入安全模式（每帧等呈现），实现"默认全速、问题自愈"。
 * 5. 老引擎全链路降级：无 rVFC → 首帧双 rAF 后全速；无 toBlob → toDataURL 转换；
 *    无 createObjectURL → 直连 URL。
 * 6. SW 缓存同步移至 requestIdleCallback，不抢提取热路径。
 */

const imageSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");

const FPS = 10;
const FRAME_DURATION = 1 / FPS;
const MAX_FRAME_CACHE = 200;
const MAX_BLOB_STORE = 24;


/* ================= 路径规范化 ================= */

function normalizeDirectorySource(source)
{
	if (!source) return null;
	let raw = String(source);
	let matchIndex = raw.lastIndexOf("GameData/");
	if (matchIndex < 0) return null;

	let normalized = raw.slice(matchIndex).split("?")[0].split("#")[0].replace(/\\/g, "/");
	if (normalized.indexOf('/CharFace/') < 0) return null;
	if (normalized.endsWith("/")) normalized = normalized.slice(0, -1);

	try { normalized = decodeURIComponent(normalized); } catch (error) {}
	return normalized;
}

function normalizeSource(source)
{
	let normalized = normalizeDirectorySource(source);
	if (!normalized) return null;
	if (!normalized.toLowerCase().endsWith(".webp")) return null;
	return normalized;
}

/* ================= manifest 解析 ================= */

function getFrameInfoFromManifest(source)
{
	if (!VIDEO.list[GAME]) VIDEO.list[GAME] = new Set();
	if (localStorage[GAME + '/Char'] && VIDEO.list[GAME].size === 0)
	{
		for (let id in 角色信息.info)
		{
			if (角色信息.info[id][1])
			{
				for (let ai = 0, al = 角色信息.info[id][1].length; ai < al; ai++)
				{
					let page = 角色信息.info[id][1][ai];
					for (let pi = 0, pl = page.length; pi < pl; pi++)
					{
						let img = page[pi][0];
						if (typeof page[pi][3] == 'number')
						{
							const charid = 角色信息.info[id][0][3];
							if (typeof img == 'number') img = '-' + img;
							else if (img != '') img = '_' + img;
							img = `CFID_${page[pi][3]}/CharID_${charid}${img}`;
						}
						VIDEO.list[GAME].add(img);
					}
				}
			}
		}
	}

	let CharFaceId, frameIndex, isPlus = false;
	if (source && source.includes('/CharFace/'))
	{
		CharFaceId = source.split('/CharFace/').pop().replace('.webp', '').split('/');
		frameIndex = CharFaceId.pop();
		isPlus = CharFaceId.length > 1;
		CharFaceId = CharFaceId.join('/');
	} else return null;

	if (!VIDEO.list[GAME].has(CharFaceId)) return null;
	return {
		CharFaceId: CharFaceId,
		frameIndex: frameIndex,
		frameName: frameIndex,
		isPlus: isPlus,
		videoUrl: `GameData/${GAME}/Video/${CharFaceId}.mp4`,
		normalized: source
	};
}

/* ================= 基础工具 ================= */

function setImageSourceDirect(image, source)
{
	if (!image || !imageSrcDescriptor || !imageSrcDescriptor.set) return;
	image.dataset.hevcCharfaceBypass = "1";
	try { imageSrcDescriptor.set.call(image, source); }
	finally { delete image.dataset.hevcCharfaceBypass; }
}

function dataUrlToBlob(dataUrl)
{
	try {
		const parts = dataUrl.split(",");
		const mime = (parts[0].match(/:(.*?);/) || [])[1] || "image/webp";
		const bin = atob(parts[1]);
		const arr = new Uint8Array(bin.length);
		for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
		return new Blob([arr], { type: mime });
	} catch (e) { return null; }
}

function blobToDataUrl(blob)
{
	return new Promise(function(resolve) {
		try {
			const fr = new FileReader();
			fr.onload = function(){ resolve(fr.result); };
			fr.onerror = function(){ resolve(null); };
			fr.readAsDataURL(blob);
		} catch (e) { resolve(null); }
	});
}

function canvasToBlob(canvas, type, quality)
{
	return new Promise(function(resolve) {
		if (canvas.toBlob) { canvas.toBlob(function(b){ resolve(b || null); }, type, quality); return; }
		resolve(dataUrlToBlob(canvas.toDataURL(type, quality)));
	});
}

function waitPaint()
{
	return new Promise(function(resolve) {
		requestAnimationFrame(function() { requestAnimationFrame(function() { resolve(); }); });
	});
}

// rVFC 探针：必须在 seek 之前注册，才能捕获本次 seek 的呈现回调
function presentProbe(video, timeout)
{
	let resolveFn;
	const promise = new Promise(function(r) { resolveFn = r; });
	let done = false;
	const timer = setTimeout(function() { if (!done) { done = true; resolveFn(null); } }, timeout || 1000);
	try {
		video.requestVideoFrameCallback(function(now, meta) {
			if (!done) { done = true; clearTimeout(timer); resolveFn(meta); }
		});
	} catch (e) { if (!done) { done = true; clearTimeout(timer); resolveFn(null); } }
	return promise;
}

function cleanupStrayVideos()
{
	const list = document.getElementsByTagName("video");
	for (let i = list.length - 1; i >= 0; i--)
	{
		if (!list[i].dataset.hevcManaged && list[i].parentNode) list[i].parentNode.removeChild(list[i]);
	}
}

/* ================= 二进制加载：ZIP 元数据 + Blob URL ================= */

async function ensureVideoBlob(videoUrl)
{
	if (VIDEO.blobStore.has(videoUrl)) return VIDEO.blobStore.get(videoUrl);

	let raw = await getfile(videoUrl);
	if (本地 && !raw && !离线)
	{
		raw = await $ajax(`${MoeTalkURL}/${videoUrl}`);
		await 保存文件(videoUrl, raw);
	}

	const json = JSON.parse(await ZipToJson(raw));
	const blob = (raw instanceof Blob) ? raw : new Blob([raw], { type: "video/mp4" });
	const store = {
		blob: blob,
		url: (typeof URL.createObjectURL === "function") ? URL.createObjectURL(blob) : videoUrl,
		json: json
	};
	VIDEO.blobStore.set(videoUrl, store);

	if (VIDEO.blobStore.size > MAX_BLOB_STORE)
	{
		const iter = VIDEO.blobStore.keys();
		let r;
		while (!(r = iter.next()).done)
		{
			if (!VIDEO.videos.has(r.value))
			{
				const old = VIDEO.blobStore.get(r.value);
				if (old && old.url.indexOf("blob:") === 0) URL.revokeObjectURL(old.url);
				VIDEO.blobStore.delete(r.value);
				break;
			}
		}
	}
	return store;
}

async function resolveFrameInfo(source)
{
	const frameInfo = getFrameInfoFromManifest(source);
	if (!frameInfo || frameInfo.missing || GAME === 'NONE') return null;

	const CharFaceId = frameInfo.CharFaceId;
	const videoUrl = frameInfo.videoUrl;

	if (!VIDEO.info[GAME]) VIDEO.info[GAME] = {};
	if (!VIDEO.info[GAME][CharFaceId]) VIDEO.info[GAME][CharFaceId] = [[], 0];

	if (!VIDEO.cfPromises[CharFaceId] || VIDEO.failedVideos.has(videoUrl))
	{
		VIDEO.cfPromises[CharFaceId] = (async () =>
		{
			try
			{
				if (VIDEO.failedVideos.has(videoUrl) && !VIDEO.downVideos.has(videoUrl))
				{
					VIDEO.downVideos.add(videoUrl);
					evictGroup(videoUrl);
					const old = VIDEO.blobStore.get(videoUrl);
					if (old && old.url.indexOf("blob:") === 0) URL.revokeObjectURL(old.url);
					VIDEO.blobStore.delete(videoUrl);
					VIDEO.failedVideos.delete(videoUrl);
					if (!Caches.缓存) Caches.缓存 = await caches.open('缓存');
					await Caches.缓存.delete(videoUrl);
					await 删除文件(videoUrl);
				}

				const store = await ensureVideoBlob(videoUrl);
				VIDEO.info[GAME][CharFaceId] = store.json;
				cleanupStrayVideos();
			}
			catch (error)
			{
				console.error(`加载 ${CharFaceId} 失败:`, error);
				delete VIDEO.cfPromises[CharFaceId];
				throw error;
			}
		})();
	}

	await VIDEO.cfPromises[CharFaceId];
	if (!frameInfo.isPlus) frameInfo.frameIndex = VIDEO.info[GAME][CharFaceId][0].indexOf(frameInfo.frameIndex);
	return frameInfo;
}

/* ================= 解码池（group = 多通道） ================= */

function createSlot(store, videoUrl)
{
	const video = document.createElement("video");
	video.preload = "auto";
	video.muted = true;
	video.playsInline = true;
	video.crossOrigin = "anonymous";
	video.dataset.hevcManaged = "1";
	video.style.cssText = "position:fixed;left:-99999px;top:-99999px;width:1px;height:1px;opacity:0;pointer-events:none;";
	(document.body || document.documentElement).appendChild(video);

	const slot = {
		video: video,
		canvas: document.createElement("canvas"),
		ctx: null,
		queue: Promise.resolve(),
		queueLen: 0,
		calibrated: false,   // 首帧校准完成标志
		unstable: false,     // 异常后置 true → 该通道进入安全模式
		readyPromise: null
	};
	slot.ctx = slot.canvas.getContext("2d"); // 不开 desynchronized

	slot.readyPromise = new Promise(function(resolve, reject)
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
			VIDEO.failedVideos.add(videoUrl);
			reject(new Error("Video load failed: " + videoUrl));
		}
		video.addEventListener("loadedmetadata", onReady);
		video.addEventListener("loadeddata", onReady);
		video.addEventListener("error", onError);
	});

	video.src = store ? store.url : videoUrl; // Blob URL：零网络请求
	video.load();
	return slot;
}

function evictGroup(videoUrl)
{
	const group = VIDEO.videos.get(videoUrl);
	const i = VIDEO.lruOrder.indexOf(videoUrl);
	if (i >= 0) VIDEO.lruOrder.splice(i, 1);
	if (!group) return;

	group.cache.forEach(function(item) {
		if (item && item.url && item.url.indexOf("blob:") === 0) URL.revokeObjectURL(item.url);
	});
	group.cache.clear();
	group.pending.clear();
	group.slots.forEach(function(slot) {
		slot.video.pause();
		slot.video.removeAttribute("src");
		try { slot.video.load(); } catch (e) {}
		if (slot.video.parentNode) slot.video.parentNode.removeChild(slot.video);
	});
	VIDEO.videos.delete(videoUrl);
}

function getGroup(videoUrl)
{
	if (VIDEO.videos.has(videoUrl))
	{
		const i = VIDEO.lruOrder.indexOf(videoUrl);
		if (i >= 0) VIDEO.lruOrder.splice(i, 1);
		VIDEO.lruOrder.push(videoUrl);
		return VIDEO.videos.get(videoUrl);
	}

	while (VIDEO.lruOrder.length >= VIDEO.maxGroups) evictGroup(VIDEO.lruOrder[0]);

	const store = VIDEO.blobStore.get(videoUrl);
	const n = Math.max(1, Math.min(4, VIDEO.concurrency | 0 || 1));
	const group = {
		videoUrl: videoUrl,
		cache: new Map(),
		pending: new Map(),
		slots: [],
		seekBias: 0,
		calibSupported: undefined
	};
	for (let i = 0; i < n; i++) group.slots.push(createSlot(store, videoUrl));
	VIDEO.videos.set(videoUrl, group);
	VIDEO.lruOrder.push(videoUrl);
	return group;
}

function trimFrameCache(group)
{
	if (group.cache.size <= MAX_FRAME_CACHE) return;
	const oldest = group.cache.keys().next().value;
	const old = group.cache.get(oldest);
	group.cache.delete(oldest);
	if (old && old.url.indexOf("blob:") === 0) URL.revokeObjectURL(old.url);
}

/* ================= 任务分发（并发调度） ================= */

function slotMode(slot)
{
	if (!slot.calibrated) return "calibrate";       // 首帧：校准 bias
	if (VIDEO.safePresent || slot.unstable) return "safe"; // 安全模式：每帧等呈现
	return "fast";                                   // 稳态：零等待全速
}

function dispatch(group, frameInfo, options)
{
	const idleOnly = !!(options && options.idleOnly);
	let slot = null;
	for (let i = 0; i < group.slots.length; i++)
	{
		const s = group.slots[i];
		if (idleOnly && s.queueLen > 0) continue; // 预取只占用完全空闲的通道
		if (!slot || s.queueLen < slot.queueLen) slot = s;
	}
	if (!slot) return null;

	slot.queueLen++;
	const mode = slotMode(slot);
	const task = slot.queue.then(function() {
		return captureFrame(slot, group, frameInfo, mode, 0);
	}).then(function(r) { slot.queueLen--; return r; },
		  function(e) { slot.queueLen--; throw e; });
	slot.queue = task.catch(function() {}); // 链条不断
	return task;
}

/* ================= seek 与核心提取 ================= */

function seekVideo(video, seekTime)
{
	return new Promise(function(resolve, reject)
	{
		let timeoutId = 0;
		function cleanup()
		{
			video.removeEventListener("seeked", onSeeked);
			video.removeEventListener("error", onError);
			if (timeoutId) clearTimeout(timeoutId);
		}
		function onSeeked() { cleanup(); resolve(); }
		function onError() { cleanup(); reject(new Error("Video seek failed")); }

		video.pause();
		if (Math.abs(video.currentTime - seekTime) < 0.0001 && video.readyState >= 2)
		{
			resolve();
			return;
		}
		timeoutId = setTimeout(function() {
			cleanup();
			reject(new Error("Video seek timeout"));
		}, 10000);

		video.addEventListener("seeked", onSeeked);
		video.addEventListener("error", onError);
		video.currentTime = seekTime;
	});
}

function ensureCanvasSize(slot, source)
{
	if (slot.canvas.width !== source.videoWidth || slot.canvas.height !== source.videoHeight)
	{
		slot.canvas.width = source.videoWidth;
		slot.canvas.height = source.videoHeight;
	}
}

async function captureFrame(slot, group, frameInfo, mode, attempt)
{
	attempt = attempt || 0;
	const video = slot.video;
	const frameNumber = Number(frameInfo.frameIndex);
	await slot.readyPromise;

	if (isNaN(frameNumber) || frameNumber < 0 || frameNumber * FRAME_DURATION >= video.duration)
	{
		if (frameInfo.normalized) VIDEO.failedFrames.add(frameInfo.normalized);
		if (!VIDEO.failedVideos.has(group.videoUrl) && !VIDEO.downVideos.has(group.videoUrl))
		{
			VIDEO.failedVideos.add(group.videoUrl);
		}
		return { url: BLANK_IMAGE, blob: null };
	}

	// 帧中点 seek：免疫各硬件解码器舍入差异
	const seekTime = Math.max(0, (frameNumber - (group.seekBias || 0)) * FRAME_DURATION + FRAME_DURATION / 2);

	// 探针必须在 seek 前注册
	let probePromise = null;
	if (group.calibSupported !== false)
	{
		if (typeof video.requestVideoFrameCallback === "function")
		{
			probePromise = presentProbe(video, mode === "fast" ? 1500 : (mode === "safe" ? 150 : 1200));
		}
		else group.calibSupported = false;
	}

	await seekVideo(video, seekTime);

	if (mode !== "fast")
	{
		// 校准/安全模式：等呈现回调（拿不到则等一次双 rAF）
		let meta = probePromise ? await probePromise : null;
		if (!meta) await waitPaint();
		if (meta && typeof meta.mediaTime === "number" && attempt < 2)
		{
			const diff = Math.round(meta.mediaTime * FPS) - frameNumber;
			if (diff !== 0 && Math.abs(diff) <= 3)
			{
				group.seekBias = (group.seekBias || 0) + diff;
				slot.unstable = true;
				return captureFrame(slot, group, frameInfo, mode, attempt + 1);
			}
		}
		slot.calibrated = true;
	}
	else if (probePromise)
	{
		// 快速路径：异步校验，不阻塞出图；发现异常才切安全模式并纠正
		probePromise.then(function(meta) {
			if (!meta || typeof meta.mediaTime !== "number") return;
			const diff = Math.round(meta.mediaTime * FPS) - frameNumber;
			if (diff !== 0 && Math.abs(diff) <= 3)
			{
				group.seekBias = (group.seekBias || 0) + diff;
				slot.unstable = true;
				group.cache.delete(frameNumber); // 清除可能的错帧缓存
			}
			else if (diff !== 0) slot.unstable = true;
		});
	}

	// 绘制（drawImage 全覆盖不透明帧，无需 clearRect）
	ensureCanvasSize(slot, video);
	let drawn = false;
	try { slot.ctx.drawImage(video, 0, 0); drawn = true; } catch (e) {}
	if (!drawn && typeof createImageBitmap === "function")
	{
		const bmp = await createImageBitmap(video);
		try { ensureCanvasSize(slot, bmp); slot.ctx.drawImage(bmp, 0, 0); drawn = true; }
		finally { if (bmp.close) bmp.close(); }
	}
	if (!drawn) throw new Error("Frame draw failed");

	const blob = await canvasToBlob(slot.canvas, "image/webp", 0.9);
	if (!blob) throw new Error("Frame encode failed");
	return { url: URL.createObjectURL(blob), blob: blob };
}

/* ================= lookahead 预取 ================= */

function scheduleLookahead(group, fromKey)
{
	const la = VIDEO.lookahead | 0;
	if (la <= 0) return;
	const duration = group.slots[0].video.duration;

	for (let d = 1; d <= la; d++)
	{
		const k = fromKey + d;
		if (!isFinite(duration) || k * FRAME_DURATION >= duration) break;
		if (group.cache.has(k) || group.pending.has(k)) continue;

		const fi = { frameIndex: k, isPlus: true, videoUrl: group.videoUrl, normalized: "" };
		const t = dispatch(group, fi, { idleOnly: true });
		if (!t) continue; // 无空闲通道则放弃预取，绝不与按需请求抢资源

		const w = t.then(function(result) {
			group.pending.delete(k);
			if (result && result.blob) { group.cache.set(k, result); trimFrameCache(group); }
			return result;
		});
		w.catch(function() { group.pending.delete(k); });
		group.pending.set(k, w);
	}
}

/* ================= 对外取帧入口 ================= */

async function getFrameDataUrl(source)
{
	const frameInfo = await resolveFrameInfo(source);
	if (!frameInfo) return null;

	const group = getGroup(frameInfo.videoUrl);
	const key = Number(frameInfo.frameIndex);

	// 1. 缓存命中（预取的价值在这里兑现）
	if (group.cache.has(key))
	{
		scheduleLookahead(group, key);
		return group.cache.get(key).url;
	}
	// 2. 同帧去重
	if (group.pending.has(key))
	{
		const shared = await group.pending.get(key);
		return shared.url;
	}

	// 3. 分发到最闲通道
	const task = dispatch(group, frameInfo, null).catch(function(error) {
		console.error("帧提取失败:", frameInfo.videoUrl, key, error);
		if (!VIDEO.downVideos.has(frameInfo.videoUrl)) VIDEO.failedVideos.add(frameInfo.videoUrl);
		return { url: BLANK_IMAGE, blob: null };
	});

	const wrapped = task.then(function(result) {
		group.pending.delete(key);
		if (result.blob && !VIDEO.failedFrames.has(source))
		{
			group.cache.set(key, result);
			trimFrameCache(group);
		}
		return result;
	});
	group.pending.set(key, wrapped);

	const result = await wrapped;
	if (result.blob && result.url !== BLANK_IMAGE)
	{
		scheduleLookahead(group, key);
		syncFallbackCacheIdle(frameInfo.normalized, result.blob);
	}
	return result.url;
}

/* ================= 缓存同步（空闲期执行） ================= */

function syncFallbackCacheIdle(source, blob)
{
	const run = function() { syncFallbackCache(source, blob); };
	if (typeof requestIdleCallback === "function") requestIdleCallback(run, { timeout: 2000 });
	else setTimeout(run, 0);
}

function syncFallbackCache(source, blob)
{
	if (本地)
	{
		Promise.resolve().then(async function() {
			await 保存文件(source, blob);
		});
		return;
	}
	if (!navigator.serviceWorker || !blob) return;
	if (VIDEO.fallbacks.has(source)) return;
	VIDEO.fallbacks.add(source);

	Promise.resolve().then(async function()
	{
		const payload = { type: "VIDEO", url: source };
		if (VIDEO.swLegacy) payload.dataUrl = await blobToDataUrl(blob);
		else payload.blob = blob;

		const registration = await navigator.serviceWorker.ready;
		const target = navigator.serviceWorker.controller || registration.active || registration.waiting;
		if (!target) { VIDEO.fallbacks.delete(source); return; }
		target.postMessage(payload);
	}).catch(function() { VIDEO.fallbacks.delete(source); });
}

/* ================= IMAGE_error 劫持 ================= */

function patchImageError()
{
	if (typeof window.IMAGE_error !== "function" || window.IMAGE_error._hevcPatched) return;
	const original = window.IMAGE_error;

	const patched = async function(image, play)
	{
		const target = image && image.target ? image.target : image;
		if (target)
		{
			const originalSource = (target.dataset && target.dataset.hevcOriginalSrc)
				? target.dataset.hevcOriginalSrc
				: (target.getAttribute && target.getAttribute("src")) || target.src;
			const normalized = normalizeSource(originalSource);

			if (!normalized)
			{
				target.dataset.hevcOriginalSrc = originalSource;
				target.dataset.hevcCharfaceSource = "";
				target.dataset.hevcCharfaceState = "fallback";
				return original.apply(this, arguments);
			}

			if (target.dataset &&
				target.dataset.hevcCharfaceState === "fallback" &&
				target.dataset.hevcCharfaceSource === normalized)
			{
				return original.apply(this, arguments);
			}

			const dataUrl = await getFrameDataUrl(normalized);
			if (dataUrl)
			{
				target.dataset.hevcCharfaceState = "done";
				if (!target.dataset.hevcOriginalSrc && target.className !== '图片选项 图片文件')
				{
					target.dataset.hevcOriginalSrc = originalSource;
				}
				setImageSourceDirect(target, dataUrl);
				return;
			}
		}
		return original.apply(this, arguments);
	};

	patched._hevcPatched = true;
	window.IMAGE_error = patched;
}

function start(){ patchImageError(); }
start();