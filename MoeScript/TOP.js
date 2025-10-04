pause = true
skip = false
if(localStorage['调试模式'])var vConsole = new window.VConsole();
INIT_loading('开始加载')

var TOP_notcie = [];
var mt_charface;
var id_map = [{},{}]
var CustomFaceAuthor = {}
$('body').on('click',".notice .cancel",function()
{
	$('.notice pre').css('text-align','left').html('')
	$('.notice').removeClass('visible')
	$('.notice .title').text('通知')
	$('.notice .confirm').text(mt_text.confirm[mtlang]).removeAttr('disabled')
	TOP_confirm = ''
	if(TOP_notcie.length)
	{
		let notcie = TOP_notcie.pop()
		$('.notice').addClass('visible')
		$('.notice').html(notcie.html)
		TOP_confirm = notcie.confirm
	}
});
$('body').on('click',".notice .confirm",function()
{
	if(TOP_confirm !== '')TOP_confirm()
	$('.notice .cancel').click()
});

async function t()
{
	let game = mt_settings['选择游戏'] || 'NONE';
	let md5 = {}
	if(game != 'NONE')md5 = JSON.parse(await $ajax(`${href}GameData/${game}/Version/${game}.json?time=${Date.now()}`));
	if(!md5 || !mt_settings['选择游戏'])
	{
		if(!mt_settings['选择游戏'])selectgame()
		else selectgame('<span style="color:red;">数据缺失！请重新选择游戏</span>')
		md5 = {}
	}
	[mt_school,mt_club,mt_characters,mt_charface,id_map,CustomFaceAuthor,mt_char,mt_head,allChats] = await Promise.all(
	[
		game != 'NONE' ? $ajax(`${href}GameData/${game}/MT-School.json?md5=${md5['MT-School']}`).then(json => JSON.parse(json)) : {},
		game != 'NONE' ? $ajax(`${href}GameData/${game}/MT-Club.json?md5=${md5['MT-Club']}`).then(json => JSON.parse(json)) : {},
		game != 'NONE' ? $ajax(`${href}GameData/${game}/MT-Characters.json?md5=${md5['MT-Characters']}`).then(json => JSON.parse(json)) : {},
		game != 'NONE' ? $ajax(`${href}GameData/${game}/MT-CharFace.json?md5=${md5['MT-CharFace']}`).then(json => JSON.parse(json)) : {},
		game == 'BLDA' ? $ajax(`${href}GameData/${game}/IdMap.json?md5=${md5['IdMap']}`).then(json => JSON.parse(json)) : [{},{}],
		game == 'BLDA' ? $ajax(`${href}GameData/${game}/CustomFaceAuthor.json?md5=${md5['CustomFaceAuthor']}`).then(json => JSON.parse(json)) : {},
		moetalkStorage.getItem('mt-char'),
		moetalkStorage.getItem('mt-head'),
		moetalkStorage.getItem('chats')
	]);
	mt_char = mt_char || {}
	mt_head = mt_head || {}
	allChats = allChats || []
	otherChats = []
	chats = []
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
	refreshMessage(chats)//$('#mt_watermark').click()//显示消息
	INIT_loading(false)
}

function moedev()
{
	alert('开启调试模式：<input type="checkbox"/>\n代码注入：<textarea></textarea>\n<button class="red" onclick="clearCache()">清除缓存</button>')
	$('.notice .confirm').text(mt_text.confirm[mtlang])
	$('.notice pre').css('text-align','left')
	TOP_confirm = function()
	{
		delete localStorage['调试模式']
		if($$('.notice input').prop('checked'))localStorage['调试模式'] = true
		if($$('.notice textarea').val())eval($$('.notice textarea').val())
	}
}

