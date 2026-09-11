/*@ServiceWorker.js@*/
const cacheName = '缓存';
const test = console.log
// 预缓存文件列表
const cacheList = []

// 1. 安装阶段
self.addEventListener('install', event =>
{
	self.skipWaiting();// 装完直接用
	event.waitUntil(caches.open(cacheName).then(cache =>
	{
		// 加了 catch 容错：防止某个文件 404 导致整个 SW 安装崩溃
		return cache.addAll(cacheList).catch(err =>
		{
			console.warn('[SW] 预缓存部分失败，请检查 cacheList 是否有无效路径:', err);
		});
	}));
});

// 2. 激活阶段
self.addEventListener('activate', event => 
{
	event.waitUntil(self.clients.claim());// 让 SW 立即接管页面，无需再次刷新
});
self.addEventListener('message', event =>
{
	const data = event.data || {}
	if(data.type !== 'VIDEO' || !data.url || !data.dataUrl)return
	event.waitUntil((async() =>
	{
		const response = await fetch(data.dataUrl)
		if(!response.ok)return
		const blob = await response.blob()
		const cache = await caches.open(cacheName)
		await cache.put(data.url, new Response(blob,
		{
			headers:
			{
				'Content-Type': blob.type || 'image/webp',
				'Cache-Control': 'public, max-age=31536000',
				'X-MT-Hevc-CharFace': '1'
			}
		}))
	})())
})

// 3. 拦截请求
this.addEventListener('fetch', event =>
{
	const pattern = /\/$|html|php/ig// 排除HTML和PHP
	const request = event.request;
	// 拦截非GET请求、非HTTP开头和流式下载请求
	if(request.method !== 'GET' || !request.url.startsWith('http') || request.url.includes('/streamsaver/'))return;
	event.respondWith(caches.match(request).then(res =>
	{
		if(res)return res// 匹配到缓存直接返回
		const requestClone = event.request.clone()// 复制请求头
		// return fetch(requestClone).then(new_res => new_res)// 直接请求，并返回
		return fetch(requestClone).then(new_res =>// 直接请求，缓存后返回
		{
			if(!new_res || new_res.status !== 200)return new_res// 响应报错，直接返回
			const responseClone = new_res.clone()//复制响应
			//if(!new_res.url.includes('.php'))
			if(!pattern.test(new_res.url))caches.open(cacheName).then(cache => cache && cache.put(requestClone, responseClone))// 进行缓存
			return new_res
		})
	}))
})