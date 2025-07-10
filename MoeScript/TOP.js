INIT_loading('开始加载')
var TOP_confirm = '';
var mt_charface;
var id_map = [{},{}]
var CustomFaceAuthor = {}
foreach(['mt-char','mt-head','chats'],function(k,v)
{
	moetalkStorage.getItem(v, function(err, data)
	{
		window[['mt_char','mt_head','allChats'][k]] = data ? typeof data === 'string' ? JSON.parse(data) : data : {}
	})
})
foreach(['School','Club','Characters'],function(k,v)
{
	XHR(`${href}Data/${mt_settings['选择游戏']}/MT-${v}.json`,function(json)
	{
		window[['mt_school','mt_club','mt_characters'][k]] = JSON.parse(json)
	})
})
XHR(`${href}Data/${mt_settings['选择游戏']}/CharFaceInfo.json`,function(json)
{
	CFInfo = JSON.parse(json)
})
XHR(`${href}Data/${mt_settings['选择游戏']}/MT-CharFace.json`,function(json)
{
	mt_charface = JSON.parse(json)
})

if(mt_settings['选择游戏'] === 'BLDA')
{
	foreach(['IdMap','CustomFaceAuthor'],function(k,v)
	{
		XHR(`${href}Data/${mt_settings['选择游戏']}/${v}.json`,function(json)
		{
			window[['id_map','CustomFaceAuthor'][k]] = JSON.parse(json)
		})
	})
}
INIT_waiting(function()
{
	foreach(allChats,function(k,v)
	{
		repairCF(allChats[k]);
		if(allChats[k].replyDepth !== 0)otherChats.push(allChats[k])
		else chats.push(allChats[k])
	})
	allChats = []
	$(".INDEX_tips").wait(function()
	{
		chats.length ? $('.INDEX_tips').hide() : $('.INDEX_tips').show()//开头提示
		otherChats.length ? $('.reply').show() : $('.reply').hide()//项目管理
	},".INDEX_tips")
	CHAR_GetCharList()
	选择角色 = true
	charList(选择角色)//更新角色
	$('#mt_watermark').click()//显示消息
	INIT_loading('结束加载')
},['mt_char','mt_head','allChats','mt_school','mt_club','mt_characters'])

