if(window.location.href.indexOf('file:///') === 0)
{
	if(confirm('请不要直接通过资源管理器进入MoeTalk\n离线版相关进入教程请点击【确定】或【取消】访问'))
	{
		window.location.replace('https://tieba.baidu.com/p/8551808608')
	}
	else
	{
		window.location.replace('https://tieba.baidu.com/p/8440629156')
	}
}
if(!localStorage['mt-date'] || (localStorage['mt-date'] != new Date().getDate()))
{
	window.caches && caches.keys && caches.keys().then(function(keys)
	{
		keys.forEach(function(key)
		{
			caches.delete(key);
		});
		localStorage['mt-date'] = new Date().getDate(),location.reload(true)
	});
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
if(!localStorage['mt-char'])localStorage['mt-char'] = '{}';//自定义角色名称
if(!localStorage['mt-head'])localStorage['mt-head'] = '{}';//自定义角色头像
if(!localStorage['chats'])localStorage['chats'] = '[]';
if(!localStorage['mt-lang'])localStorage['mt-lang'] = 'zh_cn';//默认语言
if(!localStorage['mt-size'])localStorage['mt-size'] = '90%';//整体图片宽高百分比
if(!localStorage['mt-cfsize'])localStorage['mt-cfsize'] = '90%';//差分表情宽高百分比
if(!localStorage['MoeTalk'])localStorage['MoeTalk'] = 'MoeTalk';//标题
if(!localStorage['mt-order'])localStorage['mt-order'] = 'name';//排序方式
if(!localStorage['mt-style'])localStorage['mt-style'] = 'rgb(255,255,255) transparent rgb(220,229,232)';//默认样式
if(!localStorage['mt-name'])localStorage['mt-name'] = '{}';var mt_name = JSON.parse(localStorage['mt-name']);//改名
if(localStorage['qchar'] || localStorage['custom'])
{
	localStorage.removeItem('qchar')
	localStorage.removeItem('mt-selectedList')
	localStorage.removeItem('mt-club')
	if(localStorage['custom'] && isJSON(localStorage['custom']))
	{
		let carr = {}
		$.each(JSON.parse(localStorage['custom'])[0].club[0].characters,function(k,v)
		{
			carr[v.no] = v.zh_cn;
		})
		localStorage['mt-char'] = JSON.stringify(carr)

		let harr = {}
		$.each(JSON.parse(localStorage['heads'])[0],function(k,v)
		{
			if(k.split('.').length === 2)harr[k.split('.')[0]] = v
			if(k.split('/').length === 2)harr[k.split('/')[0]] = v
		})
		localStorage['mt-head'] = JSON.stringify(harr)
	}
	localStorage.removeItem('custom')
	localStorage.removeItem('heads')
	deleteDBAll('MoeTalk');
}
const mimeMap={'3gp':'video/3gpp',aab:'application/x-authoware-bin',aam:'application/x-authoware-map',aas:'application/x-authoware-seg',ai:'application/postscript',aif:'audio/x-aiff',aifc:'audio/x-aiff',aiff:'audio/x-aiff',als:'audio/X-Alpha5',amc:'application/x-mpeg',ani:'application/octet-stream',apk:'application/vnd.android.package-archive',asc:'text/plain',asd:'application/astound',asf:'video/x-ms-asf',asn:'application/astound',asp:'application/x-asap',asx:'video/x-ms-asf',au:'audio/basic',avb:'application/octet-stream',avi:'video/x-msvideo',awb:'audio/amr-wb',bcpio:'application/x-bcpio',bin:'application/octet-stream',bld:'application/bld',bld2:'application/bld2',bmp:'image/bmp',bpk:'application/octet-stream',bz2:'application/x-bzip2',cal:'image/x-cals',ccn:'application/x-cnc',cco:'application/x-cocoa',cdf:'application/x-netcdf',cgi:'magnus-internal/cgi',chat:'application/x-chat',class:'application/octet-stream',clp:'application/x-msclip',cmx:'application/x-cmx',co:'application/x-cult3d-object',cod:'image/cis-cod',cpio:'application/x-cpio',cpt:'application/mac-compactpro',crd:'application/x-mscardfile',csh:'application/x-csh',csm:'chemical/x-csml',csml:'chemical/x-csml',css:'text/css',cur:'application/octet-stream',dcm:'x-lml/x-evm',dcr:'application/x-director',dcx:'image/x-dcx',dhtml:'text/html',dir:'application/x-director',dll:'application/octet-stream',dmg:'application/octet-stream',dms:'application/octet-stream',doc:'application/msword',dot:'application/x-dot',dvi:'application/x-dvi',dwf:'drawing/x-dwf',dwg:'application/x-autocad',dxf:'application/x-autocad',dxr:'application/x-director',ebk:'application/x-expandedbook',emb:'chemical/x-embl-dl-nucleotide',embl:'chemical/x-embl-dl-nucleotide',eps:'application/postscript',eri:'image/x-eri',es:'audio/echospeech',esl:'audio/echospeech',etc:'application/x-earthtime',etx:'text/x-setext',evm:'x-lml/x-evm',evy:'application/x-envoy',exe:'application/octet-stream',fh4:'image/x-freehand',fh5:'image/x-freehand',fhc:'image/x-freehand',fif:'image/fif',fm:'application/x-maker',fpx:'image/x-fpx',fvi:'video/isivideo',gau:'chemical/x-gaussian-input',gca:'application/x-gca-compressed',gdb:'x-lml/x-gdb',gif:'image/gif',gps:'application/x-gps',gtar:'application/x-gtar',gz:'application/x-gzip',hdf:'application/x-hdf',hdm:'text/x-hdml',hdml:'text/x-hdml',hlp:'application/winhlp',hqx:'application/mac-binhex40',htm:'text/html',html:'text/html',hts:'text/html',ice:'x-conference/x-cooltalk',ico:'application/octet-stream',ief:'image/ief',ifm:'image/gif',ifs:'image/ifs',imy:'audio/melody',ins:'application/x-NET-Install',ips:'application/x-ipscript',ipx:'application/x-ipix',it:'audio/x-mod',itz:'audio/x-mod',ivr:'i-world/i-vrml',j2k:'image/j2k',jad:'text/vnd.sun.j2me.app-descriptor',jam:'application/x-jam',jar:'application/java-archive',jnlp:'application/x-java-jnlp-file',jpe:'image/jpeg',jpeg:'image/jpeg',jpg:'image/jpeg',jpz:'image/jpeg',js:'application/x-javascript',jwc:'application/jwc',kjx:'application/x-kjx',lak:'x-lml/x-lak',latex:'application/x-latex',lcc:'application/fastman',lcl:'application/x-digitalloca',lcr:'application/x-digitalloca',lgh:'application/lgh',lha:'application/octet-stream',lml:'x-lml/x-lml',lmlpack:'x-lml/x-lmlpack',lsf:'video/x-ms-asf',lsx:'video/x-ms-asf',lzh:'application/x-lzh',m13:'application/x-msmediaview',m14:'application/x-msmediaview',m15:'audio/x-mod',m3u:'audio/x-mpegurl',m3url:'audio/x-mpegurl',ma1:'audio/ma1',ma2:'audio/ma2',ma3:'audio/ma3',ma5:'audio/ma5',man:'application/x-troff-man',map:'magnus-internal/imagemap',mbd:'application/mbedlet',mct:'application/x-mascot',mdb:'application/x-msaccess',mdz:'audio/x-mod',me:'application/x-troff-me',mel:'text/x-vmel',mi:'application/x-mif',mid:'audio/midi',midi:'audio/midi',mif:'application/x-mif',mil:'image/x-cals',mio:'audio/x-mio',mmf:'application/x-skt-lbs',mng:'video/x-mng',mny:'application/x-msmoney',moc:'application/x-mocha',mocha:'application/x-mocha',mod:'audio/x-mod',mof:'application/x-yumekara',mol:'chemical/x-mdl-molfile',mop:'chemical/x-mopac-input',mov:'video/quicktime',movie:'video/x-sgi-movie',mp2:'audio/x-mpeg',mp3:'audio/x-mpeg',mp4:'video/mp4',mpc:'application/vnd.mpohun.certificate',mpe:'video/mpeg',mpeg:'video/mpeg',mpg:'video/mpeg',mpg4:'video/mp4',mpga:'audio/mpeg',mpn:'application/vnd.mophun.application',mpp:'application/vnd.ms-project',mps:'application/x-mapserver',mrl:'text/x-mrml',mrm:'application/x-mrm',ms:'application/x-troff-ms',mts:'application/metastream',mtx:'application/metastream',mtz:'application/metastream',mzv:'application/metastream',nar:'application/zip',nbmp:'image/nbmp',nc:'application/x-netcdf',ndb:'x-lml/x-ndb',ndwn:'application/ndwn',nif:'application/x-nif',nmz:'application/x-scream',npx:'application/x-netfpx',nsnd:'audio/nsnd',nva:'application/x-neva1',oda:'application/oda',oom:'application/x-AtlasMate-Plugin',pac:'audio/x-pac',pae:'audio/x-epac',pan:'application/x-pan',pbm:'image/x-portable-bitmap',pcx:'image/x-pcx',pda:'image/x-pda',pdb:'chemical/x-pdb',pdf:'application/pdf',pfr:'application/font-tdpfr',pgm:'image/x-portable-graymap',pict:'image/x-pict',pm:'application/x-perl',pmd:'application/x-pmd',png:'image/png',pnm:'image/x-portable-anymap',pnz:'image/png',pot:'application/vnd.ms-powerpoint',ppm:'image/x-portable-pixmap',pps:'application/vnd.ms-powerpoint',ppt:'application/vnd.ms-powerpoint',pqf:'application/x-cprplayer',pqi:'application/cprplayer',prc:'application/x-prc',proxy:'application/x-ns-proxy-autoconfig',ps:'application/postscript',ptlk:'application/listenup',pub:'application/x-mspublisher',pvx:'video/x-pv-pvx',qcp:'audio/vnd.qcelp',qt:'video/quicktime',qti:'image/x-quicktime',qtif:'image/x-quicktime',r3t:'text/vnd.rn-realtext3d',ra:'audio/x-pn-realaudio',ram:'audio/x-pn-realaudio',rar:'application/x-rar-compressed',ras:'image/x-cmu-raster',rdf:'application/rdf+xml',rf:'image/vnd.rn-realflash',rgb:'image/x-rgb',rlf:'application/x-richlink',rm:'audio/x-pn-realaudio',rmf:'audio/x-rmf',rmm:'audio/x-pn-realaudio',rmvb:'audio/x-pn-realaudio',rnx:'application/vnd.rn-realplayer',roff:'application/x-troff',rp:'image/vnd.rn-realpix',rpm:'audio/x-pn-realaudio-plugin',rt:'text/vnd.rn-realtext',rte:'x-lml/x-gps',rtf:'application/rtf',rtg:'application/metastream',rtx:'text/richtext',rv:'video/vnd.rn-realvideo',rwc:'application/x-rogerwilco',s3m:'audio/x-mod',s3z:'audio/x-mod',sca:'application/x-supercard',scd:'application/x-msschedule',sdf:'application/e-score',sea:'application/x-stuffit',sgm:'text/x-sgml',sgml:'text/x-sgml',sh:'application/x-sh',shar:'application/x-shar',shtml:'magnus-internal/parsed-html',shw:'application/presentations',si6:'image/si6',si7:'image/vnd.stiwap.sis',si9:'image/vnd.lgtwap.sis',sis:'application/vnd.symbian.install',sit:'application/x-stuffit',skd:'application/x-Koan',skm:'application/x-Koan',skp:'application/x-Koan',skt:'application/x-Koan',slc:'application/x-salsa',smd:'audio/x-smd',smi:'application/smil',smil:'application/smil',smp:'application/studiom',smz:'audio/x-smd',snd:'audio/basic',spc:'text/x-speech',spl:'application/futuresplash',spr:'application/x-sprite',sprite:'application/x-sprite',spt:'application/x-spt',src:'application/x-wais-source',stk:'application/hyperstudio',stm:'audio/x-mod',sv4cpio:'application/x-sv4cpio',sv4crc:'application/x-sv4crc',svf:'image/vnd',svg:'image/svg-xml',svh:'image/svh',svr:'x-world/x-svr',swf:'application/x-shockwave-flash',swfl:'application/x-shockwave-flash',t:'application/x-troff',tad:'application/octet-stream',talk:'text/x-speech',tar:'application/x-tar',taz:'application/x-tar',tbp:'application/x-timbuktu',tbt:'application/x-timbuktu',tcl:'application/x-tcl',tex:'application/x-tex',texi:'application/x-texinfo',texinfo:'application/x-texinfo',tgz:'application/x-tar',thm:'application/vnd.eri.thm',tif:'image/tiff',tiff:'image/tiff',tki:'application/x-tkined',tkined:'application/x-tkined',toc:'application/toc',toy:'image/toy',tr:'application/x-troff',trk:'x-lml/x-gps',trm:'application/x-msterminal',tsi:'audio/tsplayer',tsp:'application/dsptype',tsv:'text/tab-separated-values',tsv:'text/tab-separated-values',ttf:'application/octet-stream',ttz:'application/t-time',txt:'text/plain',ult:'audio/x-mod',ustar:'application/x-ustar',uu:'application/x-uuencode',uue:'application/x-uuencode',vcd:'application/x-cdlink',vcf:'text/x-vcard',vdo:'video/vdo',vib:'audio/vib',viv:'video/vivo',vivo:'video/vivo',vmd:'application/vocaltec-media-desc',vmf:'application/vocaltec-media-file',vmi:'application/x-dreamcast-vms-info',vms:'application/x-dreamcast-vms',vox:'audio/voxware',vqe:'audio/x-twinvq-plugin',vqf:'audio/x-twinvq',vql:'audio/x-twinvq',vre:'x-world/x-vream',vrml:'x-world/x-vrml',vrt:'x-world/x-vrt',vrw:'x-world/x-vream',vts:'workbook/formulaone',wav:'audio/x-wav',wax:'audio/x-ms-wax',wbmp:'image/vnd.wap.wbmp',web:'application/vnd.xara',wi:'image/wavelet',wis:'application/x-InstallShield',wm:'video/x-ms-wm',wma:'audio/x-ms-wma',wmd:'application/x-ms-wmd',wmf:'application/x-msmetafile',wml:'text/vnd.wap.wml',wmlc:'application/vnd.wap.wmlc',wmls:'text/vnd.wap.wmlscript',wmlsc:'application/vnd.wap.wmlscriptc',wmlscript:'text/vnd.wap.wmlscript',wmv:'audio/x-ms-wmv',wmx:'video/x-ms-wmx',wmz:'application/x-ms-wmz',wpng:'image/x-up-wpng',wpt:'x-lml/x-gps',wri:'application/x-mswrite',wrl:'x-world/x-vrml',wrz:'x-world/x-vrml',ws:'text/vnd.wap.wmlscript',wsc:'application/vnd.wap.wmlscriptc',wv:'video/wavelet',wvx:'video/x-ms-wvx',wxl:'application/x-wxl',xgzip:'application/x-gzip',xar:'application/vnd.xara',xbm:'image/x-xbitmap',xdm:'application/x-xdma',xdma:'application/x-xdma',xdw:'application/vnd.fujixerox.docuworks',xht:'application/xhtml+xml',xhtm:'application/xhtml+xml',xhtml:'application/xhtml+xml',xla:'application/vnd.ms-excel',xlc:'application/vnd.ms-excel',xll:'application/x-excel',xlm:'application/vnd.ms-excel',xls:'application/vnd.ms-excel',xlt:'application/vnd.ms-excel',xlw:'application/vnd.ms-excel',xm:'audio/x-mod',xml:'text/xml',xmz:'audio/x-mod',xpi:'application/x-xpinstall',xpm:'image/x-xpixmap',xsit:'text/xml',xsl:'text/xml',xul:'text/xul',xwd:'image/x-xwindowdump',xyz:'chemical/x-pdb',yz1:'application/x-yz1',z:'application/x-compress',zac:'application/x-zaurus-zac',zip:'application/zip'};
var selectedList = 'yes';//快捷角色开关
var imgindex;var text;//人物自定义
var chararr = [];//自定义角色列表
var height;//聊天记录长度
var $jquery = $;//jquery转义
var size = (JSON.stringify(localStorage).length/1024).toFixed(0);//数据大小
var CFPI = 0;//差分页码
var lang = localStorage['mt-lang'];
var clearImage = false;
var clubarr = {};
if(localStorage['mt-club'])clubarr = JSON.parse(localStorage['mt-club']);//读取社团
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
	let headarr = JSON.parse(localStorage['mt-head']);
	headarr[headindex] = img64;
	localStorage['mt-head'] = JSON.stringify(headarr);
}
//读取头像
function loadhead(id,img)
{
	let imglink = id+'/'+img
	if(mt_characters[id])
	{
		return 'char/'+mt_characters[id].school+'/'+mt_characters[id].club+'/'+id+'/'+img+'.webp'
	}
	if(JSON.parse(localStorage['mt-head'])[id])//自定义头像
	{
		return JSON.parse(localStorage['mt-head'])[id];
	}
	else//本地头像
	{
		if(id === 0)return "MoeTalk/UI/you.webp"
		else
		{
			if(oldchar[id])return 'oldchar/'+id+'.'+img+'.webp';
			return "MoeTalk/UI/error.webp"
		}
	}
}
//删除头像
function delhead(imgindex)
{
	let headarr = JSON.parse(localStorage['heads']);
	delete headarr[0][imgindex];
	localStorage['heads'] = JSON.stringify(headarr);
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
function compress(base64Img)
{
	var img = new Image();//创建一个空白图片对象
	img.src = base64Img;//图片对象添加图片地址
	img.onload = function()//图片地址加载完后执行操作
	{
		w = img.width;
		h = img.height;
		let x = 0;let y = 0;let l = w;//正方形头像
		if(w > h)x = (w-h)/2,l = h,h = w;//竖图上下居中
		else y = (h-w)/2,l = w,w = h;//横图左右居中
		n = localStorage['hnum'] ? localStorage['hnum'] : 300;
		a = Math.min(1, n / w);(w *= a), (h *= a);//最大长度不得超过300
		//开始画压缩图
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		canvas.width = w;//压缩图的宽度
		canvas.height = h;//压缩图的高度
		//ctx.drawImage(img,0,0,w,h);
		ctx.drawImage(img,x,y,l,l,0,0,w,h);
		var newBase64 = canvas.toDataURL("image/webp");

		localStorage['mt-char'] = JSON.stringify(chararr);
		savehead(imgindex,newBase64)
		$('.eIEKpg:eq(0)').click();//更新列表
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

//警告
function warning()
{
	if(height > (maxHeight*0.75) || size > (5120*0.75))//检测聊天框宽度
	{
		$("#size").css('color','red');//显示警告
	}
	else
	{
		$("#size").css('color','green');//隐藏警告
	}
}
//提示
function notice(text,time = 2000,id = "#notice")
{
	if($(id).is(":hidden") && text !=='')//
	{
		$(id).text(text).show(300).delay(time).hide(300);
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
	if (typeof str == 'string') {
	    try {
	        var obj=JSON.parse(str);
	        //console.log('转换成功：'+obj);
	        return true;
	    } catch(e) {
	        //console.log('error：'+str+'!!!'+e);
	        return false;
	    }
	}
	//console.log('It is not a string!')
 }　

//读取选择框索引
function loadindex()
{
	let i = $(".dels:checked").attr('index');
	if(i > -1)return i;
	return i;
}
function loadchecked()
{
	return $(".dels:checked")[0];
}
//选择框索引下移
function nextindex()
{
	let index = $(".dels").index($(".dels:checked"));
	if(index > -1)
	{
		$(".dels").eq(index).prop("checked",false);
		$(".dels").eq(index+1).prop("checked",true);
		$(".dels").eq(index).parent().css("background-color","")//
		$(".dels").eq(index+1).parent().css("background-color","rgb(202,215,221)")//
		index = $(".dels:checked")[0];
	}
	else
	{
		index = $('.hfOSPu:eq(-1)')[0];
	}
	return index;
}
//点击函数
function click(name)
{
	$(name).click();
}
const os = (u = window.navigator.userAgent) => {
	return {
		// 不同浏览器及终端
		isMobile:
	  !!u.match(/AppleWebKit.*Mobile/i) ||
	  !!u.match(
		/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/
	  ),
		isWechat: !!u.match(/MicroMessenger/i),
		isQQ: !!u.match(/QQ/i),
		isIos: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
		isAndroid: !!u.match(/(Android);?[\s/]+([\d.]+)?/),
		isiPhone: !!u.match(/(iPhone\sOS)\s([\d_]+)/),
		isSafari: !!u.match(/Safari/),
		isFirefox: !!u.match(/Firefox/),
		isOpera: !!u.match(/Opera/),
		isChrome: u.match(/Chrome/i) !== null &&
	  u.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) === null ?
			true : false,
		isDeskTop: (() => {
			const Agents = [
				'Android',
				'iPhone',
				'SymbianOS',
				'Windows Phone',
				'iPad',
				'iPod',
				'okhttp/3.9.1'
			];
			let flag = true;
			for (let i = 0, LEN = Agents.length; i < LEN; i++) {
				if (u.indexOf(Agents[i]) !== -1) {
					flag = false;
					break;
				}
			}
			return flag;
		})()
	};
};
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
			if($(this).prop('checked') === true && !clubarr[club])
			{
				$(this).click();
			}
			if($(this).prop('checked') === false && clubarr[club])
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