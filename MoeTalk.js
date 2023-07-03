//https://try8.cn/tool/format/js
var version = '0.9';
$.get("https://ghproxy.com/https://raw.githubusercontent.com/ggg555ttt/MolluTalk/main/check.json",function(data) 
{
	if(data > version)alert('最新版本为：'+data+'\n请尝试清除浏览器缓存数据以访问最新版本\n如果是离线版请点击【新】按钮下载最新版')
});
var font = "<link rel='stylesheet' href='./MolluTalk_files/font_web.css' data-n-g=''>";
if(window.location.host == 'localhost' || window.location.host == '127.0.0.1')
{
	font = "<link rel='stylesheet' href='./MolluTalk_files/font.css' data-n-g=''>";
	localStorage['png'] = '.png';
}
if(!localStorage['nofont'])$("head").append(font);
$('.Header__Title-sc-17b1not-2.jZKzYg').wait(function()
{
	$(this).html("MoeTalk<span style='color:red;'>"+version+"</span>");
},'.Header__Title-sc-17b1not-2.jZKzYg')
if(window.location.host == 'ggg555ttt.gitee.io')
{
	if(!localStorage['imgs'] || localStorage['imgs'] != 566)
	{
		$.getJSON("https://ghproxy.com/https://raw.githubusercontent.com/ggg555ttt/MolluTalk/main/baimg.json",function(json) 
		{
			localStorage['imgs'] = 0;
			$.each(json,function(k,v)
			{
				let db;
				openDB('MoeTalk').then((db =>
				{
					db = db;
					let data = {key:k,val:v}
					updateDB(db,'Custom', data)
					closeDB(db)//关闭数据库
				}))
			})
		});
	}
}

