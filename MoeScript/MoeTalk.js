//https://try8.cn/tool/format/js
var cfemoji = 'NO';//表情差分开关
var cf = 'NO';//表情差分开关
var CharFaceIndex = null;//差分映射
var maxHeight = parseInt(mt_settings['高度限制']) < 16384 ? mt_settings['高度限制'] : 16384;
var chatIndex = -1//消息索引

var operate = false
var copydata;

var imageArr = [];
var imageArrL = 0
var imageZip = null;

function mt_height(num)
{
	if(!num)num = 1.1
	let length = ($(".Talk__CContainer-sc-1uzn66i-1").outerHeight()*num);
	length = Number(length) + ((16.6 * num) * (Math.ceil(length/maxHeight) - 1));
	return length.toFixed();
}
var mt_font = "<link rel='stylesheet' href='./MoeScript/Style/font.css' data-n-g='' id='mt-font'>";
if(!mt_settings['禁止字体'] && !browser.isFirefox)$("head").append(mt_font);//加载字体
$('.jotOXZ:eq(3)').wait(function(){$(".jotOXZ:eq(3)").click()},".jotOXZ:eq(3)")//
$(function()
{
	if($('#readme').text() === 'MikuTalk' || (month === Month && day === Day))
	{
		$(window.location.href.indexOf('private') > 0 ? '.RightScreen__CContainer-sc-14j003s-2' : '.Talk__CContainer-sc-1uzn66i-1').css('background-color','transparent');
		$('._app__Wrapper-sc-xuvrnm-1').css('background-color','transparent');
		$("#view").click()
	}
})
$("body").on('click',function()
{
	size = parseInt((JSON.stringify(localStorage).length/1024).toFixed(0))
	height = mt_height()
	$('#size').text(height+"\n"+size+"KB");
	warning();

	if($('.visible').length === 0)
	{
		$('.addChat').prop('checked',false)
		$(".Talk__CContainer-sc-1uzn66i-1").outerWidth('inherit')
		$('#mt_watermark').hide()
		$('.消息').show()
		$(".dels").show()
	}
	if($(".dels:checked").length > 0)
	{
		$(".operate_copy").prop('hidden',false)
	}
	else
	{
		$(".operate_copy").prop('hidden',true)
	}
	$('.delsNum').text($(".dels:checked").length)
	
})


