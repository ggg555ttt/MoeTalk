/*@MoeScript/INIT.js@*/
var TempImg = new Set()
function 读取样式(mode,id)
{
	let 风格样式 = {}
	if(mode == 'html')//写入CSS
	{
		风格样式.bgColor = HexToRgb($('.bgcolor').val())
		$('.typecss').each(function()
		{
			let type = this.title
			let val = this.value
			if(val)风格样式[type] = val
			else delete 风格样式[type]
		})
		return 风格样式
	}
	if(mode == 'json')//读取CSS
	{
		if(id)风格样式 = mt_settings.自定样式[id].style || {}
		else 风格样式 = mt_settings.风格样式
		$('.bgcolor').val(HexToRgb(风格样式.bgColor)).next().val(RgbToHex(风格样式.bgColor))
		$('.typecss').each(function()
		{
			let type = this.title
			let style = ''
			if(typeof 风格样式[type] == 'object')
			{
				foreach(风格样式[type],function(k,v)
				{
					style += `${v[0]}:${v[1]};\n`
				})
			}
			else style = 风格样式[type] || ''
			if(type == 'charface')this.placeholder = 'max-width:90%;/*角色表情宽高百分比*/'
			else if(type == 'emoji')this.placeholder = 'max-width:90%;/*图片表情宽高百分比*/'
			else if(type == 'image')this.placeholder = 'max-width:90%;/*上传图片宽高百分比*/'
			else this.placeholder = 'font-size:1.1rem;/*字体大小*/'
			this.value = style
		})
	}
	if(mode == 'str')//CSS数组转字符串
	{
		let style = ''
		foreach(id,function(k,v)
		{
			style += `${v[0]}:${v[1]};\n`
		})
		return style
	}
	if(mode == 'obj')//CSS字符串转对象
	{
		let style = {}
		let css = id.split('\n');
		foreach(css,function(k,v)
		{
			v = v.split(';')[0].split(':')
			if(v.length === 2 && v[0].trim() !== '')
			{
				style[v[0].trim()] = v[1].trim()
			}
		})
		return style
	}
}
var 错误日志 = []
function 记录错误(info)
{
	错误日志.push(info)
	localStorage['ERROR'] = JSON.stringify(错误日志)
}
// 捕获运行时错误 (window.onerror / window.addEventListener)
window.onerror = function(message, source, lineno, colno, error) {
    const errorInfo = {
        type: 'js_runtime_error',
        message: message,
        stack: error && error.stack ? error.stack : '', // 核心：堆栈信息
        file: source,
        position: `${lineno}:${colno}`,
        url: window.location.href, // 当前页面
        userAgent: navigator.userAgent, // 浏览器/设备信息
        time: new Date().toISOString()
    };
    
    // 发送日志到服务器
    记录错误(errorInfo);
    
    // 返回 true 阻止错误在控制台输出（可选）
    return false; 
};
// 捕获 Promise 错误 (unhandledrejection)
window.addEventListener('unhandledrejection', function(event) {
    const errorInfo = {
        type: 'promise_rejection',
        message: event.reason && event.reason.message || 'Unknown Promise Error',
        stack: event.reason && event.reason.stack || '',
        rawReason: event.reason,
        time: new Date().toISOString()
    };
    
    记录错误(errorInfo);
});
// 捕获资源加载错误 (img, script, link)
// window.addEventListener('error', function(event) {
//     // 区分是 JS 错误还是 资源 错误
//     // 资源错误的目标是 HTMLElement (如 img, script)
//     if (event.target && (event.target.tagName === 'IMG' || event.target.tagName === 'SCRIPT')) {
//         const errorInfo = {
//             type: 'resource_error',
//             tagName: event.target.tagName,
//             src: event.target.src || event.target.href,
//             time: new Date().toISOString()
//         };
//         记录错误(errorInfo);
//     }
// }, true); // 注意：这里必须设为 true (捕获阶段)
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
const MoeImage = localforage.createInstance({name:'MoeImage'});//图片库
const MoeTemp = localforage.createInstance({name:'MoeTemp'});//临时文件
const MoeProject = localforage.createInstance({name:'MoeProject'});//项目库
const MoeCache = localforage.createInstance({name:'MoeCache'});//播放器缓存
数据操作('Cc')
function getDeviceAndBrowserInfo()
{
	const ua = navigator.userAgent.toLowerCase();

	// ================= 1. 判断设备 (Device) =================
	const isMac = /macintosh|mac os x/i.test(ua);
	const isIPhone = /iphone/i.test(ua);
	const isIPod = /ipod/i.test(ua);
	// 修复 iPadOS 13+ 将 UA 伪装成 Mac 的问题（通过最大触控点数判断）
	const isIPad = /ipad/i.test(ua) || (isMac && navigator.maxTouchPoints > 0);

	// 核心需求：统一的苹果设备判断 (Mac, iPhone, iPad, iPod)
	const isApple = isMac || isIPhone || isIPod || isIPad;
  
	const isAndroid = /android|adr/i.test(ua);
	const isWindows = /windows|win32|win64/i.test(ua);

	// 判断是移动端还是 PC 端
	const isMobile = isIPhone || isIPad || isIPod || isAndroid || /mobile/i.test(ua);
	const isPc = !isMobile;

 	// 提取具体的设备类型名称
 	let deviceType = 'unknown';
 	if (isIPhone) deviceType = 'iphone';
 	else if (isIPad) deviceType = 'ipad';
 	else if (isMac && !isIPad) deviceType = 'mac'; // 排除被误判的 iPad
 	else if (isAndroid) deviceType = 'android';
 	else if (isWindows) deviceType = 'windows';

 	// ================= 2. 判断浏览器 (Browser) =================
 	const isWechat = /micromessenger/i.test(ua); // 微信内置浏览器
 	const isEdge = /edg/i.test(ua) || /edge/i.test(ua);
 	const isFirefox = /firefox/i.test(ua);
 	// Chrome 的 UA 里包含 Safari，Edge 的 UA 包含 Chrome，所以需要按优先级排除
 	const isChrome = /chrome/i.test(ua) && !isEdge;
 	const isSafari = /safari/i.test(ua) && !/chrome/i.test(ua) && !isAndroid;

	// 提取浏览器类型和版本号
	let browserType = 'unknown';
	let browserVersion = 'unknown';

	if(isWechat)
	{
		browserType = 'wechat';
		browserVersion = (ua.match(/micromessenger\/([\d.]+)/) || [])[1] || 'unknown';
	}
	else if(isEdge)
	{
		browserType = 'edge';
		browserVersion = (ua.match(/edg\/([\d.]+)/) || ua.match(/edge\/([\d.]+)/) || [])[1] || 'unknown';
	}
	else if(isFirefox)
	{
		browserType = 'firefox';
		browserVersion = (ua.match(/firefox\/([\d.]+)/) || [])[1] || 'unknown';
	}
	else if(isChrome)
	{
		browserType = 'chrome';
		browserVersion = (ua.match(/chrome\/([\d.]+)/) || [])[1] || 'unknown';
	}
	else if(isSafari)
	{
		browserType = 'safari';
		browserVersion = (ua.match(/version\/([\d.]+)/) || [])[1] || 'unknown';
	}

	// ================= 3. 返回结果 =================
	let device = 
	{
		device:
		{
			isApple,     // 是否为苹果公司设备 (Mac, iPhone, iPad等)
			isAndroid,   // 是否为安卓设备
			isWindows,   // 是否为 Windows 设备
			isMobile,    // 是否为移动端
			isPc,        // 是否为 PC 端
			type: deviceType // 'mac' | 'iphone' | 'ipad' | 'android' | 'windows' | 'unknown'
		},
		browser:
		{
			isWechat,    // 是否为微信浏览器
			isChrome,
			isSafari,
			isFirefox,
			isEdge,
			type: browserType,       // 'chrome' | 'safari' | 'firefox' | 'edge' | 'wechat' | 'unknown'
			version: browserVersion  // 浏览器版本号，例如 '114.0.0.0'
		}
	};
	return device
}
var 设备信息 = getDeviceAndBrowserInfo()
var player = (本地 ? '/' : href)+'Moedata'//播放器地址
var directory = []//目录
var MMT目录 = false//目录

