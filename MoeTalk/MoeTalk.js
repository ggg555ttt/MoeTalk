//https://try8.cn/tool/format/js
var version = '1.4';
var cfemoji = 'NO';//表情差分开关
var CharFaceIndex = null;//差分映射
var lname = true;//临时改名
var mtype = 'chat';//临时改名
var isFirefox = os().isFirefox ? "" : "medium";
var font = "<link rel='stylesheet' href='./MoeTalk/STYLE/font.css' data-n-g=''>";//设置字体
//判断网络
if(window.location.hostname == 'ggg555ttt.gitee.io' || window.location.hostname == 'frp.freefrp.net')
{
	font = "<link rel='stylesheet' href='./MoeTalk/STYLE/font_web.css' data-n-g=''>";//更改为网络字体
}
if(!localStorage['nofont'])$("head").append(font);//加载字体
//头像缓存
if(!localStorage['imgs'] || localStorage['imgs'] != 503)
{
	$.getJSON("https://ghproxy.com/https://raw.githubusercontent.com/ggg555ttt/MolluTalk/main/MT-CharImg.JSON",function(json) 
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
//$(".gxgCGp:eq(4)").wait(function(){$(".gxgCGp:eq(4)").click()},".gxgCGp:eq(4)")//默认隐藏工具按钮
$('.jotOXZ:eq(3)').wait(function(){$(".jotOXZ:eq(3)").click()},".jotOXZ:eq(3)")//
$("body").on('keydown',function()
{
	size = (JSON.stringify(localStorage).length/1024).toFixed(0);
	height = $(".iBfcuf").height().toFixed(0);
	$('#size').text(height+"\n"+size+"KB");
	warning();
})
$("body").on('click',function()
{
	size = (JSON.stringify(localStorage).length/1024).toFixed(0);
	height = $(".iBfcuf").height().toFixed(0);
	$('#size').text(height+"\n"+size+"KB");
	warning();
})
//标题框
$(".bIcduz").wait(function()
{
	height = $(".iBfcuf").height().toFixed(0);
	$(".bIcduz").after("<span id='size' class='"+class1+"'><b>"+height+"\n"+size+"KB</b></span>");
	warning();
},".bIcduz")
//加载工具
$(".frVjsk").wait(function()
{
	height = $(".iBfcuf").height().toFixed(0);
	$(".frVjsk").append("<button class='"+class0+"' id='uphead' class='"+class0+"'><b style='color:black;'>傳</b></button><span class='tool'>手动上传头像，当前角色名：<span id='cusname'></span></span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='makecus'><b style='color:red;'>創</b></button><span class='tool'>创建角色</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='delcus'><b style='color:red;'>刪</b></button><span class='tool'>删除角色</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='changecus'><b style='color:red;'>改</b></button><span class='tool'>更改角色信息，下方输入ID：↓</span><input size='5' id='ccus'/><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='ct'><b style='color:green;'>C</b></button><span class='tool'>生成ClosureTalk存档</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='cf'><b style='color:black;'>差</b></button><span class='tool'>差分映射</span><br>");
	$(".frVjsk").append("<a href='./Setting.html'><button class='"+class0+"'><b style='color:black;'>設</b></button></a><span class='tool'>设置页面</span><br>");
	$(".frVjsk").append("<button id='delsall'>全选</button>");
	$(".frVjsk").append("<button class='"+class0+"' id='dels'><b style='color:black;'>批</b></button><span class='tool'>批量删除</span><br>");
	$(".frVjsk").append("<button id='rdelsall'>反选</button>");
},".frVjsk")
//使用说明
$('body').on('click',".jZKzYg",function()
{
	alert("MoeTalk是MotherTalk的后续版本\nMoeTalk为基于原作者Raun0129开发的MolluTalk的个人改版\n"+
		"MolluTalk的代码取得方式来自浏览器自带的Ctrl+S\n"+
		"对于代码的改动地点均用注释//与/**/标注");
});
//创建人物
$("body").append("<input id='custom' hidden type='file' accept='image/*'>");//添加上传标签
$('body').on('click',"#makecus",function()
{
	let id;
	let cus = prompt("请输入角色姓名，创建成功后点击排序按钮即可更新角色列表\n"+
		"如果名字中带空格，则聊天界面只显示第一个空格后的文字，如果想显示空格请用“-”代替\n"+
		"例：【砂狼 白子】=【白子】、【一一 四五 一四】=【四五】\n"+
		"如果点击确认后未出现文件上传界面，请点击最上方的【傳】字按钮");

	if(cus != null && cus.trim() != '')
	{
		cus = cus.trim();
		if(localStorage['custom'])chararr = JSON.parse(localStorage['custom']);
		else{chararr.push({club:[{characters:[]}]})}//如果没有自定义角色
		char = chararr[0]['club'][0]['characters'];

		if(char.length == 0)id = 1000;
		else id = char[char.length-1]['no']+1;

		char.push({
			no : id,
			zh_cn : cus
		})
		//console.log(chararr);
		imgindex = id+".1";
		$("#cusname").text(cus);
		$("#custom").click();
	}
})
$('body').on('click',"#uphead",function()//上传头像
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
//删除人物
$('body').on('click',"#delcus",function()
{
	let id = prompt("请输入角色ID(#后面的纯数字)\n"+
	"若想批量删除请用空格分隔，例:0 1 2 3 4 5\n"+
	"删除后聊天记录将无法显示该角色");
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
	let id2 = $("#ccus").val().split('@');
	if(!isNaN(parseInt(id2[1])))
	{
		if(!names[lang])names[lang] = {};
		let name = prompt("MoeTalk人物ID："+id2[1]+"，请输入TA的新名字");
		if(name != null && name.trim() != '')names[lang][id2[1]] = name;
		if(name == ' ') delete names[lang][id2[1]];
		localStorage['mt-names'] = JSON.stringify(names);

	}
	if(!isNaN(id))
	{
		chararr = JSON.parse(localStorage['custom'])
		let arr = JSON.parse(localStorage['custom'])[0]['club'][0]['characters'];
		$.each(arr,function(k,i)
		{
			if($(this)[0]['no'] == id+1000)
			{
				let cname = prompt("如果点击确认后未出现文件上传界面，请点击最上方的【傳】字按钮\n若不上传头像那么则只修改角色名\n当前角色名为：",$(this)[0]['zh_cn']);
				if(cname != null && cname.trim() != '')
				{
					cname = cname.trim();
					$(this)[0]['zh_cn'] = cname;
					chararr[0]['club'][0]['characters'] = arr;
					//console.log(chararr[0]['club'][0]['characters'][id]);
					imgindex = arr.indexOf($(this)[0])+1000+'.1';
					$("#cusname").text($(this)[0]['zh_cn'].trim());
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
$('body').on('click',"#ct",function()
{
	let arr = JSON.parse(localStorage['chats'])
	let cl = [];
	$.each(arr,function(k,v)
	{
		cl[k] = {};
		cl[k]['content'] = v['content'];
		cl[k]['is_breaking'] = false;
		if(v['sCharacter']['no'] != 0)
		{
			cl[k]['char_id'] = "mt-"+v['sCharacter']['no'];
			cl[k]['img'] = v['sCharacter']['no']+'.'+v['sCharacter']['index'];
		}
		cl[k]['yuzutalk'] = {};
		cl[k]['yuzutalk']['nameOverride'] = '';
		if(v['isFirst'] === true)cl[k]['yuzutalk']['avatarState'] = 'SHOW';
		else cl[k]['yuzutalk']['avatarState'] = 'HIDE';
		if(v['type'] == 'chat')cl[k]['yuzutalk']['type'] = 'TEXT';
		if(v['type'] == 'image')
		{
			cl[k]['content'] = "../moetalk/"+v['content'];
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
	$.each(JSON.parse(localStorage['qchar'])['selectedList'],function(k,v)
	{
		arr['chars'][k] = {};
		arr['chars'][k]['char_id'] = 'mt-'+v.no
		arr['chars'][k]['img'] = v.no+'.'+v.index
	})
	let time = new Date().toLocaleString().replaceAll('/','-').replaceAll(' ','_').replaceAll(':','-');
	download_txt('ClosureTalk转换存档'+time+'.json',JSON.stringify(arr));//生成专用存档
})

//警告提醒
$('body').on('click',"#size",function()
{
	let wh = '';
	let ws = '';
	let wc = '';
	size = (JSON.stringify(localStorage).length/1024).toFixed(0);
	height = $(".iBfcuf").height().toFixed(0);
	if(height > 8192)wh = "聊天记录长度为"+height+"，超过8192可能会影响到聊天记录图片的生成\n（视浏览器而定，在8192-16384之间，请自行测试）\n";
	if(size > 2560)ws = "存储空间体积为"+size+"KB，超过5120KB会使保存功能崩溃\n";
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
	if(wh+ws)alert(wh+ws+wc);

});
//批量删除
$('body').on('click',"#dels",function()
{
	if($(".dels:checked").length > 0)
	{
		if(confirm('此功能尚有问题，请谨慎使用\n你一共选中了'+$(".dels:checked").length+'条数据\n点击确认后会马上删除并刷新页面，确定吗？'))
		{
			let arr = JSON.parse(localStorage['chats']);let i = 0;
			$(".dels:checked").each(function(){arr.splice($(this).attr('index')-i,1);i++})
			localStorage['chats'] = JSON.stringify(arr);
			alert('删除完成，即将刷新页面')
			window.location.reload();//刷新页面
		}
	}
})
//清除冗余文件数据
$('body').on('click',"input",function()
{
	$("input[type='file']").val('')
})
//临时改名
$('body').on('click',".eLDbih",function()
{
	let span = $(this).parent().next().children('span');
	if($(this).css('display') == 'block' && lname)
	{
		span.attr("hidden","hidden");
		span.before("<input value='"+span.text()+"'>");
		lname = false;
		return;
	}
	if($(this).css('display') == 'block' && !lname)
	{
		text = span.siblings("input").val();
		if(jQuery.trim(text) == 0)text = span.text();
		span.removeAttr('hidden').text(text);
		span.siblings("input").remove();
		lname = true;
		return;
	}
})
//差分映射
$('body').on('click',"#cf",function()
{
	if(CharFaceIndex == null)
	{
		let no = JSON.parse(localStorage['qchar'])['selected']['no'];
		let index = JSON.parse(localStorage['qchar'])['selected']['index'];
		CharFaceIndex = no+'.'+index;///读取选择的角色
		alert('你选择了差分映射功能，根据你下方被选中的角色\n其包含的差分表情会映射到你下一个选择的角色\n如果你不想映射，请再点击一遍按钮\n如果想恢复默认映射，请再点击一下被选中的头像');
	}
	else
	{
		CharFaceIndex = null;
		alert('取消映射');
	}
})
$('body').on('click',".fzOyMd",function()
{
	if(CharFaceIndex != null)
	{
		if(!localStorage['CharFaceIndex'])localStorage['CharFaceIndex'] = '{}';
		let cfiarr = JSON.parse(localStorage['CharFaceIndex']);
		let no = JSON.parse(localStorage['qchar'])['selected']['no'];
		let index = JSON.parse(localStorage['qchar'])['selected']['index'];
		if(CharFaceIndex != no+'.'+index)
		{
			cfiarr[CharFaceIndex] = no+'.'+index;
			localStorage['CharFaceIndex'] = JSON.stringify(cfiarr);
			CharFaceIndex = null;
			alert('映射成功');
		}
		else
		{
			delete cfiarr[CharFaceIndex];
			localStorage['CharFaceIndex'] = JSON.stringify(cfiarr);
			CharFaceIndex = null;
			alert('已恢复默认映射');
		}
		
	}
})
//全选
$('body').on('click',"#delsall",function()
{
	if($(".dels:checked").length !== $(".dels").length)
	{
		$(".dels").each(function()
		{
			$(this).prop("checked",true);
			$(this).parent().css("background-color","rgb(202,215,221)")//
		});
	}
	else
	{
		$(".dels").each(function()
		{
			$(this).prop("checked",false);
			$(this).parent().removeAttr("style")//
		});
	}
})
//反选
$('body').on('click',"#rdelsall",function()
{
	$(".dels").each(function()
	{
		$(this).prop("checked",!$(this).prop("checked"));
		if($(this).prop('checked'))$(this).parent().css("background-color","rgb(202,215,221)")//
		else $(this).parent().removeAttr("style")//
	});
})
//隐藏工具按钮拓展
$('body').on('click',".gxgCGp:eq(4)",function()
{
	$('.hfOSPu').removeAttr("style")//
	if($('#dels').attr('hidden'))
	{
		$('#delsall').attr('hidden',false)
		$('#rdelsall').attr('hidden',false)
		$('#dels').attr('hidden',false).next().attr('hidden',false)
	}
	else
	{
		$('#delsall').attr('hidden',true)
		$('#rdelsall').attr('hidden',true)
		$('#dels').attr('hidden',true).next().attr('hidden',true)
	}
})
//选框被选中背景色
$('body').on('change',".dels",function()
{
	if($(this).prop('checked'))$(this).parent().css("background-color","rgb(202,215,221)")//
	else $(this).parent().removeAttr("style")//
})
//自动跳到被选位置
$('body').on('click',".dkwjoK",function()
{
	if(loadindex())loadchecked().scrollIntoView(!1)
})