var href = window.location.href.split(window.location.host)[1].split('?')[0]
var version = '';
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
if(!localStorage['mt-char'] || localStorage['mt-char'][0] === '[')localStorage['mt-char'] = '{}';//自定义角色名称
if(!localStorage['mt-head'])localStorage['mt-head'] = '{}';//自定义角色头像
if(!sessionStorage['mt-char'])sessionStorage['mt-char'] = '{}';//自定义角色名称
if(!sessionStorage['mt-head'])sessionStorage['mt-head'] = '{}';//自定义角色头像
if(!localStorage['chats'] || !isJSON(localStorage['chats']))localStorage['chats'] = '[]';//聊天记录
//if(location.href.split('?')[1])localStorage['mt-lang'] = location.href.split('?')[1].replaceAll('sw.js','')
var langarr = ['zh_cn','zh_tw','jp','en','kr'];
var langid = langarr.indexOf(window.location.href.split('?')[1])
if(!localStorage['mt-lang'])localStorage['mt-lang'] = 'zh_cn';//默认语言
if(langid > -1)localStorage['mt-lang'] = langarr[langid]
if(!localStorage['mt-size'])localStorage['mt-size'] = '90%';//整体图片宽高百分比
if(!localStorage['mt-cfsize'])localStorage['mt-cfsize'] = '90%';//差分表情宽高百分比
if(!localStorage['MoeTalk'])localStorage['MoeTalk'] = 'MoeTalk';//标题
if(!localStorage['mt-order'])localStorage['mt-order'] = 'name';//排序方式
if(!localStorage['mt-style'] || localStorage['mt-style'].split(' ').length !== 1)localStorage['mt-style'] = 'rgb(255,255,255)';//默认样式
if(!localStorage['mt-name'])localStorage['mt-name'] = '{}';var mt_name = JSON.parse(localStorage['mt-name']);//改名
if(!localStorage['archive'])localStorage['archive'] = true;//自定义角色名称archive
if(!localStorage['mt-image'])localStorage['mt-image'] = 'image/png';//自定义角色名称archive
const mimeMap={'3gp':'video/3gpp',aab:'application/x-authoware-bin',aam:'application/x-authoware-map',aas:'application/x-authoware-seg',ai:'application/postscript',aif:'audio/x-aiff',aifc:'audio/x-aiff',aiff:'audio/x-aiff',als:'audio/X-Alpha5',amc:'application/x-mpeg',ani:'application/octet-stream',apk:'application/vnd.android.package-archive',asc:'text/plain',asd:'application/astound',asf:'video/x-ms-asf',asn:'application/astound',asp:'application/x-asap',asx:'video/x-ms-asf',au:'audio/basic',avb:'application/octet-stream',avi:'video/x-msvideo',awb:'audio/amr-wb',bcpio:'application/x-bcpio',bin:'application/octet-stream',bld:'application/bld',bld2:'application/bld2',bmp:'image/bmp',bpk:'application/octet-stream',bz2:'application/x-bzip2',cal:'image/x-cals',ccn:'application/x-cnc',cco:'application/x-cocoa',cdf:'application/x-netcdf',cgi:'magnus-internal/cgi',chat:'application/x-chat',class:'application/octet-stream',clp:'application/x-msclip',cmx:'application/x-cmx',co:'application/x-cult3d-object',cod:'image/cis-cod',cpio:'application/x-cpio',cpt:'application/mac-compactpro',crd:'application/x-mscardfile',csh:'application/x-csh',csm:'chemical/x-csml',csml:'chemical/x-csml',css:'text/css',cur:'application/octet-stream',dcm:'x-lml/x-evm',dcr:'application/x-director',dcx:'image/x-dcx',dhtml:'text/html',dir:'application/x-director',dll:'application/octet-stream',dmg:'application/octet-stream',dms:'application/octet-stream',doc:'application/msword',dot:'application/x-dot',dvi:'application/x-dvi',dwf:'drawing/x-dwf',dwg:'application/x-autocad',dxf:'application/x-autocad',dxr:'application/x-director',ebk:'application/x-expandedbook',emb:'chemical/x-embl-dl-nucleotide',embl:'chemical/x-embl-dl-nucleotide',eps:'application/postscript',eri:'image/x-eri',es:'audio/echospeech',esl:'audio/echospeech',etc:'application/x-earthtime',etx:'text/x-setext',evm:'x-lml/x-evm',evy:'application/x-envoy',exe:'application/octet-stream',fh4:'image/x-freehand',fh5:'image/x-freehand',fhc:'image/x-freehand',fif:'image/fif',fm:'application/x-maker',fpx:'image/x-fpx',fvi:'video/isivideo',gau:'chemical/x-gaussian-input',gca:'application/x-gca-compressed',gdb:'x-lml/x-gdb',gif:'image/gif',gps:'application/x-gps',gtar:'application/x-gtar',gz:'application/x-gzip',hdf:'application/x-hdf',hdm:'text/x-hdml',hdml:'text/x-hdml',hlp:'application/winhlp',hqx:'application/mac-binhex40',htm:'text/html',html:'text/html',hts:'text/html',ice:'x-conference/x-cooltalk',ico:'application/octet-stream',ief:'image/ief',ifm:'image/gif',ifs:'image/ifs',imy:'audio/melody',ins:'application/x-NET-Install',ips:'application/x-ipscript',ipx:'application/x-ipix',it:'audio/x-mod',itz:'audio/x-mod',ivr:'i-world/i-vrml',j2k:'image/j2k',jad:'text/vnd.sun.j2me.app-descriptor',jam:'application/x-jam',jar:'application/java-archive',jnlp:'application/x-java-jnlp-file',jpe:'image/jpeg',jpeg:'image/jpeg',jpg:'image/jpeg',jpz:'image/jpeg',js:'application/x-javascript',jwc:'application/jwc',kjx:'application/x-kjx',lak:'x-lml/x-lak',latex:'application/x-latex',lcc:'application/fastman',lcl:'application/x-digitalloca',lcr:'application/x-digitalloca',lgh:'application/lgh',lha:'application/octet-stream',lml:'x-lml/x-lml',lmlpack:'x-lml/x-lmlpack',lsf:'video/x-ms-asf',lsx:'video/x-ms-asf',lzh:'application/x-lzh',m13:'application/x-msmediaview',m14:'application/x-msmediaview',m15:'audio/x-mod',m3u:'audio/x-mpegurl',m3url:'audio/x-mpegurl',ma1:'audio/ma1',ma2:'audio/ma2',ma3:'audio/ma3',ma5:'audio/ma5',man:'application/x-troff-man',map:'magnus-internal/imagemap',mbd:'application/mbedlet',mct:'application/x-mascot',mdb:'application/x-msaccess',mdz:'audio/x-mod',me:'application/x-troff-me',mel:'text/x-vmel',mi:'application/x-mif',mid:'audio/midi',midi:'audio/midi',mif:'application/x-mif',mil:'image/x-cals',mio:'audio/x-mio',mmf:'application/x-skt-lbs',mng:'video/x-mng',mny:'application/x-msmoney',moc:'application/x-mocha',mocha:'application/x-mocha',mod:'audio/x-mod',mof:'application/x-yumekara',mol:'chemical/x-mdl-molfile',mop:'chemical/x-mopac-input',mov:'video/quicktime',movie:'video/x-sgi-movie',mp2:'audio/x-mpeg',mp3:'audio/x-mpeg',mp4:'video/mp4',mpc:'application/vnd.mpohun.certificate',mpe:'video/mpeg',mpeg:'video/mpeg',mpg:'video/mpeg',mpg4:'video/mp4',mpga:'audio/mpeg',mpn:'application/vnd.mophun.application',mpp:'application/vnd.ms-project',mps:'application/x-mapserver',mrl:'text/x-mrml',mrm:'application/x-mrm',ms:'application/x-troff-ms',mts:'application/metastream',mtx:'application/metastream',mtz:'application/metastream',mzv:'application/metastream',nar:'application/zip',nbmp:'image/nbmp',nc:'application/x-netcdf',ndb:'x-lml/x-ndb',ndwn:'application/ndwn',nif:'application/x-nif',nmz:'application/x-scream',npx:'application/x-netfpx',nsnd:'audio/nsnd',nva:'application/x-neva1',oda:'application/oda',oom:'application/x-AtlasMate-Plugin',pac:'audio/x-pac',pae:'audio/x-epac',pan:'application/x-pan',pbm:'image/x-portable-bitmap',pcx:'image/x-pcx',pda:'image/x-pda',pdb:'chemical/x-pdb',pdf:'application/pdf',pfr:'application/font-tdpfr',pgm:'image/x-portable-graymap',pict:'image/x-pict',pm:'application/x-perl',pmd:'application/x-pmd',png:'image/png',pnm:'image/x-portable-anymap',pnz:'image/png',pot:'application/vnd.ms-powerpoint',ppm:'image/x-portable-pixmap',pps:'application/vnd.ms-powerpoint',ppt:'application/vnd.ms-powerpoint',pqf:'application/x-cprplayer',pqi:'application/cprplayer',prc:'application/x-prc',proxy:'application/x-ns-proxy-autoconfig',ps:'application/postscript',ptlk:'application/listenup',pub:'application/x-mspublisher',pvx:'video/x-pv-pvx',qcp:'audio/vnd.qcelp',qt:'video/quicktime',qti:'image/x-quicktime',qtif:'image/x-quicktime',r3t:'text/vnd.rn-realtext3d',ra:'audio/x-pn-realaudio',ram:'audio/x-pn-realaudio',rar:'application/x-rar-compressed',ras:'image/x-cmu-raster',rdf:'application/rdf+xml',rf:'image/vnd.rn-realflash',rgb:'image/x-rgb',rlf:'application/x-richlink',rm:'audio/x-pn-realaudio',rmf:'audio/x-rmf',rmm:'audio/x-pn-realaudio',rmvb:'audio/x-pn-realaudio',rnx:'application/vnd.rn-realplayer',roff:'application/x-troff',rp:'image/vnd.rn-realpix',rpm:'audio/x-pn-realaudio-plugin',rt:'text/vnd.rn-realtext',rte:'x-lml/x-gps',rtf:'application/rtf',rtg:'application/metastream',rtx:'text/richtext',rv:'video/vnd.rn-realvideo',rwc:'application/x-rogerwilco',s3m:'audio/x-mod',s3z:'audio/x-mod',sca:'application/x-supercard',scd:'application/x-msschedule',sdf:'application/e-score',sea:'application/x-stuffit',sgm:'text/x-sgml',sgml:'text/x-sgml',sh:'application/x-sh',shar:'application/x-shar',shtml:'magnus-internal/parsed-html',shw:'application/presentations',si6:'image/si6',si7:'image/vnd.stiwap.sis',si9:'image/vnd.lgtwap.sis',sis:'application/vnd.symbian.install',sit:'application/x-stuffit',skd:'application/x-Koan',skm:'application/x-Koan',skp:'application/x-Koan',skt:'application/x-Koan',slc:'application/x-salsa',smd:'audio/x-smd',smi:'application/smil',smil:'application/smil',smp:'application/studiom',smz:'audio/x-smd',snd:'audio/basic',spc:'text/x-speech',spl:'application/futuresplash',spr:'application/x-sprite',sprite:'application/x-sprite',spt:'application/x-spt',src:'application/x-wais-source',stk:'application/hyperstudio',stm:'audio/x-mod',sv4cpio:'application/x-sv4cpio',sv4crc:'application/x-sv4crc',svf:'image/vnd',svg:'image/svg-xml',svh:'image/svh',svr:'x-world/x-svr',swf:'application/x-shockwave-flash',swfl:'application/x-shockwave-flash',t:'application/x-troff',tad:'application/octet-stream',talk:'text/x-speech',tar:'application/x-tar',taz:'application/x-tar',tbp:'application/x-timbuktu',tbt:'application/x-timbuktu',tcl:'application/x-tcl',tex:'application/x-tex',texi:'application/x-texinfo',texinfo:'application/x-texinfo',tgz:'application/x-tar',thm:'application/vnd.eri.thm',tif:'image/tiff',tiff:'image/tiff',tki:'application/x-tkined',tkined:'application/x-tkined',toc:'application/toc',toy:'image/toy',tr:'application/x-troff',trk:'x-lml/x-gps',trm:'application/x-msterminal',tsi:'audio/tsplayer',tsp:'application/dsptype',tsv:'text/tab-separated-values',tsv:'text/tab-separated-values',ttf:'application/octet-stream',ttz:'application/t-time',txt:'text/plain',ult:'audio/x-mod',ustar:'application/x-ustar',uu:'application/x-uuencode',uue:'application/x-uuencode',vcd:'application/x-cdlink',vcf:'text/x-vcard',vdo:'video/vdo',vib:'audio/vib',viv:'video/vivo',vivo:'video/vivo',vmd:'application/vocaltec-media-desc',vmf:'application/vocaltec-media-file',vmi:'application/x-dreamcast-vms-info',vms:'application/x-dreamcast-vms',vox:'audio/voxware',vqe:'audio/x-twinvq-plugin',vqf:'audio/x-twinvq',vql:'audio/x-twinvq',vre:'x-world/x-vream',vrml:'x-world/x-vrml',vrt:'x-world/x-vrt',vrw:'x-world/x-vream',vts:'workbook/formulaone',wav:'audio/x-wav',wax:'audio/x-ms-wax',wbmp:'image/vnd.wap.wbmp',web:'application/vnd.xara',wi:'image/wavelet',wis:'application/x-InstallShield',wm:'video/x-ms-wm',wma:'audio/x-ms-wma',wmd:'application/x-ms-wmd',wmf:'application/x-msmetafile',wml:'text/vnd.wap.wml',wmlc:'application/vnd.wap.wmlc',wmls:'text/vnd.wap.wmlscript',wmlsc:'application/vnd.wap.wmlscriptc',wmlscript:'text/vnd.wap.wmlscript',wmv:'audio/x-ms-wmv',wmx:'video/x-ms-wmx',wmz:'application/x-ms-wmz',wpng:'image/x-up-wpng',wpt:'x-lml/x-gps',wri:'application/x-mswrite',wrl:'x-world/x-vrml',wrz:'x-world/x-vrml',ws:'text/vnd.wap.wmlscript',wsc:'application/vnd.wap.wmlscriptc',wv:'video/wavelet',wvx:'video/x-ms-wvx',wxl:'application/x-wxl',xgzip:'application/x-gzip',xar:'application/vnd.xara',xbm:'image/x-xbitmap',xdm:'application/x-xdma',xdma:'application/x-xdma',xdw:'application/vnd.fujixerox.docuworks',xht:'application/xhtml+xml',xhtm:'application/xhtml+xml',xhtml:'application/xhtml+xml',xla:'application/vnd.ms-excel',xlc:'application/vnd.ms-excel',xll:'application/x-excel',xlm:'application/vnd.ms-excel',xls:'application/vnd.ms-excel',xlt:'application/vnd.ms-excel',xlw:'application/vnd.ms-excel',xm:'audio/x-mod',xml:'text/xml',xmz:'audio/x-mod',xpi:'application/x-xpinstall',xpm:'image/x-xpixmap',xsit:'text/xml',xsl:'text/xml',xul:'text/xul',xwd:'image/x-xwindowdump',xyz:'chemical/x-pdb',yz1:'application/x-yz1',z:'application/x-compress',zac:'application/x-zaurus-zac',zip:'application/zip'};
var selectedList = 'yes';//快捷角色开关
var imgindex;var text;//人物自定义
var chararr = {};//自定义角色列表
var height;//聊天记录长度
var $$ = $;//jquery转义
var size = parseInt((JSON.stringify(localStorage).length/1024).toFixed(0));//数据大小
var CFPI = 0;//差分页码
var lang = localStorage['mt-lang'];
var clearImage = false;
var clubarr = {};
var charList = '';
if(localStorage['mt-club'])clubarr = JSON.parse(localStorage['mt-club']);//读取社团
var class0 = 'common__IconButton-sc-1ojome3-0 Header__QuestionButton-sc-17b1not-3 mvcff kNOatn bold';
var class1 = 'talk__TextBox-sc-eq7cqw-4 talk__NTextBox-sc-eq7cqw-5 fWynih fYSjWX';
imageArrL = 0
/*预定义区*/