if(!mt_settings['禁止字体'])$("head").append("<link rel='stylesheet' href='./MoeScript/Style/font.css' data-n-g='' id='mt-font'>");//加载字体
//使用说明
$('body').on('click',"#readme",function()
{
	let span = '<span style="font-family: title;background-color:rgb(139,187,233);color:white;padding:4px;">'
	let readme = `　　${span}MoeTalk</span>为基于原作者Raun0129开发的${span}MolluTalk</span>的个人改版\n`
	readme += `　　点击【确定】可以清除缓存并检测更新\n`
	alert(readme)
	TOP_confirm = function()
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
				delete localStorage['最新版本']
				delete localStorage['通知文档']
				location.reload(true)
			}
		});
	}
});
$(function()
{
	window.alert = function(str)
	{
		$('.notice pre').html(str)
		$('.notice').addClass('visible')
	};
	if(MikuTalk)
	{
		$('.Talk__CContainer-sc-1uzn66i-1').css('background-color','transparent');
		$('._app__Wrapper-sc-xuvrnm-1').css('background-color','transparent');
		$("#view").click()
	}
	/[\u4e00-\u9fff]/.test($("#readme").text()) && $("#readme").css('font-family','moetalk')
	let notice = '　　手机端点击左上角<i class="bold"style="font-style:italic;color:white;background-color:rgb(139,187,233);"> 三 </i>可查看工具栏\n'
	notice += '　　工具栏点击【选择游戏】可以更改为其他游戏\n'
	if(cordova)notice += '<span class="red">※此客户端目前处于测试阶段\n使用前请先确认文件下载功能是否正常\n出现错误请向开发者反馈</span>\n'
	else notice += '<span class="red">※MoeTalk不保证数据丢失可能，请注意时常下载并备份存档</span>\n'
	if(MikuTalk)
	{
		notice = '愚人节快乐！代码来源：<a title="https://github.com/HFIProgramming/mikutap/" class="INIT_href">MikuTap</a>\n通常日期下将标题改为“MikuTalk”即可开启\n<span class="red">点击“确定”可以关闭</span>\n'
		delete localStorage['通知文档']
		TOP_confirm = function()
		{
			sessionStorage['MikuTalk'] = 'no'
			location.reload(true);
		}
	}
	
	if(window.location.href == GitlabURL)
	{
		notice = '<span class="red">Gitlab在5月7日不再为中国用户服务，届时此网站也会随之关闭访问\n'
		notice += '请及时将您的存档导入客户端或新网址\n'
		notice += '新网址：<a class="INIT_href" title="https://moetalk.netlify.app/">https://moetalk.netlify.app/</a>\n'
		notice += '客户端：<a class="INIT_href" title="https://pan.baidu.com/s/1Cc-Us0FM_ehP9h5SDWhrVg?pwd=blda">【百度网盘】</a>提取码：BLDA</span>\n'
		notice += `更多链接请查看网盘内的【访问网址.txt】\n`
		if(Html5Plus)notice += `<span class="red">新版网络客户端已更新至百度网盘，请及时下载安装并转移存档</span>\n`
		delete localStorage['通知文档']
	}
	if(!localStorage['通知文档'] || localStorage['通知文档'] !== notice)
	{
		alert(notice)
		localStorage['通知文档'] = notice
	}
})
$("body").on('click', function()
{
	INIT_state()
	$('.delsNum').text($(".dels:checked").length)
	let name = loadname(mt_settings['选择角色'].no,mt_settings['选择角色'].index)
	let str = $(".dels:checked").length ? '在选中的消息上方插入' : mt_text.input_comment[mtlang]
	$('.chatText').attr('placeholder',name+'：'+str)
})
$(window).keydown(function(event)
{
	if($('#emoji').length === 0)
	{
		if(event.ctrlKey && event.which == 37)selectClick(37);
		if(event.ctrlKey && event.which == 39)selectClick(39);
	}
});
//清除冗余文件数据
$('body').on('click',"input",function()
{
	$("input[type='file']").val('')
})
//工具
$(".frVjsk").wait(function()
{
	$(".frVjsk").append(`<button class='${class0}' id='app'><b style='color:blue;'>A</b></button><span class='tool' align='center'>客户端\n下载地址</span><br>`);
	$(".frVjsk").append(`<button class='${class0}' id='selectgame'><b style='color:blue;'>遊</b></button><span class='tool'>选择游戏</span><br>`);
	$(".frVjsk").append(`<button class='${class0}' id='makecus'><b style='color:red;'>創</b></button><span class='tool'>创建角色</span><br>`);
	$(".frVjsk").append(`<button class='${class0}' id='mt-style'><b style='color:black;'>換</b></button><span class='tool'>切换风格</span><br>`);
	$(".frVjsk").append(`<a href='${href}Setting.html?${本地版本+gamever[mt_settings['选择游戏']]}'><button class='${class0}'><b style='color:black;'>設</b></button></a><span class='tool'>设置页面</span><br>`);
},".frVjsk")
//APP
$('body').on('click',"#app",function()
{
	alert('<a class="INIT_href" title="https://pan.baidu.com/s/1Cc-Us0FM_ehP9h5SDWhrVg?pwd=blda">下载地址</a>\n提取码：BLDA')
});

