/*@MoeScript/IMAGE.js@*/
var imageArr = [];//截图分段列表
var imageArrL = 0//截图分段数量
var imgArea = {}
var imageZip = null;//压缩文件
var 截图区域
var 正在截图 = false
var 上次截图 = []
var 首次截图 = false
var 羁绊背景 = href+'MoeData/Ui/Favor_Schedule_Deco.webp'
var 回复背景 = href+'MoeData/Ui/Popup_Img_Deco_2.webp'
var 错误图片 = href+'MoeData/Ui/error.webp'
var 下载文件 = {}
var 截图高度 = isNaN(parseInt(localStorage['截图高度'])) ? 16384 : parseInt(localStorage['截图高度'])
async function IMAGE_error(image,play)
{
	let src,url,img
	src = image.src ? image.getAttribute('src') : image.target.getAttribute('src')
	url = src.split('/').pop().replace('.webp','')
	if(本地 && src && GAME != 'NONE' && src.startsWith(href+'GameData'))
	{
		let filename = src.replace(href+'GameData','GameData')
		let link = 'https://moetalk.xiyihan.cn/'+filename
		if(!下载文件[link])
		{
			下载文件[link] = 1
			img = await getfile(link)
			await 保存文件(filename, img)
			if(img)img = src
			else img = href+'MoeData/Ui/error.webp'
			delete 下载文件[link]
		}
	}
	else
	{
		img = (play ? await 数据操作('Cg',url) : await 数据操作('Ig',url) || await 数据操作('Tg',url)) || href+'MoeData/Ui/error.webp'
		if(img[0] === 'G')img = href+img
	}
	if(image.src)
	{
		image.src = img
		image.title = url
	}
	else
	{
		image.target.src = img
		image.target.title = url
	}
	return
}
function isCusImg(src)
{
	if(typeof src !== 'string')return !1
	return src.startsWith('custom-') ||
	src.startsWith('CharFace-') ||
	src.startsWith('Emoji-') ||
	src.startsWith('Image-') ||
	(GAME === 'BLDA' && src > 999) 
}
function loadImg(src)
{
	if(src.startsWith('Image-'))return href+`用户数据/MoeTemp/${src}.webp`
	if(isCusImg(src))return href+`用户数据/${TempImg.has(src) ? 'MoeTemp' : 'MoeImage'}/${src}.webp`
	return href+src
}
function 加载图片(images)
{
	if(images.length === 0)return Promise.resolve();

	const seenSrcs = new Set();
	const pendingImages = [];
	let pendingCount = 0;

	for(let i = 0; i < images.length; i++)
	{
		const img = images[i];
		let src = img.getAttribute('src') || '';
		img.src = src;// 使用解析后的完整 URL

		// 跳过已加载、Base64、重复
		if(img.complete && img.naturalWidth > 0)continue;
		if(isBase64(src))continue;
		if(seenSrcs.has(src))continue;
		seenSrcs.add(src);
		pendingImages.push(img);
		pendingCount++;
	}

	if(pendingCount === 0)return Promise.resolve();

	return new Promise(resolve=>
	{
		let resolved = 0;
		const onReady = ()=>{if(++resolved === pendingCount)resolve();};
		for(const img of pendingImages)
		{
			img.addEventListener('load', onReady, {once: true});
			img.addEventListener('error', onReady, {once: true});
		}
	});
}
async function 等待图片(imgs)
{
	if(!imgs[0])return;
	imgs = imgs[0].querySelectorAll('img');
	for(let i=0,l=imgs.length;i<l;i++)
	{
		let img = imgs[i];
		let src = img.getAttribute('src') || '';
		if(!isBase64(src))
		{//只选择链接图片
			let url = src.split('/').pop().replace('.webp','')
			if(isCusImg(url))
			{//匹配自定义图片
				src = await 数据操作('Ig',url) || await 数据操作('Tg',url) || href+'MoeData/Ui/error.webp'
			}
			else if(本地 && 客户端 === 'HTML5+')src = await urlToBase64(src || href+'MoeData/Ui/error.webp');
		}
		img.src = src;// 使用解析后的完整 URL
	}
	await 加载图片(imgs)
}
//图片压缩
function compress(base64Img,type = 'head',mode = 'add',length = 0)
{
	var img = new Image();//创建一个空白图片对象
	img.src = base64Img;//图片对象添加图片地址
	img.onload = function()//图片地址加载完后执行操作
	{
		w = img.width;
		h = img.height;

		let x = 0;let y = 0;let l = w;//正方形头像

		if(type === 'image')w > 600 && (h *= 600 / w, w = 600)
		else
		{
			if(w > h)x = (w-h)/2,l = h,h = w;//竖图上下居中
			else y = (h-w)/2,l = w,w = h;//横图左右居中
			n = mt_settings['头像尺寸'] ? mt_settings['头像尺寸'] : 300;
			a = Math.min(1, n / w);(w *= a), (h *= a);//最大高度不得超过300
		}

		//开始画压缩图
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		canvas.width = w;//压缩图的宽度
		canvas.height = h;//压缩图的高度

		if(type === 'image')ctx.drawImage(img,0,0,w,h);
		else ctx.drawImage(img,x,y,l,l,0,0,w,h);

		var newBase64 = canvas.toDataURL("image/webp");

		if(type === 'image')
		{
			let img = 'Image-'+getNowDate()
			if(mode === 'edit')
			{
				数据操作('Ts',img,newBase64).then(()=>
				{
					$('.图片文件').attr({src: img,title: img})//编辑图片
				})
				
			}
			else if(mode === 'add')
			{
				数据操作('Ts',img,newBase64).then(()=>
				{
					sendMessage({content:'',type: 'image',file: img},'image',mode)//发送图片
				})
			}
			else//上传表情
			{
				let Emojis = $('.Emojis')
				if(Emojis[0].title === 'ADD')Emojis.append(`<img style='width:33%;' src='${newBase64}' onclick="this.remove()">`)
				else Emojis[0].src = newBase64
			}
		}
		else
		{
			if(mode === 'edit')$(".heads .selected").attr('src',newBase64)//编辑头像
			else
			{
				let attr = 'width="252" height="252" decoding="async" data-nimg="1" loading="lazy" style="color: transparent; margin-right: 0.5rem;" class="common__Profile-sc-1ojome3-6 common__ProfileClick-sc-1ojome3-7 eLaCqa fuyFOl"'
				let index = $('.heads img:eq(-1)').attr('title')
				let id = char_info.no
				if(index)
				{

					if(!id.startsWith('custom-'))id = 'custom-'+id
					index = parseInt(index.replace(id,'').replace('_',''))
					if(isNaN(index))index = `${id}_0`
					else index = `${id}_${index+1}`
				}
				else index = id
				$(`.delheads img[title='${index}']`).remove()
				$('.heads').append(`<img src="${newBase64}" title="${index}" ${attr}>`)
				$('#custom-char .yes').removeAttr('disabled')
				$('.headinfo').show()
				$('.heads img:eq(-1)').click()
			}
		}
		INIT_loading(false)
	}
}
function 截图数量(num)
{
	let i = 1,height = 0,height2 = 0
	$('.消息:visible').each(function()
	{
		height = $(this).outerHeight()+height
		height2 = $(this).next().outerHeight()
		if((height+height2+16)*num > 截图高度)
		{
			i++
			height = 0
		}
	})
	let height3 = parseInt($(".Talk__CContainer-sc-1uzn66i-1").outerHeight()*num);
	//test(height3+((i-1)*16*num))
	return i;
}
function urlToBase64(url)
{
	return new Promise(function(resolve)
	{
		plus.io.resolveLocalFileSystemURL(url,function(entry)
		{
			entry.file(function(data)
			{
				var reader = new plus.io.FileReader();
				reader.onload = function(e)
				{
					data = e.target.result
					if(!data)resolve(错误图片);
					else resolve(data)
				};
				reader.onerror = function(e){resolve(错误图片)};
				reader.readAsDataURL(data);
			},function(e){resolve(错误图片)});
		},function(e){resolve(错误图片)});
	})
}
function mt_title()
{
	$(".Talk__CContainer-sc-1uzn66i-1").outerWidth(mt_settings['宽度限制'])
	$.each(mt_settings['截图选项'],function(k,v)
	{
		if(v)
		{
			$('#mt_'+k).show()
			$(`.截图选项[title="${k}"]`).prop('checked',true)
		}
		else
		{
			$('#mt_'+k).hide()
			$(`.截图选项[title="${k}"]`).prop('checked',false)
		}
	})
	mt_settings['截图选项'].watermark ? $('#mt_watermark').show() : $('#mt_watermark').hide()
	mt_settings['截图选项'].title ? $('#mt_title').show() : $('#mt_title').hide()
	mt_settings['截图选项'].writer ? $('#mt_writer').show() : $('#mt_writer').hide()
	let writer = $('#mt_writer').text() || toString(mt_settings['截图选项'].writerStr)
	let title = $('#mt_title').text() || toString(mt_settings['截图选项'].titleStr)
	if(writer)
	{
		$('#mt_writer').text(writer)
		$('.mt_writer').text(writer.split(' : ')[1])
	}
	if(title)
	{
		$('#mt_title').text(title)
		$('.mt_title').text(title.split(' : ')[1])
	}
	$(".dels").hide()
	$("#size").hide()
	原始比例 = document.documentElement.style.fontSize
	document.documentElement.style.fontSize = '16px'
}
function srceenMode()//取消截图
{
	if(原始比例)document.documentElement.style.fontSize = 原始比例
	$('#mt_watermark').hide()
	$('.消息').show()
	$(".dels").show()
	$("#size").show()
	$(".Talk__CContainer-sc-1uzn66i-1").outerWidth('inherit')
	if($('.消息[alt="capture"]').length)
	{
		$('.消息[alt="capture"] .名称,.消息[alt="capture"] .头像框 img').remove()
		$('.消息[alt="capture"]').removeAttr('alt').css('padding','0.5rem 1rem 0px').find('.文本').siblings().remove();
	}
	if($(".dels:checked").length)
	{
		$('.dels:checked').parent().css("background-color","rgb(202,215,221)").eq(0).css('border-top','2px dashed #a2a2a2')
	}
}
function 截屏预览(S)
{
	if($('.消息[alt="capture"]').length)
	{
		$('.消息[alt="capture"] .名称,.消息[alt="capture"] .头像框 img').remove()
		$('.消息[alt="capture"]').removeAttr('alt').css('padding','0.5rem 1rem 0px').find('.文本').siblings().remove();
	}

	imageArr = []

	if(typeof S !== 'number')S = parseFloat($('.scale:checked').val())

	let start = 0 
	let end = 0 
	let leng = (16+(localStorage['watermark'] === 'false' ? 0 : $('#mt_watermark').outerHeight()))*S
	let length = leng
	let json = []
	foreach(chats,function(k,v)
	{
		json.push({...v,...{}})
	})
	let 平均 = false//,平均数 = 截图数量(S),总高度 = INIT_state(S)+((平均数-1)*16*S),平均高度 = Math.ceil(总高度/平均数)
	if($(".dels:checked").length)//区域截图
	{
		json = []
		$('.dels:not(:checked)').parent().hide()
		$(".dels:checked").each(function(k,v)
		{
			json.push({...chats[$('.消息').index($(this).parent().css({"background-color":"",'border-top':''}))],...{checked:true}})
		})
	}
	let 消息;
	let style = false
	for(let end = 0;end < json.length;end++)
	{
		if(json[end].style && json[end].style.length){style = true}
		if($(".dels:checked").length)消息 = $(`.消息 :checked:eq(${end})`).parent()//区域截图
		else 消息 = $(`.消息:eq(${end})`)
		length = length+(消息.outerHeight()*S)
		// if(json[end].checked && ['chat','image'].indexOf(json[end].type) > -1 && json[end].sCharacter.no != 0 && isfirst(end,json))
		// {
		// 	消息[0].outerHTML = makeMessage(json[end].type,json[end],end,'area')
		// }
		if(length > 截图高度 || 消息.attr('title') === 'red' || 平均)//
		{
			if(['chat','image'].indexOf(json[end].type) > -1 && json[end].sCharacter.no != 0 && !isfirst(end,json))
			{
				length = leng+(消息.outerHeight()*S)+(37*S)
				消息[0].outerHTML = makeMessage(json[end].type,json[end],end,json[end].checked ? 'area' : 'capture')
			}
			else
			{
				length = leng+(消息.outerHeight()*S)
			}
			imageArr.push({start: start,end: end,index: imageArr.length+1,chats: json.slice(start,end),style})
			start = end
			style = 平均 = false
			// chats[end-1].is_breaking = true
		}
		//if(length > 平均高度)平均 = true
		if(end === json.length-1)
		{
			imageArr.push({start: start,end: json.length,index: imageArr.length+1,chats: json.slice(start,json.length),style})
			style = false
		}
	}

	if((设备信息.device.isApple || mt_settings['打包下载']) && imageArrL > 1)imageZip = false;
	if(客户端 === 'phpwin' && !mt_settings['打包下载'])imageZip = null
	if(imageZip === false)imageZip = new JSZip();

	imageArrL = imageArr.length
	if(imageArr.length && !imageArr[0].chats.length)
	{
		foreach(imageArr,function(k,v){imageArr[k].index -= 1})
		imageArr.shift()
		imageArrL--
	}
		
	INIT_loading(false)
}
//截屏功能
async function 内容预览()
{
	let 截屏工具 = 'html2canvas'
	截屏工具 = mt_settings['截图工具'] ? mt_settings['截图工具'] : 'html2canvas'
	// if($('.定义样式').css('color') === 'rgb(255, 0, 0)')截屏工具 = 'snapdom'
	let img = await window[截屏工具]($(".预览内容")[0],
	{
		logging: !1,
		allowTaint: !0,
		useCORS: !0,
		scale: 1.1,
		compress: true,
		embedFonts: true//snapdom
	})
	if(截屏工具 === 'html2canvas')img = img.toDataURL()
	else img = (await img.toPng()).src
	$('.预览内容').html(`<img width='500px' src='${img}'>`)
}
function mt_capture(清晰度,生成图片,标题)
{
	let html = imageArr[0].index != 1 ? '' : $('#mt_watermark')[0].outerHTML
	let filename = ''
	let title = 标题 || '无题'
	imgArea = imageArr.shift()

	let l1 = imageArrL.toString().length
	let num = imgArea.index
	let index = num.toString().length
	if(index < l1)index = '0'.repeat(l1-index)+num
	else index = num
	$(".图片预览").html(`<div class='imageSave'><h1 style="text-align: center;"class='blod'><span class='red'>${num}</span> / ${localStorage['imageArrL']}</h1></div>`)
	正在截图 = true
	截图区域.outerWidth(mt_settings['宽度限制']).css('background-color',mt_settings.风格样式.bgColor)
	$('.上次截图').val(num-1)
	foreach(imgArea.chats,function(k,v)
	{
		v.isFirst = isfirst(k,imgArea.chats)
		html += makeMessage(v.type,v,k,'预览')
	})
	html += '<div style="height:1rem;"></div>'
	生成图片(num)
	截图区域.html(html)//.append($('.消息:visible').slice(imgArea.start, imgArea.end).clone())

	let callback = async function()
	{
		let 截屏工具 = 'html2canvas'
		截屏工具 = mt_settings['截图工具'] ? mt_settings['截图工具'] : 'html2canvas'
		// if(imgArea.style)截屏工具 = 'snapdom'
		await 等待图片(截图区域)
		let img = await window[截屏工具](截图区域[0],
		{
			logging: !1,
			allowTaint: !0,
			useCORS: !0,
			scale: 清晰度,
			compress: true,
			embedFonts: true//snapdom
		})
		// if(['rgb(255, 255, 255)','rgb(255, 247, 225)'].indexOf(截图区域.css('background-color')) < 0)截图区域.css('background-color','transparent')
		try
		{
			let func = async function(blob)
			{
				filename = $(".dels:checked").length ? 'MoeTalk区域截图' : 'MoeTalk截图'
				filename += DATA_NowTime+'_'
				if(mt_settings['隐藏前缀'])filename = ''
				filename += `${title}_${index}`
				
				if(!首次截图 && 截屏工具 === 'snapdom')imageArr.unshift(imgArea)
				else 首次截图 = true
				if(imageArr.length > 0)mt_capture(清晰度,生成图片,标题)//$('.mt_capture').click()
				else
				{
					正在截图 = false
					INIT_loading(false)
				}

				if(首次截图)
				{
					if(num == 1)
					{//添加图种
						let zip = new JSZip();
						let json = JSON.stringify(await 生成存档({title:'图片备份存档',nickname:'MoeTalk',date:DATA_NowTime}));
						zip.file("json.txt",json);
						zip = await zip.generateAsync({ type: "blob" });
						blob = new Blob([blob, zip], { type: blob.type });
					}
					导出截图(filename,blob,num)
				}
				首次截图 = true
			}
			if(截屏工具 == 'html2canvas')
			{
				img.toBlob(function(blob)
				{
					blob ? func(blob) : callback()
				},mt_settings['图片格式'] || 'image/png')
			}
			else
			{
				(await img.toCanvas()).toBlob(async function()
				{
					(await img.toCanvas()).toBlob(function(blob)
					{
						func(blob)
					},mt_settings['图片格式'] || 'image/png')
				},mt_settings['图片格式'] || 'image/png')
			}
		}
		catch
		{
			callback()
		}
	}
	callback()
}
async function 测试截图()
{
	INIT_loading(1)
	const 测试区域 = $('.元素列表')
	const 原始高度 = parseInt(测试区域.height())
	const 原始宽度 = parseInt(测试区域.width())
	const height = parseInt($('#测试高度').val()) || 原始高度
	const width = parseInt($('#测试宽度').val()) || 原始宽度
	测试区域.height(height)
	测试区域.width(width)
	let img = await html2canvas(测试区域[0],
	{
		logging: !1,
		allowTaint: !0,
		useCORS: !0,
		scale: 1,
		compress: true,
		embedFonts: true//snapdom
	})
	img.toBlob(function(blob)
	{
		测试区域.height(原始高度)
		测试区域.width(原始宽度)
		alert((blob ? '成功！' : '失败。。。')+'\nH：'+height+' W：'+width)
		INIT_loading(0)
	},mt_settings['图片格式'] || 'image/png')
}
$("body").on('click',"#高度估算",function()
{ 
	let str = '<div id="截图测试"style="width:1px;height:1px;overflow:hidden;"><div></div></div>'
	str += '测试宽度<input id="测试宽度"type="number"value="550"><button onclick="高度估算()">点击估算</button>\n'
	str += '<span></span>\n'
	str += '<i class="red 高度估算"></i>\n'
	let cb = function(){refreshMessage(chats)}
	alert(str,{title:'截图高度估算',yes:cb,no:cb})
});
async function 高度估算()
{
	$('.高度估算').prev().text('高度估算中。。。请耐心等待')
	$('#测试宽度').next().remove()
	refreshMessage([])
	const 截图测试 = async function(height)
	{
		const 测试区域 = $('.元素列表')//设备信息.device.isApple ? '.元素列表' : '#截图测试>div'
		const 原始高度 = parseInt(测试区域.height())
		const 原始宽度 = parseInt(测试区域.width())
		const width = parseInt($('#测试宽度').val()) || 原始宽度
		测试区域.height(height)
		let img = await html2canvas(测试区域[0],
		{
			logging: !1,
			allowTaint: !0,
			useCORS: !0,
			scale: 1,
			compress: true,
			embedFonts: true//snapdom
		})
		return new Promise(function(resolve)
		{
			img.toBlob(function(blob)
			{
				测试区域.height(原始高度)
				测试区域.width(原始宽度)
				blob ? resolve(true) : resolve(false)
			},mt_settings['图片格式'] || 'image/png')
		});
	}
	let low = 1;
	let high = 100000;
	let answer = null;

	while (low <= high)
	{
		const mid = Math.floor((low + high) / 2);
		const result = await 截图测试(mid);

		if(result)// mid 可能是答案，也可能答案在右边
		{
			answer = mid;
			low = mid + 1;
			$('.高度估算').text(`测试高度：${mid} 成功`)
		}
		else
		{
			high = mid - 1;// mid 太大了，答案一定在左边
			$('.高度估算').text(`测试高度：${mid} 失败`)
		}
	}
	$('.高度估算').prev().text('')
	$('.高度估算').text(`最大截图高度为：${answer}\n仅供参考`)
	INIT_loading(0)
	return answer;
}
if(客户端)
{
	var time = 0;//初始化起始时间
	let touchstart = 'touchstart'
	let touchend = 'touchend'
	if(客户端 === 'NW.js')
	{
		touchstart = 'pointerdown'
		touchend = 'pointerup'
	}
	$("body").on(touchstart, 'img', function(e)
	{
		if(e.target.className == '保存图片')return;
		let src = e.target.src
		e.stopPropagation();
		time = setTimeout(function()
		{
			let config = {}
			config.yes = async function()
			{
				if(isBase64(src))src = await Base64ToBlob(src)
				else src = await getfile(src) || await getfile(href+'MoeData/Ui/error.webp');
				let ext = src.type.split('/')[1] || 'webp'
				let file = await 保存文件(`${getNowDate()}.${ext}`,src,'image')
				alert(`图片保存位置：<span class='red'>${file}</span>`)
			}
			alert(`确定要保存这张图片吗？\n<img src='${src}'class='保存图片'style='width:50%;'>`,config)
		}, 1500);//这里设置长按响应时间
	});
	$("body").on(touchend, 'img', function(e)
	{
		e.stopPropagation();
		clearTimeout(time);
	});
}
$("body").on('click',".截图选项",function()
{
	let val = $(this).val()
	let str = $(this).attr('title')
	let scale = parseFloat($('.scale:checked').val())
	if(val < 3)
	{
		if($(this).prop('checked'))
		{
			$('#mt_'+str).show()
			mt_settings['截图选项'].watermark = mt_settings['截图选项'][str] = !0
			$('#mt_watermark').show()
			$(".截图选项").eq(0).prop('checked',true)
		}
		else
		{
			$('#mt_'+str).hide()
			delete mt_settings['截图选项'][str]
		}
		$('.INDEX_imageLength').text(INIT_state(scale))
	}
	else
	{
		$(this).prop('checked') ? mt_settings['截图选项'][str] = !0 : delete mt_settings['截图选项'][str]
	}
	saveStorage('设置选项',mt_settings,'local')
});
const state = {
	manifest: null,
	manifests: [],
	manifestPromise: null,
	assetRoot: null,
	videos: new Map(),
	failedVideos: new Set(),
	fallbacks: new Set(),
	observer: null,
	manifestWarned: false,
	srcPatched: false,
	fetchPatched: false
};
function getVideoEntry(videoUrl)
{
	if(state.videos.has(videoUrl))return state.videos.get(videoUrl);

	const video = document.createElement("video");
	video.preload = "auto";
	video.muted = true;
	video.playsInline = true;
	video.crossOrigin = "anonymous";
	video.style.cssText = "position:fixed;left:-99999px;top:-99999px;width:1px;height:1px;opacity:0;pointer-events:none;";
	(document.body || document.documentElement).appendChild(video);

	const entry = {
		videoUrl: videoUrl,
		video: video,
		cache: new Map(),
		failed: false,
		queue: Promise.resolve(),
		canvas: document.createElement("canvas"),
		ctx: null
	};
	entry.ctx = entry.canvas.getContext("2d");
	entry.readyPromise = new Promise(function(resolve,reject)
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
			if(resolved)return;
			resolved = true;
			cleanup();
			resolve(video);
		}
		function onError()
		{
			cleanup();
			entry.failed = true;
			state.failedVideos.add(videoUrl);
			reject(new Error("Video load failed: " + videoUrl));
		}
		video.addEventListener("loadedmetadata", onReady);
		video.addEventListener("loadeddata", onReady);
		video.addEventListener("error", onError);
	});

	video.src = videoUrl;
	video.load();
	state.videos.set(videoUrl, entry);
	return entry;
}
async function captureFrame(entry,frameIndex)
{
	const video = entry.video;
	await entry.readyPromise;
	const fps = frameIndex && frameIndex.fps ? frameIndex.fps : api.fps || 10;
	const frameNumber = typeof frameIndex === "object" ? frameIndex.frameIndex : frameIndex;
	// Some mobile browsers can report loaded first-frame video at t=0 but still
	// paint an empty frame to canvas. Nudging the seek slightly forward keeps us
	// within frame 0 while making first-frame extraction much more reliable.
	const frameEpsilon = Math.min(0.001, 1 / Math.max(fps,1) / 4);
	const seekTime = frameNumber <= 0 ? frameEpsilon : frameNumber / fps + frameEpsilon;
	await new Promise(function(resolve,reject)
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
		if(Math.abs(video.currentTime - seekTime) < 0.0001 && video.readyState >= 2)
		{
			resolve();
			return;
		}

		timeoutId = setTimeout(function()
		{
			cleanup();
			reject(new Error("Video seek timeout"));
		}, 10000);

		video.addEventListener("seeked", onSeeked);
		video.addEventListener("error", onError);
		video.currentTime = seekTime;
	});

	if(entry.canvas.width !== video.videoWidth || entry.canvas.height !== video.videoHeight)
	{
		entry.canvas.width = video.videoWidth;
		entry.canvas.height = video.videoHeight;
	}

	entry.ctx.clearRect(0,0,entry.canvas.width,entry.canvas.height);
	entry.ctx.drawImage(video,0,0);
	return entry.canvas.toDataURL("image/webp");
}
async function getFrameDataUrl(source)
{
	const frameCandidates = [{
		"frameIndex": source,
		"videoUrl": "B.mp4",
		"fps": 10
	}];
	if(!frameCandidates || !frameCandidates.length)return null;

	for(let i = 0,l = frameCandidates.length;i < l;i++)
	{
		const frameInfo = frameCandidates[i];
		if(state.failedVideos.has(frameInfo.videoUrl))continue;

		const entry = getVideoEntry(frameInfo.videoUrl);
		if(entry.cache.has(frameInfo.frameIndex))return entry.cache.get(frameInfo.frameIndex);

		const dataUrl = await (entry.queue = entry.queue.then(async function()
		{
			if(entry.cache.has(frameInfo.frameIndex))return entry.cache.get(frameInfo.frameIndex);
			const captured = await captureFrame(entry, frameInfo);
			entry.cache.set(frameInfo.frameIndex,captured);
			return captured;
		}).catch(function(error)
		{
			entry.failed = true;
			state.failedVideos.add(frameInfo.videoUrl);
			console.warn("[HEVC_CHARFACE] frame extraction failed", error);
			return null;
		}));
		test(1)
		if(dataUrl)return dataUrl;
	}

	return null;
}
// $('img[alt="CharFace"]').each(async(n,img)=>
// {
// 	test(img)
// 	img.src = await getFrameDataUrl(n)
// })