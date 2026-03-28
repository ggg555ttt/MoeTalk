/*@MoeScript/INIT.js@*/
var 错误日志 = []
function 记录错误(info){错误日志.push(info)}
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
        // 如果 reason 是字符串而不是 Error 对象，直接记录
        rawReason: typeof event.reason === 'object' ? JSON.stringify(event.reason) : event.reason,
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
function getDeviceAndBrowserInfo() {
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

  if (isWechat) {
    browserType = 'wechat';
    browserVersion = (ua.match(/micromessenger\/([\d.]+)/) || [])[1] || 'unknown';
  } else if (isEdge) {
    browserType = 'edge';
    browserVersion = (ua.match(/edg\/([\d.]+)/) || ua.match(/edge\/([\d.]+)/) || [])[1] || 'unknown';
  } else if (isFirefox) {
    browserType = 'firefox';
    browserVersion = (ua.match(/firefox\/([\d.]+)/) || [])[1] || 'unknown';
  } else if (isChrome) {
    browserType = 'chrome';
    browserVersion = (ua.match(/chrome\/([\d.]+)/) || [])[1] || 'unknown';
  } else if (isSafari) {
    browserType = 'safari';
    browserVersion = (ua.match(/version\/([\d.]+)/) || [])[1] || 'unknown';
  }

  // ================= 3. 返回结果 =================
  return {
    device: {
      isApple,     // 是否为苹果公司设备 (Mac, iPhone, iPad等)
      isAndroid,   // 是否为安卓设备
      isWindows,   // 是否为 Windows 设备
      isMobile,    // 是否为移动端
      isPc,        // 是否为 PC 端
      type: deviceType // 'mac' | 'iphone' | 'ipad' | 'android' | 'windows' | 'unknown'
    },
    browser: {
      isWechat,    // 是否为微信浏览器
      isChrome,
      isSafari,
      isFirefox,
      isEdge,
      type: browserType,       // 'chrome' | 'safari' | 'firefox' | 'edge' | 'wechat' | 'unknown'
      version: browserVersion  // 浏览器版本号，例如 '114.0.0.0'
    }
  };
}
var 设备信息 = getDeviceAndBrowserInfo()
var player = (本地 ? '/' : href)+'Moedata'//播放器地址
var directory = []//目录
var MMT目录 = false//目录

