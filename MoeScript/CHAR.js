/*@MoeScript/CHAR.js@*/
var mt_char = false//自定义角色数据
var mt_chars = false//自定义角色列表
var mt_schars = false//临时角色列表
var mt_clubs = {}//自定义社团列表
var char_info = {}//角色编辑信息
var saveClub = true;//社团保存开关
var 选择角色 = true;//快捷角色开关
var mt_schar = {}//临时角色数据
var CHAR_CharList = []
var CUSTOM_CHAR = {}
var CUSTOM_HEAD = {}
var CUSTOM_NAME = {}
var 角色信息 = {info:{},name:{},group:[],charface:[]}
var mt_school = {}//学院列表
var mt_club = {}//社团列表
var id_map = [{},{}]//id索引映射表
var CustomFaceAuthor = {}//差分作者信息
var CFInfo = {}//表情差分信息
//读取头像
function loadhead(id,img)
{
	img = img || ''
	if(id == 0 || img == 1)return `${href}MoeData/Ui/you.webp`;//主角
	if(isCusImg(img))return loadImg(img)
	img = img.replace('CharID_','').replace('_Collection','_BG').toLocaleUpperCase()
	return `${href}GameData/${GAME}/Char/${img}.webp`;
}
function loadname(id,index,play)
{
	let you = {kr: "주인공",en: "Lead",jp: "主役",zh_cn: "主角",zh_tw: "主角"}
	let name = id
	let names = (play ? MMT目录.设置['人物改名'] : mt_settings['人物改名']) || {}

	if(角色信息.info[id])
	{
		name = 角色信息.name[LANG][角色信息.info[id][0][2]] || id
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
	if(id == 0)name = you[LANG]
	return name
}
function club(clear = false)
{
	if(clear === false)
	{
		$('.club').each(function()
		{
			if($(this).prop('checked') === true && !mt_settings['社团列表'][this.title+'-'+this.value])
			{
				$(this).click();
			}
			if($(this).prop('checked') === false && mt_settings['社团列表'][this.title+'-'+this.value])
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
	$('.mutliSelect').hide()
}
function saveclub()
{
	mt_settings['社团列表'] = {};
	$(".club:checked").each(function()
	{
		mt_settings['社团列表'][this.title+'-'+this.value] = 1
	})
	saveStorage('设置选项',mt_settings,'local')
}
$("body").on('click',".全选分组",function()
{
	const checkbox = $(`.mutliSelect[title="${this.title}"] .club`)
	const checked = $(`.mutliSelect[title="${this.title}"] .club:checked`)
	if(checkbox.length !== checked.length)
	{
		checkbox.each(function()
		{
			if(!this.checked)this.click()
		});
	}
	else
	{
		checkbox.each(function()
		{
			this.click()
		});
	}
});
$("body").on('click',".dropdown button",function()
{
	let css = {}
	css.display = 'flex'
	css.flexFlow = 'wrap'
	css.listStyle = 'none'
	$(this).next().slideToggle('fast').css(css);
});
$("body").on('click','.mutliSelect input[type="checkbox"]',function()
{

	let title = $(this).parent().text();
	let school = this.title;
	let club = this.value

	if($(this).is(':checked')) 
	{
		var html = `<b class="title" title="${school}"alt="${club}">${school.startsWith('💟') ? '#' : '|'}<i class="white">${title}</i></b>`
		$(`.multiSel[title="${school}"]`).append(html);
		$(`.multiSel[title="${school}"]`).prev().css('color','red');
		$(`.multiSel[title="${school}"]`).parent().css("background-color","rgb(139, 187, 233)")
	}
	else
	{
		$(`b[title="${school}"][alt="${club}"]`).remove();
		if($(`.multiSel[title="${school}"]`).find('b.title').length === 0)
		{
			$(`.multiSel[title="${school}"]`).prev().css('color','')
			$(`.multiSel[title="${school}"]`).parent().css("background-color","")
		}
	}
});
// $("body").on('click','.multiSel .title',function(e)
// {
// 	e.stopPropagation();
// 	let school = $(this).attr('title')
// 	let club = $(this).attr('alt')
// 	$(`#${school} input[value="${club}"]`).click()
// });
function charList(selected = !1)
{
	updateAllNames();
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
	mt_clubs = {}
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
		if(!char[key].school)char[key].school = '自定义'
		if(!char[key].club)char[key].club = '自定义'
		let school = char[key].school
		let club = char[key].club
		mt_chars.push({
			no: key,
			name: localization(char[key].name),
			school: localization('💟'+school,'CUSTOM'),
			club: localization(club),
			profile: char[key].head ? char[key].head : [key],
			custom: '自定'
		})
		mt_char[key] = char[key]
		if(!mt_clubs[school])mt_clubs[school] = {}
		mt_clubs[school][club] = 1
	}
	// mt_clubs = Object.keys(club)
	if(mt_settings['社团列表']['🗑️临时角色-临时角色'])
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
					school: localization('🗑️临时角色','RECYCLE'),
					profile: schar[key].head || [key],
					custom: '临时'
				})
			}
			mt_schar[key] = schar[key]
		}//🗑️
	}
}
function custom_char(info)
{
	club(true)
	char_info = {...info,names: {}}
	if(!char_info.make)
	{
		char_info.school = char_info.school[LANG]
		char_info.club = char_info.club[LANG]
		char_info.name = char_info.name[LANG]
	}
	let names = mt_settings.人物改名;
	$('#custom-char .rightSend').prop('checked',false).prop('checked',mt_settings['右侧发言'][char_info.no])
	$('#custom-char .typeTitle').text('修改角色')
	$('#custom-char .yes').removeAttr('disabled')
	$('#custom-char .charid').html(`<span class='red'>ID：${char_info.no}</span><br>`)
	$('.schoolname').val(char_info.school).removeAttr('disabled')
	$('.clubname').val(char_info.club).removeAttr('disabled')
	$('.charname').val(names[char_info.no] || '').attr('placeholder',char_info.name)
	if(mt_char[char_info.no])
	{
		$('.schoolname').val(mt_char[char_info.no].school || '自定义')
		$('.clubname').val(mt_char[char_info.no].club || '自定义')
		names = mt_char[char_info.no].names ? mt_char[char_info.no].names : {}
	}
	else
	{
		if(!char_info.make)
		{
			$('.schoolname').attr('disabled','disabled')
			$('.clubname').attr('disabled','disabled')
		}
		else
		{
			$('#custom-char .typeTitle').text('添加角色')
			$('#custom-char .yes').attr('disabled','disabled')
		}
	}
	if(char_info.custom === '临时')
	{
		$('.schoolname').val(mt_schar[char_info.no].school || '自定义')
		$('.clubname').val(mt_schar[char_info.no].club || '自定义')
		names = mt_schar[char_info.no].names ? mt_schar[char_info.no].names : {}
		$('#custom-char .typeTitle').text('临时角色（无法修改）')
		$('#custom-char .yes').attr('disabled','disabled')
	}
	
	if(!char_info.custom)$('.添加头像').show()
	else if(char_info.custom === '自定')$('.edithead').show()
	else $('.edithead').hide()

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
	let school = $('.schoolname').val() || ''
	let club = $('.clubname').val() || ''
	let name = $('.charname').val() || $('.charname').attr('placeholder')
	let id = char_info.no
	let index;

	if(mt_char[id] || char_info.make)
	{
		if(!mt_char[id])mt_char[id] = {}
		if(!school)school = '自定义'
		if(!club)club = '自定义'
		mt_char[id].school = school
		mt_char[id].club = club
		mt_char[id].name = name
		mt_char[id].head = []
		mt_char[id].names = {}
	}
	else
	{
		if(name === $('.charname').attr('placeholder'))name = ''
		mt_settings.人物改名[id] = name
		if(!mt_settings.人物改名[id])delete mt_settings.人物改名[id]

		CUSTOM_HEAD[id] = []
	}
	await Promise.all([并发处理数据(document.querySelectorAll('.heads img'), async(key, img)=>
	{
		const index = img.title
		const src = img.src
		if(mt_char[id])//自定义角色
		{
			mt_char[id].head.push(index)
			await 数据操作('Is',index,src)
			mt_char[id].names[index] = toString(char_info.names[index])
			if(!mt_char[id].names[index])delete mt_char[id].names[index]
		}
		else if(id !== index)
		{
			if(index.startsWith('custom-'))
			{
				CUSTOM_HEAD[id].push(index)
				await 数据操作('Is',index,src)
			}
			mt_settings.人物改名[index] = toString(char_info.names[index])
			if(!mt_settings.人物改名[index])delete mt_settings.人物改名[index]
		}
	}),
	并发处理数据(document.querySelectorAll('.delheads img'), async(key, img)=>
	{
		const index = img.title
		const src = img.src
		await Promise.all([数据操作('Ir',index),数据操作('Ts',index,src)])
		delete mt_settings.人物改名[index]
	})])
	if(CUSTOM_HEAD[id])
	{
		CHAR_CharList[char_info.index].profile = arr
		if(!CUSTOM_HEAD[id].length)delete CUSTOM_HEAD[id]
	}
	$('#custom-char .rightSend').prop('checked') ? mt_settings['右侧发言'][id] = true : delete mt_settings['右侧发言'][id]
	$('#custom-char .no').click()
	数据操作('Ss','自定头像',CUSTOM_HEAD)
	saveStorage('mt-char',mt_char,'local')
	saveStorage('设置选项',mt_settings,'local')
	charList(true)//更新角色
}

