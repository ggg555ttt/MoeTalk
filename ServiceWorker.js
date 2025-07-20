let cacheName = '缓存';

// 缓存文件列表
const cacheList = [
	// 基本缓存文件
	'./GameData',
	'./MoeData',
	'./MoeScript',
	'./plugins',
	'./cordova.js',
	'./cordova_plugins.js',
]

// 执行缓存操作
this.addEventListener('install', event => {
	this.skipWaiting()// 装完直接用

	event.waitUntil(

		caches.open(cacheName).then(cache => {
			if (cache) cache.addAll(cacheList)
		})
	)
})

// 激活。清空上个service worker保存的内容
this.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then((nameList) => {
			return Promise.all(
				nameList.map((i) => {
					if (i !== cacheName) {
						return caches.delete(i)
					}
				})
			)
			// for(var i = 0; i < nameList.length; i++){
			//	 if(i !== cacheName) caches.delete(i);
			// }
		}).catch(e => console.log(e))
	)
})

// 监听请求
this.addEventListener('fetch', event =>
{
	event.respondWith(caches.match(event.request).then(res =>
	{
		// 匹配到缓存直接返回
		if (res) return res

		const requestClone = event.request.clone() // 复制请求头

		// 直接请求，并返回
		// return fetch(requestClone).then(new_res => new_res)

		// 直接请求，缓存后返回
		return fetch(requestClone).then(new_res =>
		{
			if (!new_res || new_res.status !== 200) return new_res // 响应报错，直接返回

			const responseClone = new_res.clone() // 复制响应

			// 除了php, html, application, json 不缓存，其他都缓存
			const pattern = /\/$|html|php/ig

			if (!pattern.test(new_res.url))
			{
				caches.open(cacheName).then(cache => cache && cache.put(requestClone, responseClone))
			} // 进行缓存
			return new_res
		})
	}))
})