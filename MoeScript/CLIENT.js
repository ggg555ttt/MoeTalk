$.ajax(
{
	url: '/index.php',
	type: 'POST',
	data: {backDown: true},
	success: function(type)
	{
		if(type === 'PHPWin')客户端 = 'PHPWin'
		if(type === 'server')客户端 = 'phpwin'
	}
})
async function file_exists(filePath)
{
	if(客户端 === 'NW.js')
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
						if(entry.size)resolve(entry.fullPath);//是文件
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
	let json = await $ajax(file)
	json = await json.arrayBuffer()
	json = await JSZip.loadAsync(json);
	return await json.files[Object.keys(json.files)[0]].async('string')
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
	if(typeof data === 'object' && !data.size)data = JSON.stringify(data)
	if(typeof data === 'string')data = new Blob([data],{type:'application/octet-stream'});
	if(!客户端)
	{
		saveAs(data, filename);
		return filename
	}
	if(客户端 === 'NW.js')
	{
		if(type === 'json')filename = '存档/'+filename
		if(type === 'image' || type === 'zip')filename = '截图/'+filename
		data = Buffer.from(await data.arrayBuffer());//将 Blob 转为 Buffer
		await fs.outputFile(filename, data);
		return `客户端路径/${filename}`
	}
	if(客户端 === 'HTML5+')
	{
		let fname = filename
		if(type === 2)fname = await 内部下载(filename, data, type)
		if(type === 'image')fname = await 内部下载(filename, data, 3)
		if(type === 'json' || type === 'zip')
		{
			fname = await 外部下载(filename, data)
			if(!fname)fname = await 内部下载(filename, data, 4)
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
	if((客户端 || '').toLowerCase() === 'phpwin')
	{
		if(客户端 === 'phpwin')
		{
			data = await blobToBase64(data)
			if(type === 'zip' || filename.split('.').pop() === 'PNG')type = 'image'
			if(type === 'json')data = decodeURIComponent(escape(atob(data)))
			await $.ajax(
			{
				url: '/index.php',
				async: true,
				type: 'POST',
				data: 
				{
					backDown: true,
					filename: filename,
					data: data,
					type: type,
					time: ''
				},
				dataType:'text'
			});
			data = "文件/我的iPhone/phpwin/<span style='color:blue;'>"
			filename = `${data}${type.toUpperCase()}</span>/${filename}`
		}
		// if(客户端 === 'PHPWin')
		return filename
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
	if(!dst)src += '/'
	for(let i=0,len=files.length;i<len;i++)
	{
		await 保存文件(files[i].replace(src,dst),await $ajax(`${href}${files[i]}`))
	}
	return
}
async function 安装应用()
{
	alert("")
	$('.title').text('安装应用').next().hide()
	$('.confirm').parent().hide()
	$('.notice pre').html("请不要退出或刷新\n<span class='更新应用'>请稍等。。。</span>\n").css('text-align','center')
	let 本地列表 = JSON.parse(await $ajax(`${href}MoeData/Version/MoeTalk.json?time=${time}`))
	本地列表['MoeData/Version/MoeTalk.json'] = 1
	本地列表['MoeData/Version/Version.json'] = 1
	let 文件列表 = Object.keys(本地列表)
	async function 下载线程()
	{
		while(文件列表.length > 0)
		{
			let file = 文件列表.shift();
			await 保存文件(file,await $ajax(`${href}${file}`))
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
	$('.更新应用').html('<span style="color:red;">MoeTalk更新中！请不要刷新或退出</span>')
	网络应用版本 = JSON.parse(await $ajax(`${MoeTalkURL}MoeData/Version/Version.json?time=${time}`))
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
					let data = await $ajax(`${MoeTalkURL}${file}?md5=${md5}`)
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
	let game = mt_settings['选择游戏'] || 'NONE'
	if(!本地 || game == 'NONE')return
	$('.更新数据').html('<span style="color:red;">数据更新中！请不要刷新或退出</span>')
	本地数据版本 = JSON.parse(await $ajax(`${href}GameData/${game}/Version/Version.json?time=${time}`)) || [-1]
	网络数据版本 = JSON.parse(await $ajax(`${MoeTalkURL}GameData/${game}/Version/Version.json?time=${time}`))
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
			files.push(await 保存文件(`${Update}/Version/Version.json`,JSON.stringify(网络数据版本)))
			files.push(await 保存文件(`${Update}/Version/${game}.json`,JSON.stringify(网络列表)))
			await 复制目录(Update,'GameData/'+game,files)
		}
		$('.更新数据').html('数据更新完毕！文件请通过选择游戏或刷新页面来下载')
	}
	else $('.更新数据').html('<span style="color:red;">暂未发现更新</span>')
	
}
var 文件总数 = '0'
var 数据列表 = []
var 网址列表 = []
async function 检查数据()
{
	let game = mt_settings['选择游戏'] || 'NONE'
	if(game == 'NONE')return
	$('.更新数据').text('读取数据列表。。。')
	数据列表 = []
	let data = JSON.parse(await $ajax(`${href}GameData/${mt_settings['选择游戏']}/List.json?ver=${本地数据版本}`))
	let link = `GameData/${mt_settings['选择游戏']}`
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
				if(!await file_exists(val2))数据列表.push(val2)
			}
			else
			{
				for(let key3 in val2)
				{
					let val3 = val2[key3]
					if(typeof val3 === 'string')
					{
						val3 = `${link}/${key1}/${key2}/${val3}.${ext}`
						if(!await file_exists(val3))数据列表.push(val3)
					}
					else
					{
						for(let key4 in val3)
						{
							let val4 = val3[key4]
							if(typeof val4 === 'string')
							{
								val4 = `${link}/${key1}/${key2}/${key3}/${val4}.${ext}`
								if(!await file_exists(val4))数据列表.push(val4)
							}
						}
					}
				}
			}
		}
	}
	if(数据列表.length)
	{
		$('.更新数据').text('剩余文件：'+数据列表.length)
		let data = await $ajax('https://api.akams.cn/github','json')
		data = data ? JSON.parse(data).data : []
		网址列表 = []
		网址列表.push('https://moetalk.netlify.app')
		网址列表.push('https://raw.githubusercontent.com/ggg555ttt/MoeTalk/main')
		foreach(data,function(k,v)
		{
			网址列表.push(v.url+'/https://raw.githubusercontent.com/ggg555ttt/MoeTalk/main')
		})
		文件总数 = 数据列表.length-1
		foreach(网址列表,function(k,v){下载数据(v)})
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
	let filename = 数据列表.shift()//获取下载路径
	if(await file_exists(filename))//本地存在就跳过
	{
		$('.更新数据').text('剩余文件：'+文件总数--)
		下载数据(url)
	}
	else
	{
		let data = await $ajax(`${url}/${filename}`)
		if(data)//下载成功
		{
			await 保存文件(filename, data)
			$('.更新数据').text('剩余文件：'+文件总数--)
			下载数据(url)
		}
		else
		{
			数据列表.unshift(filename)//失败换源
			下载数据(网址列表[Math.floor(Math.random()*网址列表.length)])
		}
	}
}
async function 导出存档(filename,json)
{
	if(typeof json !== 'string')json = JSON.stringify(json)
	json = new Blob([json],{type: 'application/json'})
	if($('.存档格式').val() === 'json')
	{
		filename = await 保存文件(filename+'.JSON',json,'json')
		alert(`<span style="color:red;">${filename}</span>已下载\n`)
		return
	}
	let png = await html2canvas($('.ckdZao')[0],
	{
		logging: !1,
		allowTaint: !0,
		useCORS: !0,
		scale: 1.1,
		compress: true,
		embedFonts: true//snapdom
	})
	png = atob(png.toDataURL('image/png').split(',')[1])
	for(var zip=Array(png.length),i=0,l=zip.length;i<l;i++)zip[i] = png.charCodeAt(i);

	let file = new FileReader;
	file.onload = async function()
	{
		png = new Blob([new Uint8Array(zip)],{type: 'image/png'})
		zip = new DataView(file.result)
		let a = png.size,
			b = zip.byteLength-22,
			c = zip.getUint32(b+16, !0);
		for(zip.setUint32(b+16, c+a, !0); c<b;)
		{
			let d = zip.getUint16(c+28, !0),
				e = zip.getUint16(c+30, !0),
				f = zip.getUint32(c+42, !0);
			zip.setUint32(c+42, f+a, !0)
			c += 46+d+e
		}
		png = new Blob([png, zip],{type: 'image/png'})
		filename = await 保存文件(filename+'.PNG',png,'json')
		png = await blobToBase64(png)
		let str = `<span style="color:red;">${filename}</span>已下载\n`
		str += '如果下载失败，请尝试手动保存下方的图片\n'
		str += `<img src='data:image/png;base64,${png}'style='border: 2px solid red;width: 100%;'>\n`
		str += '可将图片后缀名改为"zip"后解压'
		alert(str)
	}
	file.readAsArrayBuffer(await new JSZip().file('json.txt',json).generateAsync({type: 'blob'}))
}
async function 导出截图(filename,data)
{
	let ext = mt_settings['图片格式'].split('/')[1]
	if(imageZip)
	{
		imageZip.file(`${filename}.${ext}`,data);
		if(imageArrL === Object.keys(imageZip.files).length)
		{
			imageZip = await imageZip.generateAsync({type:'blob'})
			imageZip = await 保存文件(filename+'.zip',imageZip,'zip')
			$('.INDEX_CaptureTips').html(`<span style="color:red;">${imageZip}</span>`)
			imageZip = null
		}
	}
	else
	{
		filename = await 保存文件(`${filename}.${ext}`,data,'image')
		$('.INDEX_CaptureTips').html(`<span style="color:red;">${filename}</span>`)
	}
	if(!正在截图)
	{
		data = await blobToBase64(data)
		截图区域.html(`<img src='data:${mt_settings['图片格式']};base64,${data}' style='width:100%;'>`)
	}
	$('.截图数量').text(imageArr.length)
}