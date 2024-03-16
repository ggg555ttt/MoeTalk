var href = window.location.href.split(window.location.host)[1].split('?')[0]
var player = href+'player'
var version = '';
var 强制保存 = []
if(localStorage['mt-version'])version = localStorage['mt-version']
if(window.location.href.indexOf('file:///') === 0)
{
	alert('资源管理器下打开的MoeTalk无法生成图片和使用MomoTalk播放器\n请先运行目录下的【EasyWebSvr.exe】然后打开浏览器访问【localhost】或【127.0.0.1(有出错可能)】')
	href = window.location.href.replace('index.html','')
}
//解决低版本浏览器不支持replaceAll
(function()
{
	if(!String.prototype.hasOwnProperty("replaceAll"))
	{
		String.prototype.replaceAll  = function(s1,s2)
		{
			return this.split(s1).join(s2)
		};
	}
})();

/*预定义区*/
var mt_char = {}
var mt_head = {}
const moetalkStorage = localforage.createInstance({name:'moetalkStorage'});
if(mt_settings['存储模式'] !== 'localStorage')
{
	if(!localStorage['mt-char'] || localStorage['mt-char'][0] === '[')mt_char = {};
	else moetalkStorage.setItem('mt-char',localStorage['mt-char'])
	if(!localStorage['mt-head'])mt_head = {};
	else moetalkStorage.setItem('mt-head',localStorage['mt-head'])
	if(localStorage['chats'] && localStorage['chats'][0] === '[')moetalkStorage.setItem('chats',localStorage['chats'])

	delete localStorage['mt-char']
	delete localStorage['mt-head']
	delete localStorage['chats']
}
else
{
	if(!localStorage['mt-char'] || localStorage['mt-char'][0] === '[')localStorage['mt-char'] = '{}'
	if(!localStorage['mt-head'])localStorage['mt-head'] = '{}'
	mt_char = JSON.parse(localStorage['mt-char'])//自制角色名称
	mt_head = JSON.parse(localStorage['mt-head'])//自制角色头像
}


if(!sessionStorage['mt-char'])sessionStorage['mt-char'] = '{}';
if(!sessionStorage['mt-head'])sessionStorage['mt-head'] = '{}';
var mt_schar = JSON.parse(sessionStorage['mt-char'])//临时角色名称
var mt_shead = JSON.parse(sessionStorage['mt-head'])//临时义角色头像
if(mt_settings['存储模式'] === 'localStorage' && (!localStorage['chats'] || localStorage['chats'][0] !== '['))localStorage['chats'] = '[]';//聊天记录

if(!mt_settings['语言选项'])
{
	delete localStorage['lang']
	delete localStorage['first']
	delete localStorage['mt-edit']
	delete localStorage['mt-font']
	delete localStorage['replyNo']
	delete localStorage['replyGroup']

	mt_settings['语言选项'] = localStorage['mt-lang'] ? localStorage['mt-lang'] : 'zh_cn'
	mt_settings['图片比例'] = localStorage['mt-size'] ? localStorage['mt-size'] : '90%'
	mt_settings['差分比例'] = localStorage['mt-cfsize'] ? localStorage['mt-cfsize'] : '90%'
	mt_settings['排序方式'] = localStorage['mt-order'] ? localStorage['mt-order'] : 'name'
	mt_settings['人物改名'] = localStorage['mt-name'] ? JSON.parse(localStorage['mt-name']) : {}
	mt_settings['图片格式'] = localStorage['mt-image'] ? localStorage['mt-image'] : 'image/png'
	mt_settings['禁止字体'] = localStorage['mt-nofont'] ? localStorage['mt-nofont'] : false
	mt_settings['高度限制'] = localStorage['mt-maxheight'] ? localStorage['mt-maxheight'] : 16384
	mt_settings['头像尺寸'] = localStorage['hnum'] ? localStorage['hnum'] : 300
	mt_settings['发送方式'] = localStorage['send'] ? '点击' : '回车'
	mt_settings['差分映射'] = localStorage['CharFaceIndex'] ? JSON.parse(localStorage['CharFaceIndex']) : {}
	mt_settings['社团列表'] = localStorage['mt-club'] ? JSON.parse(localStorage['mt-club']) : {}
	
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

	if(localStorage['mt-selectedList'])
	{
		mt_settings['选择角色'] = {}
		mt_settings['选择角色'].no = JSON.parse(localStorage['mt-selectedList']).selected.no
		mt_settings['选择角色'].index = JSON.parse(localStorage['mt-selectedList']).selected.index
		mt_settings['选择角色'].list = JSON.parse(localStorage['mt-selectedList']).selectedList
	}
	if(!mt_settings['选择角色'])
	{
		mt_settings['选择角色'] = {}
		mt_settings['选择角色'].no = 0
		mt_settings['选择角色'].index = 1
		mt_settings['选择角色'].list = []
	}
	delete localStorage['mt-selectedList']
}
delete localStorage['vConsole_switch_y']
delete localStorage['vConsole_switch_x']
delete localStorage['MoeTalk']
delete localStorage['顶部标题']

