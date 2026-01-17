/*@MoeScript/TOP.js@*/
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
let style = `style="user-select: text; line-height: 125%; white-space: pre-wrap; word-break: break-word; text-align: left; width: 100%; font-family: inherit; overflow: scroll;${config.style}"`
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
				<button class="eLyPUY cancel" alt="${config.id}">${config.cancel}</button>
				<button class="eLyPUY kebTxe confirm" alt="${config.id}">${config.confirm}</button>
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
async function t()
{
	await tt()
	let game = mt_settings['选择游戏'] || 'NONE';
	let md5 = {}
	if(game != 'NONE')md5 = JSON.parse(await $ajax(`${href}GameData/${game}/Version/${game}.json?time=${Date.now()}`));
	if(!md5 || !mt_settings['选择游戏'])
	{
		if(!mt_settings['选择游戏'])selectgame()
		else selectgame('<span style="color:red;">数据缺失！请重新选择游戏</span>')
		md5 = {}
	}
	[mt_school,mt_club,mt_characters,mt_charface,CFInfo,id_map,CustomFaceAuthor,mt_char,allChats,mt_schar] = await Promise.all(
	[
		game != 'NONE' ? $ajax(`${href}GameData/${game}/MT-School.json?md5=${md5['MT-School']}`).then(json => JSON.parse(json)) : {},
		game != 'NONE' ? $ajax(`${href}GameData/${game}/MT-Club.json?md5=${md5['MT-Club']}`).then(json => JSON.parse(json)) : {},
		game != 'NONE' ? $ajax(`${href}GameData/${game}/MT-Characters.json?md5=${md5['MT-Characters']}`).then(json => JSON.parse(json)) : {},
		game != 'NONE' ? $ajax(`${href}GameData/${game}/MT-CharFace.json?md5=${md5['MT-CharFace']}`).then(json => JSON.parse(json)) : {},
		game != 'NONE' ? $ajax(`${href}GameData/${game}/CharFaceInfo.json?md5=${md5['CharFaceInfo']}`).then(json => JSON.parse(json)) : {},
		game == 'BLDA' ? $ajax(`${href}GameData/${game}/IdMap.json?md5=${md5['IdMap']}`).then(json => JSON.parse(json)) : [{},{}],
		game == 'BLDA' ? $ajax(`${href}GameData/${game}/CustomFaceAuthor.json?md5=${md5['CustomFaceAuthor']}`).then(json => JSON.parse(json)) : {},
		moetalkStorage.getItem('mt-char'),
		moetalkStorage.getItem('chats'),
		MoeTemp.getItem('临时角色')
	]);
	mt_char = mt_char || {}
	allChats = allChats || []
	otherChats = []
	chats = []
	mt_schar = mt_schar || {}
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
		otherChats.length ? $('.reply').show() : $('.reply').hide()//选择肢管理
	},".INDEX_tips")
	CHAR_GetCharList()
	选择角色 = true
	charList(选择角色)//更新角色
	refreshMessage(chats)//$('#mt_watermark').click()//显示消息
	INIT_loading(false)
}

