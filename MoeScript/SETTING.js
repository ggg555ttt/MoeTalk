function rgbToHex(rgb) {
  const values = rgb.match(/\d+/g); // 提取RGB值
  const hex = values.reduce((hexValue, currentValue) => {
    const hexString = Number(currentValue).toString(16); // 将每个RGB值转换成16进制字符串
    const paddedHexString = hexString.padStart(2, '0'); // 在不满两位的字符串前补0
    return hexValue + paddedHexString;  // 拼接每个RGB值对应的16进制字符串
  }, '');
  return `#${hex.toUpperCase()}`; // 返回完整的HEX颜色代码（需将字母转换为大写）
}
//读取人物
$('body').on('click',"input",function()
{
	$("input[type='file']").val('')
})
$("body").append("<input id='loadcusfile' hidden type='file' accept='application/json'>");
$('body').on('click',"#loadcus",function()
{
	if(confirm('此功能只能读取专用的自定义角色存档文件，不要乱上传'))
	{
		$("#loadcusfile").click();
	}
})
$('body').on('change',"#loadcusfile",function()
{
	let file = this.files[0];
	let reader=new FileReader();
	reader.readAsText(file);
	reader.onload = function(e)
	{
		let mt_char = {};
		let mt_head = {};
		let json = JSON.parse(this.result);
		if(json[0] === 'Custom')
		{
			localStorage['mt-char'] = json[1];
			localStorage['mt-head'] = json[2];
		}
		else
		{
			if(json[0] && JSON.parse(json[0])[0].club[0].characters)
			{
				mt_char = {}
				mt_head = {}
				let i;
				$.each(JSON.parse(json[0])[0].club[0].characters,function(k,v)
				{
					mt_char[v.no] = v.zh_cn
				})
				$.each(JSON.parse(json[1])[0],function(k,v)
				{
					if(k.split('.').length > 1)i = k.split('.')[0];
					if(k.split('/').length > 1)i = k.split('.')[0];
					mt_head[i] = v;
				})
				localStorage['mt-char'] = JSON.stringify(mt_char);
				localStorage['mt-head'] = JSON.stringify(mt_head);
			}
			
		}
	}
});
$('body').on('click',"#savedata",function()
{
	alert('MoeTalk出现错误时可以向开发者提交此文件\n另外请不要将此文件作为存档上传至MoeTalk！')
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
});
$("body").append("<input id='loaddatafile' accept='text/plain' hidden type='file'>");
$('body').on('click',"#loaddata",function()
{
	alert('此选项只能读取“下载localStorage存档”生成的文件\n请不要上传其他的文件')
	$("#loaddatafile").click();
})
$('body').on('change',"#loaddatafile",function()
{
	let file = this.files[0];
	let reader=new FileReader();
	reader.readAsText(file);
	reader.onload = function(e)
	{
		localStorage.clear()
		let json = JSON.parse(this.result)
		mt_settings = json['设置选项'] ? JSON.parse(json['设置选项']) : {}
		if(!mt_settings['存储模式'])moetalkStorage.clear()
		$.each(json,function(k,v)
		{
			if(['chats','mt-char','mt-head','moeLog','DB_EMOJI'].indexOf(k) > -1)
			{
				if(!mt_settings['存储模式'])moetalkStorage.setItem(k,v)
				else localStorage[k] = v;
			}
			else localStorage[k] = v;
		})
		alert('需返回页面确认读取成功')
	}
});
//更改语言
$('body').on('click',"#language",function()
{
	let lang = prompt("请输入想更改的语言：\nkr(韩语)\njp(日语)\nen(英语)\nzh_cn(简体中文)\nzh_tw(繁体中文)", mt_settings['语言选项']);
	if (lang != null)
	{
		mt_settings['语言选项'] = lang;
		saveStorage('设置选项',mt_settings,'local')
		alert('更改完成，请返回页面!');
	}
})
//发送方式
$('body').on('click',"#send",function()
{
	if(localStorage['send'])
	{
		if(confirm('当前发送方式为点击按钮发送，是否换为回车发送？'))
		{
			localStorage.removeItem('send');
		}
	}
	else
	{
		if(confirm('当前发送方式为回车发送，是否换为点击按钮发送？'))
		{
			localStorage['send'] = 'click';
		}
	}
})
//字体加载
$('body').on('click',"#font",function()
{
	if(mt_settings['禁止字体'])
	{
		if(confirm('是否恢复加载字体文件？恢复可以使页面布局更美观\n确认后请返回页面'))
		{
			mt_settings['禁止字体'] = false
		}
	}
	else
	{
		if(confirm('是否取消加载字体文件？取消可以优化页面加载时间\n确认后请返回页面'))
		{
			mt_settings['禁止字体'] = true;
		}
	}
	saveStorage('设置选项',mt_settings,'local')
})
//头像质量
$('body').on('click',"#hnum",function()
{
	if(mt_settings['头像尺寸'])num = "，当前数值为："+mt_settings['头像尺寸']
	else num = '，当前数值为300';
	let hnum = prompt("数值越大上传的头像越清晰，同时也会越占用存储空间\n建议在100到300之间取值"+num,300);
	if(!isNaN(hnum) && hnum != null && hnum.trim() != '')mt_settings['头像尺寸'] = hnum.trim()
	saveStorage('设置选项',mt_settings,'local')
})

