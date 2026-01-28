/*@MoeScript/Old/OLD.js@*/
function 编辑消息(index)
{
	chatIndex = index
	let chat = chats[chatIndex]
	CHAT_HeadList = $('.dels:checked').length < 2 && chats[chatIndex] && chats[chatIndex].heads ? {...chats[chatIndex].heads,...{}} : false
	$('.编辑界面').addClass('visible')//显示编辑界面
	$('.edit_2_1_1 input').hide().prop('checked',false)
	$('.edit_2_1_1 label').hide()

	$('.edit_button button').hide().removeClass('selected')
	if($('.dels:checked').length < 2)$(`.edit_button .${chat.type}`).addClass('selected') 

	$('.edit_3').show()
	$('.图片选项').hide()
	$('.图片文件').attr({src: '',title: ''})
	
	$('.content').innerHeight(27)
	$('.time').innerHeight(27)
	if($('.dels:checked').length > 1)
	{
		$('.typeTitle').text('批量编辑')

		$('.角色头像').removeAttr('alt').removeAttr('title').attr('src',href+'MoeData/Ui/setting.webp')//.prev().text(CHAT_HeadList ? '列表' : '角色')

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

		$('.角色头像').attr('alt',chat.sCharacter.no).attr('title',chat.sCharacter.index).attr('src',loadhead(chat.sCharacter.no,chat.sCharacter.index))//.prev().text(CHAT_HeadList || (chats[chatIndex] && chats[chatIndex].heads) ? '列表' : '角色')

		if(chat.type === 'image')
		{
			$('.isCenter').show().prop('checked',chat.isCenter).parent().show()
			$('.图片选项').show()
			$('.edit_3').hide()
			let file = chat.file || ''
			if(!file.startsWith('data:'))$('.图片文件').attr({src: file,title: file})
			else $('.图片文件').attr({src: file,title: chat.content})
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
	let type = $(this).attr('title')
	$('.edit_button button').removeClass('selected')
	$(`.edit_button .${type}`).addClass('selected')
	if(type === 'image')
	{
		$('.edit_3').hide()
		$('.dels:checked').length < 2 || $('.editTalk').prop('checked') ? $('.isCenter').show().parent().show() : ''
		$('.图片选项').show()
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