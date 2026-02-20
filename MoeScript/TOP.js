/*@MoeScript/TOP.js@*/
var 恭喜发财 = false
pause = true
skip = false
if(mt_settings['调试模式'])var vConsole = new window.VConsole();
INIT_loading('开始加载')

var mt_charface;
var id_map = [{},{}]
var CustomFaceAuthor = {}
var ALERT = {}
window.alert = function(text = '',config = {})
{
	if(config.show)$('.alert').removeClass('visible')
	config.id = config.id || Math.random().toString().replace('0.','')
	config.title = config.title || '通知'
	config.cancel = config.cancel || '取消'
	config.confirm = config.confirm || '确认'
	config.style = config.style || ''
	config.yes = config.yes || null
	$(`.ALERT_${config.id}`).remove()
let style = `style="-webkit-user-select: text;user-select: text; line-height: 125%; white-space: pre-wrap; word-break: break-word; text-align: left; width: 100%; font-family: inherit; overflow: scroll;${config.style}"`
let html = 
`<div class="btncdx alert ALERT_${config.id} visible" style="z-index: 1000;">
	<div class="cFtxnG">
		<div class="duPzcp" style="height: auto;">
			<span class="GsrFM title" style="border-bottom: 4px solid;">${config.title}</span>
			<div class="kncnxt cancel" style="top: 12.5%;user-select: none;cursor: pointer;" alt="${config.id}">❌</div>
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
	ALERT[config.id] = config.yes
	$('.弹窗').append(html)
}
$('body').on('click','.cancel',function()
{
	let id = $(this).attr('alt')
	delete ALERT[id]
	$(`.ALERT_${id}`).remove()
	$('.alert').last().addClass('visible')
});
$('body').on('click','.confirm',function()
{
	let id = $(this).attr('alt')
	if(ALERT[id])ALERT[id]()
	$(this).prev().click()
});
async function 加载数据()
{
	let head = await 数据操作('Sg','mt-head')
	if(head)
	{
		for(let key in head)await 数据操作('Is',key,head[key])
		数据操作('Sr','mt-head')
	}

	allChats = await 数据操作('Sg','chats') || []
	otherChats = []
	chats = []
	foreach(allChats,function(k,v)
	{
		repairCF(allChats[k]);
		if(allChats[k].replyDepth !== 0)otherChats.push(allChats[k])
		else chats.push(allChats[k])
	})
	allChats = []
	refreshMessage(chats)//$('#mt_watermark').click()//显示消息
	$(".INDEX_tips").wait(function()
	{
		chats.length ? $('.INDEX_tips').hide() : $('.INDEX_tips').show()//开头提示
		otherChats.length ? $('.reply').show() : $('.reply').hide()//选择肢管理
	},".INDEX_tips");

	club(true)
	let game = mt_settings['选择游戏'] || 'NONE';
	let md5 = {}
	if(game != 'NONE')md5 = JSON.parse(await $ajax(`${href}GameData/${game}/Version/${game}.json?time=${Date.now()}`));
	if(!md5 || !mt_settings['选择游戏'])
	{
		if(!mt_settings['选择游戏'])selectgame()
		else selectgame('<span style="color:red;">数据缺失！请重新选择游戏</span>')
		md5 = {}
	}
	[mt_school,mt_club,mt_characters,mt_charface,CFInfo,id_map,CustomFaceAuthor,mt_char,mt_schar,mt_head] = await Promise.all(
	[
		game != 'NONE' ? $ajax(`${href}GameData/${game}/MT-School.json?md5=${md5['MT-School']}`).then(json => JSON.parse(json)) : {},
		game != 'NONE' ? $ajax(`${href}GameData/${game}/MT-Club.json?md5=${md5['MT-Club']}`).then(json => JSON.parse(json)) : {},
		game != 'NONE' ? $ajax(`${href}GameData/${game}/MT-Characters.json?md5=${md5['MT-Characters']}`).then(json => JSON.parse(json)) : {},
		game != 'NONE' ? $ajax(`${href}GameData/${game}/MT-CharFace.json?md5=${md5['MT-CharFace']}`).then(json => JSON.parse(json)) : {},
		game != 'NONE' ? $ajax(`${href}GameData/${game}/CharFaceInfo.json?md5=${md5['CharFaceInfo']}`).then(json => JSON.parse(json)) : {},
		game == 'BLDA' ? $ajax(`${href}GameData/${game}/IdMap.json?md5=${md5['IdMap']}`).then(json => JSON.parse(json)) : [{},{}],
		game == 'BLDA' ? $ajax(`${href}GameData/${game}/CustomFaceAuthor.json?md5=${md5['CustomFaceAuthor']}`).then(json => JSON.parse(json)) : {},
		数据操作('Sg','mt-char'),
		数据操作('Tg','临时角色'),
		数据操作('Sg','自定头像')
	]);
	mt_char = mt_char || {}
	mt_schar = mt_schar || {}
	mt_head = mt_head || {}
	加载角色()
	charList(true)//更新角色
	INIT_loading(false)
}

var FontList = `@font-face{font-family:Blueaka;src:url(./MoeData/Fonts/Blueaka.woff2)}/*默认*/
@font-face{font-family:Jalnan;src:url(./MoeData/Fonts/Jalnan.ttf)}/*标题*/
@font-face{font-family:KaiTi;src:url(./MoeData/Fonts/KaiTi.ttf)}/*楷体*/
@font-face{font-family:Cyrillic;src:local(Arial);unicode-range:U+0400-04FF;}/*匹配西里尔字母*/
body,textarea,button{font-family:Cyrillic,Blueaka;}`
if(!mt_settings['禁止字体'])$("head").append("<link rel='stylesheet' href='./MoeData/Fonts/FontList.css' data-n-g='' id='mt-font'>");//加载字体
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
async function update(str = '')
{
	if(!mt_settings.自动更新)mt_settings.自动更新 = {应用:false,数据:false}
	let game = mt_settings['选择游戏'] || 'NONE'
	let time = Date.now()//year+month+day

	let readme = str
	if(本地 && 客户端)
	{
		readme += `MoeTalk：<span style='color:red;' class='版本 bold'>${本地版本}</span> 最新<span style='color:red;' class='版本 bold'>读取中。。。</span>\n`
		if(game !== 'NONE')
		{
			readme += `${gamearr[game]}：<span style='color:red;' class='版本 bold'>读取中。。。</span> 最新<span style='color:red;' class='版本 bold'>读取中。。。</span>\n`
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
	let bdwp = 'https://pan.baidu.com/s/1Cc-Us0FM_ehP9h5SDWhrVg?pwd=blda'
	let link = `<a class="INIT_href bold" title="${bdwp}" style="text-decoration:underline;">${bdwp}</a>`
	readme += `客户端下载地址：\n${link}\n提取码：BLDA\n`
	let config = {}
	config.title = 本地 ? '更新应用' : '下载客户端'
	config.id = Math.random().toString().replace('0.','')
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
		if(game !== 'NONE')
		{
			本地数据版本 = JSON.parse(await $ajax(`${href}GameData/${game}/Version/Version.json?time=${time}`)) || [-1]
			网络数据版本 = JSON.parse(await $ajax(`${MoeTalkURL}/GameData/${game}/Version/Version.json?time=${time}`))
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
$(async function()
{
	if(本地 && 客户端 === 'HTML5+')
	{
		await 检测版本();
		[羁绊背景,回复背景,错误图片] = await Promise.all([urlToBase64(羁绊背景),urlToBase64(回复背景),urlToBase64(错误图片)]);
	}
	加载数据()
	if(MikuTalk)
	{
		$('._app__Wrapper-sc-xuvrnm-1').css('background-color','transparent');
		$('.RightScreen__CContainer-sc-14j003s-2').css('background-color','transparent');
		$('.Talk__CContainer-sc-1uzn66i-1').css('background-color','transparent');
		$("#view").click()
	}
	/[\u4e00-\u9fff]/.test($("#readme").text()) && $("#readme").css('font-family','moetalk')
	let span = `<span onclick="$('#readme').click()" style="font-family:Jalnan;background-color:rgb(139,187,233);color:white;padding:4px;cursor:pointer;">`
	let notice = ''
	notice += `MoeTalk为基于原作者Raun0129开发的MolluTalk的个人改版\n`
	notice += '反馈网址：<u><a href="https://wj.qq.com/s2/14292312/3ade/">https://wj.qq.com/s2/14292312/3ade/</a></u>\n\n'
	notice += '※移动端可点击左上<i class="bold"style="font-style:italic;color:white;background-color:rgb(139,187,233);"> 三 </i>查看工具栏\n'
	notice += `※<span style="color:white;background-color:green;">数据丢失请尝试从<button style="line-height:112%;"onclick="$('#MoeProject').click()">项目管理</button>中恢复</span>\n`
	if(本地)
	{
		if(!mt_settings.自动更新)update('<span style="color:red;">请选择更新方式！</span>\n')
		else
		{
			if(mt_settings.自动更新.应用)更新应用()
			if(mt_settings.自动更新.数据)更新数据()
		}
	}
	else notice += '※<span style="color:white;background-color:red;">网页端连接不稳定建议</span><button style="line-height:112%;" onclick="update()">下载客户端</button>\n'
	await isIos()
	if(本地 && 客户端)检查数据()
	if(sessionStorage['通知文档'] == notice)return//
	localStorage['通知文档'] = notice
	sessionStorage['通知文档'] = notice
	if(MikuTalk)
	{
		let text = '愚人节快乐！代码来源：<a title="https://github.com/HFIProgramming/mikutap/" class="INIT_href">MikuTap</a>\n通常日期下将标题改为“MikuTalk”即可开启\n点击“确认”可以关闭'
		let config = {}
		config.yes = function()
		{
			sessionStorage['MikuTalk'] = 'no'
			location.reload(true);
		}
		alert(text,config)
	}
	let ymd = parseInt(year+month+day)
	ymd = ymd >= 260216 && ymd <= 260223;
	if(month+day == '0101' || ymd)恭喜发财 = ymd
	let text = `有疑问请点击${span}MoeTalk</span>标题\n\n`
	text += `※<span style="color:white;background-color:green;">数据丢失请尝试从<button style="line-height:112%;" onclick="$('#MoeProject').click()">项目管理</button>中恢复</span>\n`
	if(!本地)text += '※<span style="color:white;background-color:red;">网页端连接不稳定建议<button style="line-height:112%;" onclick="update()">下载客户端</button></span>\n'
	let config = {title:`欢迎使用${span}MoeTalk</span>`,style:'text-align:center;'}
	alert(text,config)
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
	$('.delsNum').text($(".dels:checked").length)
	let name = loadname(mt_settings['选择角色'].no,mt_settings['选择角色'].index)
	let str = $(".dels:checked").length ? '在选中的消息上方插入' : mt_text.input_comment[mtlang]
	$('.chatText').attr('placeholder',name+'：'+str)
	if(e.originalEvent && e.originalEvent.isTrusted)//判断是否是真实点击事件
	{
		if(恭喜发财)//新年快乐
		{
			newyear(`${MoeTalkURL}/plugins/newyear.mp3`)
			newyear = ()=>{}
		}
	}
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
	let div = `<div style='display:flex;flex-direction:column;align-items:center;'align='center'>`
	let button = `${div}<button class='mvcff kNOatn bold'`
	$(".frVjsk").append(`${button}id='支持作者'><b class='red'>支</b></button><p class='white'>支持作者</p></button></div>`);
	$(".frVjsk").append(`${button}onclick='update()'><b class='blue'>應</b></button><p class='white'>${本地?'更新应用':'下载应用'}</p></button></div>`);
	$(".frVjsk").append(`${button}onclick='selectgame()'><b class='blue'>遊</b></button><p class='white'>选择游戏</p></button></div>`);
	$(".frVjsk").append(`${button}id='MoeProject'><b class='blue'>項</b></button><p class='white'>项目管理</p></button></div>`);
	$(".frVjsk").append(`${button}id='设置选项'><b class='green'>設</b></button><p class='white'>设置选项</p></button></div>`);
	if(window.location.href.includes('old'))
	{
		$(".frVjsk").append(`<a href='index.html'>${button}><b class='black'>新</b></button><p class='white'>回到新版</p></button></div></a>`);
	}
	else
	{
		$(".frVjsk").append(`<a href='index_old.html'>${button}><b class='black'>舊</b></button><p class='white'>访问旧版</p></button></div></a>`);
	}
},".frVjsk")
$("body").on('click',"#支持作者",function()
{
	let str = '',config = {}
	config.title = '支持开发者'

	str += '创作不易，您的支持和反馈是对我最大的鼓励！\n'
	str += '反馈网址：<a href="https://wj.qq.com/s2/14292312/3ade/">https://wj.qq.com/s2/14292312/3ade/</a>\n'
	str += `作者爱发电：<a href="https://afdian.com/a/MoeTalk/">https://afdian.com/a/MoeTalk/</a>\n`
	str += `作者赞赏码：\n<img style="width:50%;"src="${href}MoeData/Ui/pay.webp">`
	alert(str,config)
});
$("body").on('click',"#设置选项",function()
{
	let str = '',config = {}
	config.title = '设置选项'
	str += '反馈网址：<a href="https://wj.qq.com/s2/14292312/3ade/">https://wj.qq.com/s2/14292312/3ade/</a>\n\n'
	str += "<button id='mt-style'>切换风格</button> "
	str += "<button id='截图设置'>截图设置</button> "
	str += "<button id='下载设置'>下载设置</button> "
	str += "<button id='实验选项'>实验性选项</button> "
	str += "<button id='清除缓存'>清除缓存</button> "
	str += "<div style='display:flex;justify-content:center;'><h1><a class='bold'style='text-decoration:underline;'href='setting.html'>更多设置</a></h1></div>\n"
	alert(str,config)
});
$("body").on('click',"#截图设置",function()
{
	let option = ''
	option += `<option value="image/png" ${mt_settings['图片格式'] == 'image/png' ? 'selected' : ''}>png</option>`
	option += `<option value="image/jpeg" ${mt_settings['图片格式'] == 'image/jpeg' ? 'selected' : ''}>jpeg</option>`
	option += `<option value="image/webp" ${mt_settings['图片格式'] == 'image/webp'? 'selected' : ''}>webp</option>`
	option += `<option value="image/bmp" ${mt_settings['图片格式'] == 'image/bmp' ? 'selected' : ''}>bmp</option>`
	option += `<option value="image/gif" ${mt_settings['图片格式'] == 'image/gif' ? 'selected' : ''}">gif</option>`
	let str = ''
	str += `图片宽度：（默认500，上限需测试）\n<input class='宽度限制' type="number" value="${mt_settings['宽度限制']}">\n`
	str += `图片最大高度：（默认16384，上限需测试）\n<input class='高度限制' type="number" value="${mt_settings['高度限制']}">\n`
	str += `图片格式：（默认png，其它格式需测试）\n`
	str += `<select class='图片格式' style='font-size: 1.5rem;'>${option}</select>\n`
	option = `<option value="html2canvas" ${mt_settings['截图工具'] != 'snapdom' ? 'selected' : ''}>html2canvas（默认）</option>`
	option += `<option value="snapdom" ${mt_settings['截图工具'] == 'snapdom' ? 'selected' : ''}>snapdom（测试）</option>`
	str += `截图工具：\n`
	str += `<select class='截图工具' style='font-size: 1.5rem;'>${option}</select>\n`
	let config = {}
	config.title = '截图设置'
	config.confirm = '提交'
	config.id = Math.random().toString().replace('0.','')
	config.yes = function()
	{
		mt_settings['宽度限制'] = $$(`.alert_${config.id} .宽度限制`).val() || 500
		mt_settings['高度限制'] = $$(`.alert_${config.id} .高度限制`).val() || 16384
		mt_settings['图片格式'] = $$(`.alert_${config.id} .图片格式`).val()
		mt_settings['截图工具'] = $$(`.alert_${config.id} .截图工具`).val()
		saveStorage('设置选项',mt_settings,'local')
	}
	alert(str,config)
});
$("body").on('click',"#下载设置",function()
{
	let str = ''
	str += `<input class='隐藏前缀' type='checkbox' ${mt_settings['隐藏前缀'] ? 'checked' : ''}>隐藏下载文件名前缀\n`
	str += `<input class='打包下载' type='checkbox' ${mt_settings['打包下载'] ? 'checked' : ''}>图片打包下载\n`
	let config = {}
	config.title = '下载设置'
	config.confirm = '提交'
	config.id = Math.random().toString().replace('0.','')
	config.yes = function()
	{
		mt_settings['隐藏前缀'] = $$(`.alert_${config.id} .隐藏前缀`).prop('checked')
		mt_settings['打包下载'] = $$(`.alert_${config.id} .打包下载`).prop('checked')
		saveStorage('设置选项',mt_settings,'local')
	}
	alert(str,config)
});
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
	let 调试模式 = mt_settings['调试模式'] ? 'checked' : ''
	let 桌面模式 = mt_settings['桌面模式'] ? 'checked' : ''
	let str = ''
	str += `开启调试模式（测试）：<input class="调试模式" ${调试模式} type="checkbox"/>\n`
	str += `开启桌面模式（测试）：<input class="桌面模式" ${桌面模式} type="checkbox"/>\n`
	str += '提交后请刷新页面\n'
	str += '代码注入（测试）：<textarea style="width:100%;height:20rem;line-height:1.42;"></textarea>\n'
	let config = {}
	config.id = Math.random().toString().replace('0.','')
	config.title = '实验性选项'
	config.confirm = '提交设置'
	config.yes = function()
	{
		if($('.调试模式').prop('checked'))mt_settings['调试模式'] = true
		else delete mt_settings['调试模式']
		if($('.桌面模式').prop('checked'))mt_settings['桌面模式'] = true
		else delete mt_settings['桌面模式']
		if($(`.alert_${config.id} textarea`).val())eval($(`.alert_${config.id} textarea`).val())
		saveStorage('设置选项',mt_settings,'local')
	}
	alert(str,config)
});
$("body").on('click',"#MoeProject",async function()
{
	let config = {}
	config.title = '项目管理'
	config.id = 'MoeProject'
	config.show = true
	let 自定义数据 = `<button  class='red'onclick="$('.ALERT_MoeProject .cancel').click(),$('#tool-save').click(),$('.bIvkSg').click(),$('.包含自定义数据').prop('checked',true)">自定义数据</button>`
	let 项目名称 = await 数据操作('Pg','项目名称') || {}
	let 自动备份 = await 数据操作('Pg','自动备份') || null
	let 定时备份 = await 数据操作('Pg','定时备份') || null
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
	str += `<span class='green'>数据无价，为防不测\n开发者建议您将项目和${自定义数据}下载到本地备份保存\n</span>`
	if(客户端)str += `<span class='red'>客户端会自动下载定时备份存档，出现错误可以恢复</span>`
	if(自动备份)str += `<div class="自动备份">自动备份 ${读取}数据丢失可尝试从此处恢复</div>`
	if(定时备份)str += `<div class="定时备份">定时备份 ${读取}数据丢失可尝试从此处恢复</div>`
	for(let i=0,l=Projects.length;i<l;i++)
	{
		let key = Projects[i]
		if(['项目名称','自动备份','定时备份'].includes(key))continue;
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
		str += '将当前正在编辑的项目保存到此项目中，并将原项目将替换进<b class="red">自动备份</b>'
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
				数据操作('Ps','自动备份',json),
				数据操作('Ps',key,newjson)
			])
		}
		
	}
	if(mode == '删除')
	{
		str += '删除此项目，并将此项目将替换进<b class="red">自动备份</b>'
		config.yes = async function()
		{
			delete 项目名称[key]
			let json = await 数据操作('Pg',key)
			await Promise.all(
			[
				数据操作('Ps','自动备份',json),
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
		if(key === '自动备份')str += '<p class="red">读取、删除项目前的自动备份，防止误操作</p>'
		if(key === '定时备份')str += '<p class="red">每10分钟定时备份一次当前项目，可用于数据恢复</p>'
		str += '确定要读取此项目吗?\n当前正在编辑的项目将替换进<b class="red">自动备份</b>'
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
		str = '将当前正在编辑的内容保存为新项目\n'
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
	let num = 0,str = ''
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
	str += `每张截图长度上限为${s}${mt_settings['高度限制']}${ss}，建议手动设置${s}切割点${ss}或测试极限长度\n`
	str += `消息数量达到${s}数百甚至上千${ss}可能会造成操作卡顿或崩溃，请以设备性能为准\n`
	str += `当前分支总字数统计：${s}${num}${ss}\n`
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
		$('.tools').show()//工具栏
		// $('.itLRpr').show()//顶部栏
		// $('.jjPyvz').show()//底部栏
		// $('.dCSLyt').css({top:'3.5rem',paddingBottom:'3.5rem'})
		$('.消息').each(function()
		{
			$(this).append(`<input type="checkbox" class="dels" style="background-color: ${$(this).attr('title')};" data-html2canvas-ignore="true">`)
		})
	}
	else
	{
		$('.消息').css('background-color','').css('border-top','')
		$('.dels').remove()

		$('.tools').hide()//工具栏
		// $('.itLRpr').hide()//顶部栏
		// $('.jjPyvz').hide()//底部栏
		// $('.dCSLyt').css({top:'0rem',paddingBottom:'0rem'})
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
	let onclick = "onclick='"
	onclick += '$(".mt-style").css("color","black"),this.style.color="red",'
	onclick += '$(".bgcolor").val(this.innerText=="MomoTalk"?"rgb(255,255,255)":"rgb(255,247,225)").next().val(this.innerText=="MomoTalk"?"#FFFFFF":"#FFF7E1"),'
	onclick += '$(".typecss").val("").eq(3).val(""+(this.innerText=="MomoTalk"?"background-color:rgb(220,229,232)":"")),'
	onclick += `$(".自定样式").css("color","white").attr("alt",""),$("#编辑方案").hide()'`
	let style = 'style="width: auto;height: auto;font-size: 1rem;color: black;padding: 0.5rem;margin-bottom: 0.5rem;"'
	let button = `<button class="cVRiXh eIEKpg evqKja kwhiZC mt-style" ${style} ${onclick}>`
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
	html += `\n聊天背景颜色：<input class="bgcolor" oninput="RgbToHex(this.value,1)"><input type="color" onchange="$('.bgcolor').val(HexToRgb(this.value))">\n`
	html += '各类型样式定义：（高级）\n'
	html += '文字：<textarea title="chat" class="typecss" style="width:80%;height:5rem;line-height:110%;"></textarea>\n'
	html += '回复：<textarea title="reply" class="typecss" style="width:80%;height:5rem;line-height:110%;"></textarea>\n'
	html += '羁绊：<textarea title="heart" class="typecss" style="width:80%;height:5rem;line-height:110%;"></textarea>\n'
	html += '旁白：<textarea title="info" class="typecss" style="width:80%;height:5rem;line-height:110%;"></textarea>\n'
	html += '图片：<textarea title="image" class="typecss" style="width:80%;height:5rem;line-height:110%;"></textarea>\n'
	let config = {}
	config.title = '风格样式'
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
function 读取样式(mode,id)
{
	let 风格样式 = {}
	if(mode == 'html')
	{
		风格样式.bgColor = HexToRgb($('.bgcolor').val())
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
			if(css.length)风格样式[this.title] = css
			else delete 风格样式[this.title]
		})
		return 风格样式
	}
	if(mode == 'json')
	{
		if(id)风格样式 = mt_settings.自定样式[id].style || {}
		else 风格样式 = mt_settings.风格样式
		$('.bgcolor').val(HexToRgb(风格样式.bgColor)).next().val(RgbToHex(风格样式.bgColor))
		$('.typecss').each(function()
		{
			let style = ''
			foreach(风格样式[this.title] || [],function(k,v)
			{
				style += `${v[0]}: ${v[1]}\n`
			})
			this.value = style
		})
	}
}
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
function refreshMessage(json)
{
	$('.消息').remove()
	let html = ''
	json.map(function(v,k)
	{
		html += makeMessage(v.type,v,k,'add')
	})
	$('.消息底座').before(html)
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
		$('.replyBack').hide().next().text('选择肢管理').next().hide()
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
			str += `<span><input type="radio" id="${reply[i]}" name="replys" class="replys"><label for="${reply[i]}">${reply[i]}</label></span>\n`
		}

		let config = {}
		config.title = '选择肢管理'
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
		str = `请输入新的选择肢名称：\n<input value="${nowreply}">\n\n`
		str += '同时不要忘记更改外部的选择肢文字\n重名选择肢会自动合并\n'
		str += '操作无法撤销'

		let config = {}
		config.title = '选择肢编辑'
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
			saveStorage('chats',[...chats,...otherChats],'local')
		}
		alert(str,config)
	}
}
function selectgame(str = '请选择游戏')
{
	let select = `${str}\n<select style='font-size:1.2rem;'>`
	let game = mt_settings['选择游戏'] || 'NONE'
	$.each({...{'NONE':'无'},...gamearr},function(k,v)
	{
		select += `<option value='${k}'${k === game ? "selected style='color:red;'" : ""}>${v}</option>`
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
		mt_settings['选择游戏'] = $(`.alert_${config.id} select`).val()
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
	if(n.attributes && (n.attributes.src || '').startsWith('data:'))
	{
		n.attributes.src = n.attributes.title
	}
	var r = n.id;
	this.idNodeMap.set(r, e),
	this.nodeMetaMap.set(e, n)
}
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
		数据操作('Ps','定时备份',存档)
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
},600*1000)
if(客户端 === 'NW.js' || mt_settings['桌面模式'])
{
	// 使用事件委托，监听所有 input/textarea 的 blur
	document.addEventListener('blur', (event) => {
	  const el = event.target;
	  const to = event.relatedTarget;

	  if (!el.matches?.('input, textarea')) return;
	  if (to?.matches?.('input, textarea')) return;

	  // 防抖 + 微任务优化（非必需，但更流畅）
	  queueMicrotask(() => {
	    if (document.activeElement !== el) {
	      el.focus();
	    }
	  });
	}, true); // 必须用捕获阶段
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