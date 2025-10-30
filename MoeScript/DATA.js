var DATA_NowTime = 0
function loaddata(json,mode)//识别存档
{
	while(typeof json === 'string')json = JSON.parse(json)
	if(!json.MoeTalk)
	{
		alert('存档无法识别！\n如果是旧版存档请通过“访问旧版”读取！')
		throw "错误存档";
	}

	if(mode === 'player')
	{
		if(json.CHAR)
		{
			mt_schar = json.CHAR.id
			mt_shead = json.CHAR.image
		}
		if(json.SETTING)
		{
			MMT目录.设置 = json.SETTING
		}
		let otherChats = []
		let chats = []
		let arr = {}
		let key = '';
		json.CHAT.map(function(v,k)
		{
			repairCF(v);
			if(MMT目录.数据 && MMT目录.数据.EMOJI.image[v.file])
			{
				v.file = MMT目录.数据.EMOJI.image[v.file]
			}
			if(v.replyDepth !== 0)otherChats.push(v)
			else chats.push(v)

			key = v.replyDepth
			if(v.replyDepth === 0)key = ''

			if(!arr[key])arr[key] = []
			arr[key].push(v)
		})
		$.each(arr,function(k,v)
		{
			if(k !== '')
			{
				let json = arr[''].filter(function(e)
				{
					return e.type === 'reply' && e.content.split('\n').filter(function(e)
					{
						return e === k
					})[0] === k
				})[0]
				let index = arr[''].indexOf(json)+1
				arr[''].splice(index,0,...arr[k]);
			}
		})
		json.CHAT = arr[''] || []
	}
	else
	{
		if(!json.INFO)json.INFO = {title:"",nickname:"",date:""}
		if(!json.CHAR)json.CHAR = {id:{},image:{}}
		if(!json.EMOJI)json.EMOJI = {image:{}}
		mt_schar = {...mt_schar,...json.CHAR.id}
		mt_shead = {...mt_shead,...json.CHAR.image}
		saveStorage('mt-char',mt_schar,'session')
		saveStorage('mt-head',mt_shead,'session')
		foreach(json.CHAT,function(k,v)
		{
			repairCF(json.CHAT[k])
		})
	}
	
	return json
}
$("body").on('click',"#cutdata",function()
{
	if($(".dels:checked").length > 0)
	{
		let text = `你一共选中了${$(".dels:checked").length}条数据\n请输入标题和作者名：\n标题：<input style='font-size:1.2rem;'>\n作者：<input style='font-size:1.2rem;'>`
		let config = {}
		config.id = Math.random().toString().replace('0.','')
		config.title = '截取存档'
		config.yes = function()
		{
			let json = {};
			let filename = 'MoeTalk截取存档'
			let title = $(`.alert_${config.id} input`).eq(0).val()
			let nickname = $(`.alert_${config.id} input`).eq(1).val()
			let time = getNowDate()
			json.MoeTalk = 本地应用版本[0]
			json.INFO = {}//存档信息
			json.INFO.title = title
			json.INFO.nickname = nickname
			json.INFO.date = time
			json.CHAR = {}//自定义角色
			json.CHAR.id = mt_char
			json.CHAR.image = mt_head
			json.EMOJI = EMOJI_CustomEmoji//自定义表情
			json.SETTING = mt_settings//设置信息
			json.CHAT = []//MMT数据
			$(".dels:checked").each(function(k,v)
			{
				json.CHAT.push(chats[$(".dels").index($(this))]);
			})
			$('.存档格式').val('json')
			导出存档(`${filename}${time}${title ? '_'+title : ''}`,json,'json')
		}
		alert(text,config)
		
	}
	else alert('你没有选中数据！')
});
function repairCF(data)
{
	data.sCharacter.no = id_map[0][data.sCharacter.no] || data.sCharacter.no
	data.sCharacter.index = toString(id_map[1][data.sCharacter.index] || data.sCharacter.index)
	if(mt_settings['选择游戏'] === 'CBJQ')data.sCharacter.index = data.sCharacter.index.replace('sp_','').replace('_L2D','_01')
	else data.sCharacter.index = data.sCharacter.index.replace('Student_Portrait_','').replace('NPC_Portrait_','').replace('Lobbyillust_Icon_','').replace('_01','_L2D').replace('_Collection','_BG')
	
	if(data.type === 'image')
	{
		data.content = data.content || ''
		data.file = data.file || data.content
		data.file = data.file.replace('CustomFace','CharFace').replace('Images/Emoji/','GameData/BLDA/Emoji/').replace(MoeTalkURL,'').replace('Images/','GameData/')
		
		if(data.file.indexOf('GameData/CharFace/') > -1)
		{
			data.file = 'GameData/BLDA/CharFace/'+data.file.split('/').slice(-1)[0].replace('.','/')
		}
		if(data.file.indexOf('Face/') > -1)
		{
			let arr = data.file.split('/')
			let str = arr.slice(-1)[0].replace('.webp','')
			//if(CFInfo[str])data.file = data.file.replace(str,CFInfo[str])
			arr = str.split('.')
			if(data.file.indexOf('CharID') > -1 && arr.length > 1)
			{
				arr = arr[1]-1
				data.file = data.file.replace(str,arr)
			}
		}
	}
}