$("body").on('click',function()
{
	let checkbox = "<input class='dels' type='checkbox' hidden='hidden'>";
	size = (JSON.stringify(localStorage).length/1024).toFixed(0);
	height = $(".iBfcuf").height().toFixed(0);
	$('#size').text(size);
	$('#height').text(height);
	warning();

	$(".jhinQ").each(function(){if($(this).parents('.hfOSPu').find('.dels').length == 0)$(this).parents('.hfOSPu').append(checkbox);})
	$(".evqKja").each(function(){if($(this).parent().find('.dels').length == 0)$(this).parent().append(checkbox);})
	if($('.dels').attr('hidden') != 'hidden')$('.dels').removeAttr('hidden');
})
//标题框
$(".bIcduz").wait(function()
{
	height = $(".iBfcuf").height().toFixed(0);
	$(".bIcduz").after("<span id='warning'><button class='"+class0+"'><b style='color:red;'>⚠️</b></button></a>※警告提示</span>");
	warning();
},".bIcduz")
//加载工具
$(".frVjsk").wait(function()
{
	height = $(".iBfcuf").height().toFixed(0);
	$(".frVjsk").append("<button class='"+class0+"' id='uphead' class='"+class0+"'><b style='color:black;'>傳</b></button>※<span class='tool'>手动上传头像，当前角色名：<br><span id='cusname'></span><br>");
	$(".frVjsk").append("<span class='tool'>※存储空间体积：<b id='size' style='color:red;'>"+size+"</b>KB</span><br>");
	$(".frVjsk").append("<span class='tool'>※聊天记录长度：<b id='height' style='color:red;'>"+height+"</b></span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='help'><b style='color:rgb(139,187,233);'>説</b></button>↑<span class='tool'>使用说明</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='makecus'><b style='color:red;'>創</b></button>↑<span class='tool'>创建自定义角色</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='delcus'><b style='color:red;'>刪</b></button>↑<span class='tool'>删除自定义角色</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='changecus'><b style='color:red;'>改</b></button>↑<span class='tool'>更改角色信息<br>请输入角色ID：↓</span><input size='5' id='ccus'/><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='savecus'><b style='color:rgb(139,187,233);'>備</b></button>↑<span class='tool'>备份自定义角色存档</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='loadcus'><b style='color:rgb(139,187,233);'>恢</b></button>↑<span class='tool'>恢复自定义角色存档</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='language'><b style='color:blue;'>語</b></button>↑<span class='tool'>更改语言</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='send'><b style='color:blue;'>發</b></button>↑<span class='tool'>文字发送方式</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='order'><b style='color:blue;'>序</b></button>↑<span class='tool'>角色排序方式</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='hnum'><b style='color:blue;'>質</b></button>↑<span class='tool'>设置自定义头像质量</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='font'><b style='color:blue;'>字</b></button><b>↑</b><span class='tool'>字体加载选项</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='png'><b style='color:blue;'>圖</b></button>↑<span class='tool'>切换图片读取格式</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='wmark'><b style='color:black;'>印</b></button>↑<span class='tool'>设置水印参数</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='head'><b style='color:black;'>頭</b></button>↑<span class='tool'>右侧添加头像</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='dels'><b style='color:black;'>批</b></button>↑<span class='tool'>批量删除或强制追加</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='zhui'><b style='color:black;'>追</b></button>↑<span class='tool'>强制追加选项</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='refresh'><b style='color:black;'>刷</b></button>↑<span class='tool'>刷新页面</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='clean'><b style='color:black;'>清</b></button>↑<span class='tool'>清除本地数据</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='new'><b style='color:black;'>新</b></button>↑<span class='tool'>下载最新版密码:595t</span><br>");
	
},".frVjsk")
//使用说明
$('body').on('click',".jZKzYg",function()
{
	alert("此为基于原作者Raun0129开发的MolluTalk的个人改版\n"+
		"MolluTalk的代码取得方式来自浏览器自带的Ctrl+S\n"+
		"对于代码的改动地点均已用//#与//*标注");
});
$('body').on('click',"#help",function()
{
	alert("※此为MolluTalk（作者Raun0129）的功能增强改版\n"+
		"※当前版本为"+version+"，功能如下：\n"+
		"	1.自定义角色的创造、删除、修改、备份、读取功能\n"+
		"	2.自动保存功能升级，退出浏览器时存档不会消失\n"+
		"	3.聊天记录长度和数据大小检测功能，到达一定程度会有警告提示\n"+
		"	4.语言、文字发送方式、字体加载选项的更改功能\n"+
		"	5.加入了批量删除和强制追加功能\n"+
		"	6.在线版读取速度优化。并且可以设置自定义头像图片质量\n"+
		"	7.添加了角色排序方式的更改功能和最近使用角色的标记功能\n"+
		"	8.新增了为图片添加水印功能，可以设置相关参数\n"+
		"※5.3版本使用了新的存储方式，会导致低版本的自定义头像无法正常显示，需要重新添加头像\n"+
		"※如果有其他使用建议和错误请向我反馈");
});
//上传头像
$('body').on('click',"#uphead",function()
{
	if($('#cusname').text() != '')
	{
		$("#cusname").text('');
		$("#custom").click();
	}		
	else
	{
		alert('此功能为创建自定义角色时出现无法上传头像问题的解决方案\n如无无问题请不要点击');
	}
})
//创建人物
$('body').on('click',"#makecus",function()
{
	
	let id;
	let cus = prompt("请输入角色姓名，创建成功后需刷新页面确认\n"+
		"如果名字中带空格，则聊天界面只显示第一个空格后的文字\n"+
		"例：【砂狼 白子】=【白子】、【一一 四五 一四】=【四五】\n"+
		"如果点击确认后未出现文件上传界面，请点击最上方的【傳】字按钮");

	if(cus != null && cus.trim() != '')
	{
		cus = cus.trim();
		if(cus.indexOf(' ')<0)cus = ' '+cus;
		if(localStorage['custom'])chararr = JSON.parse(localStorage['custom']);
		else//如果没有自定义角色
		{
			chararr.push({
			kr : "自创",
			en : "CUSTOM",
			jp : "自创",
			zh_cn : "自创",
			zh_tw : "自创",
			club : [{
				kr : "自创",
				en : "自创",
				jp : "自创",
				zh_cn : "自创",
				zh_tw : "自创",
				characters : []
				}]
			})
		}
		char = chararr[0]['club'][0]['characters'];

		if(char.length == 0)id = 1000;
		else id = char[char.length-1]['no']+1;

		char.push({
			no : id,
			kr : "(#"+(id-1000)+")"+cus,
			en : "(#"+(id-1000)+")"+cus,
			jp : "(#"+(id-1000)+")"+cus,
			zh_cn : "(#"+(id-1000)+")"+cus,
			zh_tw : "(#"+(id-1000)+")"+cus,
			illust : 0,
			profile : [1],
			momotalk : true,
			open : true
		})
		//console.log(chararr);
		imgindex = id+".1";
		$("#cusname").text(cus);
		$("#custom").click();
	}
})
//删除人物
$('body').on('click',"#delcus",function()
{
	let id = prompt("请输入角色ID(#后面的纯数字)\n"+
	"若想批量删除请用空格分隔，例:0 1 2 3 4 5\n"+
	"需刷新页面来确认删除是否成功");
	let arr = JSON.parse(localStorage['custom']);
	if(!isNaN(parseInt(id)))
	{
		$.each(id.trim().split(" "),function(k,cusid)
		{
			cusid = parseInt(cusid)+1000;
			$.each(arr[0]['club'][0]['characters'],function(k,i)
			{
				if($(this)[0]['no'] == cusid)arr[0]['club'][0]['characters'].splice(k,1);
			})
			delhead(cusid+'.1')
			sessionStorage.removeItem(cusid);
			localStorage['custom'] = JSON.stringify(arr);
			//console.log(arr[0]['club'][0]['characters']);
		})
	}

})
//修改人物
$('body').on('click',"#changecus",function()
{
	let id = parseInt($("#ccus").val());
	if(!isNaN(id))
	{
		chararr = JSON.parse(localStorage['custom'])
		let arr = JSON.parse(localStorage['custom'])[0]['club'][0]['characters'];
		$.each(arr,function(k,i)
		{
			if($(this)[0]['no'] == id+1000)
			{
				let cname = prompt("如果点击确认后未出现文件上传界面，请点击最上方的【傳】字按钮\n若不上传头像那么则只修改角色名\n当前角色名为：",$(this)[0]['zh_cn'].replace("(#"+id+")",'').trim());
				if(cname != null && cname.trim() != '')
				{
					cname = cname.trim();
					if(cname.indexOf(' ')<0)cname = ' '+cname;

					cname = "(#"+id+")"+cname;
					$(this)[0]['kr'] = cname;
					$(this)[0]['en'] = cname;
					$(this)[0]['jp'] = cname;
					$(this)[0]['zh_cn'] = cname;
					$(this)[0]['zh_tw'] = cname;
					
					chararr[0]['club'][0]['characters'] = arr;
					//console.log(chararr[0]['club'][0]['characters'][id]);
					imgindex = arr.indexOf($(this)[0])+1000+'.1';
					$("#cusname").text($(this)[0]['zh_cn'].replace("(#"+id+")",'').trim());
					localStorage['custom'] = JSON.stringify(chararr);//保存名字
					$("#custom").click();
				}
				
			}
		})
	}
})
//储存头像
$("body").on('change','#custom',function()
{
	//文件改变时,获取文件,并转化为base64字符串
	$("#cusname").text('');
	var file = this.files[0]
	$(this).val('')
	var ready = new FileReader()
	ready.readAsDataURL(file);
	ready.onload = function(e)
	{
		var base64Img = e.target.result;
		// console.log(base64Img)
		compress(base64Img)
	}
})
//保存人物
$('body').on('click',"#savecus",function()
{
	if(!localStorage['custom']) return false;
	alert('建议您确认所有头像都加载完毕再使用本功能，以确保保存的存档文件是完整的')
	let arr = [];
	arr[0] = localStorage['custom'];
	arr[1] = localStorage['heads'];
	// $.each(JSON.parse(localStorage['custom'])[0]['club'][0]['characters'],function(k,i)
	// {
	// 	console.log($(this)[0]['no']+'.1');
	// 	console.log(headarr[$(this)[0]['no']+'.1']);
	// 	arr[1][$(this)[0]['no']+'.1'] = headarr[$(this)[0]['no']+'.1'];
	// })
	let time = new Date().toLocaleString().replaceAll('/','-').replaceAll(' ','_').replaceAll(':','-');
	download_txt('MoeTalk自定义角色存档'+time+'.json',JSON.stringify(arr));//生成专用存档
})
//读取人物
$('body').on('click',"#loadcus",function()
{
	$("#loadcusfile").click()
})
$('body').on('change',"#loadcusfile",function()
{
	let file = this.files[0];
	let reader=new FileReader();
	reader.readAsText(file);
	reader.onload = function(e)
	{
		localStorage['custom'] = JSON.parse(this.result)[0];
		localStorage['heads'] = JSON.parse(this.result)[1];
		// $.each(JSON.parse(this.result)[1],function(k,i)
		// {
		// 	if(k.indexOf('.') == -1)k = k+'.'+1;//
		// 	savehead(k,i)
		// })
		alert('需刷新页面确认读取成功')
	}
});
//警告提醒
$('body').on('click',"#warning",function()
{
	let wh = '';
	let ws = '';
	let wc = 0;
	size = (JSON.stringify(localStorage).length/1024).toFixed(0);
	height = $(".iBfcuf").height().toFixed(0);
	if(height > 10000)wh = "聊天记录长度为"+height+"，超过10000可能会影响到聊天记录图片的生成\n";
	if(size > 3000)ws = "存储空间体积为"+size+"KB，超过5120KB会使保存功能崩溃\n";
	if(localStorage['last-viewed-version'])
	{
		if(localStorage['last-chat'])wc += localStorage['last-chat'].length
		if(localStorage['last-viewed-version'])wc += localStorage['last-viewed-version'].length
		if(localStorage['ds_state_ba'])wc += localStorage['ds_state_ba'].length
		if(localStorage['custom-characters'])wc += localStorage['custom-characters'].length
		if(localStorage['ds_state_custom'])wc += localStorage['ds_state_custom'].length
		if(localStorage['ds_state_ak'])wc += localStorage['ds_state_ak'].length
		if(localStorage['renderer'])wc += localStorage['renderer'].length
		if(localStorage['rendererConfigs'])wc += localStorage['rendererConfigs'].length;
		wc = "检测到ClosureTalk存档数据，数据大小为"+(wc/1024).toFixed(0)+"KB";
	}
	alert(wh+ws+wc);

});
//清除数据
$("body").on('click','#clean',function()
{
	let cl = '';
	if(localStorage['last-viewed-version'])cl = "※检测到ClosureTalk存档数据，如果确认的话你的ClosureTalk存档数据也会一并清除";
	let msg = prompt("此操作会将你的所有存档数据一个不留的全部清除，如果你知道自己在干什么，请输入“确认清除”后点击确定\n"+cl);
	if(msg == '确认清除')
	{

		deleteDBAll('MoeTalk');
		localStorage.clear();
		sessionStorage.clear();
		window.location.reload();//刷新页面
	}
})
//添加上传标签
$("body").append("<input id='custom' hidden type='file' accept='image/*'>");
$("body").append("<input id='loadcusfile' hidden type='file' accept='application/json'>");
//修改人名
$("body").on('click',".jRPwkT .bold",function()
									{
	$(this).attr("hidden","hidden");
	$(this).before("<input value='"+$(this).text()+"'><button class='mingzi'>确定修改</button>");
});
$("body").on('click',".mingzi",function()
{
	text = $(this).siblings("input").val();
	if(jQuery.trim(text) == 0)text = $(this).siblings("span").text();
	$(this).siblings("span").removeAttr('hidden').text(text);
	$(this).siblings("input").remove();
	$(this).remove();

});
//修改羁绊事件
$("body").on('click',".heJhGb .medium",function()
{
	$(this).attr("hidden","hidden");
	$(this).before("<input value='"+$(this).text()+"'><button class='jiban'>确定修改</button>");
});
$("body").on('click',".jiban",function()
{
	text = $(this).siblings("input").val();
	if(jQuery.trim(text) == 0)text = $(this).siblings("button").text();
	$(this).siblings("button").removeAttr('hidden').text(text);
	$(this).siblings("input").remove();
	$(this).remove();
});

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
$('body').on('click',"#language",function()
{
	let lang = prompt("请输入想更改的语言：kr(韩语)、jp(日语)、en(英语)、zh_cn(简体中文)、zh_tw(繁体中文)", "zh_cn");
	if (lang != null)
	{
		alert('更改完成，请刷新页面!');
		localStorage['mt-lang'] = lang;
	}
})
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

