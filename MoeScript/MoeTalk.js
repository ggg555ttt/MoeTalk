//https://try8.cn/tool/format/js
var cfemoji = 'NO';//表情差分开关
var cf = 'NO';//表情差分开关
var CharFaceIndex = null;//差分映射
var batEdit = false;//批量编辑开关
//var maxHeight = browser.isFirefox && localStorage['mt-image'].split('/')[1] !== 'webp' ? 16384*2 : 16384;
var maxHeight = parseInt(localStorage['mt-maxheight']) < 16384 ? localStorage['mt-maxheight'] : 16384;
var sendChar = false//发言人开关
var chatIndex = -1//消息索引
var chatArr = []
var dataIndex = 0;
var operate = false
var copydata;
var mt_width = '';
var imageArr = [];
var imageZip = null;
function mt_height(num)
{
	if(!num)num = 1.1
	let length = ($(".Talk__CContainer-sc-1uzn66i-1").outerHeight()*num);
	length = Number(length) + ((16.6 * num) * (Math.ceil(length/maxHeight) - 1));
	return length.toFixed();
}
var mt_font = "<link rel='stylesheet' href='./MoeScript/Style/font.css' data-n-g='' id='mt-font'>";
if(!localStorage['mt-nofont'] && !browser.isFirefox)$("head").append(mt_font);//加载字体
$('.jotOXZ:eq(3)').wait(function(){$(".jotOXZ:eq(3)").click()},".jotOXZ:eq(3)")//
$(function()
{
	if($('#readme').text() === 'MikuTalk' || (month === 4 && day === 1))
	{
		$(window.location.href.indexOf('private') > 0 ? '.RightScreen__CContainer-sc-14j003s-2' : '.Talk__CContainer-sc-1uzn66i-1').css('background-color','transparent');
		$('._app__Wrapper-sc-xuvrnm-1').css('background-color','transparent');
		$("#view").click()
	}
})
$("body").on('click',function()
{
	size = parseInt((JSON.stringify(localStorage).length/1024).toFixed(0))
	height = mt_height()
	$('#size').text(height+"\n"+size+"KB");
	warning();

	if($('.visible').length === 0)
	{
		sendChar = false
		$('.addChat').prop('checked',false)
		$(".Talk__CContainer-sc-1uzn66i-1").outerWidth('inherit')
		$('#mt_watermark').hide()
		$('.hfospu').show()
		$(".dels").show()
	}
	if($(".dels:checked").length > 0)
	{
		$(".operate_copy").prop('hidden',false)
	}
	else
	{
		$(".operate_copy").prop('hidden',true)
	}
	$('.delsNum').text($(".dels:checked").length)
	
})


