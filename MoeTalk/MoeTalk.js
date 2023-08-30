//https://try8.cn/tool/format/js
var version = '2.1';
var cfemoji = 'NO';//表情差分开关
var CharFaceIndex = null;//差分映射
var mtype = 'chat';//
var val = '';
var sm = true;
var browser = os();//获取浏览器信息
var maxHeight = browser.isFirefox ? 16384*2 : 16384;
var font = "<link rel='stylesheet' href='./MoeTalk/STYLE/font.css' data-n-g=''>";//设置字体
var $jquery = $;
var clearImage = false;
function mt_height()
{
	let num;
	if(browser.isMobile === true)num = 1.251;
	else num = 1.1;
	return parseInt(($(".Talk__CContainer-sc-1uzn66i-1").outerHeight()*num).toFixed(0))+80;
}
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
	height = mt_height()
	$('#size').text(height+"\n"+size+"KB");
	warning();
})
$("body").on('click',function()
{
	size = (JSON.stringify(localStorage).length/1024).toFixed(0);
	height = mt_height()
	$('#size').text(height+"\n"+size+"KB");
	if($('.visible').length === 0)
	{
		val = '';
		clearImage = false;
	}
	warning();
})
//标题框
$(".bIcduz").wait(function()
{
	height = mt_height()
	$(".bIcduz").after("<span id='size' class='"+class1+"'><b>"+height+"\n"+size+"KB</b></span>");
	$(".hXhSup").prepend("<span id='warning'><b></b></span>");
	warning();
},".bIcduz")
//加载工具
$(".frVjsk").wait(function()
{
	$(".frVjsk").append("<button class='"+class0+"' id='uphead' class='"+class0+"'><b style='color:black;'>傳</b></button><span class='tool'>上传头像<span id='cusname'></span></span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='makecus'><b style='color:red;'>創</b></button><span class='tool'>创建角色</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='delcus'><b style='color:red;'>刪</b></button><span class='tool'>删除角色</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='changecus'><b style='color:red;'>改</b></button><span class='tool'>更改角色</span><input size='6' id='ccus' placeholder='输入角色ID'/><br>");
	//$(".frVjsk").append("<button class='"+class0+"' id='ct'><b style='color:green;'>C</b></button><span class='tool'>生成ClosureTalk存档</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='cf'><b style='color:black;'>差</b></button><span class='tool'>差分映射</span><br>");
	$(".frVjsk").append("<button class='"+class0+"' id='mt-style'><b style='color:black;'>切</b></button><span class='tool'>切换样式</span><br>");
	$(".frVjsk").append("<a href='./Setting.html'><button class='"+class0+"'><b style='color:black;'>設</b></button></a><span class='tool'>设置页面</span><br>");
},".frVjsk")
//使用说明
$('body').on('click',"#readme",function()
{
	if(confirm("MoeTalk是MotherTalk的后续版本\nMoeTalk为基于原作者Raun0129开发的MolluTalk的个人改版\n"+
		"MolluTalk的代码取得方式来自浏览器自带的Ctrl+S\n"+
		"对于代码的改动地点均用注释//与/**/标注\n"+
		"点击【确认】将跳转至反馈页面"))
	{
		window.open("https://wj.qq.com/s2/12952865/a1aa/");
	}

});
//创建人物
$("body").append("<input id='custom' hidden type='file' accept='image/*'>");//添加上传标签
$('body').on('click',"#makecus",function()
{
	let id;
	let cus = prompt("请输入角色姓名，创建成功后自动更新列表\n"+
		"如果未弹出文件上传界面，请点击最上方的【傳】字按钮");

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
		alert('此功能为上传头像的备用方案\n如无问题无需点击');
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
		$('.eIEKpg:eq(0)').click();//更新列表
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
				let cname = prompt("若不想上传头像那么则只修改角色名\n当前角色名为：",$(this)[0]['zh_cn']);
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
		$('.eIEKpg:eq(0)').click();//更新列表
	}
	else
	{
		alert('请在下方输入角色ID再点击按钮！(#后面的纯数字)')
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

//警告提醒
$('body').on('click',"#size",function()
{
	let wh = '';
	let ws = '';
	let wc = '';
	size = (JSON.stringify(localStorage).length/1024).toFixed(0);
	height = mt_height()
	if(height > (maxHeight*0.75))wh = "聊天记录长度大约为"+height+"，超过"+maxHeight+"会使生成的图片产生空白区域\n另外此数字可能并不准确，具体请以生成的图片长度为基准\n";
	if(size > (5120*0.75))ws = "存储空间体积为"+size+"KB，超过5120KB会使保存功能崩溃\n";
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
//清除冗余文件数据
$('body').on('click',"input",function()
{
	$("input[type='file']").val('')
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
			cfiarr[no+'.'+index] = CharFaceIndex;
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
//区间选择
$('body').on('click',"#delsto",function()
{
	if($(".dels:checked").length > 1)
	{
		let start = $(".dels").index($(".dels:checked:eq(0)"));
		let end = $(".dels").index($(".dels:checked:eq(-1)"));
		$(".dels").each(function(index)
		{
			if(index >= start && index <= end)
			{
				$(this).prop("checked",true);
				$(this).parent().css("background-color","rgb(202,215,221)")//
			}
		});
	}
})
//隐藏工具按钮拓展
$('body').on('click',".gxgCGp:eq(4)",function()
{
	$('.hfOSPu').removeAttr("style")//
	if($('#delsto').attr('hidden'))
	{
		$('#delsall').attr('hidden',false)
		$('#delsto').attr('hidden',false)
		$('#rdelsall').attr('hidden',false)
		$('#dels').attr('hidden',false).next().attr('hidden',false)
	}
	else
	{
		$('#delsall').attr('hidden',true)
		$('#delsto').attr('hidden',true)
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
	if(loadindex())
	{
		loadchecked().scrollIntoView(!1)
		notice('发送消息时会在被选中的消息上方插入新的消息',250)
	}
})
$(window).keydown(function(event)
{
	if(event.ctrlKey && event.which == 37)selectClick(37);
	if(event.ctrlKey && event.which == 39)selectClick(39);
});
$('body').on('click',"#mt-style",function()
{
	if(localStorage['mt-style'] === 'rgb(255,247,225) rgb(255,255,255) transparent')
	{
		$('.Talk__CContainer-sc-1uzn66i-1').css('background-color','rgb(255,255,255)');
		$('.talk__ImgBox-sc-eq7cqw-3').css('background-color','transparent');
		$('.talk__InfoBox-sc-eq7cqw-8').css('background','rgb(220,229,232)');
		localStorage['mt-style'] = 'rgb(255,255,255) transparent rgb(220,229,232)';
	}
	else
	{
		$('.Talk__CContainer-sc-1uzn66i-1').css('background-color','rgb(255,247,225)');
		$('.talk__ImgBox-sc-eq7cqw-3').css('background-color','rgb(255,255,255)');
		$('.talk__InfoBox-sc-eq7cqw-8').css('background','transparent');
		localStorage['mt-style'] = 'rgb(255,247,225) rgb(255,255,255) transparent';
	}
})