!mt_settings['文字样式'] ? mt_settings['文字样式'] = {} : ''
!mt_settings['宽度限制'] ? mt_settings['宽度限制'] = 500 : ''
!mt_settings['顶部标题'] ? mt_settings['顶部标题'] = 'MoeTalk' : ''
!mt_settings['风格样式'] ? mt_settings['风格样式'] = [] : mt_settings['风格样式']
if(['YuzuTalk','MomoTalk'].indexOf(mt_settings['风格样式'][0]) < 0)
{
	mt_settings['风格样式'] = []
	mt_settings['风格样式'][0] = 'MomoTalk'
	mt_settings['风格样式'][1] = '#FFFFFF'
	mt_settings['风格样式'][2] = '#DCE5E8'
}
saveStorage('设置选项',mt_settings,'local')

var mtlang = mt_settings['语言选项'];
var langarr = ['zh_cn','zh_tw','jp','en','kr'];
var langid = langarr.indexOf(window.location.href.split('?')[1])
if(langid > -1)mtlang = langarr[langid]

var 选择角色 = true;//快捷角色开关

var imgindex;//人物自定义

var $$ = $;//jquery转义
var height;//聊天记录长度
var localSize = 0;//数据大小
$.each(localStorage,function(k,v){if(!isNaN(parseInt(v.length))){localSize += v.length/1024}})
localSize = localSize.toFixed(0)

var CFPI = 0;//差分页码


var class0 = 'common__IconButton-sc-1ojome3-0 Header__QuestionButton-sc-17b1not-3 mvcff kNOatn bold';
/*预定义区*/

//保存头像
function savehead(headindex,img64)
{
	mt_head[headindex] = img64;
	saveStorage('mt-head',mt_head,'local')
	let nameloss
	$.each(mt_head,function(k,v)
	{
		if(!mt_char[k])
		{
			mt_char[k] = 'NAMELOSS'
			nameloss = true
		}
	})
	if(nameloss === true)saveStorage('mt-char',mt_char,'local')
}
//读取头像
function loadhead(id,img)
{
	//MoeTalk头像
	if(mt_characters[id])
	{
		img = img.replace('Student_Portrait_','').replace('NPC_Portrait_','').replace('Lobbyillust_Icon_','').replace('_01','_L2D')
		return `${href}Images/Char/${mt_characters[id].school}/${mt_characters[id].club}/${id}/${img}.webp`;
	}
	//自定义头像
	if(mt_head[id])
	{
		return mt_head[id]
	}
	if(mt_shead[id])
	{
		return mt_shead[id]
	}
	if(closure_char[id])return `${href}Images/ClosureTalk/ba/characters/${img}.webp`;//closure头像
	if(mollu_char[id])return `${href}Images/MolluChar/${id}.${img}.webp`;//旧版头像
	if(id == 0)return `${href}Images/Ui/you.webp`;//主角
	return `${href}Images/Ui/error.webp`;//默认头像
}
function loadname(id)
{
	let you = {kr: "주인공",en: "Lead",jp: "主役",zh_cn: "主角",zh_tw: "主角"}
	let name = toString(id)
	if(mollu_char[id])name = mollu_char[id][mtlang]
	if(closure_char[id])name = closure_char[id][mtlang]
	if(mt_characters[id])
	{
		name = mt_characters[id].name[mtlang] ? mt_characters[id].name[mtlang] : id
	}
	if(mt_settings['人物改名'][id])name = mt_settings['人物改名'][id];//@改名
	if(name.split(" ")[1])name = name.split(" ")[1]
	name = name.replaceAll("-", " ")
	
	if(mt_schar[id])
	{
		name = mt_schar[id]
	}
	if(mt_char[id])
	{
		name = mt_char[id]
	}

	if(id == 0)name = you[mtlang]
	return name
}

