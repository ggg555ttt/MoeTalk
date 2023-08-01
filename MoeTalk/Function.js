/*预定义区*/
const mimeMap={'3gp':'video/3gpp',aab:'application/x-authoware-bin',aam:'application/x-authoware-map',aas:'application/x-authoware-seg',ai:'application/postscript',aif:'audio/x-aiff',aifc:'audio/x-aiff',aiff:'audio/x-aiff',als:'audio/X-Alpha5',amc:'application/x-mpeg',ani:'application/octet-stream',apk:'application/vnd.android.package-archive',asc:'text/plain',asd:'application/astound',asf:'video/x-ms-asf',asn:'application/astound',asp:'application/x-asap',asx:'video/x-ms-asf',au:'audio/basic',avb:'application/octet-stream',avi:'video/x-msvideo',awb:'audio/amr-wb',bcpio:'application/x-bcpio',bin:'application/octet-stream',bld:'application/bld',bld2:'application/bld2',bmp:'image/bmp',bpk:'application/octet-stream',bz2:'application/x-bzip2',cal:'image/x-cals',ccn:'application/x-cnc',cco:'application/x-cocoa',cdf:'application/x-netcdf',cgi:'magnus-internal/cgi',chat:'application/x-chat',class:'application/octet-stream',clp:'application/x-msclip',cmx:'application/x-cmx',co:'application/x-cult3d-object',cod:'image/cis-cod',cpio:'application/x-cpio',cpt:'application/mac-compactpro',crd:'application/x-mscardfile',csh:'application/x-csh',csm:'chemical/x-csml',csml:'chemical/x-csml',css:'text/css',cur:'application/octet-stream',dcm:'x-lml/x-evm',dcr:'application/x-director',dcx:'image/x-dcx',dhtml:'text/html',dir:'application/x-director',dll:'application/octet-stream',dmg:'application/octet-stream',dms:'application/octet-stream',doc:'application/msword',dot:'application/x-dot',dvi:'application/x-dvi',dwf:'drawing/x-dwf',dwg:'application/x-autocad',dxf:'application/x-autocad',dxr:'application/x-director',ebk:'application/x-expandedbook',emb:'chemical/x-embl-dl-nucleotide',embl:'chemical/x-embl-dl-nucleotide',eps:'application/postscript',eri:'image/x-eri',es:'audio/echospeech',esl:'audio/echospeech',etc:'application/x-earthtime',etx:'text/x-setext',evm:'x-lml/x-evm',evy:'application/x-envoy',exe:'application/octet-stream',fh4:'image/x-freehand',fh5:'image/x-freehand',fhc:'image/x-freehand',fif:'image/fif',fm:'application/x-maker',fpx:'image/x-fpx',fvi:'video/isivideo',gau:'chemical/x-gaussian-input',gca:'application/x-gca-compressed',gdb:'x-lml/x-gdb',gif:'image/gif',gps:'application/x-gps',gtar:'application/x-gtar',gz:'application/x-gzip',hdf:'application/x-hdf',hdm:'text/x-hdml',hdml:'text/x-hdml',hlp:'application/winhlp',hqx:'application/mac-binhex40',htm:'text/html',html:'text/html',hts:'text/html',ice:'x-conference/x-cooltalk',ico:'application/octet-stream',ief:'image/ief',ifm:'image/gif',ifs:'image/ifs',imy:'audio/melody',ins:'application/x-NET-Install',ips:'application/x-ipscript',ipx:'application/x-ipix',it:'audio/x-mod',itz:'audio/x-mod',ivr:'i-world/i-vrml',j2k:'image/j2k',jad:'text/vnd.sun.j2me.app-descriptor',jam:'application/x-jam',jar:'application/java-archive',jnlp:'application/x-java-jnlp-file',jpe:'image/jpeg',jpeg:'image/jpeg',jpg:'image/jpeg',jpz:'image/jpeg',js:'application/x-javascript',jwc:'application/jwc',kjx:'application/x-kjx',lak:'x-lml/x-lak',latex:'application/x-latex',lcc:'application/fastman',lcl:'application/x-digitalloca',lcr:'application/x-digitalloca',lgh:'application/lgh',lha:'application/octet-stream',lml:'x-lml/x-lml',lmlpack:'x-lml/x-lmlpack',lsf:'video/x-ms-asf',lsx:'video/x-ms-asf',lzh:'application/x-lzh',m13:'application/x-msmediaview',m14:'application/x-msmediaview',m15:'audio/x-mod',m3u:'audio/x-mpegurl',m3url:'audio/x-mpegurl',ma1:'audio/ma1',ma2:'audio/ma2',ma3:'audio/ma3',ma5:'audio/ma5',man:'application/x-troff-man',map:'magnus-internal/imagemap',mbd:'application/mbedlet',mct:'application/x-mascot',mdb:'application/x-msaccess',mdz:'audio/x-mod',me:'application/x-troff-me',mel:'text/x-vmel',mi:'application/x-mif',mid:'audio/midi',midi:'audio/midi',mif:'application/x-mif',mil:'image/x-cals',mio:'audio/x-mio',mmf:'application/x-skt-lbs',mng:'video/x-mng',mny:'application/x-msmoney',moc:'application/x-mocha',mocha:'application/x-mocha',mod:'audio/x-mod',mof:'application/x-yumekara',mol:'chemical/x-mdl-molfile',mop:'chemical/x-mopac-input',mov:'video/quicktime',movie:'video/x-sgi-movie',mp2:'audio/x-mpeg',mp3:'audio/x-mpeg',mp4:'video/mp4',mpc:'application/vnd.mpohun.certificate',mpe:'video/mpeg',mpeg:'video/mpeg',mpg:'video/mpeg',mpg4:'video/mp4',mpga:'audio/mpeg',mpn:'application/vnd.mophun.application',mpp:'application/vnd.ms-project',mps:'application/x-mapserver',mrl:'text/x-mrml',mrm:'application/x-mrm',ms:'application/x-troff-ms',mts:'application/metastream',mtx:'application/metastream',mtz:'application/metastream',mzv:'application/metastream',nar:'application/zip',nbmp:'image/nbmp',nc:'application/x-netcdf',ndb:'x-lml/x-ndb',ndwn:'application/ndwn',nif:'application/x-nif',nmz:'application/x-scream',npx:'application/x-netfpx',nsnd:'audio/nsnd',nva:'application/x-neva1',oda:'application/oda',oom:'application/x-AtlasMate-Plugin',pac:'audio/x-pac',pae:'audio/x-epac',pan:'application/x-pan',pbm:'image/x-portable-bitmap',pcx:'image/x-pcx',pda:'image/x-pda',pdb:'chemical/x-pdb',pdf:'application/pdf',pfr:'application/font-tdpfr',pgm:'image/x-portable-graymap',pict:'image/x-pict',pm:'application/x-perl',pmd:'application/x-pmd',png:'image/png',pnm:'image/x-portable-anymap',pnz:'image/png',pot:'application/vnd.ms-powerpoint',ppm:'image/x-portable-pixmap',pps:'application/vnd.ms-powerpoint',ppt:'application/vnd.ms-powerpoint',pqf:'application/x-cprplayer',pqi:'application/cprplayer',prc:'application/x-prc',proxy:'application/x-ns-proxy-autoconfig',ps:'application/postscript',ptlk:'application/listenup',pub:'application/x-mspublisher',pvx:'video/x-pv-pvx',qcp:'audio/vnd.qcelp',qt:'video/quicktime',qti:'image/x-quicktime',qtif:'image/x-quicktime',r3t:'text/vnd.rn-realtext3d',ra:'audio/x-pn-realaudio',ram:'audio/x-pn-realaudio',rar:'application/x-rar-compressed',ras:'image/x-cmu-raster',rdf:'application/rdf+xml',rf:'image/vnd.rn-realflash',rgb:'image/x-rgb',rlf:'application/x-richlink',rm:'audio/x-pn-realaudio',rmf:'audio/x-rmf',rmm:'audio/x-pn-realaudio',rmvb:'audio/x-pn-realaudio',rnx:'application/vnd.rn-realplayer',roff:'application/x-troff',rp:'image/vnd.rn-realpix',rpm:'audio/x-pn-realaudio-plugin',rt:'text/vnd.rn-realtext',rte:'x-lml/x-gps',rtf:'application/rtf',rtg:'application/metastream',rtx:'text/richtext',rv:'video/vnd.rn-realvideo',rwc:'application/x-rogerwilco',s3m:'audio/x-mod',s3z:'audio/x-mod',sca:'application/x-supercard',scd:'application/x-msschedule',sdf:'application/e-score',sea:'application/x-stuffit',sgm:'text/x-sgml',sgml:'text/x-sgml',sh:'application/x-sh',shar:'application/x-shar',shtml:'magnus-internal/parsed-html',shw:'application/presentations',si6:'image/si6',si7:'image/vnd.stiwap.sis',si9:'image/vnd.lgtwap.sis',sis:'application/vnd.symbian.install',sit:'application/x-stuffit',skd:'application/x-Koan',skm:'application/x-Koan',skp:'application/x-Koan',skt:'application/x-Koan',slc:'application/x-salsa',smd:'audio/x-smd',smi:'application/smil',smil:'application/smil',smp:'application/studiom',smz:'audio/x-smd',snd:'audio/basic',spc:'text/x-speech',spl:'application/futuresplash',spr:'application/x-sprite',sprite:'application/x-sprite',spt:'application/x-spt',src:'application/x-wais-source',stk:'application/hyperstudio',stm:'audio/x-mod',sv4cpio:'application/x-sv4cpio',sv4crc:'application/x-sv4crc',svf:'image/vnd',svg:'image/svg-xml',svh:'image/svh',svr:'x-world/x-svr',swf:'application/x-shockwave-flash',swfl:'application/x-shockwave-flash',t:'application/x-troff',tad:'application/octet-stream',talk:'text/x-speech',tar:'application/x-tar',taz:'application/x-tar',tbp:'application/x-timbuktu',tbt:'application/x-timbuktu',tcl:'application/x-tcl',tex:'application/x-tex',texi:'application/x-texinfo',texinfo:'application/x-texinfo',tgz:'application/x-tar',thm:'application/vnd.eri.thm',tif:'image/tiff',tiff:'image/tiff',tki:'application/x-tkined',tkined:'application/x-tkined',toc:'application/toc',toy:'image/toy',tr:'application/x-troff',trk:'x-lml/x-gps',trm:'application/x-msterminal',tsi:'audio/tsplayer',tsp:'application/dsptype',tsv:'text/tab-separated-values',tsv:'text/tab-separated-values',ttf:'application/octet-stream',ttz:'application/t-time',txt:'text/plain',ult:'audio/x-mod',ustar:'application/x-ustar',uu:'application/x-uuencode',uue:'application/x-uuencode',vcd:'application/x-cdlink',vcf:'text/x-vcard',vdo:'video/vdo',vib:'audio/vib',viv:'video/vivo',vivo:'video/vivo',vmd:'application/vocaltec-media-desc',vmf:'application/vocaltec-media-file',vmi:'application/x-dreamcast-vms-info',vms:'application/x-dreamcast-vms',vox:'audio/voxware',vqe:'audio/x-twinvq-plugin',vqf:'audio/x-twinvq',vql:'audio/x-twinvq',vre:'x-world/x-vream',vrml:'x-world/x-vrml',vrt:'x-world/x-vrt',vrw:'x-world/x-vream',vts:'workbook/formulaone',wav:'audio/x-wav',wax:'audio/x-ms-wax',wbmp:'image/vnd.wap.wbmp',web:'application/vnd.xara',wi:'image/wavelet',wis:'application/x-InstallShield',wm:'video/x-ms-wm',wma:'audio/x-ms-wma',wmd:'application/x-ms-wmd',wmf:'application/x-msmetafile',wml:'text/vnd.wap.wml',wmlc:'application/vnd.wap.wmlc',wmls:'text/vnd.wap.wmlscript',wmlsc:'application/vnd.wap.wmlscriptc',wmlscript:'text/vnd.wap.wmlscript',wmv:'audio/x-ms-wmv',wmx:'video/x-ms-wmx',wmz:'application/x-ms-wmz',wpng:'image/x-up-wpng',wpt:'x-lml/x-gps',wri:'application/x-mswrite',wrl:'x-world/x-vrml',wrz:'x-world/x-vrml',ws:'text/vnd.wap.wmlscript',wsc:'application/vnd.wap.wmlscriptc',wv:'video/wavelet',wvx:'video/x-ms-wvx',wxl:'application/x-wxl',xgzip:'application/x-gzip',xar:'application/vnd.xara',xbm:'image/x-xbitmap',xdm:'application/x-xdma',xdma:'application/x-xdma',xdw:'application/vnd.fujixerox.docuworks',xht:'application/xhtml+xml',xhtm:'application/xhtml+xml',xhtml:'application/xhtml+xml',xla:'application/vnd.ms-excel',xlc:'application/vnd.ms-excel',xll:'application/x-excel',xlm:'application/vnd.ms-excel',xls:'application/vnd.ms-excel',xlt:'application/vnd.ms-excel',xlw:'application/vnd.ms-excel',xm:'audio/x-mod',xml:'text/xml',xmz:'audio/x-mod',xpi:'application/x-xpinstall',xpm:'image/x-xpixmap',xsit:'text/xml',xsl:'text/xml',xul:'text/xul',xwd:'image/x-xwindowdump',xyz:'chemical/x-pdb',yz1:'application/x-yz1',z:'application/x-compress',zac:'application/x-zaurus-zac',zip:'application/zip'};
var qchar = 'yes';//快捷角色开关
var imgindex;var text;//人物自定义
var headarr = JSON.parse(JSON.stringify(sessionStorage));//头像储存
var chararr = [];//自定义角色列表
var height;//聊天记录长度
var size = (JSON.stringify(localStorage).length/1024).toFixed(0);//数据大小
if(!localStorage['heads'])localStorage['heads'] = '[{}]';
if(!localStorage['chats'])localStorage['chats'] = '[]';
if(!localStorage['mt-lang'])localStorage['mt-lang'] = 'zh_cn';
var class0 = 'common__IconButton-sc-1ojome3-0 Header__QuestionButton-sc-17b1not-3 mvcff kNOatn bold';
var class1 = 'talk__TextBox-sc-eq7cqw-4 talk__NTextBox-sc-eq7cqw-5 fWynih fYSjWX';
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
		if(parseInt(imgindex).toFixed(0) == '199')image = 'Emoji/';
		image = image+imgindex+'.webp';
		if(headarr[imgindex])image = headarr[imgindex];
		if(!headarr[imgindex] && localStorage['imgs'] == 566)
		{
			let db;
			openDB('MoeTalk').then((db =>
			{
				db = db;
				getDataByKey(db,'Custom',imgindex).then((arr =>
				{
					if(arr)
					{
						headarr[imgindex] = 'data:image/webp;base64,'+arr['val'];
						if((JSON.stringify(sessionStorage).length/1048576).toFixed(2) < 4.9)
						{
							sessionStorage[imgindex] = 'data:image/webp;base64,'+arr['val'];
						}
						else
						{
							let n = 1;
							$.each(sessionStorage,function(k,v)
							{
								if(n <= 10)sessionStorage.removeItem(k);n++;
							})
						}
					}
				}))
				closeDB(db)//关闭数据库
			}))
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
	if(height > 8192 || size > 3000)//检测聊天框宽度
	{
		$("#warning").removeAttr('hidden');//显示警告
	}
	else
	{
		$("#warning").attr('hidden','hidden');//隐藏警告
	}
}

