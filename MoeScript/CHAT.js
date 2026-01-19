/*@MoeScript/CHAT.js@*/
var chatIndex = -1//消息索引

var 粘贴板;

var replyDepths = [0];//选择肢总集

var allChats = false
var otherChats = []//其他分支内容
var chats = []//当前分支内容
var 差分映射 = false

var 操作历史 = {index: -1,list: []}
var CHAT_history = [操作历史,{}]
var EMOJI = {io:'NO',type:'NO',pages:{}}
var EMOJI_CustomEmoji = {}
mt_settings['表情信息'] = mt_settings['表情信息'] ? mt_settings['表情信息'] : {}
MoeTemp.getItem('差分书签').then(json=>{EMOJI.pages = json || {}})
moetalkStorage.getItem('DB_EMOJI').then(async json=>
{
	json = json || {}
	if(json.id)
	{
		json.Emoji = json.id
		delete json.id
	}
	if(json.image)
	{
		let config = {}
		config.id = Math.random().toString().replace('0.','')
		alert("处理数据中，请稍等<span class='处理表情'></span>",config)
		let l = Object.keys(json.image).length
		for(key in json.image)
		{
			$('.处理表情').text(l--)
			$('.INDEX_EmojiButton').attr('disabled','disabled')
			$('.INDEX_CharFaceButton').attr('disabled','disabled')
			await MoeImage.setItem(key,json.image[key])
			delete json.image[key]
		}
		delete json.image
		moetalkStorage.setItem('DB_EMOJI',json)
		$('.INDEX_EmojiButton').removeAttr('disabled')
		$('.INDEX_CharFaceButton').removeAttr('disabled')
		$(`.alert_${config.id} .confirm`).click()
	}
	EMOJI_CustomEmoji = json
})
if(EMOJI.pages.type)EMOJI.type = EMOJI.pages.type
$('body').on('click',".INDEX_Emoji",function()
{
	if(!mt_settings['隐藏差分'])
	{
		setTimeout(function()
		{
			EMOJI.type === 'Emoji' ? $('.INDEX_EmojiButton').click() : $('.INDEX_CharFaceButton').click()
		})
	}
	else setTimeout(function(){$('.INDEX_EmojiButton').click()})
})
function mt_emojis(S,mode)
{
	EMOJI.images = []//表情列表
	EMOJI.pageindex = ''//表情书签
	EMOJI.title = '图片表情'//
	EMOJI.custom = {}//自设表情
	EMOJI.custom.io = false//自设开关
	EMOJI.custom.title = '切换自定义'//按钮标题
	EMOJI.path = `GameData/${mt_settings['选择游戏']}/${mode}/`//表情路径
	EMOJI.pages.type = mode
	let id = 'Emoji';
	if(mode === 'CharFace')
	{
		id = mt_settings['选择角色'].no
		EMOJI.title = loadname(id);
		if(差分映射 !== false)id = 差分映射.id
	}
	if(!EMOJI.pages[id])
	{//添加书签
		EMOJI.pages[id] = {}
		EMOJI.pages[id].type = 'origin'
		EMOJI.pages[id].origin = 0
		EMOJI.pages[id].custom = 0
		EMOJI.pages[id].scrollTop = 0
	}
	EMOJI.id = id
	if(S === '+')
	{//下一页
		EMOJI.pages[id][EMOJI.pages[id].type]++
		return;
	}
	if(S === '-')
	{//上一页
		EMOJI.pages[id][EMOJI.pages[id].type]--
		return;
	}
	if(typeof S === 'string')
	{//切换表情类型
		EMOJI.pages[id].type = S
		return;
	}
	if(!S)return;

	let type = EMOJI.pages[id].type
	let PageIndex = parseInt(EMOJI.pages[id][type])
	let PageCount = 0
	if(type === 'origin')
	{
		if(mode === 'CharFace' && mt_charface[id])
		{
			PageCount = mt_charface[id].length//
			if(PageIndex < 0)PageIndex = EMOJI.pages[id][type] = PageCount-1
			if(isNaN(PageIndex) || PageIndex >= PageCount)PageIndex = EMOJI.pages[id][type] = 0

			let Index = mt_charface.index
			let CharFace = mt_charface[id][PageIndex]//
			let cfid = toString(CharFace[0][0])
			if(cfid.includes('/'))EMOJI.custom.from = CustomFaceAuthor[cfid.split('/')[0]]
			foreach(CharFace,function(k,v)
			{
				foreach(v[1],function(k,index)
				{
					if(typeof index === 'number')EMOJI.images.push(`${v[0]}/${Index[index]}`)
					else if(typeof index === 'object')
					{
						if(typeof index[1] === 'number')EMOJI.images.push(`${v[0]}/${Index[index[0]]}_${Index[index[1]]}`)
						else for(let i=0;i<=index[1];i++)EMOJI.images.push(`${v[0]}/${Index[index[0]]}_${i}`)
					}
					else for(let i=0;i<=index;i++)EMOJI.images.push(`${v[0]}/${i}`)
				})
			})
		}
		if(mode === 'Emoji')
		{
			PageCount = 0
			if(mt_settings['选择游戏'] === 'BLDA')
			{
				PageCount = 4//
				if(PageIndex < 0)PageIndex = EMOJI.pages[id][type] = 3
				if(isNaN(PageIndex) || PageIndex >= PageCount)PageIndex = EMOJI.pages[id][type] = 0

				let lang = mtlang === 'zh_cn' ? 'zh_tw' : mtlang
				let path = PageIndex === 3 ? 4 : PageIndex+1+lang
				for(let i = 1;i <= [40,40,64,43][PageIndex];i++)
				{
					EMOJI.images.push(`${path}${i}`)
				}
			}
			else if(mt_settings['选择游戏'] === 'CBJQ')
			{
				PageIndex = 0
				PageCount = 1
				for(i=1;i<=143;i++)
				{
					EMOJI.images.push(i+'')
				}
			}
			else
			{
				PageIndex = 0
				PageCount = 0
			}
		}
	}
	if(PageCount === 0)type = 'custom'
	if(type === 'custom')
	{
		EMOJI.pages[id].type = type
		EMOJI.custom.io = true
		EMOJI.custom.title = '切换内置'
		//重新排列分页
		let arr = [[]]
		if(EMOJI_CustomEmoji[EMOJI.id])
		{
			$.each(EMOJI_CustomEmoji[EMOJI.id],function(k,v)
			{
				if(!arr[v])arr[v] = []
				arr[v].push(k)
			})
			let length = arr.length
			arr = arr.filter(function(item){return item && item.length});//排查空元素
			if(length !== arr.length)
			{
				foreach(arr,function(k,v)
				{
					foreach(v,function(kk,vv)
					{
						EMOJI_CustomEmoji[EMOJI.id][vv] = k
					})
				})
			}
			PageCount = arr.length//
			if(PageIndex < 0)PageIndex = EMOJI.pages[id][type] = PageCount-1
			if(isNaN(PageIndex) || PageIndex >= PageCount)PageIndex = EMOJI.pages[id][type] = 0
			if(arr[PageIndex])EMOJI.images = EMOJI.images.concat(arr[PageIndex])
		}
	}
	if(mode === 'CharFace')
	{
		if(!mt_charface[id])EMOJI.custom.title = ''
	}
	else
	{
		if(['QNZL','YGST'].includes(mt_settings['选择游戏']))EMOJI.custom.title = ''
	}

	let str = toString(EMOJI.images[0])
	if(str.includes('_REPAIR'))EMOJI.title += `(${EMOJI.images.length}修复)`
	else if(str.includes('_OLD'))EMOJI.title += `(${EMOJI.images.length}旧设)`
	else if(str.includes('CharID_'))EMOJI.title += `(${EMOJI.images.length}拓展)`
	else if(EMOJI.custom.io)EMOJI.title += `(${EMOJI.images.length}自定义)`
	else
	{
		EMOJI.title += `(${EMOJI.images.length})`
	}
	EMOJI.pageindex = `${PageIndex+1} / ${PageCount || 1}`
	setTimeout(function()
	{
		if($(`.差分映射.selected`).length)$(`.差分映射.selected`)[0].scrollIntoView({inline:'center',block: 'nearest'})
	}, 100)
	MoeTemp.setItem('差分书签',EMOJI.pages)
	if(EMOJI.custom.io)EMOJI.images.unshift('ADD')

	S(!0)

	setTimeout(function()
	{
		$('.PopupEmoticonChat__Section2-sc-vzjcea-0').scrollTop(EMOJI.pages[id].scrollTop)
	}, 100)
}
function moeLog(arr,mode = false)
{
	//if(replyDepths.slice(-1)[0] !== 0)return;
	if(!mode)
	{
		操作历史.list.length = 操作历史.index+1
		操作历史.index++
		if(操作历史.list.length > 9)
		{
			操作历史.list.shift()
			操作历史.index--
		}
		操作历史.list.push(arr)
	}
	else
	{
		操作历史.list[操作历史.index] = arr
	}
	log()
	moetalkStorage.setItem('moeLog', 操作历史);
}
function 撤销(goback)
{
	$(".dels").prop("checked",false).parent().css("background-color","").css('border-top','')
	if(goback === '前进')操作历史.index++
	let data = 操作历史.list[操作历史.index].chats
	let indexs = 操作历史.list[操作历史.index].indexs
	let mode = 操作历史.list[操作历史.index].mode
	if(mode === 'add' || mode === '追加')
	{
		sendMessage(data,'','delete',indexs,!0)
	}
	else if(mode === 'delete')
	{
		sendMessage(data,'','追加',indexs,!0)
	}
	else
	{
		sendMessage(data,'','edit',indexs,!0)
	}

	if(goback === '撤销')操作历史.index--
	log()
}
function log(clear = false)
{
	if(clear)
	{
		操作历史 = {index: -1, list: []}
		CHAT_history = [操作历史, {}]
	}
	let mode = 操作历史.list[操作历史.index] ? 操作历史.list[操作历史.index].mode : ''
	if(操作历史.index > -1 && 操作历史.index < 操作历史.list.length-1)
	{
		$('.撤销').show().text(mode === 'add' || mode === '追加' ? '◀撤销追加' : mode === 'delete' ? '◀撤销删除' : '◀撤销编辑')
	}
	else $('.撤销').hide()

	if(操作历史.index < 操作历史.list.length-1)
	{
		mode = 操作历史.list[操作历史.index+1] ? 操作历史.list[操作历史.index+1].mode : mode
		$('.前进').show().text(mode === 'add' || mode === '追加' ? '恢复删除▶' : mode === 'delete' ? '恢复追加▶' : '恢复编辑▶')
	}
	else
	{
		$('.前进').hide()
		if(操作历史.index === -1)
		{
			$('.撤销').hide()
		}
		else
		{
			$('.撤销').show().text(mode === 'add' || mode === '追加' ? '◀撤销追加' : mode === 'delete' ? '◀撤销删除' : '◀撤销编辑')
		}
	}
}
function 复制()
{
	粘贴板 = []
	if($(".dels:checked").length)
	{
		let index;
		$(".dels:checked").each(function()
		{
			index = $('.dels').index($(this))
			粘贴板.push(chats[index])
		})
		$(".粘贴").show()
	}
	else
	{
		$(".粘贴").hide()
	}
}
function 粘贴()
{
	let index = $('.dels').index($(".dels:checked:eq(0)"))
	let indexs = []
	let length = 粘贴板.length
	for(let i = 0;i < length;i++)
	{
		if(index !== -1)indexs.push(index+i)
		else indexs.push(index)
	}
	sendMessage(粘贴板,'','追加',indexs)
}
function isfirst(chatIndex,chats,mode)
{
	if(chats[chatIndex])
	{
		let typeArr = ['heart','info','reply']
		if(mode === 'player')typeArr.pop()

		if(chatIndex-1 < 0)return true//首条消息
		if((chats[chatIndex].isCenter && chats[chatIndex].type === 'image') || (chats[chatIndex-1].isCenter && chats[chatIndex-1].type === 'image'))return true//isCenter
		if((chats[chatIndex].heads && chats[chatIndex].heads.list.length) || (chats[chatIndex-1].heads && chats[chatIndex-1].heads.list.length))return true//头像列表
		if(typeArr.includes(chats[chatIndex].type))return true//判断类型
		if(typeArr.includes(chats[chatIndex-1].type))return true//类型不符

		if(chats[chatIndex].sCharacter.index != chats[chatIndex-1].sCharacter.index)return true//头像不符
		if(chats[chatIndex].sCharacter.no != chats[chatIndex-1].sCharacter.no)return true//ID不符

		if(chats[chatIndex].sCharacter.no == 0 && !typeArr.includes(chats[chatIndex].type))return false//判断主角

		if(chats[chatIndex].isFirst)return true//强制显示
		if(chats[chatIndex].is_breaking)return true//截图分割
		if(toString(chats[chatIndex].name) != toString(chats[chatIndex-1].name))return true//名字不符
		if(isTrue(chats[chatIndex].isRight) != isTrue(chats[chatIndex-1].isRight))return true//位置不符
	}
	return false
}
function makeMessage(type,data,chatIndex,mode)
{
	let 聊天,头像,头像框,对话,名称,文本,图片;
	let no = data.sCharacter.no
	let index = data.sCharacter.index
	let alt = ''
	let head = ''
	let selected = false
	let color = 'transparent';
	if(mode === 'capture' || mode === 'area')
	{
		alt = 'alt="capture"'
		head = true
		selected = mode === 'area' ? true : false
	}
	else if(mode === '预览')
	{
		head = data.isFirst
	}
	else
	{
		alt = ''
		head = isfirst(chatIndex,chats)
		selected = $(`.dels:eq(${chatIndex})`).prop('checked') && mode !== 'add' && mode !== '追加' ? true : false
	}

	if(data.isFirst === true)color = 'blue';
	if(data.is_breaking === true)color = 'red';
	//data.time = data.time ? data.time : ''

	let style = '';
	let 对话角颜色 = '';
	if(mt_settings['文字样式'][type])
	{
		style = `font-size:${mt_settings['文字样式'][type]['font-size']};`
	}
	foreach([...data.style || [],...mt_settings.风格样式[type] || []],function(k,v)
	{
		style += `${v[0]}:${v[1]};`
		if(v[0] == 'background-color')对话角颜色 = v[1]
	})
	if(data.heads && (!data.heads.list || data.heads.list.length < 1))delete data.heads
	if(type === 'chat' || type === 'image')
	{
		let headstyle = data.heads ? `style="z-index:${data.heads.list.length};"` : ''
		头像 = head ? `<img src="${loadhead(no,index)}" alt="${index}" class="头像"${headstyle} onerror="IMAGE_error(this)">` : ''
		headstyle = ''
		if(data.heads && head)
		{
			headstyle = `margin-${data.heads.direction === 'column' ? 'top' : 'left'}:${data.heads.margin ? data.heads.margin : '-1.5rem'};`
			data.heads.list.map(function(index,k)
			{
				头像 += `<img src="${loadhead('LIST',index)}" class="头像"style="${headstyle};z-index:${data.heads.list.length-k-1};" onerror="IMAGE_error(this)">`
			})
			headstyle = 'min-width:max-content;'
			headstyle += `padding-${no != 0 && !data.isRight ? 'right' : 'left'}:1rem;`
			headstyle += `flex-direction:${data.heads.direction};`
			
		}
		if(type === 'image')
		{
			let width = ''
			let maxwidth = mt_settings['图片比例'] || '90%'
			if(data.content.includes("Face") || data.file.includes("Face"))
			{//如果是差分表情
				width = 'max-height:360px;'
				maxwidth = mt_settings['差分比例'] || '90%'
			}
			maxwidth = `max-width:${maxwidth};`
			图片 = `<img src='${!data.file ? data.content : data.file}' style="${width}${maxwidth};${style}" class="图片 编辑" onerror="IMAGE_error(this)">`
		}
		if(no != 0 && !data.isRight)
		{//左侧对话
			头像框 = `<div class="头像框" style="cursor: pointer;${headstyle}">${头像}</div>`
			名称 = `${head ? `<span class="名称 bold">${data.name || loadname(no,index)}</span>` : ''}`
			文本 = `${head ? `<div class="左角" style="border-right-color:${对话角颜色};"></div>` : ''}<span class="文本 编辑" style='${style}'>${data.content}</span>`
			对话 = 
			`${头像框}
			<div class="对话" style="align-items: flex-start;height: ${data.heads && data.heads.fullHeight ? '100%' : ''}">
				${名称}
				<div style="display: flex; height: 100%;">
					${type === 'chat' ? 文本 : 图片}
					${data.time ? `<span class="时间戳">${data.time}</span>` : ''}
				</div>
			</div>`
		}
		else
		{//右侧对话或主角发言
			头像框 = `${no == 0 ? '' : `<div class="头像框" style="justify-content: flex-end; cursor: pointer;${headstyle}">${头像}</div>`}`
			名称 = `${head && no != 0 ? `<span class="名称 bold">${data.name || loadname(no,index)}</span>` : ''}`
			文本 = `<span style="background: rgb(74, 138, 202);${style}" class="文本 编辑">${data.content}</span>${head || no == 0 ? `<div class="右角" style="border-left-color:${对话角颜色};"></div>` : ''}`
			对话 = 
			`${no == 0 ? '<div class="头像框" style="margin-right: 1.5rem;"></div>' : ''}
			<div class="对话" style="align-items: flex-end;height: ${data.heads && data.heads.fullHeight ? '100%' : ''}">
				${名称}
				<div style="display: flex;justify-content: flex-end; height: 100%;">
					${data.time ? `<span class="时间戳" style="text-align: right;">${data.time}</span>` : ''}
					${type === 'chat' ? 文本 : 图片}
				</div>
			</div>
			${头像框}`
		}
		if(data.isCenter && type === 'image')
		{
			对话 = 
			`<div class="对话" style="align-items: center;">
				<div style="display: flex;justify-content: center;">
					${type === 'chat' ? 文本 : 图片}
				</div>
			</div>`
		}
		聊天 = `<div class="聊天">${对话}</div>`
	}
	if(type === 'heart')
	{
		聊天 = 
		`<div class="头像框"></div>
		<div class="羁绊" style='background-image: url(${羁绊背景});'>
			<div class="消息标题">
				<div class="竖线" style='border-left: 2px solid rgb(255, 142, 155);'></div>
				<span class="bold">${mt_text['relationship_event'][mtlang]}</span>
			</div>
			<hr class="横线">
			<button class="羁绊按钮 编辑" style='${style}'>${data.content || ((data.name || loadname(no,index))+mt_text['go_relationship_event'][mtlang])}</button>
		</div>`
	}
	if(type === 'info')
	{
		data.isLeft ? style += 'text-align: left;' : ''
		data.isRight ? style += 'text-align: right;' : ''
		聊天 = `<span class="旁白 编辑" style='${style}'>${data.content}</span>`
	}
	if(type === 'reply')
	{
		let 选择肢 = '';
		let 编辑图标 = '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="pen-to-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"></path></svg>'

		$.each(data.content.split('\n'),function(k,v)
		{
			选择肢 += `<button class="选择肢 跳转" style='${style}'>${v}</button>`
		})
		聊天 = 
		`<div class="头像框"><button data-html2canvas-ignore="true" data-capture="exclude" class="编辑按钮 编辑">${编辑图标}</button></div>
		<div class="回复" style='background-image: url(${回复背景});'>
			<div class="消息标题">
				<div class="竖线" style='border-left: 2px solid rgb(39, 153, 228)'></div>
				<span class="bold">${mt_text['reply'][mtlang]}</span>
			</div>
			<hr class="横线">
			${选择肢}
		</div>`
	}
	let 复选框 = ''
	if($('.tools').css('display') !== 'none')
	{
		复选框 = `<input type="checkbox" ${selected ? 'checked' : ''} class="dels" style="background-color: ${color};" data-html2canvas-ignore="true">`
	}
	if(mode === '预览')复选框 = ''
	return `<div class="消息" title='${color}' style="${head ? '' : 'padding: 0.5rem 1rem 0px;'}background-color:${selected && mode !== 'area' ? '#CAD7DD;' : mt_settings.风格样式.bgColor};" ${alt}>
		${聊天}
		${复选框}
	</div>`
}
function sendMessage(data,type,mode = 'add',indexs = [],撤销 = false)
{
	let addChat = $(".操作模式").text() == '追加'
	$(".编辑界面 .取消").click()
	let dels = $('.dels')
	let checked = $(".dels:checked")
	if(indexs.length === 0)indexs[0] = dels.index(checked)
	let replyDepth = replyDepths.slice(-1)[0]
	let nextindex;
	
	let arr = {chats: [],mode: mode};//操作记录
	if(!data[0])data.replyDepth = replyDepth//单条消息发送专用
	$.each(indexs,function(k,chatIndex)
	{
		if(chatIndex === -1)
		{//末尾追加
			chatIndex = chats.length
			indexs[k] = chatIndex
		}
		if(mode === 'delete')
		{
			chatIndex = chatIndex-k
			arr.chats.push(chats[chatIndex])//删除前的消息
			chats.splice(chatIndex,1)
		}
		if(mode === 'edit')
		{
			arr.chats.push(chats[chatIndex])//编辑前的消息
			chats[chatIndex] = 撤销 ? data[k] ? data[k] : data : {...chats[chatIndex],...data[k] ? data[k] : data}
			if(type)
			{
				if(chats[chatIndex].type === 'image' && type !== 'image')
				{
					chats[chatIndex].file = ''
				}
				chats[chatIndex].type = type
			}
		}
		if(mode === 'add')
		{
			data.type = type
			if(addChat)
			{
				indexs[k] = chatIndex = chatIndex+1//向后追加
				data.sCharacter = {no: $('.角色头像').attr('alt'),index: $('.角色头像').attr('title')}
			}
			else
			{
				//data.isFirst = !1
				if(mt_settings['右侧发言'][mt_settings['选择角色'].no] && ['chat','image'].includes(type))data.isRight = true
				//data.isRight = ['chat','image'].indexOf(type) > -1 && mt_settings['右侧发言'][mt_settings['选择角色'].no]
				//data.is_breaking = !1
				data.sCharacter = {no:mt_settings['选择角色'].no,index:mt_settings['选择角色'].index}
				if(checked.length)chatIndex = dels.index(checked)//向前追加
				else chatIndex = chats.length//末尾追加
			}
			try
			{
				chats.splice(chatIndex,0,data)
			}
			catch(error)
			{
				let newchats = []
				chats.map(function(v,k){newchats[k] = v})
				chats = newchats
				chats.splice(chatIndex,0,data)
			}
			arr.chats.push(chats[chatIndex])//追加后的消息
		}
		if(mode === '追加')
		{
			chats.splice(chatIndex,0,{...data[k],...{replyDepth:replyDepth}})//防止变量被连带修改
			arr.chats.push(chats[chatIndex])//追加后的消息
		}
		//显示
		let message = mode === 'delete' ? '' : makeMessage(chats[chatIndex].type,chats[chatIndex],chatIndex,mode)
		if(mode === 'delete')
		{
			$(`.消息:eq(${chatIndex})`).remove()
			chatIndex = chatIndex-1
		}
		if(mode === 'edit')
		{
			let chat = chats[chatIndex]

			$(`.消息:eq(${chatIndex})`)[0].outerHTML = message
		}
		if(mode === 'add')
		{
			if(chats.length === 1)$('.消息底座').before(message)
			else
			{
				if(checked.length && !addChat)
				{
					$(`.消息:eq(${chatIndex})`).before(message)
				}
				else
				{
					$(`.消息:eq(${chatIndex-1})`).after(message)
				}
			}
		}
		if(mode === '追加')
		{
			if(dels.length <= chatIndex)$('.消息底座').before(message)
			else
			{
				$(`.消息:eq(${chatIndex})`).before(message)
			}
		}
		//处理下条消息
		let nextchat = chats[chatIndex+1] && (!indexs[k+1] || indexs[k]+1 !== indexs[k+1]) ? chats[chatIndex+1] : false
		if(nextchat)$(`.消息:eq(${chatIndex+1})`)[0].outerHTML = makeMessage(nextchat.type,nextchat,chatIndex+1)
		nextindex = (mode === 'add' || mode === 'delete') && chatIndex !== -1 ? `.消息:eq(${chatIndex})` : ''
		if((撤销 || addChat || mode === '追加' || (mode === 'edit' && 撤销 !== null)) && mode !== 'delete')
		{
			nextindex = blink(`.消息:eq(${chatIndex})`) ? `.消息:eq(${chatIndex})` : ''
		}
	})
	arr.indexs = indexs;moeLog(arr,撤销)//添加操作记录
	setTimeout(function()
	{//编辑位置跳转
		let behavior = "smooth"
		if(['heart','info','reply'].includes(type) && !browser.isDeskTop)
		{
			behavior = "auto"
			if(winHeight === window.innerHeight)behavior = "smooth"
		}
		if(nextindex)$(nextindex)[0].scrollIntoView({block:'center',behavior:behavior})
	}, 1)
	if(!mt_settings['后台保存'])saveStorage('chats',[...chats,...otherChats],'local')
	if(checked.length)$('.消息').css('border-top','').find(".dels:checked").eq(0).parent().css('border-top','2px dashed #a2a2a2')//更新追加虚线
	chats.length ? $('.INDEX_tips').hide() : $('.INDEX_tips').show()//开头提示
	INIT_state()
}
$("body").on('click',".内容类型",function()
{
	if($('.内容类型_列表:visible').length)$('.内容类型_列表').hide()
	else $('.内容类型_列表').show()
});
$("body").on('click',".内容类型_列表",function()
{
	let type = this.title
	$('.内容类型').html('类型：'+this.innerHTML).attr('title',type)
	$('.内容类型_说明').text(mt_text[type][mtlang])
	if(type == 'image')$('.图片信息').show().next().hide()
	else $('.内容信息').show().prev().hide()

	显示位置_说明(type,$('.显示位置').attr('title'))
});

