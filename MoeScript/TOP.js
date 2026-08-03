/*@MoeScript/TOP.js@*/
var 恭喜发财 = false
pause = true
skip = false
if(localStorage['调试模式'])var vConsole = new window.VConsole();

var ALERT = {confirm:{},cancel:{},close:{}}
window.alert = function(text = '',config = {})
{
	if(config.show)$('.alert').removeClass('visible')
	config.id = config.id || Math.random().toString().replace('0.','')
	config.title = config.title || '通知'
	config.cancel = config.cancel || '取消'
	config.confirm = config.confirm || '确认'
	config.style = config.style || ''
	config.yes = config.yes || null
	config.no = config.no || null
	config.x = config.x || config.no
	$(`.ALERT_${config.id}`).remove()
let style = `style="-webkit-user-select: text;user-select: text; line-height: 125%; white-space: pre-wrap; word-break: break-word; text-align: left; width: 100%; font-family: inherit; overflow: scroll;${config.style}"`
let html = 
`<div class="btncdx alert ALERT_${config.id} visible" style="z-index: 1000;">
	<div class="cFtxnG">
		<div class="duPzcp" style="height: auto;">
			<span class="GsrFM title" style="border-bottom: 4px solid;">${config.title}</span>
			<div class="kncnxt close" style="top: 12.5%;user-select: none;cursor: pointer;" alt="${config.id}">❌</div>
		</div>
		<div class="oFeqA" style="max-height: 90%; padding: 0.5rem;">
			<pre ${style}>${text}</pre>
			<div class="ia-dnHO">
				<button class="eLyPUY cancel" alt="${config.id}"style="color:white;">${config.cancel}</button>
				<button class="eLyPUY kebTxe confirm" alt="${config.id}"style="color:red;">${config.confirm}</button>
			</div>
		</div>
	</div>
</div>`
	ALERT.confirm[config.id] = config.yes
	ALERT.cancel[config.id] = config.no
	ALERT.close[config.id] = config.x
	$('.弹窗').append(html)
}
$('body').on('click','.confirm',function()
{
	let id = $(this).attr('alt')
	if(ALERT.confirm[id])ALERT.confirm[id]()
	delete ALERT.confirm[id]
	delete ALERT.cancel[id]
	delete ALERT.close[id]
	$(`.ALERT_${id}`).remove()
	$('.alert').last().addClass('visible')
});
$('body').on('click','.cancel',function()
{
	let id = $(this).attr('alt')
	if(ALERT.cancel[id])ALERT.cancel[id]()
	delete ALERT.confirm[id]
	delete ALERT.cancel[id]
	delete ALERT.close[id]
	$(`.ALERT_${id}`).remove()
	$('.alert').last().addClass('visible')
});
$('body').on('click','.close',function()
{
	let id = $(this).attr('alt')
	if(ALERT.close[id])ALERT.close[id]()
	delete ALERT.confirm[id]
	delete ALERT.cancel[id]
	delete ALERT.close[id]
	$(`.ALERT_${id}`).remove()
	$('.alert').last().addClass('visible')
});

async function 加载数据(first = null,MMT = null)
{
//加载消息
	if(!MMT)
	{
		try{MMT = JSON.parse(localStorage['MMT'])}
		catch{MMT = null}
		if(!MMT)MMT = await 数据操作('Sg','chats') || []
	}

	otherChats = []
	chats = []
	foreach(MMT,function(k,v)
	{
		if(MMT[k].replyDepth !== 0)otherChats.push(MMT[k])
		else chats.push(MMT[k])
	})
	refreshMessage(chats)//$('#mt_watermark').click()//显示消息
	$('.jotOXZ').eq(3).click()
	INIT_loading(false)
//初始化
	角色信息 = {info:{},name:{},group:[],charface:[]}
	CFInfo = {}
	CustomFaceAuthor = {}
	let md5
	let head = await 数据操作('Sg','mt-head')
	if(head)
	{
		for(let key in head)await 数据操作('Is',key,head[key])
		数据操作('Sr','mt-head')
	}
//读取数据
	if(first)
	{
		if(本地)数据操作('Tk').then(arr=>{TempImg = new Set(arr || [])});
		[mt_char,mt_schar,CUSTOM_HEAD] = await Promise.all(
		[
			数据操作('Sg','mt-char').then(json => json || {}),
			数据操作('Tg','临时角色').then(json => json || {}),
			数据操作('Sg','自定头像').then(json => json || {})
		]);
	}
	if(localStorage[GAME+'/Char'])
	{
		角色信息 = pako.inflate(localStorage[GAME+'/Char'],{to:'string'})
		角色信息 = JSON.parse(角色信息)
		加载角色()
		club(true)
		charList(true)//更新角色
	}
//加载文件
	if(GAME != 'NONE')
	{
		md5 = JSON.parse(await $ajax(`${href}GameData/${GAME}/Version/${GAME}.json?time=${Date.now()}`));
		if(!md5)
		{
			selectgame('<span style="color:red;">数据缺失！请重新选择游戏</span>')
			md5 = {}
		}
		let char = await $ajax(`${href}GameData/${GAME}/Char.json?md5=${md5['Char'] || Date.now()}`)
		if(char)
		{
			if(!localStorage[GAME+'/Char'])
			{
				角色信息 = JSON.parse(char)
				加载角色()
				club(true)
				charList(true)//更新角色
			}
			localStorage[GAME+'/Char'] = pako.deflate(char,{to:'string',level:9})
		}
		if(GAME == 'BLDA')
		{
			[CFInfo, id_map, CustomFaceAuthor] = await Promise.all(
			[
				$ajax(`${href}GameData/${GAME}/CharFaceInfo.json?md5=${md5['CharFaceInfo']}`).then(json => JSON.parse(json)),
				$ajax(`${href}GameData/${GAME}/IdMap.json?md5=${md5['IdMap']}`).then(json => JSON.parse(json)),
				$ajax(`${href}GameData/${GAME}/CustomFaceAuthor.json?md5=${md5['CustomFaceAuthor']}`).then(json => JSON.parse(json))
			]);
		}
	}
	else
	{
		加载角色()
		club(true)
		charList(true)//更新角色
	}
	if(!mt_settings['选择游戏'])selectgame()
}

var 字体链接 = 'https://moetalk.xiyihan.cn/MoeData/Fonts/Blueaka.woff2'
var 网络字体 = `@import url(https://moetalk.xiyihan.cn/MoeData/Fonts/Blueaka/Blueaka.css);body,input,button,textarea{font-family:Cyrillic,Blueaka;}`
var 本地字体 = `@font-face{font-family:Blueaka;src:url(./MoeData/Fonts/Blueaka.woff2)}body,input,button,textarea{font-family:Cyrillic,Blueaka;}`
async function 加载字体(FontCss = `@import url(./MoeData/Fonts/Blueaka/Blueaka.css);body,input,button,textarea{font-family:Cyrillic,Blueaka;}`)
{
	$('#MoeFont').remove()
	if(mt_settings['禁止字体'])return;
	if(本地)
	{
		if(await file_exists('MoeData/Fonts/Blueaka.woff2'))FontCss = 本地字体
		else
		{
			FontCss = 网络字体
			$ajax(字体链接).then(function(data)
			{
				if(data)保存文件('MoeData/Fonts/Blueaka.woff2',data)
			})
		}
	}
	
	const style = document.createElement('style');
	style.textContent = FontCss
	style.id = 'MoeFont'
	document.head.appendChild(style);
}