var $$ = $;//jquery转义
var winHeight = window.innerHeight
var 原始比例 = null;
var 缩放比例 = parseInt(mt_settings['元素尺寸'])
if(缩放比例 >= 10 && 缩放比例 <= 20)缩放比例 += 'px'
else 缩放比例 = null;
function setting(SETTING)
{
	if(!SETTING['顶部标题'])SETTING['顶部标题'] = 'MoeTalk'
	if(!SETTING['宽度限制'])SETTING['宽度限制'] = 500
	if(!SETTING['人物改名'])SETTING['人物改名'] = {}
	if(!SETTING['社团列表'])SETTING['社团列表'] = {}
	if(!SETTING['截图选项'])SETTING['截图选项'] = {}
	if(!SETTING['右侧发言'])SETTING['右侧发言'] = {}
	if(!SETTING['表情信息'])SETTING['表情信息'] = {}
	if(!SETTING['选择角色'])
	{
		SETTING['选择角色'] = {}
		SETTING['选择角色'].no = 0
		SETTING['选择角色'].index = 1
		SETTING['选择角色'].list = []
	}
	if(!SETTING.风格样式 || SETTING.风格样式[0])
	{
		SETTING.风格样式 = {}
		SETTING.风格样式.bgColor = 'transparent'
		SETTING.风格样式.info = 'background-color:rgb(220, 229, 232);'
	}

	SETTING['当前网址'] = window.location.href
	SETTING['设备信息'] = window.navigator.userAgent
	if(!SETTING.文字样式)SETTING.文字样式 = {}
	for(let type in SETTING.风格样式)
	{
		let style = SETTING.风格样式[type]
		if(typeof style == 'object')SETTING.风格样式[type] = 读取样式('str',style)
	}
	if(SETTING.图片比例)
	{
		if(!SETTING.风格样式.image)SETTING.风格样式.image = ''
		SETTING.风格样式.image += `max-width:${SETTING.图片比例};/*上传图片宽高百分比*/\n`
	}
	if(SETTING.差分比例)
	{
		if(!SETTING.风格样式.charface)SETTING.风格样式.charface = ''
		SETTING.风格样式.charface += `max-width:${SETTING.差分比例};/*角色表情宽高百分比*/\n`
	}
	for(let type in SETTING.文字样式)
	{
		let fontSize = SETTING.文字样式[type]['font-size']
		if(!SETTING.风格样式[type])SETTING.风格样式[type] = ''
		if(fontSize)SETTING.风格样式[type] += `font-size:${fontSize};/*字体大小*/`
	}
	delete SETTING.差分比例
	delete SETTING.图片比例
	delete SETTING.文字样式
	delete SETTING.排序方式
	return SETTING
}
mt_settings = setting(mt_settings)
saveStorage('设置选项',mt_settings,'local')