//绘制水印
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

//图片隐写
function base64ToBlob(base64)
{
	let binary = atob(base64);
	let array = [];
	for (let i = 0; i < binary.length; i++) {
		array.push(binary.charCodeAt(i));
	}
	return new Blob([new Uint8Array(array)], { type: "image/png" });
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
function combineFiles(mainFile, hideFile, fileName) {
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
		const mainFileExt = 'png';//图片后缀
		const hideFileExt = 'json';//暗件后缀
		const dataView = new DataView(mainBuffer);
		const sepData = new TextEncoder().encode(sep + hideFileExt.padEnd(maxExtLength, ' '));
		const targetData = new Uint8Array(mainData.length + sepData.length + hideData.length);
		targetData.set(mainData, 0);
		targetData.set(sepData, mainData.length);
		targetData.set(hideData, mainData.length + sepData.length);
		const blob = new Blob([targetData], { type: mimeMap[mainFileExt] });
		//downloadBlob(blob, fileName+'.'+mainFileExt);
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.download = fileName+'.'+mainFileExt;
		a.href = url;
		a.click();
	});
}

//判断是否为JSON
function isJSON(str) {
    if (typeof str != 'string' || str.indexOf("[") > -1) { // 1、传入值必须是 字符串
        //console.log('It is not a string! [' + str + ']')
        return false;
    }

    try {
        var obj = JSON.parse(str); // 2、仅仅通过 JSON.parse(str)，不能完全检验一个字符串是JSON格式的字符串
        if (typeof obj == 'object' && obj) {  //3、还必须是 object 类型
            //console.log('转换成功：' + str);
            return true;
        } else {
            //console.log('转换失败：' + str);
            return false;
        }

    } catch (e) {
        //console.log('error：[' + str + '] !!! ' + e);
        return false;
    }
    return false;
}
//读取自定义角色名
function loadname(no)
{
	let name;
	$.each(JSON.parse(localStorage['custom'])[0].club[0].characters,function(k,v)
	{
		if(v.no == no)
		{
			name = v.zh_cn;
		}
	})
	return name;
}