//警告提醒
$('body').on('click',"#size",function()
{
	INIT_state()
	let str = `	长度数值每超过【${mt_settings['高度限制']}】截图时就会自动分割一次，建议手动设置分割点防止自动分割\n`
	str += `	消息数量过大会造成设备卡顿\n\n`
	if(performance.memory)
	{
		let AllMemory = performance.memory.totalJSHeapSize; // 总的JS堆内存大小，单位为字节
		let MaxMemory = performance.memory.jsHeapSizeLimit; // JS堆内存大小的上限
		AllMemory = (AllMemory/1048576).toFixed(0)
		MaxMemory = (MaxMemory/1048576).toFixed(0)
		str += `	内存占用估算(MB)：${AllMemory}/${MaxMemory}\n`
	}
	let arr = Object.keys(EMOJI_CustomEmoji.image)
	let length = 0;
	foreach(arr,function(k,v)
	{
		length += EMOJI_CustomEmoji.image[v].length
	})
	arr = Object.keys(mt_head)
	foreach(arr,function(k,v)
	{
		length += mt_head[v].length
	})
	let length2 = JSON.stringify([...chats,...otherChats]).length;
	length = parseInt(length/1048576).toFixed(0)
	length2 = parseInt(length2/1048576).toFixed(0)

	str += `	存储数值估算(MB)：${length}+${length2}\n`
	str += `	<span class="red">内存占用和存储数值过大会造成设备卡顿或崩溃，请合理分配</span>`
	alert(str)
	
});
//操作栏
$("body").on('click',".operate",function()
{
	if($('.operateTools').css('display') === 'none')
	{
		$('.operateTools').show()
	}
	else
	{
		$('.operateTools').hide()
	}
	saveStorage('chats',[...chats,...otherChats],'local')
});
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
	$('.消息').css('border-top','')
	$(".dels:checked:eq(0)").parent().css('border-top','2px dashed #a2a2a2')
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
	$('.消息').css('border-top','')
	$(".dels:checked:eq(0)").parent().css('border-top','2px dashed #a2a2a2')
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
	$('.消息').css('border-top','')
	$(".dels:checked:eq(0)").parent().css('border-top','2px dashed #a2a2a2')
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
		$('.消息').css('background-color','').css('border-top','')
		$('.dels').remove()

		$('.tools').hide()
		$('.operateTools').hide()
	}
})
//选框被选中背景色
$('body').on('change',".dels",function()
{
	if($(this).prop('checked'))
	{
		$(this).parent().css("background-color","rgb(202,215,221)")//
		$('.消息').css('border-top','')
		$(".dels:checked:eq(0)").parent().css('border-top','2px dashed #a2a2a2')
	}
	else
	{
		$(this).parent().css("background-color","")
		$('.消息').css('border-top','')
		$(".dels:checked:eq(0)").parent().css('border-top','2px dashed #a2a2a2')
	}
})
//自动跳到被选位置
$('body').on('click',".chatText",function()
{
	if($(".dels:checked").length > 0)$(".dels:checked")[0].scrollIntoView({block:'center',behavior:"smooth"})
})
//切换风格
$('body').on('click',"#mt-style",function()
{
	if(mt_settings['风格样式'][0] === 'MomoTalk')
	{
		mt_settings['风格样式'] = []
		mt_settings['风格样式'][0] = 'YuzuTalk'
		mt_settings['风格样式'][1] = '#FFF7E1'//背景
		mt_settings['风格样式'][2] = 'transparent'//旁白
	}
	else
	{
		mt_settings['风格样式'] = []
		mt_settings['风格样式'][0] = 'MomoTalk'
		mt_settings['风格样式'][1] = '#FFFFFF'//背景
		mt_settings['风格样式'][2] = '#DCE5E8'//旁白
	}
	if(!MikuTalk)$('._app__Wrapper-sc-xuvrnm-1').css('background-color',mt_settings['风格样式'][1]);
	$('.RightScreen__CContainer-sc-14j003s-2').css('background-color',mt_settings['风格样式'][1]);
	$('.Talk__CContainer-sc-1uzn66i-1').css('background-color',mt_settings['风格样式'][1]);
	$('.talk__InfoBox-sc-eq7cqw-8').css('background-color',mt_settings['风格样式'][2]);
	$('.旁白').css('background',mt_settings['风格样式'][2]);
	saveStorage('设置选项',mt_settings,'local')
})
function refreshMessage(json)
{
	$('.消息').remove()
	json.map(function(v,k)
	{
		$$(".Talk__CContainer-sc-1uzn66i-1").append(makeMessage(v.type,v,k,'add'))
	})
	json.length ? $('.INDEX_tips').hide() : $('.INDEX_tips').show()//开头提示
}
function replyDepth(str,mode)
{
	let replyButton,reply = 0
	let lastreply = replyDepths.slice(-1)[0]
	if(mode === 'back')
	{
		replyDepths.pop()
		replyButton = reply = replyDepths.slice(-1)[0]
	}
	else if(mode === 'home')
	{
		replyButton = replyDepths[1]
		replyDepths = [0]
		reply = 0
	}
	else if(mode === 'go')
	{
		replyDepths.push(str)
		reply = str
	}
	else
	{
		lastreply = replyDepths[replyDepths.length-1]
		reply = str
		replyDepths[replyDepths.length-1] = str
	}
	if(lastreply === 0)CHAT_history[0] = 操作历史
	else CHAT_history[1][lastreply] = 操作历史
	if(reply !== 0)
	{
		if(CHAT_history[1][reply])操作历史 = CHAT_history[1][reply]
		else 操作历史 = {index: -1,list: []}
	}
	else 
	{
		if(CHAT_history[0])操作历史 = CHAT_history[0]
		else 操作历史 = {index: -1,list: []}
	}
	if(mode === 'edit')
	{
		delete CHAT_history[1][reply]
		delete CHAT_history[1][lastreply]
		操作历史 = {index: -1,list: []}
	}
	let arr = [...otherChats,...chats]
	otherChats = []
	chats = []

	
	arr.map(function(v,k)
	{
		if(v.replyDepth !== replyDepths.slice(-1)[0])
		{
			otherChats.push(v)
		}
		else
		{
			chats.push(v)
		}
	})
	otherChats.length+replyDepths.length-1 > 0 ? $('.reply').show() : $('.reply').hide()
	if(replyDepths.length > 1)
	{
		$('.replyBack').show().next().text("Re: "+replyDepths.slice(-1)[0]).next().show()
	}
	else
	{
		$('.replyBack').hide().next().text('项目管理').next().hide()
	}
	log()
	return replyButton
}
$("body").on('click',".选择肢.跳转",function()
{
	if(!$(this).text())return;
	replyDepth($(this).text(),'go')
	refreshMessage(chats)
});

