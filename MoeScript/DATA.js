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
		if(!OLdJson)
		{
			json.INFO.title = '错误存档'
			json.INFO.nickname = '无法识别'
			json.INFO.date = '请勿上传'
			json.CHAT = chats//MMT
			INIT_loading(!'加载存档')
			return json
		}
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
	if(!json.INFO)json.INFO = {title:"",nickname:"",date:""}
	if(json.CHAR || json.EMOJI)
	{
		if(!json.CUSTOM)json.CUSTOM = {CHAR:{},EMOJI:{},IMAGE:{}}
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

	if(play && !json.CUSTOM)json.CUSTOM = {CHAR:{},EMOJI:{},IMAGE:{}}
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
	let id = data.sCharacter.no
	let head = data.sCharacter.index
	if(id_map[0][id])id = id_map[0][id] || id
	if(id_map[1][head])head = id_map[1][head] || head
	if(head < 1000 && mt_characters[id])head = mt_characters[id].head.split(',')[0]
	data.sCharacter.no = id
	data.sCharacter.index = head
	if(data.type === 'image')
	{
		data.content = data.content || ''
		data.file = (data.file || data.content).replace('Images','GameData').replaceAll('https://moetalk.netlify.app/','')
	}
}
function UPDATE_OldData(json)//识别存档
{
	let custom_char = {};
	let custom_head = {};
	if(typeof json === 'string')json = JSON.parse(json)
	let isMT = json.length === 2 && json[0].title !== undefined && json[0].nickname !== undefined && json[0].date
	if(!isMT && !json['chat'])return false//错误数据

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
		if(!json['custom_chars'].length)json['custom_chars'] = []
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
	if(json['chat'])//ct存档
	{
		if(!json['chat'].length)json['chat'] = []
		json[0] = []
		json[1] = [];
		json[0]['title'] = 'ClosureTalk存档'
		json[0]['nickname'] = ''
		json[0]['date'] = ''
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
	json[0].mt_char = custom_char
	json[0].mt_head = custom_head
	return json
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
		json.CUSTOM.HEAD = mt_head
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
	json.SETTING.选择角色 = mt_settings.选择角色
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
		mt_head = {...mt_head,...json.CUSTOM.HEAD}
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
function stringifyToChunks(data, chunks) {
	if (data === null) {
		chunks.push('null');
		return;
	}
	if (typeof data === 'string') {
		chunks.push(JSON.stringify(data));
		return;
	}
	if (typeof data === 'number' || typeof data === 'boolean') {
		chunks.push(String(data));
		return;
	}
	if (Array.isArray(data)) {
		chunks.push('[');
		for (let i = 0; i < data.length; i++) {
			stringifyToChunks(data[i], chunks);
			if (i < data.length - 1) chunks.push(',');
		}
		chunks.push(']');
		return;
	}
	if (typeof data === 'object') {
		chunks.push('{');
		const keys = Object.keys(data);
		for (let i = 0; i < keys.length; i++) {
			chunks.push(JSON.stringify(keys[i]) + ':');
			stringifyToChunks(data[keys[i]], chunks); // 递归
			if (i < keys.length - 1) chunks.push(',');
		}
		chunks.push('}');
		return;
	}
}
async function fileInput(e){
	const file = e.target.files[0];
	if (!file) return;

	const CHUNK_SIZE = 1024 * 1024; // 每次读取 1MB
	let offset = 0;
	const reader = new FileReader();

	// ========= 核心状态机变量（跨块持久化） =========
	let stack = [];		  // 记录当前路径和层级结构
	let inString = false;	// 是否正在读取字符串
	let stringVal = '';	  // 当前正在读取的字符串缓存
	let escape = false;	  // 是否处于转义字符状态 (\)
	let isKey = false;	   // 当前读取的字符串是否是对象的键名 (Key)
	let inPrimitive = false; // 是否正在读取基本类型 (数字/布尔值/null)
	let primitiveVal = '';   // 当前基本类型的字符串缓存

	// 辅助函数：获取当前的完整键名路径
	function getPath() {
		return stack.map(s => s.type === 'obj' ? s.key : s.index).filter(k => k !== null);
	}

	reader.onload = function(e) {
		const chunk = e.target.result;

		// 逐个字符进行状态机分析
		for (let i = 0; i < chunk.length; i++) {
			const char = chunk[i];

			// 1. 正在读取字符串（键名或字符串值）
			if (inString) {
				stringVal += char; // 保留包含引号的完整字符串
				if (escape) {
					escape = false;
				} else if (char === '\\') {
					escape = true;
				} else if (char === '"') {
					inString = false; // 字符串结束
					try {
						// 利用原生 JSON.parse 安全还原字符串 (自动处理换行、Unicode转义)
						const parsedStr = JSON.parse(stringVal);
						if (isKey) {
							stack[stack.length - 1].key = parsedStr; // 记录键名
						} else {
							// 【抛出值】这是一个字符串叶子节点！
							processValue(getPath(), parsedStr);
							// 如果父级是数组，数组下标 +1
							if (stack.length > 0 && stack[stack.length - 1].type === 'arr') {
								stack[stack.length - 1].index++;
							}
						}
					} catch (err) {
						console.error("解析字符串片段失败", stringVal);
					}
				}
				continue; // 字符串内部不参与后面的结构匹配
			}

			// 2. 正在读取基本数据类型 (数字/true/false/null)
			if (inPrimitive) {
				// 遇到空格、逗号、右括号等，说明基本类型读取完毕
				if (/[\s,}\]]/.test(char)) {
					inPrimitive = false;
					try {
						const val = JSON.parse(primitiveVal);
						// 【抛出值】这是一个基本类型叶子节点！
						processValue(getPath(), val);
						if (stack.length > 0 && stack[stack.length - 1].type === 'arr') {
							stack[stack.length - 1].index++;
						}
					} catch (err) {}
					primitiveVal = '';
					i--; // 【重要】退回一个字符，让外层逻辑继续处理这个逗号或括号
				} else {
					primitiveVal += char;
				}
				continue;
			}

			// 3. 寻找结构符号模式 (忽略所有非字符串外的空白符)
			if (/\s/.test(char)) continue;

			if (char === '{') {
				stack.push({ type: 'obj', key: null });
				isKey = true; // 遇到左括号，下一个字符串肯定是 Key
			} else if (char === '}') {
				stack.pop();
				if (stack.length > 0 && stack[stack.length - 1].type === 'arr') {
					stack[stack.length - 1].index++;
				}
			} else if (char === '[') {
				stack.push({ type: 'arr', index: 0 }); // 遇到数组，初始化下标 0
			} else if (char === ']') {
				stack.pop();
				if (stack.length > 0 && stack[stack.length - 1].type === 'arr') {
					stack[stack.length - 1].index++;
				}
			} else if (char === ':') {
				isKey = false; // 冒号之后肯定跟着的是 Value
			} else if (char === ',') {
				if (stack.length > 0 && stack[stack.length - 1].type === 'obj') {
					isKey = true; // 对象里的逗号之后，肯定跟着一个新的 Key
				}
			} else if (char === '"') {
				inString = true;
				stringVal = char; // 记录起始引号
				escape = false;
			} else if (/[0-9tfn\-]/i.test(char)) {
				// 匹配到 数字, true, false, null 的开头字符
				inPrimitive = true;
				primitiveVal = char;
			}
		}

		offset += CHUNK_SIZE;

		// 判断是否继续读取
		if (offset < file.size) {
			readNextChunk();
		} else {
			// 处理刚好以数字/布尔值结尾，没有符号闭合的极端情况
			if (inPrimitive && primitiveVal) {
				try {
					processValue(getPath(), JSON.parse(primitiveVal));
				} catch (err) {}
			}
			console.log("全兼容模式：超大文件所有节点解析完成！");
		}
	};

	function readNextChunk() {
		const slice = file.slice(offset, offset + CHUNK_SIZE);
		reader.readAsText(slice);
	}

	console.log("开始流式逐个节点解析...");
	readNextChunk();
}

// ==========================================
// 你的业务处理函数：将获得完整路径和对应的基础值
// ==========================================
var 存档信息 = []
function processValue(pathArray, value)
{
	test(存档信息)
}