$("body").on('click',".显示位置",function()
{
	let 位置 = this.title
	let arr = {}
	if($(".dels:checked").length > 1)
	{
		arr = {isLeft:'<<',isCenter:'><',isRight:'>>',isDefault:'<>'}
		if(位置 == 'isLeft')位置 = 'isCenter'
		else if(位置 == 'isCenter')位置 = 'isRight'
		else if(位置 == 'isRight')位置 = 'isDefault'
		else 位置 = 'isLeft'
	}
	else
	{
		arr = {isLeft:'<<',isCenter:'><',isRight:'>>'}
		if(位置 == 'isLeft')位置 = 'isCenter'
		else if(位置 == 'isCenter')位置 = 'isRight'
		else 位置 = 'isLeft'
	}

	$('.显示位置').html('位置：'+`<span class='bold' style='color: rgb(45, 70, 100);'>${arr[位置]}</span>`).attr('title',位置)
	显示位置_说明($('.内容类型').attr('title'),位置)
});
function 显示位置_说明(类型,说明)
{
	let 角色头像 = $('.角色头像')[0]
	let arr =  {isLeft:'靠左',isCenter:'居中',isRight:'靠右'}
	if($(".dels:checked").length < 2)
	{
		if(类型 == 'chat')arr = {isLeft:'默认靠左',isCenter:'默认靠左',isRight:'靠右'}
		if(类型 == 'reply' || 类型 == 'heart' || 角色头像.alt == 0)arr = {isLeft:'默认靠右',isCenter:'默认靠右',isRight:'默认靠右'}
		if(类型 == 'info')arr = {isLeft:'靠左',isCenter:'默认居中',isRight:'靠右'}
		if(类型 == 'image')
		{
			arr = {isLeft:'默认靠左',isCenter:'居中',isRight:'靠右'}
			if(角色头像.alt == 0)arr = {isLeft:'默认靠右',isCenter:'居中',isRight:'默认靠右'}
		}
	}
	arr.isDefault = '默认位置'
	$('.显示位置_说明').text(arr[说明])
}