//标题框
$(".bIcduz").wait(function()
{
	height = mt_height()
	$(".bIcduz").after("<span id='size' class='"+class1+"' style='white-space:pre;'><b>"+height+"\n"+size+"KB</b></span>");
	warning();
},".bIcduz")
//加载工具
$(".frVjsk").wait(function()
{
	$(".frVjsk").append(`<button class='${class0}' id='uphead' class='${class0}'><b style='color:black;'>傳</b></button><span class='tool'>上传头像<span id='cusname'></span></span><br>`);
	$(".frVjsk").append(`<button class='${class0}' id='makecus'><b style='color:red;'>創</b></button><span class='tool'>创建角色</span><br>`);
	$(".frVjsk").append(`<button class='${class0}' id='cf'><b style='color:black;'>差</b></button><span class='tool'>差分映射</span><br>`);
	$(".frVjsk").append(`<button class='${class0}' id='mt-style'><b style='color:black;'>換</b></button><span class='tool'>切换风格</span><br>`);
	$(".frVjsk").append(`<a href='https://tieba.baidu.com/p/8551808608'}.html'><button class='${class0}'><b style='color:black;'>教</b></button></a><span class='tool'>使用教程</span><br>`);
	$(".frVjsk").append(`<a href='Setting.html?${localStorage['mt-rand']}'><button class='${class0}'><b style='color:black;'>設</b></button></a><span class='tool'>设置页面</span><br>`);
},".frVjsk")
//使用说明
$('body').on('click',"#readme",function()
{
	if($('#readme').text() === 'MikuTalk')
	{
		alert('from：https://github.com/HFIProgramming/mikutap/')
	}
	else
	{
		if(confirm(`MoeTalk当前版本：${version}\nMoeTalk为基于原作者Raun0129开发的MolluTalk的个人改版\n你可以点击【确认】尝试更新版本并刷新页面`))
		{
			window.caches && caches.keys && caches.keys().then(function(keys)
			{
				let length = 0;
				keys.forEach(function(key)
				{
					length=length+1
					caches.delete(key);
				});
				if(keys.length === length)
				{
					localStorage['mt-rand'] = Math.random()
					location.reload(true)
				}
			});
		}
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
		imgindex = 'custom-'+getNowDate()
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
function mt_ChangeChar(id)
{
	chararr = JSON.parse(localStorage['mt-char'])
	if(chararr[id])
	{
		let cname = prompt(`自定义角色ID：${id}\n若不想上传头像那么则只修改角色名\n当前角色名为：`,chararr[id]);
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
		let name = prompt(`角色ID：${id}\n原名：${mt_characters[id].name[lang] ? mt_characters[id].name[lang] : id}\n你想改为什么名字？\n(为空则使用原名)`,mt_name[id] ? mt_name[id] : "");
		if(name != null && name.trim() != '')mt_name[id] = name
		else mt_name[id] ? delete mt_name[id] : ''
		localStorage['mt-name'] = JSON.stringify(mt_name)
		list()//更新列表
	}
}
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
	alert(`消息长度最好不要超过${maxHeight}\n存档体积不得超过5120KB\n此处的长度数值仅为估算，请以生成图片界面的数值为准`)

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
$('body').on('click',"#editTools",function()
{
	$(".dels").parent().css("background-color","")//
	if($('.tools').css('display') === 'none')
	{
		$('.tools').show()
		$('.dels').attr('hidden',false).next().attr('hidden',false)
	}
	else
	{
		$('.tools').hide()
		$('.operateTools').hide()
		$('.dels').attr('hidden',true).next().attr('hidden',true)
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
	if($(".dels:checked").attr('index'))$(".dels:checked")[0].scrollIntoView(!1)
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
	if(localStorage['mt-style'] === 'rgb(255,255,255)')
	{
		$(window.location.href.indexOf('private') > 0 ? '.RightScreen__CContainer-sc-14j003s-2' : '.Talk__CContainer-sc-1uzn66i-1').css('background-color','rgb(255,247,225)');
		$('._app__Wrapper-sc-xuvrnm-1').css('background-color','rgb(255,247,225)');
		$('.talk__InfoBox-sc-eq7cqw-8').css('background','transparent');
		localStorage['mt-style'] = 'rgb(255,247,225)';//transparent
	}
	else
	{
		$(window.location.href.indexOf('private') > 0 ? '.RightScreen__CContainer-sc-14j003s-2' : '.Talk__CContainer-sc-1uzn66i-1').css('background-color','rgb(255,255,255)');
		$('._app__Wrapper-sc-xuvrnm-1').css('background-color','rgb(255,255,255)');
		$('.talk__InfoBox-sc-eq7cqw-8').css('background','rgb(220,229,232)');
		localStorage['mt-style'] = 'rgb(255,255,255)';//
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
		let arr = [];
		let json = [];
		let length = 0;
		let time = new Date(); 
		let year = time.getFullYear(); // 年
		let month = time.getMonth() + 1; // 月
		let date = time.getDate(); // 日
		$(".dels:checked").each(function()
		{
			length = length+$(this).parent().outerHeight();
			arr.push(JSON.parse(localStorage['chats'])[$(this).attr('index')]);
		})

		let filename = prompt(`【截取存档】\n你一共选中了${$(".dels:checked").length}条数据\n长度大概在${length.toFixed(0)}左右\n请输入文件名：`);
		if(filename !== null && filename.trim() !== '')
		{
			json[0] = {};
			json[0]['title'] = filename;
			json[0]['nickname'] = '截取存档'+length.toFixed(0);
			json[0]['date'] = `${year}-${month}-${date}`
			json[0]['replyNo'] = JSON.parse(localStorage['replyNo']);
			json[0]['replyGroup'] = JSON.parse(localStorage['replyNo']);
			json[1] = JSON.parse(JSON.stringify(arr));
			download_txt(`${filename}-MoeTalk截取存档${year}_${month}_${date}-长度${length.toFixed(0)}.json`,JSON.stringify(json));
		}
	}
	else
	{
		alert('你没有选中数据！')
	}
});
$("body").on('click',".operate",function()
{
	if($('.operateTools').css('display') === 'none')
	{
		$('.operateTools').show()
	}
	else
	{
		$('.operateTools').hide()
	}
});
//rgb(136, 204, 204)
//rgb(139, 187, 233)