//清除数据
$("body").on('click','#clean',function()
{
	let cl = '';
	if(localStorage['last-viewed-version'])cl = "※检测到ClosureTalk存档数据，如果确认的话你的ClosureTalk存档数据也会一并清除";
	let msg = prompt("此操作会将你的所有存档数据一个不留的全部清除，如果你知道自己在干什么，请输入“确认清除”后点击确定\n"+cl);
	if(msg == '确认清除')
	{
		localStorage.clear();
		sessionStorage.clear();
		moetalkStorage.clear();
		window.location.reload();//刷新页面
	}
})
//设置整体上传的图片宽高百分比
$("body").on('click','#mt-size',function()
{
	let size = mt_settings['图片比例'];
	let msg = prompt("请输入整体上传的图片宽高百分比，数字后一定要带百分号，当前数值为：",size);
	if(msg)
	{
		mt_settings['图片比例'] = msg;
		saveStorage('设置选项',mt_settings,'local')
	}
})
//设置独立的差分表情宽高百分比
$("body").on('click','#mt-cfsize',function()
{
	let size = mt_settings['差分比例'];
	let msg = prompt("请输入独立的差分表情宽高百分比，数字后一定要带百分号，当前数值为：",size);
	if(msg)
	{
		mt_settings['差分比例'] = msg;
		saveStorage('设置选项',mt_settings,'local')
	}
})
//设置标题
$("body").on('click','#mt-title',function()
{
	let title = mt_settings['顶部标题'];
	let msg = prompt("请输入标题文字",title);
	if(msg)
	{
		mt_settings['顶部标题'] = msg;
	}
	saveStorage('设置选项',mt_settings,'local')
})