$('body').on('click',"#font",function()
{
	if(!localStorage['nofont']){if(confirm('是否取消加载字体文件？取消可以优化页面加载时间\n确认后请刷新页面')){localStorage['nofont'] = true;}}
	else{if(confirm('是否恢复加载字体文件？恢复可以使页面布局更美观\n确认后请刷新页面')){localStorage.removeItem('nofont');}}
})
$('body').on('click',"#order",function()
{
	if(!localStorage['order']){if(confirm('当前排序方式为默认排序\n是否将角色排序方式改为按ID排序？\n自创角色会排在最末尾')){localStorage['order'] = true;}}
	else{if(confirm('当前排序方式为按ID排序\n是否将角色排序方式还原为默认排序？')){localStorage.removeItem('order');}}
})

$('body').on('click',"#dels",function()
{
	if($(".dels:checked").length == 0)
	{
		if($('.dels').attr('hidden') == 'hidden'){$('.dels').removeAttr('hidden')}
		else{$('.dels').attr('hidden','hidden')}
	}
	if($(".dels:checked").length == 1)
	{
		let chat = prompt("您只选择了一条数据，判断为强制追加，请输入您想在该位置强制追加的文本\n"+
			"成功提交后会马上刷新页面，发言人物以你底下被选中的头像为准，可以设置差分头像\n"+
			"例：3#文本内容（3是你的差分头像序号，序号和文本内容之间需要用#分隔，可以不输入序号）");
		if(chat != null && chat.trim() != '')
		{
			let no = $(".jjPyvz .selected").attr('alt');if(no == 'sensei')no = 0;
			let zhui = 1;if(localStorage['zhui'])zhui = 0;
			chat = chat.trim().split("#");if(chat.length == 1){chat0 = 1;chat1 = chat[0];}
			if(chat.length == 2){chat0 = chat[0];if(chat0.trim() == '')chat0 = 1;chat1 = chat[1];}
			if(chat1.trim() != '' && chat.length < 3 && !isNaN(parseInt(chat0)))
			{
				let arr = JSON.parse(localStorage['chats']);
				arr.splice($('.dels').index($(".dels:checked"))+zhui,0,{type:"chat",content:chat1,replyDepth:0,replyNo:0,replyGroup:0,sCharacter:{no:parseInt(no),index:parseInt(chat0)}})
				localStorage['chats'] = JSON.stringify(arr);
				alert('追加完成，即将刷新页面')
				window.location.reload();//刷新页面
			}
		}
	}
	if($(".dels:checked").length > 1)
	{
		if(confirm('你一共选中了'+$(".dels:checked").length+'条数据\n点击确认后会马上删除并刷新页面，确定吗？'))
		{
			let arr = JSON.parse(localStorage['chats']);let i = 0;
			$(".dels:checked").each(function(){arr.splice($('.dels').index($(this))-i,1);i++})
			localStorage['chats'] = JSON.stringify(arr);
			alert('删除完成，即将刷新页面')
			window.location.reload();//刷新页面
		}
	}
})
$('body').on('click',"#zhui",function()
{
	if(!localStorage['zhui']){if(confirm('向前强制追加？')){localStorage['zhui'] = 'qian';}}
	else{if(confirm('向后强制追加？')){localStorage.removeItem('zhui');}}
})