function moedev()
{
	let 调试模式 = mt_settings['调试模式'] ? 'checked' : ''
	let 桌面模式 = mt_settings['桌面模式'] ? 'checked' : ''
	let str = ''
	str += `开启调试模式（测试）：<input class="调试模式" ${调试模式} type="checkbox"/>\n`
	str += `开启桌面模式（测试）：<input class="桌面模式" ${桌面模式} type="checkbox"/>\n`
	str += '提交后请刷新页面\n'
	str += '代码注入（测试）：<textarea style="width:100%;height:20rem;line-height:1.42;"></textarea>\n'
	str += 'Android客户端无法更新应用版本请尝试清除缓存\n'
	str += '<button class="red" onclick="clearCache()">清除缓存</button>\n'
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
	});
}
async function update(str = '')
{
	if(!mt_settings.自动更新)mt_settings.自动更新 = {应用:false,数据:false}
	let game = mt_settings['选择游戏'] || 'NONE'
	let time = Date.now()//year+month+day

	let readme = str
	if(本地 && 客户端)
	{
		readme += `MoeTalk：<span style='color:red;' class='版本 bold'>${本地应用版本}</span> 最新<span style='color:red;' class='版本 bold'>读取中。。。</span>\n`
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
	config.title = 本地 ? '检查更新' : '下载客户端'
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
			本地数据版本 = JSON.parse(await $ajax(`${href}GameData/${game}/Version/Version.json?time=${time}`))
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
	t()
	if(MikuTalk)
	{
		$('.Talk__CContainer-sc-1uzn66i-1').css('background-color','transparent');
		$('._app__Wrapper-sc-xuvrnm-1').css('background-color','transparent');
		$("#view").click()
	}
	/[\u4e00-\u9fff]/.test($("#readme").text()) && $("#readme").css('font-family','moetalk')
	let span = `<span onclick="$('#readme').click()" style="font-family:Jalnan;background-color:rgb(139,187,233);color:white;padding:4px;cursor:pointer;">`
	let notice = ''
	notice += `MoeTalk为基于原作者Raun0129开发的MolluTalk的个人改版\n`
	notice += '反馈网址：<u><a href="https://wj.qq.com/s2/14292312/3ade/">https://wj.qq.com/s2/14292312/3ade/</a></u>\n\n'
	notice += '※移动端可点击左上<i class="bold"style="font-style:italic;color:white;background-color:rgb(139,187,233);" onclick="moedev()"> 三 </i>查看工具栏\n'
	
	if(本地)
	{
		if(客户端 === 'HTML5+')
		{
			if(location.href.includes('/www/') && !localStorage['HTML5+'])
			{
				安装应用()
				return
			}
			else if(localStorage['HTML5+'] && localStorage['HTML5+'].includes('file'))
			{
				if(href.includes('/www/') || href.includes('http'))
				{
					await waitPlus()
					plus.io.resolveLocalFileSystemURL('_doc/MoeData/Version/Version.json',function(entry)
					{
						entry.file(function(file)
						{
							var reader = new plus.io.FileReader();
							reader.onload = function(e)
							{
								let ver = JSON.parse(e.target.result || '[-1]')[0]
								if(本地应用版本[0] > ver)安装应用()
								else plus.webview.currentWebview().loadURL(localStorage['HTML5+'])
							};
							reader.onerror = function(e){安装应用()};
							reader.readAsText(file, 'utf-8');
						});
					},function(e){安装应用()});
					return
				}
			}
		}
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
	let text = `欢迎使用${span}MoeTalk</span>\n有疑问请点击${span}MoeTalk</span>标题\n\n`
	text += '※<span style="color:white;background-color:red;">数据无价，请注意时常备份您的存档！</span>\n'
	if(!本地)text += '※<span style="color:white;background-color:red;">网页端连接不稳定建议</span><button style="line-height:112%;" onclick="update()">下载客户端</button>\n'
	let config = {style:'text-align:center;'}
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
		let ymd = parseInt(year+month+day)
		ymd = ymd >= 260216 && ymd <= 260223;
		if(month+day == '0101' || ymd)//新年快乐
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
	if(本地)$(".frVjsk").append(`<button class='${class0}' onclick='update()'><b style='color:red;'>檢</b></button><span class='tool' align='center'>检查更新</span><br>`);
	else $(".frVjsk").append(`<button class='${class0}' onclick='update()'><b style='color:red;'>端</b></button><span class='tool' style='white-space:pre;' align='center'>下载\n客户端</span><br>`);
	$(".frVjsk").append(`<button class='${class0}' onclick='selectgame()'><b style='color:blue;'>遊</b></button><span class='tool'>选择游戏</span><br>`);
	$(".frVjsk").append(`<button class='${class0}' id='mt-style'><b style='color:blue;'>換</b></button><span class='tool'>切换风格</span><br>`);
	$(".frVjsk").append(`<button class='${class0}' id='MoeProject'><b style='color:red;'>項</b></button><span class='tool' align='center'>项目管理</span><br>`);
	$(".frVjsk").append(`<a href='${href}index_old.html'><button class='${class0}'><b style='color:black;'>舊</b></button></a><span class='tool'>访问旧版</span><br>`);
	$(".frVjsk").append(`<a href='${href}setting.html'><button class='${class0}'><b style='color:black;'>設</b></button></a><span class='tool'>设置页面</span><br>`);
},".frVjsk")
$("body").on('click',"#MoeProject",async function()
{
	let 项目名称 = await MoeProject.getItem('项目名称') || {}
	let 自动备份 = await MoeProject.getItem('自动备份') || null
	let Projects = await MoeProject.keys() || []
	let 新项目 = '',保存 = ''
	if(chats.length+otherChats.length)
	{
		新项目 = `<button class="MoeProject" title="新项目">添加新项目</button>`
		保存 = `<button class="MoeProject" title="保存">保存</button>`
	}
	let 删除 = `<button class="MoeProject" title="删除">删除</button>`
	let 编辑 = `<button class="MoeProject" title="编辑">编辑</button>`
	let 读取 = `<button class="MoeProject" title="读取">读取</button>`
	let button = ` ${保存} ${删除} ${编辑} ${读取}`
	let str = ''
	// if(自动备份)str += `<p>${项目名称[]}</p>`
	str += 新项目+'\n'
	if(自动备份)str += `<div class="自动备份">自动备份 ${读取}</div>`
	for(let i=0,l=Projects.length;i<l;i++)
	{
		let key = Projects[i]
		if(['项目名称','自动备份'].includes(key))continue;
		str += `<div class="${key}"><span>${项目名称[key] || key}</span>${button}</div>`
	}
	let config = {}
	config.id = 'MoeProject'
	config.show = true
	alert(str,config)
});
$("body").on('click',".MoeProject",async function()
{
	let 项目名称 = await MoeProject.getItem('项目名称') || {}
	let key = this.parentNode.className
	let mode = this.title
	let str = `项目ID：${key}\n项目名：${项目名称[key] || key}\n\n`
	let config = {}
	config.id = getNowDate()
	config.title = mode+'项目'
	if(mode == '保存')
	{
		str += '将当前正在编辑的项目保存到此项目中，并自动备份原项目'
		config.yes = async function()
		{
			let json,newjson
			[json,newjson] = await Promise.all(
			[
				MoeProject.getItem(key),
				生成存档()
			])
			await Promise.all(
			[
				MoeProject.setItem('自动备份',json),
				MoeProject.setItem(key,newjson)
			])
		}
		
	}
	if(mode == '删除')
	{
		str += '将删除此项目，可在自动备份中恢复'
		config.yes = async function()
		{
			delete 项目名称[key]
			let json = await MoeProject.getItem(key)
			await Promise.all(
			[
				MoeProject.setItem('自动备份',json),
				MoeProject.setItem('项目名称',项目名称),
				MoeProject.removeItem(key)
			])
			$(`.${key}`).remove()
		}
	}
	if(mode == '编辑')
	{
		str += '新项目名：<input>'
		config.yes = async function()
		{
			let name = $(`.ALERT_${config.id} input`).val()
			if(name)
			{
				项目名称[key] = name
				await MoeProject.setItem('项目名称',项目名称)
				$(`.${key} span`).html(项目名称[key])
			}
		}
	}
	if(mode == '读取')
	{
		str += '确定要读取此项目吗?\n当前正在编辑的项目可在自动备份中恢复'
		config.yes = async function()
		{
			读取存档(await MoeProject.getItem(key))
		}
	}
	if(mode == '新项目')
	{
		let 保存 = `<button class="MoeProject" title="保存">保存</button>`
		let 删除 = `<button class="MoeProject" title="删除">删除</button>`
		let 编辑 = `<button class="MoeProject" title="编辑">编辑</button>`
		let 读取 = `<button class="MoeProject" title="读取">读取</button>`
		let button = ` ${保存} ${删除} ${编辑} ${读取}`
		str = '将当前正在编辑的内容保存为新项目\n'
		str += '输入项目名：<input>'
		config.title = mode
		config.yes = async function()
		{
			key = 'Chat-'+getNowDate()
			let name = $(`.ALERT_${config.id} input`).val()
			if(name)
			{
				项目名称[key] = name
				await MoeProject.setItem('项目名称',项目名称)
			}
			else name = key
			await MoeProject.setItem(key,await 生成存档())
			$('.ALERT_MoeProject pre').append(`<div class="${key}"><span>${name}</span>${button}</div>`)
		}
	}
	alert(str,config)
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
	let length = 0;
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
	let onclick = "onclick='"
	onclick += '$(".mt-style").css("color","black"),this.style.color="red",'
	onclick += '$(".bgcolor").val(this.innerText=="MomoTalk"?"rgb(255,255,255)":"rgb(255,247,225)").next().val(this.innerText=="MomoTalk"?"#FFFFFF":"#FFF7E1"),'
	onclick += '$(".typecss").val("").eq(3).val(""+(this.innerText=="MomoTalk"?"background-color:rgb(220,229,232)":""))'
	onclick += "'"
	let style = 'style="width: auto;height: auto;font-size: 1rem;color: black;padding: 0.5rem;margin-bottom: 0.5rem;"'
	let button = `<button class="cVRiXh eIEKpg evqKja kwhiZC mt-style" ${style} ${onclick}>`
	let html = ''
	html += `预设方案：${button}MomoTalk</button> ${button}YuzuTalk</button>\n`
	html += `聊天背景颜色：<input class="bgcolor" oninput="RgbToHex(this.value,1)"><input type="color" onchange="$('.bgcolor').val(HexToRgb(this.value))">\n`
	html += '各类型样式定义：（高级）\n'
	html += '文字：<textarea title="chat" class="typecss" style="width:80%;height:5rem;line-height:110%;"></textarea>\n'
	html += '回复：<textarea title="reply" class="typecss" style="width:80%;height:5rem;line-height:110%;"></textarea>\n'
	html += '羁绊：<textarea title="heart" class="typecss" style="width:80%;height:5rem;line-height:110%;"></textarea>\n'
	html += '旁白：<textarea title="info" class="typecss" style="width:80%;height:5rem;line-height:110%;"></textarea>\n'
	html += '图片：<textarea title="image" class="typecss" style="width:80%;height:5rem;line-height:110%;"></textarea>\n'
	let config = {}
	config.title = '风格样式'
	config.confirm = '提交设置'
	config.yes = function()
	{
		mt_settings.风格样式.bgColor = HexToRgb($('.bgcolor').val())
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
	alert(html,config)
	$('.bgcolor').val(HexToRgb(mt_settings.风格样式.bgColor)).next().val(RgbToHex(mt_settings.风格样式.bgColor))
	$('.typecss').each(function()
	{
		let style = ''
		foreach(mt_settings.风格样式[this.title] || [],function(k,v)
		{
			style += `${v[0]}: ${v[1]}\n`
		})
		this.value = style
	})
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
		select += `如果无法正常下载\n请通过<span class="blue bold">檢</span>查更新下载离线数据包\n也可用于查看文件下载进度\n`
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
		CHAR_UpdateChar()
		INIT_loading(false)
	}
	alert(`${select}\n无反应或一直加载请尝试刷新页面\n`,config)
}
localStorage['local_no'] = localStorage['local_no'] ? localStorage['local_no'] : Math.random()
var phpurl = document.location.protocol == 'https:' ? '/api/moetalk.php' : 'http://frp.freefrp.net:40404/moetalk.php'
$.ajax({url:'../moetalk.php',success:function(){phpurl = '../moetalk.php',localStorage['local_no'] = 'LOCAL';}});
$.ajax({url:'http://moetalk.frp.freefrps.com/moetalk.php',success:function(){phpurl = localStorage['local_no'] ? this.url : phpurl;}});
setInterval(async function()
{
	let info = {}
	info.title = '当前项目自动备份'
	info.nickname = 'MoeTalk'+toString(客户端)
	info.date = '平均10分钟'+getNowDate()
	let json = await 生成存档(info)
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
	if(客户端)保存文件(`MoeTalk自动备份存档_${客户端}.JSON`,json,'json')
}, 600 * 1000);
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