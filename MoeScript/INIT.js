(function()
{
	if(!String.prototype.hasOwnProperty("replaceAll"))
	{//解决低版本浏览器不支持replaceAll
		String.prototype.replaceAll  = function(s1,s2)
		{
			return this.split(s1).join(s2)
		};
	}
})();
const moetalkStorage = localforage.createInstance({name:'moetalkStorage'});//数据库
if(mt_settings['存储模式'])
{
	moetalkStorage.setDriver('localStorageWrapper');
	['chats','mt-char','mt-head'].map(function(key,k)
	{
		if(localStorage[key])
		{
			sessionStorage[key] = localStorage[key]
			delete localStorage[key]
			localStorage['moetalkStorage/'+key] = sessionStorage[key]
			delete sessionStorage[key]
		}
	})

}
function os(u = window.navigator.userAgent)
{
	return {isMobile:!!u.match(/AppleWebKit.*Mobile/i)||!!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/),isWechat:!!u.match(/MicroMessenger/i),isQQ:!!u.match(/QQ/i),isIos:!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),isAndroid:!!u.match(/(Android);?[\s/]+([\d.]+)?/),isiPhone:!!u.match(/(iPhone\sOS)\s([\d_]+)/),isSafari:!!u.match(/Safari/),isFirefox:!!u.match(/Firefox/),isOpera:!!u.match(/Opera/),isChrome:u.match(/Chrome/i)!==null&&u.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i)===null?true:false,isDeskTop:(()=>{const Agents=['Android','iPhone','SymbianOS','Windows Phone','iPad','iPod','okhttp/3.9.1'];let flag=true;for(let i=0,LEN=Agents.length;i<LEN;i++){if(u.indexOf(Agents[i])!==-1){flag=false;break}}return flag})()};
}
var browser = os();//获取浏览器信息
var player = (本地 ? '/' : href)+'Moedata'//播放器地址
var LibraryURL = 'GameData/BLDA/Library'//图书馆地址
var directory = []//目录
var nowChapter = ['',{chapter:[]}]//当前章节

var $$ = $;//jquery转义
var winHeight = window.innerHeight
var 元素尺寸;
var class0 = 'common__IconButton-sc-1ojome3-0 Header__QuestionButton-sc-17b1not-3 mvcff kNOatn bold';

