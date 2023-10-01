//保存人物
$('body').on('click',"#savecus",function()
{
	alert('此功能已被弃用，MoeTalk存档自带自定义角色数据，可以直接上传读取')
})
//读取人物
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
		if(JSON.parse(this.result)[0] === 'Custom')
		{
			localStorage['mt-char'] = JSON.parse(this.result)[1];
			localStorage['mt-head'] = JSON.parse(this.result)[2];
		}
		else
		{
			localStorage['custom'] = JSON.parse(this.result)[0];
			localStorage['heads'] = JSON.parse(this.result)[1];
		}
	}
});
$('body').on('click',"#savedata",function()
{
	alert('MoeTalk出现问题时可以使用此功能提取存档并向开发者反馈\n虽然可以使用【读取本地数据存档】读取，但并不推荐您这么做')
	let time = new Date().toLocaleString().replaceAll('/','-').replaceAll(' ','_').replaceAll(':','-');
	download_txt('MoeTalk本地数据存档'+time+'.json',JSON.stringify(localStorage));//生成专用存档
});
$("body").append("<input id='loaddatafile' hidden type='file' accept='application/json'>");
$('body').on('click',"#loaddata",function(){$("#loaddatafile").click();})
$('body').on('change',"#loaddatafile",function()
{
	let file = this.files[0];
	let reader=new FileReader();
	reader.readAsText(file);
	reader.onload = function(e)
	{
		localStorage.clear()
		$.each(JSON.parse(this.result),function(k,v)
		{
			localStorage[k] = v;
		})
		alert('需返回页面确认读取成功')
	}
});
//更改语言
$('body').on('click',"#language",function()
{
	let lang = prompt("请输入想更改的语言：kr(韩语)、jp(日语)、en(英语)、zh_cn(简体中文)、zh_tw(繁体中文)", "zh_cn");
	if (lang != null)
	{
		alert('更改完成，请返回页面!');
		localStorage['mt-lang'] = lang;
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
	if(!localStorage['nofont']){if(confirm('是否取消加载字体文件？取消可以优化页面加载时间\n确认后请返回页面')){localStorage['nofont'] = true;}}
	else{if(confirm('是否恢复加载字体文件？恢复可以使页面布局更美观\n确认后请返回页面')){localStorage.removeItem('nofont');}}
})
//头像质量
$('body').on('click',"#hnum",function()
{
	if(localStorage['hnum'])num = "，当前数值为："+localStorage['hnum']
	else num = '，当前数值为300';
	let hnum = prompt("数值越大上传的头像越清晰，同时也会越占用存储空间\n建议在100到300之间取值"+num,300);
	if(!isNaN(hnum) && hnum != null && hnum.trim() != '')localStorage['hnum'] = hnum.trim()
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
		window.location.reload();//刷新页面
	}
})
//设置整体上传的图片宽高百分比
$("body").on('click','#mt-size',function()
{
	let size = localStorage['mt-size'];
	let msg = prompt("请输入整体上传的图片宽高百分比，数字后一定要带百分号，当前数值为：",size);
	if(msg)
	{
		localStorage['mt-size'] = msg;
	}
})
//设置独立的差分表情宽高百分比
$("body").on('click','#mt-cfsize',function()
{
	let size = localStorage['mt-cfsize'];
	let msg = prompt("请输入独立的差分表情宽高百分比，数字后一定要带百分号，当前数值为：",size);
	if(msg)
	{
		localStorage['mt-cfsize'] = msg;
	}
})
//设置标题
$("body").on('click','#mt-title',function()
{
	let title = localStorage['MoeTalk'];
	let msg = prompt("请输入标题文字(不要包含中文)",title);
	if(msg)
	{
		localStorage['MoeTalk'] = msg;
	}
})

//待重新编写
$('body').on('click',"#head",function()
{
	let head = prompt("头像以你底下的角色选择框第一个头像为准，请输入人名，不输入即为空");
	let img = "<img src='"+$('.fzOyMd:eq(0)').attr('src')+"'class='common__Profile-sc-1ojome3-6 ekLMv rhead'>";
	$('.dCYmqA').next().remove();$('.dCYmqA').next().remove();
	if(head != null && head != '')
	{
		$('.dCYmqA').after("<span style='writing-mode:tb-rl;background:rgb(76,91,111);line-height:normal;'>"+head+"</span>",img)
	}
	else
	{
		$('.dCYmqA').after(img)
	}
})
$('body').on('click','.rhead',function()
{
	if($(this).prev().is('span'))
	{
		$(this).prev().remove();
		$(this).remove();
	}
	else
	{
		$(this).remove();
	}
})