//隐写回复
const sep = '-sep-';
const maxExtLength = 4;
file1.onchange = (e) => {
	const file = e.target.files[0];
	if (file) {
		parseFile(file);
	}
}
function parseFile(file) {
	if (!file) {
		return alert('请选择需要解析的文件！');
	}
	blobToArrayBuffer(file)
		.then(buffer => {
			const data = new Uint8Array(buffer);
			const endIndex = getHiddenFileIndex(data);
			if (endIndex === -1) {
				return alert('该文件没有解析出存档文件！');
			}
			const extData = data.subarray(endIndex, endIndex + maxExtLength);
			const ext = data2str(extData);
			const subData = data.subarray(endIndex + maxExtLength);
			const blob = new Blob([subData], { type: mt_settings['图片格式']});
			if (blob.size < 1) {
				return alert('该文件没有解析出存档文件！');
			}
			downloadBlob(blob, `恢复的存档.${ext}`);
		});
}
function getHiddenFileIndex(data) {
	const sepData = new TextEncoder().encode(sep);
	const idx = data.findIndex((item, index) => {
		let count = 0;
		for (let i=0; i<sepData.length; i++) {
			if (data[index+i] === sepData[i]) {
				count ++;
			}
		}
		if (count === sepData.length) {
			return true;
		}
		return false;
	});
	return idx === -1 ? idx : idx + sepData.length;
}
function downloadBlob(blob, name) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.download = name;
	a.href = url;
	a.click();
}
function data2str(data) {
	return data.reduce((a, item) => a + String.fromCharCode(item), '').trim();
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
$('body').on('click',"#mt-image",function()
{
	let image = prompt("请输入生成图片的格式：（不要乱输入）\npng（默认，质量最好体积最大）\njpeg（体积小，注意不是jpg）\nwebp（体积更小，不推荐火狐）", mt_settings['图片格式'].split('/')[1]);
	if(image != null)
	{
		alert('更改完成，如果图片生成错误请尝试改为其它参数');
		mt_settings['图片格式'] = 'image/'+image;
		saveStorage('设置选项',mt_settings,'local')
	}
})
$('body').on('click',"#cleancache",function()
{
	window.caches && caches.keys && caches.keys().then(function(keys)
	{
		keys.forEach(function(key)
		{
			caches.delete(key);
		});
	});
	alert('已清除ServiceWorker缓存')
})
$('body').on('click',"#mt-maxheight",function()
{
	let maxheight = prompt("请输入生成图片的最大长度：\n默认为16384\n理论上限需测试", mt_settings['高度限制'] ? mt_settings['高度限制'] : 16384);
	if(maxheight != null)
	{
		alert('更改完成，请返回moetalk');
		mt_settings['高度限制'] = parseInt(maxheight);
		saveStorage('设置选项',mt_settings,'local')
	}
})
$('body').on('click',"#mt-maxwidth",function()
{
	let maxwidth = prompt("请输入生成图片的最大宽度：（默认500）", mt_settings['宽度限制'] ? mt_settings['宽度限制'] : 500);
	if(maxwidth != null)
	{
		alert('更改完成，请返回moetalk');
		mt_settings['宽度限制'] = parseInt(maxwidth);
		saveStorage('设置选项',mt_settings,'local')
	}
})
$('body').on('click',"#mt-fontszie",function()
{
	let val;
	$(this).parent().find('input').each(function(k,v)
	{
		v.value ? val = v.value : val = ''
		!mt_settings['文字样式'][v.title] ? mt_settings['文字样式'][v.title] = {} : ''
		mt_settings['文字样式'][v.title]['font-size'] = val
	})
	alert('已提交参数，参数为空则保持默认，错误参数则导致修改失败')
	saveStorage('设置选项',mt_settings,'local')
})
$('body').on('click',"#backsave",function()
{
	let str = '此功能可以有效的减少更新消息时产生的延迟\n'
	str += '在低配设备上可能会有明显的流畅度提升\n'
	str += '因为是测试中的功能，作者无法保证稳定性\n'
	str += '有可能会出现保存失败或其他错误\n'
	str += '在您发现错误后麻烦请向我详细反馈您之前的操作活动\n'
	str += '我会尝试排查错误并让这个功能变得更加完善\n'
	str += '感谢您的使用※为了应对保存失败我特地留了一个手动“保存”按钮\n'
	str += `后台保存模式：【${mt_settings['后台保存'] ? '开启' : '关闭'}】\n`
	str += `${mt_settings['后台保存'] ? '是否关闭？' : '是否开启？'}`
	if(confirm(str))
	{
		if(!mt_settings['后台保存'])
		{
			mt_settings['后台保存'] = '开启'
			saveStorage('设置选项',mt_settings,'local')
			return
		}
		if(mt_settings['后台保存'])
		{
			delete mt_settings['后台保存']
			saveStorage('设置选项',mt_settings,'local')
			return
		}
	}
})
$('body').on('click',"#mt-zipdownimg",function()
{
	let str = '如果开启此选项，生成多张图片时会以压缩文件的格式进行下载\n'
	str += '目前移动客户端下此选项无效，后期考虑支持\n'
	str += `当前状态：【${mt_settings['打包下载'] ? '开启' : '关闭'}】\n`
	str += '点击“确认”开启\n点击“取消”关闭'
	if(confirm(str))
	{
		mt_settings['打包下载'] = 'zip'
	}
	else
	{
		delete mt_settings['打包下载']
	}
	saveStorage('设置选项',mt_settings,'local')
})
$('body').on('click',"#mt-fontSize",function()
{
	let str = '此选项可以设置移动端的元素尺寸\n'
	str += '数值越小显示的显示的条目就越多\n'
	str += '必须是“数字+px”，建议在10px以上，16px以下\n'
	str += '数值过大过小可能会导致显示异常，请谨慎修改\n'
	str += '默认值为14px'
	let fontSize = prompt(str, mt_settings['元素尺寸'] ? mt_settings['元素尺寸'] : '');
	if(fontSize)
	{
		alert('更改完成，请返回moetalk');
		mt_settings['元素尺寸'] = fontSize;
		saveStorage('设置选项',mt_settings,'local')
	}

	saveStorage('设置选项',mt_settings,'local')
})
$('body').on('click',"#savemode",function()
{
	let str = '（此功能已过时，不再推荐使用）\n'
	str += '可以选择容量更大的“indexedDB”或5MB容量限制的“localStorage”\n'
	str += '因为是测试中的功能，作者无法保证稳定性\n'
	str += '在您发现错误后麻烦请向我详细反馈您之前的操作活动\n'
	str += '我会尝试排查错误并让这个功能变得更加完善\n'
	str += '感谢您的使用※注意：切换前请先备份存档\n'
	str += `存储模式：${mt_settings['存储模式'] ? 'localStorage' : 'indexedDB'}\n`
	str += `${mt_settings['存储模式'] ? '是否切换为indexedDB？' : '是否切换为localStorage？'}\n`
	if(confirm(str))
	{
		if(mt_settings['存储模式'])//转indexedDB
		{
			delete mt_settings['存储模式']
			if(!localStorage['mt-char'] || localStorage['mt-char'][0] === '[')localStorage['mt-char'] = '{}'
			if(!localStorage['mt-head'])localStorage['mt-head'] = '{}'
			if(!localStorage['chats'] || localStorage['chats'][0] !== '[')localStorage['chats'] = '[]'

			moetalkStorage.setItem('mt-char',localStorage['mt-char'])
			moetalkStorage.setItem('mt-head',localStorage['mt-head'])
			moetalkStorage.setItem('chats',localStorage['chats'])

			delete localStorage['mt-char']
			delete localStorage['mt-head']
			delete localStorage['chats']
			saveStorage('设置选项',mt_settings,'local')
			return
		}
		if(!mt_settings['存储模式'])//转localStorage
		{
			mt_settings['存储模式'] = 'localStorage'
			moetalkStorage.getItem('mt-char', function(err, char)
			{
				moetalkStorage.getItem('mt-head', function(err, head)
				{
					moetalkStorage.getItem('chats', function(err, data)
					{
						if(!char)char = '{}';
						if(!head)head = '{}';
						if(!data)data = '[]';
						if(typeof char !== 'string')char = JSON.stringify(char)
						if(typeof head !== 'string')head = JSON.stringify(head)
						if(typeof data !== 'string')data = JSON.stringify(data)
						localStorage['mt-char'] = char
						localStorage['mt-head'] = head
						localStorage['chats'] = data
						moetalkStorage.clear()
					})
				})
			})
			saveStorage('设置选项',mt_settings,'local')
			return
		}
	}
	
})
$('.mt_settings').text(JSON.stringify(mt_settings,null,4))
$("body").on('click',function()
{
	$('.mt_settings').text(JSON.stringify(mt_settings,null,4))
})
if(mt_settings['文字样式'])
{
	$.each(mt_settings['文字样式'],function(k,v)
	{
		$('#mt-fontszie').parent().find(`input[title="${k}"]`)[0].value = v['font-size']
	})
}
$('body').on('click',".selectColor",function()
{
	$('#titleColor').val(rgbToHex($(this).css('background-color')))
})
$('body').on('click',"#mt-titleColor",function()
{
	mt_settings['标题颜色'] = $('#titleColor').val();
	saveStorage('设置选项',mt_settings,'local')
	alert('标题颜色提交完成，请返回页面查看效果');
})
$('body').on('click',"#SETTING_图片存档",function()
{
	let str = ''
	str += '新版MoeTalk已取消上传和下载旧版图片存档\n此选项用于切换对旧版图片存档的上传和下载\n'
	str += `当前为${mt_settings['图片存档'] ? '开启' : '关闭'}状态\n点击【确定】开启\n点击【取消】关闭`
	if(confirm(str))mt_settings['图片存档'] = true
	else delete mt_settings['图片存档']
	saveStorage('设置选项',mt_settings,'local')
	alert(`旧版图片存档的上传和下载模式已${mt_settings['图片存档'] ? '开启' : '关闭'}`)
})
$('body').on('click',"#SETTING_隐藏差分",function()
{
	let str = ''
	str += '此选项可以设置显示或隐藏差分按钮\n'
	str += `当前为${mt_settings['隐藏差分'] ? '隐藏' : '显示'}状态\n点击【确定】则隐藏\n点击【取消】则显示`
	if(confirm(str))mt_settings['隐藏差分'] = true
	else delete mt_settings['隐藏差分']
	saveStorage('设置选项',mt_settings,'local')
	alert(`差分按钮已${mt_settings['隐藏差分'] ? '隐藏' : '显示'}`)
})
$('#titleColor').val(mt_settings['标题颜色'] ? mt_settings['标题颜色'] : '#8BBBE9')
// document.write("<scr"+`ipt src='https://moetalk-ggg555ttt-57a86c1abdf06b5ebe191f38161beddd1d0768c27e1a2.gitlab.io/MoeScript/Script/localforage.min.js'></scr`+"ipt>");
// const moetalkStorage = localforage.createInstance({name:'moetalkStorage'});
// moetalkStorage.getItem('mt-char', function(err, char)
// {
// 	moetalkStorage.getItem('mt-head', function(err, head)
// 	{
// 		moetalkStorage.getItem('chats', function(err, chats)
// 		{
// 			moetalkStorage.getItem('moeLog', function(err, moeLog)
// 			{
// 				if(!char)char = {};
// 				if(!head)head = {};
// 				if(!chats)chats = [];
// 				if(!moeLog)moeLog = [];

// 				let arr = {}
// 				arr['mt-char'] = char
// 				arr['mt-head'] = head
// 				arr['chats'] = chats
// 				arr['moeLog'] = moeLog

// 				let time = new Date().toLocaleString().replaceAll('/','-').replaceAll(' ','_').replaceAll(':','-');
// 				let contentType = 'application/octet-stream';
// 				let a = document.createElement('a');
// 				let blob = new Blob([JSON.stringify({...localStorage,...arr},null,4)],{ 'type': contentType });
// 				a.href = window.URL.createObjectURL(blob);
// 				a.download = 'MoeTalk_localStorage存档'+time+'.TXT';
// 				a.click();
// 			})
// 		})
// 	})
// })

// $('[alt*="头像"]:visible').each(function()
// {
// 	console.log($(this).attr('srcset').replaceAll(' ',"\n"))
// })
//https://try8.cn/tool/format/js