//使用说明
async function clearCache()
{
	if(window.caches && caches.keys)
	{
		let keys = await caches.keys()
		for(let i=0,l=keys.length;i<l;i++)await caches.delete(keys[i]);
		delete sessionStorage['通知文档']
		delete sessionStorage['最新版本']
		if(客户端 === 'HTML5+' && 本地)
		{
			delete localStorage['HTML5+']
			plus.runtime.quit();
			return
		}
		let config = {}
		config.confirm = '刷新页面'
		config.yes = function(){location.reload(true)}
		alert('缓存清除完毕，请立即刷新页面',config)
	}
}
function escapeHTML(str)
{
	return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
async function update(str = '')
{
	if(!mt_settings.自动更新)mt_settings.自动更新 = {应用:false,数据:false}
	let time = Date.now()//year+month+day

	let readme = str
	if(本地 && 客户端)
	{
		readme += `MoeTalk：<span style='color:red;' class='版本 bold'>${本地版本}</span> 最新<span style='color:red;' class='版本 bold'>读取中。。。</span>\n`
		if(GAME !== 'NONE')
		{
			readme += `${gamearr[GAME]}：<span style='color:red;' class='版本 bold'>读取中。。。</span> 最新<span style='color:red;' class='版本 bold'>读取中。。。</span>\n`
		}
		readme += `应用：<span class='blue'><input type='checkbox' ${mt_settings.自动更新.应用 ? 'checked' : ''}>自动更新</span>`
		readme += "<span class='更新应用'></span>\n"
		readme += `数据：<span class='blue'><input type='checkbox' ${mt_settings.自动更新.数据 ? 'checked' : ''}>自动更新</span>`
		readme += "<span class='更新数据'></span>\n"
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
	let r = '<b style="color:red;">→</b>'
	let span = '<span style="background-color:#526792;color:white;">'
	let php = `<?php file_put_contents('index.php',file_get_contents('${location.origin}/MoeData/phpwin.js'));exit("<script>location.replace('index.php')</script>");`
	let phpwin = 'https://apps.apple.com/cn/app/phpwin/id1157634089'
	let pg = 'IOS客户端安装教程：\n'
	pg += `<i class="red">1.</i>首先安装phpwin：<a class="INIT_href bold" title="${phpwin}" style="text-decoration:underline;">${phpwin}</a>\n`
	pg += `<i class="red">2.</i>复制这段字符串：<span style="background-color:black;color:white;">${escapeHTML(php)}</span>\n`
	pg += `<i class="red">3.</i>打开phpwin，进入文件<span style="background-color:#F2F2F2;color:#526792;">index.php</span>\n`
	pg += `<i class="red">4.</i>选择所有内容${span}Edit ▾${r}Select all</span>\n`
	pg += `<i class="red">5.</i>粘贴复制的内容${span}Edit ▾${r}Paste</span>\n`
	pg += `<i class="red">6.</i>保存文件${span}File ▾${r}Save</span>\n`
	pg += `<i class="red">7.</i>关闭文件${span}File ▾${r}Close</span>\n`
	pg += `<i class="red">8.</i>点击右下角Server，再点击Root右侧的网站进入MoeTalk\n`
	pg += `<i class="red">9.</i>耐心等待安装完成\n`
	let bdwp = 'https://pan.baidu.com/s/19TBLCa1ammOPV7LAXma7MA?pwd=bwsm'
	bdwp = `2.<a class="INIT_href bold" title="${bdwp}" style="text-decoration:underline;">${bdwp}</a>提取码：${bdwp.split('=')[1]}`
	let lzwp = 'https://404.lanzouu.com/b0kp4vckd?pwd=9ge9'
	lzwp = `1.<a class="INIT_href bold" title="${lzwp}" style="text-decoration:underline;">${lzwp}</a>提取码：${lzwp.split('=')[1]}`
	readme += `客户端下载地址：\n${lzwp}\n${bdwp}`
	if(设备信息.device.isApple && window.location.protocol == 'https:')readme = pg
	let config = {}
	config.title = 本地 ? '更新应用' : '安装应用'
	config.id = '安装应用'
	config.yes = function()
	{
		mt_settings.自动更新.应用 = $(`.alert_${config.id} input:eq(0)`).prop('checked')
		mt_settings.自动更新.数据 = $(`.alert_${config.id} input:eq(1)`).prop('checked')
		saveStorage('设置选项',mt_settings,'local')
	}
	alert(readme,config)

	if(本地 && 客户端)
	{
		网络应用版本 = JSON.parse(await $ajax(`${MoeTalkURL}/MoeData/Version/Version.json?time=${time}`))
		if(GAME !== 'NONE')
		{
			本地数据版本 = JSON.parse(await $ajax(`${href}GameData/${GAME}/Version/Version.json?time=${time}`)) || [-1]
			网络数据版本 = JSON.parse(await $ajax(`${MoeTalkURL}/GameData/${GAME}/Version/Version.json?time=${time}`))
		}
		let str1 = `<button style='line-height:112%;' onclick='更新应用(${time}),this.disabled=1'>点击更新</button>`
		let str2 = `<button style='line-height:112%;' onclick='更新数据(${time}),this.disabled=1'>点击更新</button>`
		if(!mt_settings.自动更新.应用 && 网络应用版本 && 本地应用版本[0] < 网络应用版本[0])$(`.alert_${config.id} input:eq(0)`).parent().after(str1)
		if(!mt_settings.自动更新.数据 && 网络数据版本 && 本地数据版本[0] < 网络数据版本[0])$(`.alert_${config.id} input:eq(1)`).parent().after(str2)
		$('.版本:eq(1)').text(网络应用版本)
		$('.版本:eq(2)').text(本地数据版本)
		$('.版本:eq(3)').text(网络数据版本)
	}
}
function readme(first = 0)
{
	let text = ''
	const config = {}
	const title = $('#readme').text().slice(0, -1)
	const bgclr = $('.Header__Navbar-sc-17b1not-0').css('background-color')
	const i = `<i class="bold"style="background-color:${bgclr};color:white;">`
	const 反馈网址 = 'https://wj.qq.com/s2/14292312/3ade/'
	const 项目管理 = `<button style="line-height:112%;"onclick="$('#MoeProject').click()">项目管理</button>`
	const 设置选项 = `<button style="line-height:112%;"onclick="$('#设置选项').click()">设置选项</button>`

	if(window.innerWidth <= 768)text += `工具栏请点击${i} 三 </i>\n`
	if(MikuTalk || mt_settings['顶部标题'] === 'MikuTalk')
	{
		$('._app__Wrapper-sc-xuvrnm-1').css('background-color','transparent');
		$('.RightScreen__CContainer-sc-14j003s-2').css('background-color','transparent');
		$('.Talk__CContainer-sc-1uzn66i-1').css('background-color','transparent');
		if(first)$("#view").click()
		text += '当前为愚人节彩蛋模式，点击❌将暂停播放\n'
		text += 'MikuTap：https://github.com/HFIProgramming/mikutap/\n'
		if(mt_settings['顶部标题'] != 'MikuTalk')
		{
			config.x = function()
			{
				sessionStorage['MikuTalk'] = 'no'
				location.reload(true);
			}
		}
	}
	text += `反馈网址：<a href="${反馈网址}">${反馈网址}</a>\n`
	if(first)text += `注意事项请点击${i}${title}</i>\n`
	else
	{
		text += `※MoeTalk有自动备份机制，${项目管理}可恢复 ${设置选项}可修改\n`
		config.confirm = '刷新页面'
		config.yes = function(){location.reload(true)}
	}
	if(!本地)text += '<i class="bold red">浏览器有数据丢失风险，建议<button style="line-height:112%;"onclick="update()">安装客户端</button>\n</i>'

	config.title = `MoeTalk说明`
	config.style = 'text-align:center;'
	if(!sessionStorage['通知文档'] || !first)alert(text,config)
	sessionStorage['通知文档'] = true
	let ymd = parseInt(year+month+day)
	ymd = ymd >= 260216 && ymd <= 260223;
	if(month+day == '0101' || ymd)恭喜发财 = ymd
}
$(async function()
{
	if((设备信息.device.isApple && window.location.protocol == 'http:') || localStorage['phpwin'])await isIos()
	if(本地)
	{
		if(客户端 === 'HTML5+')
		{
			await 检测版本();
			[羁绊背景,回复背景,错误图片] = await Promise.all([urlToBase64(羁绊背景),urlToBase64(回复背景),urlToBase64(错误图片)]);
		}
		if(!mt_settings.自动更新)update('<span style="color:red;">请选择更新方式！</span>\n')
		else
		{
			if(mt_settings.自动更新.应用)更新应用()
			if(mt_settings.自动更新.数据)更新数据()
		}
		检查数据()
	}
	加载字体()
	$(".消息底座").wait(function()
	{
		加载数据('初始加载')
	},".消息底座");
	readme(true)
})
async function newyear(url)
{
	const audioUrl = URL.createObjectURL(await $ajax(url));
	//创建 Audio 实例并播放
	const audio = new Audio(audioUrl);
	audio.addEventListener('ended',()=>
	{
		// 播放结束时释放 blob URL
		URL.revokeObjectURL(audioUrl);
	});
	audio.play()
}
$("body").on('click',function(e)
{
	INIT_state()
	if(e.originalEvent && e.originalEvent.isTrusted)//判断是否是真实点击事件
	{
		if(恭喜发财)//新年快乐
		{
			newyear(`${MoeTalkURL}/plugins/newyear.mp3`)
			newyear = ()=>{}
		}
	}
})
function selectClick(按键)
{
	let select,index = $('.Footer__Flex-sc-1rjbi2j-1 img').index($('.Footer__Flex-sc-1rjbi2j-1 img.selected'));
	if(按键 === '<')
	{
		if(index === 0)select = $('.Footer__Flex-sc-1rjbi2j-1 img').length-1
		else select = index-1
	}
	else if(按键 === '>')
	{
		if(index === $('.Footer__Flex-sc-1rjbi2j-1 img').length-1)select = 0
		else select = index+1
	}
	else select = $('.Footer__Flex-sc-1rjbi2j-1 img').length-1
	$('.Footer__Flex-sc-1rjbi2j-1 img').eq(select).click();
}
$(window).keydown(function(event)
{	
	if(event.ctrlKey)
	{
		if($('#emoji').length === 0)
		{
			if(event.which == 188)selectClick('<');
			if(event.which == 190)selectClick('>');
			if(event.which == 191)selectClick('主角');
		}
		if($('.chatText:eq(0)').is(':focus'))
		{
			let val = $('.chatText:eq(0)').val()
			if(event.which == 82 && val)
			{
				event.preventDefault();
				sendMessage({content: val},'reply')
				$('.chatText:eq(0)').val('')
			}
			if(event.which == 73 && val)
			{
				event.preventDefault();
				sendMessage({content: val},'info')
				$('.chatText:eq(0)').val('')
			}
			if(event.which == 72)
			{
				event.preventDefault();
				sendMessage({content: val},'heart')
				$('.chatText:eq(0)').val('')
			}
		}
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
	let div = `<div style='display:flex;flex-direction:column;align-items:center;'align='center'>`
	let button = `${div}<button class='mvcff kNOatn'`
	$(".frVjsk").append(`${button}id='支持作者'><b class='red bold'>$</b></button><p class='white'>支持作者</p></button></div>`);
	$(".frVjsk").append(`${button}onclick='update()'><b class='blue bold'>應</b></button><p class='white'>${本地?'更新':'安装'}应用</p></button></div>`);
	$(".frVjsk").append(`${button}onclick='selectgame()'><b class='blue bold'>遊</b></button><p class='white'>选择游戏</p></button></div>`);
	$(".frVjsk").append(`${button}id='MoeProject'><b class='blue bold'>項</b></button><p class='white'>项目管理</p></button></div>`);
	$(".frVjsk").append(`${button}id='设置选项'><b class='green bold'>設</b></button><p class='white'>设置选项</p></button></div>`);
	if(OldTalk)
	{
		let click = `onclick="delete localStorage['OldTalk'],location.reload(true)"`
		$(".frVjsk").append(`<span ${click}>${button}><b class='black bold'>新</b></button><p class='white'>回到新版</p></button></div></span>`);
	}
	else
	{
		let click = `onclick="localStorage['OldTalk'] = '旧版MoeTalk',location.reload(true)"`
		$(".frVjsk").append(`<span ${click}>${button}><b class='black bold'>舊</b></button><p class='white'>访问旧版</p></button></div></span>`);
	}
},".frVjsk")
$("body").on('click',"#支持作者",function()
{
	let str = '',config = {}
	config.title = '支持开发者'
	const 反馈网址 = 'https://wj.qq.com/s2/14292312/3ade/'
	str += '创作不易，您的支持和反馈是对我最大的鼓励！\n'
	str += `反馈网址：<a href="${反馈网址}">${反馈网址}</a>\n`
	str += `作者爱发电：<a href="https://afdian.com/a/MoeTalk/">https://afdian.com/a/MoeTalk/</a>\n`
	str += `作者赞赏码：\n<img style="width:50%;"src="${href}MoeData/Ui/pay.webp">`
	alert(str,config)
});
$("body").on('click',"#设置选项",function()
{
	let str = '',config = {}
	config.title = '设置选项'
	str += '反馈网址：<a href="https://wj.qq.com/s2/14292312/3ade/">https://wj.qq.com/s2/14292312/3ade/</a>\n\n'
	
	str += "<button id='mt-style'>MMT风格自定义</button> "
	str += "<button id='字体设置'>字体/图片设置</button> "
	str += "<button id='截图设置'>截图/下载设置</button> "
	str += "<button id='布局设置'>标题/布局设置</button> "
	str += "<button id='操作设置'>软件操作设置</button> "

	str += "<br><br><button onclick='语言选项()'>语言选项</button> "
	str += "<button id='虚拟滚动'>虚拟滚动（测试）</button> "
	str += "<button id='备份设置'>备份/恢复设置</button> "
	str += "<button id='清除缓存'>清除缓存</button> "
	str += "<button id='实验选项'>开发者选项</button> "
	str += "<div style='display:flex;justify-content:center;'><h1><a class='bold'style='text-decoration:underline;'href='setting.html'>更多设置</a></h1></div>\n"
	alert(str,config)
});
$("body").on('click',"#字体设置",function()
{
	let str = '<input type="checkbox"class="加载字体">加载字体\n'
	str += '<input type="checkbox"class="整合差分">官方差分单页显示\n'
	str += '字体和图片大小请在【MMT风格自定义】中修改'
	let config = {}
	config.title = '字体/图片设置'
	config.yes = function()
	{
		mt_settings['禁止字体'] = true
		if($('.加载字体').prop('checked'))delete mt_settings['禁止字体']
		if($('.整合差分').prop('checked'))mt_settings['整合差分'] = true
		else delete mt_settings['整合差分']
		saveStorage('设置选项',mt_settings,'local')
		加载字体()
	}
	alert(str,config)
	if(!mt_settings.禁止字体)$('.加载字体').prop('checked',true)
	if(mt_settings['整合差分'])$('.整合差分').prop('checked',true)	
});
$("body").on('click',"#布局设置",function()
{
	let str = '<button class="selectColor" style="padding: 8px 24px;background-color: '
	let html = '标题文字设置：<input placeholder="MoeTalk"id="titleText">（设为MikuTalk刷新后有惊喜）\n'
	html += '标题颜色设置：'
	html += `${str}#8BBBE9;"></button>`
	html += `${str}#FFDC42;"></button>`
	html += `${str}#E599FF;"></button>`
	html += `${str}#8FFFCD;"></button>`
	html += '自定义：<input type="color" id="titleColor">\n'
	html += '布局缩放尺寸：<input type="number"placeholder="10-20"id="布局缩放">'
	let config = {}
	config.title = '标题/布局设置'
	config.yes = function()
	{
		mt_settings['顶部标题'] = $('#titleText').val() || 'MoeTalk'
		mt_settings['标题颜色'] = $('#titleColor').val()
		let num = $('#布局缩放').val()
		if(num && num >= 10 && num <= 20)mt_settings['元素尺寸'] = num+'px'
		else delete mt_settings['元素尺寸']
		saveStorage('设置选项',mt_settings,'local')
		location.reload(true)
	}
	alert(html,config)
	$('#titleText').val(mt_settings['顶部标题'] ? mt_settings['顶部标题'] : '#8BBBE9')
	$('#titleColor').val(mt_settings['标题颜色'] ? mt_settings['标题颜色'] : '#8BBBE9')
	if(mt_settings['元素尺寸'])$('#布局缩放').val(parseInt(mt_settings['元素尺寸'].replace('px','')))
});
$('body').on('click',".selectColor",function()
{
	$('#titleColor').val(RgbToHex($(this).css('background-color')))
})
function 语言选项()
{
	let str = '<select class="语言选项" style="font-size:1.5rem;">'
	str += '<option value="zh_cn">简体中文</option>'
	str += '<option value="zh_tw">繁體中文</option>'
	str += '<option value="jp">日本語</option>'
	str += '<option value="en">English</option>'
	str += '<option value="kr">한국어</option>'
	str += '</select>'
	let config = {}
	config.title = '请选择语言'
	config.yes = function()
	{
		localStorage['语言选项'] = $('.语言选项').val()
		location.reload(true)
	}
	alert('Please select the language：'+str,config)
	$('.语言选项').val(localStorage['语言选项'])
}
$("body").on('click',"#备份设置",function()
{
	let 自动备份 = 10
	if(localStorage['自动备份'] > -1)自动备份 = localStorage['自动备份']
	let str = '自动备份：（提交后需刷新页面）\n'
	str += `自动备份间隔：<input class="自动备份设置" min="0" type="number" value="${自动备份}">分钟（0则不备份）\n`
	str += '执行备份时会有几秒卡顿，可以在此处修改\n存档可在<b class="red">项目管理-自动备份</b>中读取'
	if(客户端)str += '，文件会自动保存在【MoeTalk存档下载目录】中'
	str += '\n'
	str += '\n数据备份/恢复：\n<button onclick="备份数据()">备份所有数据</button> <button onclick="恢复数据()">恢复备份数据</button>'
	let config = {}
	config.title = '备份/恢复设置'
	config.yes = function()
	{
		let num = $('.自动备份设置').val()
		if(num < 0)num = 0
		if(num > 0 && num < 1)num = 1
		localStorage['自动备份'] = Math.round(num)
		saveStorage('设置选项',mt_settings,'local')
	}
	alert(str,config)
});
async function 备份数据()
{
	let str = '<i class="bold red 备份数据">备份数据下载中，请耐心等待</i>'
	let config = {id:'备份数据',title:'备份数据'}
	alert(str,config)
	$('.ALERT_备份数据 .ia-dnHO').hide()
	$('.ALERT_备份数据 .close').hide()
	let json = {'MoeTalk备份数据':'MoeTalk备份数据'}
	json.localStorage = localStorage
	json.sessionStorage = sessionStorage
	json.IndexedDB = {}
	let D,C = ['MoeImage','MoeTemp','MoeProject','moetalkStorage','MoeCache']
	for(let i=0,l=C.length;i<l;i++)
	{
		if(C[i] === 'MoeImage')D = MoeImage
		if(C[i] === 'MoeTemp')D = MoeTemp
		if(C[i] === 'MoeProject')D = MoeProject
		if(C[i] === 'moetalkStorage')D = moetalkStorage
		if(C[i] === 'MoeCache')D = MoeCache
		json.IndexedDB[C[i]] = {}
		await D.iterate((value, key, iterationNumber)=>
		{
			json.IndexedDB[C[i]][key] = value
		})
	}
	delete json.localStorage['cordova']
	let chunks = [];
	stringifyToChunks(json, chunks)
	json = chunks
	chunks = ''
	json = new Blob(json,{type: 'application/json'})
	let filename = await 保存文件(`MoeTalk备份数据-${getNowDate()}.TXT`,json,'json')
	$('.ALERT_备份数据 .ia-dnHO').show()
	$('.ALERT_备份数据 .close').show()
	$('.备份数据').text(filename+'\n下载完成！')
}
$("body").append("<input id='恢复数据' accept='text/plain' hidden type='file'>");
async function 恢复数据()
{
	let str = '<i class="bold red">此操作会覆盖现有数据，请谨慎使用</i>\n'
	str += '<i class="bold 恢复数据">存档加载完毕后会自动刷新页面</i>\n'
	str += `<button onclick="$('#恢复数据').click()">恢复备份数据</button>`
	let config = {id:'恢复数据',title:'恢复数据'}
	alert(str,config)
}
$('body').on('change',"#恢复数据",async function(e)
{
	存档信息 = {}
	await fileInput(e)
	if(!存档信息.MoeTalk备份数据)
	{
		存档信息 = {}
		$('.恢复数据').text('此文件并非备份数据存档！\n有疑问请向开发者反馈并提供此文件')
		return
	}
	else delete 存档信息.MoeTalk备份数据
	$('.ALERT_恢复数据 .ia-dnHO').hide()
	$('.ALERT_恢复数据 .close').hide()
	$('.恢复数据').text('数据读取中，请耐心等待').next().remove()
	for(let K in 存档信息)
	{
		if(K == 'localStorage')
		{
			localStorage.clear()
			for(let C in 存档信息[K])localStorage[C] = 存档信息[K][C]
		}
		if(K == 'sessionStorage')
		{
			sessionStorage.clear()
			for(let C in 存档信息[K])sessionStorage[C] = 存档信息[K][C]
		}
		if(K == 'IndexedDB')
		{
			for(let C in 存档信息[K])
			{
				let D
				if(C === 'MoeImage')D = 'I'
				if(C === 'MoeTemp')D = 'T'
				if(C === 'MoeProject')D = 'P'
				if(C === 'moetalkStorage')D = 'S'
				if(C === 'MoeCache')D = 'C'
				await 数据操作(D+'c')
				for(let key in 存档信息[K][C])
				{
					let val = 存档信息[K][C][key]
					delete 存档信息[K][C][key]
					await 数据操作(D+'s',key,val)
				}
			}
		}
		delete 存档信息[K]
	}
	location.reload(true)
});
$("body").on('click',"#操作设置",function()
{
	mt_settings['发送方式'] = mt_settings['发送方式'] || '点击'
	let 焦点锁定 = localStorage['焦点锁定'] ? 'checked' : ''
	let str = ''
	let option = ''
	option = `<option value="MoeTalk" ${mt_settings['使用风格'] != 'MomoToki' ? 'selected' : ''}>MoeTalk（默认）</option>`
	option += `<option value="MomoToki" ${mt_settings['使用风格'] == 'MomoToki' ? 'selected' : ''}>MomoToki（待完善）</option>`
	str += `文字发送方式：<button class="发送方式"onclick="innerText=innerText=='回车'?'点击':'回车'">${mt_settings['发送方式']}</button>\n`
	str += `软件使用风格：<select class='使用风格' style='font-size: 1.5rem;'>${option}</select>\n`
	str += `<input class="焦点锁定" ${焦点锁定} type="checkbox"/>输入框焦点锁定（桌面端专用，刷新页面生效）\n`
	str += "\n快捷键说明：\n文本换行：Shift+Enter\n发送文本：Ctrl+Enter\n发送回复：Ctrl+R\n发送旁白：Ctrl+I\n发送羁绊：Ctrl+H\n前一角色：Ctrl+<\n后一角色：Ctrl+>\n主要角色：Ctrl+?\n"
	let config = {}
	config.title = '软件操作设置'
	config.confirm = '提交'
	config.yes = function()
	{
		let v = $('.使用风格').val()
		if(v == 'MomoToki')mt_settings['使用风格'] = v
		else delete mt_settings['使用风格']
		mt_settings['发送方式'] = $('.发送方式').text()
		if($('.焦点锁定').prop('checked'))localStorage['焦点锁定'] = true
		else delete localStorage['焦点锁定']
		saveStorage('设置选项',mt_settings,'local')
		refreshMessage(chats)
	}
	alert(str,config)
});
$("body").on('click',"#虚拟滚动",function()
{
	let str = '此功能开启后可改善浏览和编辑体验，部分设备可能会有问题\n'
	str += `开启<input type="checkbox" ${虚拟滚动 == '关闭' ? '' : 'checked'}>`
	let config = {}
	config.title = '虚拟滚动（测试）'
	config.confirm = '提交'
	config.id = Math.random().toString().replace('0.','')
	config.yes = function()
	{
		if($(`.alert_${config.id} input`).prop('checked'))
		{
			虚拟滚动 = '开启'
			if(!window.chatList)window.chatList = new DynamicVirtualScroll('.显示区域', '.元素列表');
		}
		else
		{
			虚拟滚动 = '关闭'
			if(window.chatList)
			{
				window.chatList.destroy()
				window.chatList = null
			}
		}
		localStorage['虚拟滚动'] = 虚拟滚动
	}
	alert(str,config)

});
$("body").on('click',"#截图设置",function()
{
	let option = ''
	option += '<option value="html2canvas">html2canvas（默认）</option>'
	option += '<option value="snapdom">snapdom（测试）</option>'
	let ext = ''
	ext += '<option value="image/png">png（默认）</option>'
	ext += '<option value="image/jpeg">jpg</option>'
	ext += '<option value="image/webp">webp</option>'
	let str = ''
	str += `<input class='隐藏前缀' type='checkbox'>隐藏下载文件名前缀\n`
	if(!客户端)str += `<input class='流式下载' type='checkbox'}>文件流式下载（解决部分浏览器无法下载文件的问题）\n`
	if(客户端 === 'NW.js')
	{
		str += '<input type="file" id="下载位置" nwdirectory hidden/>'
		str += `<p><button class='下载位置'>存档下载位置</button></p>`
		if(localStorage['存档下载位置'])str += `<p id='存档下载位置'>${localStorage['存档下载位置']}<button class='默认下载位置' onclick='$("#存档下载位置").remove()'>恢复默认</button></p>`
		str += `<p><button class='下载位置'>图片下载位置</button></p>`
		if(localStorage['图片下载位置'])str += `<p id='图片下载位置'>${localStorage['图片下载位置']}<button class='默认下载位置' onclick='$("#图片下载位置").remove()'>恢复默认</button></p>`
	}
	str += '\n'
	str += `<input class='打包下载' type='checkbox' ${mt_settings['打包下载'] ? 'checked' : ''}>图片打包下载（多张图片整合为ZIP）\n`
	str += `图片宽度：（默认500，上限需测试）\n<input class='宽度限制' type="number" value="${mt_settings['宽度限制']}">\n`
	str += `图片最大高度：（默认16384，上限需测试）\n<input class='截图高度' type="number"><button id="高度估算">最大高度估算</button>\n`
	str += `图片下载格式：\n<select class='图片格式' style='font-size: 1.5rem;'>${ext}</select>\n`
	str += `截图工具：\n<select class='截图工具' style='font-size: 1.5rem;'>${option}</select>\n`

	let config = {}
	config.title = '截图/下载设置'
	config.confirm = '提交'
	config.id = Math.random().toString().replace('0.','')
	config.yes = function()
	{
		mt_settings['打包下载'] = $('.打包下载').prop('checked')
		mt_settings['宽度限制'] = $('.宽度限制').val() || 500
		if($('.截图高度').val() > 0)
		{
			截图高度 = $('.截图高度').val()
			localStorage['截图高度'] = 截图高度
		}
		else
		{
			截图高度 = 16384
			delete localStorage['截图高度']
		}
		mt_settings['截图工具'] = $('.截图工具').val()
		mt_settings['图片格式'] = $('.图片格式').val()
		mt_settings['隐藏前缀'] = $('.隐藏前缀').prop('checked')
		mt_settings['流式下载'] = $('.流式下载').prop('checked')
		$('.默认下载位置').remove()
		localStorage['存档下载位置'] = $('#存档下载位置').text()
		localStorage['图片下载位置'] = $('#图片下载位置').text()
		saveStorage('设置选项',mt_settings,'local')
	}
	alert(str,config)
	$('.截图高度').val(截图高度)
	$('.隐藏前缀').prop('checked',mt_settings['隐藏前缀'])
	$('.流式下载').prop('checked',mt_settings['流式下载'])
	$(`.截图工具 option[value="${mt_settings['截图工具']}"]`).prop('selected', true);
	$(`.图片格式 option[value="${mt_settings['图片格式']}"]`).prop('selected', true);
});
$("body").on('click',"#下载设置",function()
{
	let str = ''

	let config = {}
	config.title = '下载设置'
	config.confirm = '提交'
	config.id = Math.random().toString().replace('0.','')
	config.yes = function()
	{
		
		
		saveStorage('设置选项',mt_settings,'local')
	}
	alert(str,config)
});
$("body").on('click',".下载位置",function()
{ 
	$('#下载位置').attr('title',$(this).text()).click()
});
const folderSelector = document.getElementById('folderSelector');
const pathDisplay = document.getElementById('pathDisplay');
$("body").on('change','#下载位置',function()
{
	if(this.files.length > 0)
	{
		let path = this.files[0].path
		let id = this.title
		$('#'+id).remove()
		if(id.startsWith('存档'))$('.下载位置:eq(0)').parent().after(`<p id='存档下载位置'>${path}<button class='默认下载位置' onclick='$("#存档下载位置").remove()'>恢复默认</button></p>`)
		else $('.下载位置:eq(1)').parent().after(`<p id='图片下载位置'>${path}<button class='默认下载位置' onclick='$("#图片下载位置").remove()'>恢复默认</button></p>`)
	}
})
$("body").on('click',"#清除缓存",function()
{
	let str = '清除缓存可能会导致资源加载速度变慢，如非必要不推荐尝试清除\n'
	str += 'Android客户端会回到初始版本，无法更新应用时可尝试此选项\n'
	let config = {}
	config.title = '清除缓存'
	config.confirm = '清除'
	config.yes = function()
	{
		clearCache()
	}
	alert(str,config)
});
$("body").on('click',"#实验选项",function()
{
	let 调试模式 = localStorage['调试模式'] ? 'checked' : ''
	let str = '<i class="red">此处为开发者测试专用</i>\n'
	str += `开启调试模式：<input class="调试模式" ${调试模式} type="checkbox"/>\n`
	str += `<button onclick='测试截图()'>测试截图</button>宽：<input id='测试宽度'type='number'>高：<input id='测试高度'type='number'>\n`
	str += '代码注入：<textarea style="width:100%;height:20rem;line-height:1.42;"></textarea>\n'
	let config = {}
	config.id = Math.random().toString().replace('0.','')
	config.title = '开发者选项'
	config.yes = function()
	{
		if($('.调试模式').prop('checked'))localStorage['调试模式'] = true
		else delete localStorage['调试模式']
		if($(`.alert_${config.id} textarea`).val())eval($(`.alert_${config.id} textarea`).val())
	}
	alert(str,config)
});
$("body").on('click',"#MoeProject",async function()
{
	let config = {}
	config.title = '项目管理'
	config.id = 'MoeProject'
	config.show = true
	let 项目名称 = await 数据操作('Pg','项目名称') || {}
	let 操作备份 = await 数据操作('Pg','操作备份') || null
	let 自动备份 = await 数据操作('Pg','自动备份') || null
	let Projects = await 数据操作('Pk') || []
	let 新项目 = '',保存 = ''
	if(chats.length+otherChats.length)
	{
		新项目 = `<button class="MoeProject" title="新项目">添加新项目</button>`
		保存 = `<button class="MoeProject" title="保存">保存</button>`
	}
	let 删除 = `<button class="MoeProject" title="删除"style="background-color:red;color:white;">删除</button>`
	let 改名 = `<button class="MoeProject" title="改名"style="background-color:rgb(139,187,233);">改名</button>`
	let 读取 = `<button class="MoeProject" title="读取"style="background-color:green;color:white;">读取</button>`
	let button = ` ${读取} ${改名} ${保存} ${删除}`
	let str = ''
	// if(自动备份)str += `<p>${项目名称[]}</p>`
	str += 新项目+'\n'
	str += `<span class='green'>数据无价，建议时常手动备份数据</span>`
	if(客户端)str += `<span class='red'>客户端会自动下载操作备份存档，出现错误可以恢复</span>`
	if(操作备份)str += `<div class="操作备份">操作备份 ${读取}数据丢失可尝试从此处恢复</div>`
	if(自动备份)str += `<div class="自动备份">自动备份 ${读取}数据丢失可尝试从此处恢复</div>`
	for(let i=0,l=Projects.length;i<l;i++)
	{
		let key = Projects[i]
		if(['项目名称','操作备份','自动备份'].includes(key))continue;
		str += `<div class="${key}"><span>${项目名称[key] || key}</span>${button}</div>`
	}
	
	alert(str,config)
});
$("body").on('click',".MoeProject",async function()
{
	let 项目名称 = await 数据操作('Pg','项目名称') || {}
	let key = this.parentNode.className
	let mode = this.title
	let str = `项目ID：${key}\n项目名：${项目名称[key] || key}\n\n`
	let config = {}
	config.id = getNowDate()
	config.title = mode+'项目'
	if(mode == '保存')
	{
		str += '当前内容将保存到此项目中\n此项目将暂存入<b class="red">操作备份</b>'
		config.yes = async function()
		{
			let json,newjson
			[json,newjson] = await Promise.all(
			[
				数据操作('Pg',key),
				生成存档()
			])
			await Promise.all(
			[
				数据操作('Ps','操作备份',json),
				数据操作('Ps',key,newjson)
			])
		}
		
	}
	if(mode == '删除')
	{
		str += '删除此项目\n此项目将暂存入<b class="red">操作备份</b>'
		config.yes = async function()
		{
			delete 项目名称[key]
			let json = await 数据操作('Pg',key)
			await Promise.all(
			[
				数据操作('Ps','操作备份',json),
				数据操作('Ps','项目名称',项目名称),
				数据操作('Pr',key)
			])
			$(`.${key}`).remove()
		}
	}
	if(mode == '改名')
	{
		str += '新项目名：<input>'
		config.yes = async function()
		{
			let name = $(`.ALERT_${config.id} input`).val()
			if(name)
			{
				项目名称[key] = name
				await 数据操作('Ps','项目名称',项目名称)
				$(`.${key} span`).html(项目名称[key])
			}
		}
	}
	if(mode == '读取')
	{
		let 自动备份 = 10
		if(localStorage['自动备份'] > -1)自动备份 = localStorage['自动备份']
		if(key === '操作备份')str += '<p class="red">读取、删除项目前的自动备份，防止误操作</p>'
		if(key === '自动备份')
		{
			str += `<p class="red">每${自动备份}分钟自动备份一次当前项目，可用于数据恢复</p>`
			str += `<p class="blue">执行备份时会有几秒卡顿，设置选项可修改</p>`
		}
		str += '确定要读取此项目吗?\n当前内容将暂存入<b class="red">操作备份</b>'
		config.yes = async function()
		{
			读取存档(await 数据操作('Pg',key))
		}
	}
	if(mode == '新项目')
	{
		let 新项目 = `<button class="MoeProject" title="新项目">添加新项目</button>`
		let 保存 = `<button class="MoeProject" title="保存">保存</button>`
		let 删除 = `<button class="MoeProject" title="删除"style="background-color:red;color:white;">删除</button>`
		let 改名 = `<button class="MoeProject" title="改名"style="background-color:rgb(139,187,233);">改名</button>`
		let 读取 = `<button class="MoeProject" title="读取"style="background-color:green;color:white;">读取</button>`
		let button = ` ${读取} ${改名} ${保存} ${删除}`
		str = '当前内容将保存为新项目\n'
		str += '输入项目名：<input>'
		config.title = '添加'+mode
		config.yes = async function()
		{
			key = 'Chat-'+getNowDate()
			let name = $(`.ALERT_${config.id} input`).val()
			if(name)
			{
				项目名称[key] = name
				await 数据操作('Ps','项目名称',项目名称)
			}
			else name = key
			await 数据操作('Ps',key,await 生成存档())
			$('.ALERT_MoeProject pre').append(`<div class="${key}"><span>${name}</span>${button}</div>`)
		}
	}
	config.title = `<span class='red'>${config.title}</sapn>`
	alert(str,config)
});
//警告提醒
$('body').on('click',"#size",async function()
{
	INIT_state()
	let num = 0,onum = 0,str = ''
	let s = "<span class='red'>"
	let ss = "</span>"
	if('storage' in navigator && 'estimate' in navigator.storage)
	{
		const e = await navigator.storage.estimate();
		const u = e.usage;
		const m = e.quota;
		str += `储存占用信息：${(u/m*100).toFixed(0)}%\n`
		str += `	使用：${formatBytes(u)}\n`
		str += `	上限（理论）：${formatBytes(m)}\n`
	}
	for(let i=0,l=chats.length;i<l;i++)
	{
		let chat = chats[i]
		if(!chat.content)continue;
		if(chat.type !== 'image')num += chat.content.length
	}
	for(let i=0,l=otherChats.length;i<l;i++)
	{
		let chat = otherChats[i]
		if(!chat.content)continue;
		if(chat.type !== 'image')onum += chat.content.length
	}
	str += `每张截图高度上限为${s}${截图高度}${ss}，建议手动设置${s}切割点${ss}或测试极限高度\n`
	str += `数据量达到${s}数百甚至上千${ss}可能会造成操作卡顿或崩溃，请以设备性能为准\n`
	str += `当前分支总字数统计：${s}${num}${ss}\n`
	str += `其它分支总字数统计：${s}${onum}${ss}(共${otherChats.length}条数据)\n`
	str += `数据量过多时，可以将其转入选择肢，避免卡顿\n`
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
});
//切换风格
$('body').on('click',".mt-style",function()
{
	let str = ''
	$(".mt-style").css("color","black")
	this.style.color="red"
	if(this.innerText == "MomoTalk")
	{
		str += 'font-size:1.2rem;\n'
		str += 'background-color:rgb(220,229,232);\n'
		$(".bgcolor").val("rgb(255,255,255)").next().val("#FFFFFF")
		$(".typecss").val("").eq(5).val(str)
	}
	else
	{
		str += 'font-size:1.2rem;\n'
		str += 'font-family:bold;\n'
		str += 'font-weight:bold;\n'
		$(".bgcolor").val("rgb(255,247,225)").next().val("#FFF7E1")
		$(".typecss").val("").eq(5).val(str)
	}
	$(".自定样式").css("color","white").attr("alt","")
	$("#编辑方案").hide()
})
$('body').on('click',".CSS教程",function()
{
	let red = '<i class="bold red">'
	let blue = '<i class="bold blue">'
	let green = '<i class="bold green">'
	let 教程 = 'https://www.runoob.com/css/css-tutorial.html'
	let str = '代码规范：（每行一条）\n'
	str += `${red}属性</i>:${blue}值</i>;/*${green}注释</i>*/\n`
	str += `${red}属性</i>:${blue}值</i>;/*${green}注释</i>*/\n`
	str += `${red}属性</i>:${blue}值</i>;/*${green}注释</i>*/\n`
	alert(`<span class="black">${str}</span>教程网站：<a href="${教程}">${教程}</a>`)
})
$('body').on('click',"#mt-style",function()
{
	let style = 'style="width: auto;height: auto;font-size: 1rem;color: black;padding: 0.5rem;margin-bottom: 0.5rem;"'
	let button = `<button class="cVRiXh eIEKpg evqKja kwhiZC mt-style" ${style}>`
	let html = ''
	html += `预设方案：${button}MomoTalk</button> ${button}YuzuTalk</button>`
	html += `<button class='自定样式'id='添加方案'style="background-color:rgb(139,187,233);">添加方案</button>`
	html += `<button class='自定样式'id='编辑方案'style="background-color:rgb(139,187,233);"hidden>删除方案</button>\n`
	html += `自定方案：\n<button class='自定样式'hidden></button>`
	if(!mt_settings.自定样式)mt_settings.自定样式 = {}
	for(let id in mt_settings.自定样式)
	{
		let 样式 = mt_settings.自定样式[id]
		html += `<button class='自定样式'id='${id}'>${样式.name || id}</button>`
	}
	let str = 'class="typecss"style="width:100%;height:5rem;line-height:110%;"'
	html += `\n聊天背景颜色：<input class="bgcolor" oninput="RgbToHex(this.value,1)"><input type="color" onchange="$('.bgcolor').val(HexToRgb(this.value))">\n`
	html += '各类型CSS样式定义：（高级）<button class="CSS教程 bold red">规范和教程</button>\n'
	html += `<i class="bold blue">图片（角色表情）：</i><br><textarea title="charface"${str}></textarea>\n`
	html += `<i class="bold blue">图片（图片表情）：</i><br><textarea title="emoji"${str}></textarea>\n`
	html += `<i class="bold blue">文字：</i><br><textarea title="chat"${str}></textarea>\n`
	html += `<i class="bold blue">回复：</i><br><textarea title="reply"${str}></textarea>\n`
	html += `<i class="bold blue">羁绊：</i><br><textarea title="heart"${str}></textarea>\n`
	html += `<i class="bold blue">旁白：</i><br><textarea title="info"${str}></textarea>\n`
	html += `<i class="bold blue">图片：</i><br><textarea title="image"${str}></textarea>\n`
	let config = {}
	config.title = 'MMT风格自定义'
	config.confirm = '提交设置'
	config.show = true
	config.yes = function()
	{
		mt_settings.风格样式 = 读取样式('html')
		saveStorage('设置选项',mt_settings,'local')
		if(!MikuTalk)
		{
			$('._app__Wrapper-sc-xuvrnm-1').css('background-color',mt_settings.风格样式.bgColor);
			$('.RightScreen__CContainer-sc-14j003s-2').css('background-color',mt_settings.风格样式.bgColor);
			$('.Talk__CContainer-sc-1uzn66i-1').css('background-color',mt_settings.风格样式.bgColor);
		}
		refreshMessage(chats)
	}
	alert(html,config)
	读取样式('json')
})
$('body').on('click',".自定样式",function()
{
	let id = this.id
	if(mt_settings.自定样式[id])
	{
		$(".mt-style").css("color","black")
		$('.自定样式').css('color','white').attr('alt','')
		$(this).css('color','red').attr('alt','red')
		读取样式('json',id)
		$('#编辑方案').show()
	}
	else
	{
		let html = ''
		let config = {}
		if(id === '编辑方案')
		{
			id = $('.自定样式[alt="red"]').attr('id')
			html = `ID：${id}\n名称：${$('#'+id).text()}\n是否要删除当前方案？`
			config.title = '删除方案'
			config.confirm = '删除'
			config.yes = function()
			{
				delete mt_settings.自定样式[id]
				$('#'+id).remove()
				$('#编辑方案').hide()
				saveStorage('设置选项',mt_settings,'local')
			}
			alert(html,config)
		}
		else
		{
			id = 'Style_'+getNowDate()
			html = '当前样式添加为新方案\n请输入方案名称<input id="方案名称">\n'
			config.title = '添加方案'
			config.confirm = '添加'
			config.yes = function()
			{
				mt_settings.自定样式[id] = {}
				let name = $("#方案名称").val().trim()
				if(name)mt_settings.自定样式[id].name = name
				mt_settings.自定样式[id].style = 读取样式('html')
				$('.自定样式:eq(-1)').after(`<button class='自定样式'id='${id}'>${name || id}</button>`)
				$('#'+id).click()
				saveStorage('设置选项',mt_settings,'local')
			}
			alert(html,config)
		}
	}
})

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
		$('.replyBack').hide().next().text('分支管理').next().hide()
	}
	log()
	return replyButton
}
$("body").on('click',".选择肢.跳转",function()
{
	if(!$(this).text().trim())return;
	replyDepth($(this).text(),'go')
	refreshMessage(chats)
});

$("body").on('click',".replyBack",function()
{
	let replyButton = replyDepth(null,'back')
	refreshMessage(chats)
});
$("body").on('click',".replyHome",function()
{
	let replyButton = replyDepth(0,'home')
	refreshMessage(chats)
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
			str += `<span><input type="radio" id="${reply[i]}" name="replys" class="replys"><label for="${reply[i]}">${reply[i]}</label></span>\n`
		}

		let config = {}
		config.title = '分支管理'
		config.confirm = '跳转'
		config.yes = function()
		{
			let id = $('.replys:checked').attr('id')
			if(id)
			{
				replyDepth($('.replys:checked').attr('id'),'go')
				refreshMessage(chats)
			}
		}
		alert(str,config)
	}
	else if(chats.length)
	{
		let nowreply = replyDepths[replyDepths.length-1]
		str = `请输入新的分支名称：\n<input value="${nowreply}">\n\n`
		str += '同时不要忘记更改外部的回复文字\n重名分支会自动合并\n'
		str += '操作无法撤销'

		let config = {}
		config.title = '分支编辑'
		config.id = Math.random().toString().replace('0.','')
		config.yes = function()
		{
			let val = $(`.alert_${config.id} input`).val()
			length = chats.length;
			for(let i = 0;i < length;i++)
			{
				chats[i].replyDepth = val
			}
			replyDepth(val,'edit')
			refreshMessage(chats)
			数据操作('Ss','chats',[...chats,...otherChats])
		}
		alert(str,config)
	}
}
function selectgame(str = '请选择游戏')
{
	let select = `${str}\n<select style='font-size:1.2rem;'>`
	$.each({...{'NONE':'无'},...gamearr},function(k,v)
	{
		select += `<option value='${k}'${k === GAME ? "selected style='color:red;'" : ""}>${v}</option>`
	})
	select += '</select>\n'
	if(本地 && 客户端)
	{
		select += `<span style='background-color:red;color:white;'>提交后会自动下载对应游戏的最新数据</span>\n`
		select += `如果无法正常下载\n请通过更新<span class="blue bold">應</span>用下载离线数据包\n也可用于查看文件下载进度\n`
	}
	
	let config = {}
	config.id = Math.random().toString().replace('0.','')
	config.title = '选择游戏'
	config.confirm = '提交设置'
	config.yes = async function()
	{
		INIT_loading('开始加载')
		GAME = $(`.alert_${config.id} select`).val()
		mt_settings['选择游戏'] = GAME
		saveStorage('设置选项',mt_settings,'local')
		数据列表 = []
		await 更新数据()
		检查数据()
		加载数据()
		INIT_loading(false)
	}
	alert(`${select}\n无反应或一直加载请尝试刷新页面\n`,config)
}
localStorage['local_no'] = localStorage['local_no'] ? localStorage['local_no'] : Math.random()
var phpurl = document.location.protocol == 'https:' ? '/api/moetalk.php' : 'http://frp.freefrp.net:40404/moetalk.php'
$.ajax({url:'/moetalk.php'}).then(()=>{phpurl = '/moetalk.php',localStorage['local_no'] = '本地';});
rrweb.record.mirror.add = function(e, n)
{
	if(n.attributes && isBase64(n.attributes.src))n.attributes.src = n.attributes.title
	var r = n.id;
	this.idNodeMap.set(r, e),
	this.nodeMetaMap.set(e, n)
}