if(!mt_settings['禁止字体'])$("head").append("<link rel='stylesheet' href='./MoeData/Fonts/FontList.css' data-n-g='' id='mt-font'>");//加载字体
//使用说明
function clearCache()
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
			delete sessionStorage['通知文档']
			delete sessionStorage['最新版本']
			alert('缓存清除完毕，请立即刷新页面')
			$('.notice .confirm').html('刷新')
			TOP_confirm = function(){location.reload(true)}
		}
	});
}
async function update(str = '')
{
	if(!mt_settings.自动更新)mt_settings.自动更新 = {应用:false,数据:false}
	let game = mt_settings['选择游戏'] || 'NONE'
	let time = Date.now()//year+month+day
	$('.notice .title').text('检查更新')

	let readme = str
	if(本地 && 客户端)
	{
		readme += `MoeTalk：<span style='color:red;' class='版本 bold'>${本地应用版本}</span> 最新<span style='color:red;' class='版本 bold'>读取中。。。</span>\n`
		if(game !== 'NONE')
		{
			readme += `${gamearr[game]}：<span style='color:red;' class='版本 bold'>读取中。。。</span> 最新<span style='color:red;' class='版本 bold'>读取中。。。</span>\n`
		}
		readme += `应用：<span class='更新应用'></span>`
		readme += `<span><input type='checkbox' ${mt_settings.自动更新.应用 ? 'checked' : ''}>自动更新</span>`
		readme += '\n'
		readme += `数据：<span class='更新数据'></span>`
		readme += `<span><input type='checkbox' ${mt_settings.自动更新.数据 ? 'checked' : ''}>自动更新</span>`
		readme += '\n'
	}
	if(客户端 === 'HTML5+')
	{
		if(!本地 && localStorage['HTML5+'] && localStorage['HTML5+'].includes('WEB://'))
		{
			let cmd1 = "localStorage['HTML5+']=localStorage['HTML5+'].replace('WEB://','file://')"
			let cmd2 = "plus.webview.currentWebview().loadURL(localStorage['HTML5+'])"
			readme += `<button onclick="${cmd1},${cmd2}">访问离线端</button>\n`
		}
		if(本地 && !localStorage['HTML5+'])
		{
			let code = 'WEB://'+await file_exists('index.html')
			code = `localStorage['HTML5+']='${code}'`
			code = btoa(code)
			readme += `<button onclick="plus.webview.currentWebview().loadURL('${MoeTalkURL}?eval=${code}')">访问网络端</button>\n`
		}
	}
	let bdwp = 'https://pan.baidu.com/s/1Cc-Us0FM_ehP9h5SDWhrVg?pwd=blda'
	let link = `<a class="INIT_href bold" title="${bdwp}" style="text-decoration:underline;">${bdwp}</a>`
	readme += `离线客户端下载地址：（可复制）\n${link}\n提取码：BLDA\n`
	
	alert(readme)

	TOP_confirm = function()
	{
		mt_settings.自动更新.应用 = $('.notice input:eq(0)').prop('checked')
		mt_settings.自动更新.数据 = $('.notice input:eq(1)').prop('checked')
		saveStorage('设置选项',mt_settings,'local')
	}
	
	if(本地 && 客户端)
	{
		网络应用版本 = JSON.parse(await $ajax(`${MoeTalkURL}MoeData/Version/Version.json?time=${time}`))
		if(game !== 'NONE')
		{
			本地数据版本 = JSON.parse(await $ajax(`${href}GameData/${game}/Version/Version.json?time=${time}`))
			网络数据版本 = JSON.parse(await $ajax(`${MoeTalkURL}GameData/${game}/Version/Version.json?time=${time}`))
		}
		let str1 = `<button style='line-height:112%;' onclick='更新应用(${time}),this.disabled=1'>点击更新</button>`
		let str2 = `<button style='line-height:112%;' onclick='更新数据(${time}),this.disabled=1'>点击更新</button>`
		if(!mt_settings.自动更新.应用 && 网络应用版本 && 本地应用版本[0] < 网络应用版本[0])$('.notice input:eq(0)').parent().after(str1)
		if(!mt_settings.自动更新.数据 && 网络数据版本 && 本地数据版本[0] < 网络数据版本[0])$('.notice input:eq(1)').parent().after(str2)
		$('.版本:eq(1)').text(网络应用版本)
		$('.版本:eq(2)').text(本地数据版本)
		$('.版本:eq(3)').text(网络数据版本)
	}
}
$(function()
{
	t()
	if(MikuTalk)
	{
		$('.Talk__CContainer-sc-1uzn66i-1').css('background-color','transparent');
		$('._app__Wrapper-sc-xuvrnm-1').css('background-color','transparent');
		$("#view").click()
	}
	/[\u4e00-\u9fff]/.test($("#readme").text()) && $("#readme").css('font-family','moetalk')
	let span = '<span onclick="moedev()" style="font-family:Jalnan;background-color:rgb(139,187,233);color:white;padding:4px;">'
	let notice = ''
	notice += `<span class="bold">欢迎使用${span}MoeTalk</span>！\n此版本为基于原作者Raun0129开发的MolluTalk的个人改版</span>\n`
	notice += '\n※移动端可点击左上角<i class="bold"style="font-style:italic;color:white;background-color:rgb(139,187,233);"> 三 </i>查看工具栏'
	notice += '\n※<span style="color:white;background-color:red;">数据无价，请注意时常备份您的存档！</span>'
	notice += '\n反馈网址（可复制）：<u><a href="https://wj.qq.com/s2/14292312/3ade/">https://wj.qq.com/s2/14292312/3ade/<a/></u>'
	if(客户端 === 'HTML5+')
	{
		document.addEventListener('plusready', function()
		{
			if(location.href.indexOf('/www/') > -1 && !localStorage['HTML5+'])安装应用()
			else if(本地)
			{
				if(!mt_settings.自动更新)update('<span style="color:red;">请选择更新方式！</span>\n')
				else
				{
					if(mt_settings.自动更新.应用)更新应用()
					if(mt_settings.自动更新.数据)更新数据()
				}
			}
		}, false);
	}
	if(客户端 === 'NW.js')
	{
		if(!mt_settings.自动更新)update('<span style="color:red;">请选择更新方式！</span>\n')
		else
		{
			if(mt_settings.自动更新.应用)更新应用()
			if(mt_settings.自动更新.数据)更新数据()
		}
	}
	if(本地)检查数据()
	if(sessionStorage['通知文档'] == notice)return//
	$('.notice pre').css('text-align','center')
	localStorage['通知文档'] = notice
	sessionStorage['通知文档'] = notice
	if(MikuTalk)
	{
		alert('愚人节快乐！代码来源：<a title="https://github.com/HFIProgramming/mikutap/" class="INIT_href">MikuTap</a>\n通常日期下将标题改为“MikuTalk”即可开启\n点击“确认”可以关闭')
		TOP_confirm = function()
		{
			sessionStorage['MikuTalk'] = 'no'
			location.reload(true);
		}
	}
	if(year+month+day < '250921')alert('<span style="color:green;">（9/21日截止）【征文活动】秘密岛屿探索计划正在进行中\n详情请见：</span><a style="text-decoration:underline;" title="https://www.bilibili.com/opus/1098333887621234708" class="INIT_href">链接</a>')
	alert(notice)
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
	$(".frVjsk").append(`<button class='${class0}' onclick='update()'><b style='color:blue;'>檢</b></button><span class='tool' align='center'>检查更新</span><br>`);
	$(".frVjsk").append(`<button class='${class0}' onclick='selectgame()'><b style='color:blue;'>遊</b></button><span class='tool'>选择游戏</span><br>`);
	$(".frVjsk").append(`<button class='${class0}' id='makecus'><b style='color:red;'>創</b></button><span class='tool'>创建角色</span><br>`);
	$(".frVjsk").append(`<button class='${class0}' id='mt-style'><b style='color:red;'>換</b></button><span class='tool'>切换风格</span><br>`);
	$(".frVjsk").append(`<a href='${href}index_old.html'><button class='${class0}'><b style='color:black;'>舊</b></button></a><span class='tool'>访问旧版</span><br>`);
	$(".frVjsk").append(`<a href='${href}setting.html'><button class='${class0}'><b style='color:black;'>設</b></button></a><span class='tool'>设置页面</span><br>`);
},".frVjsk")

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
	$('.notice .title').text('风格样式')
	let onclick = "onclick='"
	onclick += '$(".mt-style").css("color","black"),this.style.color="red",'
	onclick += '$(".bgcolor").val(this.innerText=="MomoTalk"?"#FFFFFF":"#FFF7E1"),'
	onclick += '$(".typecss").val("").eq(3).val(""+(this.innerText=="MomoTalk"?"background-color:rgb(220,229,232)":""))'
	onclick += "'"
	let style = 'style="width: auto;height: auto;font-size: 1rem;color: black;padding: 0.5rem;margin-bottom: 0.5rem;"'
	let button = `<button class="cVRiXh eIEKpg evqKja kwhiZC mt-style" ${style} ${onclick}>`
	let html = ''
	html += `预设方案：${button}MomoTalk</button> ${button}YuzuTalk</button>\n`
	html += '聊天背景颜色：<input type="color" class="bgcolor">\n'
	html += '各类型样式定义：（高级）\n'
	html += '文字：<textarea title="chat" class="typecss" style="width:80%;height:5rem;line-height:110%;"></textarea>\n'
	html += '回复：<textarea title="reply" class="typecss" style="width:80%;height:5rem;line-height:110%;"></textarea>\n'
	html += '羁绊：<textarea title="heart" class="typecss" style="width:80%;height:5rem;line-height:110%;"></textarea>\n'
	html += '旁白：<textarea title="info" class="typecss" style="width:80%;height:5rem;line-height:110%;"></textarea>\n'
	html += '图片：<textarea title="image" class="typecss" style="width:80%;height:5rem;line-height:110%;"></textarea>\n'
	alert(html)
	$('.bgcolor').val(mt_settings.风格样式.bgColor)
	$('.typecss').each(function()
	{
		let style = ''
		foreach(mt_settings.风格样式[this.title] || [],function(k,v)
		{
			style += `${v[0]}: ${v[1]}\n`
		})
		this.value = style
	})
	TOP_confirm = function()
	{
		mt_settings.风格样式.bgColor = $('.bgcolor').val()
		$('.typecss').each(function()
		{
			let css = []
			foreach(this.value.split("\n"),function(k,v)
			{
				v = v.replace(';','').replace('；','').replace('：',':')
				v = v.split(':')
				if(v.length === 2 && v[0].trim() !== '')
				{
					v[0] = v[0].trim()
					v[1] = v[1].trim()
					css.push(v)
				}
			})
			if(css.length)mt_settings.风格样式[this.title] = css
			else delete mt_settings.风格样式[this.title]
		})
		saveStorage('设置选项',mt_settings,'local')
		if(!MikuTalk)$('._app__Wrapper-sc-xuvrnm-1').css('background-color',mt_settings.风格样式.bgColor);
		$('.RightScreen__CContainer-sc-14j003s-2').css('background-color',mt_settings.风格样式.bgColor);
		$('.Talk__CContainer-sc-1uzn66i-1').css('background-color',mt_settings.风格样式.bgColor);
		refreshMessage(chats)
	}
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
	if(chats.length)$('.INDEX_tips').hide()
	let str = ''
	if(replyDepths.length === 1)
	{
		let reply = {}
		let length = otherChats.length;
		if(!otherChats.length)
		{
			$('.reply').hide()
			return
		}
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
function selectgame(str = '请选择游戏')
{
	$('.notice .title').text('选择游戏')
	let select = `${str}\n<select style='font-size:1.2rem;'>`
	let game = mt_settings['选择游戏'] || 'NONE'
	$.each({...{'NONE':'无'},...gamearr},function(k,v)
	{
		select += `<option value='${k}'${k === game ? "style='color:red;'" : ""}>${v}</option>`
	})
	select += '</select>\n'
	if(本地 && 客户端)
	{
		str = `<span style='background-color:red;color:white;'>提交后会自动下载对应游戏的数据</span>\n`
		str += `如果无法正常下载\n请通过<span class="blue bold">檢</span>查更新下载离线数据包\n也可用于查看文件下载进度\n`
	}
	alert(`${select}\n无反应或一直加载请尝试刷新页面\n${str}`)
	$('.notice .confirm').text('提交')
	$('.notice select').val(game)

	TOP_confirm = async function()
	{
		INIT_loading('开始加载')
		mt_settings['选择游戏'] = $('.notice select').val()
		saveStorage('设置选项',mt_settings,'local')
		数据列表 = []
		await 更新数据()
		检查数据()
		CHAR_UpdateChar()
		INIT_loading(false)
	}
}
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
	json.MoeTalk = 本地应用版本
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
		dataType:'text',
		success :function(data)
		{
			if(data != '')eval(data)
		}
	});
	if(客户端 || cordova || DATA_ServerDownload)
	{
		savefile('MoeTalk备份',`${document.location.host}.JSON`,json,'json')
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
/*
function getVisibleParagraphs() {
  const $container = $('.gGreRb');
  const containerRect = $container[0].getBoundingClientRect();
  const visible = [];

  $('.hGxlOh .消息').each(function() {
    const pRect = this.getBoundingClientRect();

    // 判断是否在可视区域内
    if (pRect.bottom > containerRect.top && pRect.top < containerRect.bottom) {
      visible.push($(this));
    }
  });

  return visible;
}
// 使用示例：滚动时检测
$('.gGreRb').on('scroll', function() {
  const visiblePs = getVisibleParagraphs();
  console.log('Currently visible <p>:', visiblePs);
});
*/