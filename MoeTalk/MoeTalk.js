//https://try8.cn/tool/format/js
var cfemoji = 'NO';//表情差分开关
var cf = 'NO';//表情差分开关
var CharFaceIndex = null;//差分映射
var val = '';//记录输入框值
var browser = os();//获取浏览器信息
var maxHeight = browser.isFirefox ? 16384*2 : 16384;

function mt_height()
{
	let num;
	if(browser.isMobile === true)num = 1.251;
	else num = 1.1;
	return parseInt(($(".Talk__CContainer-sc-1uzn66i-1").outerHeight()*num).toFixed(0))+80;
}

var font = "<link rel='stylesheet' href='./MoeTalk/STYLE/font.css' data-n-g=''>";//字体文件地址
if(window.location.hostname !== 'localhost' && !browser.isFirefox)
{
	font = "<link rel='stylesheet' href='./MoeTalk/STYLE/font_web.css' data-n-g=''>";//更改为网络字体
}
$("head").append(font);//加载字体

$('.jotOXZ:eq(3)').wait(function(){$(".jotOXZ:eq(3)").click()},".jotOXZ:eq(3)")//
$("body").on('keydown',function()
{
	size = parseInt((JSON.stringify(localStorage).length/1024).toFixed(0))
	height = mt_height()
	$('#size').text(height+"\n"+size+"KB");
	warning();
})
$("body").on('click',function()
{
	size = parseInt((JSON.stringify(localStorage).length/1024).toFixed(0))
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
	$(".bIcduz").after("<span id='size' class='"+class1+"' style='white-space:pre;'><b>"+height+"\n"+size+"KB</b></span>");
	$(".hXhSup").prepend("<span id='warning'><b></b></span>");
	warning();
},".bIcduz")
//加载工具
$(".frVjsk").wait(function()
{
	$(".frVjsk").append(`<button class='${class0}' id='uphead' class='${class0}'><b style='color:black;'>傳</b></button><span class='tool'>上传头像<span id='cusname'></span></span><br>`);
	$(".frVjsk").append(`<button class='${class0}' id='makecus'><b style='color:red;'>創</b></button><span class='tool'>创建角色</span><br>`);
	$(".frVjsk").append(`<button class='${class0}' id='delcus'><b style='color:red;'>刪</b></button><span class='tool'>删除角色</span><br>`);
	$(".frVjsk").append(`<button class='${class0}' id='changecus'><b style='color:red;'>改</b></button><span class='tool'>更改角色</span><input size='6' id='ccus' placeholder='输入角色ID'/><br>`);
	$(".frVjsk").append(`<button class='${class0}' id='cf'><b style='color:black;'>差</b></button><span class='tool'>差分映射</span><br>`);
	$(".frVjsk").append(`<button class='${class0}' id='mt-style'><b style='color:black;'>換</b></button><span class='tool'>切换风格</span><br>`);
	$(".frVjsk").append(`<a href='${href}Setting.html'><button class='${class0}'><b style='color:black;'>設</b></button></a><span class='tool'>设置页面</span><br>`);
},".frVjsk")
//使用说明
$('body').on('click',"#readme",function()
{
	window.caches && caches.keys && caches.keys().then(function(keys)
	{
		keys.forEach(function(key)
		{
			console.log("delete cache", key);
			caches.delete(key);
		});
	});
	if(confirm("MoeTalk当前版本："+version+"\n"+
		"MoeTalk为基于原作者Raun0129开发的MolluTalk的个人改版\n"+
		"MolluTalk的代码取得方式来自浏览器自带的Ctrl+S\n"+
		"对于代码的改动地点均用注释语句标注\n"+
		"点击【确认】将尝试更新版本并刷新页面"))
	{
		location.reload(true)
	}

});
//创建人物
$("body").append("<input id='custom' hidden type='file' accept='image/*'>");//添加上传标签
$('body').on('click',"#makecus",function()
{
	let cus = prompt("请输入角色姓名，创建成功后自动更新列表\n"+
		"如果未弹出文件上传界面，请点击最上方的【傳】字按钮");

	if(cus != null && cus.trim() != '')
	{
		cus = cus.trim();
		chararr = JSON.parse(localStorage['mt-char']);
		if(localStorage['mt-char'] === '{}')
		{
			imgindex = 1001
		}
		else
		{
			imgindex = parseInt(Object.keys(chararr).pop())+1
		}
		chararr[imgindex] = cus
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
	let id = prompt("请输入角色ID（大于0的纯数字）\n"+
	"若想批量删除请用空格分隔，例:1 2 3 4 5\n"+
	"无法删除工具自带角色");
	if(id)
	{
		let char = JSON.parse(localStorage['mt-char']);
		let head = JSON.parse(localStorage['mt-head']);
		
		$('.jotOXZ')[0].click()
		$.each(id.trim().split(" "),function(k,v)
		{
			v = parseInt(v)+1000
			if(char[v])
			{
				delete char[v];
				delete head[v];
				setTimeout(function(){$('[alt="'+v+'"]').click()})
			}
		})
		localStorage['mt-char'] = JSON.stringify(char);
		localStorage['mt-head'] = JSON.stringify(head);
		setTimeout(function(){$('.jotOXZ')[1].click()})
		list()//更新列表
		
	}
})
//修改人物
$('body').on('click',"#changecus",function()
{
	let id = $("#ccus").val().replaceAll(' ','');
	chararr = JSON.parse(localStorage['mt-char'])
	if(chararr[parseInt(id)+1000])
	{
		id = parseInt(id)+1000
		let cname = prompt("自定义角色ID："+(parseInt(id)-1000)+"\n若不想上传头像那么则只修改角色名\n当前角色名为：",chararr[id]);
		if(cname != null && cname.trim() != '')
		{
			cname = cname.trim();
			chararr[id] = cname;
			imgindex = id;
			$("#cusname").text(cname);
			localStorage['mt-char'] = JSON.stringify(chararr);//保存名字
			$("#custom").click();
			list()//更新列表
		}
	}
	if(mt_characters[id])
	{
		let name = prompt("当前人物ID："+id+"\n你想改为什么名字？\n为空则使用默认名",mt_name[id] ? mt_name[id] : "");
		if(name != null && name.trim() != '')mt_name[id] = name
		else mt_name[id] ? delete mt_name[id] : ''
		localStorage['mt-name'] = JSON.stringify(mt_name)
		list()//更新列表
	}
	if(!id)alert("请在下方输入角色ID再点击按钮！")
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
	size = parseInt((JSON.stringify(localStorage).length/1024).toFixed(0))
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
		let no = JSON.parse(localStorage['mt-selectedList'])['selected']['no'];
		CharFaceIndex = no;
		alert('你选择了差分映射功能，根据你下方被选中的角色\n其包含的差分表情会映射到你下一个选择的角色\n如果你不想映射，请再点击一遍按钮\n如果想恢复默认映射，请再点击一下被选中的头像或与之相同的角色');
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
		let no = JSON.parse(localStorage['mt-selectedList'])['selected']['no'];
		if(CharFaceIndex != no)
		{
			cfiarr[no] = CharFaceIndex;
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
			$(this).parent().css("background-color","")//
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
		else $(this).parent().css("background-color","")//
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
	$('.hfOSPu').css("background-color","")//
	if($('#delsto').attr('hidden'))
	{
		$('#delsall').attr('hidden',false)
		$('#delsto').attr('hidden',false)
		$('#rdelsall').attr('hidden',false)
		$('#cutdata').attr('hidden',false)
		$('#dels').attr('hidden',false).next().attr('hidden',false)
	}
	else
	{
		$('#delsall').attr('hidden',true)
		$('#delsto').attr('hidden',true)
		$('#rdelsall').attr('hidden',true)
		$('#cutdata').attr('hidden',true)
		$('#dels').attr('hidden',true).next().attr('hidden',true)
	}
})
//选框被选中背景色
$('body').on('change',".dels",function()
{
	if($(this).prop('checked'))$(this).parent().css("background-color","rgb(202,215,221)")//
	else $(this).parent().css("background-color","")//
})
//自动跳到被选位置
$('body').on('click',".juTGbm",function()
{
	if($(".dels:checked").attr('index'))
	{
		$(".dels:checked")[0].scrollIntoView(!1)
		notice('发送消息时会在被选中的消息上方插入新的消息',250)
	}
})
$(window).keydown(function(event)
{
	if($('#emoji').length === 0)
	{
		if(event.ctrlKey && event.which == 37)selectClick(37);
		if(event.ctrlKey && event.which == 39)selectClick(39);
	}
});
$('body').on('click',"#mt-style",function()
{
	if(localStorage['mt-style'] === 'rgb(255,247,225) rgb(255,255,255) transparent')
	{//RightScreen__CContainer-sc-14j003s-2
		$(window.location.href.indexOf('private') > 0 ? '.RightScreen__CContainer-sc-14j003s-2' : '.Talk__CContainer-sc-1uzn66i-1').css('background-color','rgb(255,255,255)');
		$('.talk__ImgBox-sc-eq7cqw-3').css('background-color','transparent');
		$('.talk__InfoBox-sc-eq7cqw-8').css('background','rgb(220,229,232)');
		localStorage['mt-style'] = 'rgb(255,255,255) transparent rgb(220,229,232)';
	}
	else
	{
		$(window.location.href.indexOf('private') > 0 ? '.RightScreen__CContainer-sc-14j003s-2' : '.Talk__CContainer-sc-1uzn66i-1').css('background-color','rgb(255,247,225)');
		$('.talk__ImgBox-sc-eq7cqw-3').css('background-color','rgb(255,255,255)');
		$('.talk__InfoBox-sc-eq7cqw-8').css('background','transparent');
		localStorage['mt-style'] = 'rgb(255,247,225) rgb(255,255,255) transparent';
	}
})

$('body').on('click',"#close",function()
{
	if(cf == 'CharFace')setTimeout(function(){$('#CharFace').click()})
	if(cf == 'Emoji')setTimeout(function(){$('[title="emoticon"]').click()})
})

$("body").on('click',".dropdown button",function()
{
	$(this).next().slideToggle('fast');
});

$(document).bind('click', function(e)
{
	var $clicked = $(e.target);
	if (!$clicked.parents().hasClass("dropdown")) $(".dropdown ul").hide();
});

$("body").on('click','.mutliSelect input[type="checkbox"]',function()
{

	var title = $(this).closest('.mutliSelect').find('input[type="checkbox"]').parent().text(),
		title = $(this).parent().text() + ",";

	var school = $(this).attr('school');
	var id = school+'/'+$(this).val();

	if($(this).is(':checked')) 
	{
		var html = '<span class="title" title="'+id+'">'+title+'</span>';
		$('.multiSel.'+school).append(html);
		$('.'+school).next().hide();
		$('.'+school).parent().css("background-color","rgb(139, 187, 233)")
	}
	else
	{
		$('span[title="'+id+'"]').remove();
		if($('.'+school).find('span').length === 0)
		{
			$('.'+school).next().show()
			$('.'+school).parent().css("background-color","")
		}
	}
});
$("body").on('click',"#cutdata",function()
{
	if($(".dels:checked").length > 0)
	{
		let filename = prompt("【截取存档】\n你一共选中了"+$(".dels:checked").length+"条数据\n请输入文件名：");
		if(filename !== null && filename.trim() !== '')
		{
			let arr = [];
			let json = []
			let time = new Date(); 
			let year = time.getFullYear(); // 年
			let month = time.getMonth() + 1; // 月
			let date = time.getDate(); // 日
			$(".dels:checked").each(function()
			{
				arr.push(JSON.parse(localStorage['chats'])[$(this).attr('index')]);
			})
			json[0] = {};
			json[0]['title'] = filename;
			json[0]['nickname'] = '截取存档';
			json[0]['date'] = `${year}-${month}-${date}`
			json[0]['replyNo'] = JSON.parse(localStorage['replyNo']);
			json[0]['replyGroup'] = JSON.parse(localStorage['replyNo']);
			json[1] = JSON.parse(JSON.stringify(arr));
			download_txt(`${filename}-MoeTalk截取存档${year}_${month}_${date}.json`,JSON.stringify(json));
			click('.gxgCGp:eq(4)')
		}
	}
	else
	{
		alert('你没有选中数据！')
	}
});