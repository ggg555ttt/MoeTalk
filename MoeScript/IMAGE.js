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
async function IMAGE_error(image)
{
	let src = image.src ? image.getAttribute('src') : image.target.getAttribute('src')
	let url = src.split('/').pop().replace('.webp','')
	let img = await 数据操作('Ig',url) || await 数据操作('Tg',url) || href+'MoeData/Ui/error.webp'
	if(img[0] === 'G')img = href+img
	if(image.src)image.src = img
	else image.target.src = img
	return
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
		if(src.startsWith('data:'))continue;
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
		let src = img.getAttribute('src') || href+'MoeData/Ui/error.webp';

		//替换自定义图片
		if(!src.startsWith('data:') && (src.startsWith('custom-') || src.startsWith('CharFace-') || src.startsWith('Emoji-')))
		{
			let url = src.split('/').pop().replace('.webp','')
			src = await 数据操作('Ig',url) || await 数据操作('Tg',url) || href+'MoeData/Ui/error.webp'
		}
		else if(本地 && 客户端 === 'HTML5+')src = await urlToBase64(src);
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
			a = Math.min(1, n / w);(w *= a), (h *= a);//最大长度不得超过300
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
			if(mode === 'edit')$('.图片文件').attr({src: newBase64,title: ''})//编辑图片
			else if(mode === 'add')sendMessage({content:'',type: 'image',file: newBase64},'image',mode)//发送图片
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
				if(index)
				{
					index = parseInt(index.replace(char_info.no,'').replace('_',''))
					if(isNaN(index))index = `${char_info.no}_0`
					else index = `${char_info.no}_${index+1}`
				}
				else index = char_info.no
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
		if((height+height2+16)*num > mt_settings['高度限制'])
		{
			i++
			height = 0
		}
	})
	let height3 = parseInt($(".Talk__CContainer-sc-1uzn66i-1").outerHeight()*num);
	//test(height3+((i-1)*16*num))
	return i;
}
function urlToBase64(src,length,callback)
{
	return new Promise(resolve =>
	{
		let xhr = new XMLHttpRequest()
		xhr.open('get', src, true)
		xhr.responseType = 'blob'
		xhr.onload = function()
		{
			if(this.status == 200)
			{
				let blob = this.response
				let oFileReader = new FileReader()
				oFileReader.onloadend = (e)=>{resolve(e.target.result)}
				oFileReader.readAsDataURL(blob)
			}
		}
		xhr.onerror = ()=>{resolve(错误图片)}
		xhr.send()
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
	if(!元素尺寸)元素尺寸 = document.documentElement.style.fontSize
	document.documentElement.style.fontSize = '16px'
}
function srceenMode()//取消截图
{
	if(元素尺寸)document.documentElement.style.fontSize = 元素尺寸
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

	INIT_loading('开始加载')
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
	let 平均 = false//,平均数 = 截图数量(S),总长度 = INIT_state(S)+((平均数-1)*16*S),平均长度 = Math.ceil(总长度/平均数)
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
		if(length > mt_settings['高度限制'] || 消息.attr('title') === 'red' || 平均)//
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
		//if(length > 平均长度)平均 = true
		if(end === json.length-1)
		{
			imageArr.push({start: start,end: json.length,index: imageArr.length+1,chats: json.slice(start,json.length),style})
			style = false
		}
	}

	if((browser.isIos || browser.isiPhone || mt_settings['打包下载']) && imageArrL > 1)imageZip = false;
	if(客户端 === 'phpwin' && !mt_settings['打包下载'])imageZip = null
	if(imageZip === false)imageZip = new JSZip();

	imageArrL = imageArr.length
	if(imageArr.length && !imageArr[0].chats.length)
	{
		foreach(imageArr,function(k,v){imageArr[k].index -= 1})
		imageArr.shift()
		imageArrL--
	}
		
	INIT_loading('结束加载')
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
	let html = 正在截图 || imageArr[0].index != 1 ? '' : $('#mt_watermark')[0].outerHTML
	let filename = ''
	let title = 标题 || '无题'
	imgArea = imageArr.shift()

	let l1 = imageArrL.toString().length
	let index = imgArea.index.toString().length
	if(index < l1)index = '0'.repeat(l1-index)+imgArea.index
	else index = imgArea.index
	$(".图片预览").html(`<div class='imageSave'><h1>已下载<span class='red'>${imgArea.index}</span>/${imageArrL}张图片：</h1></div>`)
	正在截图 = true
	截图区域.outerWidth(mt_settings['宽度限制']).css('background-color',mt_settings.风格样式.bgColor)
	$('.上次截图').val(imgArea.index-1)
	foreach(imgArea.chats,function(k,v)
	{
		v.isFirst = isfirst(k,imgArea.chats)
		html += makeMessage(v.type,v,k,'预览')
	})
	生成图片(imgArea.index)
	截图区域.html(html)

	let callback = async function()
	{
		// if(MikuTalk && 截图区域.css('background-color') === 'rgba(0, 0, 0, 0)')截图区域.css('background-color',MikuTalk)
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
			let func = function(blob)
			{
				filename = $(".dels:checked").length ? 'MoeTalk区域截图' : 'MoeTalk截图'
				filename += DATA_NowTime+'_'
				if(mt_settings['隐藏前缀'])filename = ''
				filename += `${title}_${index}`
				INIT_loading(false)
				if(!首次截图 && 截屏工具 === 'snapdom')imageArr.unshift(imgArea)
				else 首次截图 = true
				if(imageArr.length > 0)mt_capture(清晰度,生成图片,标题)//$('.mt_capture').click()
				else 正在截图 = false

				if(首次截图)导出截图(filename,blob)
				首次截图 = true
			}
			if(截屏工具 == 'html2canvas')
			{
				img.toBlob(function(blob)
				{
					blob ? func(blob) : callback()
				})
			}
			else
			{
				(await img.toCanvas()).toBlob(async function()
				{
					(await img.toCanvas()).toBlob(function(blob)
					{
						func(blob)
					})
				})
			}
		}
		catch
		{
			callback()
		}
	}
	callback()
}
if(客户端 === 'HTML5+' || 客户端 === 'Cordova')
{
	if(客户端 === 'HTML5+')
	{
		urlToBase64(羁绊背景).then((e)=>{羁绊背景 = e})
		urlToBase64(回复背景).then((e)=>{回复背景 = e})
		urlToBase64(错误图片).then((e)=>{错误图片 = e})
	}
	var time = 0;//初始化起始时间
	$("body").on('touchstart', 'img', function(e)
	{
		let src = $(this).attr('src')
		e.stopPropagation();
		time = setTimeout(function()
		{
			let config = {}
			config.yes = async function()
			{
				let ext = 'webp'
				if(src.startsWith('data:'))
				{//base64转blob
					ext = src.match(/:image\/(\S*);base64/)[1]
					let data = atob(src.split(',').pop())
					let l = data.length;
					let bytes = new Uint8Array(l);
					for(let i=0;i<l;i++)bytes[i] = data.charCodeAt(i);
					data = 'application/octet-stream'
					data = new Blob([bytes],{type: data});
					bytes = ''
				}
				else 
				{
					ext = data.split('.').pop()
					data = await getfile(data) || await getfile(href+'MoeData/Ui/error.webp');
				}
				保存文件(`${getNowDate()}.${ext}`,data,'image')
			}
			alert(`确定要将这张图保存到图库吗？\n<img src='${src}' style='width:100%;'>`,config)
		}, 2000);//这里设置长按响应时间
	});
	$("body").on('touchend', 'img', function(e)
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