//元素出现后执行代码
jQuery.fn.wait = function (func,cls,times,interval) {
	var _times = times || -1, //100次
		_interval = interval || 10, //20毫秒每次
		_self = this,
		_selector = this.selector, //选择器
		_iIntervalID; //定时器id
	if( $(cls).length ){ //如果已经获取到了，就直接执行函数
		func && func.call($(cls));
	} else {
		_iIntervalID = setInterval(function() {
			if(!_times) { //是0就退出
				clearInterval(_iIntervalID);
			}
			_times <= 0 || _times--; //如果是正数就 --
			_self = $(cls); //再次选择
			if( $(cls).length ) { //判断是否取到
				func && func.call($(cls));
				clearInterval(_iIntervalID);
			}
		}, _interval);
	}
	return this;
}

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
			if(mode === 'edit')
			{
				data = 
				{
					name : $('.name').val(),
					time : $('.time').val(),
					content: $('.content').val(),
					isFirst: $('.isFirst').prop('checked'),
					isRight : $('.isRight').prop('checked'),
					is_breaking : $('.is_breaking').prop('checked'),
					file: newBase64,
					sCharacter: {no: $('.editMessage .头像').attr('alt'),index: $('.editMessage .头像').attr('title')},
					type: type
				}
			}
			sendMessage(data,'image',mode)
		}
		else
		{
			$('#uphead').hide().next().hide()
			mt_char[imgindex] = $("#cusname").text()
			saveStorage('mt-char',mt_char,'local')
			savehead(imgindex,newBase64)
			list()//更新列表
		}
	}
}

//文件下载
function download_txt(filename,content,contentType)
{
	if (!contentType) contentType = 'application/octet-stream';
	var a = document.createElement('a');
	var blob = new Blob([content],{ 'type': contentType });
	a.href = window.URL.createObjectURL(blob);
	a.download = filename;
	a.click();
}

//警告
function warning()
{
	if(height > (maxHeight) || localSize > (5120*0.75))//检测聊天框宽度
	{
		$("#size").css('color','red');//显示警告
	}
	else
	{
		$("#size").css('color','green');//隐藏警告
	}
}

//图片隐写
function base64ToBlob(base64)
{
	let binary = atob(base64);
	let array = [];
	for (let i = 0; i < binary.length; i++) {
		array.push(binary.charCodeAt(i));
	}
	return new Blob([new Uint8Array(array)], { type: mt_settings['图片格式'] });
}
function blobToArrayBuffer(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = function(e) {
			resolve(e.target.result);
		}
		reader.readAsArrayBuffer(file);
	});
}
function blobToBase64(blob, callback) { 
  var reader = new FileReader(); 
  reader.onload = function() { 
    var dataUrl = reader.result; 
    var base64 = dataUrl.split(',')[1]; 
    callback(base64); 
  }; 
  reader.readAsDataURL(blob); 
} 
function combineFiles(mainFile, hideFile, fileName, Index) {
	const sep = '-sep-';
	const maxExtLength = 4;
	mainFile = base64ToBlob(mainFile);
	hideFile = new Blob([hideFile],{type: "application/json",});
	Promise.all([
		blobToArrayBuffer(mainFile),//图片
		blobToArrayBuffer(hideFile),//暗件
	]).then(([mainBuffer, hideBuffer]) => {
		const mainData = new Uint8Array(mainBuffer);//图片
		const hideData = new Uint8Array(hideBuffer);//暗件
		const mainFileExt = mt_settings['图片格式'].split('/')[1];//图片后缀
		const hideFileExt = 'json';//暗件后缀
		const dataView = new DataView(mainBuffer);
		const sepData = new TextEncoder().encode(sep + hideFileExt.padEnd(maxExtLength, ' '));
		const targetData = new Uint8Array(mainData.length + sepData.length + hideData.length);
		targetData.set(mainData, 0);
		targetData.set(sepData, mainData.length);
		targetData.set(hideData, mainData.length + sepData.length);
		const blob = new Blob([targetData], { type: mt_settings['图片格式'] });
		//downloadBlob(blob, fileName+'.'+mainFileExt);
		//blobToBase64(blob,function(e){$("[alt='download']").attr('src',`data:${localStorage['mt-image']};base64,${e}`)})//替换手动保存的图片
		blobToBase64(blob,function(e)
		{
			$(".PopupImageDownload__ImgWrapper-sc-uicakl-2").append(`<div class='imageSave'><h1>第<span class='red'>${Index}</span>/${imageArrL}张图片：</h1><img src='data:${mt_settings['图片格式']};base64,${e}'></div>`)
		})
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.download = fileName+'.'+mainFileExt;
		a.href = url;
		a.click();
	});
}