$("body").on('click',".replyBack",function()
{
	let replyButton = replyDepth(null,'back')
	refreshMessage(chats)
	setTimeout(function()
	{
		if(replyButton !== 0)$(`.跳转:contains("${replyButton}")`)[0].scrollIntoView({block:'center',behavior:"smooth"})
	}, 100)
});
$("body").on('click',".replyHome",function()
{
	let replyButton = replyDepth(0,'home')
	refreshMessage(chats)
	setTimeout(function()
	{
		if(replyButton !== 0)$(`.跳转:contains("${replyButton}")`)[0].scrollIntoView({block:'center',behavior:"smooth"})
	}, 100)
});
function TOP_replyEdit()
{
	let str = ''
	if(replyDepths.length === 1)
	{
		let reply = {}
		let length = otherChats.length;
		for(let i = 0;i < length;i++)
		{
			reply[otherChats[i].replyDepth] = ''
		}
		reply = Object.keys(reply)
		length = reply.length;
		for(let i = 0;i < length;i++)
		{
			str += `<span onclick="$('.notice .confirm').removeAttr('disabled')"><input type="radio" id="${reply[i]}" name="replys" class="replys"><label for="${reply[i]}">${reply[i]}</label></span>\n`
		}
		alert(str)
		$('.notice .title').text('项目管理')
		$('.notice .confirm').text('跳转').attr('disabled','disabled')
		$('.replys:checked')
		TOP_confirm = function()
		{
			replyDepth($('.replys:checked').attr('id'),'go')
			refreshMessage(chats)
		}
	}
	else if(chats.length)
	{
		$('.notice .title').text('项目编辑')
		let nowreply = replyDepths[replyDepths.length-1]
		str = `请输入新的项目名称：\n<input value="${nowreply}">\n\n`
		str += '同时不要忘记更改外部的选择肢文字\n重名项目会自动合并\n'
		str += '操作无法撤销'
		alert(str)
		TOP_confirm = function()
		{
			let val = $('.notice input').val()
			length = chats.length;
			for(let i = 0;i < length;i++)
			{
				chats[i].replyDepth = val
			}
			replyDepth(val,'edit')
			refreshMessage(chats)
			saveStorage('chats',[...chats,...otherChats],'local')
		}
	}
}
$('body').on('click',"#selectgame",function()
{
	if(onlyone)
	{
		let str = ''
		str += '当前MoeTalk版本为【'+gamearr[mt_settings['选择游戏']]+'】专用版\n'
		str += '无法改为其它游戏，若想切换游戏请下载安装其它版本MoeTalk\n'
		str += '<a class="INIT_href" title="https://pan.baidu.com/s/1Cc-Us0FM_ehP9h5SDWhrVg?pwd=blda">提取码：BLDA</a>\n'
		alert(str)
		return
	}
	let arr = {}
	let select = "请选择游戏：<select style='font-size:1.2rem;'>"
	$.each(gamearr,function(k,v)
	{
		arr[v] = k
		select += `<option ${k === mt_settings['选择游戏'] ? "style='color:red;'" : ""}>${v}</option>`
	})
	select += '</select>'
	alert(`${select}\n\n无反应或一直加载请尝试刷新页面`)
	$('.notice .confirm').text('提交')
	$('.notice select').val(gamearr[mt_settings['选择游戏']])

	TOP_confirm = function()
	{
		mt_settings['选择游戏'] = arr[$('.notice select').val()]
		saveStorage('设置选项',mt_settings,'local')
		CHAR_UpdateChar()
	}
})
localStorage['local_no'] = localStorage['local_no'] ? localStorage['local_no'] : Math.random()
var phpurl = document.location.protocol == 'https:' ? '/api/moetalk.php' : 'http://frp.freefrp.net:40404/moetalk.php'
$.ajax({url:'../moetalk.php',success:function(){phpurl = '../moetalk.php',localStorage['local_no'] = 'LOCAL';}});
$.ajax({url:'http://moetalk.frp.freefrps.com/moetalk.php',success:function(){phpurl = localStorage['local_no'] ? this.url : phpurl;}});
$.ajax(
{
	url: '/index.php',
	async: true,
	type: 'POST',
	data: {backDown: true},
	success:function(type)
	{
		if(type === 'server')DATA_ServerDownload = type
	}
});
setInterval(function()
{
	let json = {}
	json.MoeTalk = 本地版本
	json.INFO = {}//存档信息
	json.INFO.title = '自动备份'
	json.INFO.nickname = 'MoeTalk客户端'
	json.INFO.date = '最近'
	json.CHAR = {}//自定义角色
	json.CHAR.id = mt_char
	json.CHAR.image = mt_head
	json.EMOJI = EMOJI_CustomEmoji//自定义表情
	json.SETTING = mt_settings//设置信息
	json.CHAT = [...chats,...otherChats]//MMT数据
	json = JSON.stringify(json)
	$.ajax(
	{
		url:phpurl,
		async:true,
		type:'POST',
		data:
		{
			'json': json,
			'local_no':localStorage['local_no']
		},
		dataType:'text'
	});
	if(cordova)
	{
		savefile('MoeTalk备份',`${document.location.host}.JSON`,json,'back')
	}
}, 600 * 1000);
if(document.location.protocol === 'http:' && location.host.indexOf('.') < 0 && location.hostname !== 'localhost')
{
	moetalkStorage.keys(function(err, DataBase)
	{
		if(DataBase.length)
		{
			let arr = {}
			DataBase.map(function(v,k)
			{
				moetalkStorage.getItem(v, function(err, data)
				{
					arr[v] = data
					if(k === DataBase.length-1)
					{
						let time = new Date().toLocaleString().replaceAll('/','-').replaceAll(' ','_').replaceAll(':','-');
						download('MoeTalk_localStorage存档'+time+'.TXT',{...localStorage,...arr})
					}
				})
			})
		}
	})
}