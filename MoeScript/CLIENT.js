/*function flattenObjectToPaths(obj, currentPath = "")
{
	let result = [];
	for(let key in obj)
	{
		if(!obj.hasOwnProperty(key))continue;
		let value = obj[key];
		if(typeof value === "string")// 如果值是字符串（文件），直接拼接到 currentPath，忽略 key 是否为数字
		{
			// 如果 key 是数字，我们不把它加进路径，直接用 currentPath + value
			// 否则，拼接 key
			let finalPath = isNaN(key) ? (currentPath ? `${currentPath}/${key}` : key) : (currentPath || "");
			finalPath = finalPath ? `${finalPath}/${value}` : value;
		 	result.push(finalPath);
		}
		else if(Array.isArray(value))// 如果是数组，遍历每个元素（应为字符串）
		{
			for(let i=0,len=value.length;i<len;i++)
			{
				if(typeof value[i] !== "string")continue;
				let newPath = isNaN(key) ? (currentPath ? `${currentPath}/${key}` : key) : currentPath;
				newPath = newPath ? `${newPath}/${value[i]}` : value[i];
				result.push(newPath);
			}
		}
		else if(typeof value === "object" && value !== null)// 如果是对象，递归
		{
			// 如果 key 是数字，不拼接到路径中，保持 currentPath 不变
			let newPath = isNaN(key) ? (currentPath ? `${currentPath}/${key}` : key) : currentPath;
			result = result.concat(flattenObjectToPaths(value, newPath));
		}
	}
	return result;
}*/
async function file_exists(filePath)
{
	if(nwjs)
	{
		try{return await fs.pathExists(filePath)}
		catch{return false}
	}
	else
	{
		return new Promise(function(resolve)
		{
			plus.io.resolveLocalFileSystemURL('_doc/'+filePath, function(file)
			{
				if(file.isFile)
				{
					file.file(function(entry)
					{
						if(entry.size)resolve(true);//是文件
						else resolve(false)
					})
				}
				else resolve(false);//不是文件
			},function(error){resolve(false)});//不存在
		});
	}
}
async function ZipToJson(file)
{
	let json = await $ajax(file,'更新')
	json = await json.arrayBuffer()
	json = await new JSZip().loadAsync(json);
	return await json.files[Object.keys(json.files)[0]].async('string')
}
async function 保存文件(filename, data)
{
	if(nwjs)
	{
		let dirname = filename.split('/')
		filename = dirname.pop()
		dirname = dirname.join('/')
		if(typeof data === 'string')data = new Blob([data],{'type':'application/json'});
		let buffer = Buffer.from(await data.arrayBuffer());//将 Blob 转为 Buffer
		if(!fs.existsSync(dirname))fs.mkdirSync(dirname,{recursive: true});//自动创建多级目录
		fs.writeFileSync(`${dirname}/${filename}`, buffer);// 写入文件
		return filename
	}
	return new Promise(function(resolve)
	{
		let ext = filename.split('.').slice(-1)[0]
		if(ext == 'json' || data == '')
		{
			plus.io.requestFileSystem(plus.io.PRIVATE_DOC,function(fs)
			{
				fs.root.getFile(filename,{create: true,exclusive: false},function(fileEntry)
				{
					fileEntry.file(function(file)
					{
						fileEntry.createWriter(function(writer)//写入文件
						{
							writer.onwrite = function(e){resolve(filename)}
							writer.write(data);
						});
					});
				});
			});
		}
		else
		{
			let reader = new FileReader();
			reader.onloadend = function()
			{
				let bitmap = new plus.nativeObj.Bitmap()
				bitmap.loadBase64Data(reader.result, function()// 从本地加载Bitmap图片
				{
					bitmap.save("_doc/"+filename,{overwrite: true},function(i)
					{
						resolve(filename);
					})
				})
			};
			reader.readAsDataURL(data);
		}
	});
}
async function 删除文件(filename)
{
	return new Promise(function(resolve)
	{
		plus.io.resolveLocalFileSystemURL(filename,function(fileEntry)
		{
			fileEntry.remove(function(){resolve(filename)})
		},function(){resolve(false)})
	});
}
async function 复制文件(srcPath, dstPath)
{
	await 保存文件(dstPath,'')
	await 删除文件(dstPath)
	return new Promise(function(resolve)
	{
		plus.io.resolveLocalFileSystemURL(srcPath, function(srcEntry)
		{
			// 直接解析目标目录（不是文件）
			var dstDir = dstPath.substring(0, dstPath.lastIndexOf('/') + 1);
			var dstFileName = dstPath.substring(dstPath.lastIndexOf('/') + 1);
			plus.io.resolveLocalFileSystemURL(dstDir, function(parentEntry)
			{
				srcEntry.copyTo(parentEntry,dstFileName,function(){resolve(dstPath)});
			});
		});
	});
}
async function 复制目录(src,dst,files = [])
{
	if(nwjs)
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
	for(let i=0,len=files.length;i<len;i++)
	{
		let oldfile = '_doc/'+files[i]
		let newfile = '_doc/'+files[i].replace(src,dst)
		await 复制文件(oldfile,newfile)
	}
}
async function 下载文件(url,filename,更新 = false)
{
	if(nwjs)
	{
		let data = await $ajax(url,更新)
		let dirname = filename.split('/')
		filename = dirname.pop()
		dirname = dirname.join('/')
		if(typeof data === 'string')data = new Blob([data],{'type':'application/json'});
		let buffer = Buffer.from(await data.arrayBuffer());//将 Blob 转为 Buffer
		if(!fs.existsSync(dirname))fs.mkdirSync(dirname,{recursive: true});//自动创建多级目录
		fs.writeFileSync(`${dirname}/${filename}`, buffer);// 写入文件
		return filename
	}
	else
	{
		await 删除文件('_doc/'+filename)
		return new Promise(function(resolve)
		{
			filename = '_doc/'+filename
			plus.downloader.createDownload(url,{filename:filename},function(d, status)
			{
				if(status === 200)resolve(filename)
				else resolve(false)
			}).start()
		});
	}
	
}
async function 并发下载_限流(文件列表,并发数 = 5)
{
	let i = 1
	let l = 文件列表.length
	async function 执行任务()
	{
		while(文件列表.length > 0)
		{
			let file = 文件列表.shift();
			await 下载文件("http://localhost:13131/_www/"+file,file);
			i++
			$('.更新应用').text(`进度：${parseInt(100/(l/i))}%`)
		}
	}
	let 工人列表 = Array.from({length:并发数},执行任务);// 启动 N 个并发“工人”
	await Promise.all(工人列表);
	return;
}
async function 更新应用(time = Date.now())
{
	if(Html5Plus == 'mmt.MoeTalkH.WumberBee' && !localStorage['Html5Plus'])
	{
		let str = ''
		str += '首次运行需复制文件，请耐心等待\n<span class="更新应用"></span>\n复制完成后将刷新页面\n'
		str += '如果您的www目录下有游戏数据包，请手动移动到doc目录下\ndoc目录为MoeTalk以后主要的运行目录'
		alert(str)
		let 本地列表 = JSON.parse(await $ajax(`${href}MoeData/Version/MoeTalk.json?time=${time}`))
		本地列表['MoeData/Version/MoeTalk.json'] = 1
		本地列表['MoeData/Version/Version.json'] = 1
		if(本地列表)
		{
			await 并发下载_限流(Object.keys(本地列表),5)
			localStorage['Html5Plus'] = 'mmt.MoeTalkH.WumberBee'
			location.reload(true)
		}
		return
	}
	本地应用版本 = JSON.parse(await $ajax(`${href}MoeData/Version/Version.json?time=${localStorage['本地应用版本']}`))
	localStorage['本地应用版本'] = 本地应用版本
	if(!nwjs && Html5Plus != 'mmt.MoeTalkH.WumberBee')return

	网络应用版本 = JSON.parse(await $ajax(`${MoeTalkURL}MoeData/Version/Version.json?time=${time}`))
	if(!本地应用版本)本地应用版本 = [0]
	if(网络应用版本 && 本地应用版本[0] < 网络应用版本[0])
	{
		if($('.版本:visible').length == 0)update()
		let 本地列表 = JSON.parse(await $ajax(`${href}MoeData/Version/MoeTalk.json?time=${time}`))
		let 网络列表 = JSON.parse(await ZipToJson(`${MoeTalkURL}MoeData/Version/MoeTalk.zip?ver=${网络应用版本[0]}`))
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
					if(await 下载文件(`${MoeTalkURL}${file}?md5=${md5}`,`${Update}/${file}`,'更新'))
					{
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
			$('.更新应用').html('<span style="color:red;">MoeTalk更新中！请不要刷新或退出</span>')
			files.push(await 保存文件(`${Update}/MoeData/Version/Version.json`,JSON.stringify(网络应用版本)))
			files.push(await 保存文件(`${Update}/MoeData/Version/MoeTalk.json`,JSON.stringify(网络列表)))
			await 复制目录(Update,'',files)
			$('.更新应用').html('<span style="color:red;">MoeTalk更新完毕！</span>')
		}
	}
}
async function 更新数据(time = Date.now())
{
	if(Html5Plus == 'mmt.MoeTalkH.WumberBee' && !localStorage['Html5Plus'])return
	let game = mt_settings['选择游戏'] || 'NONE'
	if(game == 'NONE')return
	本地数据版本 = JSON.parse(await $ajax(`${href}GameData/${game}/Version/Version.json?time=${time}`))
	localStorage['本地数据版本'] = 本地数据版本
	if(!nwjs && Html5Plus != 'mmt.MoeTalkH.WumberBee')return

	网络数据版本 = JSON.parse(await $ajax(`${MoeTalkURL}GameData/${game}/Version/Version.json?time=${time}`))
	if(!本地数据版本)本地数据版本 = [-1]
	if(网络数据版本 && 本地数据版本[0] < 网络数据版本[0])
	{
		if($('.版本:visible').length == 0)update()
		let 本地列表 = JSON.parse(await $ajax(`${href}GameData/${game}/Version/${game}.json?time=${time}`))
		let 网络列表 = JSON.parse(await $ajax(`${MoeTalkURL}GameData/${game}/Version/${game}.json?ver=${网络数据版本[0]}`))
		let Update = `更新补丁/${game}_${网络数据版本[0]}`
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
					let data = await ZipToJson(`${MoeTalkURL}GameData/${game}/Version/${file}.zip?ver=${网络数据版本[0]}`)
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
			$('.更新数据').html('<span style="color:red;">更新数据中，请不要退出或刷新！</span>')
			files.push(await 保存文件(`${Update}/Version/Version.json`,JSON.stringify(网络数据版本)))
			files.push(await 保存文件(`${Update}/Version/${game}.json`,JSON.stringify(网络列表)))
			await 复制目录(Update,'GameData/'+game,files)
		}
		
	}
	检查数据()
}
var 文件总数 = '0'
var 文件列表 = []
var 网址列表 = []
async function 检查数据()
{
	文件列表 = []
	let data = JSON.parse(await $ajax(`${href}GameData/${mt_settings['选择游戏']}/List.json?ver=${localStorage['本地数据版本']}`))
	let link = `GameData/${mt_settings['选择游戏']}`,arr = []
	for(let key1 in data)
	{
		let val1 = data[key1]
		let ext = key1 == 'Library' ? 'json' : 'webp'
		for(let key2 in val1)
		{
			let val2 = val1[key2]
			if(typeof val2 === 'string')arr.push(`${link}/${key1}/${val2}.${ext}`)
			else
			{
				for(let key3 in val2)
				{
					let val3 = val2[key3]
					if(typeof val3 === 'string')arr.push(`${link}/${key1}/${key2}/${val3}.${ext}`)
					else
					{
						for(let key4 in val3)
						{
							let val4 = val3[key4]
							if(typeof val4 === 'string')arr.push(`${link}/${key1}/${key2}/${key3}/${val4}.${ext}`)
						}
					}
				}
			}
		}
	}
	$.ajax(
	{
		url: "https://api.akams.cn/github",
		success: function(data)
		{
			网址列表 = []
			网址列表.push('https://moetalk.netlify.app')
			网址列表.push('https://raw.githubusercontent.com/ggg555ttt/MoeTalk/main')
			foreach(data.data,function(k,v)
			{
				网址列表.push(v.url+'/https://raw.githubusercontent.com/ggg555ttt/MoeTalk/main')
			})
			文件列表 = arr
			文件总数 = 文件列表.length-1
			foreach(网址列表,function(k,v){下载数据(v)})
		}
	});
}
async function 下载数据(url)
{
	if(!文件列表.length)
	{
		文件总数 = 0
		return
	}
	let filename = 文件列表.shift()//获取下载路径
	if(await file_exists(filename))//本地存在就跳过
	{
		$('.更新数据').text('剩余下载文件：'+文件总数--)
		下载数据(url)
	}
	else
	{
		let data = await $ajax(`${url}/${filename}`)
		if(data)//下载成功
		{
			await 保存文件(filename, data)
			$('.更新数据').text('剩余下载文件：'+文件总数--)
			下载数据(url)
		}
		else
		{
			文件列表.unshift(filename)//失败换源
			下载数据(网址列表[Math.floor(Math.random()*网址列表.length)])
		}
	}
}