if(!localStorage['通知文档'] || !localStorage['设置选项'] || localStorage['0'])
{
	let lang = window.navigator.language.toLowerCase()
	if(['zh-cn','zh-sg'].indexOf(lang) > -1)lang = 'zh_cn'
	if(['zh-tw','zh-hk'].indexOf(lang) > -1)lang = 'zh_tw'
	if(lang.indexOf('en') > -1)lang = 'en'
	if(['ja','ja-jp'].indexOf(lang) > -1)lang = 'jp'
	if(['ko','ko-kr'].indexOf(lang) > -1)lang = 'kr'
	if(['zh_cn','zh_tw','en','jp','kr'].indexOf(lang) < 0)lang = 'en'

	if(!mt_settings['语言选项'])mt_settings['语言选项'] = lang
	if(!mt_settings['图片比例'])mt_settings['图片比例'] = '90%'
	if(!mt_settings['差分比例'])mt_settings['差分比例'] = '90%'
	if(!mt_settings['排序方式'])mt_settings['排序方式'] = 'name'
	if(!mt_settings['人物改名'])mt_settings['人物改名'] = {}
	if(!mt_settings['图片格式'])mt_settings['图片格式'] = 'image/png'
	//if(!mt_settings['禁止字体'])mt_settings['禁止字体'] = false
	if(!mt_settings['高度限制'])mt_settings['高度限制'] = 16384
	//if(!mt_settings['头像尺寸'])mt_settings['头像尺寸'] = 300
	if(!mt_settings['发送方式'])mt_settings['发送方式'] = '回车'
	if(!mt_settings['社团列表'])mt_settings['社团列表'] = {}
	if(!mt_settings['文字样式'])mt_settings['文字样式'] = {}
	if(!mt_settings['宽度限制'])mt_settings['宽度限制'] = 500
	if(!mt_settings['顶部标题'])mt_settings['顶部标题'] = 'MoeTalk'
	if(!mt_settings['社团列表'])mt_settings['社团列表'] = {}
	if(!mt_settings['截图选项'])mt_settings['截图选项'] = {}
	if(!mt_settings['选择角色'])
	{
		mt_settings['选择角色'] = {}
		mt_settings['选择角色'].no = 0
		mt_settings['选择角色'].index = 1
		mt_settings['选择角色'].list = []
	}
	mt_settings['设备信息'] = window.navigator.userAgent
	delete localStorage['0']
	delete localStorage['1']	
	delete localStorage['mt-lang']
	delete localStorage['mt-size']
	delete localStorage['mt-cfsize']
	delete localStorage['mt-order']
	delete localStorage['mt-style']
	delete localStorage['mt-name']
	delete localStorage['mt-image']
	delete localStorage['mt-nofont']
	delete localStorage['mt-maxheight']
	delete localStorage['hnum']
	delete localStorage['send']
	delete localStorage['CharFaceIndex']
	delete localStorage['mt-club']
	delete localStorage['mt-date']
	delete localStorage['lang']
	delete localStorage['first']
	delete localStorage['mt-edit']
	delete localStorage['mt-font']
	delete localStorage['replyNo']
	delete localStorage['replyGroup']
	delete localStorage['mt-selectedList']
	delete localStorage['vConsole_switch_y']
	delete localStorage['vConsole_switch_x']
	delete localStorage['MoeTalk']
	delete localStorage['顶部标题']
	delete localStorage['heads']
	delete localStorage['qchar']
	delete localStorage['png']
	delete localStorage['启动时间']
	delete localStorage['启动次数']
	delete localStorage['启动网址']
	delete localStorage['启动设备']
	delete localStorage['mt-version']
	delete localStorage['mt-rand']
	//if(!mt_settings['后台保存'])delete mt_settings['后台保存']
	if(!mt_settings['存储模式'] || mt_settings['存储模式'] === 'indexedDB')delete mt_settings['存储模式']

}
mt_settings['当前网址'] = window.location.href
if(!mt_settings.风格样式 || mt_settings.风格样式[0])
{
	mt_settings.风格样式 = {}
	mt_settings.风格样式.bgColor = 'transparent'
	mt_settings.风格样式.info = [['background-color','rgb(220, 229, 232)']]
}
mt_settings['右侧发言'] = mt_settings['右侧发言'] ? mt_settings['右侧发言'] : {}
if(browser.isFirefox)mt_settings['禁止字体'] = true
saveStorage('设置选项',mt_settings,'local')

//元素出现后执行代码
jQuery.fn.wait = function (func,cls,times,interval)
{
	var _times = times || -1, //100次
		_interval = interval || 10, //20毫秒每次
		_self = this,
		_selector = this.selector, //选择器
		_iIntervalID; //定时器id
	if($(cls).length) //如果已经获取到了，就直接执行函数
	{
		func && func.call($(cls));
	}
	else
	{
		_iIntervalID = setInterval(function()
		{
			if(!_times) //是0就退出
			{
				clearInterval(_iIntervalID);
			}
			_times <= 0 || _times--; //如果是正数就 --
			_self = $(cls); //再次选择
			if($(cls).length) //判断是否取到
			{
				func && func.call($(cls));
				clearInterval(_iIntervalID);
			}
		}, _interval);
	}
	return this;
}

