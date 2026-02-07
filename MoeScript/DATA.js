/*@MoeScript/DATA.js@*/
var DATA_NowTime = 0
function loaddata(json,play)//识别存档
{
	while(typeof json === 'string')json = JSON.parse(json)
	if(!json.MoeTalk)
	{
		let OLdJson = UPDATE_OldData(json)
		json = {}
		json.INFO = {}//存档信息
		json.INFO.title = OLdJson[0]['title']
		json.INFO.nickname = OLdJson[0]['nickname']
		json.INFO.date = OLdJson[0]['date']
		json.CHAR = {}//自定义角色
		json.CHAR.id = OLdJson[0].mt_char
		json.CHAR.image = OLdJson[0].mt_head
		json.CHAT = OLdJson[1]//MMT
		json.SETTING = mt_settings//设置信息
	}
	if(!json.TEMP)json.TEMP = {CHAR:{},EMOJI:{},IMAGE:{}}
	if(!json.CUSTOM)json.CUSTOM = {CHAR:{},EMOJI:{},IMAGE:{}}
	if(!json.INFO)json.INFO = {title:"",nickname:"",date:""}
	if(json.CHAR || json.EMOJI)
	{
		if(!json.CHAR)json.CHAR = {id:{},image:{}}
		if(!json.EMOJI)json.EMOJI = {image:{}}
		if(json.EMOJI.id)
		{
			json.EMOJI.Emoji = json.EMOJI.id
			delete json.EMOJI.id
		}
		json.CUSTOM.CHAR = json.CHAR.id
		json.CUSTOM.EMOJI = json.EMOJI
		json.CUSTOM.IMAGE = {...json.CHAR.image,...json.EMOJI.image}
		delete json.CUSTOM.EMOJI.image
		delete json.CHAR
		delete json.EMOJI
	}
	for(let i=0,l=json.CHAT.length;i<l;i++)
	{
		repairCF(json.CHAT[i]);
		if(play == 'upload')
		{
			let chat = json.CHAT[i]
			let id = chat.sCharacter.no.toString()
			let img = chat.sCharacter.index.toString()
			//自定义角色
			if(!json.TEMP.CHAR[id] && json.CUSTOM.CHAR[id])json.TEMP.CHAR[id] = json.CUSTOM.CHAR[id]
			//自定义头像
			if(!json.TEMP.IMAGE[img] && json.CUSTOM.IMAGE[img])json.TEMP.IMAGE[img] = json.CUSTOM.IMAGE[img]
			let heads = chat.heads && chat.heads.list || []
			for(let i=0,l=heads.length;i<l;i++)
			{//自定义头像
				img = heads[i]
				if(!json.TEMP.IMAGE[img] && json.CUSTOM.IMAGE[img])json.TEMP.IMAGE[img] = json.CUSTOM.IMAGE[img]
			}
			img = chat.file || ''
			if((img.startsWith('CharFace-') || img.startsWith('Emoji-')))
			{//自定义图片
				if(!json.TEMP.IMAGE[img] && json.CUSTOM.IMAGE[img])json.TEMP.IMAGE[img] = json.CUSTOM.IMAGE[img]
			}
		}
	}
	if(play)
	{
		if(play == 'custom')json.TEMP = json.CUSTOM
		delete json.CUSTOM
	}
	INIT_loading(!'加载存档')
	return json
}
function repairCF(data)
{
	if(!mt_characters || !data.sCharacter)return
	let id = data.sCharacter.no,head = data.sCharacter.index
	if(id_map[0][id])id = id_map[0][id] || id
	if(head < 1000 && mt_characters[id])data.sCharacter.index = mt_characters[id].head.split(',')[0]
	data.sCharacter.no = id
	if(data.type === 'image')
	{
		data.content = data.content || ''
		data.file = (data.file || data.content).replace('Images','GameData').replaceAll('https://moetalk.netlify.app/','')
	}
}
function UPDATE_OldData(json)//识别存档
{
	let josnsize = (json.length/1024).toFixed(0)
	let custom_char = {};
	let custom_head = {};
	if(typeof json === 'string')json = JSON.parse(json)
	if(!json[0] || (json[0] && !json[0].title))//错误数据
	{
		json[0] = {};
		json[1] = [];
		json[0]['title'] = '错误存档'
		json[0]['nickname'] = '无法识别的数据'
		json[0]['date'] = '强制上传可能会损坏您的存档'
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
				custom_char[v.char_id] = {}
				custom_char[v.char_id].name = v.name
				custom_head[v.char_id] = v.img
			}
		})
	}

	if(json['chars'])//ct待选角色
	{
		json[0]['选择角色'] = {}
		json[0]['选择角色'].no = 0
		json[0]['选择角色'].index = 1
		json[0]['选择角色'].list = []
		
		$.each(json['chars'],function(k,v)
		{
			json[0]['选择角色'].list[k] = {}
			if(v['char_id'].split('-')[0] === 'ba')
			{
				json[0]['选择角色'].list[k].no = v['char_id'].split('-')[1]
				json[0]['选择角色'].list[k].index = v['img']
			}
			else if(v['char_id'].split('-')[1] === 'MT')
			{
				json[0]['选择角色'].list[k].no = v['char_id'].split('-')[2]
				json[0]['选择角色'].list[k].index = v['char_id'].split('-')[3]
			}
			else
			{
				json[0]['选择角色'].list[k].no = v['char_id']
				json[0]['选择角色'].list[k].index = v['char_id']
			}
			json[0]['选择角色'].list[k].index = json[0]['选择角色'].list[k].index.replace('Student_Portrait_','').replace('NPC_Portrait_','').replace('Lobbyillust_Icon_','').replace('_01','_L2D').replace('_Collection','_BG')
			id_map[0][json[0]['选择角色'].list[k].no] ? json[0]['选择角色'].list[k].no = id_map[0][json[0]['选择角色'].list[k].no] : ''
			id_map[1][json[0]['选择角色'].list[k].index] ? json[0]['选择角色'].list[k].index = id_map[1][json[0]['选择角色'].list[k].index] : ''
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
		$.each(json['chat'],function(k,v)
		{
			json[1][k] = {};
			json[1][k]['replyDepth'] = 0

			json[1][k]['sCharacter'] = {};
			json[1][k]['sCharacter']['no'] = v['char_id'] ? v['char_id'].split('-')[1] : 0
			json[1][k]['sCharacter']['index'] = v['img'] ? v['img'].split('.').shift() : 1
			if(v['img'] === 'uploaded')
			{
				json[1][k]['sCharacter']['no'] = v['char_id']
				json[1][k]['sCharacter']['index'] = v['char_id']
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
				json[1][k]['type'] = 'reply'
			}
			if(v['yuzutalk']['type'] === 'IMAGE')
			{
				json[1][k]['type'] = 'image'
				json[1][k]['content'] = ''
				json[1][k]['file'] = v['content'].replace('resources/ba','GameData/BLDA/Emoji').replace(MoeTalkURL,'');
			}

			if(v.yuzutalk.nameOverride)json[1][k]['name'] = v.yuzutalk.nameOverride;
			if(v.yuzutalk.avatarState === 'SHOW')json[1][k]['isFirst'] = true;
			if(v.is_breaking === true)json[1][k]['is_breaking'] = true;
		})
	}
	if(json['talkHistory'])
	{
		json[1] = [];
		json[0]['title'] = json['name']
		json[0]['nickname'] = 'YuukaTalk存档'
		json[0]['date'] = '无法显示自定义角色头像和外部上传图片'
		json['talkHistory'].map(function(v,k)
		{
			json[1][k] = {};
			json[1][k].content = ''
			json[1][k].replyDepth = 0
			json[1][k].sCharacter = {}
			json[1][k].sCharacter.no = 0
			json[1][k].sCharacter.index = 1
			v.type = v.type.split('.').slice(-1)[0]
			if(v.talker)
			{
				if(v.talker.nameRoma !== 'sensei')
				{
					json[1][k].name = v.talker.name
					json[1][k].sCharacter.no = 'YuukaTalk'
					json[1][k].sCharacter.index = v.talker.currentAvatar
				}
			}
			if(v.type === 'PureText')
			{
				json[1][k].isFirst = v.isFirst
				json[1][k].content = v.text
				json[1][k].type = 'chat'
			}
			if(v.type === 'Branch')
			{
				json[1][k].content = v.textOptions.join('\n')
				json[1][k].type = 'reply'
			}
			if(v.type === 'LoveScene')
			{
				json[1][k].name = v.studentName
				json[1][k].type = 'heart'
			}
			if(v.type === 'Narration')
			{
				json[1][k].content = v.text
				json[1][k].type = 'info'
			}
			if(v.type === 'Photo')
			{
				if(v.uri.indexOf('file:///android_asset') > -1)
				{
					json[1][k].content = v.uri.replace('file:///android_asset','https://mirror.ghproxy.com/https://github.com/Eynnzerr/YuukaTalk/blob/dd45c56e35d64b8d9375de81985541f4f238e170/app/src/main/assets')
				}
				else
				{
					json[1][k].content = `MoeData/Ui/error.webp`;
				}
				json[1][k].type = 'image'
			}
			json[1][k].isFirst = false
		})
	}
	json[0].mt_char = custom_char
	json[0].mt_head = custom_head
	return json
}
function 截取存档()
{
	let text = `你一共选中了${$(".dels:checked").length}条数据\n请输入标题和作者名：\n标题：<input style='font-size:1.2rem;'>\n作者：<input style='font-size:1.2rem;'>`
	let config = {}
	config.id = Math.random().toString().replace('0.','')
	config.title = '截取存档'
	config.yes = async function()
	{
		let filename = 'MoeTalk截取存档'
		let time = getNowDate()
		let mmt = []
		let info = {};
		info.title = $(`.alert_${config.id} input`).eq(0).val() || '无题'
		info.nickname = $(`.alert_${config.id} input`).eq(1).val()
		info.date = time
		$(".dels:checked").each(function(k,v)
		{
			mmt.push(chats[$(".dels").index($(this))]);
		})
		let json = await 生成存档(info,false,mmt)
		$('.存档格式').val('json')
		if(mt_settings['隐藏前缀'])filename = ''
		else filename += time+'_'
		导出存档(`${filename}${info.title}`,json,'json')
	}
	alert(text,config)
}
async function 生成存档(info,cus = false,mmt)
{
	let json = {}
	if(!info)info = {}
	if(!info.title)info.title = '无题'
	if(!info.nickname)info.nickname = '无名'
	if(!info.date)info.date = '未知'
	if(!mmt)mmt = [...chats,...otherChats]
	json.MoeTalk = 本地应用版本[0]
	json.CHAT = mmt
	json.SETTING = mt_settings
	json.INFO = info
	json.TEMP = {CHAR:{},IMAGE:{}}
	json.ERROR = 错误日志
	for(let i=0,l=mmt.length;i<l;i++)
	{//记录MMT中使用的数据
		let chat = mmt[i]
		let id = chat.sCharacter.no.toString()
		let img = chat.sCharacter.index.toString()
		if(!json.TEMP.CHAR[id])
		{//自定义角色
			if(mt_char[id])json.TEMP.CHAR[id] = mt_char[id]
			if(mt_schar[id])json.TEMP.CHAR[id] = mt_schar[id]
			if(json.TEMP.CHAR[id])delete json.TEMP.CHAR[id].emoji
		}
		if(!json.TEMP.IMAGE[img] && img.startsWith('custom-'))
		{//自定义头像
			let head = await 数据操作('Tg',img)
			if(!head)head = await 数据操作('Ig',img)
			if(head)json.TEMP.IMAGE[img] = head
		}
		let heads = chat.heads && chat.heads.list || []
		for(let i=0,l=heads.length;i<l;i++)
		{//自定义头像
			img = heads[i]
			if(!json.TEMP.IMAGE[img] && img.startsWith('custom-'))
			{
				let head = await 数据操作('Tg',img)
				if(!head)head = await 数据操作('Ig',img)
				if(head)json.TEMP.IMAGE[img] = head
			}
		}
		img = chat.file || ''
		if((img.startsWith('CharFace-') || img.startsWith('Emoji-')) && !json.TEMP.IMAGE[img])
		{//自定义图片
			let image = await 数据操作('Tg',img)
			if(!image)image = await 数据操作('Ig',img)
			if(image)json.TEMP.IMAGE[img] = image
		}
	}
	if(cus)//记录所有自定义数据
	{
		json.CUSTOM = {}
		json.CUSTOM.CHAR = mt_char
		json.CUSTOM.EMOJI = EMOJI_CustomEmoji
		json.CUSTOM.IMAGE = {}
		await MoeImage.iterate((value, key, iterationNumber)=>
		{
			if(json.TEMP.IMAGE[key])delete json.TEMP.IMAGE[key]
			json.CUSTOM.IMAGE[key] = value
		});
	}
	return json
}
async function 读取存档(json)
{
	INIT_loading('读取存档')
	mt_settings.选择角色 = {no: 0,index: 1,list: []}
	if(chats.length+otherChats.length)await 数据操作('Ps','自动备份',await 生成存档())
	chats = []
	otherChats = []
	json.CHAT.map(function(v,k)
	{
		if(v.replyDepth !== 0)otherChats.push(v)
		else chats.push(v)
	})
	//写入临时数据
	数据操作('Tc')
	if(!json.TEMP)json.TEMP = {CHAR:{},IMAGE:{}}
	mt_schar = json.TEMP.CHAR
	for(let key in json.TEMP.IMAGE)
	{
		await 数据操作('Ts',key,json.TEMP.IMAGE[key])
	}
	await 数据操作('Ts','临时角色',mt_schar)
	//写入自定义数据
	if(json.CUSTOM)
	{
		mt_char = {...mt_char,...json.CUSTOM.CHAR}
		EMOJI_CustomEmoji = {...EMOJI_CustomEmoji,...json.CUSTOM.EMOJI}
		for(let key in json.CUSTOM.IMAGE)
		{
			await 数据操作('Is',key,json.CUSTOM.IMAGE[key])
		}
		await 数据操作('Ss','mt-char',mt_char)
		await 数据操作('Ss','DB_EMOJI',EMOJI_CustomEmoji)
	}
	if(json.SETTING)mt_settings = json.SETTING
	加载数据()
	log(true)//清除历史记录
	replyDepth(0,'home')//清除跳转记录
	saveStorage('设置选项',mt_settings,'local')
	saveStorage('chats',[...chats,...otherChats],'local')
	INIT_loading(!'读取存档')
}