//标题框
$(".bIcduz").wait(function()
{
	height = mt_height()
	$(".bIcduz").after("<span id='size' class='文本' style='white-space:pre;'><b>"+height+"\n"+size+"KB</b></span>");
	warning();
},".bIcduz")
//加载工具
$(".frVjsk").wait(function()
{
	$(".frVjsk").append(`<button class='${class0}' id='uphead' class='${class0}'><b style='color:black;'>傳</b></button><span class='tool'>上传头像<span id='cusname'></span></span><br>`);
	$(".frVjsk").append(`<button class='${class0}' id='makecus'><b style='color:red;'>創</b></button><span class='tool'>创建角色</span><br>`);
	$(".frVjsk").append(`<button class='${class0}' id='cf'><b style='color:black;'>差</b></button><span class='tool'>差分映射</span><br>`);
	$(".frVjsk").append(`<button class='${class0}' id='mt-style'><b style='color:black;'>換</b></button><span class='tool'>切换风格</span><br>`);
	$(".frVjsk").append(`<a href='https://tieba.baidu.com/p/8551808608'}.html'><button class='${class0}'><b style='color:black;'>教</b></button></a><span class='tool'>使用教程</span><br>`);
	$(".frVjsk").append(`<a href='${href}Setting.html?${localStorage['mt-rand']}'><button class='${class0}'><b style='color:black;'>設</b></button></a><span class='tool'>设置页面</span><br>`);
},".frVjsk")
//使用说明
$('body').on('click',"#readme",function()
{
	if($('#readme').text() === 'MikuTalk')
	{
		alert('from：https://github.com/HFIProgramming/mikutap/')
	}
	else
	{
		if(confirm(`MoeTalk当前版本：${version}\nMoeTalk为基于原作者Raun0129开发的MolluTalk的个人改版\n你可以点击【确认】尝试更新版本并刷新页面`))
		{
			window.caches && caches.keys && caches.keys().then(function(keys)
			{
				let length = 0;
				keys.forEach(function(key)
				{
					length=length+1
					caches.delete(key);
				});
				if(keys.length === length)
				{
					localStorage['mt-rand'] = Math.random()
					location.reload(true)
				}
			});
		}
	}

});
//创建人物
$("body").append("<input id='custom' hidden type='file' accept='image/*'>");//添加上传标签
$('body').on('click',"#makecus",function()
{
	let cus = prompt("请输入角色姓名，创建成功后自动更新列表\n"+
		"如果未弹出文件上传界面，请点击最上方的【傳】字按钮");

	if(cus != null && cus.trim() != '')
	{
		cus = cus.trim();
		chararr = JSON.parse(localStorage['mt-char']);
		imgindex = 'custom-'+getNowDate()
		chararr[imgindex] = cus
		$("#cusname").text(cus);
		$("#custom").click();
	}
})
$('body').on('click',"#uphead",function()//上传头像
{
	if($('#cusname').text() != '')
	{
		$("#cusname").text('');
		$("#custom").click();
	}		
	else
	{
		alert('此功能为上传头像的备用方案\n如无问题无需点击');
	}
})
function mt_ChangeChar(id)
{
	chararr = JSON.parse(localStorage['mt-char'])
	if(chararr[id])
	{
		let cname = prompt(`自定义角色ID：${id}\n若不想上传头像那么则只修改角色名\n当前角色名为：`,chararr[id]);
		if(cname != null && cname.trim() != '')
		{
			cname = cname.trim();
			chararr[id] = cname;
			imgindex = id;
			$("#cusname").text(cname);
			localStorage['mt-char'] = JSON.stringify(chararr);//保存名字
			$("#custom").click();
			list()//更新列表
		}
	}
	if(mt_characters[id])
	{
		let name = prompt(`角色ID：${id}\n原名：${mt_characters[id].name[mtlang] ? mt_characters[id].name[mtlang] : id}\n你想改为什么名字？\n(为空则使用原名)`,mt_settings['人物改名'][id] ? mt_settings['人物改名'][id] : "");
		if(name != null && name.trim() != '')mt_settings['人物改名'][id] = name
		else mt_settings['人物改名'][id] ? delete mt_settings['人物改名'][id] : ''
		localStorage.setItem('设置选项',JSON.stringify(mt_settings))
		list()//更新列表
	}
}
//储存头像
$("body").on('change','#custom',function()
{
	//文件改变时,获取文件,并转化为base64字符串
	$("#cusname").text('');
	var file = this.files[0]
	$(this).val('')
	var ready = new FileReader()
	ready.readAsDataURL(file);
	ready.onload = function(e)
	{
		var base64Img = e.target.result;
		// console.log(base64Img)
		compress(base64Img)
	}
})