//点击函数
function click(name)
{
	$(name).click();
}
// 格式化日对象
function getNowDate()
{
	var date = new Date();
	var hour = date.getHours(); // 时
	var minutes = date.getMinutes(); // 分
	var seconds = date.getSeconds() //秒
	// 给一位数的数据前面加 “0”
	if(hour < 10)hour = "0" + hour;
	if(minutes < 10)minutes = "0" + minutes;
	if(seconds < 10)seconds = "0" + seconds;
	return `${year}${month}${day}${hour}${minutes}${seconds}`;
}
function toString(val)
{
	if(!val)return ''
	else return val.toString()
}
function isTrue(val)
{
	if(!val)return false
	else return true
}
function saveStorage(key,val,mode)
{
	if(本地 && !客户端)
	{
		alert('资源管理器下打开的MoeTalk无法生成图片和使用MomoTalk播放器\n请启动MoeTalk.exe！')
	}
	if(mode === 'local' && ['chats','mt-char','mt-head','DB_EMOJI','imageArr'].indexOf(key) > -1)
	{
		moetalkStorage.setItem(key,val).catch(function(error)
		{
			let arr = []
			arr[0] = error
			localStorage['error'] = JSON.stringify(arr)
			alert('数据写入失败！麻烦请在设置页面“下载localStorage存档”后并向开发者提交')
		});
		return;
	}
	val = JSON.stringify(val)
	try
	{
		if(mode === 'local')localStorage[key] = val
		if(mode === 'session')sessionStorage[key] = val
	}
	catch{}
	
}
function localization(str)
{
	return {zh_cn:str,zh_tw:str,en:str,jp:str,kr:str,pinyin:str,id:str}
}
function Translator(str)
{
	if(!mt_text[str] || !mt_text[str][mtlang])return str;
	return mt_text[str][mtlang];
}
function blink(element)
{
	return $(element).fadeOut(500, function() 
	{
		$(this).fadeIn(500, function() {});
	})[0];
}
//警告
function INIT_state(num)
{
	if(!num)num = 1.1
	let height = parseInt($(".Talk__CContainer-sc-1uzn66i-1").outerHeight()*num)
	if(chats.length > 300)//if(height > mt_settings['高度限制'])//检测聊天框宽度
	{
		$("#size").text(`长度: ${height}\n消息: ${chats.length}`).css('background-color','red');//显示警告
	}
	else
	{
		$("#size").text(`长度: ${height}\n消息: ${chats.length}`).css('background-color','');//隐藏警告
	}
	return height
}
$('body').on('click',".INIT_href",function()
{
	if(客户端 === 'HTML5+')
	{
		plus.runtime.openURL($(this).attr('title'));
	}
	else
	{
		window.open($(this).attr('title'))
	}
})
function INIT_loading(loading = '加载')
{
	let className = '.Loading__MainLoading-sc-cfft3t-0'
	if($(className).length)
	{
		if($(className+':visible').length || !loading)$(className).hide()
		else $(className).show()
	}
	else
	{
		$(className).wait(function()
		{
			if($(className+':visible').length || !loading)$(className).hide()
			else $(className).show()
		},className)
	}
}
function INIT_waiting(callback,arr)//等待变量加载
{
	let boolen = true;
	foreach(arr,function(k,v){boolen = window[v] ? boolen : false})
	if(boolen)callback()
	else
	{
		setTimeout(function(){INIT_waiting(callback,arr)}, 1000)
		return
	}
}
function foreach(arr,callback)//循环索引数组
{
	for(let i=0,len=arr.length;i<len;i++)callback(i,arr[i])
}
if(mt_settings['后台保存'])
{
	window.onblur = function(){saveStorage('chats',[...chats,...otherChats],'local')}
	window.onfocus = function(){saveStorage('chats',[...chats,...otherChats],'local')}
	window.onbeforeunload = function(){saveStorage('chats',[...chats,...otherChats],'local')}
}
async function $ajax(url,type = null)
{
	let ext = url.split('?')[0].split('.').pop()
	if(客户端 === 'phpwin' && url[0] === '/')
	{
		url = url.split('?')[0]
		let data = await $.ajax(
		{
			url: '/index.php',
			type: 'POST',
			data: {getfile: url}
		})
		if(!data)return false;
		if(!['js','css','json','html'].includes(ext))//base64转blob
		{
			data = atob(data.split(',').pop())
			let len = data.length;
			let bytes = new Uint8Array(len);
			for(let i = 0; i < len; i++)
			{
				bytes[i] = data.charCodeAt(i);
			}
			data = 'application/octet-stream'
			return new Blob([bytes],{type: data});
		}
		else return data;
	}
	return new Promise(function(resolve)
	{
		let xhr = new XMLHttpRequest();
		if(ext === 'html')url = url.toLowerCase()
		xhr.open("GET",url);
		url = url.split('?')[0]
		if(typeof type === 'string')ext = type
		if(!['js','css','json','html'].includes(ext))xhr.responseType = 'blob';
		xhr.onload = function()
		{
			if(this.status === 200 && decodeURIComponent(this.responseURL).includes(url))
			{
				if(!this.responseType || !this.response.type.includes('text'))resolve(this.response)//成功
				else resolve(false)
			}
			else resolve(false)
		}
		xhr.onerror = function(){resolve(false)}
		xhr.send();
	})
}
function blobToBase64(blob)
{
	return new Promise(function(resolve)
	{
		var reader = new FileReader();
		reader.onload = function()
		{
			var dataUrl = reader.result;
			var base64 = dataUrl.split(',')[1];
			resolve(base64)
		};
		reader.onerror = function(){resolve(false)};
		reader.readAsDataURL(blob);
	})
}