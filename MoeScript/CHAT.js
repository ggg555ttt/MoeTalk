var chatIndex = -1//消息索引

var 粘贴板;

var replyDepths = [0];//选择肢总集

var allChats = false
var otherChats = []//其他分支内容
var chats = []//当前分支内容
var 差分映射 = false

var 操作历史 = {index: -1,list: []}
var CHAT_history = [操作历史,{}]
var EMOJI = {io:'NO',type:'NO',pages:localStorage['差分书签'] ? JSON.parse(localStorage['差分书签']) : {}}
var EMOJI_CustomEmoji = {image:{}}
mt_settings['表情信息'] = mt_settings['表情信息'] ? mt_settings['表情信息'] : {}
moetalkStorage.getItem('DB_EMOJI', function(err, DB_EMOJI)
{
	EMOJI_CustomEmoji = DB_EMOJI ? DB_EMOJI : EMOJI_CustomEmoji
	if(EMOJI_CustomEmoji.id)
	{
		EMOJI_CustomEmoji.Emoji = EMOJI_CustomEmoji.id
		delete EMOJI_CustomEmoji.id
	}
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
			if(cfid.indexOf('/') > -1)EMOJI.custom.from = CustomFaceAuthor[cfid.split('/')[0]]
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
		if(['QNZL','YGST'].indexOf(mt_settings['选择游戏']) > -1)EMOJI.custom.title = ''
	}

	let str = toString(EMOJI.images[0])
	if(str.indexOf('_REPAIR') > -1)EMOJI.title += `(${EMOJI.images.length}修复)`
	else if(str.indexOf('_OLD') > -1)EMOJI.title += `(${EMOJI.images.length}旧设)`
	else if(str.indexOf('CharID_') > -1)EMOJI.title += `(${EMOJI.images.length}拓展)`
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
	saveStorage('差分书签',EMOJI.pages,'local')
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
		if(chats[chatIndex].isCenter || chats[chatIndex-1].isCenter)return true//isCenter
		if((chats[chatIndex].heads && chats[chatIndex].heads.list.length) || (chats[chatIndex-1].heads && chats[chatIndex-1].heads.list.length))return true//头像列表
		if(typeArr.indexOf(chats[chatIndex].type) > -1)return true//判断类型
		if(typeArr.indexOf(chats[chatIndex-1].type) > -1)return true//类型不符

		if(chats[chatIndex].sCharacter.index != chats[chatIndex-1].sCharacter.index)return true//头像不符
		if(chats[chatIndex].sCharacter.no != chats[chatIndex-1].sCharacter.no)return true//ID不符

		if(chats[chatIndex].sCharacter.no == 0 && typeArr.indexOf(chats[chatIndex].type) < 0)return false//判断主角

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
	if(mt_settings['文字样式'][type])
	{
		style = `font-size:${mt_settings['文字样式'][type]['font-size']};`
	}
	if(data.heads && (!data.heads.list || data.heads.list.length < 1))delete data.heads
	if(type === 'chat' || type === 'image')
	{
		let headstyle = data.heads ? `style="z-index:${data.heads.list.length};"` : ''
		头像 = head ? `<img src="${loadhead(no,index)}" alt="${index}" class="头像"${headstyle}>` : ''
		headstyle = ''
		if(data.heads && head)
		{
			headstyle = `margin-${data.heads.direction === 'column' ? 'top' : 'left'}:${data.heads.margin ? data.heads.margin : '-1.5rem'};`
			data.heads.list.map(function(index,k)
			{
				头像 += `<img src="${loadhead('LIST',index)}" class="头像"style="${headstyle};z-index:${data.heads.list.length-k-1};">`
			})
			headstyle = 'min-width:max-content;'
			headstyle += `padding-${no != 0 && !data.isRight ? 'right' : 'left'}:1rem;`
			headstyle += `flex-direction:${data.heads.direction};`
			
		}
		if(type === 'image')
		{
			let width = ''
			let maxwidth = mt_settings['图片比例'] || '90%'
			if((data.content || data.file).indexOf("Face") > -1)
			{//如果是差分表情
				width = 'max-height:360px;'
				maxwidth = mt_settings['差分比例'] || '90%'
			}
			maxwidth = `max-width:${maxwidth};`
			图片 = `<img style="${width}${maxwidth};" class="图片 编辑" src='${data.file.indexOf(":image") > -1 ? data.file : href+data.file}'>`
		}
		if(no != 0 && !data.isRight)
		{//左侧对话
			头像框 = `<div class="头像框" style="cursor: pointer;${headstyle}">${头像}</div>`
			名称 = `${head ? `<span class="名称 bold">${data.name || loadname(no,index)}</span>` : ''}`
			文本 = `<span class="${head ? '文本 左角' : '文本'} 编辑" style='${style}'>${data.content}</span>`
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
			文本 = `<span style="background: rgb(74, 138, 202); border: 1px solid rgb(74, 138, 202);${style}" class="文本 编辑">${data.content}</span>${head || no == 0 ? '<div class="右角"></div>' : ''}`
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
		<div class="羁绊" style='background-image: url(${href}MoeData/Ui/Favor_Schedule_Deco.webp);'>
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
		data.isFirst && !data.isRight ? style += 'text-align: left;' : ''
		data.isRight && !data.isFirst ? style += 'text-align: right;' : ''
		聊天 = `<span class="旁白 编辑" style='${style}background: ${mt_settings['风格样式'][2]};'>${data.content}</span>`
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
		`<div class="头像框"><button data-html2canvas-ignore="true" class="编辑按钮 编辑">${编辑图标}</button></div>
		<div class="回复" style='background-image: url(${href}MoeData/Ui/Popup_Img_Deco_2.webp);'>
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
	return `<div class="消息" title='${color}' style="${head ? '' : 'padding: 0.5rem 1rem 0px;'}${selected && mode !== 'area' ? 'background-color: rgb(202, 215, 221);' : ''}" ${alt}>
		${聊天}
		${复选框}
	</div>`
}
function sendMessage(data,type,mode = 'add',indexs = [],撤销 = false)
{
	$('.editMessage').removeClass('visible')
	$('.chatText').val('').innerHeight(27)

	let dels = $('.dels')
	let checked = $(".dels:checked")
	if(indexs.length === 0)indexs[0] = dels.index(checked)
	let replyDepth = replyDepths.slice(-1)[0]
	let nextindex;
	let addChat = $('.addChat').prop('checked')
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
				data.sCharacter = {no: $('.editMessage .头像').attr('alt'),index: $('.editMessage .头像').attr('title')}
			}
			else
			{
				//data.isFirst = !1
				if(mt_settings['右侧发言'][mt_settings['选择角色'].no] && ['chat','image'].indexOf(type) > -1)data.isRight = true
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
			if(chats.length === 1)$(".Talk__CContainer-sc-1uzn66i-1").append(message)
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
			if(dels.length <= chatIndex)$(".Talk__CContainer-sc-1uzn66i-1").append(message)
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
		if(['heart','info','reply'].indexOf(type) > -1 && !browser.isDeskTop)
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
$("body").on('click',".编辑",function()
{
	chatIndex = $('.消息').index($(this).parents('.消息'))
	let chat = chats[chatIndex]
	CHAT_HeadList = $('.dels:checked').length < 2 && chats[chatIndex] && chats[chatIndex].heads ? {...chats[chatIndex].heads,...{}} : false
	$('.editMessage').addClass('visible')//显示编辑界面
	$('.edit_2_1_1 input').hide().prop('checked',false)
	$('.edit_2_1_1 label').hide()

	$('.edit_button button').hide().removeClass('selected')
	if($('.dels:checked').length < 2)$(`.edit_button .${chat.type}`).addClass('selected') 

	$('.edit_3').show()
	$('.图片选项').hide()
	$('.图片文件').attr('src','').attr('title',chat.content)
	
	$('.content').innerHeight(27)
	$('.time').innerHeight(27)
	if($('.dels:checked').length > 1)
	{
		$('.typeTitle').text('批量编辑')

		$('.editMessage .头像').removeAttr('alt').removeAttr('title').attr('src',href+'MoeData/Ui/setting.webp')//.prev().text(CHAT_HeadList ? '列表' : '角色')

		$('.editType').show().parent().show()
		$('.editTalk').show().parent().show()

		$('.name').val('').attr('placeholder','默认')
		$('.time').val('').attr('placeholder','默认')
		$('.content').val('').attr('placeholder','默认')

	}
	else
	{
		$('.typeTitle').text(mt_text[chat.type][mtlang])

		$('.edit_button button').show()
		
		$('.addChat').show().parent().show()
		$('.isRight').show().prop('checked',chat.isRight).parent().show()
		$('.isFirst').show().prop('checked',chat.isFirst).parent().show()
		$('.is_breaking').show().prop('checked',chat.is_breaking).parent().show()

		$('.name').val(chat.name).attr('placeholder',loadname(chat.sCharacter.no,chat.sCharacter.index))
		$('.time').val(chat.time).attr('placeholder','支持换行').innerHeight($('.time')[0].scrollHeight)
		$('.content').val(chat.type === 'image' ? '' : chat.content).attr('placeholder',chat.content || '').innerHeight($('.content')[0].scrollHeight)

		$('.editMessage .头像').attr('alt',chat.sCharacter.no).attr('title',chat.sCharacter.index).attr('src',loadhead(chat.sCharacter.no,chat.sCharacter.index))//.prev().text(CHAT_HeadList || (chats[chatIndex] && chats[chatIndex].heads) ? '列表' : '角色')

		if(chat.type === 'image')
		{
			$('.isCenter').show().prop('checked',chat.isCenter).parent().show()
			$('.图片选项').show()
			$('.edit_3').hide()
			if(chat.file)
			{
				$('.图片文件').attr('src',chat.file)
			}
			else
			{
				$('.图片文件').hide()
			}
		}
		if(chat.type === 'info')
		{
			$('.isFirst').next().text('左侧对齐')
			$('.isRight').next().text('右侧对齐')
		}
		else
		{
			$('.isFirst').next().text('显示头像')
			$('.isRight').next().text('右侧发言')
		}
	}
	
});
$("body").on('click',".头像框",function()
{
	chatIndex = $('.消息').index($(this).parents('.消息'))
	if(chats[chatIndex].type === 'chat' || chats[chatIndex].type === 'image')
	{
		sendMessage({...chats[chatIndex],...{isFirst:!chats[chatIndex].isFirst}},chats[chatIndex].type,'edit',[chatIndex],null)
	}
});
$("body").on('click',".editType",function()
{
	if($(this).prop('checked'))
	{
		$('.edit_button button').show()
	}
	else
	{
		$('.edit_button button').hide()
	}
});
$("body").on('click',".editTalk",function()
{
	if($(this).prop('checked'))
	{
		$('.isRight').show().parent().show()
		$('.isFirst').show().parent().show()
		$('.edit_button .selected').attr('title') === 'image' ? $('.isCenter').show().parent().show() : ''
	}
	else
	{
		$('.isRight').hide().parent().hide()
		$('.isFirst').hide().parent().hide()
		$('.isCenter').hide().parent().hide()
	}
});
$("body").on('click',".edit_button button",function()
{
	let file = $('.图片文件').attr('src')
	let type = $(this).attr('title')
	$('.edit_button button').removeClass('selected')
	$(`.edit_button .${type}`).addClass('selected')
	if(type === 'image')
	{
		$('.edit_3').hide()
		$('.dels:checked').length < 2 || $('.editTalk').prop('checked') ? $('.isCenter').show().parent().show() : ''
		$('.图片选项').show()
		if(file)
		{
			$('.图片文件').attr('src',file)
		}
		else
		{
			$('.图片文件').hide().attr('src','')
			$('.图片信息').text($('.dels:checked').length < 2 ? '无图片' : '默认')
		}
	}
	else
	{
		$('.isCenter').hide().parent().hide()
		$('.图片选项').hide()
		$('.edit_3').show()
	}
	if(type === 'info')
	{
		$('.isFirst').next().text('左侧对齐')
		$('.isRight').next().text('右侧对齐')
	}
	else
	{
		$('.isFirst').next().text('显示头像')
		$('.isRight').next().text('右侧发言')
	}
});
$("body").on('click',".fzOyMd",function()
{
	let no = $(this).attr('alt')
	let index = $(this).attr('title')
	$('.editMessage .头像').attr('alt',no).attr('title',index).attr('src',loadhead(no,index))
	$('.name').attr('placeholder',loadname(no,index))
	saveStorage('设置选项',mt_settings,'local')
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
		str += `您一共选中了${$(".dels:checked").length}条消息\n\n点击【${mt_text.confirm[mtlang]}】将删除`
	}
	else
	{
		if(otherChats.length)str += '<input type="checkbox"><span class="bold red">删除全部项目</span>\n\n'
		indexs = Object.keys(chats)
		let length = indexs.length
		for (let i = 0; i < length; i++)
		{
			indexs[i] = i
		}
		title = '删除消息'
		str += `点击【${mt_text.confirm[mtlang]}】将此项目全部内容清空`
	}
	str += '\n\n操作可撤销'
	$('.notice .title').text(title)
	$('.notice .confirm').text(mt_text.confirm[mtlang])
	alert(str)
	TOP_confirm = function()
	{
		if($('.notice input:checked').length)
		{
			if(confirm('您勾选了“删除全部项目”\n此操作无法撤销，确定要继续吗？'))
			{
				$('.reply').hide()
				otherChats = []
				clear = true
			}
			else return
		}else if(!chats.length)return
		sendMessage({},'','delete',indexs)
		log(clear)
	}
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