$("body").on('click',".截图切割",function()
{
	截图切割_说明(!this.title)
});
function 截图切割_说明(截图切割)
{
	if(截图切割)
	{
		$('.截图切割').attr('title','截图切割').html('切割：<span class="bold" style="color: rgb(45, 70, 100);">√</span>')
		$('.截图切割_说明').html('<span style="color:red;">截图时在此处切割</span>')
	}
	else
	{
		$('.截图切割').removeAttr('title').html('切割：<span class="bold" style="color: rgb(45, 70, 100);">×</span>')
		$('.截图切割_说明').text('')
	}
}

$("body").on('click',".角色头像",function()
{
	角色头像_说明(!$('.角色头像_说明').attr('title'))
});
function 角色头像_说明(isFirst)
{
	if(isFirst)$('.角色头像_说明').html('<span style="color:blue;">显示头像</span>').attr('title','显示头像')
	else $('.角色头像_说明').text('').removeAttr('title')
}
function 生成消息(内容类型,length)
{
	//角色
	let 角色头像 = $('.角色头像')[0]
	let 角色名称 = $('.角色名称').val()
	let 显示头像 = $('.角色头像_说明').attr('title')
	//属性
	let 显示位置 = $('.显示位置').attr('title')
	let 截图切割 = $('.截图切割').attr('title')
	//数据
	let 内容信息 = $('.内容信息').val()
	let 图片信息 = $('.图片信息 img').attr('src')
	let 时间信息 = $('.时间信息').val()

	let data = {}
	if(length > 1)
	{
		if(角色头像.alt)data.sCharacter = {no: 角色头像.alt,index: 角色头像.title}
		if(显示头像 != 'noEdit')data.isFirst = 显示头像 == '显示头像'
		if(角色名称 !== '')data.name = 角色名称 === ' ' ? '' : 角色名称
		
		if(显示位置 == 'isDefault')data.isLeft = data.isCenter = data.isRight = false
		else if(显示位置 != 'noEdit')
		{
			data.isLeft = 显示位置 === 'isLeft'
			data.isCenter = 显示位置 === 'isCenter'
			data.isRight =  显示位置 === 'isRight'
		}
		if(截图切割 != 'noEdit')data.is_breaking = 截图切割 === '截图切割'

		if(内容信息 !== '')data.content = 内容信息 === ' ' ? '' : 内容信息
		if(内容类型 === 'image' && 图片信息)data.file = 图片信息
		if(时间信息 !== '')data.content = 时间信息 === ' ' ? '' : 时间信息

		if(CHAT_HeadList)data.heads = CHAT_HeadList
		if(CHAT_Style)data.style = CHAT_Style

		return data
	}
	data.sCharacter = {no: 角色头像.alt,index: 角色头像.title}
	data.isFirst = 显示头像 == '显示头像'
	data.name = 角色名称

	data.isLeft = 显示位置 === 'isLeft'
	data.isCenter = 显示位置 === 'isCenter'
	data.isRight =  显示位置 === 'isRight'
	data.is_breaking = 截图切割 === '截图切割'

	data.content = 内容信息
	data.file = 内容类型 === 'image' ? 图片信息 : ''
	data.time = 时间信息

	data.heads = CHAT_HeadList ? CHAT_HeadList : {direction:'row',list:[]}
	data.style = CHAT_Style

	return data
}
$("body").on('click',".编辑界面 .确认",function()
{
	let indexs = []
	$('.dels:checked').each(function(k,v){indexs.push($('.dels').index(v))})
	let 操作模式 = $(".操作模式").text() == '追加' ? 'add' : 'edit'
	let 内容类型 = $('.内容类型').attr('title')
	if(!['chat','reply','heart','info','image'].includes(内容类型))内容类型 = ''
	if(indexs.length < 2)indexs = [chatIndex]
	sendMessage(生成消息(内容类型,indexs.length),内容类型,操作模式,indexs)
});
$("body").on('click',".编辑界面 .取消",function()
{
	$('.编辑界面').removeClass('visible')
	$('.内容界面').show()
	$('.预览界面').hide()
	$('.预览内容').html('')
	$(".操作模式").text('编辑')
	$('.内容类型_列表').hide()
	CHAT_HeadList = false
	CHAT_Style = false
});
$("body").on('click',".编辑界面 .删除",function()
{
	$('.dels:checked').length > 1 ? $('.INDEX_delete').click() : sendMessage({},'','delete',[chatIndex])
});
$("body").on('click',".设置头像",function()
{
	let no = $('.角色头像').attr('alt')
	let index = $('.角色头像').attr('title')
	let HeadList = {direction:'row',list:[]}
	let checked = $('.dels:checked').length
	if(CHAT_HeadList)
	{
		HeadList = CHAT_HeadList
	}
	let str = ''
	str += '<label>头像排列：<input class="radio row" type="radio" name="direction" value="row">横向（注意排版）</label>\n'
	str += `<label>　　　　　<input class="radio column" type="radio" name="direction" value="column">竖向</label><input type="checkbox" class="fullHeight" ${HeadList.fullHeight ? 'checked' : ''}>文字消息自动铺满\n`
	str += `头像间距：<input style="font-size:1.2rem;" class="margin text" placeholder="默认值为 -1.5rem" value="${toString(HeadList.margin)}">\n\n`

	str += '<label><input class="radio" type="radio" name="mode" value="add">添加头像</label>'
	str += '<label><input class="radio" type="radio" name="mode" value="change" checked>切换角色</label>\n'
	str += `<img class="头像 N_char" src="${index ? loadhead(no,index) : href+'MoeData/Ui/error.webp'}" ${no ? `alt="${no}"` : ''}" ${index ? `title="${index}"` : ''}" onerror="IMAGE_error(this)">`
	str += `发言者名称：<input style="font-size:1.2rem;color:red;" class="text" placeholder="${$('.角色名称').attr('placeholder')}" value="${$('.角色名称').val()}"><div class="N_list">`
	HeadList.list.map(function(index,k)
	{
		str += `<img class="头像" src="${loadhead('LIST',index)}" title="${index}" style="cursor:pointer;" onclick="this.remove()" onerror="IMAGE_error(this)">`
	})
	str += '</div>\n'

	str += '头像列表：（点击选择）\n'
	let str1 = '$(".N_char").attr("src",loadhead(this.alt,this.title)).attr("alt",this.alt).attr("title",this.title).next().attr("placeholder",loadname(this.alt,this.title))'
	let str2 = '$(".N_list").append(`<img class="头像" src="${loadhead("LIST",this.title)}" title="${this.title}" style="cursor:pointer;" onclick="this.remove()" onerror="IMAGE_error(this)">`)'
	mt_settings['选择角色'].list.concat({no:'0',index:'1'}).map(function(v,k)
	{
		str += `<img class='头像' src='${loadhead(v.no,v.index)}' alt='${v.no}' title='${v.index}' style='cursor:pointer;' onclick='$(".radio:checked")[1].value === "change" ? ${str1} : ${str2}' onerror="IMAGE_error(this)">`
	})

	$(`.${HeadList.direction}`).click()
	let config = {}
	config.title = '设置头像'
	config.yes = function()
	{
		HeadList.direction = $('.radio:checked')[0].value
		HeadList.margin = $('.margin').val()
		HeadList.fullHeight = $('.fullHeight:checked').length ? true : false
		HeadList.list = []
		$('.fullHeight:checked').length ? HeadList.fullHeight = true : ''

		$('.N_list img[title]').map(function(k,v)
		{
			HeadList.list[k] = v.title
		})
		CHAT_HeadList = HeadList
		let img = $('.N_char')
		let hl = CHAT_HeadList.list.length
		let name = img.next()[0]
		$('.角色名称').attr('placeholder',name.placeholder).val(name.value)
		$('.角色头像_列表').text(hl ? `+${hl}头像` : '')
		$('.角色ID').text(img[0].alt ? 'ID：'+img[0].alt : '不更改角色')
		$('.设置头像').css('color',CHAT_HeadList.list.length || checked > 1 ? 'red' : 'rgb(75, 105, 137)')
		if(img[0].title)
		{
			$('.角色头像').attr({alt:img[0].alt,title:img[0].title,src:img[0].src})
		}
	}
	alert(str,config)
	if(HeadList.direction === "column")$(".radio.column").click()
	else $(".radio.row").click()
});
$("body").on('click',".定义样式",function()
{
	let checked = $('.dels:checked').length
	let text = `<textarea class="bold css scrollbar" style="font-size:1rem;width:100%;height:${$('body').height()*0.7};"></textarea>`
	let config = {}
	config.title = '内容样式'
	config.yes = function()
	{
		CHAT_Style = []
		let css = $('.css').val().split("\n");
		foreach(css,function(k,v)
		{
			v = v.replace(';','').replace('；','').replace('：',':')
			v = v.split(':')
			if(v.length === 2 && v[0].trim() !== '')
			{
				v[0] = v[0].trim()
				v[1] = v[1].trim()
				CHAT_Style.push(v)
			}
		})
		$('.定义样式').css('color',CHAT_Style.length || checked > 1 ? 'red' : 'rgb(75, 105, 137)')
	}
	alert(text,config)
	if(CHAT_Style.length)
	{
		let str = ''
		foreach(CHAT_Style,function(k,v)
		{
			if(v.length === 2)str += `${v[0]}: ${v[1]}\n`
		})
		$('.css').val(str).attr('placeholder',str)
	}
});
$("body").on('click',".操作模式",function()
{
	if($(".操作模式").text() == '追加')$(".操作模式").text('编辑')
	else $(".操作模式").text('追加')
});
$("body").on('click',".预览模式",async function()
{
	let color = $(this).css('color')
	let 内容类型 = $('.内容类型').attr('title')
	let data = 生成消息(内容类型)
	if(color === 'rgb(255, 0, 0)')
	{
		$('.内容界面').show()
		$('.预览界面').hide()
		$(this).css('color','rgb(185, 191, 197)')
		return
	}
	$(this).css('color','rgb(255, 0, 0)')
	$('.内容界面').hide()
	$('.预览界面').show()

	let chat = []
	if(chatIndex)chat.push(chats[chatIndex-1])

	chat.push(data)
	data.isFirst = isfirst(chat.length-1,chat)
	$('.预览内容').html(makeMessage(内容类型,data,chatIndex,'预览')).outerWidth(mt_settings['宽度限制']).css('background-color',mt_settings.风格样式.bgColor)
	await 等待图片($('.预览内容'))
	// await Promise.all([等待图片($('.预览内容')),document.fonts?.ready || Promise.resolve()]);
	$('.内容预览').click()
});
function 编辑消息(index)
{
	chatIndex = index
	$('.编辑界面').addClass('visible')//显示编辑界面
	$(".预览模式").css('color','')
	$(".操作模式").text('编辑')

	let checked = $('.dels:checked').length
	if(checked > 1)
	{
		$('.批量编辑').show()
		$('.编辑标题').hide()
		$('.显示开关').removeClass('selected').css('color','')
		$('.角色ID').text('不更改角色')
		$('.内容索引').text(`选中了${checked}条消息`)
		$('.角色头像_列表').text('')
		$('.角色名称').attr('placeholder','不修改名称').val('')
		$('.设置头像').css('color','black')
		$('.定义样式').css('color','black')

		$('.角色头像_说明').text('不修改头像').attr('title','noEdit')
		$('.内容类型_说明').text('不修改类型')
		$('.显示位置_说明').text('不修改位置')
		$('.截图切割_说明').text('不修改切割')

		$('.角色头像').attr('src',href+'MoeData/Ui/error.webp').removeAttr('alt title')
		$('.内容类型').text('类型').attr('title','noEdit')
		$('.显示位置').text('位置').attr('title','noEdit')
		$('.截图切割').text('切割').attr('title','noEdit')

		$('.图片信息').hide().find('img').attr('src','')
		$('.内容信息').val('').attr('placeholder','不修改内容').show().click();
		$('.时间信息').val('').attr('placeholder','不修改信息').click();

		return
	}
	$('.批量编辑').hide()
	$('.编辑标题').show()

	let chat = chats[chatIndex]

	$('.角色ID').text('ID：'+chat.sCharacter.no)
	$('.内容索引').text(`(${chatIndex+1}/${chats.length})`)
	$('.设置头像').css('color',chat.heads && chat.heads.list && chat.heads.list.length ? 'red' : 'black')
	$('.定义样式').css('color',chat.style && chat.style.length ? 'red' : 'black')

	$('.角色头像').attr({alt:chat.sCharacter.no,title:chat.sCharacter.index,src:loadhead(chat.sCharacter.no,chat.sCharacter.index)})
	$('.角色名称').attr('placeholder',loadname(chat.sCharacter.no,chat.sCharacter.index)).val(toString(chat.name)).click()
	let hl = chat.heads && chat.heads.list ? chat.heads.list.length : 0
	$('.角色头像_列表').text(hl ? `+${hl}头像` : '')
	let arr = {isLeft:'<<',isCenter:'><',isRight:'>>'}
	let 位置 = chat.isRight ? 'isRight' : chat.isCenter ? 'isCenter' : 'isLeft'
	if(!chat.isLeft && !chat.isCenter && !chat.isRight)
	{
		if(chat.type == 'chat' || chat.type == 'image')位置 = 'isLeft'
		if(chat.type == 'reply' || chat.type == 'heart')位置 = 'isRight'
		if(chat.type == 'info')位置 = 'isCenter'
	}
	$('.显示位置').html('位置：'+`<span class='bold' style='color: rgb(45, 70, 100);'>${arr[位置]}</span>`).attr('title',位置)
	显示位置_说明(chat.type,位置)
	截图切割_说明(chat.is_breaking)
	角色头像_说明(chat.isFirst)
	$(`.内容类型_列表[title="${chat.type}"]`).click()

	$('.内容信息').val(chat.content).attr('placeholder',chat.content || '').click();
	$('.图片信息 img').attr('src',chat.file)
	$('.时间信息').val(toString(chat.time)).attr('placeholder',chat.time || '').click();

	if(chat.heads)CHAT_HeadList = {...chat.heads,...{}}	
	if(chat.style)CHAT_Style = [...chat.style,...[]]
}
$("body").on('click',".编辑",function(){编辑消息($('.消息').index($(this).parents('.消息')))});
$("body").on('click',".头像框",function()
{
	chatIndex = $('.消息').index($(this).parents('.消息'))
	if(chats[chatIndex].type === 'chat' || chats[chatIndex].type === 'image')
	{
		sendMessage({...chats[chatIndex],...{isFirst:!chats[chatIndex].isFirst}},chats[chatIndex].type,'edit',[chatIndex],null)
	}
});

