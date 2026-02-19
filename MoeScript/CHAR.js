/*@MoeScript/CHAR.js@*/
var mt_char = false//自定义角色数据
var mt_chars = false//自定义角色列表
var mt_schars = false//临时角色列表
var mt_clubs = []//自定义社团列表
var char_info = {}//角色信息
var saveClub = true;//社团保存开关
var 选择角色 = true;//快捷角色开关
var mt_schar = {}//临时角色数据
var CHAR_CharList = []
var mt_head = {}
//读取头像
function loadhead(id,img)
{
	if(id == 0 || img == 1)return `${href}MoeData/Ui/you.webp`;//主角
	if(img.startsWith('custom-') || img.startsWith('CharFace-') || img.startsWith('Emoji-'))return img
	return `${href}GameData/${mt_settings['选择游戏']}/Char/${img.replace('_Collection','_BG')}.webp`;
}
function loadname(id,index,play)
{
	if(!mt_characters)return '<br>';
	let you = {kr: "주인공",en: "Lead",jp: "主役",zh_cn: "主角",zh_tw: "主角"}
	let name = id
	let names = (play ? MMT目录.设置['人物改名'] : mt_settings['人物改名']) || {}
	
	if(mt_characters[id])
	{
		if(mt_characters[id].name[mtlang])name = mt_characters[id].name[mtlang]
		if(mt_characters[id].name.别名)name = mt_characters[id].name.别名
		if(name.split(" ")[1])name = name.split(" ")[1]
		name = name.replaceAll("-", " ").split("·")[0]
	}

	if(names[id])name = names[id];//@改名
	if(names[index])name = names[index];//@改名

	if(play &&  MMT目录.角色[id])
	{
		name = MMT目录.角色[id].name
		if(MMT目录.角色[id].names && MMT目录.角色[id].names[index])name = MMT目录.角色[id].names[index]
	}
	else
	{
		if(mt_schar[id])
		{
			name = mt_schar[id].name
			if(mt_schar[id].names && mt_schar[id].names[index])name = mt_schar[id].names[index]
		}
		if(mt_char[id])
		{
			name = mt_char[id].name
			if(mt_char[id].names && mt_char[id].names[index])name = mt_char[id].names[index]
		}
	}
	if(id == 0)name = you[mtlang]
	return name
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
			if($(this).prop('checked') === true && !mt_settings['社团列表'][club])
			{
				$(this).click();
			}
			if($(this).prop('checked') === false && mt_settings['社团列表'][club])
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
function saveclub()
{
	mt_settings['社团列表'] = {};
	$(".club:checked").each(function()
	{
		mt_settings['社团列表'][$(this).attr('value')] = 'YES'
	})
	saveStorage('设置选项',mt_settings,'local')
}
function charList(selected = !1)
{
	$('.名字').each(function()
	{
		let name = this.title.split(',')
		let id = name[0]
		let img = name[1]
		name = loadname(id,img)
		if(this.nodeName === 'BUTTON')name += mt_text['go_relationship_event'][mtlang]
		$(this).html(name)
	})
	saveClub = false;
	custom_chars()
	$('.eIEKpg:eq(0)').click();//更新列表
	if(selected)
	{
		选择角色 = selected
		let index = mt_settings.选择角色.index
		$('.jotOXZ:eq(0)').click()
		$('.jotOXZ:eq(1)').click()
		$(`.fzOyMd[title="${index}"]`).click()
		setTimeout(function()
		{
			if($('.fzOyMd.selected')[0])$('.fzOyMd.selected')[0].scrollIntoView({inline:'center'})//也许只有放在首行才会生效
		})
		
	}
	saveClub = true;
}
function custom_chars()
{
	mt_chars = []
	mt_schars = []
	let club = {}
	let char = {}
	let schar = {}
	for (let key in mt_char)
	{
		if(!mt_char[key].name)
		{
			char[key] = {}
			char[key].name = mt_char[key];
		}
		else
		{
			char[key] = mt_char[key]
		}
		if(!char[key].club)char[key].club = '自定义角色'
		mt_chars.push({
			no: key,
			name: localization(char[key].name),
			club: localization('#'+char[key].club),
			school: char[key].school ? localization(char[key].school) : localization('自定义'),
			profile: char[key].head ? char[key].head : [key],
			open: !0,//#改为默认
			momotalk: !0//#改为默认
		})
		if(char[key].club && char[key].club !== '#自定义角色')club['#'+char[key].club] = char[key].club
		mt_char[key] = char[key]
	}
	mt_clubs = Object.keys(club)
	if(mt_settings['社团列表']['临时角色'])
	{
		for (let key in mt_schar)
		{
			if(!mt_schar[key].name)
			{
				schar[key] = {}
				schar[key].name = mt_schar[key];
			}
			else
			{
				schar[key] = mt_schar[key]
			}
			if(!mt_char[key])
			{
				mt_schars.push({
					no: key,
					name: localization(schar[key].name),
					club: localization('临时角色'),
					school: schar[key].school ? localization(schar[key].school) : localization('自定义角色'),
					profile: schar[key].head ? schar[key].head : [key],
					open: !0,//#改为默认
					momotalk: !0//#改为默认
				})
			}
			mt_schar[key] = schar[key]
		}
	}
}
function custom_char(info)
{
	club(true)
	char_info = {...info,names: {}}
	let names = mt_settings.人物改名;
	$('#custom-char .rightSend').prop('checked',false).prop('checked',mt_settings['右侧发言'][char_info.no])
	$('#custom-char .typeTitle').text('修改角色')
	$('#custom-char .yes').removeAttr('disabled')
	$('#custom-char .charid').html(`<span class='red'>ID：${char_info.no}</span>${mt_text.school[mtlang]}：${char_info.make ? '自定义' : char_info.school[mtlang]}<br>`)
	$('.charname').val(toString(names[char_info.no])).attr('placeholder',`${char_info.make ? '' : char_info.name[mtlang]}`)
	$('.clubname').val(`${char_info.make ? '自定义角色' : char_info.club[mtlang].replace('#','')}`).removeAttr('disabled')
	if(mt_char[char_info.no])
	{
		if(!mt_char[char_info.no].club)$('.clubname').val('自定义角色')
		names = mt_char[char_info.no].names ? mt_char[char_info.no].names : {}
	}
	else
	{
		if(!char_info.make)$('.clubname').attr('disabled','disabled')
		else
		{
			$('#custom-char .typeTitle').text('添加角色')
			$('#custom-char .yes').attr('disabled','disabled')
		}
	}
	if(char_info.club && char_info.club.id === '临时角色')
	{
		names = mt_schar[char_info.no].names ? mt_schar[char_info.no].names : {}
		$('#custom-char .typeTitle').text('临时角色（无法修改）')
		$('#custom-char .yes').attr('disabled','disabled')
	}
	if(char_info.school && char_info.school[mtlang] !== '自定义')
	{
		$('.edithead').hide()
		$('.添加头像').show()
	}
	else $('.edithead').show()

	let length = char_info.make ? 0 : char_info.profile.length
	let attr = 'width="252" height="252" decoding="async" data-nimg="1" loading="lazy" style="color: transparent; margin-right: 0.5rem;" class="common__Profile-sc-1ojome3-6 common__ProfileClick-sc-1ojome3-7 eLaCqa fuyFOl"'
	$('.heads img').remove()
	for(let i = 0; i < length; i++)
	{
		if(names[char_info.profile[i]])char_info.names[char_info.profile[i]] = names[char_info.profile[i]]
		$('.heads').append(`<img src="${loadhead(char_info.no,char_info.profile[i])}" title="${char_info.profile[i]}" ${attr} onerror="IMAGE_error(this)">`)
	}
	$('.heads img:eq(0)').click()
	if(char_info.selected || char_info.selected === 0)
	{
		let name = char_info.names[char_info.profile[char_info.selected]]
		$(`.heads img:eq(${char_info.selected})`).addClass('selected')
		$('.headinfo').show()
		$('.headname').val(toString(name))
	}
	else
	{
		// $('.headinfo').hide()
	}
	$('#custom-char').addClass('visible')
}
async function edit_char()
{
	let name = toString($('.charname').val() ? $('.charname').val() : $('.charname').attr('placeholder'))
	let club = toString($('.clubname').val().trim()).replace('#','')
	let id = char_info.no
	let index;

	if(mt_char[id] || char_info.make)
	{
		if(!mt_char[id])mt_char[id] = {}
		if(!name && char_info.make)name = 'NAMELOSS'
		if(name)mt_char[id].name = name
		if(!club)club = '自定义角色'
	
		mt_char[id].club = club
		mt_char[id].head = []
		mt_char[id].names = {}
	}
	else
	{
		if(name === $('.charname').attr('placeholder'))name = ''
		mt_settings.人物改名[id] = name
		if(!mt_settings.人物改名[id])delete mt_settings.人物改名[id]

		mt_head[id] = []
	}
	let arr = char_info.profile || []
	for(let i=0,l=arr.length;i<l;i++)
	{
		if(arr[i].startsWith('custom-'))
		{
			delete mt_settings.人物改名[arr[i]]
			await 数据操作('Ir',arr[i])
		}
	}
	arr = []
	$('.heads img').each(function()
	{
		index = $(this).attr('title')
		arr.push(index)
		if(mt_char[id])
		{
			mt_char[id].head.push(index)
			数据操作('Is',index,$(this).attr('src'))
			if(index !== char_info.no)mt_char[id].names[index] = toString(char_info.names[index])
		}
		else if(id !== index)
		{
			if(index.startsWith('custom-'))
			{
				mt_head[id].push(index)
				数据操作('Is',index,$(this).attr('src'))
			}
			mt_settings.人物改名[index] = toString(char_info.names[index])
			if(!mt_settings.人物改名[index])delete mt_settings.人物改名[index]
		}
	})
	if(mt_head[id])
	{
		CHAR_CharList[char_info.index].profile = arr
		if(!mt_head[id].length)delete mt_head[id]
	}
	$('#custom-char .rightSend').prop('checked') ? mt_settings['右侧发言'][id] = true : delete mt_settings['右侧发言'][id]
	数据操作('Ss','自定头像',mt_head)
	saveStorage('mt-char',mt_char,'local')
	saveStorage('设置选项',mt_settings,'local')
	char_info = []
	$('#custom-char').removeClass('visible')//S()
	charList(true)//更新角色
}
$.each(mt_char,function(k,v)
{
	mt_char[k].club = '自定义角色'
})

async function removeChar(n)
{
	club(true)
	if(n.club.zh_cn === '临时角色')
	{
		if(confirm(`角色名：${mt_schar[n.no].name.replaceAll("-", " ")}\nID：${n.no}\n确定将这名角色添加进自定义角色列表？`))
		{
			mt_char[n.no] = mt_schar[n.no]
			mt_char[n.no].club = n.school.zh_cn
			mt_char[n.no].school = '自定义'
			let img = await 数据操作('Tg',n.no)
			if(img)await Promise.all([数据操作('Tr',n.no),数据操作('Is',n.no,img)])
			let head = mt_schar[n.no].head || []
			for(let i=0,l=head.length;i<l;i++)
			{
				img = await 数据操作('Tg',head[i])
				if(img)await Promise.all([数据操作('Tr',head[i]),数据操作('Is',head[i],img)])
			}
			for(let key in mt_schar[n.no].emoji)
			{
				img = await 数据操作('Tg',key)
				if(img)
				{
					await Promise.all([数据操作('Tr',key),数据操作('Is',key,img)])
					if(!EMOJI_CustomEmoji[n.no])EMOJI_CustomEmoji[n.no] = {}
					EMOJI_CustomEmoji[n.no][key] = mt_schar[n.no].emoji[key]
				}
			}
			delete mt_schar[n.no];
			saveStorage('mt-char',mt_char,'local')
			saveStorage('DB_EMOJI',EMOJI_CustomEmoji,'local')
			数据操作('Ts','临时角色',mt_schar)
		}
	}
	if(n.school.zh_cn === '自定义')
	{
		if(confirm(`角色名：${mt_char[n.no].name.replaceAll("-", " ")}\nID：${n.no}\n确定要删除这名角色吗？\n删除后的角色可以从临时角色列表中找回`))
		{
			mt_schar[n.no] = mt_char[n.no]
			mt_schar[n.no].club = '临时角色'
			mt_schar[n.no].school = n.club.zh_cn.replace('#','')
			mt_schar[n.no].emoji = EMOJI_CustomEmoji[n.no] || {}
			let img = await 数据操作('Ig',n.no)
			if(img)await Promise.all([数据操作('Ir',n.no),数据操作('Ts',n.no,img)])
			let head = mt_char[n.no].head || []
			for(let i=0,l=head.length;i<l;i++)
			{
				img = await 数据操作('Ig',head[i])
				if(img)await Promise.all([数据操作('Ir',head[i]),数据操作('Ts',head[i],img)])
			}
			let emoji = Object.keys((EMOJI_CustomEmoji[n.no] || {}))
			for(let i=0,l=emoji.length;i<l;i++)
			{
				img = await 数据操作('Ig',emoji[i])
				if(img)await Promise.all([数据操作('Ir',emoji[i]),数据操作('Ts',emoji[i],img)])
			}
			delete mt_char[n.no];
			delete EMOJI_CustomEmoji[n.no]
			saveStorage('mt-char',mt_char,'local')
			saveStorage('DB_EMOJI',EMOJI_CustomEmoji,'local')
			数据操作('Ts','临时角色',mt_schar)
		}
	}
}
//创建人物
$('body').on('click',"#makecus",function()
{
	let info = {
		no: 'custom-'+getNowDate(),
		make: !0
	}
	custom_char(info)
	$('.headinfo').hide()
})
//储存头像
$("body").append("<input id='custom' hidden type='file' accept='image/*' multiple>");//添加上传标签
$("body").on('change','#custom',function()
{
	INIT_loading('开始加载')
	
	//文件改变时,获取文件,并转化为base64字符串
	let files = [...this.files,...[]]
	let type = $(this).val('').attr('title')
	let mode = $(this).attr('alt')
	files.map(function(file)
	{
		let ready = new FileReader()
		ready.readAsDataURL(file);
		ready.onload = function(e)
		{
			compress(e.target.result,type,mode,files.length)
		}
	})
})

$("body").on('click',".dropdown button",function()
{
	$(this).next().slideToggle('fast');
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
$("body").on('click',".heads img",function()
{
	let index = $(this).attr('title')
	$(".heads img").removeClass('selected')
	$(this).addClass('selected')
	$('.headinfo').show()
	
	$('.headname').val(toString(char_info.names[index])).removeAttr('disabled')
	if(index === char_info.no)
	{
		let name = $('.charname').attr('placeholder')
		if(mt_char[index])name = mt_char[index].name
		if(mt_schar[index])name = mt_schar[index].name
		if(mt_settings.人物改名[index])name = mt_settings.人物改名[index]
		$('.headname').val(char_info.make ? '' : name).attr('disabled','disabled')
		$('.删除头像').hide()
	}
	else if(index.startsWith('custom-'))$('.edithead').show()
	else
	{
		$('.edithead').hide()
		$('.添加头像').show()
	}
	$(this)[0].scrollIntoView()
});
function 加载角色()
{
	CHAR_CharList = []
	$.each(mt_characters,function(k,v)
	{
		let arr = {
			no:k,
			school:{
				zh_cn: mt_school[v.school].zh_cn ? mt_school[v.school].zh_cn : v.school,
				zh_tw: mt_school[v.school].zh_tw ? mt_school[v.school].zh_tw : v.school,
				jp: mt_school[v.school].jp ? mt_school[v.school].jp : v.school,
				en: mt_school[v.school].en ? mt_school[v.school].en : v.school,
				kr: mt_school[v.school].kr ? mt_school[v.school].kr : v.school,
				pinyin: mt_school[v.school].pinyin ? mt_school[v.school].pinyin : v.school,
				id: v.school
			},
			club:{
				zh_cn: mt_club[v.school][v.club].zh_cn ? mt_club[v.school][v.club].zh_cn : v.club,
				zh_tw: mt_club[v.school][v.club].zh_tw ? mt_club[v.school][v.club].zh_tw : v.club,
				jp: mt_club[v.school][v.club].jp ? mt_club[v.school][v.club].jp : v.club,
				en: mt_club[v.school][v.club].en ? mt_club[v.school][v.club].en : v.club,
				kr: mt_club[v.school][v.club].kr ? mt_club[v.school][v.club].kr : v.club,
				pinyin: mt_club[v.school][v.club].pinyin ? mt_club[v.school][v.club].pinyin : v.club,
				id: v.club
			},
			name:{
				zh_cn: v.name.zh_cn ? v.name.zh_cn : k,
				zh_tw: v.name.zh_tw ? v.name.zh_tw : k,
				jp: v.name.jp ? v.name.jp : k,
				en: v.name.en ? v.name.en : k,
				kr: v.name.kr ? v.name.kr : k,
				pinyin: v.name.pinyin
			},
			index: CHAR_CharList.length,//#改为默认
			profile: v.head.split(','),
			open: true,//#改为默认
			momotalk: true//#改为默认
		}
		if(mt_head[k])
		{
			for(let i=0,l=mt_head[k].length;i<l;i++)
			{
				arr.profile.push(mt_head[k][i])
			}
		}
		CHAR_CharList.push(arr)
	})
}