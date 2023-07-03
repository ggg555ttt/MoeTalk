/*预定义区*/
var qchar = 'yes';
var imgindex;var text;//人物自定义
var headarr = [];//头像储存
var chararr = [];//自定义角色列表
var height;//聊天记录长度
var first;
var size = (JSON.stringify(localStorage).length/1024).toFixed(0);//数据大小
if(!localStorage['heads'])localStorage['heads'] = '[{}]';
if(!localStorage['first'])localStorage['first'] = '[]';
if(!localStorage['chats'])localStorage['chats'] = '[]';
if(!localStorage['mt-lang'])localStorage['mt-lang'] = 'zh_cn';
$.each(sessionStorage,function(k,i)
{
	headarr[i] = sessionStorage[k];
})
var class0 = 'common__IconButton-sc-1ojome3-0 Header__QuestionButton-sc-17b1not-3 mvcff kNOatn bold';
/*预定义区*/

/*函数库*/
//IndexedDB打开数据库
function openDB(dbName, version = 1) {
	return new Promise((resolve, reject) => {
	//	兼容浏览器
	var indexedDB =
		window.indexedDB ||
		window.mozIndexedDB ||
		window.webkitIndexedDB ||
		window.msIndexedDB;
	let db;
	// 打开数据库，若没有则会创建
	const request = indexedDB.open(dbName, version);
	// 数据库打开成功回调
	request.onsuccess = function (event) {
		db = event.target.result; // 数据库对象
		//console.log("数据库打开成功");
		resolve(db);
	};
	// 数据库打开失败的回调
	request.onerror = function (event) {
		console.log("数据库打开报错");
	};
	// 数据库有更新时候的回调
	request.onupgradeneeded = function (event) {
		// 数据库创建或升级的时候会触发
		console.log("数据库已更新");
		db = event.target.result; // 数据库对象
		var objectStore;
		// 创建存储库
		objectStore = db.createObjectStore("Custom", {//数据表
		keyPath: "key", // 这是主键
		// autoIncrement: true // 实现自增
		});
		// 创建索引，在后面查询数据的时候可以根据索引查
		
		objectStore.createIndex("key", "key", { unique: false });//主键
		objectStore.createIndex("val", "val", { unique: false });//数据
	};
	});
}
//IndexedDB通过主键读取数据
function getDataByKey(db, storeName, key) {
	return new Promise((resolve, reject) => {
	var transaction = db.transaction([storeName]); // 事务
	var objectStore = transaction.objectStore(storeName); // 仓库对象
	var request = objectStore.get(key); // 通过主键获取数据

	request.onerror = function (event) {
		console.log("事务失败");
	};

	request.onsuccess = function (event) {
		//console.log("主键查询结果: ", request.result);
		resolve(request.result);
	};
	});
}
//IndexedDB更新数据
function updateDB(db, storeName, data) {
	var request = db
	.transaction([storeName], "readwrite") // 事务对象
	.objectStore(storeName) // 仓库对象
	.put(data);

	request.onsuccess = function () {
		localStorage['imgs']++;
	//console.log("数据更新成功");
	};

	request.onerror = function () {
	console.log("数据更新失败");
	};
}
//IndexedDB通过主键删除数据
function deleteDB(db, storeName, id) {
var request = db
.transaction([storeName], "readwrite")
.objectStore(storeName)
.delete(id);

request.onsuccess = function () {
//console.log("数据删除成功");
};

request.onerror = function () {
console.log("数据删除失败");
};
}
//IndexedDB关闭数据库
function closeDB(db) {
	db.close();
	//console.log("数据库已关闭");
}
//IndexedDB删库跑路
function deleteDBAll(dbName) {
	console.log(dbName);
	let deleteRequest = window.indexedDB.deleteDatabase(dbName);
	deleteRequest.onerror = function (event) {
	console.log("删除失败");
	};
	deleteRequest.onsuccess = function (event) {
	console.log("删除成功");
	};
}
//保存头像
function savehead(headindex,img64)
{
	let headarr = JSON.parse(localStorage['heads']);
	headarr[0][headindex] = img64;
	localStorage['heads'] = JSON.stringify(headarr);
	// let db;
	// openDB('MoeTalk').then((db =>
	// {
	// 	db = db;
	// 	let data =
	// 	{
	// 		key : headindex,//唯一
	// 		val : img64
	// 	}
	// 	if((JSON.stringify(sessionStorage).length/1048576).toFixed(2) < 4.9)sessionStorage[headindex] = img64;
	// 	updateDB(db,'Custom', data)
	// 	if(headindex < 999)localStorage['imgs']++;
	// 	closeDB(db)//关闭数据库
	// }))
}
//读取头像
function loadhead(imgindex)
{
	if(JSON.parse(localStorage['heads'])[0] && JSON.parse(localStorage['heads'])[0][imgindex])
	{//自定义头像
		return JSON.parse(localStorage['heads'])[0][imgindex];
	}
	else
	{//本地头像
		let image = 'char/';
		if(parseInt(imgindex).toFixed(0) == '199')image = 'emoji/';
		image = image+imgindex+(localStorage['png'] ? localStorage['png'] : '.webp');
		if(localStorage['png'] == '.png')return image;
		if(!headarr[imgindex])
		{
			let db;
			openDB('MoeTalk').then((db =>
			{
				db = db;
				getDataByKey(db,'Custom',imgindex).then((arr =>
				{
					if((JSON.stringify(sessionStorage).length/1048576).toFixed(2) > 4.9)
					{
						let n = 1;
						$.each(sessionStorage,function(k,v)
						{
							if(n <= 10)sessionStorage.removeItem(k);n++;
						})
						headarr[imgindex] = 'data:image/webp;base64,'+arr['val'];
					}
					else 
					{
						sessionStorage[imgindex] = 'data:image/webp;base64,'+arr['val'];
						headarr[imgindex] = 'data:image/webp;base64,'+arr['val'];
					}
				}))
				closeDB(db)//关闭数据库
			}))
		}
		else
		{
			image = headarr[imgindex];
		}
		return image;
	}
	// let db;
	// openDB('MoeTalk').then((db =>
	// {
	// 	db = db;
	// 	getDataByKey(db,'Custom',imgindex).then((arr =>
	// 	{
	// 		if((JSON.stringify(sessionStorage).length/1048576).toFixed(2) > 4.9)
	// 		{
	// 			headarr[imgindex] = arr['val'];
	// 		}
	// 		else 
	// 		{
	// 			//console.log((JSON.stringify(sessionStorage).length/1048576).toFixed(2))
	// 			if(imgindex < 199)sessionStorage[imgindex] = arr['val'];
	// 			headarr[imgindex] = arr['val'];
	// 		}
			
	// 	}))
	// 	closeDB(db)//关闭数据库
	// 	return '';
	// }))
}
//删除头像
function delhead(imgindex)
{
	let headarr = JSON.parse(localStorage['heads']);
	delete headarr[0][imgindex];
	localStorage['heads'] = JSON.stringify(headarr);
	// let db;
	// openDB('MoeTalk').then((db =>
	// {
	// 	deleteDB(db,'Custom',imgindex)
	// 	closeDB(db)//关闭数据库
	// }))
}
//元素出现后执行代码
jQuery.fn.wait = function (func,cls,times,interval) {
	var _times = times || -1, //100次
		_interval = interval || 2000, //20毫秒每次
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
function compress(base64Img)
{
	var img = new Image();//创建一个空白图片对象
	img.src = base64Img;//图片对象添加图片地址
	img.onload = function()//图片地址加载完后执行操作
	{
		w = img.width;
        h = img.height;
        n = localStorage['hnum'] ? localStorage['hnum'] : 300;
		a = Math.min(1, n / w);
        (w *= a), (h *= a);
		//开始画压缩图
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		canvas.width = w;//压缩图的宽度
		canvas.height = h;//压缩图的高度
		ctx.drawImage(img,0,0,w,h);
		var newBase64 = canvas.toDataURL("image/webp");

		localStorage['custom'] = JSON.stringify(chararr);
		savehead(imgindex,newBase64)
		//$($(".eLDbih")[imgindex]).attr('src',newBase64);//改写图片
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

//警告提示
function warning()
{
	if(height > 10000 || size > 3000 || localStorage['last-viewed-version'])//检测聊天框宽度
	{
		$("#warning").removeAttr('hidden');//显示警告
	}
	else
	{
		$("#warning").attr('hidden','hidden');//隐藏警告
	}
}

function getCurentFileName()
{
	var pagePathName= window.location.pathname;
	return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}
var drawWaterMark = {};
drawWaterMark.init = function (objmsg) {
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var img = new Image();
	img.src = objmsg.imgpath;
	img.setAttribute("crossOrigin", 'Anonymous');
	img.onload = function () {
		//绘制和图片大小相同的canvas
		canvas.width = img.width;
		canvas.height = img.height;
		//canvas绘制图片，0 0  为左上角坐标原点
		ctx.drawImage(img, 0, 0);
		//绘制水印
		if (objmsg.rotate != undefined && objmsg.rotate != null) {//旋转角度[默认20]
			ctx.rotate((Math.PI / 120) * -objmsg.rotate);
		} else {
			ctx.rotate((Math.PI / 120) * -20);
		}
		var fontsize = 20;
		if (objmsg.fontsize != undefined && objmsg.fontsize != null) {//字体大小[默认20px]
			fontsize = objmsg.fontsize;
		}
		ctx.font = "bold "+fontsize+"px Microsoft Yahei";
		var fontcolor = '255, 255, 255, 0.2';
		if (objmsg.fontcolor != undefined && objmsg.fontcolor != null) {//字体颜色透明度[默认白色]
			fontcolor = objmsg.fontcolor;
		}
		ctx.fillStyle = "rgba(" + fontcolor + ")";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		var density = 3;
		if (objmsg.density != undefined && objmsg.density != null) {//稠密度[默认3]
			density = objmsg.density
		}
		for (var i = -1000; i < img.height; i += img.width / density) {
			for (var k = 0; k < img.height; k += img.width / density) {
				var str = objmsg.str;
				if (str.length == 1) {
					ctx.fillText(str[0], i, k);
				} else if(str.length==2){
					ctx.fillText(str[0], i, k);
					ctx.fillText(str[1], i, k + (fontsize-0+5));//多行
				} else if (str.length == 3 || str.length > 3) {
					ctx.fillText(str[0], i, k);
					ctx.fillText(str[1], i, k + (fontsize - 0 + 5));//多行
					ctx.fillText(str[2], i, k + (fontsize*2 - 0 + 5));//多行
				}
			}
		}
		var base64 = canvas.toDataURL("image/png");//添加过水印的base64图片
		if (objmsg.domid != undefined && objmsg.domid != null) {//id图片
			document.getElementById(objmsg.domid).src = base64;
			//$(objmsg.domid).attr('src', base64);
		}
		if (objmsg.cb != undefined && objmsg.cb != null) {//回调函数
			objmsg.cb(base64);//回调函数
		}
	}
}