//保存头像
function savehead(headindex,img64)
{
	let headarr = JSON.parse(localStorage['mt-head']);
	headarr[headindex] = img64;
	localStorage['mt-head'] = JSON.stringify(headarr);
	$.each(headarr,function(k,v)
	{
		if(!chararr[k])
		{
			chararr[k] = 'NAMELOSS'
			nameloss = true
		}
	})
	if(nameloss === true)localStorage['mt-char'] = JSON.stringify(chararr)
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
	if(JSON.parse(localStorage['mt-head'])[id])
	{
		return JSON.parse(localStorage['mt-head'])[id]
	}
	if(JSON.parse(sessionStorage['mt-head'])[id])
	{
		return JSON.parse(sessionStorage['mt-head'])[id]
	}
	if(closure_char[id])return `${href}Images/ClosureTalk/ba/characters/${img}.webp`;//closure头像
	if(mollu_char[id])return `${href}Images/MolluChar/${id}.${img}.webp`;//旧版头像
	if(id == 0)return `${href}Images/Ui/you.webp`;//主角
	return `${href}Images/Ui/error.webp`;//默认头像
}
function loadname(id)
{
	let you = {kr: "주인공",en: "Lead",jp: "主役",zh_cn: "主角",zh_tw: "主角"}
	let name = id.toString()
	if(mollu_char[id])name = mollu_char[id][lang]
	if(closure_char[id])name = closure_char[id][lang]
	if(mt_characters[id])
	{
		name = mt_characters[id].name[lang] ? mt_characters[id].name[lang] : id
	}

	if(name.split(" ")[1])name = name.split(" ")[1]
	name = name.replaceAll("-", " ")

	if(mt_name[id])name = mt_name[lang];//@改名
	if(sessionStorage['mt-char'] && JSON.parse(sessionStorage['mt-char'])[id])
	{
		name = JSON.parse(sessionStorage['mt-char'])[id]
	}
	if(localStorage['mt-char'] && JSON.parse(localStorage['mt-char'])[id])
	{
		name = JSON.parse(localStorage['mt-char'])[id]
	}

	if(id == 0)name = you[lang]
	return name
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
			n = localStorage['hnum'] ? localStorage['hnum'] : 300;
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
				content: '',
				file: newBase64,
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
			localStorage['mt-char'] = JSON.stringify(chararr);
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
	if(height > (maxHeight) || size > (5120*0.75))//检测聊天框宽度
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
	return new Blob([new Uint8Array(array)], { type: localStorage['mt-image'] });
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
		const mainFileExt = localStorage['mt-image'].split('/')[1];//图片后缀
		const hideFileExt = 'json';//暗件后缀
		const dataView = new DataView(mainBuffer);
		const sepData = new TextEncoder().encode(sep + hideFileExt.padEnd(maxExtLength, ' '));
		const targetData = new Uint8Array(mainData.length + sepData.length + hideData.length);
		targetData.set(mainData, 0);
		targetData.set(sepData, mainData.length);
		targetData.set(hideData, mainData.length + sepData.length);
		const blob = new Blob([targetData], { type: mimeMap[mainFileExt] });
		//downloadBlob(blob, fileName+'.'+mainFileExt);
		//blobToBase64(blob,function(e){$("[alt='download']").attr('src',`data:${localStorage['mt-image']};base64,${e}`)})//替换手动保存的图片
		blobToBase64(blob,function(e)
		{
			$(".PopupImageDownload__ImgWrapper-sc-uicakl-2").append(`<div class='imageSave'><h1>第<span class='red'>${Index}</span>/${imageArrL}张图片：</h1><img src='data:${localStorage['mt-image']};base64,${e}'></div>`)
		})
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
		index = $('.消息:eq(-1)')[0];
	}
	return index;
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
function list()
{
	club()
	$('.eIEKpg:eq(0)').click();//更新列表
	setTimeout(function(){$('.editTools').click()})
	setTimeout(function(){$('.editTools').click()})
	setTimeout(function(){selectClick(37)})
	setTimeout(function(){selectClick(39)})
}
function loaddata(json)//识别存档
{
	let josnsize = parseInt((JSON.stringify(json).length/1024).toFixed(0))
	let custom_char = {};
	let custom_head = {};
	if(!json[0] || (json[0] && !json[0].title))//错误数据
	{
		json[0] = {};
		json[1] = [];
		json[0]['title'] = '错误存档'
		json[0]['nickname'] = '无法识别的数据'
		json[0]['date'] = '强制上传会清空当前正在编辑的数据'
		
		json[0]['replyGroup'] = 0
		json[0]['replyNo'] = 0
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
		json[0]['chars'] = {}
		json[0]['chars']['selected'] = {}
		json[0]['chars']['selected']['no'] = 0
		json[0]['chars']['selected']['index'] = 1

		json[0]['chars']['selectedList'] = []
		
		$.each(json['chars'],function(k,v)
		{
			json[0]['chars']['selectedList'][k] = {}
			if(v['char_id'].split('-')[0] === 'ba')
			{
				json[0]['chars']['selectedList'][k]['no'] = v['char_id'].split('-')[1]
				json[0]['chars']['selectedList'][k]['index'] = v['img']
			}
			else if(v['char_id'].split('-')[1] === 'MT')
			{
				json[0]['chars']['selectedList'][k]['no'] = v['char_id'].split('-')[2]
				json[0]['chars']['selectedList'][k]['index'] = v['char_id'].split('-')[3]
			}
			else
			{
				json[0]['chars']['selectedList'][k]['no'] = v['char_id']
				json[0]['chars']['selectedList'][k]['index'] = v['char_id']
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
		json[0]['replyGroup'] = 0
		json[0]['replyNo'] = 0
		$.each(json['chat'],function(k,v)
		{
			json[1][k] = {};
			json[1][k]['replyNo'] = 0
			json[1][k]['replyGroup'] = 0
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
				json[1][k]['replyNo'] = Math.random()
				json[1][k]['replyGroup'] = Math.random()
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
					json[1][k]['content'] = v['content'];
					if(v['content'].indexOf('//') < 0)json[1][k]['content'] = v['content'].replace('resources/ba','Images/ClosureTalk/ba');
				}
			}

			json[1][k]['isFirst'] = false;
			json[1][k]['isRight'] = false;
			if(v.yuzutalk.avatarState === 'SHOW')json[1][k]['isFirst'] = true;
			if(v.is_breaking === true)json[1][k]['is_breaking'] = true;
		})
	}
	
	if($('#customchar').prop('checked') === true)//读取自定义角色
	{
		localStorage['mt-char'] = JSON.stringify({...JSON.parse(localStorage['mt-char']),...custom_char});
		localStorage['mt-head'] = JSON.stringify({...JSON.parse(localStorage['mt-head']),...custom_head});
		list()//更新列表
	}
	else
	{
		sessionStorage['mt-char'] = JSON.stringify({...JSON.parse(sessionStorage['mt-char']),...custom_char});
		sessionStorage['mt-head'] = JSON.stringify({...JSON.parse(sessionStorage['mt-head']),...custom_head});
		list()//更新列表
	}
	if(json[0]['chars'] && json[0]['chars']['selectedList'])charList = JSON.stringify(json[0]['chars'])
	
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
	$.each(JSON.parse(localStorage['chats']),function(k,v)
	{
		ct[k] = {};
		let id = v['sCharacter']['no'];
		let img = v['sCharacter']['index'];
		let data = 'MT-';
		if(closure_char[id])data = "ba-"
		if(id !== 0 && id.indexOf('custom-') < 0)//正常角色
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
		if(id !== 0 && id.indexOf('custom-') > -1)//自定义角色
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
	
	$.each(JSON.parse(localStorage['mt-selectedList'])['selectedList'],function(k,v)
	{
		closuretalk['chars'][k] = {}
		let id = v.no;
		let img = v.index;
		let data = 'MT-';
		if(closure_char[id])data = "ba-"
		if(id.indexOf('custom-') < 0)//正常角色
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
		if(id.indexOf('custom-') > -1)//自定义角色
		{
			closuretalk['chars'][k]['char_id'] = id;
			closuretalk['chars'][k]['img'] = 'uploaded';
		}
	})
	$.each(JSON.parse(localStorage['mt-char']),function(k,v)
	{
		custom_chars[k] = {}
		custom_chars[k]['img'] = JSON.parse(localStorage['mt-head'])[k];
		custom_chars[k]['name'] = v;
	})
	$.each(custom_chars,function(k,v)
	{
		closuretalk['custom_chars'].push({char_id:k,img:v.img,name:v.name})
	})
	let time = new Date().toLocaleString().replaceAll('/','-').replaceAll(' ','_').replaceAll(':','-');
	$$('#downImg').html('')
	download_txt('ClosureTalk转换存档'+time+'.json',JSON.stringify(closuretalk));//生成专用存档
}
function mt_title(moetalk,title,writer)
{
	$(".Talk__CContainer-sc-1uzn66i-1").outerWidth(500)
	$('#mt_watermark').show()
	if(moetalk && localStorage['watermark'] !== 'false')
	{
		if(!title)title = ''
		if(!writer)writer = ''
		$('#mt_title').text(title)
		$('#mt_writer').text(writer)
		$('.mt_watermark').text(localStorage['MoeTalk'])
		$('#mt_watermark').css('background-color',"rgb(139, 187, 233)")
	}
	else
	{
		$('#mt_title').text('')
		$('#mt_writer').text('')
		$('.mt_watermark').text('')
		if(localStorage['watermark'] === 'false')$('#mt_watermark').hide()
		$('#mt_watermark').css('background-color',localStorage['mt-style'].split(' ')[1])
	}
}
function mt_capture(L,S,I,eg,er,s,j,p,g,p,u,_)//截屏功能
{
	if(imageArr.length > 1)
	{
		let v = imageArr[0]
		$('.消息').show()
		if(v.start !== 0)$('#mt_watermark').hide()
		$('.消息').slice(0,v.start).hide()
		$('.消息').slice(v.end,$('.消息').length).hide()
		eg()($(".Talk__CContainer-sc-1uzn66i-1")[0],
		{
			logging: !1,
			allowTaint: !0,
			useCORS: !0,
			scale: S
		}).then(function(e)
		{
			imageArr.shift()
			var n, t = e.toDataURL(localStorage['mt-image']);
			let height = e.height
			let json = [];
			json[0] = {};
			json[0]['title'] = '备份存档';
			json[0]['nickname'] = 'MoeTalk';
			json[0]['date'] = (0, u._3)(!0, !0);
			json[0]['replyNo'] = JSON.parse(localStorage['replyNo']);
			json[0]['replyGroup'] = JSON.parse(localStorage['replyNo']);
			json[0]['chars'] = JSON.parse(localStorage['mt-selectedList'])//@
			json[0]['mt_char'] = JSON.parse(localStorage['mt-char']);//@自创角色
			json[0]['mt_head'] = JSON.parse(localStorage['mt-head']);//@自创头像
			json[1] = JSON.parse(localStorage['chats']);
			j(v.index), null === (n = I.current) || void 0 === n , e.toBlob(function(e)
			{
				mt_capture(L,S,I,eg,er,s,j,p,g,p,u,_)
				t = t.replace(`data:${localStorage['mt-image']};base64,`,'')
				json = localStorage['archive'] === 'true' ? JSON.stringify(json) : ''
				let title = "" !== _ ? _ : L.Z.noTitle[g]
				if(imageZip)
				{
					$(".PopupImageDownload__ImgWrapper-sc-uicakl-2").append(`<div class='imageSave'><h1>第<span class='red'>${v.index}</span>/${imageArrL}张图片：</h1><img src='data:${localStorage['mt-image']};base64,${t}'></div>`)
					imageZip.file(`MoeTalk_${title}_${v.index}_${height}.${localStorage['mt-image'].split('/')[1]}`,e);
				}
				else
				{
					combineFiles(t,json,`MoeTalk_${title}_${v.index}_${height}`,v.index);
				}
			})
		})
	}
	else
	{
		if(imageArr.length !== 0)
		{
			let v = imageArr[0]
			$('.消息').show()
			if(v.start !== 0)$('#mt_watermark').hide()
			$('.消息').slice(0,v.start).hide()
			$('.消息').slice(v.end,$('.消息').length).hide()
			eg()($(".Talk__CContainer-sc-1uzn66i-1")[0],
			{
				logging: !1,
				allowTaint: !0,
				useCORS: !0,
				scale: S
			}).then(function(e)
			{
				$('.消息').show()
				imageArr.shift()
				var n, t = e.toDataURL(localStorage['mt-image']);
				let height = e.height
				let json = [];
				json[0] = {};
				json[0]['title'] = '备份存档';
				json[0]['nickname'] = 'MoeTalk';
				json[0]['date'] = (0, u._3)(!0, !0);
				json[0]['replyNo'] = JSON.parse(localStorage['replyNo']);
				json[0]['replyGroup'] = JSON.parse(localStorage['replyNo']);
				json[0]['chars'] = JSON.parse(localStorage['mt-selectedList'])//@
				json[0]['mt_char'] = JSON.parse(localStorage['mt-char']);//@自创角色
				json[0]['mt_head'] = JSON.parse(localStorage['mt-head']);//@自创头像
				json[1] = JSON.parse(localStorage['chats']);
				j(v.index), null === (n = I.current) || void 0 === n , e.toBlob(function(e)
				{
					t = t.replace(`data:${localStorage['mt-image']};base64,`,'')
					json = localStorage['archive'] === 'true' ? JSON.stringify(json) : ''
					let title = "" !== _ ? _ : L.Z.noTitle[g]
					let str = v.start !== 0 ? `_${height}_${v.index}` : ''
					if(imageZip)
					{
						$(".PopupImageDownload__ImgWrapper-sc-uicakl-2").append(`<div class='imageSave'><h1>第<span class='red'>${v.index}</span>/${imageArrL}张图片：</h1><img src='data:${localStorage['mt-image']};base64,${t}'></div>`)
						imageZip.file(`MoeTalk_${title}_${v.index}_${height}.${localStorage['mt-image'].split('/')[1]}`,e);
						json === "" ? "" : imageZip.file(`MoeTalk_${title}.json`,json);
						imageZip.generateAsync({type:'blob'}).then(function(content)
						{
							// 下载的文件名
							var filename = `MoeTalk_${title}_${(0, u._3)(!0, !0)}.zip`;
							// 创建隐藏的可下载链接
							var eleLink = document.createElement('a');
							eleLink.download = filename;
							eleLink.style.display = 'none';
							// 下载内容转变成 blob 地址
							eleLink.href = URL.createObjectURL(content);
							// 触发点击
							document.body.appendChild(eleLink);
							eleLink.click();
							// 然后移除
							document.body.removeChild(eleLink);
							imageZip = null
						});
					}
					else
					{
						combineFiles(t,json,`MoeTalk_${title}${v.index === 1 ? '' : '_'+v.index}_${height}`,v.index);
					}
				})
			}).catch(function()
			{
				p((0, er.Y2)(
				{
					isAlert: !0,
					title: L.Z.error[g],
					ment: L.Z.error_ment[g]
				}))
			}).finally(function()
			{
				p((0, s.jh)(!1))
			});
		}
	}
}