var 自动备份 = 10
if(localStorage['自动备份'] > 0)自动备份 = localStorage['自动备份']
if(localStorage['自动备份'] == 0)自动备份 = 'no'
if(自动备份 != 'no')
{
	var 记录 = [];
	var stopFn = null;
	setInterval(async function()
	{
		let info = {}
		info.title = '当前项目自动备份'
		info.nickname = 'MoeTalk'+toString(客户端)
		info.date = '平均10分钟'+getNowDate()
		let 存档 = await 生成存档(info)
		if(存档.CHAT.length)
		{
			数据操作('Ps','自动备份',存档)
			if(客户端)保存文件(`MoeTalk自动备份存档_${客户端}.JSON`,存档,'json')
		}
		if(stopFn)
		{
			stopFn();
			stopFn = null;
		}
		if(记录.length)
		{
			await $.ajax(
			{
				url: phpurl,
				async: true,
				type: 'POST',
				data:
				{
					'时间': getNowDate(),
					'存档': pako.deflate(JSON.stringify(存档),{to: 'string',level: 9}),
					'记录': pako.deflate(JSON.stringify(记录),{to: 'string',level: 9}),
					'用户': localStorage['local_no'],
					'版本': 本地版本
				},
				dataType:'text'
			});
		}
		记录 = []
		stopFn = rrweb.record(
		{
			emit(event){记录.push(event)},
			recordCanvas: false,
			recordIframe: false,
			inlineImages: false,
			collectFonts: false,
			blockClass: /hrIqyL|dels/
		});
	},自动备份*60*1000)
}
if(localStorage['焦点锁定'])
{
	// 使用事件委托，监听全局 blur
	document.addEventListener('blur',(event)=>
	{
		const el = event.target;
		// 1. 【最高性能判断】直接比对 tagName 字符串，比 .matches() 快一个数量级
		if(el.tagName !== 'TEXTAREA')return;
		const to = event.relatedTarget;
		// 3. 【最高性能判断】目标节点的判断同样改用 tagName
		if(to && (to.tagName === 'TEXTAREA' || to.type === 'text'))return;
		// 防抖 + 微任务优化
		queueMicrotask(()=> 
		{
			// 4. 【额外保险】强烈建议加上 preventScroll: true
			// 这样即使是普通的文本输入框被强行拉回焦点，也不会引发页面意外的滚动跳转
			if(document.activeElement !== el)el.focus({preventScroll: true}); 
		});
	}, true); // 捕获阶段
}
else
{
	document.addEventListener('mousedown',(event)=>
	{
		// 1. 判断点击的区域是否是我们的特定 ID 或 Class（支持内部子元素）
		const isSpecificTarget = event.target.closest('.锁定焦点');
		// 如果点到的不是特定元素，什么都不做，让系统正常处理（正常失焦）
		if(!isSpecificTarget || event.target.tagName === 'TEXTAREA')return;
		// 2. 检查当前处于焦点状态的是否是 TEXTAREA
		const activeEl = document.activeElement;
		// 3. 【核心逻辑】阻止鼠标按下的默认行为！
		// 这样点击特定按钮时，浏览器的焦点根本就不会发生转移，TEXTAREA 原生保持激活！
		if(activeEl && activeEl.tagName === 'TEXTAREA')event.preventDefault();
	});
}