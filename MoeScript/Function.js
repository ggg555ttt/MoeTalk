var href = window.location.href.split(window.location.host)[1].split('?')[0]//文件目录地址
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
var mt_char = {}//自定义角色数据
var mt_head = {}//自定义头像数据
var mt_chars = false//自定义角色列表
var mt_schars = false//临时角色列表
var mt_clubs = []//自定义社团列表
var char_info = {}//角色信息
var saveClub = true;//社团保存开关
var 选择角色 = true;//快捷角色开关
var $$ = $;//jquery转义
var height;//聊天记录长度
var send = true;if(document.location.protocol === 'https:')send = false;//服务同步开关
var 表情,表情类型,表情页码,自设差分,差分书签 = sessionStorage['差分书签'] ? JSON.parse(sessionStorage['差分书签']) : {};//表情功能
var player = href+'player'//播放器地址
var version = '';if(localStorage['mt-version'])version = localStorage['mt-version']//MoeTalk版本号
const moetalkStorage = localforage.createInstance({name:'moetalkStorage'});//数据库

if(!sessionStorage['mt-char'])sessionStorage['mt-char'] = '{}';
if(!sessionStorage['mt-head'])sessionStorage['mt-head'] = '{}';
var mt_schar = JSON.parse(sessionStorage['mt-char'])//临时角色数据
var mt_shead = JSON.parse(sessionStorage['mt-head'])//临时头像数据

if(localStorage['0'] || !localStorage['设置选项'] || localStorage['设置选项'] === '{}')
{
	let lang = window.navigator.language.toLowerCase()
	if(['zh-cn','zh-sg'].indexOf(lang) > -1)lang = 'zh_cn'
	if(['zh-tw','zh-hk'].indexOf(lang) > -1)lang = 'zh_tw'
	if(lang.indexOf('en') > -1)lang = 'en'
	if(['ja','ja-jp'].indexOf(lang) > -1)lang = 'zh_cn'
	if(['ko','ko-kr'].indexOf(lang) > -1)lang = 'zh_tw'
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
	if(!mt_settings['选择角色'])
	{
		mt_settings['选择角色'] = {}
		mt_settings['选择角色'].no = 0
		mt_settings['选择角色'].index = 1
		mt_settings['选择角色'].list = []
	}
	if(!mt_settings['风格样式'])
	{
		mt_settings['风格样式'] = []
		mt_settings['风格样式'][0] = 'MomoTalk'
		mt_settings['风格样式'][1] = '#FFFFFF'
		mt_settings['风格样式'][2] = '#DCE5E8'
	}

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
	delete localStorage['Hm_lvt_3f7abc5752af46ddac2e985bb10dbb30']
	delete localStorage['sc_medium_source']
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
	//if(!mt_settings['后台保存'])delete mt_settings['后台保存']
	if(!mt_settings['存储模式'] || mt_settings['存储模式'] === 'indexedDB')delete mt_settings['存储模式']

}
if(window.location.href === 'http://moetalk.gitee.io/' || browser.isFirefox)mt_settings['禁止字体'] = true
saveStorage('设置选项',mt_settings,'local')

var mtlang = mt_settings['语言选项'];
var langarr = ['zh_cn','zh_tw','jp','en','kr'];
var langid = langarr.indexOf(window.location.href.split('?')[1])
if(langid > -1)mtlang = langarr[langid]

