/*@MoeScript/SETTING.js@*/
delete sessionStorage['通知文档']
delete sessionStorage['MikuTalk']
var vConsole = new window.VConsole();
删除文件('更新补丁')
$('body').on('click',"input",function()
{
	$("input[type='file']").val('')
})

//清除缓存
$('body').on('click',"#cleancache",async function()
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
		alert('已清除ServiceWorker缓存')
	}
})

//清除数据
$("body").on('click','#clean',async function()
{
	let msg = prompt("此操作会将你的所有存档数据一个不留的全部清除\n如果你知道自己在干什么，请输入“确认清除”后点击确定\n等待弹窗再次出现后返回MoeTalk页面");
	if(msg == '确认清除')
	{
		await 数据操作('Sc')//数据
		await 数据操作('Ic')//图片
		await 数据操作('Pc')//项目
		await 数据操作('Tc')//临时
		await 数据操作('Cc')//缓存
		localStorage.clear();
		sessionStorage.clear();
		$('body').html(`<h1><a href='#' onclick="back()"><i style='color: red; font-weight: bold;'>返回MoeTalk</i></a></h1>`)
		alert('所有数据清除完毕！')
	}
	else alert('已放弃操作')
})

//备份数据
$('body').on('click',"#savedata",async function()
{
	alert('MoeTalk备份数据下载中\n如果数据量过大，请您耐心等待至弹窗再次出现')
	let json = {'MoeTalk备份数据':'MoeTalk备份数据'}
	json.localStorage = localStorage
	delete json.localStorage['cordova']
	json.sessionStorage = sessionStorage
	json.IndexedDB = {}
	let D,C = ['MoeImage','MoeTemp','MoeProject','moetalkStorage','MoeCache']
	for(let i=0,l=C.length;i<l;i++)
	{
		if(C[i] === 'MoeImage')D = MoeImage
		if(C[i] === 'MoeTemp')D = MoeTemp
		if(C[i] === 'MoeProject')D = MoeProject
		if(C[i] === 'moetalkStorage')D = moetalkStorage
		if(C[i] === 'MoeCache')D = MoeCache
		json.IndexedDB[C[i]] = {}
		await D.iterate((value, key, iterationNumber)=>
		{
			json.IndexedDB[C[i]][key] = value
		})
	}
	let chunks = [];
	stringifyToChunks(json, chunks)
	json = chunks
	chunks = ''
	json = new Blob(json,{type: 'application/json'})
	let filename = await 保存文件(`MoeTalk备份数据-${getNowDate()}.TXT`,json,'json')
	alert(filename+'\n下载完成！')
});

//恢复数据
$("body").append("<input id='loaddatafile' accept='text/plain' hidden type='file'>");
$('body').on('click',"#loaddata",function()
{
	alert('这里只能提交专门的MoeTalk备份数据\n提交文件后，如果数据量较大，请耐心等待至弹窗再次出现\n请注意，此操作会覆盖原数据！')
	$("#loaddatafile").click();
})
$('body').on('change',"#loaddatafile",async function(e)
{
	存档信息 = {}
	await fileInput(e)
	if(!存档信息.MoeTalk备份数据)
	{
		存档信息 = {}
		alert('此文件并非备份数据存档！\n有疑问请向开发者反馈并提供此文件')
		return
	}
	else
	{
		delete 存档信息.MoeTalk备份数据
	}
	for(let K in 存档信息)
	{
		if(K == 'localStorage')
		{
			localStorage.clear()
			for(let C in 存档信息[K])localStorage[C] = 存档信息[K][C]
		}
		if(K == 'sessionStorage')
		{
			sessionStorage.clear()
			for(let C in 存档信息[K])sessionStorage[C] = 存档信息[K][C]
		}
		if(K == 'IndexedDB')
		{
			for(let C in 存档信息[K])
			{
				let D
				if(C === 'MoeImage')D = 'I'
				if(C === 'MoeTemp')D = 'T'
				if(C === 'MoeProject')D = 'P'
				if(C === 'moetalkStorage')D = 'S'
				if(C === 'MoeCache')D = 'C'
				await 数据操作(D+'c')
				for(let key in 存档信息[K][C])
				{
					let val = 存档信息[K][C][key]
					delete 存档信息[K][C][key]
					await 数据操作(D+'s',key,val)
				}
			}
		}
		delete 存档信息[K]
	}
	$('body').html(`<h1><a href='#' onclick="back()"><i style='color: red; font-weight: bold;'>返回MoeTalk</i></a></h1>`)
	alert('数据恢复成功！\n请返回MoeTalk确认')
});

//隐藏差分
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

//头像质量
$('body').on('click',"#hnum",function()
{
	if(mt_settings['头像尺寸'])num = "，当前数值为："+mt_settings['头像尺寸']
	else num = '，当前数值为300';
	let hnum = prompt("数值越大上传的头像越清晰，同时也会越占用存储空间\n建议在100到300之间取值"+num,300);
	if(!isNaN(hnum) && hnum != null && hnum.trim() != '')mt_settings['头像尺寸'] = hnum.trim()
	saveStorage('设置选项',mt_settings,'local')
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
		let mt_char = {};
		let head = {};
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
				head = {}
				let i;
				$.each(JSON.parse(json[0])[0].club[0].characters,function(k,v)
				{
					mt_char[v.no] = v.zh_cn
				})
				$.each(JSON.parse(json[1])[0],function(k,v)
				{
					if(k.split('.').length > 1)i = k.split('.')[0];
					if(k.split('/').length > 1)i = k.split('.')[0];
					head[i] = v;
				})
				localStorage['mt-char'] = JSON.stringify(mt_char);
				localStorage['mt-head'] = JSON.stringify(head);
			}
			
		}
	}
});

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
			const blob = new Blob([subData], { type: 'image/png'});
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

//显示设置信息
$('.mt_settings').text(JSON.stringify(mt_settings,null,4))
$("body").on('click',function()
{
	$('.mt_settings').text(JSON.stringify(mt_settings,null,4))
})