/*@MoeScript/Old/OLD.js@*/
function compress(base64Img,type = 'head',mode = 'add',length = 0)
{
	var img = new Image();//创建一个空白图片对象
	img.src = base64Img;//图片对象添加图片地址
	img.onload = function()//图片地址加载完后执行操作
	{
		w = img.width;
		h = img.height;

		let x = 0;let y = 0;let l = w;//正方形头像

		if(type === 'image')w > 600 && (h *= 600 / w, w = 600)
		else
		{
			if(w > h)x = (w-h)/2,l = h,h = w;//竖图上下居中
			else y = (h-w)/2,l = w,w = h;//横图左右居中
			n = mt_settings['头像尺寸'] ? mt_settings['头像尺寸'] : 300;
			a = Math.min(1, n / w);(w *= a), (h *= a);//最大长度不得超过300
		}

		//开始画压缩图
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		canvas.width = w;//压缩图的宽度
		canvas.height = h;//压缩图的高度

		if(type === 'image')ctx.drawImage(img,0,0,w,h);
		else ctx.drawImage(img,x,y,l,l,0,0,w,h);

		var newBase64 = canvas.toDataURL("image/webp");

		if(type === 'image')
		{
			if(mode === 'edit')$('.图片文件').show().attr('src',newBase64).attr('title','')//编辑图片
			else if(mode === 'add')sendMessage({type: 'image',file: newBase64},'image',mode)//发送图片
			else//上传表情
			{
				let Emojis = $('.Emojis')
				if(Emojis[0].title === 'ADD')Emojis.append(`<img style='width:33%;' src='${newBase64}' onclick="this.remove()">`)
				else Emojis[0].src = newBase64
			}
		}
		else
		{
			if(mode === 'edit')$(".heads .selected").attr('src',newBase64)//编辑头像
			else
			{
				let attr = 'width="252" height="252" decoding="async" data-nimg="1" loading="lazy" style="color: transparent; margin-right: 0.5rem;" class="common__Profile-sc-1ojome3-6 common__ProfileClick-sc-1ojome3-7 eLaCqa fuyFOl"'
				let index = $('.heads img:eq(-1)').attr('title')
				if(index)
				{
					index = parseInt(index.replace(char_info.no,'').replace('_',''))
					if(isNaN(index))index = `${char_info.no}_0`
					else index = `${char_info.no}_${index+1}`
				}
				else index = char_info.no
				$('.heads').append(`<img src="${newBase64}" title="${index}" ${attr}>`)
				$('#custom-char .confirm').removeAttr('disabled')
			}
		}
		INIT_loading(false)
	}
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
function 编辑消息(index)
{
	chatIndex = index
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
}
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