//点击函数
function click(name)
{
	$(name).click();
}
function selectClick(num)
{
	let select,index = $('.Footer__Flex-sc-1rjbi2j-1 img').index($('.Footer__Flex-sc-1rjbi2j-1 img.selected'));
	if(num === 37)
	{
		if(index === 0)select = $('.Footer__Flex-sc-1rjbi2j-1 img').length-1
		else select = index-1
	}
	else
	{
		if(index === $('.Footer__Flex-sc-1rjbi2j-1 img').length-1)select = 0
		else select = index+1
	}
	$('.Footer__Flex-sc-1rjbi2j-1 img').eq(select).click();
}
function club(clear = false)
{
	if(clear === false)
	{
		$('.club').each(function()
		{
			let club = $(this).attr('value');
			if($(this).prop('checked') === true && !mt_settings['社团列表'][club])
			{
				$(this).click();
			}
			if($(this).prop('checked') === false && mt_settings['社团列表'][club])
			{
				$(this).click();
			}
		})
	}
	else
	{
		$('.club').each(function()
		{
			if($(this).prop('checked') === true)
			{
				$(this).click();
			}
		})
	}
}
function list()
{
	club()
	$('.eIEKpg:eq(0)').click();//更新列表
	setTimeout(function(){selectClick(37)})
	setTimeout(function(){selectClick(39)})
}
function loaddata(json,mode,ARR = '')//识别存档
{
	let moeurl = 'https://moetalk-ggg555ttt-57a86c1abdf06b5ebe191f38161beddd1d0768c27e1a2.gitlab.io'
	let josnsize = (json.length/1024).toFixed(0)
	let custom_char = {};
	let custom_head = {};
	if(!ARR)json = JSON.parse(json)
	if(!json[0] || (json[0] && !json[0].title))//错误数据
	{
		json[0] = {};
		json[1] = [];
		json[0]['title'] = '错误存档'
		json[0]['nickname'] = '无法识别的数据'
		json[0]['date'] = '强制上传会清空当前正在编辑的数据'
	}

	if(json[0] && (json[0].mt_char || json[0].custom))//mt旧版自定义角色转义
	{
		if(json[0].custom && JSON.parse(json[0].custom)[0].club[0].characters)
		{
			json[0].mt_char = {}
			json[0].mt_head = {}
			let i;
			$.each(JSON.parse(json[0].custom)[0].club[0].characters,function(k,v)
			{
				json[0].mt_char[v.no] = v.zh_cn
			})
			$.each(JSON.parse(json[0].heads)[0],function(k,v)
			{
				if(k.split('.').length > 1)i = k.split('.')[0];
				if(k.split('/').length > 1)i = k.split('.')[0];
				json[0].mt_head[i] = v;
			})
		}
		if(typeof json[0].mt_char === 'object')
		{
			json[0].mt_char = JSON.stringify(json[0].mt_char)
			json[0].mt_head = JSON.stringify(json[0].mt_head)
		}
		custom_char = JSON.parse(json[0].mt_char);
		custom_head = JSON.parse(json[0].mt_head);
	}

	if(json['custom_chars'])//ct自定义角色
	{
		$.each(json['custom_chars'],function(k,v)
		{
			if(v['char_id'].split('-')[1] !== 'MT')
			{
				custom_char[v.char_id] = v.name
				custom_head[v.char_id] = v.img
			}
		})
	}

	if(json['chars'])//ct待选角色
	{
		json[0]['选择角色'] = {}
		json[0]['选择角色'].no = 0
		json[0]['选择角色'].index = 1
		json[0]['选择角色'].list = []
		
		$.each(json['chars'],function(k,v)
		{
			json[0]['选择角色'].list[k] = {}
			if(v['char_id'].split('-')[0] === 'ba')
			{
				json[0]['选择角色'].list[k].no = v['char_id'].split('-')[1]
				json[0]['选择角色'].list[k].index = v['img']
			}
			else if(v['char_id'].split('-')[1] === 'MT')
			{
				json[0]['选择角色'].list[k].no = v['char_id'].split('-')[2]
				json[0]['选择角色'].list[k].index = v['char_id'].split('-')[3]
			}
			else
			{
				json[0]['选择角色'].list[k].no = v['char_id']
				json[0]['选择角色'].list[k].index = v['char_id']
			}
		})
	}
	let length = 0;
	$.each(custom_char,function(k,v)
	{
		length = length+1
	})
	//console.log(custom_char)
	if(json['chat'])//ct存档
	{
		json[1] = [];
		json[0]['title'] = 'ClosureTalk存档'
		json[0]['nickname'] = '存档大小：'+josnsize+'KB'
		json[0]['date'] = `${length ? length : 0}名自定义角色`
		$.each(json['chat'],function(k,v)
		{
			json[1][k] = {};
			json[1][k]['replyDepth'] = 0

			json[1][k]['sCharacter'] = {};
			json[1][k]['sCharacter']['no'] = v['char_id'] ? v['char_id'].split('-')[1] : 0
			json[1][k]['sCharacter']['index'] = v['img'] ? v['img'].split('.').shift() : 1
			if(v['img'] === 'uploaded')
			{
				json[1][k]['sCharacter']['no'] = v['char_id']
				json[1][k]['sCharacter']['index'] = v['img']
				if(v['char_id'].split('-')[1] === 'MT')
				{
					json[1][k]['sCharacter']['no'] = v['char_id'].split('-')[2]
					json[1][k]['sCharacter']['index'] = v['char_id'].split('-')[3]
				}
			}

			json[1][k]['content'] = v['content'];

			if(v['yuzutalk']['type'] === 'TEXT')json[1][k]['type'] = 'chat'
			if(v['yuzutalk']['type'] === 'RELATIONSHIPSTORY')json[1][k]['type'] = 'heart'
			if(v['yuzutalk']['type'] === 'NARRATION')json[1][k]['type'] = 'info'
			if(v['yuzutalk']['type'] === 'CHOICES')
			{
				json[1][k]['type'] = 'reply'
			}
			if(v['yuzutalk']['type'] === 'IMAGE')
			{
				json[1][k]['type'] = 'image'
				if(v['content'].indexOf('data:image/') > -1)
				{
					json[1][k]['file'] = v['content'];
					json[1][k]['content'] = '';
				}
				else
				{
					json[1][k]['content'] = v['content'].replace('resources/ba','Images/ClosureTalk/ba').replace(moeurl+'/','');
				}
			}

			if(v.yuzutalk.nameOverride)json[1][k]['name'] = v.yuzutalk.nameOverride;
			if(v.yuzutalk.avatarState === 'SHOW')json[1][k]['isFirst'] = true;
			if(v.is_breaking === true)json[1][k]['is_breaking'] = true;
		})
	}
//
	let otherChats = []
	let chats = []
	json[1].map(function(v,k)
	{
		if(v.replyDepth != 0)otherChats.push(v)
		else chats.push(v)
	})

	let arr = {}
	json[1].map(function(v,k)
	{
		!arr[v.replyDepth] ? arr[v.replyDepth] = [] : ''
		arr[v.replyDepth].push(v)
	});
	$.each(arr,function(k,v)
	{
		if(k != 0)
		{
			let json = arr[0].filter(function(e)
			{
				return e.content.split('\n').filter(function(e)
				{
					return e == k
				}) == k
			})[0]
			let index = arr[0].indexOf(json)+1
			arr[0].splice(index,0,...arr[k]);
		}
	})
	json[1] = arr[0]
//
	if($('#customchar').prop('checked') === true)//读取自定义角色
	{
		mt_char = {...mt_char,...custom_char}
		mt_head = {...mt_head,...custom_head}
		saveStorage('mt-char',mt_char,'local')
		saveStorage('mt-head',mt_head,'local')
		list()//更新列表
	}
	else
	{
		mt_schar = {...mt_schar,...custom_char}
		mt_shead = {...mt_shead,...custom_head}
		saveStorage('mt-char',mt_schar,'session')
		saveStorage('mt-head',mt_shead,'session')
		list()//更新列表
	}
	if(json[0]['选择角色'] && mode !== 'play')
	{
		选择角色 = true
		mt_settings['选择角色'] = json[0]['选择角色']
	}
	
	return json
}
// 格式化日对象
const getNowDate = () => {
  var date = new Date();
  var sign2 = ":";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds() //秒
  var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
  var week = weekArr[date.getDay()];
  // 给一位数的数据前面加 “0”
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
    day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
    hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = "0" + seconds;
  }
  //return year + "-" + month + "-" + day + " " + hour + sign2 + minutes + sign2 + seconds;
  return `${year}${month}${day}${hour}${minutes}${seconds}`;
}
function MoeToClosure()//Moe转Closure
{
	let moeurl = 'https://moetalk-ggg555ttt-57a86c1abdf06b5ebe191f38161beddd1d0768c27e1a2.gitlab.io'
	let ct = [];
	let custom_chars = {};
	$.each(chats,function(k,v)
	{
		ct[k] = {};
		let id = v['sCharacter']['no'];
		let img = v['sCharacter']['index'];
		let data = 'MT-';
		if(closure_char[id])data = "ba-"
		if(!mt_char[id] && !mt_schar[id] && id != 0)//正常角色
		{
			ct[k]['char_id'] = data+id;
			ct[k]['img'] = img;
			if(data === "MT-")
			{
				img = img.replace('Student_Portrait_','').replace('NPC_Portrait_','').replace('Lobbyillust_Icon_','').replace('_01','_L2D')
				ct[k]['char_id'] = `custom-MT-${id}-${img}`
				ct[k]['img'] = 'uploaded';

				custom_chars[ct[k]['char_id']] = {}
				custom_chars[ct[k]['char_id']]['img'] = `${moeurl}/Images/Char/${mt_characters[id].school}/${mt_characters[id].club}/${id}/${img}.webp`
				custom_chars[ct[k]['char_id']]['name'] = loadname(id);
			}
		}
		if(mt_char[id] || mt_schar[id])//自定义角色
		{
			ct[k]['char_id'] = id;
			ct[k]['img'] = 'uploaded';
		}
		ct[k]['content'] = v['content'];//文本内容
		ct[k]['is_breaking'] = v['is_breaking'];
		ct[k]['yuzutalk'] = {};
		ct[k]['yuzutalk']['nameOverride'] = v['name'] ? v['name'] : '';//临时名字
		if(v['isFirst'] === true)//头像显示
		{
			ct[k]['yuzutalk']['avatarState'] = 'SHOW';
		}
		else
		{
			ct[k]['yuzutalk']['avatarState'] = 'AUTO';
		}
		
		if(v['type'] == 'chat')ct[k]['yuzutalk']['type'] = 'TEXT';//文字类型
		if(v['type'] == 'reply')ct[k]['yuzutalk']['type'] = 'CHOICES';//选择肢
		if(v['type'] == 'heart')ct[k]['yuzutalk']['type'] = 'RELATIONSHIPSTORY';//羁绊
		if(v['type'] == 'info')ct[k]['yuzutalk']['type'] = 'NARRATION';//旁白
		if(v['type'] == 'image')//图片类型
		{
			ct[k]['yuzutalk']['type'] = 'IMAGE';
			if(v['content'].indexOf('//') < 0)//本地链接
			{
				if(v['content'].indexOf('Images/ClosureTalk/') > -1)
				{
					ct[k]['content'] = v['content'].replace('Images/ClosureTalk','resources')
				}
				else
				{
					ct[k]['content'] = `${moeurl}/${v['content']}`;
				}
			}
			if(v['file'])ct[k]['content'] = v['file'];
		}
		
	})
	for(let i=0;i<ct.length;i++){if(ct[i]===undefined){ct.splice(i,1);i--;}}
	let closuretalk = {};
	closuretalk['chat'] = ct
	closuretalk['chars'] = [];
	closuretalk['custom_chars'] = [];
	
	$.each(mt_settings['选择角色'].list,function(k,v)
	{
		closuretalk['chars'][k] = {}
		let id = v.no;
		let img = v.index;
		let data = 'MT-';
		if(closure_char[id])data = "ba-"
		if(!mt_char[id] && !mt_schar[id] && id != 0)//正常角色
		{
			closuretalk['chars'][k]['char_id'] = data+id;
			closuretalk['chars'][k]['img'] = img;
			if(data === "MT-")
			{
				img = img.replace('Student_Portrait_','').replace('NPC_Portrait_','').replace('Lobbyillust_Icon_','').replace('_01','_L2D')
				closuretalk['chars'][k]['char_id'] = `custom-MT-${id}-${img}`
				closuretalk['chars'][k]['img'] = 'uploaded';

				custom_chars[closuretalk['chars'][k]['char_id']] = {}
				custom_chars[closuretalk['chars'][k]['char_id']]['img'] = `${moeurl}/Images/Char/${mt_characters[id].school}/${mt_characters[id].club}/${id}/${img}.webp`
				custom_chars[closuretalk['chars'][k]['char_id']]['name'] = loadname(id);
			}
		}
		if(mt_char[id] || mt_schar[id])//自定义角色
		{
			closuretalk['chars'][k]['char_id'] = id;
			closuretalk['chars'][k]['img'] = 'uploaded';
		}
	})
	$.each(mt_char,function(k,v)
	{
		custom_chars[k] = {}
		custom_chars[k]['img'] = mt_head[k];
		custom_chars[k]['name'] = v;
	})
	$.each(custom_chars,function(k,v)
	{
		closuretalk['custom_chars'].push({char_id:k,img:v.img,name:v.name})
	})
	let time = new Date().toLocaleString().replaceAll('/','-').replaceAll(' ','_').replaceAll(':','-');
	$$('#downImg').html('')
	download_txt('ClosureTalk转换存档'+time+'.json',JSON.stringify(closuretalk,null,4));//生成专用存档
}
function mt_title(moetalk,title,writer)
{
	$(".Talk__CContainer-sc-1uzn66i-1").outerWidth(mt_settings['宽度限制'])
	$('#mt_watermark').css('display','flex')
	if(moetalk && localStorage['watermark'] !== 'false')
	{
		if(!title)title = ''
		if(!writer)writer = ''
		$('#mt_title').text(title)
		$('#mt_writer').text(writer)
		$('.mt_watermark').text(mt_settings['顶部标题'])
		$('#mt_watermark').css('background-color',"rgb(139, 187, 233)")
	}
	else
	{
		$('#mt_title').text('')
		$('#mt_writer').text('')
		$('.mt_watermark').text('')
		if(localStorage['watermark'] === 'false')$('#mt_watermark').hide()
		$('#mt_watermark').css('background-color',MikuTalk || mt_settings['风格样式'][1])
	}
}

