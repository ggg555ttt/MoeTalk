var imageArr = [];//截图分段列表
var imageArrL = 0//截图分段数量
var imageZip = null;//压缩文件
var baseArr = []
//图片压缩
function compress(base64Img,type = 'head',mode = 'add')
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
			if(mode === 'edit')
			{
				$('.图片文件').show().attr('src',newBase64)
				$('.图片信息').show().text(`图片体积：${parseInt((newBase64.length/1024).toFixed(0))}KB`).attr('title','图片')
			}
			else if(mode === 'add')
			{
				let data = 
				{
					name : $('.name').val(),
					time : $('.time').val(),
					content: $('.content').val(),
					isFirst: $('.isFirst').prop('checked'),
					isRight : $('.isRight').prop('checked'),
					is_breaking : $('.is_breaking').prop('checked'),
					file: newBase64,
					sCharacter: {no: $('.editMessage .头像').attr('alt'),index: $('.editMessage .头像').attr('title')},
					type: 'image'
				}
				sendMessage(data,'image',mode)
			}
			else
			{
				$('.notice img').attr('src',newBase64)
			}
		}
		else
		{
			
			if(mode === 'edit')
			{
				$(".heads .selected").attr('src',newBase64)
			}
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
				else
				{
					index = char_info.no
				}
				$('.heads').append(`<img src="${newBase64}" title="${index}" ${attr}>`)
				$('#custom-char .confirm').removeAttr('disabled')

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
function urlToBase64(img,length)
{
	if(img.src.indexOf('data:image/') > -1)
	{
		baseArr.push('base64')
		if(baseArr.length === length)INIT_loading('结束加载')
	}
	else
	{
		return new Promise(resolve =>
		{
			let xhr = new XMLHttpRequest()
			xhr.open('get', img.src, true)
			xhr.responseType = 'blob'
			xhr.onload = function()
			{
				if(this.status == 200)
				{
					let blob = this.response
					let oFileReader = new FileReader()
					oFileReader.onloadend = function(e)
					{
						const base64 = e.target.result
						img.src = base64
						baseArr.push('url')
						if(baseArr.length === length)INIT_loading('结束加载')
						resolve(base64)
					}
					oFileReader.readAsDataURL(blob)
				}
			}
			xhr.send()
		})
	}
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
	setTimeout(function(){click('#tool-image')},1)
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
		$('.消息[alt="capture"]').removeAttr('alt').css('padding','0.5rem 1rem 0px').find('.文本').removeClass('左角').removeClass('右角')
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
		$('.消息[alt="capture"]').removeAttr('alt').css('padding','0.5rem 1rem 0px').find('.文本').removeClass('左角').removeClass('右角')
	}

	INIT_loading('开始加载')
	imageArr = []

	if(typeof S !== 'number')S = parseFloat($('.scale:checked').val())

	let start = 0 
	let end = 0 
	let leng = (16+(localStorage['watermark'] === 'false' ? 0 : $('#mt_watermark').outerHeight()))*S
	let length = leng
	let json = chats
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
	for(let end = 0;end < json.length;end++)
	{
		if($(".dels:checked").length)消息 = $(`.消息 :checked:eq(${end})`).parent()//区域截图
		else 消息 = $(`.消息:eq(${end})`)
		length = length+(消息.outerHeight()*S)
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
			imageArr.push({start:start,end:end,index:imageArr.length+1})
			start = end
			平均 = false
		}
		//if(length > 平均长度)平均 = true
		if(end === json.length-1)
		{
			imageArr.push({start: start,end: json.length,index: imageArr.length+1})
		}
	}
	if(zipDownImg && imageArr.length > 1)
	{
		imageZip = new JSZip();
	}
	imageArrL = imageArr.length
	if(Html5Plus)
	{
		baseArr = [];
		let length = $(".Talk__CContainer-sc-1uzn66i-1 img").length
		if(!length)INIT_loading('结束加载')
		$(".Talk__CContainer-sc-1uzn66i-1 img").each(function(k)
		{
			urlToBase64($(this)[0],length)
		})
	}
	else
	{
		INIT_loading('结束加载')
	}
}
//截屏功能
function mt_capture(清晰度,截屏,生成图片,时间,标题)
{
	let json = []
	let filename = ''
	let title = 标题 ? 标题 : mt_text.noTitle[mtlang]
	let imgArea = imageArr[0]
	if(imgArea.start !== 0)$('#mt_watermark').hide()

	if(!mt_settings['截图选项'].archive)json = ''
	else
	{
		json[0] = {};
		json[0]['title'] = '备份存档';
		json[0]['nickname'] = 'MoeTalk';
		json[0]['date'] = 时间;
		json[0]['选择角色'] = mt_settings['选择角色']//@
		json[0]['mt_char'] = mt_char;//@自创角色
		json[0]['mt_head'] = mt_head;//@自创头像
		json[1] = [...chats,...otherChats];
		json = JSON.stringify(json)
	}
	let 消息 = $('.消息');
	if($(".dels:checked").length)消息 = $(`.消息 :checked`).parent()//区域截图
	消息.show()
	消息.slice(0,imgArea.start).hide()
	消息.slice(imgArea.end,消息.length).hide()
	if(MikuTalk && $(".Talk__CContainer-sc-1uzn66i-1").css('background-color') === 'rgba(0, 0, 0, 0)')
	{
		$(".Talk__CContainer-sc-1uzn66i-1").css('background-color',MikuTalk)
	}
	INIT_loading('开始加载')
	截屏()($(".Talk__CContainer-sc-1uzn66i-1")[0],
	{
		logging: !1,
		allowTaint: !0,
		useCORS: !0,
		scale: 清晰度
	}).then(function(img)
	{
		let str = ''
		if(performance.memory)
		{
			let NowMemory = performance.memory.usedJSHeapSize; // 当前使用的JS堆内存大小，单位为字节
			let AllMemory = performance.memory.totalJSHeapSize; // 总的JS堆内存大小，单位为字节
			let MaxMemory = performance.memory.jsHeapSizeLimit; // JS堆内存大小的上限
			NowMemory = (NowMemory/1048576).toFixed(0)+'MB'
			AllMemory = (AllMemory/1048576).toFixed(0)+'MB'
			MaxMemory = (MaxMemory/1048576).toFixed(0)+'MB'
			str += `当前内存占用：${NowMemory}\n`
			str += `总内存占用：${AllMemory}\n`
			str += `内存占用上限：${MaxMemory}\n`
		}
		if(Html5Plus)str += '可以手动长按保存下方的图片到图库\n'
		else str += mt_text.image_download[mtlang]+'\n'

		str += '图片无法手动保存请取消勾选“存档”选框，并将图片格式改为“webp”格式'
		$('.INDEX_CaptureTips').text(str)
		if(['rgb(255, 255, 255)','rgb(255, 247, 225)'].indexOf($(".Talk__CContainer-sc-1uzn66i-1").css('background-color')) < 0)
		{
			$(".Talk__CContainer-sc-1uzn66i-1").css('background-color','transparent')
		}
		let imgBaes64 = img.toDataURL(mt_settings['图片格式']);
		let height = img.height

		if(imageArr.length === imageArrL)生成图片(imgArea.index)
		imageArr.shift()
		img.toBlob(function(img)
		{
			if(imageArr.length > 0)
			{
				filename = `MoeTalk_${title}_${imgArea.index}_${height}`
				//mt_capture(清晰度,截屏,生成图片,时间,标题)
				INIT_loading('结束加载')
				$('.mt_capture').click()
			}
			else
			{
				filename = `MoeTalk_${title}${imgArea.index === 1 ? '' : '_'+imgArea.index}_${height}`
				INIT_loading('结束加载')
			}

			imgBaes64 = imgBaes64.replace(`data:${mt_settings['图片格式']};base64,`,'')

			if(imageZip)
			{
				$(".PopupImageDownload__ImgWrapper-sc-uicakl-2").append(`<div class='imageSave'><h1>第<span class='red'>${imgArea.index}</span>/${imageArrL}张图片：</h1><img src='data:${mt_settings['图片格式']};base64,${imgBaes64}'></div>`)
				$('.截图数量').text(imageArr.length)
				imageZip.file(`MoeTalk_${title}_${imgArea.index}_${height}.${mt_settings['图片格式'].split('/')[1]}`,img);
				if(imageArr.length === 0)
				{
					json ? imageZip.file(`MoeTalk_${title}.json`,json) : '';
					imageZip.generateAsync({type:'blob'}).then(function(content)
					{
						let a = document.createElement('a');
						a.href = URL.createObjectURL(content);
						a.download = `MoeTalk_${title}_${时间}.zip`;
						a.click();
						imageZip = null
					});
				}
			}
			else 
			{
				if(Html5Plus)
				{
					$(".PopupImageDownload__ImgWrapper-sc-uicakl-2").append(`<div class='imageSave'><h1>第<span class='red'>${imgArea.index}</span>/${imageArrL}张图片：</h1><img src='data:${mt_settings['图片格式']};base64,${imgBaes64}'></div>`)
					$('.截图数量').text(imageArr.length)
					saveImg(`${filename}.${mt_settings['图片格式'].split('/')[1]}`, imgBaes64)
				}
				else
				{
					combineFiles(imgBaes64,json,filename,imgArea.index);
				}
			}
		})
	})
}
if(Html5Plus)
{
	var time = 0;//初始化起始时间  
	$("body").on('touchstart', 'img', function(e)
	{
		let src = $(this).attr('src')
		e.stopPropagation();  
		time = setTimeout(function()
		{
			showCloseImg(src);  
		}, 2000);//这里设置长按响应时间  
	});
	$("body").on('touchend', 'img', function(e)
	{
		e.stopPropagation();  
		clearTimeout(time);    
	});
	function showCloseImg(src)
	{
		if(src.indexOf(':image/') > 0 && confirm('确定要将这张图保存到图库吗？'))
		{
			let ext = src.match(/:image\/(\S*);base64/)[1]
			saveImg(`${getNowDate()}.${ext}`, src)
		}
	}
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