//警告提醒
$('body').on('click',"#size",function()
{
	alert(`消息长度最好不要超过${maxHeight}\n存档体积不得超过5120KB\n此处的长度数值仅为估算，请以生成图片界面的数值为准`)

});
//清除冗余文件数据
$('body').on('click',"input",function()
{
	$("input[type='file']").val('')
})
//差分映射
$('body').on('click',"#cf",function()
{
	if(CharFaceIndex == null)
	{
		let no = mt_settings['选择角色'].no
		CharFaceIndex = no;
		alert('你选择了差分映射功能，根据你下方被选中的角色\n其包含的差分表情会映射到你下一个选择的角色\n如果你不想映射，请再点击一遍按钮\n如果想恢复默认映射，请再点击一下被选中的头像或与之相同的角色');
	}
	else
	{
		CharFaceIndex = null;
		alert('取消映射');
	}
})
$('body').on('click',".fzOyMd",function()
{
	if(CharFaceIndex != null)
	{
		let no = mt_settings['选择角色'].no;
		if(CharFaceIndex != no)
		{
			mt_settings['差分映射'][no] = CharFaceIndex;
			CharFaceIndex = null;
			alert('映射成功');
		}
		else
		{
			delete mt_settings['差分映射'][CharFaceIndex]
			CharFaceIndex = null;
			alert('已恢复默认映射');
		}
		localStorage.setItem('设置选项',JSON.stringify(mt_settings))
	}
})
//全选
$('body').on('click',"#delsall",function()
{
	if($(".dels:checked").length !== $(".dels").length)
	{
		$(".dels").each(function()
		{
			$(this).prop("checked",true);
			$(this).parent().css("background-color","rgb(202,215,221)")//
		});
	}
	else
	{
		$(".dels").each(function()
		{
			$(this).prop("checked",false);
			$(this).parent().css("background-color","")//
		});
	}
})
//反选
$('body').on('click',"#rdelsall",function()
{
	$(".dels").each(function()
	{
		$(this).prop("checked",!$(this).prop("checked"));
		if($(this).prop('checked'))$(this).parent().css("background-color","rgb(202,215,221)")//
		else $(this).parent().css("background-color","")//
	});
})
//区间选择
$('body').on('click',"#delsto",function()
{
	if($(".dels:checked").length > 1)
	{
		let start = $(".dels").index($(".dels:checked:eq(0)"));
		let end = $(".dels").index($(".dels:checked:eq(-1)"));
		$(".dels").each(function(index)
		{
			if(index >= start && index <= end)
			{
				$(this).prop("checked",true);
				$(this).parent().css("background-color","rgb(202,215,221)")//
			}
		});
	}
})
//隐藏工具按钮拓展
$('body').on('click',".Screenshot_Mode",function()
{
	if($('.tools').css('display') === 'none')
	{
		$('.tools').show()
		$('.消息').each(function()
		{
			$(this).append(`<input type="checkbox" class="dels" style="background-color: ${$(this).attr('title')};" data-html2canvas-ignore="true">`)
		})
	}
	else
	{
		$('.消息').css('background-color','')
		$('.dels').remove()

		$('.tools').hide()
		$('.operateTools').hide()
	}
})
//选框被选中背景色
$('body').on('change',".dels",function()
{
	if($(this).prop('checked'))$(this).parent().css("background-color","rgb(202,215,221)")//
	else $(this).parent().css("background-color","")//
})
//自动跳到被选位置
$('body').on('click',".chatText",function()
{
	if($(".dels:checked").length > 0)$(".dels:checked")[0].scrollIntoView(!1)
})
$(window).keydown(function(event)
{
	if($('#emoji').length === 0)
	{
		if(event.ctrlKey && event.which == 37)selectClick(37);
		if(event.ctrlKey && event.which == 39)selectClick(39);
	}
});
$('body').on('click',"#mt-style",function()
{
	if(mt_settings['风格样式'] === 'rgb(255,255,255)')
	{
		$(window.location.href.indexOf('private') > 0 ? '.RightScreen__CContainer-sc-14j003s-2' : '.Talk__CContainer-sc-1uzn66i-1').css('background-color','rgb(255,247,225)');
		$('._app__Wrapper-sc-xuvrnm-1').css('background-color','rgb(255,247,225)');
		$('.talk__InfoBox-sc-eq7cqw-8').css('background','transparent');
		mt_settings['风格样式'] = 'rgb(255,247,225)';//yuzutalk
		$('.旁白').css('background','transparent');
	}
	else
	{
		$(window.location.href.indexOf('private') > 0 ? '.RightScreen__CContainer-sc-14j003s-2' : '.Talk__CContainer-sc-1uzn66i-1').css('background-color','rgb(255,255,255)');
		$('._app__Wrapper-sc-xuvrnm-1').css('background-color','rgb(255,255,255)');
		$('.talk__InfoBox-sc-eq7cqw-8').css('background','rgb(220,229,232)');
		mt_settings['风格样式'] = 'rgb(255,255,255)';//momotalk
		$('.旁白').css('background','rgb(220,229,232)');
	}
	localStorage.setItem('设置选项',JSON.stringify(mt_settings))
})

$('body').on('click',"#close",function()
{
	if(cf == 'CharFace')setTimeout(function(){$('#CharFace').click()})
	if(cf == 'Emoji')setTimeout(function(){$('[title="emoticon"]').click()})
})

$("body").on('click',".dropdown button",function()
{
	$(this).next().slideToggle('fast');
});

$(document).bind('click', function(e)
{
	var $clicked = $(e.target);
	if (!$clicked.parents().hasClass("dropdown")) $(".dropdown ul").hide();
});