function mt_capture(清晰度,截屏,生成图片,时间,标题)//截屏功能
{
	let json = []
	let filename = ''
	let title = 标题 ? 标题 : mt_text.noTitle[mtlang]
	let imgArea = imageArr[0]
	if(imgArea.start !== 0)$('#mt_watermark').hide()

	if(localStorage['archive'] === 'false')json = ''
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

	$('.消息').show()
	$('.消息').slice(0,imgArea.start).hide()
	$('.消息').slice(imgArea.end,$('.消息').length).hide()
	if(MikuTalk && $(".Talk__CContainer-sc-1uzn66i-1").css('background-color') === 'rgba(0, 0, 0, 0)')
	{
		$(".Talk__CContainer-sc-1uzn66i-1").css('background-color',MikuTalk)
	}

	截屏()($(".Talk__CContainer-sc-1uzn66i-1")[0],
	{
		logging: !1,
		allowTaint: !0,
		useCORS: !0,
		scale: 清晰度
	}).then(function(img)
	{
		if(['rgb(255, 255, 255)','rgb(255, 247, 225)'].indexOf($(".Talk__CContainer-sc-1uzn66i-1").css('background-color')) < 0)
		{
			$(".Talk__CContainer-sc-1uzn66i-1").css('background-color','transparent')
		}
		let imgBaes64 = img.toDataURL(mt_settings['图片格式']);
		let height = img.height
		imageArr.shift()

		生成图片(imgArea.index), img.toBlob(function(img)
		{
			
			if(imageArr.length > 0)
			{
				filename = `MoeTalk_${title}_${imgArea.index}_${height}`
				mt_capture(清晰度,截屏,生成图片,时间,标题)
			}
			else
			{
				filename = `MoeTalk_${title}${imgArea.index === 1 ? '' : '_'+imgArea.index}_${height}`
				$('.dDBXxQ').hide()
			}

			imgBaes64 = imgBaes64.replace(`data:${mt_settings['图片格式']};base64,`,'')

			if(imageZip)
			{
				$(".PopupImageDownload__ImgWrapper-sc-uicakl-2").append(`<div class='imageSave'><h1>第<span class='red'>${imgArea.index}</span>/${imageArrL}张图片：</h1><img src='data:${mt_settings['图片格式']};base64,${imgBaes64}'></div>`)
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
			else combineFiles(imgBaes64,json,filename,imgArea.index);
		})
	})
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
	if(mt_settings['存储模式'] !== 'localStorage' && mode === 'local' && ['chats','mt-char','mt-head'].indexOf(key) > -1)
	{
		moetalkStorage.setItem(key,JSON.stringify(val))
		return;
	}
	let num = 0
	$.each(mode === 'local' ? localStorage : sessionStorage,function(k,v)
	{
		if(!isNaN(parseInt(v.length)) && k !== key)num += v.length
	})
	val = JSON.stringify(val)
	let maxsize = ((num+val.length)/1024).toFixed(0)

	if(maxsize < 5120)
	{
		if(mode === 'local')localStorage[key] = val
		if(mode === 'session')sessionStorage[key] = val
	}
	else
	{
		if(mode === 'local')
		{
			$('#容量警告').addClass('visible')
			$('#容量警告 p').text(`存储空间容量不足，请尝试删除一部分数据\n\n强制保存可能会导致MoeTalk出错，确定吗？`)
			强制保存 = [localStorage,key,val]
		}
		if(mode === 'session')
		{
			$('#容量警告').addClass('visible')
			$('#容量警告 p').text(`临时空间容量不足，重启浏览器可以清空\n\n强制保存可能会导致MoeTalk出错，确定吗？`)
			强制保存 = [sessionStorage,key,val]
		}
	}
}

localStorage['启动时间'] = getNowDate()
if(!localStorage['启动次数'])localStorage['启动次数'] = 0
if(typeof browser !== 'undefined')localStorage['启动设备'] = JSON.stringify(browser)
if(window.location.href.indexOf('Setting') < 0)
{
	localStorage['启动次数'] = parseInt(localStorage['启动次数'])+1
	localStorage['启动网址'] = window.location.href
}
// var 表情 = {};
// 表情.名称 = ''
// 表情.类型 = ''
// 表情.页码 = ''
// 表情.列表 = []
// function mt_emoji(S,mode,custom = false,goBack = false)
// {
// 	let no = mt_settings['选择角色'].no;
// 	let school = mt_characters[no].school
// 	let club = mt_characters[no].club
// 	let arr = mt_characters[no] && mt_characters[no][mode] ? mt_characters[no][mode].split(',') : []

// if(!sessionStorage[no] || isNaN(parseInt(sessionStorage[no])))sessionStorage[no] = 0

// 	let cfindex = parseInt(sessionStorage[no]);
// 	if(goBack === '-')cfindex = cfindex-1
// 	if(goBack === '+')cfindex = cfindex+1
// 	if(cfindex < 0 || cfindex >= arr.length)cfindex = 0
// 	sessionStorage[no] = cfindex

// 	let cfarr = []
	
// 	Array(parseInt(arr[cfindex].split('.').slice(-2)[0])).fill(0).map(function(v,k)
// 	{
// 		cfarr[k] = `Images/${mode}/${school}/${club}/${arr[cfindex].split('.').slice(0,-2)[0]}.${k+1}.webp`
// 	})
// 	表情.名称 = loadname(no)
// 	表情.类型 = mode
// 	表情.页码 = `${arr.length < 1 ? 0 : cfindex+1}/${arr.length}`
// 	表情.列表 = cfarr
// 	S(!0)
// 	console.log(表情)

// }