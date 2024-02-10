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
	alert('生成的文件只能用“读取localStorage存档”读取\n建议您在MoeTalk出现错误时向开发者提交此文件')
	let time = new Date().toLocaleString().replaceAll('/','-').replaceAll(' ','_').replaceAll(':','-');
	download_txt('MoeTalk_localStorage存档'+time+'.json',JSON.stringify(localStorage));//生成专用存档
});
$("body").append("<input id='loaddatafile' hidden type='file' accept='application/json'>");
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
	let lang = prompt("请输入想更改的语言：\nkr(韩语)\njp(日语)\nen(英语)\nzh_cn(简体中文)\nzh_tw(繁体中文)", localStorage['mt-lang']);
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
	if(localStorage['mt-nofont'])
	{
		if(confirm('是否恢复加载字体文件？恢复可以使页面布局更美观\n确认后请返回页面'))
		{
			localStorage.removeItem('mt-nofont');
		}
	}
	else
	{
		if(confirm('是否取消加载字体文件？取消可以优化页面加载时间\n确认后请返回页面'))
		{
			localStorage['mt-nofont'] = true;
		}
	}
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
	let msg = prompt("请输入标题文字",title);
	if(msg)
	{
		localStorage['MoeTalk'] = msg;
	}
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
			const blob = new Blob([subData], { type: mimeMap[ext]});
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
	let image = prompt("请输入生成图片的格式：（不要乱输入）\npng（默认，质量最好体积最大）\njpeg（体积小，注意不是jpg）\nwebp（体积更小，不推荐火狐）", localStorage['mt-image'].split('/')[1]);
	if(image != null)
	{
		alert('更改完成，如果图片生成错误请尝试改为其它参数');
		localStorage['mt-image'] = 'image/'+image;
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