//水印功能
if(localStorage['wmark'])
{
	let arr = JSON.parse(localStorage['wmark']);
	$(".drowsy")[0].value = arr[0];
	$(".drowsy")[1].value = arr[1];
	$(".drowsy")[2].value = arr[2];
	$(".drowsy")[3].value = arr[3];
	$(".drowsy")[4].value = arr[4];
	$(".drowsy")[5].value = arr[5];
	$(".drowsy")[6].value = arr[6];
	$(".drowsy")[7].value = arr[7];
}
function mark()
{
	let arr = [];
	r = $(".drowsy")[0].value == '' ? 0 : $(".drowsy")[0].value
	f = $(".drowsy")[1].value == '' ? 40 : $(".drowsy")[1].value
	c1 = $(".drowsy")[2].value == '' ? 0 : $(".drowsy")[2].value
	c2 = $(".drowsy")[3].value == '' ? 0 : $(".drowsy")[3].value
	c3 = $(".drowsy")[4].value == '' ? 0 : $(".drowsy")[4].value
	c4 = $(".drowsy")[5].value == '' ? 0.8 : $(".drowsy")[5].value
	d = $(".drowsy")[6].value == '' ? 3 : $(".drowsy")[6].value
	s = $(".drowsy")[7].value == '' ? '防和谐 水印 测试' : $(".drowsy")[7].value
	s = s.split(" ")
	drawWaterMark.init(
	{
		imgpath: "demo.jpg",//图片路径	string类型	[必传]
		rotate: r,//旋转角度	 int类型
		fontsize: f,//字体大小
		fontcolor: c1+","+c2+","+c3+","+c4,//字体颜色	rgba类型
		density: d,//稠密度
		str: s,		//[必传]
		domid: "drowsy",//图片id
		cb:function(base64)
		{
				//console.log(base64)
			arr[0] = $(".drowsy")[0].value = r;
			arr[1] = $(".drowsy")[1].value = f;
			arr[2] = $(".drowsy")[2].value = c1;
			arr[3] = $(".drowsy")[3].value = c2;
			arr[4] = $(".drowsy")[4].value = c3;
			arr[5] = $(".drowsy")[5].value = c4;
			arr[6] = $(".drowsy")[6].value = d;
			arr[7] = $(".drowsy")[7].value = s.join(' ');
			localStorage['wmark'] = JSON.stringify(arr);
		}
	})
}
function cleanmark()
{
	if(confirm('是否清空？'))
	{
		localStorage.removeItem('wmark');
	}
}

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
			const blob = new Blob([subData], { type: mimeMap[ext]});
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
$('body').on('click',"#mt-edit",function()
{
	if(confirm('是否切换编辑模式？\n点击【确定】为将使用新版编辑模式\n点击【取消】将使用旧版编辑模式'))
	{
		localStorage.removeItem('mt-edit');
	}
	else
	{
		localStorage['mt-edit'] = '旧版编辑模式';
	}
})
$('body').on('click',"#ct",function()
{
	let arr = JSON.parse(localStorage['chats'])
	let cl = [];
	$.each(arr,function(k,v)
	{
		let data = 'mt-';
		if(mt_characters[v['sCharacter']['no']])data = "MoeTalk-"
		if(mollu_char[v['sCharacter']['no']])data = "MT-"
		if(closure_char[v['sCharacter']['no']])data = "ba-"
		cl[k] = {};
		cl[k]['content'] = v['content'];
		cl[k]['is_breaking'] = false;
		if(v['sCharacter']['no'] !== 0)
		{
			cl[k]['char_id'] = data+v['sCharacter']['no'];
			cl[k]['img'] = v['sCharacter']['index'];
			if(data === "MT-")cl[k]['img'] = v['sCharacter']['no']+'.'+v['sCharacter']['index'];

		}
		cl[k]['yuzutalk'] = {};
		cl[k]['yuzutalk']['nameOverride'] = v['name'] ? v['name'] : '';
		if(v['isFirst'] === true)cl[k]['yuzutalk']['avatarState'] = 'SHOW';
		else cl[k]['yuzutalk']['avatarState'] = 'HIDE';
		if(v['type'] == 'chat')cl[k]['yuzutalk']['type'] = 'TEXT';
		if(v['type'] == 'image')
		{
			cl[k]['content'] = v['content'];
			if(v['content'].indexOf('http') < 0)cl[k]['content'] = 'http://moetalk.gitee.io/'+v['content'];
			if(v['content'].indexOf('data:image/') > -1)cl[k]['content'] = v['content'];
			cl[k]['yuzutalk']['type'] = 'IMAGE';
		}
		if(v['type'] == 'heart')cl[k]['yuzutalk']['type'] = 'RELATIONSHIPSTORY';
		if(v['type'] == 'info')cl[k]['yuzutalk']['type'] = 'NARRATION';
		if(v['type'] == 'reply')
		{
			cl[k]['yuzutalk']['type'] = 'CHOICES';
			cl[k]['rg'] = v['replyGroup'];
		}
		if(v['file'])cl[k]['content'] = v['file'];
	})
	$.each(cl,function(k,v)
	{
		if(v['rg'] && cl[k+1] && v['rg'] === cl[k+1]['rg'])
		{
			cl[k+1]['content'] = cl[k]['content']+'\n'+cl[k+1]['content']
			delete cl[k];
		}
	})
	for(let i=0;i<cl.length;i++){if(cl[i]===undefined){cl.splice(i,1);i--;}}
	arr = {};
	arr['chat'] = cl
	arr['chars'] = [];
	let time = new Date().toLocaleString().replaceAll('/','-').replaceAll(' ','_').replaceAll(':','-');
	download_txt('ClosureTalk转换存档'+time+'.json',JSON.stringify(arr));//生成专用存档
	if(confirm('生成的ClosureTalk存档只能通过Gitee版ClosureTalk读取\n点击【确定】访问'))
	{
		location.href = '../closuretalk/'
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