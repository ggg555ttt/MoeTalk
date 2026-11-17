/*@MoeScript/CLIENT.js@*/
async function remove(target)
{
	try
	{
		const stat = await fs.lstat(target);
		if(stat.isDirectory())
		{
			const entries = await fs.readdir(target, { withFileTypes: true });

			// 限制每批次并发删除 200 个文件（既能吃满磁盘性能，又绝不卡死/报错）
			const BATCH_SIZE = 200; 
			for(let i = 0; i < entries.length; i += BATCH_SIZE)
			{
				const batch = entries.slice(i, i + BATCH_SIZE);
				await Promise.all(batch.map(entry=>// 批次内并行删除
				{
					const childPath = `${target}/${entry.name}`;
					return entry.isDirectory() ? remove(childPath) : fs.unlink(childPath);
				}));
			}
			await fs.rmdir(target);//删除空目录
		}
		else await fs.unlink(target);//删除文件
		return target
	}catch(err){return null;}//失败或不存在统一返回 null
}
async function 删除文件(path)
{
	if(!本地)return null
	if(客户端 === 'HTML5+')
	{
		path = '_doc/'+path
		return new Promise(function(resolve)
		{
			plus.io.resolveLocalFileSystemURL(path, function (entry)
			{
				if(entry.isFile)entry.remove(()=>resolve(true),resolve(null));//删除文件
				else entry.removeRecursively(()=>resolve(true),resolve(null));//删除目录
			},function(e)// code 10 = NOT_FOUND_ERR，目标不存在时做幂等处理
			{
				if(e && e.code === 10)resolve(null);
				else resolve(null);
			});
		});
	}
	if(客户端 === 'phpwin')
	{
		return await $.ajax(
		{
			url: '/index.php',
			type: 'POST',
			data: {delfiles: path},
			dataType: 'text'
		})
	}
	if(客户端 === 'NW.js')return await remove(path)
}
async function isIos()
{
	let type = await $.ajax(
	{
		url: '/index.php',
		type: 'POST',
		data: {backDown: true}
	}).catch(function(){return null})
	if(type === 'server')
	{
		let data = await $ajax(`${href}MoeData/phpwin.js?time=${本地应用版本[0]}`)
		data = await blobToBase64(new Blob([data],{type: 'application/octet-stream'}))
		await $.ajax(
		{
			url: '/index.php',
			type: 'POST',
			data: 
			{
				backDown: true,
				filename: '../root/index.php',
				data: data,
				type: 'image',
				time: ''
			},
			dataType:'text'
		});
		type = 'phpwin'
	}
	if(type === 'phpwin')
	{
		本地 = type
		客户端 = type
		localStorage['phpwin'] = type
		let data = await $ajax(`${href}MoeData/phpwin.js?time=${本地应用版本[0]}`)
		保存文件('index.php',data)
	}
	if(!type)
	{
		本地 = type
		客户端 = type
		delete localStorage['phpwin']
	}
}
function waitPlus()
{
	return new Promise(resolve =>
	{
		if(window.plus || 客户端 !== 'HTML5+')return resolve();
		const onPlusReady = () =>
		{
			document.removeEventListener('plusready', onPlusReady);
			resolve();
		};
		document.addEventListener('plusready', onPlusReady, false);
	});
}
async function file_exists(filePath)
{
	 if(客户端 === 'NW.js') {
		try {
			const stats = await fs.stat(filePath);
			if (stats.isFile() && stats.size > 0) {
				return filePath; // 有效
			}
			return false; // 目录或空文件
		} catch {
			return false; // 不存在或错误
		}
	}
	if(客户端 === 'HTML5+')
	{
		return new Promise(resolve => {
			const url = '_doc/' + filePath;
			plus.io.resolveLocalFileSystemURL(url, entry => {
				if (entry.isFile) {
					// 使用 getMetadata 而不是 file()，更轻量
					entry.getMetadata(meta => {
						if (meta.size > 0) {
							resolve(entry.fullPath); // 有效
						} else {
							resolve(false); // 空文件 → 无效
						}
					}, () => {
						resolve(false); // 元数据读取失败 → 视为无效
					});
				} else {
					resolve(false); // 是目录 → 无效
				}
			}, () => {
				resolve(false); // 不存在 → 无效
			});
		});
	}
	if(客户端 === 'phpwin')
	{
		return await $.ajax(
		{
			url: '/index.php',
			type: 'POST',
			data:
			{
				getfile: filePath,
				exists: 'true'
			},
			dataType: 'text'
		});
	}
}
async function findInvalidFiles(filePaths, concurrency = 30)
{
	if(客户端 === 'phpwin')
	{
		return await $.ajax(
		{
			url: '/index.php',
			type: 'POST',
			data: {checkfiles: JSON.stringify(filePaths)},
			dataType: 'json'
		})
	}
	const invalidList = [];
	let i = 0;
	let l = filePaths.length

	const workers = Array(concurrency).fill().map(() =>
		(async () => {
			while (i < filePaths.length) {
				const filePath = filePaths[i++];
				if(i % 100 === 0)$('.更新数据').text(`检查：${i}/${l}`)
				if(!await file_exists(filePath))invalidList.push(filePath);
				// 每处理 1000 条，让出主线程（防卡顿）
				if(i % 1000 === 0)await new Promise(r => setTimeout(r, 5));
			}
		})()
	);
	await Promise.all(workers);
	return invalidList;
}
async function ZipToJson(file,text = '',html = null)//读取文件内的json
{
	if(typeof file !== 'object')file = await $ajax(file,text,html)//url
	if(typeof file === 'string')return file//json
	file = await JSZip.loadAsync(file);//zip、mp4、blob
	return await file.files['data.json'].async('string')
}
function 外部下载(filename, data)
{//HTML5+，用于下载存档和zip
	return new Promise(function(resolve)
	{
		plus.android.requestPermissions(['android.permission.WRITE_EXTERNAL_STORAGE'],function(e)
		{
			if(e.deniedAlways.length>0 || e.deniedPresent.length>0)resolve(false)
			if(e.granted.length>0)
			{
				plus.runtime.downloadFile({url:data,fileName:filename},
				function(e){resolve(false)},function(e)
				{
					if(e.code > -1)resolve(e.message)//下载成功
					else resolve(false)
				})
			}
		},function(e){resolve(false)});
	});
}
function 内部下载(filename, data, type)
{//HTML5+，用于截图和更新应用
	return new Promise(function(resolve)
	{
		plus.io.requestFileSystem(type,function(fs)
		{
			fs.root.getFile(filename,{create: true,exclusive: false},function(fileEntry)
			{
				fileEntry.file(function(file)
				{
					fileEntry.createWriter(function(writer)//写入文件
					{
						writer.onwrite = function(e)
						{
							if(type === 3)
							{
								plus.gallery.save(e.target.fileName,function()
								{
									plus.io.resolveLocalFileSystemURL(e.target.fileName,function(fileEntry)
									{
										fileEntry.remove()
									})
								})//保存到相册
							}
							resolve(e.target.fileName)
						}
						blobToBase64(data).then((base)=>{writer.writeAsBinary(base)})
					});
				});
			});
		});
	});
}
async function 保存文件(filename, data, type = 2)
{
	if(!data)return null;
	if(typeof data === 'object' && !data.size)data = JSON.stringify(data)
	if(typeof data === 'string')
	{
		if(filename === '用户数据/moetalkStorage/chats.json')
		{
			try
			{
				localStorage['MMT'] = data
			}
			catch
			{
				delete localStorage['MMT']
			}
		}
		data = new Blob([data],{type: 'application/octet-stream'});
	}
	if(!客户端)
	{
		if(mt_settings['流式下载'] && window.location.protocol == 'https:')
		{
			// streamSaver.mitm = 'plugins/streamsaver/mitm.html';
			const fileStream = streamSaver.createWriteStream(filename,{size: data.size});
			const readableStream = data.stream();
			// 现代浏览器支持直接使用 pipeTo
			if(readableStream.pipeTo)await readableStream.pipeTo(fileStream);
			else// 兼容老版本浏览器的备用方案
			{
				const reader = readableStream.getReader();
				const writer = fileStream.getWriter();

				const pump = () => reader.read().then(res => 
					res.done ? writer.close() : writer.write(res.value).then(pump)
				);
				await pump();
			}
		}
		else saveAs(data, filename)
		return filename
	}
	if(客户端 === 'NW.js')
	{
		let path = ''
		if(type === 'json')
		{
			if(localStorage['存档下载位置'])path = localStorage['存档下载位置']+'/'
			else path = process.cwd()+'/MoeTalk存档/'
		}
		if(type === 'image' || type === 'zip')
		{
			if(localStorage['图片下载位置'])path = localStorage['图片下载位置']+'/'
			else path = process.cwd()+'/MoeTalk截图/'
		}
		path = path.replaceAll('\\','/').replaceAll('//','/')
		data = Buffer.from(await data.arrayBuffer());//将 Blob 转为 Buffer
		try
		{
			await fs.outputFile(path+filename, data);
			return path+filename
		}
		catch {return null}
		return null
	}
	if(客户端 === 'HTML5+')
	{
		let str1 = '<span class="black">失败！\n\n</span>'
		let str2 = '<span class="black">已将其保存至：</span>'
		let str3 = '<span class="black">成功！</span>'
		let fname = filename
		if(type === 2)fname = await 内部下载(filename, data, type)
		if(type === 'image')
		{
			if(localStorage['图片下载位置'])
			{
				let path = localStorage['图片下载位置']+'/'
				fname = await 保存到指定目录('图片下载位置', filename, data)
				if(fname.uri)fname = `${path}${filename}${str3}`
				else fname = null
				if(!fname)
				{
					fname = await 内部下载(filename, data, 3)
					if(fname)fname = `${path}${filename}${str1}${str2}手机相册/${filename}`
				}
			}
			else
			{
				fname = await 内部下载(filename, data, 3)
				if(fname)fname = `手机相册/${filename}${str3}`
			}
		}
		if(type === 'json' || type === 'zip')
		{
			
			if(localStorage['存档下载位置'])
			{
				let path = localStorage['存档下载位置']+'/'
				fname = await 保存到指定目录('存档下载位置', filename, data)
				if(fname.uri)fname = `${path}${filename}${str3}`
				else fname = null
				if(!fname)
				{
					fname = await 外部下载(filename, data)
					if(fname)fname = `${path}${filename}${str1}${str2}${fname}`
					else
					{
						fname = await 内部下载(filename, data, 4)
						if(fname)fname = `${path}${filename}${str1}${str2}${fname}`
					}
				}
			}
			else
			{
				fname = await 外部下载(filename, data)
				if(fname)fname += str3
				else
				{
					fname = await 内部下载(filename, data, 4)
					if(fname)fname = `${fname}${str1}${str2}${fname}`
				}
			}
		}
		let str = 'content://com.android.externalstorage.documents/tree/'
		if(fname)
		{
			fname = fname.replace('/storage/emulated/0','内部存储')
			if(fname.startsWith(str))
			{
				fname = fname.replace(str,'').replace('primary','内部存储').replace('%3A','/').replace('%2F','/')
			}
		}
		return type === 2 ? filename : fname
	}
	if(客户端 === 'Cordova')
	{
		let dirname = ''
		if(type === 'json')dirname = 'MoeTalk存档'
		if(type === 'image' || type === 'zip')dirname = 'MoeTalk截图'
		window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory+'Download',function(root)
		{
			root.getDirectory(dirname,{create:true},function()
			{
				root.getFile(`${dirname}/${filename}`,{create:true},function(fileEntry)
				{
					fileEntry.createWriter(function(fileWriter){fileWriter.write(data);});
				});
			});
		},function(err){alert('Download文件夹不存在！\n请尝试在内部存储根目录创建一个Download文件夹！');});
		return `内部存储/Download/${dirname}/${filename}`
	}
	if(客户端 === 'phpwin')
	{
		if(type === 'json' || type === 'zip')filename = '../MoeTalk存档/'+filename
		if(type === 'image')filename = '../MoeTalk截图/'+filename
		data = new File([data], filename, {type: data.type});
		let formData = new FormData();
		formData.append('file', data);
		formData.append('filename', filename);
		filename = await $.ajax(
		{
			url: '/index.php',
			type: 'POST',
			data: formData,
			processData: false,
			contentType: false
		});
		if(type != 2)filename = `文件/我的iPhone/phpwin/${filename.replace('../','')}`
		return filename;
	}
}
async function 复制目录(src,dst,files = [])
{
	if(客户端 === 'NW.js')
	{
		dst = dst || process.cwd()
		await fs.copy(src,dst,
		{
			overwrite: true,// 覆盖已存在的文件
			errorOnExist: false,// 不因目标存在而报错
			recursive: true// 递归复制目录
		});
		return
	}
	if(客户端 === 'phpwin')
	{
		return await $.ajax(
		{
			url: '/index.php',
			type: 'POST',
			data: {copydir: [src,dst]}
		})
	}
	if(!dst)src += '/'
	for(let i=0,len=files.length;i<len;i++)
	{
		await 保存文件(files[i].replace(src,dst),await $ajax(`${href}${files[i]}`))
	}
	return
}
async function 安装应用(time = Date.now())
{
	await waitPlus()
	let config = {}
	config.title = '安装应用'
	config.style = 'text-align:center;'
	alert("请不要退出或刷新\n<span class='更新应用'>请稍等。。。</span>",config)
	$('.ia-dnHO').remove()
	$('.cancel').remove()
	let 本地列表 = JSON.parse(await $ajax(`${href}MoeData/Version/MoeTalk.json?time=${time}`))
	本地列表['MoeData/Version/MoeTalk.json'] = 1
	本地列表['MoeData/Version/Version.json'] = 1
	let 文件列表 = Object.keys(本地列表)
	async function 下载线程()
	{
		while(文件列表.length > 0)
		{
			let file = 文件列表.pop();
			await 保存文件(file,await $ajax(file))
			$('.更新应用').text(`安装应用中，请不要退出或刷新\n剩余文件：${文件列表.length}`)
		}
	}
	await Promise.all(Array.from({length:5},下载线程));
	$('.更新应用').text('应用安装完成！\n即将刷新页面！')
	localStorage['HTML5+'] = 'file://'+await file_exists('index.html')
	location.reload(true)
}
async function 更新应用(time = Date.now())
{
	if(!本地)return
	await waitPlus()
	$('.更新应用').html('<span style="color:red;">MoeTalk更新中！请不要刷新或退出</span>')
	网络应用版本 = JSON.parse(await $ajax(`${MoeTalkURL}/MoeData/Version/Version.json?time=${time}`),'检测版本……',$('.更新应用'))
	if(网络应用版本 && 本地应用版本[0] < 网络应用版本[0])
	{
		if($('.版本:visible').length == 0)update()
		let 本地列表 = JSON.parse(await $ajax(`${href}MoeData/Version/MoeTalk.json?time=${time}`))
		let 网络列表 = JSON.parse(await ZipToJson(`${MoeTalkURL}/MoeData/Version/MoeTalk.zip?ver=${网络应用版本[0]}`),'获取列表……',$('.更新应用'))
		let Update = `更新补丁/MoeTalk_${网络应用版本[0]}`
		let num = [0,0]
		let md5 = 0
		let files = []
		for(let file in 网络列表)
		{
			md5 = 网络列表[file]
			if(!本地列表[file] || 本地列表[file] !== md5)
			{
				num[0]++
				if(!await file_exists(`${Update}/${file}`))//检测更新文件
				{
					let data = await $ajax(`${MoeTalkURL}/${file}?md5=${md5}`,'下载：',$('.更新应用'))
					if(data)
					{
						await 保存文件(`${Update}/${file}`,data)
						num[1]++
						files.push(`${Update}/${file}`)
					}
				}
				else
				{
					num[1]++
					files.push(`${Update}/${file}`)
				}
			}
		}
		if(num[0] === num[1])
		{
			
			files.push(await 保存文件(`${Update}/MoeData/Version/Version.json`,JSON.stringify(网络应用版本)))
			files.push(await 保存文件(`${Update}/MoeData/Version/MoeTalk.json`,JSON.stringify(网络列表)))
			await 复制目录(Update,'',files)
		}
		$('.更新应用').html('MoeTalk更新完毕！刷新页面即可查看更新')
		本地应用版本[0] = 网络应用版本[0]
	}
	else $('.更新应用').html('<span style="color:red;">暂未发现更新</span>')
	
}
async function 更新数据(time = Date.now())
{
	if(!本地 || GAME == 'NONE')return
	await waitPlus()
	$('.更新数据').html('<span style="color:red;">数据更新中！请不要刷新或退出</span>')
	本地数据版本 = JSON.parse(await $ajax(`${href}GameData/${GAME}/Version/Version.json?time=${time}`)) || [-1]
	网络数据版本 = JSON.parse(await $ajax(`${MoeTalkURL}/GameData/${GAME}/Version/Version.json?time=${time}`),'检测版本……',$('.更新数据'))
	if(网络数据版本 && 本地数据版本[0] < 网络数据版本[0])
	{
		if($('.版本:visible').length == 0)update()
		let 本地列表 = JSON.parse(await $ajax(`${href}GameData/${GAME}/Version/${GAME}.json?time=${time}`)) || {}
		let 网络列表 = JSON.parse(await $ajax(`${MoeTalkURL}/GameData/${GAME}/Version/${GAME}.json?ver=${网络数据版本[0]}`),'获取列表……',$('.更新数据'))
		let Update = `更新补丁/${GAME}_${网络数据版本[0]}`
		let num = [0,0]
		let md5 = 0
		let files = []
		for(let file in 网络列表)
		{
			md5 = 网络列表[file]
			if(!本地列表[file] || 本地列表[file] !== md5)
			{
				num[0]++
				if(!await file_exists(`${Update}/${file}.json`))//检测更新文件
				{
					let data = await ZipToJson(`${MoeTalkURL}/GameData/${GAME}/Version/${file}.zip?ver=${网络数据版本[0]}`,'下载：',$('.更新数据'))
					if(await 保存文件(`${Update}/${file}.json`,data))
					{
						files.push(`${Update}/${file}.json`)
						num[1]++
					}
				}
				else
				{
					files.push(`${Update}/${file}.json`)
					num[1]++
				}
			}
		}
		if(num[0] === num[1])
		{
			files.push(await 保存文件(`${Update}/Version/Version.json`,JSON.stringify(网络数据版本)))
			files.push(await 保存文件(`${Update}/Version/${GAME}.json`,JSON.stringify(网络列表)))
			await 复制目录(Update,'GameData/'+GAME,files)
		}
		$('.更新数据').html('数据更新完毕！文件请通过选择游戏或刷新页面来下载')
		delete localStorage[GAME+'/Char']
	}
	else $('.更新数据').html('<span style="color:red;">暂未发现更新</span>')
}
async function 导出存档(filename,json)
{
	filename = filename.replace(/[\\/:*?"<>|]/g, '_');
	// 完全手动递归拆解，绝对不会生成超大字符串
	if(typeof json == 'string')json = [json]
	else
	{
		let chunks = [];
		stringifyToChunks(json, chunks)
		json = chunks
		chunks = ''
	}
	json = new Blob(json,{type: 'application/json'})
	filename = await 保存文件(filename+'.'+$('.存档格式').val(),json,'json')
	if(filename)alert(`保存文件<span class="red">${filename}</span>`)
	INIT_loading(!'下载存档')
	return
}
async function 导出截图(filename,data,num)
{
	filename = filename.replace(/[\\/:*?"<>|]/g, '_');
	let ext = (mt_settings['图片格式'] || 'png').split('/').pop().replace('jpeg','jpg')
	if(num == 1)ext = ext.toUpperCase()
	if(imageZip)
	{
		imageZip.file(`${filename}.${ext}`,data);
		$('.INDEX_CaptureTips').html('<span style="color:red;">打包下载：图片全部生成完毕才会开始下载，【设置选项-下载设置】可更改</span>')
		if(imageArrL === Object.keys(imageZip.files).length)
		{
			imageZip = await imageZip.generateAsync({type:'blob'})
			imageZip = await 保存文件(filename+'.zip',imageZip,'zip')
			$('.INDEX_CaptureTips').html(`保存文件<span class="red">${imageZip}</span>`)
			imageZip = null
		}
	}
	else
	{
		filename = await 保存文件(`${filename}.${ext}`,data,'image')
		$('.INDEX_CaptureTips').html(`保存文件<span class="red">${filename}</span>`)
	}
	if(!正在截图)
	{
		data = await blobToBase64(data)
		$('.截图区域').html(`<img src='data:${mt_settings['图片格式'] || 'image/png'};base64,${data}' style='width:100%;'>`)
	}
}
async function 检测版本()
{//HTML5+专用，新版替换旧版应用
	await waitPlus();
	if(location.href.includes('/www/'))
	{
		INIT_loading(false)
		if(!localStorage['HTML5+'])安装应用()//初始化
		else
		{
			plus.io.resolveLocalFileSystemURL('_doc/MoeData/Version/Version.json',function(entry)
			{
				entry.file(function(file)
				{
					var reader = new plus.io.FileReader();
					reader.onload = function(e)
					{
						let ver = JSON.parse(e.target.result || '[-1]')[0]
						if(本地应用版本[0] > ver)安装应用()//版本更新
						else plus.webview.currentWebview().loadURL(localStorage['HTML5+'])
					};
					reader.onerror = function(e){安装应用()};//读取失败
					reader.readAsText(file, 'utf-8');
				});
			},function(e){安装应用()});//文件不存在
		}
		return new Promise(() => {});
	}
}
async function 检查数据()
{
	return
	if(!本地 || GAME == 'NONE' || localStorage['调试模式'])return
	$('.更新数据').text('获取文件列表……')
	await waitPlus()
	数据列表 = []
	let data = JSON.parse(await $ajax(`${href}GameData/${GAME}/List.json?ver=${本地数据版本}`))
	let link = `GameData/${GAME}`
	for(let key1 in data)
	{
		let val1 = data[key1]
		let ext = key1 == 'Library' ? 'json' : 'webp'
		for(let key2 in val1)
		{
			let val2 = val1[key2]
			if(typeof val2 === 'string')
			{
				val2 = `${link}/${key1}/${val2}.${ext}`
				数据列表.push(val2)
			}
			else
			{
				for(let key3 in val2)
				{
					let val3 = val2[key3]
					if(typeof val3 === 'string')
					{
						val3 = `${link}/${key1}/${key2}/${val3}.${ext}`
						数据列表.push(val3)
					}
					else
					{
						for(let key4 in val3)
						{
							let val4 = val3[key4]
							if(typeof val4 === 'string')
							{
								val4 = `${link}/${key1}/${key2}/${key3}/${val4}.${ext}`
								数据列表.push(val4)
							}
						}
					}
				}
			}
		}
	}
	数据列表 = await findInvalidFiles(数据列表)
	if(数据列表.length)
	{
		if(!$('.更新数据').length)update()
		$('.更新数据').text('数据文件下载中……')
		let data = await getfile('MoeData/links.json')
		data = data ? JSON.parse(data).data : []
		let arr = []
		arr.push(xiyihan)
		arr.push('https://moetalk.netlify.app')
		arr.push('https://ggg555ttt.github.io/MoeTalk')
		arr.push('https://raw.githubusercontent.com/ggg555ttt/MoeTalk/main')
		foreach(data,function(k,v)
		{
			arr.push(v.url+'/https://raw.githubusercontent.com/ggg555ttt/MoeTalk/main')
		})
		文件总数 = 数据列表.length-1
		foreach(arr,function(k,v){下载数据(v)})
	}
	else $('.更新数据').text('数据完整')
}
async function 下载数据(url)
{
	if(!数据列表.length)
	{
		文件总数 = 0
		return
	}
	let filename = 数据列表.pop()//获取下载路径
	if(await file_exists(filename))//本地存在就跳过
	{
		$('.更新数据').text('剩余下载文件：'+文件总数--)
		下载数据(url)
	}
	else
	{
		let data = await getfile(`${url}/${filename}`)
		if(data)//下载成功
		{
			await 保存文件(filename, data)
			$('.更新数据').text('剩余下载文件：'+文件总数--)
			下载数据(url)
		}
		else
		{
			let data = await getfile(`${xiyihan}/${filename}`)
			if(data)//下载成功
			{
				await 保存文件(filename, data)
				$('.更新数据').text('剩余下载文件：'+文件总数--)
			}
			else 数据列表.push(filename)//失败换源
		}
	}
}

function __loadTrees__()
{
	let obj = {};
	['存档下载位置','图片下载位置'].map((key) =>
	{
		let val = localStorage[key]
		if(val)obj[key] = {uri:val, time:1}
	})
	return obj
}
function __saveTrees__(obj)
{
	['存档下载位置','图片下载位置'].map((key) =>
	{
		if(!obj[key])delete localStorage[key]
		else localStorage[key] = obj[key].uri
	})
}
// ================= 1. 全局配置与持久化管理 =================
var __REQ__ = 20261109;
var __KEY__ = 'saf_trees_v3'; // 持久化存储的 Key
window.__dirCache__ = {};    // 目录 URI 缓存，按 treeUri 分桶，提升查询性能

// function __loadTrees__() {
//     try { return JSON.parse(plus.storage.getItem(__KEY__) || '{}'); }
//     catch (e) { return {}; }
// }
// function __saveTrees__(obj) {
//     plus.storage.setItem(__KEY__, JSON.stringify(obj));
// }
// 检查某个 URI 是否还被其他 label 引用 (防止误删共享权限)
function __isUriUsedByOthers__(trees, currentLabel, targetUri) {
    for (var key in trees) {
        if (key !== currentLabel && trees[key].uri === targetUri) return true;
    }
    return false;
}

// ================= 2. 授权管理核心功能 =================

/**
 * 选择并授权一个目录 (支持同名覆盖，自动释放旧权限)
 */
function 选择保存目录(label) {
    return new Promise(function(resolve) {
        if (!label || typeof label !== 'string' || !label.trim()) { 
            resolve({ error: 'invalid_label', msg: '标签不能为空' }); return; 
        }
        label = label.trim();
        try {
            var main = plus.android.runtimeMainActivity();
            var Intent = plus.android.importClass('android.content.Intent');
            var intent = new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
            intent.addFlags(1 | 2 | 64 | 128); // 读 | 写 | 持久化 | 前缀权限

            main.onActivityResult = function(req, res, data) {
                if (req !== __REQ__) return;
                main.onActivityResult = null;
                if (res !== -1 || !data) { resolve({ error: 'cancel', msg: '用户取消选择' }); return; }
                try {
                    plus.android.importClass(data);
                    var uri = data.getData();
                    var resolver = main.getContentResolver();
                    plus.android.importClass(resolver);
                    
                    var newUriStr = uri.toString();
                    var trees = __loadTrees__();
                    var oldEntry = trees[label];

                    // 释放不再使用的旧 URI 权限 (防止系统授权堆积)
                    if (oldEntry && oldEntry.uri !== newUriStr) {
                        var oldUri = oldEntry.uri;
                        if (typeof oldUri === 'string' && oldUri.startsWith('content://')) {
                            if (!__isUriUsedByOthers__(trees, label, oldUri)) {
                                try {
                                    var Uri = plus.android.importClass('android.net.Uri');
                                    resolver.releasePersistableUriPermission(Uri.parse(oldUri), 3);
                                } catch (e) {
                                	// console.warn("释放旧URI权限失败", e);
                                }
                                delete window.__dirCache__[oldUri];
                            }
                        }
                    }

                    resolver.takePersistableUriPermission(uri, 3);
                    trees[label] = { uri: newUriStr, time: Date.now() };
                    __saveTrees__(trees);
                    if (!window.__dirCache__[newUriStr]) window.__dirCache__[newUriStr] = {};
                    
                    resolve({ success: true, label: label, uri: newUriStr });
                } catch (e) { 
                    resolve({ error: 'save_failed', msg: e.message || String(e) }); 
                }
            };
            main.startActivityForResult(intent, __REQ__);
        } catch (e) { 
            resolve({ error: 'start_failed', msg: e.message || String(e) }); 
        }
    });
}

/**
 * 列出所有已授权的目录
 */
function 列出已授权目录() {
    var trees = __loadTrees__();
    var arr = [];
    for (var label in trees) {
        if (trees.hasOwnProperty(label)) {
            arr.push({ label: label, uri: trees[label].uri, time: trees[label].time });
        }
    }
    return arr;
}

/**
 * 移除某个目录的授权 (含防误删保护)
 */
function 移除授权(label) {
    var trees = __loadTrees__();
    var entry = trees[label];
    if (!entry) return false;
    
    var targetUri = entry.uri;
    if (typeof targetUri === 'string' && targetUri.startsWith('content://')) {
        if (!__isUriUsedByOthers__(trees, label, targetUri)) {
            try {
                var main = plus.android.runtimeMainActivity();
                var Uri = plus.android.importClass('android.net.Uri');
                var resolver = main.getContentResolver();
                plus.android.importClass(resolver);
                resolver.releasePersistableUriPermission(Uri.parse(targetUri), 3);
            } catch (e) {
            	// console.warn("释放权限失败", e);
            }
            delete window.__dirCache__[targetUri];
        }
    }
    delete trees[label];
    __saveTrees__(trees);
    return true;
}

/**
 * 🧹 清理所有不在本地记录中的孤立系统授权 (释放系统资源)
 */
function 清理孤立授权() {
    return new Promise(function(resolve) {
        try {
            var main = plus.android.runtimeMainActivity();
            var resolver = main.getContentResolver();
            plus.android.importClass(resolver);
            
            var permissions = resolver.getPersistedUriPermissions();
            plus.android.importClass(permissions);
            
            var trees = __loadTrees__();
            var localUris = {};
            for (var label in trees) {
                if (trees.hasOwnProperty(label) && trees[label].uri) {
                    localUris[trees[label].uri] = true;
                }
            }
            
            var cleanedCount = 0;
            var cleanedList = [];
            
            for (var i = 0; i < permissions.size(); i++) {
                var perm = permissions.get(i);
                plus.android.importClass(perm);
                var uriStr = perm.getUri().toString();
                
                if (!localUris[uriStr]) {
                    try {
                        resolver.releasePersistableUriPermission(perm.getUri(), 3);
                        cleanedCount++;
                        cleanedList.push(uriStr);
                        delete window.__dirCache__[uriStr];
                    } catch (e) {
                    	// console.warn("释放孤立授权失败: " + uriStr, e);
                    }
                }
            }
            
            resolve({ success: true, cleanedCount: cleanedCount, cleanedList: cleanedList });
        } catch (e) {
            resolve({ success: false, msg: '清理失败: ' + (e.message || String(e)) });
        }
    });
}

/**
 * 🔍 检查指定目录的授权与物理存在状态
 */
function 检查目录状态(label) {
    return new Promise(function(resolve) {
        var trees = __loadTrees__();
        var entry = trees[label];
        if (!entry || !entry.uri) {
            resolve({ authorized: false, exists: false, msg: '未找到该标签的授权记录' });
            return;
        }
        try {
            var main = plus.android.runtimeMainActivity();
            var Uri = plus.android.importClass('android.net.Uri');
            var DC = plus.android.importClass('android.provider.DocumentsContract');
            var resolver = main.getContentResolver();
            plus.android.importClass(resolver);
            
            var treeUri = Uri.parse(entry.uri);
            var docId = DC.getTreeDocumentId(treeUri);
            var docUri = DC.buildDocumentUriUsingTree(treeUri, docId);
            
            var cursor = resolver.query(docUri, null, null, null, null);
            if (cursor) {
                plus.android.importClass(cursor);
                var isValid = cursor.moveToFirst();
                cursor.close();
                if (isValid) {
                    resolve({ authorized: true, exists: true, uri: entry.uri, label: label, msg: '目录状态正常' });
                } else {
                    resolve({ authorized: true, exists: false, msg: '目录可能已被删除或移动', uri: entry.uri });
                }
            } else {
                resolve({ authorized: false, exists: false, msg: '无法访问该目录，权限可能已失效' });
            }
        } catch (e) {
            resolve({ authorized: false, exists: false, msg: '访问被拒绝或目录不存在: ' + (e.message || String(e)) });
        }
    });
}

// ================= 3. SAF 目录与文件操作辅助函数 =================

function __findChild__(resolver, treeUri, parentUri, name) {
    var DC = plus.android.importClass('android.provider.DocumentsContract');
    var childrenUri = DC.buildChildDocumentsUriUsingTree(treeUri, DC.getDocumentId(parentUri));
    var cursor = resolver.query(childrenUri, null, null, null, null);
    if (!cursor) return null;
    plus.android.importClass(cursor);
    var iId = cursor.getColumnIndex('document_id');
    var iName = cursor.getColumnIndex('_display_name');
    var ret = null;
    while (cursor.moveToNext()) {
        if (cursor.getString(iName) === name) {
            ret = DC.buildDocumentUriUsingTree(treeUri, cursor.getString(iId));
            break;
        }
    }
    cursor.close();
    return ret;
}

function __ensureDir__(resolver, treeUri, parts, cache) {
    var DC = plus.android.importClass('android.provider.DocumentsContract');
    var key = parts.join('/');
    if (cache[key]) return cache[key];
    var cur = DC.buildDocumentUriUsingTree(treeUri, DC.getTreeDocumentId(treeUri));
    for (var i = 0; i < parts.length; i++) {
        var sub = parts.slice(0, i + 1).join('/');
        if (cache[sub]) { cur = cache[sub]; continue; }
        var found = __findChild__(resolver, treeUri, cur, parts[i]);
        cur = found || DC.createDocument(resolver, cur, 'vnd.android.document/directory', parts[i]);
        if (!cur) throw new Error('创建目录失败: ' + parts[i]);
        cache[sub] = cur;
    }
    return cur;
}

// ================= 4. 核心保存流程 (终极稳定版) =================

/**
 * 步骤 A：Java 层流拷贝到 SAF 目录 (工业级终极版)
 * 【核心策略】：三级降级策略 + try-finally 资源保护 + 动态 MIME 推断
 */
function __copyToSaf__(safTreeUri, filename, absSourcePath) {
    return new Promise(function(resolve, reject) {
        var fis = null;
        var fos = null;
        var pfd = null;
        
        try {
            // console.log("👉 SAF 1/6: 获取系统服务与类引用");
            var main = plus.android.runtimeMainActivity();
            var Uri = plus.android.importClass('android.net.Uri');
            var DC = plus.android.importClass('android.provider.DocumentsContract');
            var File = plus.android.importClass('java.io.File');
            var FileInputStream = plus.android.importClass('java.io.FileInputStream');
            var FileOutputStream = plus.android.importClass('java.io.FileOutputStream');
            var MimeTypeMap = plus.android.importClass('android.webkit.MimeTypeMap');
            var resolver = main.getContentResolver();
            plus.android.importClass(resolver);
            
            // console.log("👉 SAF 2/6: 解析 URI 并确保目录存在");
            var treeUriObj = Uri.parse(safTreeUri);
            var parts = filename.split('/');
            var name = parts.pop();
            var cache = window.__dirCache__[safTreeUri] = window.__dirCache__[safTreeUri] || {};
            
            var dirUri = parts.length 
                ? __ensureDir__(resolver, treeUriObj, parts, cache)
                : DC.buildDocumentUriUsingTree(treeUriObj, DC.getTreeDocumentId(treeUriObj));
            
            // console.log("👉 SAF 3/6: 创建 SAF 目标文件");
            // 【优化 1】：使用 Android 原生 MimeTypeMap 动态获取 MIME 类型，取代硬编码字典
            var ext = name.split('.').pop().toLowerCase();
            var mimeType = MimeTypeMap.getSingleton().getMimeTypeFromExtension(ext);
            if (!mimeType) mimeType = 'application/octet-stream';
            
            var old = __findChild__(resolver, treeUriObj, dirUri, name);
            if (old) DC.deleteDocument(resolver, old);
            
            var fileUri = DC.createDocument(resolver, dirUri, mimeType, name);
            if (!fileUri) { reject(new Error("创建 SAF 文件失败")); return; }
            
            // console.log("👉 SAF 4/6: 打开文件描述符与输入输出流");
            pfd = resolver.openFileDescriptor(fileUri, "w");
            plus.android.importClass(pfd);
            fos = new FileOutputStream(pfd.getFileDescriptor());
            
            var srcFile = new File(absSourcePath);
            // console.log("🔍 【关键检查】临时文件真实大小: " + srcFile.length() + " 字节");
            
            fis = new FileInputStream(srcFile);
            
            // console.log("👉 SAF 5/6: 执行拷贝 (三级降级策略)");
            var totalWritten = 0;
            var copySuccess = false;
            
            // 【方案 A】：Android 10+ (API 29) 官方单次拷贝方法 (首选，极快)
            try {
                // console.log("   - 尝试方案 A: android.os.FileUtils.copy (Android 10+)");
                var FileUtils = plus.android.importClass("android.os.FileUtils");
                FileUtils.copy(fis, fos);
                totalWritten = srcFile.length();
                copySuccess = true;
                // console.log("✅ 方案 A 成功: FileUtils.copy 瞬间完成");
            } catch (e1) {
                // console.log("   - 方案 A 失败 (" + (e1.message || e1) + ")，尝试方案 B...");
                
                // 【方案 B】：使用 5+ 引擎内置的 Apache Commons IO (备选)
                try {
                    // console.log("   - 尝试方案 B: org.apache.commons.io.IOUtils.copy");
                    var IOUtils = plus.android.importClass("org.apache.commons.io.IOUtils");
                    IOUtils.copy(fis, fos);
                    totalWritten = srcFile.length();
                    copySuccess = true;
                    // console.log("✅ 方案 B 成功: IOUtils.copy 完成");
                } catch (e2) {
                    // console.log("   - 方案 B 失败 (" + (e2.message || e2) + ")，尝试终极兜底方案 C...");
                    
                    // 【方案 C】：JS while 循环 + ByteBuffer (终极兜底，兼容性 100%)
                    try {
                        // console.log("   - 尝试方案 C: ByteBuffer 循环拷贝 (兼容所有老旧设备)");
                        var ByteBuffer = plus.android.importClass("java.nio.ByteBuffer");
                        var buffer = ByteBuffer.allocate(65536).array(); // 64KB 缓冲区
                        var len;
                        while ((len = fis.read(buffer)) != -1) {
                            fos.write(buffer, 0, len);
                            totalWritten += len;
                        }
                        copySuccess = true;
                        // console.log("✅ 方案 C 成功: ByteBuffer 循环拷贝完成");
                    } catch (e3) {
                        // console.error("❌ 方案 C 也失败:", e3);
                        throw new Error("所有拷贝方案均失败: " + (e3.message || e3));
                    }
                }
            }
            
            // console.log("🎉🎉🎉 SAF 拷贝完成，实际大小: " + totalWritten + " 字节");
            resolve({ success: true, uri: fileUri.toString(), size: totalWritten });
            
        } catch (e) {
            // console.error("❌ Java 层流拷贝异常 (捕获到错误)", e);
            reject(e);
        } finally {
            // 【优化 2】：使用 finally 块确保无论成功还是失败，系统资源都会被安全释放，防止内存/句柄泄漏
            // console.log("👉 SAF 6/6: 关闭流并释放系统资源");
            try { if (fis) fis.close(); } catch (e) {}
            try { if (fos) { fos.flush(); fos.close(); } } catch (e) {}
            try { if (pfd) pfd.close(); } catch (e) {}
        }
    });
}

/**
 * 步骤 B：主调度函数 (对外暴露的统一接口)
 */
function 保存到指定目录(label, filename, blobData) {
    return new Promise(function(resolve) {
        var trees = __loadTrees__();
        var entry = trees[label];
        if (!entry || !entry.uri) { 
            resolve({ error: 'no_permission', msg: '未找到该标签的授权，请先调用 选择保存目录()' }); 
            return; 
        }

        // 兼容处理：如果传入的是 blob: URL，先将其转换回真实的 Blob 对象
        if (typeof blobData === 'string' && blobData.slice(0, 5) === 'blob:') {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', blobData, true);
            xhr.responseType = 'blob';
            xhr.onload = function() {
                if (xhr.status === 200 && xhr.response) {
                    _executeSave(label, filename, xhr.response, resolve);
                } else {
                    resolve({ error: 'blob_invalid', msg: 'Blob URL 已失效，请确保传入原始的 Blob 对象' });
                }
            };
            xhr.onerror = function() { resolve({ error: 'blob_error', msg: '读取 Blob URL 失败' }); };
            xhr.send();
        } else {
            _executeSave(label, filename, blobData, resolve);
        }
    });
}

function _executeSave(label, filename, blobData, resolve) {
    // 使用 TEMP 子目录，保持整洁
    var tempFileName = "TEMP/temp_saf_" + Date.now() + "_" + filename.split('/').pop();
    // console.log("⏳ 步骤 1/3: 正在通过 内部下载 保存临时文件...");
    
    // 调用你稳定的 内部下载 函数 (type=2 代表 PRIVATE_DOC)
    内部下载(tempFileName, blobData, 2).then(function(returnedPath) {
        
        // 【关键安全检查】：确保传给 Java 层的是绝对路径
        // 如果 内部下载 返回的是相对路径（如 "_doc/TEMP/..."），将其转换为绝对路径
        var absPath = returnedPath;
        if (absPath && !absPath.startsWith('/storage/') && !absPath.startsWith('file://')) {
            absPath = plus.io.convertLocalFileSystemURL(absPath);
        }
        
        // console.log("✅ 步骤 1/3 完成: 临时文件保存成功, 绝对路径: " + absPath);
        
        var trees = __loadTrees__();
        // console.log("⏳ 步骤 2/3: 正在通过 Java 层流拷贝到 SAF 目录...");
        
        __copyToSaf__(trees[label].uri, filename, absPath).then(function(res) {
            // console.log("✅ 步骤 2/3 完成: SAF 拷贝成功, 实际大小: " + res.size + " 字节");
            
            // console.log("⏳ 步骤 3/3: 正在清理临时文件...");
            if (typeof 删除文件 === 'function') {
                // 你的 删除文件 函数内部会自动拼接 '_doc/' + path
                // 所以直接传入原始的 tempFileName (如 "TEMP/xxx") 即可完美匹配
                删除文件(tempFileName).then(function() {
                    // console.log("✅ 步骤 3/3 完成: 临时文件已清理");
                }).catch(function(e){ 
                    // console.warn("清理临时文件失败 (非致命错误)", e); 
                });
            }
            
            resolve(res);
            
        }).catch(function(err) {
            // console.error("❌ 步骤 2/3 失败:", err);
            resolve({ error: 'copy_failed', msg: err.message || String(err) });
        });
        
    }).catch(function(err) {
        // console.error("❌ 步骤 1/3 失败:", err);
        resolve({ error: 'temp_save_failed', msg: err });
    });
}