var $$ = $;//jquery转义
var winHeight = window.innerHeight
var 元素尺寸;
function setting()
{
	if(!mt_settings['图片比例'])mt_settings['图片比例'] = '90%'
	if(!mt_settings['差分比例'])mt_settings['差分比例'] = '90%'
	if(!mt_settings['排序方式'])mt_settings['排序方式'] = 'name'
	if(!mt_settings['顶部标题'])mt_settings['顶部标题'] = 'MoeTalk'
	if(!mt_settings['高度限制'])mt_settings['高度限制'] = 16384
	if(!mt_settings['宽度限制'])mt_settings['宽度限制'] = 500
	if(!mt_settings['人物改名'])mt_settings['人物改名'] = {}
	if(!mt_settings['社团列表'])mt_settings['社团列表'] = {}
	if(!mt_settings['截图选项'])mt_settings['截图选项'] = {}
	if(!mt_settings['右侧发言'])mt_settings['右侧发言'] = {}
	if(!mt_settings['选择角色'])
	{
		mt_settings['选择角色'] = {}
		mt_settings['选择角色'].no = 0
		mt_settings['选择角色'].index = 1
		mt_settings['选择角色'].list = []
	}
	if(!mt_settings.风格样式 || mt_settings.风格样式[0])
	{
		mt_settings.风格样式 = {}
		mt_settings.风格样式.bgColor = 'transparent'
		mt_settings.风格样式.info = [['background-color','rgb(220, 229, 232)']]
	}
	if(!mt_settings['语言选项'])
	{
		let lang = window.navigator.language.toLowerCase()
		if(lang.includes('en'))mt_settings['语言选项'] = 'en'
		else if(['ja','ja-jp'].includes(lang))mt_settings['语言选项'] = 'jp'
		else if(['ko','ko-kr'].includes(lang))mt_settings['语言选项'] = 'kr'
		else if(['zh-tw','zh-hk'].includes(lang))mt_settings['语言选项'] = 'zh_tw'
		else mt_settings['语言选项'] = 'zh_cn'
	}
	if(!['zh_cn','zh_tw','en','jp','kr'].includes(mt_settings['语言选项']))mt_settings['语言选项'] = 'zh_cn'
	if(设备信息.browser.isFirefox)mt_settings['禁止字体'] = true
	mt_settings['当前网址'] = window.location.href
	mt_settings['设备信息'] = window.navigator.userAgent
}
setting()
var mtlang = mt_settings['语言选项']
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
		数据操作('Ss',key,val).catch(function(error)
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
//警告
function INIT_state(num)
{
	if($('.nowChapter').length)return
	if(!num)num = 1.1
	let height = parseInt($(".Talk__CContainer-sc-1uzn66i-1").outerHeight()*num)
	if(chats.length > 300)//if(height > mt_settings['高度限制'])//检测聊天框宽度
	{
		$("#size").text(`长度: ${height}\n数据: ${chats.length}`).css('background-color','red');//显示警告
	}
	else
	{
		$("#size").text(`长度: ${height}\n数据: ${chats.length}`).css('background-color','');//隐藏警告
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
		if(!arr.includes(ext))//base64转blob
		{
			data = atob(data.split(',').pop())
			let l = data.length;
			let bytes = new Uint8Array(l);
			for(let i=0;i<l;i++)bytes[i] = data.charCodeAt(i);
			data = 'application/octet-stream'
			return new Blob([bytes],{type: data});
		}
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
					reader.onload = function(e)
					{
						data = e.target.result
						if(!data)resolve(null);
						if(!arr.includes(ext))//base64转blob
						{
							data = atob(data.split(',').pop())
							let l = data.length;
							let bytes = new Uint8Array(l);
							for(let i=0;i<l;i++)bytes[i] = data.charCodeAt(i);
							data = 'application/octet-stream'
							resolve(new Blob([bytes],{type: data}))
						}
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
		let urls = await getfile('https://api.akams.cn/github#.json')
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
class Base64Utils {
  static toBlob(base64, mimeType = '') {
    const parts = base64.split(';base64,');
    if (parts.length === 2) {
      mimeType = parts[0].split(':')[1] || mimeType;
      base64 = parts[1];
    }

    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  static toDataURL(blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
}
async function cacheFile(C,blob)
{
	if(C[2] == '清')return await caches.delete(C[0]);
	const cache = await caches.open(C[0]);
	if(C[2] == '删')return await cache.delete(C[1]);
	if(C[2] == '写')
	{
		blob = Base64Utils.toBlob(blob)
		const headers = new Headers(//显式声明 Headers
		{	
			'Content-Type': blob.type || 'application/octet-stream',//从blob获取类型，如果没有则给个默认值
			'Content-Length': blob.size.toString()//明确写入Content-Length，解决长度为 0 的问题
		});
		const response = new Response(blob, {headers: headers});
		await cache.put(C[1], response);
	}
}
function 数据操作(C,K = null,V = null)
{
	let D,M
	if(C[0] === 'I')D = MoeImage
	else if(C[0] === 'T')D = MoeTemp
	else if(C[0] === 'P')D = MoeProject
	else if(C[0] === 'S')D = moetalkStorage
	else if(C[0] === 'C')D = MoeCache
	if(C[1] === 's')M = 'setItem'
	else if(C[1] === 'g')M = 'getItem'
	else if(C[1] === 'r')M = 'removeItem'
	else if(C[1] === 'c')M = 'clear'
	else if(C[1] === 'k')M = 'keys'
	
	return new Promise(function(resolve)
	{
		D[M](K,V).then((e)=>
		{
			// if(C[1] === 's' || C[1] === 'r')C += '删'
			// if(C[1] === 'c')C += '清';
			// if(C[2] && typeof e === 'string')
			// {
			// 	C = C.split('')
			// 	C[0] = D._config.name
			// 	C[1] = new URL(K, window.location.href).href;
			// 	cacheFile(C,e)
			// }
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