$("body").on('click',".差分映射",function()
{
	差分映射 = []
	差分映射.id = $(this).attr('alt')
	差分映射.index = $(this).attr('title')
	$('.INDEX_Emoji').click()
});
$("body").on('click',".INDEX_delete",function()
{
	if(!chats.length && (replyDepths.slice(-1)[0] !== 0 || !otherChats.length))return;
	let indexs = []
	let str = ''
	let title = ''
	let clear = false

	if($(".dels:checked").length)
	{
		$('.dels:checked').each(function(k,v)
		{
			indexs.push($('.dels').index(v))
		})
		title = '批量删除'
		str += `您一共选中了${$(".dels:checked").length}条消息\n\n点击【${mt_text.confirm[mtlang]}】将删除\n`
		str += '操作可撤销'
	}
	else
	{
		indexs = Object.keys(chats)
		let length = indexs.length
		for (let i = 0; i < length; i++)
		{
			indexs[i] = i
		}
		title = '删除消息'
		str += `点击【${mt_text.confirm[mtlang]}】将所有内容全部删除\n`
		str += '包括所有选择分支\n\n'
		str += '可在项目管理中恢复'
	}
	
	let config = {}
	config.title = title
	config.id = Math.random().toString().replace('0.','')
	config.yes = async function()
	{
		if(config.title != '批量删除')
		{
			let info = {}
			info.title = '读取或删除前的项目'
			info.nickname = '自动备份'
			info.date = getNowDate();
			await MoeProject.setItem('自动备份',await 生成存档(info))
			otherChats = []
			clear = true
			mt_schar = {}
			EMOJI.pages = {}
			charList(!0)//更新列表
			MoeTemp.clear()
		}
		sendMessage({},'','delete',indexs)
		log(clear)
	}
	alert(str,config)
});

$("body").on('click',".INDEX_EmojiIfno",function()
{
	$(this).prev().click()
});
//存档
//自定义角色
//自定义表情
//设置
//差分信息
var CHAT_HeadList = false
var CHAT_Style = false

// 编辑界面 100
// 角色列表 200
// 表情界面 300
// 角色编辑 300
// 截图界面 300
// 通知界面 1000