var localSize = 0;//数据大小
$.each(localStorage,function(k,v){if(!isNaN(parseInt(v.length))){localSize += v.length/1024}})
localSize = localSize.toFixed(0)
var class0 = 'common__IconButton-sc-1ojome3-0 Header__QuestionButton-sc-17b1not-3 mvcff kNOatn bold';
/*预定义区*/



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
	if(mt_head[img])
	{
		return mt_head[img]
	}
	if(mt_shead[img])
	{
		return mt_shead[img]
	}
	if(closure_char[id])return `${href}Images/ClosureTalk/ba/characters/${img}.webp`;//closure头像
	if(mollu_char[id])return `${href}Images/MolluChar/${id}.${img}.webp`;//旧版头像
	if(id == 0)return `${href}Images/Ui/you.webp`;//主角
	if(id === 'YuukaTalk')
	{
		if(img && img.indexOf('file:///android_asset') > -1)
		{
			return img.replace('file:///android_asset','https://mirror.ghproxy.com/https://github.com/Eynnzerr/YuukaTalk/blob/dd45c56e35d64b8d9375de81985541f4f238e170/app/src/main/assets')
		}
		else
		{
			if(img && img.indexOf('moetalk') > -1)return img.replace('https://moetalk-ggg555ttt-57a86c1abdf06b5ebe191f38161beddd1d0768c27e1a2.gitlab.io',href)
			return `${href}Images/Ui/you.webp`;
		}
	}
	return `${href}Images/Ui/error.webp`;//默认头像
}
function loadname(id,index)
{
	let you = {kr: "주인공",en: "Lead",jp: "主役",zh_cn: "主角",zh_tw: "主角"}
	let name = toString(id)
	if(mollu_char[id])name = mollu_char[id][mtlang]
	if(closure_char[id])name = closure_char[id][mtlang]
	if(mt_characters[id])
	{
		name = mt_characters[id].name[mtlang] ? mt_characters[id].name[mtlang] : id
	}
	if(name.split(" ")[1])name = name.split(" ")[1]
	name = name.replaceAll("-", " ")

	if(mt_settings['人物改名'][id])name = mt_settings['人物改名'][id];//@改名
	if(mt_settings['人物改名'][index])name = mt_settings['人物改名'][index];//@改名

	if(mt_schar[id])
	{
		name = mt_schar[id].name
		if(mt_schar[id].names && mt_schar[id].names[index])name = mt_schar[id].names[index]
	}
	if(mt_char[id])
	{
		name = mt_char[id].name
		if(mt_char[id].names && mt_char[id].names[index])name = mt_char[id].names[index]
	}

	if(id == 0)name = you[mtlang]
	return name
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
			if(mode === 'edit')
			{
				$('.图片文件').show().attr('src',newBase64)
				$('.图片信息').show().text(`图片体积：${parseInt((newBase64.length/1024).toFixed(0))}KB`).attr('title','图片')
			}
			else
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
				sendMessage(data,'image',mode)
			}
			
		}
		else
		{
			$('.dDBXxQ').hide()
			if(type === 'edit')
			{
				$(".heads .selected").attr('src',newBase64)
			}
			else
			{
				let attr = 'width="252" height="252" decoding="async" data-nimg="1" loading="lazy" style="color: transparent; margin-right: 0.5rem;" class="common__Profile-sc-1ojome3-6 common__ProfileClick-sc-1ojome3-7 eLaCqa fuyFOl"'
				let index = $('.heads img:eq(-1)').attr('title')
				if(index)
				{
					index = parseInt(index.replace(char_info.no,'').replace('_',''))
					if(isNaN(index))index = `${char_info.no}_0`
					else index = `${char_info.no}_${index+1}`
				}
				else
				{
					index = char_info.no
				}
				$('.heads').append(`<img src="${newBase64}" title="${index}" ${attr}>`)
				$('#custom-char .confirm').removeAttr('disabled')

			}
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
	if(height > (mt_settings['高度限制']) || localSize > (5120*0.75))//检测聊天框宽度
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
			$('.截图数量').text(imageArr.length)
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
function saveclub()
{
	mt_settings['社团列表'] = {};
	$$(".club:checked").each(function()
	{
		mt_settings['社团列表'][$$(this).attr('value')] = 'YES'
	})
	saveStorage('设置选项',mt_settings,'local')
}
function list()
{
	saveClub = false;
	custom_chars()
	$('.eIEKpg:eq(0)').click();//更新列表
	setTimeout(function(){selectClick(37)})
	setTimeout(function(){selectClick(39)})
	saveClub = true;
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
		json[0]['date'] = '强制上传可能会损坏您的存档'
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
				custom_char[v.char_id] = {}
				custom_char[v.char_id].name = v.name
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
				json[1][k]['sCharacter']['index'] = v['char_id']
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
	if(json['talkHistory'])
	{
		json[1] = [];
		json[0]['title'] = json['name']
		json[0]['nickname'] = 'YuukaTalk存档'
		json[0]['date'] = '无法显示自定义角色头像和外部上传图片'
		json['talkHistory'].map(function(v,k)
		{
			json[1][k] = {};
			json[1][k].content = ''
			json[1][k].replyDepth = 0
			json[1][k].sCharacter = {}
			json[1][k].sCharacter.no = 0
			json[1][k].sCharacter.index = 1
			v.type = v.type.split('.').slice(-1)[0]
			if(v.talker)
			{
				if(v.talker.nameRoma !== 'sensei')
				{
					json[1][k].name = v.talker.name
					json[1][k].sCharacter.no = 'YuukaTalk'
					json[1][k].sCharacter.index = v.talker.currentAvatar
				}
			}
			if(v.type === 'PureText')
			{
				json[1][k].isFirst = v.isFirst
				json[1][k].content = v.text
				json[1][k].type = 'chat'
			}
			if(v.type === 'Branch')
			{
				json[1][k].content = v.textOptions.join('\n')
				json[1][k].type = 'reply'
			}
			if(v.type === 'LoveScene')
			{
				json[1][k].name = v.studentName
				json[1][k].type = 'heart'
			}
			if(v.type === 'Narration')
			{
				json[1][k].content = v.text
				json[1][k].type = 'info'
			}
			if(v.type === 'Photo')
			{
				if(v.uri.indexOf('file:///android_asset') > -1)
				{
					json[1][k].content = v.uri.replace('file:///android_asset','https://mirror.ghproxy.com/https://github.com/Eynnzerr/YuukaTalk/blob/dd45c56e35d64b8d9375de81985541f4f238e170/app/src/main/assets')
				}
				else
				{
					json[1][k].content = `Images/Ui/error.webp`;
				}
				json[1][k].type = 'image'
			}
			json[1][k].isFirst = false
		})
	}
//
	let otherChats = []
	let chats = []
	let arr = {}
	let key = '';
	json[1].map(function(v,k)
	{
		if(v.replyDepth !== 0)otherChats.push(v)
		else chats.push(v)

		key = v.replyDepth
		if(v.replyDepth === 0)key = ''

		if(!arr[key])arr[key] = []
		arr[key].push(v)
	})

	$.each(arr,function(k,v)
	{
		if(k !== '')
		{
			let json = arr[''].filter(function(e)
			{
				return e.content.split('\n').filter(function(e)
				{
					return e === k
				}) === k
			})[0]
			let index = arr[''].indexOf(json)+1
			arr[''].splice(index,0,...arr[k]);
		}
	})

	json[1] = arr['']
//
	if($('#customchar').prop('checked') === true)//读取自定义角色
	{
		mt_char = {...mt_char,...custom_char}
		mt_head = {...mt_head,...custom_head}
		list()//更新列表
		saveStorage('mt-char',mt_char,'local')
		saveStorage('mt-head',mt_head,'local')
	}
	else
	{
		mt_schar = {...mt_schar,...custom_char}
		mt_shead = {...mt_shead,...custom_head}
		list()//更新列表
		saveStorage('mt-char',mt_schar,'session')
		saveStorage('mt-head',mt_shead,'session')
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
		if(v.head)
		{
			let length = v.head.length
			for(let i = 0;i < length;i++)
			{
				custom_chars[v.head[i]] = {}
				custom_chars[v.head[i]]['img'] = mt_head[v.head[i]];
				custom_chars[v.head[i]]['name'] = v.name;
			}
		}
		else
		{
			custom_chars[k] = {}
			custom_chars[k]['img'] = mt_head[k];
			custom_chars[k]['name'] = v.name;
		}
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
//截屏功能
function mt_capture(清晰度,截屏,生成图片,时间,标题)
{
	$('.dDBXxQ').show()//开始加载
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
	let 消息 = $('.消息');
	if($$(".dels:checked").length)消息 = $$(`.消息 :checked`).parent()//区域截图
	消息.show()
	消息.slice(0,imgArea.start).hide()
	消息.slice(imgArea.end,消息.length).hide()
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

		if(imageArr.length === imageArrL)生成图片(imgArea.index)
		imageArr.shift()
		img.toBlob(function(img)
		{
			
			if(imageArr.length > 0)
			{
				filename = `MoeTalk_${title}_${imgArea.index}_${height}`
				//mt_capture(清晰度,截屏,生成图片,时间,标题)
				$('.mt_capture').click()
			}
			else
			{
				filename = `MoeTalk_${title}${imgArea.index === 1 ? '' : '_'+imgArea.index}_${height}`
				$('.dDBXxQ').hide()//结束加载
			}

			imgBaes64 = imgBaes64.replace(`data:${mt_settings['图片格式']};base64,`,'')

			if(imageZip)
			{
				$(".PopupImageDownload__ImgWrapper-sc-uicakl-2").append(`<div class='imageSave'><h1>第<span class='red'>${imgArea.index}</span>/${imageArrL}张图片：</h1><img src='data:${mt_settings['图片格式']};base64,${imgBaes64}'></div>`)
				$('.截图数量').text(imageArr.length)
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
	else return val.toString().trim()
}
function isTrue(val)
{
	if(!val)return false
	else return true
}
function saveStorage(key,val,mode)
{
	if(!mt_settings['存储模式'] && mode === 'local' && ['chats','mt-char','mt-head'].indexOf(key) > -1)
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
	let num = 0
	$.each(mode === 'local' ? localStorage : sessionStorage,function(k,v)
	{
		if(!isNaN(parseInt(v.length)) && k !== key)num += v.length
	})
	val = JSON.stringify(val)
	let maxsize = ((num+val.length)/1024).toFixed(0)

	if(maxsize < 5120)//在容量限制内保存数据
	{
		if(mode === 'local')localStorage[key] = val
		if(mode === 'session')sessionStorage[key] = val
	}
}

localStorage['启动时间'] = getNowDate()
localStorage['启动设备'] = window.navigator.userAgent
if(!localStorage['启动次数'])localStorage['启动次数'] = 0
if(window.location.href.indexOf('Setting') < 0)
{
	localStorage['启动次数'] = parseInt(localStorage['启动次数'])+1
	localStorage['启动网址'] = window.location.href
}

function mt_emojis(S,mode)
{
	表情 = []
	表情类型 = ''
	自设差分 = []
	let id = mt_settings['选择角色'].no;
	let name = loadname(id);
	let maxNum = 0
	if(mode === 'CharFace')
	{
		if(差分映射 !== false)id = 差分映射.id
		if(!差分书签[id])//添加书签
		{
			差分书签[id] = {}
			差分书签[id].type = 'charface'
			差分书签[id].charface = 0
			差分书签[id].customface = 0
		}
		if(S === '+')//下一页
		{
			差分书签[id][差分书签[id].type]++
			return;
		}
		if(S === '-')//上一页
		{
			差分书签[id][差分书签[id].type]--
			return;
		}
		if(S === 'charface' || S === 'customface')//切换类型
		{
			差分书签[id].type = S
			return;
		}
		if(!S)return;
		if(!mt_characters[id])//人物不存在
		{
			表情类型 = `${name}(0暂无)`
			表情页码 = '0 / 0'
			S(!0)
			setTimeout(function()
			{
				if($$(`.差分映射.selected`).length)$$(`.差分映射.selected`)[0].scrollIntoView({inline:'center',behavior:"smooth"})
			}, 100)
			return;
		}
		
		let cfarr = mt_characters[id][差分书签[id].type].split(',')
		let pageIdnex = parseInt(差分书签[id][差分书签[id].type]);
		if(pageIdnex === -1)pageIdnex = 差分书签[id][差分书签[id].type] = cfarr.length-1
		if(isNaN(pageIdnex) || !cfarr[pageIdnex])pageIdnex = 差分书签[id][差分书签[id].type] = 0
		if(cfarr[pageIdnex])
		{
			cfarr[pageIdnex] = cfarr[pageIdnex].split('.')
			if(cfarr[pageIdnex].length > 2)cfarr[pageIdnex].pop()//
			maxNum = parseInt(cfarr[pageIdnex].pop())//获取总数
			cfarr[pageIdnex] = cfarr[pageIdnex][0]//获取文件名
			Array(maxNum).fill(cfarr[pageIdnex]).map(function(v,k)
			{
				if(差分书签[id].type === 'charface')
				{
					表情.push(`Images/CharFace/${mt_characters[id].school}/${mt_characters[id].club}/${v}.${k+1}.webp`)
				}
				else
				{
					表情.push(`Images/CustomFace/${v}.${k+1}.webp`)
				}
				
			})

			表情页码 = `${pageIdnex+1} / ${cfarr.length}`
			cfarr[pageIdnex] = cfarr[pageIdnex].split('/')
			表情类型 = cfarr[pageIdnex].pop()//获取差分类型

			if(表情类型 === id)
			{
				表情类型 = `${name}(${maxNum}其他)`
			}
			else if(表情类型.indexOf('_修复') > -1)
			{
				表情类型 = `${name}(${maxNum}修复)`
			}
			else if(CustomFaceAuthor[cfarr[pageIdnex][0]])
			{
				表情类型 = `${name}(${maxNum}自制)`
			}
			else
			{
				表情类型 = `${name}(${maxNum})`
			}

			自设差分[0] = mt_characters[id]['customface'] ? !0 : !1
			自设差分[1] = 差分书签[id].type === 'customface' ? !0 : !1
			自设差分[2] = CustomFaceAuthor[cfarr[pageIdnex][0]]
			S(!0)
			saveStorage('差分书签',差分书签,'session')
			setTimeout(function()
			{
				if($$(`.差分映射.selected`).length)$$(`.差分映射.selected`)[0].scrollIntoView({inline:'center',behavior:"smooth"})
			}, 100)
			return;
		}
		表情类型 = `${name}(0暂无)`
		表情页码 = '0 / 0'
		S(!0)
		return;
	}
	else
	{
		if(S === '+')
		{
			localStorage['pageIdnex']++
			return;
		}
		if(S === '-')
		{
			localStorage['pageIdnex']--
			return;
		}
		let pageIdnex = parseInt(localStorage['pageIdnex']);
		if(pageIdnex > 3 || isNaN(pageIdnex))pageIdnex = localStorage['pageIdnex'] = 0
		if(pageIdnex < 0)pageIdnex = localStorage['pageIdnex'] = 3;
		if(pageIdnex == 0)maxNum = 40;
		if(pageIdnex == 1)maxNum = 40;
		if(pageIdnex == 2)maxNum = 64;
		if(pageIdnex == 3)maxNum = 27;
		let str = mtlang === 'zh_cn' ? 'zh_tw' : mtlang
		if(pageIdnex === 3)str = ''
		Array(maxNum).fill(str).map(function(v,k)
		{
			表情.push(`Images/Emoji/${pageIdnex+1}${v}${k+1}.webp`)
		})
		表情类型 = `图片表情(${maxNum})`
		表情页码 = `${pageIdnex+1} / 4`
		S(!0)
	}
}
function srceenMode()
{
	if(元素尺寸)document.documentElement.style.fontSize = 元素尺寸
	$('#mt_watermark').hide()
	$('.消息').show()
	$(".dels").show()
	$(".Talk__CContainer-sc-1uzn66i-1").outerWidth('inherit')
	$('.消息[alt="screen"]').each(function(k,v)
	{
		k = $('.消息').index($(this))
		if(!isfirst(k,chats))
		{
			$('.消息')[k].outerHTML = makeMessage(chats[k].type,chats[k],k)
		}
	})
	if($(".dels:checked").length)
	{
		$('.dels:checked').parent().css("background-color","rgb(202,215,221)")
		$(".dels:checked:eq(0)").parent().css('border-top','2px dashed #a2a2a2')
	}
}
function custom_chars()
{
	mt_chars = []
	mt_schars = []
	let club = {}
	let char = {}
	let schar = {}
	for (let key in mt_char)
	{
		if(!mt_char[key].name)
		{
			char[key] = {}
			char[key].name = mt_char[key];
		}
		else
		{
			char[key] = mt_char[key]
		}
		if(!char[key].club)char[key].club = '自定义角色'
		mt_chars.push({
			no: key,
			name: localization(char[key].name),
			club: localization('#'+char[key].club),
			school: char[key].school ? localization(char[key].school) : localization('自定义'),
			profile: char[key].head ? char[key].head : [key],
			illust: 0,//#改为默认
			open: !0,//#改为默认
			momotalk: !0//#改为默认
		})
		if(char[key].club && char[key].club !== '#自定义角色')club['#'+char[key].club] = char[key].club
		mt_char[key] = char[key]
	}
	mt_clubs = Object.keys(club)
	if(mt_settings['社团列表']['临时角色'])
	{
		for (let key in mt_schar)
		{
			if(!mt_schar[key].name)
			{
				schar[key] = {}
				schar[key].name = mt_schar[key];
			}
			else
			{
				schar[key] = mt_schar[key]
			}
			if(!mt_char[key])
			{
				mt_schars.push({
					no: key,
					name: localization(schar[key].name),
					club: localization('临时角色'),
					school: schar[key].school ? localization(schar[key].school) : localization('自定义角色'),
					profile: schar[key].head ? schar[key].head : [key],
					illust: 0,//#改为默认
					open: !0,//#改为默认
					momotalk: !0//#改为默认
				})
			}
			mt_schar[key] = schar[key]
		}
	}
}
function custom_char(info)
{
	club(true)
	char_info = {...info,names: {}}
	let names = mt_settings.人物改名;
	$('#custom-char .typeTitle').text('修改角色')
	$('#custom-char .confirm').removeAttr('disabled')
	$('#custom-char h1').text(`${mt_text.school[mtlang]}：${char_info.make ? '自定义' : char_info.school[mtlang]}\nID：${char_info.no}`)
	$('.charname').val(toString(names[char_info.no])).attr('placeholder',`${char_info.make ? '' : char_info.name[mtlang]}`)
	$('.clubname').val(`${char_info.make ? '自定义角色' : char_info.club[mtlang].replace('#','')}`).removeAttr('disabled')
	if(mt_char[char_info.no])
	{
		if(!mt_char[char_info.no].club)$('.clubname').val('自定义角色')
		names = mt_char[char_info.no].names ? mt_char[char_info.no].names : {}
	}
	else
	{
		if(!char_info.make)$('.clubname').attr('disabled','disabled')
		else
		{
			$('#custom-char .typeTitle').text('创建角色')
			$('#custom-char .confirm').attr('disabled','disabled')
		}
	}
	if(char_info.club && char_info.club.id === '临时角色')
	{
		names = mt_schar[char_info.no].names ? mt_schar[char_info.no].names : {}
		$('#custom-char .typeTitle').text('临时角色（无法修改）')
		$('#custom-char .confirm').attr('disabled','disabled')
	}
	if(char_info.school && char_info.school[mtlang] !== '自定义')$('.edithead').hide()
	else $('.edithead').show()

	let length = char_info.make ? 0 : char_info.profile.length
	let attr = 'width="252" height="252" decoding="async" data-nimg="1" loading="lazy" style="color: transparent; margin-right: 0.5rem;" class="common__Profile-sc-1ojome3-6 common__ProfileClick-sc-1ojome3-7 eLaCqa fuyFOl"'
	$('.heads img').remove()
	for(let i = 0; i < length; i++)
	{
		if(names[char_info.profile[i]])char_info.names[char_info.profile[i]] = names[char_info.profile[i]]
		$('.heads').append(`<img src="${loadhead(char_info.no,char_info.profile[i])}" title="${char_info.profile[i]}" ${attr}>`)
	}

	if(char_info.selected || char_info.selected === 0)
	{
		let name = char_info.names[char_info.profile[char_info.selected]]
		$(`.heads img:eq(${char_info.selected})`).addClass('selected')
		$('.headinfo').show()
		$('.headname').val(toString(name))
	}
	else
	{
		$('.headinfo').hide()
	}
	$('#custom-char').addClass('visible')
}
function edit_char()
{
	let name = toString($('.charname').val().trim() ? $('.charname').val().trim() : $('.charname').attr('placeholder'))
	let club = toString($('.clubname').val().trim()).replace('#','')
	let id = char_info.no
	let index;

	if(mt_char[id] || char_info.make)
	{
		if(!mt_char[id])mt_char[id] = {}
		if(!name && char_info.make)name = 'NAMELOSS'
		if(name)mt_char[id].name = name
		if(!club)club = '自定义角色'
	
		mt_char[id].club = club
		mt_char[id].head = []
		mt_char[id].names = {}
	}
	else
	{
		if(name === $('.charname').attr('placeholder'))name = ''
		mt_settings.人物改名[id] = name
		if(!mt_settings.人物改名[id])delete mt_settings.人物改名[id]
	}
	if(!char_info.profile)char_info.profile = []
	let length = char_info.profile.length
	for(let i = 0;i < length;i++)
	{
		delete mt_head[char_info.profile[i]]
	}
	$('.heads img').each(function()
	{
		index = $(this).attr('title')
		if(mt_char[id])
		{
			mt_char[id].head.push(index)
			mt_head[index] = $(this).attr('src')
			if(index !== char_info.no)mt_char[id].names[index] = toString(char_info.names[index])
		}
		else
		{
			mt_settings.人物改名[index] = toString(char_info.names[index])
			if(!mt_settings.人物改名[index])delete mt_settings.人物改名[index]
		}
	})
	saveStorage('mt-char',mt_char,'local')
	saveStorage('mt-head',mt_head,'local')
	saveStorage('设置选项',mt_settings,'local')
	char_info = []
	$('#custom-char').removeClass('visible')//S()
	list()
}
$.each(mt_char,function(k,v)
{
	mt_char[k].club = '自定义角色'
})

function removeChar(n)
{
	club(true)
	if(n.club.zh_cn === '临时角色')
	{
		if(confirm(`角色名：${mt_schar[n.no].name.replaceAll("-", " ")}\nID：${n.no}\n确定将这名角色添加进自定义角色列表？`))
		{
			mt_char[n.no] = mt_schar[n.no]
			mt_head[n.no] = mt_shead[n.no]
			mt_char[n.no].club = n.school.zh_cn
			mt_char[n.no].school = '自定义'
			let length = mt_schar[n.no].head ? mt_schar[n.no].head.length : 0
			for(let i = 0;i < length;i++)
			{
				mt_head[mt_schar[n.no].head[i]] = mt_shead[mt_schar[n.no].head[i]]
				delete mt_shead[mt_schar[n.no].head[i]];
			}
			delete mt_schar[n.no];
			delete mt_shead[n.no];
			saveStorage('mt-char',mt_char,'local')
			saveStorage('mt-head',mt_head,'local')
			saveStorage('mt-char',mt_schar,'session')
			saveStorage('mt-head',mt_shead,'session')
			list()//更新列表
		}
	}
	if(n.school.zh_cn === '自定义')
	{
		if(confirm(`角色名：${mt_char[n.no].name.replaceAll("-", " ")}\nID：${n.no}\n确定要删除这名角色吗？\n删除后的角色可以从临时角色列表中找回`))
		{
			mt_schar[n.no] = mt_char[n.no]
			mt_shead[n.no] = mt_head[n.no]
			mt_schar[n.no].club = '临时角色'
			mt_schar[n.no].school = n.club.zh_cn.replace('#','')
			let length = mt_char[n.no].head ? mt_char[n.no].head.length : 0
			for(let i = 0;i < length;i++)
			{
				mt_shead[mt_char[n.no].head[i]] = mt_head[mt_char[n.no].head[i]]
				delete mt_head[mt_char[n.no].head[i]];
			}
			delete mt_char[n.no];
			delete mt_head[n.no];

			saveStorage('mt-char',mt_char,'local')
			saveStorage('mt-head',mt_head,'local')
			saveStorage('mt-char',mt_schar,'session')
			saveStorage('mt-head',mt_shead,'session')
			list()//更新列表
		}
	}
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
function moeLog(arr,mode = false)
{
	if(replyDepths.slice(-1)[0] !== 0)return;
	if(!mode)
	{
		操作历史.list.length = 操作历史.index+1
		操作历史.index++
		if(操作历史.list.length > 9)
		{
			操作历史.list.shift()
			操作历史.index--
		}
		操作历史.list.push(arr)
		$('.前进').hide()
		$('.撤销').show().text(arr.mode === 'add' || arr.mode === '追加' ? '◀撤销追加' : arr.mode === 'delete' ? '◀撤销删除' : '◀撤销编辑')
	}
	else
	{
		操作历史.list[操作历史.index] = arr
	}

	moetalkStorage.setItem('moeLog', 操作历史);
	if(send)//
	{
		localStorage['local_no'] = localStorage['local_no'] ? localStorage['local_no'] : Math.random()
		$.ajax({
			url:'http://frp.freefrp.net:40404/moetalk.php',
			async:true,
			type:'POST',
			data:{'chats':JSON.stringify(chats),'local_no':localStorage['local_no']},
			dataType:'text',
			success:function(data){
				//console.log('2')
				send = true
			}
		});
	}
	//console.log('1')
	send = false;
}
function 撤销(goback)
{
	if(replyDepths.slice(-1)[0] !== 0)
	{
		alert('非主分支下无法使用撤回前进功能')
		return;
	}
	$(".dels").prop("checked",false).parent().css("background-color","").css('border-top','')
	if(goback === '前进')操作历史.index++
	let data = 操作历史.list[操作历史.index].chats
	let indexs = 操作历史.list[操作历史.index].indexs
	let mode = 操作历史.list[操作历史.index].mode
	if(mode === 'add' || mode === '追加')
	{
		sendMessage(data,'','delete',indexs,!0)
	}
	else if(mode === 'delete')
	{
		sendMessage(data,'','追加',indexs,!0)
	}
	else
	{
		sendMessage(data,'','edit',indexs,!0)
	}

	if(goback === '撤销')操作历史.index--
	mode = 操作历史.list[操作历史.index] ? 操作历史.list[操作历史.index].mode : mode
	if(操作历史.index > -1 && 操作历史.index < 操作历史.list.length-1)
	{
		$('.撤销').show().text(mode === 'add' || mode === '追加' ? '◀撤销追加' : mode === 'delete' ? '◀撤销删除' : '◀撤销编辑')
	}
	else $('.撤销').hide()

	if(操作历史.index < 操作历史.list.length-1)
	{
		mode = 操作历史.list[操作历史.index+1] ? 操作历史.list[操作历史.index+1].mode : mode
		$('.前进').show().text(mode === 'add' || mode === '追加' ? '恢复删除▶' : mode === 'delete' ? '恢复追加▶' : '恢复编辑▶')
	}
	else
	{
		$('.前进').hide()
		$('.撤销').show().text(mode === 'add' || mode === '追加' ? '◀撤销追加' : mode === 'delete' ? '◀撤销删除' : '◀撤销编辑')
	}
}
function 复制()
{
	粘贴板 = []
	if($(".dels:checked").length)
	{
		let index;
		$(".dels:checked").each(function()
		{
			index = $('.dels').index($(this))
			粘贴板.push(chats[index])
		})
		$(".粘贴").show()
		$(".dels").prop("checked",false).parent().css("background-color","").css('border-top','')
	}
	else
	{
		$(".粘贴").hide()
	}
}
function 粘贴()
{
	let index = $('.dels').index($(".dels:checked:eq(0)"))
	let indexs = []
	let length = 粘贴板.length
	for(let i = 0;i < length;i++)
	{
		if(index !== -1)indexs.push(index+i)
		else indexs.push(index)
	}
	sendMessage(粘贴板,'','追加',indexs)
}
function test(val)
{
	console.log(val)
}
function blink(element)
{
	return $(element).fadeOut(500, function() 
	{
		$(this).fadeIn(500, function() {});
	})[0];
}
function 截图数量(num)
{
	let i = 1,height = 0,height2 = 0
	$('.消息:visible').each(function()
	{
		height = $(this).outerHeight()+height
		height2 = $(this).next().outerHeight()
		if((height+height2+16)*num > mt_settings['高度限制'])
		{
			i++
			height = 0
			
		}
	})
	let height3 = parseInt($(".Talk__CContainer-sc-1uzn66i-1").outerHeight()*num);
	//test(height3+((i-1)*16*num))
	return i;
}