$("body").on('click','.mutliSelect input[type="checkbox"]',function()
{

	var title = $(this).closest('.mutliSelect').find('input[type="checkbox"]').parent().text(),
		title = $(this).parent().text() + ",";

	var school = $(this).attr('school');
	var id = school+'/'+$(this).val();

	if($(this).is(':checked')) 
	{
		var html = '<span class="title" title="'+id+'">'+title+'</span>';
		$('.multiSel.'+school).append(html);
		$('.'+school).next().hide();
		$('.'+school).parent().css("background-color","rgb(139, 187, 233)")
	}
	else
	{
		$('span[title="'+id+'"]').remove();
		if($('.'+school).find('span').length === 0)
		{
			$('.'+school).next().show()
			$('.'+school).parent().css("background-color","")
		}
	}
});
$("body").on('click',"#cutdata",function()
{
	if($(".dels:checked").length > 0)
	{
		let arr = [];
		let json = [];
		let length = 0;
		let time = new Date(); 
		let year = time.getFullYear(); // 年
		let month = time.getMonth() + 1; // 月
		let date = time.getDate(); // 日
		$(".dels:checked").each(function()
		{
			length = length+$(this).parent().outerHeight();
			arr.push(JSON.parse(localStorage['chats'])[$(this).attr('index')]);
		})

		let filename = prompt(`【截取存档】\n你一共选中了${$(".dels:checked").length}条数据\n长度大概在${length.toFixed(0)}左右\n请输入文件名：`);
		if(filename !== null && filename.trim() !== '')
		{
			json[0] = {};
			json[0]['title'] = filename;
			json[0]['nickname'] = '截取存档'+length.toFixed(0);
			json[0]['date'] = `${year}-${month}-${date}`
			json[1] = JSON.parse(JSON.stringify(arr));
			download_txt(`${filename}-MoeTalk截取存档${year}_${month}_${date}-长度${length.toFixed(0)}.json`,JSON.stringify(json));
		}
	}
	else
	{
		alert('你没有选中数据！')
	}
});
$("body").on('click',".operate",function()
{
	// if($('.operateTools').css('display') === 'none')
	// {
	// 	$('.operateTools').show()
	// }
	// else
	// {
	// 	$('.operateTools').hide()
	// }
	alert('功能重做中，后期更新恢复\n急用请向我反馈，我会及时更新')
});
$("body").on('click',".选择肢按钮",function()
{
	alert('功能重做中，后期更新恢复\n急用请向我反馈，我会及时更新')
});
//rgb(136, 204, 204)
//rgb(139, 187, 233)
var chats = JSON.parse(localStorage['chats'])
function isfirst(chatIndex,chats)
{
	if(chats[chatIndex])
	{
		if(chats[chatIndex].sCharacter.no == 0)return false
		if(['heart','info','reply'].indexOf(chats[chatIndex].type) > -1)return true
		if(chatIndex < 0)return true
		if(chatIndex-1 < 0)return true
		if(chats[chatIndex].isFirst)return true
		if(chats[chatIndex].is_breaking)return true
		
		chats[chatIndex].isRight = chats[chatIndex].isRight ? true : false
		chats[chatIndex-1].isRight = chats[chatIndex-1].isRight ? true : false

		if(chats[chatIndex].sCharacter.index !== chats[chatIndex-1].sCharacter.index)return true
		if(['heart','info','reply'].indexOf(chats[chatIndex-1].type) > -1)return true
		if(chats[chatIndex].isRight !== chats[chatIndex-1].isRight)return true
	}
	return false

}
function makeMessage(type,data,chatIndex,mode)
{
	let 聊天,头像框,对话,名称,内容;
	let no = data.sCharacter.no
	let index = data.sCharacter.index

	let head = isfirst(chatIndex,chats)
	let color = 'transparent';
	let selected = $(`.dels:eq(${chatIndex})`).prop('checked') && mode !== 'add'
	
	if(data.isFirst === true)color = 'blue';
	if(data.is_breaking === true)color = 'red';
	data.time = data.time ? data.time : ''
	if(type === 'chat' || type === 'image')
	{
		if(no != 0 && !data.isRight)
		{
			头像框 = `<div class="头像框" style="cursor: pointer; height: 100%;">${head ? `<img height="252" width="252" src="${loadhead(no,index)}" alt="${index}" class="头像">` : ''}</div>`
			名称 = `${head ? `<span class="名称 bold">${data.name ? data.name : loadname(no)}</span>` : ''}`
			内容 = `<span class="${head ? '文本 左角' : '文本'} 编辑">${data.content}</span>`
			if(type === 'image')
			{
				let maxwidth = mt_settings['图片比例'] || '90%'
				if(data.content.indexOf("CharFace") > -1 && !data.file)
				{
					maxwidth = mt_settings['差分比例'] || '90%'
				}
				maxheight = `style="max-width:${maxwidth};"`
				内容 = `<img ${maxheight} class="图片 编辑" src='${data.file || (data.content.indexOf("CharFace") > -1 ? data.content : href+data.content)}'>`
			}
			对话 = 
			`<div class="对话" style="display: block; width: 100%;">
				${名称}
				<div style="display: flex; justify-content: flex-start;">
					${内容}
					<span class="时间戳" style="margin-left: 0px;">${data.time}</span>
				</div>
			</div>`

			聊天 = `<div class="聊天">${头像框}${对话}</div>`
		}
		else
		{
			头像框 = `${no == 0 ? '' : `<div class="头像框" style="justify-content: flex-end; cursor: pointer; height: 100%;">${head ? `<img height="252" width="252" src="${loadhead(no,index)}" alt="${index}" class="头像">` : ''}</div>`}`
			名称 = `${head && no != 0 ? `<span class="名称 bold">${data.name ? data.name : loadname(no)}</span>` : ''}`
			内容 = `<span style="background: rgb(74, 138, 202); border: 1px solid rgb(74, 138, 202);" class="文本 编辑">${data.content}</span>${head || no == 0 ? '<div class="右角"></div>' : ''}`
			if(type === 'image')内容 = `<img class="图片 编辑" src='${data.file || (data.content.indexOf("CharFace") > -1 ? data.content : href+data.content)}'>`
			对话 = 
			`${no == 0 ? '<div class="头像框" style="margin-right: 1.5rem;"></div>' : ''}
			<div class="对话" style="align-items: flex-end;">
				${名称}
				<div style="display: flex; justify-content: flex-end;"">
					<span class="时间戳" style="margin-right: 0px;text-align: right;">${data.time}</span>
					${内容}
				</div>
			</div>`

			聊天 = `<div class="聊天">${对话}${头像框}</div>`
		}
	}
	if(type === 'heart')
	{
		聊天 = 
		`<div class="头像框"></div>
		<div class="羁绊" style='background-image: url(${href}Images/Ui/Favor_Schedule_Deco.webp);'>
			<div class="羁绊_标题" style="align-items: center;">
				<div class="竖线" style='border-left: 2px solid rgb(255, 142, 155);'></div>
				<span class="bold">${mt_text['relationship_event'][mtlang]}</span>
			</div>
			<hr class="羁绊_横线">
			<button class="羁绊_按钮 编辑" style="word-break: break-all;">${data.name ? data.name : loadname(no)}${mt_text['go_relationship_event'][mtlang]}</button>
		</div>`
	}
	if(type === 'info')
	{
		聊天 = `<span class="旁白 编辑" style='background: ${mt_settings['风格样式'] === 'rgb(255,255,255)' ? 'rgb(220,229,232)' : 'transparent'};'>${data.content}</span>`
	}
	if(type === 'reply')
	{
		let 选择肢 = '';
		$.each(data.content.split('\n'),function(k,v)
		{
			选择肢 += `<div class="选择肢"><button class="选择肢按钮"><span class="选择肢文字">${v}</span></button></div>`
		})
		聊天 = 
		`<div class="头像框" style="justify-content: flex-end;">
			<button data-html2canvas-ignore="true" class="编辑按钮 编辑">
				<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="pen-to-square" class="编辑图标" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<path fill="currentColor" d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"></path>
				</svg>
			</button>
		</div>
		<div style="width: 100%;">
			<div class="回复" style='background-image: url(${href}Images/Ui/Popup_Img_Deco_2.webp);'>
				<div class="回复_标题" style="align-items: center;">
					<div class="竖线" style='border-left: 2px solid rgb(39, 153, 228)'></div>
					<span class="bold">回复</span>
				</div>
				<hr class="横线">
				<div class="选择肢组" style="flex-direction: column;">
					${选择肢}
				</div>
			</div>
		</div>`
	}
	let 复选框 = ''
	if($('.tools').css('display') !== 'none')
	{
		复选框 = `<input type="checkbox" ${selected ? 'checked' : ''} class="dels" style="background-color: ${color};" data-html2canvas-ignore="true">`
	}
	return `<div class="消息" title='${color}' style="${head ? '' : 'padding: 0.5rem 1rem 0px;'}${selected ? 'background-color: rgb(202, 215, 221);' : ''}">
		${聊天}
		${复选框}
	</div>`
}
function sendMessage(data,type,mode = 'add',indexs = [])
{
	$('.RightScreen__Box-sc-1fwinj2-1').hide()//隐藏开头引导
	$('.RightScreen__Box-sc-1fwinj2-1:eq(0)').show()//显示聊天记录
	$$('.editMessage').removeClass('visible')
	$$('.chatText').val('').innerHeight(27)

	if(indexs.length === 0)indexs[0] = chatIndex
	let dels = $(".dels:checked").length

	$.each(indexs,function(k,chatIndex)
	{
		data.replyDepth = 0

		//数据
		if(mode === 'delete')
		{
			chatIndex = chatIndex-k
			chats.splice(chatIndex,1)
		}
		if(mode === 'edit')
		{
			chats[chatIndex] = {...chats[chatIndex],...data}
			if(type)
			{
				if(chats[chatIndex].type === 'image' && type !== 'image')
				{
					chats[chatIndex].file = ''
				}
				chats[chatIndex].type = type
			}
		}
		if(mode === 'add')
		{
			data.type = type
			data.isFirst = !1
			data.isRight = !1
			data.is_breaking = !1
			data.sCharacter = {no:mt_settings['选择角色'].no,index:mt_settings['选择角色'].index}
			if($('.addChat').prop('checked'))
			{
				chatIndex = chatIndex+1//向后追加
				data.sCharacter = {no: $('.editMessage .头像').attr('alt'),index: $('.editMessage .头像').attr('title')}
			}
			else
			{
				if($(".dels:checked").length)chatIndex = $('.dels').index($(".dels:checked"))//向前追加
				else chatIndex = chats.length//末尾追加
			}
			try
			{
				chats.splice(chatIndex,0,data)
			}
			catch(error)
			{
				let newchats = []
				chats.map(function(v,k){newchats[k] = v})
				chats = newchats
				chats.splice(chatIndex,0,data)
				//console.log(error)
			}
		}
		//显示
		let message = mode === 'delete' ? '' : makeMessage(chats[chatIndex].type,chats[chatIndex],chatIndex,mode)
		if(mode === 'delete')
		{
			$(`.消息:eq(${chatIndex})`).remove()
			chatIndex = chatIndex-1
			if(chats.length === 0)
			{
				$('.RightScreen__Box-sc-1fwinj2-1').show()//显示开头引导
				$('.RightScreen__Box-sc-1fwinj2-1:eq(0)').hide()//隐藏聊天记录
			}
		}
		if(mode === 'edit')
		{
			let chat = chats[chatIndex]
			$(`.消息:eq(${chatIndex})`)[0].outerHTML = message
		}
		if(mode === 'add')
		{
			if(chats.length === 1)$(".Talk__CContainer-sc-1uzn66i-1").append(message)
			else
			{
				if($(".dels:checked").length && !$('.addChat').prop('checked'))
				{
					$(`.消息:eq(${chatIndex})`).before(message)
				}
				else
				{
					$(`.消息:eq(${chatIndex-1})`).after(message)
				}
			}
		}
		//处理下条消息
		let nextchat = chats[chatIndex+1] ? chats[chatIndex+1] : false
		if(nextchat)
		{
			$(`.消息:eq(${chatIndex+1})`)[0].outerHTML = makeMessage(nextchat.type,nextchat,chatIndex+1)
		}
		if(mode === 'add' && !$('.addChat').prop('checked'))
		{
			let nextindex;
			if(dels)
			{
				$(".dels").eq(chatIndex+1).prop("checked",true);
				$(".dels").eq(chatIndex+1).parent().css("background-color","rgb(202,215,221)");
				nextindex = $(".dels:checked")[0]
			}
			else
			{
				nextindex = $(`.消息:eq(${chatIndex})`)[0]
			}
			if(chats.length)nextindex.scrollIntoView(!1)
		}
	})

	localStorage.setItem('chats',JSON.stringify(chats))
}
$("body").on('click',".编辑",function()
{
	chatIndex = $('.消息').index($(this).parents('.消息'))
	let chat = chats[chatIndex]

	$('.editMessage').addClass('visible')//显示编辑界面
	$('.edit_2_1_1 input').hide().prop('checked',false)
	$('.edit_2_1_1 span').hide()

	$('.edit_button button').hide()
	$('.edit_button button').removeClass('selected')
	$(`.edit_button .${chat.type}`).addClass('selected') 

	$('.add_image').hide()
	$('.add_image').next().hide()
	$('.add_image').next().next().hide()
	
	$('.content').innerHeight(27)
	$('.time').innerHeight(27)
	if($('.dels:checked').length > 1)
	{
		$('.typeTitle').text('批量编辑')

		$('.editMessage .头像').removeAttr('alt')
		$('.editMessage .头像').removeAttr('title')
		$('.editMessage .头像').attr('src',href+'Images/Ui/setting.webp')

		$('.editType').show().next().show()
		$('.editTalk').show().next().show()

		$('.name').val('').attr('placeholder','默认')
		$('.time').val('').attr('placeholder','默认')
		$('.content').val('').attr('placeholder','默认')

	}
	else
	{
		$('.typeTitle').text(mt_text[chat.type][mtlang])

		$('.edit_button button').show()
		
		$('.addChat').show().next().show()
		$('.isRight').show().prop('checked',chat.isRight).next().show()
		$('.isFirst').show().prop('checked',chat.isFirst).next().show()
		$('.is_breaking').show().prop('checked',chat.is_breaking).next().show()

		$('.name').val(chat.name).attr('placeholder',loadname(chat.sCharacter.no))
		$('.time').val(chat.time).attr('placeholder','').innerHeight($('.time')[0].scrollHeight)
		$('.content').val(chat.content).attr('placeholder','').innerHeight($('.content')[0].scrollHeight)

		$('.editMessage .头像').attr('alt',chat.sCharacter.no)
		$('.editMessage .头像').attr('title',chat.sCharacter.index)
		$('.editMessage .头像').attr('src',loadhead(chat.sCharacter.no,chat.sCharacter.index))

		if(chat.type === 'image')
		{
			$('.add_image').show()
			if(chat.file)
			{
				$('.add_image').next().show()
				$('.add_image').next().next().show()
				$('.add_image').next().attr('src',chat.file)
				$('.add_image').next().next().text(`图片体积：${parseInt((chat.file.length/1024).toFixed(0))}KB`)
			}
		}
	}
	
});