async function removeChar(n)
{
	club(true)
	if(n.custom === '临时')
	{
		if(confirm(`角色名：${mt_schar[n.no].name}\nID：${n.no}\n确定恢复这名角色？`))
		{
			mt_char[n.no] = mt_schar[n.no]
			mt_char[n.no].club = mt_schar[n.no].club || '自定义'
			mt_char[n.no].school = mt_schar[n.no].school || '自定义'
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
					if(!CUSTOM_EMOJI[n.no])CUSTOM_EMOJI[n.no] = {}
					CUSTOM_EMOJI[n.no][key] = mt_schar[n.no].emoji[key]
				}
			}
			delete mt_schar[n.no];
			saveStorage('mt-char',mt_char,'local')
			saveStorage('DB_EMOJI',CUSTOM_EMOJI,'local')
			数据操作('Ts','临时角色',mt_schar)
		}
	}
	if(n.custom === '自定')
	{
		if(confirm(`角色名：${mt_char[n.no].name}\nID：${n.no}\n确定要删除这名角色吗？\n删除后的角色可以从临时角色列表中找回`))
		{
			mt_schar[n.no] = mt_char[n.no]
			mt_schar[n.no].emoji = CUSTOM_EMOJI[n.no] || {}
			let img = await 数据操作('Ig',n.no)
			if(img)await Promise.all([数据操作('Ir',n.no),数据操作('Ts',n.no,img)])
			let head = mt_char[n.no].head || []
			for(let i=0,l=head.length;i<l;i++)
			{
				img = await 数据操作('Ig',head[i])
				if(img)await Promise.all([数据操作('Ir',head[i]),数据操作('Ts',head[i],img)])
			}
			let emoji = Object.keys((CUSTOM_EMOJI[n.no] || {}))
			for(let i=0,l=emoji.length;i<l;i++)
			{
				img = await 数据操作('Ig',emoji[i])
				if(img)await Promise.all([数据操作('Ir',emoji[i]),数据操作('Ts',emoji[i],img)])
			}
			delete mt_char[n.no];
			delete CUSTOM_EMOJI[n.no]
			saveStorage('mt-char',mt_char,'local')
			saveStorage('DB_EMOJI',CUSTOM_EMOJI,'local')
			数据操作('Ts','临时角色',mt_schar)
		}
	}
	charList(true)//更新角色
}
//创建人物
$('body').on('click',"#makecus",function()
{
	let info = {
		no: 'custom-'+getNowDate(),
		school: '自定义',
		club: '自定义',
		name: '自定义角色',
		profile: [],
		make: !0
	}
	custom_char(info)
	$('.headinfo').hide()
})
//储存头像
$("body").append("<input id='custom' hidden type='file' accept='image/*' multiple>");//添加上传标签
$("body").on('change','#custom',function()
{
	INIT_loading('IMAGE compress')
	
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
		// $('.headname').val(char_info.make ? '' : name).attr('disabled','disabled')
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
	let lang = ['zh_cn','zh_tw','jp','en','kr','pinyin']
	mt_school = {}
	mt_club = {}
	CHAR_CharList = []
	if(GAME == 'BLDA' && 角色信息.info.胡桃)角色信息.name.en[角色信息.info.胡桃[0][0]] = 'SRT'
	for(let id in 角色信息.info)
	{
		let index = 角色信息.info[id][0]
		let char = {}
		char.index = CHAR_CharList.length
		char.no = id
		char.school = {}
		char.club = {}
		char.name = {}
		char.school.id = 角色信息.group[index[0]]
		char.club.id = 角色信息.group[index[1]]
		if(!mt_school[char.school.id])mt_school[char.school.id] = {}
		if(!mt_club[char.school.id])mt_club[char.school.id] = {}
		if(!mt_club[char.school.id][char.club.id])mt_club[char.school.id][char.club.id] = {}
		for(let i=0;i<6;i++)
		{
			let la = lang[i]
			char.school[la] = 角色信息.name[la][index[0]] || 角色信息.name.zh_cn[index[0]] || char.school.id
			mt_school[char.school.id][la] = char.school[la]
		}
		mt_school[char.school.id].img = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
		if(角色信息.name.en[index[0]])
		{
			mt_school[char.school.id].img = href+'MoeData/Ui/School/'+mt_school[char.school.id].en.toUpperCase()+'.webp'
		}
		for(let i=0;i<6;i++)
		{
			let la = lang[i]
			char.club[la] = 角色信息.name[la][index[1]] || 角色信息.name.zh_cn[index[1]] || char.club.id
			mt_club[char.school.id][char.club.id][la] = char.club[la]
		}
		for(let i=0;i<6;i++)
		{
			let la = lang[i]
			char.name[la] = 角色信息.name[la][index[2]] || 角色信息.name.zh_cn[index[2]] || id
		}
		let head = [[],[],[],[],角色信息.info[id][2] || []]
		if(角色信息.info[id][1] && typeof 角色信息.info[id][1][0][0][3] != 'number')
		{
			for(let ai=0,al=角色信息.info[id][1].length;ai<al;ai++)
			{
				let page = 角色信息.info[id][1][ai]
				for(let pi=0,pl=page.length;pi<pl;pi++)
				{
					let cf = page[pi][2]
					let img = page[pi][0]
					if(typeof cf == 'object')
					{
						for(let ci=1,cl=cf.length;ci<cl;ci++)
						{
							if(cf[ci] == 1)head[2].push(img+'_L2D_2');
							if(cf[ci] == 2)head[1].push(img+'_L2D');
							if(cf[ci] == 3)head[0].push(img+'_BG');
							if(cf[ci] == 4)head[3].push(img);
						}
					}
				}
			}
		}
		角色信息.info[id][2] = head.flat()
		char.profile = 角色信息.info[id][2]
		if(CUSTOM_HEAD[id])
		{
			for(let i=0,l=CUSTOM_HEAD[id].length;i<l;i++)
			{
				char.profile.push(CUSTOM_HEAD[id][i])
			}
		}
		CHAR_CharList.push(char)
	}
}