$('body').on('click',"#refresh",function(){if(confirm('是否刷新页面？')){window.location.reload();}})//刷新页面

//屏蔽选项跳转操作
document.addEventListener("click", handler, true);
function handler(e)
{
	let class1 = "ReplyButtonBox__Span-sc-15gyqnr-2 dyLBbx medium";
	let class2 = "common__Button-sc-1ojome3-8 common__SubmitButton-sc-1ojome3-9 talk__ReplyButton-sc-eq7cqw-11 cVRiXh eIEKpg evqKja";
	if(e.target.className == class1 || e.target.className == class2){e.stopPropagation();e.preventDefault();}
}

$('body').on('click',"#wmark",function()
{
	if(confirm('是否进入水印参数设置页面？\n设置完成后返回MoeTalk生成聊天图片就可以看到带水印的图片\n带水印的图片无法自动下载，需要手动保存'))
	{
		window.location.replace(window.location.href+'wmark.html')
	}
})
$('body').on('click',"#hnum",function()
{
	if(localStorage['hnum'])num = "，当前数值为："+localStorage['hnum']
	else num = '，当前数值为300';
	let hnum = prompt("数值越大上传的头像越清晰，同时也会越占用存储空间\n建议在100到300之间取值"+num,300);
	if(!isNaN(hnum) && hnum != null && hnum.trim() != '')localStorage['hnum'] = hnum.trim()
})
$('body').on('click',"#png",function()
{
	if(!localStorage['png']){if(confirm('是否将图片格式切换为PNG格式？\n加强清晰度的同时会延长页面加载时间\n本地版默认为PNG格式')){localStorage['png'] = '.png';}}
	else{if(confirm('是否将图片格式切换为WEBP格式？\n牺牲一点清晰度的同时换来更快的加载速度\n本地版没必要使用此功能')){localStorage.removeItem('png');}}
})

$('body').on('click',".lgnIRp",function()
{
	if($(this).parent().next().is('div'))alert('不要使用追加功能，会出现错误')
})
$('body').on('click',"#new",function()
{
	window.location.replace('https://404.lanzouk.com/b018yzkaj')
})