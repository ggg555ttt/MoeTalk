var DATA_ServerDownload = false//后台服务器下载
var DATA_NowTime = 0
function loaddata(json,mode)//识别存档
{
	if(typeof json === 'string')json = JSON.parse(json)
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
		json.EMOJI = {id:{},image:{}}//自定义表情
		json.CHAT = OLdJson[1]//MMT
		json.SETTING = mt_settings//设置信息
	}
	mt_schar = {...mt_schar,...json.CHAR.id}
	mt_shead = {...mt_shead,...json.CHAR.image}
	saveStorage('mt-char',mt_schar,'session')
	saveStorage('mt-head',mt_shead,'session')
	if(mode === 'player')
	{
		let otherChats = []
		let chats = []
		let arr = {}
		let key = '';
		json.CHAT.map(function(v,k)
		{
			repairCF(v);
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
		json.CHAT = arr['']
	}
	else
	{
		foreach(json.CHAT,function(k,v)
		{
			repairCF(json.CHAT[k])
		})
	}
	
	return json
}
function MoeToClosure()//Moe转Closure
{
	let ct = [];
	let custom_chars = {};
	$.each(chats,function(k,v)
	{
		ct[k] = {};
		let id = v['sCharacter']['no'];
		let img = v['sCharacter']['index'];
		let data = 'MT-';
		if(id_map[0][id])data = "ba-"
		if(!mt_char[id] && !mt_schar[id] && id != 0 && mt_characters[id])//正常角色
		{
			ct[k]['char_id'] = data+id;
			ct[k]['img'] = img;
			if(data === "MT-")
			{
				img = img.replace('Student_Portrait_','').replace('NPC_Portrait_','').replace('Lobbyillust_Icon_','').replace('_01','_L2D').replace('_Collection','_BG')
				ct[k]['char_id'] = `custom-MT-${id}-${img}`
				ct[k]['img'] = 'uploaded';

				custom_chars[ct[k]['char_id']] = {}
				custom_chars[ct[k]['char_id']]['img'] = `${MoeTalkURL}GameData/${mt_settings['选择游戏']}/Char/${img}.webp`
				custom_chars[ct[k]['char_id']]['name'] = loadname(id);
			}
		}
		if(mt_char[id] || mt_schar[id])//自定义角色
		{
			ct[k]['char_id'] = id;
			ct[k]['img'] = 'uploaded';
		}
		ct[k]['content'] = v['content'];//文本内容
		ct[k]['is_breaking'] = v['is_breaking'];
		ct[k]['yuzutalk'] = {};
		ct[k]['yuzutalk']['nameOverride'] = v['name'] ? v['name'] : '';//临时名字
		if(v['isFirst'] === true)//头像显示
		{
			ct[k]['yuzutalk']['avatarState'] = 'SHOW';
		}
		else
		{
			ct[k]['yuzutalk']['avatarState'] = 'AUTO';
		}
		
		if(v['type'] == 'chat')ct[k]['yuzutalk']['type'] = 'TEXT';//文字类型
		if(v['type'] == 'reply')ct[k]['yuzutalk']['type'] = 'CHOICES';//选择肢
		if(v['type'] == 'heart')ct[k]['yuzutalk']['type'] = 'RELATIONSHIPSTORY';//羁绊
		if(v['type'] == 'info')ct[k]['yuzutalk']['type'] = 'NARRATION';//旁白
		if(v['type'] == 'image')//图片类型
		{
			ct[k]['yuzutalk']['type'] = 'IMAGE';
			if(v['file'].indexOf(':image') < 0)//本地链接
			{
				if(v['file'].indexOf('/BLDA/Emoji/stamps') > -1)
				{
					v['file'] = v['file'].replace('/BLDA/Emoji','resources/ba')
				}
				else
				{
					v['file'] = MoeTalkURL+v['file'];
				}
			}
			ct[k]['content'] = v['file'];
		}
		
	})
	for(let i=0;i<ct.length;i++){if(ct[i]===undefined){ct.splice(i,1);i--;}}
	let closuretalk = {};
	closuretalk['chat'] = ct
	closuretalk['chars'] = [];
	closuretalk['custom_chars'] = [];
	
	$.each(mt_settings['选择角色'].list,function(k,v)
	{
		closuretalk['chars'][k] = {}
		let id = v.no;
		let img = v.index;
		let data = 'MT-';
		if(id_map[0][id])data = "ba-"
		if(!mt_char[id] && !mt_schar[id] && id != 0)//正常角色
		{
			closuretalk['chars'][k]['char_id'] = data+id;
			closuretalk['chars'][k]['img'] = img;
			if(data === "MT-")
			{
				img = img.replace('Student_Portrait_','').replace('NPC_Portrait_','').replace('Lobbyillust_Icon_','').replace('_01','_L2D')
				closuretalk['chars'][k]['char_id'] = `custom-MT-${id}-${img}`
				closuretalk['chars'][k]['img'] = 'uploaded';

				custom_chars[closuretalk['chars'][k]['char_id']] = {}
				custom_chars[closuretalk['chars'][k]['char_id']]['img'] = `${MoeTalkURL}GameData/${mt_settings['选择游戏']}/Char/${img}.webp`
				custom_chars[closuretalk['chars'][k]['char_id']]['name'] = loadname(id);
			}
		}
		if(mt_char[id] || mt_schar[id])//自定义角色
		{
			closuretalk['chars'][k]['char_id'] = id;
			closuretalk['chars'][k]['img'] = 'uploaded';
		}
	})
	$.each(mt_char,function(k,v)
	{
		if(v.head)
		{
			let length = v.head.length
			for(let i = 0;i < length;i++)
			{
				custom_chars[v.head[i]] = {}
				custom_chars[v.head[i]]['img'] = mt_head[v.head[i]];
				custom_chars[v.head[i]]['name'] = v.name;
			}
		}
		else
		{
			custom_chars[k] = {}
			custom_chars[k]['img'] = mt_head[k];
			custom_chars[k]['name'] = v.name;
		}
	})
	$.each(custom_chars,function(k,v)
	{
		closuretalk['custom_chars'].push({char_id:k,img:v.img,name:v.name})
	})
	let time = new Date().toLocaleString().replaceAll('/','-').replaceAll(' ','_').replaceAll(':','-');
	$('#downImg').html('')
	download('ClosureTalk转换存档'+time+'.JSON',closuretalk)
}
$("body").on('click',"#cutdata",function()
{
	if($(".dels:checked").length > 0)
	{
		let json = [{},[]];
		$(".dels:checked").each(function(k,v)
		{
			json[1].push(chats[$(".dels").index($(this))]);
		})
		$('.notice .title').text('截取存档')
		alert(`你一共选中了${$(".dels:checked").length}条数据\n请输入标题和作者名：\n标题：<input style='font-size:1.2rem;'>\n作者：<input style='font-size:1.2rem;'>`)
		TOP_confirm = function()
		{
			let filename = 'MoeTalk截取存档'
			let title = $('.notice input').eq(0).val() || '无题'
			let name = $('.notice input').eq(1).val() || '佚名'
			let time = new Date().toLocaleString().replaceAll('/','').replaceAll(' ','-').replaceAll(':','');
			json[0]['title'] = title;
			json[0]['nickname'] = name;
			json[0]['date'] = time
			download(`MoeTalk截取存档_${title}_${time}.JSON`,json)
		}
	}
	else
	{
		alert('你没有选中数据！')
	}
});
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

function download(filename,data,base64,type = 'json')
{
	let str = '',dir = '';
	if(performance.memory)
	{
		let AllMemory = performance.memory.totalJSHeapSize; // 总的JS堆内存大小，单位为字节
		let MaxMemory = performance.memory.jsHeapSizeLimit; // JS堆内存大小的上限
		AllMemory = (AllMemory/1048576).toFixed(0)+'MB'
		MaxMemory = (MaxMemory/1048576).toFixed(0)+'MB'
		str += `内存占用：${AllMemory}/${MaxMemory}\n`
	}
	if(DATA_ServerDownload && !mt_settings['打包下载'])
	{
		DATA_ServerDownload = type
		type = 'server'
	}

	if(type === 'json')
	{
		data = JSON.stringify(data,null,4)
		dir = 'MoeTalk存档'
		str = `文件【${filename}】已开始下载！\n`
		if(cordova)str += `可以在【内部存储/Download/${dir}】中找到\n`
		else str += '下载失败请尝试在设置页面中开启“旧版图片存档”选项\n仍然失败请向开发者反馈\n'
		savefile(dir,filename,data,type)
		$('#downImg').html(str)
		if(!$('#downImg').length)alert(str)
	}
	if(type === 'image')
	{
		dir = 'MoeTalk图片'
		if(imageZip)
		{
			imageZip.file(filename,data);
			if(imageArrL === Object.keys(imageZip.files).length)
			{
				imageZip.generateAsync({type:'blob'}).then(function(data)
				{
					type = 'json'
					filename = `MoeTalk_${mt_settings['截图选项'].titleStr && mt_settings['截图选项'].titleStr.split(' : ')[1] ? mt_settings['截图选项'].titleStr.split(' : ')[1] : mt_text.noTitle[mtlang]}_${getNowDate()}`
					savefile(dir,`${filename}.${mt_settings['截图选项'].archive ? 'ZIP' : 'zip'}`,data,type)
					imageZip = null
				});
			}
		}
		else savefile(dir,filename,data,type)
		if(cordova)str += `图片可以在【内部存储/Download/${dir}${type === 'image' ? `/${DATA_NowTime}` : ''}】中找到\n`
		str += mt_text.image_download[mtlang]+'\n'
		str += '无法手动保存请取消勾选“存档”选框，并将图片格式改为“webp”格式\n'
		$('.INDEX_CaptureTips').text(str)
	}
	if(type === 'server')
	{
		let className = '#downImg'
		$.ajax(
		{
			url: '/index.php',
			async: true,
			type: 'POST',
			data: 
			{
				backDown: true,
				filename: filename,
				data: DATA_ServerDownload === 'json' ? data : base64,
				type: DATA_ServerDownload,
				time: DATA_NowTime
			},
			dataType:'text'
		});
		if(DATA_ServerDownload === 'json')
		{
			str = `文件${filename}已开始下载！\n可以在<span class='red'>【文件/我的iPhone/phpwin/JSON】</span>中找到您下载的文件！\n`
			str += '下载失败请尝试在设置页面中开启“旧版图片存档”选项\n'
		}
		else
		{
			str += `${mt_text.image_download[mtlang]}\n可以在<span class='red'>【文件/我的iPhone/phpwin/IMAGE/${DATA_NowTime}】</span>中找到您下载的文件！\n`
			className = '.INDEX_CaptureTips'
		}
		str += `卸载phpwin前请注意备份！\n如果出现错误请向开发者反馈！`
		$(className).html(str)
	}
}

async function savefile(dirname,filename,data,type = 'json')
{
	if(客户端 === 'HTML5+')
	{
		保存文件(filename, data,type)
		return filename
	}
	if(客户端 === 'NW.js')
	{
		if(typeof data === 'string')data = new Blob([data],{type:'application/octet-stream'});
		if(type == 'image')dirname = `${dirname}/${DATA_NowTime}`
		let buffer = Buffer.from(await data.arrayBuffer());//将 Blob 转为 Buffer
		if(!fs.existsSync(dirname))fs.mkdirSync(dirname,{recursive: true});//自动创建多级目录
		fs.writeFileSync(`${dirname}/${filename}`, buffer);// 写入文件
		return filename
	}
	if(!cordova)
	{
		if(typeof data === 'string')data = new Blob([data],{type:'application/octet-stream'});
		let a = document.createElement('a');
		a.href = window.URL.createObjectURL(data);
		a.download = filename;
		a.click();
		return filename
	}
	window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory+'Download',function(root)
	{
		root.getDirectory(dirname,{create:true},function()
		{
			if(type == 'image')
			{
				root.getDirectory(`${dirname}/${DATA_NowTime}`,{create:true},function()
				{
					root.getFile(`${dirname}/${DATA_NowTime}/${filename}`,{create:true},function(fileEntry)
					{
						//写入文件
						fileEntry.createWriter(function(fileWriter){fileWriter.write(data);});
					});
				});
			}
			else
			{
				root.getFile(`${dirname}/${filename}`,{create:true},function(fileEntry)
				{
					//写入文件
					fileEntry.createWriter(function(fileWriter){fileWriter.write(data);});
				});
			}
		});
	},function(err){alert('Download文件夹不存在！\n请尝试在内部存储根目录创建一个Download文件夹！');});
}