$("body").on('click',".头像框",function()
{
	chatIndex = $('.消息').index($(this).parents('.消息'))
	if(chats[chatIndex].type === 'chat' || chats[chatIndex].type === 'image')
	{
		chat = chats[chatIndex]
		chat.isFirst = !chat.isFirst
		sendMessage(chat,chat.type,'edit')
	}
});
$("body").on('click',".editType",function()
{
	if($(this).prop('checked'))
	{
		$('.edit_button button').show()
	}
	else
	{
		$('.edit_button button').hide()
	}
});
$("body").on('click',".editTalk",function()
{
	if($(this).prop('checked'))
	{
		$('.isRight').show().next().show()
		$('.isFirst').show().next().show()
	}
	else
	{
		$('.isRight').hide().next().hide()
		$('.isFirst').hide().next().hide()
	}
});
$("body").on('click',".edit_button button",function()
{
	let chat = chats[chatIndex]
	let type = $(this).attr('title')
	$('.edit_button button').removeClass('selected')
	$(`.edit_button .${type}`).addClass('selected')
	if(type === 'image' && $('.dels:checked').length < 2)
	{
		$('.add_image').show()
		if(chat.file)
		{
			$('.add_image').next().show()
			$('.add_image').next().next().show()
			$('.add_image').next().attr('src',chat.file)
			$('.add_image').next().next().text(`图片体积：${parseInt((chat.file.length/1024).toFixed(0))}KB`)
		}
		else
		{
			$('.add_image').next().hide()
			$('.add_image').next().next().hide()
			$('.add_image').next().attr('src','')
			$('.add_image').next().next().text('')
		}
		
	}
	else
	{
		$('.add_image').hide()
		$('.add_image').next().hide()
		$('.add_image').next().next().hide()
	}
});
$("body").on('click',".fzOyMd",function()
{
	let no = $(this).attr('alt')
	let index = $(this).attr('title')
	$('.editMessage .头像').attr('alt',no)
	$('.editMessage .头像').attr('title',index)
	$('.editMessage .头像').attr('src',loadhead(no,index))
	$('.name').attr('placeholder',loadname(no))
});
// 基础编辑
// 批量编辑
// 读取存档

// 选择跳转
// 撤回前进
// 截取存档