var LANG = localStorage['语言选项'] || 'zh_cn'
if(!localStorage['语言选项'])
{
	let lang = window.navigator.language.toLowerCase()
	if(lang.includes('en'))LANG = 'en'
	else if(['ja','ja-jp'].includes(lang))LANG = 'jp'
	else if(['ko','ko-kr'].includes(lang))LANG = 'kr'
	else if(['zh-tw','zh-hk'].includes(lang))LANG = 'zh_tw'
	else LANG = 'zh_cn'
}
if(!['zh_cn','zh_tw','en','jp','kr'].includes(LANG))LANG = 'zh_cn'
localStorage['语言选项'] = LANG

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
		数据操作('Ss',key,val).catch(function(error)
		{
			let arr = []
			arr[0] = error
			localStorage['error'] = JSON.stringify(arr)
			alert('数据写入失败！麻烦请在设置页面“备份所有数据”后并向开发者提交')
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
function localization(str,img)
{
	const arr = {zh_cn:str,zh_tw:str,en:str,jp:str,kr:str,pinyin:str,id:str}
	if(img)arr.img = href+'MoeData/Ui/School/'+img+'.webp'
	return arr
}
function Translator(str)
{
	if(!mt_text[str] || !mt_text[str][LANG])return str;
	return mt_text[str][LANG];
}
//警告
function INIT_state(num)
{
	if($('.nowChapter').length)return
	if(!num)num = 1.1
	let height = parseInt($(".Talk__CContainer-sc-1uzn66i-1").outerHeight()*num)
	if(chats.length > 300)
	{
		$("#size").text(`高度: ${height}\n数据: ${chats.length}`).css('background-color','red');//显示警告
	}
	else
	{
		$("#size").text(`高度: ${height}\n数据: ${chats.length}`).css('background-color','');//隐藏警告
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
	if(!loading)$('.Loading_0').hide()
	else $('.Loading_0').show()
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
async function getLocFile(file)
{
	let ext = file.split('.').pop()
	if(text && html)html.html(`${text}<span style='color:red;'>${filename}</span>`)
	if(客户端 === 'NW.js')
	{
		if(ext === 'webp')
		{
			file = await fs.readFile(file, 'base64');
			return 'data:image/webp;base64,'+file
		}
		else return await fs.readFile(file, 'utf8');
	}
	if(file.includes('/doc/') && 本地 && 客户端 === 'HTML5+')
	{
		return new Promise(function(resolve)
		{
			plus.io.resolveLocalFileSystemURL(file,function(entry)
			{
				entry.file(function(data)
				{
					var reader = new plus.io.FileReader();
					reader.onload = async function(e)
					{
						data = e.target.result
						if(!data)resolve(null);
						else resolve(data)
					};
					reader.onerror = function(e){resolve(null)};
					if(ext === 'webp')reader.readAsDataURL(data);
					else reader.readAsText(data,'utf-8');
				},function(e){resolve(null)});
			},function(e){resolve(null)});
		})
	}
}
function getfile(url,text = '',html = null)
{
	let filename = url.split('/').pop().split('?').shift()
	if(text && html)html.html(`${text}<span style='color:red;'>${filename}</span>`)
	return new Promise(function(resolve)
	{
		let ext = url.split('?')[0].split('.').pop()
		let xhr = new XMLHttpRequest();
		if(ext === 'html' && url.includes('https://moetalk.netlify.app'))url = url.toLowerCase()
		xhr.open("GET",url);
		url = url.split(url.includes('#') ? '#' : '?')[0]
		if(!['js','css','json','html'].includes(ext))xhr.responseType = 'blob';
		xhr.addEventListener('progress', function(event)
		{
			if(event.lengthComputable && html)
			{
				let percent = ((event.loaded / event.total) * 100).toFixed(1);
				html.html(`${text}<span style='color:red;'>${filename}</span>${percent}%`)
			}
		});
		xhr.onload = function()
		{
			if(this.status === 200)
			{
				if(!this.responseType || !this.response.type.includes('text'))resolve(this.response)//成功
				else resolve(null)
			}
			else resolve(null)
		}
		xhr.onerror = function(){resolve(null)}
		xhr.send();
	})
}
async function $ajax(url,text = '',html = null)
{
	let arr = ['js','css','json','html']
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
		if(!data)return null;
		if(!arr.includes(ext))return await Base64ToBlob(data)
		else return data;
	}
	if(url.includes('/doc/') && 本地 && 客户端 === 'HTML5+')
	{
		return new Promise(function(resolve)
		{
			plus.io.resolveLocalFileSystemURL(url,function(entry)
			{
				entry.file(function(data)
				{
					var reader = new plus.io.FileReader();
					reader.onload = async function(e)
					{
						data = e.target.result
						if(!data)resolve(null);
						if(!arr.includes(ext))resolve(await Base64ToBlob(data))
						else resolve(data)
					};
					reader.onerror = function(e){resolve(null)};
					if(!arr.includes(ext))reader.readAsDataURL(data);
					else reader.readAsText(data,'utf-8');
				},function(e){resolve(null)});
			},function(e){resolve(null)});
		})
	}
	let data = await getfile(url,text,html)
	if(arr.includes(ext) && !校验文件(data,url,ext))data = null;
	if(data || !url.includes('http'))return data//重要
	if(网址列表.length === 0)
	{
		let urls = await getfile('MoeData/links.json')
		urls = urls ? JSON.parse(urls).data : []
		网址列表 = []
		网址列表.push('https://moetalk.netlify.app')
		网址列表.push('https://ggg555ttt.github.io/MoeTalk')
		网址列表.push('https://raw.githubusercontent.com/ggg555ttt/MoeTalk/main')
		for(let i=0,l=urls.length;i<l;i++)
		{
			网址列表.push(urls[i].url+'/https://raw.githubusercontent.com/ggg555ttt/MoeTalk/main')
		}
	}
	while(!data)
	{
		let newurl = 网址列表[Math.floor(Math.random()*网址列表.length)]
		data = await getfile(url.replace(MoeTalkURL,newurl),text,html)
		if(arr.includes(ext) && !校验文件(data,url,ext))data = '';
	}
	return data
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
		reader.onerror = function(){resolve(null)};
		reader.readAsDataURL(blob);
	})
}
function HexToRgb(hex='#000000')
{
	if(hex[0] !== '#')hex = RgbToHex(hex);
	hex = hex.replace('#', '')
	let rgb = []
	rgb[0] = parseInt(hex.substring(0, 2), 16)
	rgb[1] = parseInt(hex.substring(2, 4), 16)
	rgb[2] = parseInt(hex.substring(4, 6), 16)
	if(!(rgb[0]<256 && rgb[1]<256 && rgb[2]<256))rgb = [0,0,0]
	return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
}
function RgbToHex(rgb='rgb(0,0,0)',bg)
{
	if(rgb[0] === '#')rgb = HexToRgb(rgb)
	let hex = '#'
	rgb = rgb.match(/\d+/g) || []
	if(rgb.length !== 3 || !(rgb[0]<256 && rgb[1]<256 && rgb[2]<256))rgb = [0,0,0]
	for(let i=0,l=rgb.length;i<l;i++)hex += Number(rgb[i]).toString(16).toUpperCase().padStart(2, '0')
	if(bg)$('.bgcolor').next().val(hex)
	return hex
}
function 校验文件(str,url,ext)
{
	if(typeof str !== 'string')return null;
	if(ext === 'json' && ['[','{'].includes(str[0]))return true;
	for(let i=0,l=str.length;i<l;i++)
	{
		const code = str.charCodeAt(i);//\n(10)\r(13)\u2028(8232)\u2029(8233)
		if(code === 10 || code === 13 || code === 8232 || code === 8233)
		{
			str = str.slice(0, i).toLowerCase().split('@');
			if(str.length === 3 && url.toLowerCase().includes(str[1]))return true;
			break;
		}
	}
	return null
}
function formatBytes(bytes,decimals = 2)
{
	if(bytes < 0)return '0 B';
	if(bytes === 0)return '0 B';
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];

	const i = Math.floor(Math.log(bytes) / Math.log(1000));// 计算单位级别（0=B, 1=KB, 2=MB, 3=GB）

	if(i<3)decimals = 0
	const value = parseFloat((bytes/Math.pow(1000, i)).toFixed(decimals));
	return value + ' ' + sizes[i];
}
function isBase64(str)
{
	return typeof str === 'string' ? str.startsWith('data:') : !1
}
async function Base64ToBlob(base64String)
{
	// fetch 可以直接解析 data: URI，并自动处理 MIME 类型和 Base64 解码
	const response = await fetch(base64String);
	return await response.blob();
}
async function BlobToBase64(blob)
{
	return new Promise((resolve, reject)=>
	{
		const reader = new FileReader();

		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;

		reader.readAsDataURL(blob);
	});
}
function 并发处理(...promises) {
  return new Promise((resolve) => {
    if (promises.length === 0) {
      resolve(null);
      return;
    }

    let remaining = promises.length;
    let done = false;

    const handle = (value) => {
      if (done) return;

      if (value !== null) {
        done = true;
        resolve(value);
        return;
      }

      remaining -= 1;
      if (remaining === 0) {
        done = true;
        resolve(null);
      }
    };

    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then(handle)
        .catch(() => handle(null));
    });
  });
}
function 处理数据(D,M,C,K,V)
{
	return new Promise(function(resolve)
	{
		D[M](K,V).then((e)=>
		{
			// if(localStorage['调试模式'])缓存文件(D._config.name,C,K,e)
			resolve(e)
		}).catch((e)=>
		{
			let str = `数据库操作失败！\n这可能是存储空间不足引起的\n如果不是请向开发者反馈此问题\n函数名：${D._config.name}.${M}\n键名：${K}`
			let config = {id: 'error',title: '<span class="red">错误警告</span>'}
			alert(str,config)
			resolve(e)
		})
	})
}
async function 处理缓存(DB,C,K,V)
{
	if(location.protocol === 'http:')return null
	if(C[1] === 'c')
	{
		if(C === 'Tc')TempImg.clear()
		return await caches.delete(DB);
	}
	let file = `${href}用户数据/${DB}/`
	const cache = await caches.open(DB);
	if(C[1] === 's' && V)
	{
		if(C[0] === 'T')TempImg.add(K)
		if(typeof V === 'object')
		{
			file += `${K}.json`
			V = new Blob([JSON.stringify(V)],{type:'application/json'});
		}
		else
		{
			file += `${K}.webp`
			V = await Base64ToBlob(V)
		}
		const headers = new Headers(//显式声明 Headers
		{	
			'Content-Type': V.type || 'application/octet-stream',//从blob获取类型，如果没有则给个默认值
			'Content-Length': V.size.toString()//明确写入Content-Length，解决大小为 0 的问题
		});
		await cache.put(file, new Response(V, {headers: headers}));
		return file;
	}
	if(C[1] === 'g' && K)
	{
		if(isCusImg(K))
		{
			file += `${K}.webp`
			if(C[0] === 'T')TempImg.add(K)
			return await BlobToBase64(await $ajax(file))
		}
		else
		{
			file += `${K}.json`
			return JSON.parse(await $ajax(file))
		}
	}
	if(C[1] === 'r' && K)
	{
		if(C === 'Tr')TempImg.delete(K)
		if(isCusImg(K))file += `${K}.webp`
		else file += `${K}.json`
		await cache.delete(file);
		return file;
	}
	return null;
}
async function 处理文件(DB,C,K,V)
{
	if(!本地)
	{
		if(K === 'chats' && C === 'Ss')localStorage['MMT'] = JSON.stringify(V)
		return await 处理缓存(DB,C,K,V);
	}
	if(C[1] === 's' && window.保存文件 && V)
	{
		if(C === 'Ts')TempImg.add(K)
		let file = `用户数据/${DB}/${K}`
		if(typeof V === 'object')await 保存文件(file+'.json',V)
		else await 保存文件(file+'.webp',await Base64ToBlob(V))
		return file;
	}
	else if(C[1] === 'g' && K)
	{
		let file = `用户数据/${DB}/${K}`
		if(isCusImg(K))
		{
			file += '.webp'
			return await BlobToBase64(await $ajax(file))
		}
		else
		{
			file += '.json'
			return JSON.parse(await $ajax(file))
		}
	}
	else if((C[1] === 'c' || C[1] === 'r') && window.删除文件)
	{
		if(C === 'Tc')TempImg.clear()
		if(C === 'Tr')TempImg.delete(K)
		let file = `用户数据/${DB}`
		if(K)
		{
			if(isCusImg(K))file += `/${K}.webp`
			else file += `/${K}.json`
		}
		await 删除文件(file)
		return file;
	}
	else return null;
}
async function 数据操作(C,K = null,V = null)
{
	let D,M;
	if(C[0] === 'I')D = MoeImage;
	else if(C[0] === 'T')D = MoeTemp;
	else if(C[0] === 'P')D = MoeProject;
	else if(C[0] === 'S')D = moetalkStorage;
	else if(C[0] === 'C')D = MoeCache;
	if(C[1] === 's')M = 'setItem';
	else if(C[1] === 'g')M = 'getItem';
	else if(C[1] === 'r')M = 'removeItem';
	else if(C[1] === 'c')M = 'clear';
	else if(C[1] === 'k')M = 'keys';
	if(C[1] === 's' && typeof V === 'string' && !isBase64(V))return V;
	if(C[1] === 'g')
	{
		V = await 并发处理(
			处理数据(D,M,C,K,V),
			处理文件(D._config.name,C,K,V)
		);
	}
	else
	{
		[V,K] = await Promise.all(
		[
			处理数据(D,M,C,K,V),
			处理文件(D._config.name,C,K,V)
		]);
	}
	return V
}