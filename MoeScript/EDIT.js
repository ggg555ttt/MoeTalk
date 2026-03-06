/*@MoeScript/EDIT.js@*/
var 选择列表 = []
/**
 * 高性能动态高度虚拟滚动列表 (纯 JS 无框架版)
 * 专为百万级 DOM 和频繁增删改查设计
 */
// 核心优化：惰性获取复选框，完美解决 undefined 问题
function getCheckbox(el) {
	// 如果已经缓存过（哪怕缓存的是 null，代表没找到），直接返回
	if (el.__vs_checkbox !== undefined) return el.__vs_checkbox;
	
	// 如果是 undefined，说明是新生成的 DOM，去查一次并永久存入内存
	el.__vs_checkbox = el.querySelector('.dels');
	return el.__vs_checkbox;
}
// 核心优化：惰性获取并缓存 .名字 元素，速度提升百倍
function getNameElement(el) {
	// 如果内存里已经查过（哪怕是 null 表示没有），直接瞬间返回
	if (el.__vs_nameEl !== undefined) return el.__vs_nameEl;
	
	// 如果是 undefined，说明是新生成的节点，去 DOM 里查一次并永久缓存
	el.__vs_nameEl = el.querySelector('.名字');
	return el.__vs_nameEl;
}
class DynamicVirtualScroll {
	constructor(viewportSelector, containerSelector) {
		// 1. 获取 DOM 容器
		this.viewport = document.querySelector(viewportSelector);
		this.container = document.querySelector(containerSelector);
		if (!this.viewport || !this.container) {
			console.error("无法找到滚动容器或内容容器");
			return;
		}

		// 2. 核心状态初始化
		this.items = []; // 所有元素的虚拟节点缓存
		this.renderedIndices = new Set(); // 当前在屏幕内渲染的节点真实索引
		this.buffer = 5; // 上下防白屏缓冲节点数
		this.msgIndexMap = []; // O(1) 极速查询映射表：纯消息索引(chatIndex) -> 真实数组索引(realIndex)
		this.renderPending = false; // 渲染防抖锁

		// 3. 提取现有的子节点并初始化
		Array.from(this.container.children).forEach((el, index) => {
			this.items.push({
				el: el,
				height: el.offsetHeight || 80, // 预估保底高度 80px
				top: 0,
				bottom: 0
			});
		});

		// 4. 清空原容器，并注入用于维持滚动条的上下占位符
		this.container.innerHTML = '';
		this.topSpacer = document.createElement('div');
		this.bottomSpacer = document.createElement('div');
		this.topSpacer.style.flexShrink = '0';
		this.bottomSpacer.style.flexShrink = '0';
		this.container.appendChild(this.topSpacer);
		this.container.appendChild(this.bottomSpacer);

		// 5. 核心：建立 O(1) 查询索引
		this._reindex();

		// 6. ResizeObserver 监听高度动态变化（局部重排优化）
		this.resizeObserver = new ResizeObserver((entries) => {
			let minChangedIndex = Infinity; // 记录发生改变的最上方元素的索引
			
			for (const entry of entries) {
				const el = entry.target;
				const index = el.__vs_index;
				if (index !== undefined && this.items[index]) {
					const newHeight = entry.borderBoxSize ? entry.borderBoxSize[0].blockSize : el.offsetHeight;
					if (this.items[index].height !== newHeight) {
						this.items[index].height = newHeight;
						if (index < minChangedIndex) minChangedIndex = index;
					}
				}
			}
			
			// 如果有高度变化，只从最小变化位置往后重新计算排版，并请求渲染
			if (minChangedIndex !== Infinity) {
				this.calculatePositions(minChangedIndex);
				this.requestRender();
			}
		});

		// 7. 初始化计算与事件绑定
		this.calculatePositions(0);
		
		// 🚨 【修改这里】：将事件处理函数存入实例属性，方便后续销毁
		this._handleScroll = () => this.requestRender();
		this._handleResize = () => this.requestRender();
		
		this.viewport.addEventListener('scroll', this._handleScroll, { passive: true });
		window.addEventListener('resize', this._handleResize);
		
		this.requestRender();
	}

	// ==========================================
	// 工具与底层映射方法
	// ==========================================

	// 将 HTML 字符串转换为原生 DOM 元素
	static htmlToElement(html) {
		const template = document.createElement('template');
		template.innerHTML = html.trim();
		return template.content.firstChild;
	}

	// 空间换时间：重建全部索引与映射关系
	_reindex() {
		this.msgIndexMap = [];
		let currentChatIndex = 0;

		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if (!item.el) continue;

			// 记录真实数组索引
			item.el.__vs_index = i;

			// 建立双向直连映射
			if (item.el.classList && item.el.classList.contains('消息')) {
				item.el.__vs_chatIndex = currentChatIndex; // DOM 绑 消息索引
				this.msgIndexMap.push(i); // 映射表记 真实索引
				currentChatIndex++;
			} else {
				item.el.__vs_chatIndex = -1; // 非消息元素标记为 -1
			}
		}
	}

	// O(1) 极速映射：把 纯消息索引 转化为 真实数组索引
	_getRealIndex(chatIndex) {
		if (chatIndex < 0 || chatIndex >= this.msgIndexMap.length) return -1;
		return this.msgIndexMap[chatIndex];
	}

	// 内部：在指定数组位置插入新元素
	_insertAt(index, messageStr) {
		const newEl = DynamicVirtualScroll.htmlToElement(messageStr);
		
		// 修正当前已渲染集合的索引
		const newRendered = new Set();
		for (const i of this.renderedIndices) {
			if (i >= index) newRendered.add(i + 1);
			else newRendered.add(i);
		}
		this.renderedIndices = newRendered;
		
		// 插入数据
		this.items.splice(index, 0, { el: newEl, height: 80, top: 0, bottom: 0 });
		
		this._reindex();
		this.calculatePositions(index); // 局部重排：只算插入位置及以后的高度
		this.requestRender();
	}

	// ==========================================
	// 供外部调用的 API (增删改查)
	// ==========================================

	// 1. 替换消息 (替代 .outerHTML)
	updateMessage(chatIndex, messageStr) {
		const index = this._getRealIndex(chatIndex);
		if (index === -1) return;
		
		const newEl = DynamicVirtualScroll.htmlToElement(messageStr);
		
		if (this.renderedIndices.has(index)) {
			const oldEl = this.items[index].el;
			this.resizeObserver.unobserve(oldEl);
			if (oldEl.parentNode) oldEl.parentNode.removeChild(oldEl);
			this.renderedIndices.delete(index);
		}
		
		this.items[index].el = newEl;
		this.items[index].height = 80;
		
		this._reindex();
		this.calculatePositions(index);
		this.requestRender();
	}

	// 2. 在上方插入 (替代 .before)
	insertBeforeMessage(chatIndex, messageStr) {
		const index = this._getRealIndex(chatIndex);
		if (index !== -1) this._insertAt(index, messageStr);
	}

	// 3. 在下方插入 (替代 .after)
	insertAfterMessage(chatIndex, messageStr) {
		const index = this._getRealIndex(chatIndex);
		if (index !== -1) this._insertAt(index + 1, messageStr);
	}

	// 4. 在列表最底部底座上方追加消息
	appendMessage(messageStr) {
		let index = this.items.findIndex(item => item.el.classList && item.el.classList.contains('消息底座'));
		if (index === -1) index = this.items.length;
		this._insertAt(index, messageStr);
	}

	// 5. 删除消息 (替代 .remove)
	removeMessage(chatIndex) {
		const index = this._getRealIndex(chatIndex);
		if (index === -1) return;
		
		if (this.renderedIndices.has(index)) {
			const oldEl = this.items[index].el;
			this.resizeObserver.unobserve(oldEl);
			if (oldEl.parentNode) oldEl.parentNode.removeChild(oldEl);
		}
		
		const newRendered = new Set();
		for (const i of this.renderedIndices) {
			if (i > index) newRendered.add(i - 1);
			else if (i < index) newRendered.add(i);
		}
		this.renderedIndices = newRendered;
		
		this.items.splice(index, 1);
		this._reindex();
		// 因为删除了一个，只需要从当前被删除的那个位置开始重排后续高度即可
		this.calculatePositions(index);
		this.requestRender();
	}

	// 6. 获取所有被选中元素的 chatIndex 数组 (V8 极限压榨版)
	getSelectedIndices() {
		const selectedIndices = [];
		
		// 1. 作用域优化：将实例属性提前缓存为纯局部变量，跳过 V8 原型链寻址
		const map = this.msgIndexMap;
		const items = this.items;
		const len = map.length;

		// 2. 最纯粹的 for 循环
		for (let i = 0; i < len; i++) {
			const el = items[map[i]].el;
			
			// 3. 内联优化：去掉 getCheckbox 函数调用，直接在循环体内判断（消灭函数压栈开销）
			let cb = el.__vs_checkbox;
			if (cb === undefined) {
				cb = el.__vs_checkbox = el.querySelector('.dels');
			}

			// 读取原生复选框状态
			if (cb && cb.checked) {
				// 4. 逻辑降维：因为 map 的下标 i 天生就等于 chatIndex
				// 直接 push(i)！彻底消灭对 DOM 自定义属性 (el.__vs_chatIndex) 的读取！
				selectedIndices.push(i);
			}
		}
		
		return selectedIndices;
	}

	// 7. 高级跳转：精准模拟原生 scrollIntoView
	scrollToIndex(chatIndex, options = {}) {
		const { behavior = 'auto', block = 'start' } = options;
		const index = this._getRealIndex(chatIndex);
		if (index === -1) return;

		const item = this.items[index];
		const viewportHeight = this.viewport.clientHeight;
		const currentScrollTop = this.viewport.scrollTop;
		let targetScrollTop = currentScrollTop;

		switch (block) {
			case 'center':
				targetScrollTop = item.top + (item.height / 2) - (viewportHeight / 2);
				break;
			case 'end':
				targetScrollTop = item.bottom - viewportHeight;
				break;
			case 'nearest':
				if (item.top < currentScrollTop) targetScrollTop = item.top;
				else if (item.bottom > currentScrollTop + viewportHeight) targetScrollTop = item.bottom - viewportHeight;
				break;
			case 'start':
			default:
				targetScrollTop = item.top;
				break;
		}

		// 边界限制，防滚飞
		targetScrollTop = Math.max(0, Math.min(targetScrollTop, this.totalHeight - viewportHeight));

		this.viewport.scrollTo({ top: targetScrollTop, behavior: behavior });
	}
	/**
	 * 终极性能优化：批量替换所有消息
	 * 专门应对刷新页面、导入海量聊天记录等场景
	 * @param {string} htmlString - 包含所有新消息的巨量 HTML 字符串
	 */
	replaceAllMessages(htmlString) {
		// 1. 批量清理屏幕上当前渲染的所有元素（安全释放 DOM 和 Observer）
		for (const i of this.renderedIndices) {
			const el = this.items[i].el;
			this.resizeObserver.unobserve(el);
			if (el.parentNode) el.parentNode.removeChild(el);
		}
		this.renderedIndices.clear();

		// 2. 在内存中过滤保留“非消息元素”（比如顶部的水印 mt_watermark 和底部的消息底座）
		const newItems = [];
		let insertIndex = -1;

		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if (item.el.classList && item.el.classList.contains('消息')) {
				continue; // 抛弃所有旧的消息节点
			}
			
			// 记录“消息底座”的位置，新消息需要插在它前面
			if (item.el.classList && item.el.classList.contains('消息底座')) {
				insertIndex = newItems.length;
			}
			newItems.push(item);
		}

		// 如果没找到底座，默认插到最后面
		if (insertIndex === -1) insertIndex = newItems.length;

		// 3. 将传入的巨量 HTML 字符串一次性转换为原生 DOM 节点数组 (利用浏览器原生 C++ 极速解析)
		const template = document.createElement('template');
		template.innerHTML = htmlString.trim();
		const newElements = Array.from(template.content.children);

		// 4. 将新节点批量组装为虚拟列表的标准数据格式
		const virtualNodes = newElements.map(el => ({
			el: el,
			height: 80, // 赋予初始预估高度，渲染后 ResizeObserver 会自动矫正
			top: 0,
			bottom: 0
		}));

		// 5. 一次性将几千/几万个新节点塞入保留下来的数组中
		newItems.splice(insertIndex, 0, ...virtualNodes);
		this.items = newItems;

		// 6. 重建高性能索引并执行且仅执行 1 次全量排版和渲染
		this._reindex();
		this.calculatePositions(0); // 从第 0 项开始彻底重排
		this.requestRender();
	}
	// ==========================================
	// 滚动与渲染核心逻辑
	// ==========================================

	// 局部重排算法：只计算 startIndex 之后的元素 top 和 bottom
	calculatePositions(startIndex = 0) {
		if (this.items.length === 0) {
			this.totalHeight = 0;
			return;
		}
		
		let currentTop = 0;
		let start = startIndex;

		// 如果是从头算起
		if (start === 0) {
			this.items[0].top = 0;
			this.items[0].bottom = this.items[0].height;
			currentTop = this.items[0].bottom;
			start = 1;
		} else {
			// 接续上一个元素的 bottom
			currentTop = this.items[start - 1].bottom;
		}

		for (let i = start; i < this.items.length; i++) {
			this.items[i].top = currentTop;
			currentTop += this.items[i].height;
			this.items[i].bottom = currentTop;
		}
		this.totalHeight = currentTop;
	}

	// 渲染防抖 (基于 requestAnimationFrame)
	requestRender() {
		if (this.renderPending) return;
		this.renderPending = true;
		requestAnimationFrame(() => {
			this.render();
			this.renderPending = false;
		});
	}

	// 真实渲染拔插逻辑
	render() {
		const scrollTop = this.viewport.scrollTop;
		const clientHeight = this.viewport.clientHeight;

		// 二分查找当前视口内的元素
		let startIdx = this.binarySearch(scrollTop);
		let endIdx = startIdx;
		while (endIdx < this.items.length && this.items[endIdx].top < scrollTop + clientHeight) {
			endIdx++;
		}

		// 上下缓冲
		startIdx = Math.max(0, startIdx - this.buffer);
		endIdx = Math.min(this.items.length - 1, endIdx + this.buffer);

		// 设置垫片撑开原生滚动条
		this.topSpacer.style.height = `${this.items[startIdx].top}px`;
		this.bottomSpacer.style.height = `${this.totalHeight - this.items[endIdx].bottom}px`;

		const newRenderedIndices = new Set();
		for (let i = startIdx; i <= endIdx; i++) {
			newRenderedIndices.add(i);
		}

		// 拔出不在视口的
		for (const i of this.renderedIndices) {
			if (!newRenderedIndices.has(i)) {
				const el = this.items[i].el;
				this.resizeObserver.unobserve(el);
				if (el.parentNode) el.parentNode.removeChild(el);
			}
		}

		// 插入进入视口的
		let referenceNode = this.bottomSpacer; 
		for (let i = endIdx; i >= startIdx; i--) {
			const el = this.items[i].el;
			if (!this.renderedIndices.has(i)) {
				this.container.insertBefore(el, referenceNode);
				this.resizeObserver.observe(el);
			}
			referenceNode = el; 
		}

		this.renderedIndices = newRenderedIndices;
	}

	// 二分查找，加速长列表定位
	binarySearch(scrollTop) {
		let low = 0;
		let high = this.items.length - 1;
		while (low <= high) {
			const mid = Math.floor((low + high) / 2);
			const item = this.items[mid];
			if (item.bottom <= scrollTop) low = mid + 1;
			else if (item.top > scrollTop) high = mid - 1;
			else return mid;
		}
		return Math.max(0, low);
	}
	/**
	 * 完美销毁实例，释放监听器，并将所有节点完整恢复到页面上
	 * 非常适合用于：关闭虚拟滚动、准备全文截图 (html2canvas)、全文导出等场景
	 */
	destroy() {
		// 1. 移除全部事件监听器
		if (this.viewport && this._handleScroll) {
			this.viewport.removeEventListener('scroll', this._handleScroll);
		}
		if (this._handleResize) {
			window.removeEventListener('resize', this._handleResize);
		}

		// 2. 断开并销毁 ResizeObserver 尺寸监听
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
			this.resizeObserver = null;
		}

		// 3. 取消可能正在进行的 requestAnimationFrame 渲染请求
		this.renderPending = true;

		// 4. 清除插入在容器里的上下占位垫片
		if (this.topSpacer && this.topSpacer.parentNode) {
			this.topSpacer.parentNode.removeChild(this.topSpacer);
		}
		if (this.bottomSpacer && this.bottomSpacer.parentNode) {
			this.bottomSpacer.parentNode.removeChild(this.bottomSpacer);
		}

		// 5. 🚨 【核心修改】：将所有被隐藏的内存节点，一次性完整渲染回原生 DOM 树
		if (this.container && this.items.length > 0) {
			// 先清空当前容器里零散的可视节点，防止出现重复或顺序错乱
			this.container.innerHTML = '';
			
			// 使用 DocumentFragment 在内存中批量组装，避免引发成千上万次引发浏览器重排卡死
			const fragment = document.createDocumentFragment();
			for (let i = 0; i < this.items.length; i++) {
				const el = this.items[i].el;
				if (el) {
					// 将所有原生 DOM 节点按顺序塞入文档片段
					fragment.appendChild(el);
				}
			}
			// 一次性挂载回页面，此时列表恢复为普通的、无虚拟滚动的完整长列表！
			this.container.appendChild(fragment);
		}

		// 6. 彻底清空 JS 内存中的大型数组和缓存映射，交还给浏览器垃圾回收机制 (GC)
		this.items = [];
		this.renderedIndices.clear();
		this.msgIndexMap = [];
		
		// 7. 解除 DOM 引用
		this.viewport = null;
		this.container = null;
	}
}
// ==========================================
// 初始化与业务逻辑绑定 (替换你原有的 jQuery 事件)
// ==========================================
// 全局缓存：上一个拥有虚线边框的 DOM 节点
let prevFirstCheckedEl = null;

// $O(1)$ 边框截断更新算法
function updateFirstCheckedBorder() {
	if(mt_settings['虚拟滚动'] == '关闭')
	{
		选择列表 = []
		$('.消息').css('border-top','')
		$(".dels:checked:eq(0)").parent().css('border-top','2px dashed #a2a2a2')
		$(".dels").each(function(k,v)
		{
			if(v.checked)选择列表.push(k)
		})
	}
	else
	{
		选择列表 = window.chatList.getSelectedIndices();
		let newFirstCheckedEl = null;

		// 局部变量缓存
		const map = window.chatList.msgIndexMap;
		const items = window.chatList.items;
		const len = map.length;

		for (let i = 0; i < len; i++) {
			const el = items[map[i]].el;
			
			// 极致内联展开
			let cb = el.__vs_checkbox;
			if (cb === undefined) {
				cb = el.__vs_checkbox = el.querySelector('.dels');
			}
			
			if (cb && cb.checked) {
				newFirstCheckedEl = el;
				break; // 找到第一个立马中断，绝对不往下走了
			}
		}

		if (prevFirstCheckedEl && prevFirstCheckedEl !== newFirstCheckedEl) {
			prevFirstCheckedEl.style.borderTop = '';
		}

		if (newFirstCheckedEl) {
			newFirstCheckedEl.style.borderTop = '2px dashed #a2a2a2';
		}

		prevFirstCheckedEl = newFirstCheckedEl;
	}
	$('.delsNum').text(选择列表.length)
	let name = loadname(mt_settings['选择角色'].no,mt_settings['选择角色'].index)
	let str = 选择列表.length ? '在上方插入' : mt_text.input_comment[mtlang]
	$('.chatText').attr('placeholder',name+'：'+str)
}
function 取消选择()
{
	if(mt_settings['虚拟滚动'] == '关闭')
	{
		$(".dels").prop("checked",false).parent().css("background-color","");
	}
	else
	{
		const totalCount = window.chatList.msgIndexMap.length;

		for (let i = 0; i < totalCount; i++) {
			const el = window.chatList.items[window.chatList.msgIndexMap[i]].el;
			const checkbox = getCheckbox(el);
			
			// 🚨 核心优化：只处理当前被选中的元素，没选中的直接跳过，零 DOM 消耗！
			if (checkbox && checkbox.checked) {
				checkbox.checked = false;
				el.style.backgroundColor = "";
			}
		}
	}
	// 统一刷新边框状态
	updateFirstCheckedBorder();
}
// 1. 全选
$('body').on('click', "#delsall", function() {
	if(mt_settings['虚拟滚动'] == '关闭')
	{
		if($(".dels:checked").length !== $(".dels").length)
		{
			$(".dels").each(function()
			{
				$(this).prop("checked",true);
				$(this).parent().css("background-color","rgb(202,215,221)")//
			});
		}
		else
		{
			$(".dels").each(function()
			{
				$(this).prop("checked",false);
				$(this).parent().css("background-color","")//
			});
		}
	}
	else
	{
		let totalCount = window.chatList.msgIndexMap.length;
		let checkedCount = 0;

		for (let i = 0; i < totalCount; i++) {
			const el = window.chatList.items[window.chatList.msgIndexMap[i]].el;
			const checkbox = getCheckbox(el); // 【修改这里】
			if (checkbox && checkbox.checked) checkedCount++;
		}

		const shouldCheckAll = (checkedCount !== totalCount);

		for (let i = 0; i < totalCount; i++) {
			const el = window.chatList.items[window.chatList.msgIndexMap[i]].el;
			const checkbox = getCheckbox(el); // 【修改这里】
			if (checkbox) {
				checkbox.checked = shouldCheckAll;
				el.style.backgroundColor = shouldCheckAll ? "rgb(202,215,221)" : "";
			}
		}
	}
	updateFirstCheckedBorder();
});

// 2. 反选
$('body').on('click', "#rdelsall", function() {
	if(mt_settings['虚拟滚动'] == '关闭')
	{
		$(".dels").each(function()
		{
			$(this).prop("checked",!$(this).prop("checked"));
			if($(this).prop('checked'))$(this).parent().css("background-color","rgb(202,215,221)")//
			else $(this).parent().css("background-color","")//
		});
	}
	else
	{
		const totalCount = window.chatList.msgIndexMap.length;
		for (let i = 0; i < totalCount; i++) {
			const el = window.chatList.items[window.chatList.msgIndexMap[i]].el;
			const checkbox = getCheckbox(el); // 【修改这里】
			if (checkbox) {
				checkbox.checked = !checkbox.checked;
				el.style.backgroundColor = checkbox.checked ? "rgb(202,215,221)" : "";
			}
		}
	}
	updateFirstCheckedBorder();
});

// 3. 区间选择
$('body').on('click', "#delsto", function() {
	if(mt_settings['虚拟滚动'] == '关闭')
	{
		if($(".dels:checked").length > 1)
		{
			let start = $(".dels").index($(".dels:checked:eq(0)"));
			let end = $(".dels").index($(".dels:checked:eq(-1)"));
			$(".dels").each(function(index)
			{
				if(index >= start && index <= end)
				{
					$(this).prop("checked",true);
					$(this).parent().css("background-color","rgb(202,215,221)")//
				}
			});
		}
	}
	else
	{
		let firstIdx = -1;
		let lastIdx = -1;
		const totalCount = window.chatList.msgIndexMap.length;

		for (let i = 0; i < totalCount; i++) {
			const el = window.chatList.items[window.chatList.msgIndexMap[i]].el;
			const checkbox = getCheckbox(el); // 【修改这里】
			if (checkbox && checkbox.checked) {
				if (firstIdx === -1) firstIdx = i;
				lastIdx = i;
			}
		}

		if (firstIdx !== -1 && lastIdx !== -1 && firstIdx !== lastIdx) {
			for (let i = firstIdx; i <= lastIdx; i++) {
				const el = window.chatList.items[window.chatList.msgIndexMap[i]].el;
				const checkbox = getCheckbox(el); // 【修改这里】
				if (checkbox) {
					checkbox.checked = true;
					el.style.backgroundColor = "rgb(202,215,221)";
				}
			}
		}
	}
	updateFirstCheckedBorder();
});

// 4. 隐藏 / 显示 工具按钮拓展 (截图模式)
$('body').on('click', ".Screenshot_Mode", function() {
	if(mt_settings['虚拟滚动'] == '关闭')
	{
		if($('.tools').css('display') === 'none')
		{
			$('.tools').show()//工具栏
			// $('.itLRpr').show()//顶部栏
			// $('.jjPyvz').show()//底部栏
			// $('.dCSLyt').css({top:'3.5rem',paddingBottom:'3.5rem'})
			$('.消息').each(function()
			{
				$(this).append(`<input type="checkbox" class="dels" style="background-color: ${$(this).attr('title')};" data-html2canvas-ignore="true">`)
			})
		}
		else
		{
			$('.消息').css('background-color','').css('border-top','')
			$('.dels').remove()

			$('.tools').hide()//工具栏
			// $('.itLRpr').hide()//顶部栏
			// $('.jjPyvz').hide()//底部栏
			// $('.dCSLyt').css({top:'0rem',paddingBottom:'0rem'})
			$('.operateTools').hide()
		}
	}
	else
	{
		if ($('.tools').css('display') === 'none') {
			$('.tools').show();
			
			const totalCount = window.chatList.msgIndexMap.length;
			for (let i = 0; i < totalCount; i++) {
				const el = window.chatList.items[window.chatList.msgIndexMap[i]].el;
				const checkbox = getCheckbox(el); // 使用惰性获取试探一下
				
				// 如果DOM里真的没有，才去动态插入
				if (!checkbox) {
					const bgColor = el.getAttribute('title') || 'transparent';
					el.insertAdjacentHTML('beforeend', `<input type="checkbox" class="dels" style="background-color: ${bgColor};" data-html2canvas-ignore="true">`);
					el.__vs_checkbox = el.lastElementChild; // 生成后立刻缓存
				}
			}
		} else {
			$('.tools').hide(); 
			$('.operateTools').hide();
			
			const totalCount = window.chatList.msgIndexMap.length;
			for (let i = 0; i < totalCount; i++) {
				const el = window.chatList.items[window.chatList.msgIndexMap[i]].el;
				el.style.backgroundColor = '';
				el.style.borderTop = '';
				
				const checkbox = getCheckbox(el);
				if (checkbox) {
					checkbox.remove(); // 移除 DOM 里的多选框
					el.__vs_checkbox = undefined; // 🚨 核心：重置为 undefined，不能是 null
				}
			}
			prevFirstCheckedEl = null;
		}
	}
	取消选择()
});

// 5. 选框被选中时背景色变化
$('body').on('change', ".dels", function() {
	if(mt_settings['虚拟滚动'] == '关闭')
	{
		if($(this).prop('checked'))
		{
			$(this).parent().css("background-color","rgb(202,215,221)")//
		}
		else
		{
			$(this).parent().css("background-color","")
		}
	}
	else
	{
		// 因为原生 change 事件触发时，this 必然是目标 DOM 本身，无需查询
		const messageDOM = this.closest('.消息');
		
		if (this.checked) {
			messageDOM.style.backgroundColor = "rgb(202,215,221)";
		} else {
			messageDOM.style.backgroundColor = "";
		}
	}
	updateFirstCheckedBorder();
});

// 6. 自动跳到被选位置
$('body').on('click', ".chatText", function() {
	// 直接获取被勾选的第一个消息序号
	let name = loadname(mt_settings['选择角色'].no, mt_settings['选择角色'].index)
	let str = mt_text.input_comment[mtlang]
	if (选择列表.length > 0) {
		str = '在上方插入'
		const firstChatIndex = 选择列表[0];
		// 调用咱们写的高级原生跳转模拟方法，带平滑滚动并且居中
		跳转索引(firstChatIndex, { 
			behavior: 'smooth', 
			block: 'center' 
		});
	}
	$('.chatText').attr('placeholder',name+'：'+str)
});
// 高性能批量更新所有名字
function updateAllNames() {
	if(mt_settings['虚拟滚动'] == '关闭')
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
		return
	}
	const totalCount = window.chatList.msgIndexMap.length;

	// 1. 直接遍历虚拟列表中真正的消息索引
	for (let i = 0; i < totalCount; i++) {
		const realIndex = window.chatList.msgIndexMap[i];
		const el = window.chatList.items[realIndex].el;
		
		// 2. 瞬间获取名字节点（没有名字的消息会返回 null 并直接跳过）
		const nameEl = getNameElement(el);
		
		if (nameEl) {
			// 原生 DOM 的 title 属性获取
			const nameArr = nameEl.title.split(',');
			const id = nameArr[0];
			const img = nameArr[1];
			
			// 调用你原有的 loadname 方法
			let name = loadname(id, img);
			
			// 原生 nodeName 永远是大写，直接判断
			if (nameEl.nodeName === 'BUTTON') {
				name += mt_text['go_relationship_event'][mtlang];
			}
			
			// 3. 性能优化：直接操作原生的 innerHTML 
			nameEl.innerHTML = name;
		}
	}
}
//重新加载消息
function refreshMessage(json) {
	const len = json.length;
	
	// 1. 预分配固定长度的数组，彻底消除内存动态扩容的开销
	const htmlArray = new Array(len); 
	
	// 2. 使用最原生的 for 循环，速度最快
	for (let k = 0; k < len; k++) {
		const v = json[k];
		// 直接往指定下标塞入数据
		htmlArray[k] = makeMessage(v.type, v, k, 'add');
	}
	
	// 3. 使用 .join('') 一次性将数组合并为巨型 HTML 字符串 (比 += 拼接快很多)
	const finalHtml = htmlArray.join('');
	if(mt_settings['虚拟滚动'] == '关闭')
	{
		if(window.chatList)
		{
			window.chatList.replaceAllMessages('');
			window.chatList.destroy()
			window.chatList = null
		}
		else
		{
			$('.消息').remove()
		}
		$('.消息底座').before(finalHtml)
	}
	else
	{
		// 4. 交给虚拟滚动实例一次性处理
		if(!window.chatList)window.chatList = new DynamicVirtualScroll('.显示区域', '.元素列表');
		window.chatList.replaceAllMessages(finalHtml);
	}
	if(json.length)
	{
		$('.INDEX_tips').hide()
		if(json[0].replyDepth !== 0 || otherChats.length)$('.reply').show()
	}
	else
	{
		$('.INDEX_tips').show()
		otherChats.length ? $('.reply').show() : $('.reply').hide()//选择肢管理
	}
	// （可选）如果你希望刷新数据后，自动平滑滚动到最新的一条消息，可以加上这句：
	setTimeout(() => {
		跳转索引(json.length - 1, { behavior: 'auto', block: 'end' });
	}, 100);
	选择列表 = []
	$('.delsNum').text(0)
}
function blink(chatIndex)
{
	if(chatIndex === undefined)return
	if(mt_settings['虚拟滚动'] == '关闭')
	{
		let element = $(`.消息:eq(${chatIndex})`).fadeOut(500, function() 
		{
			$(this).fadeIn(500, function() {});
		})[0];
		if(!element)chatIndex = null
		return chatIndex
	}
	else
	{
		// 1. O(1) 极速获取该消息在虚拟列表中的真实数组索引
		const realIndex = window.chatList._getRealIndex(chatIndex);
		if (realIndex === -1) return null;

		// 2. 获取该消息对应的原生 DOM 元素（注意：此时它可能还在内存里没上屏）
		const el = window.chatList.items[realIndex].el;

		// 3. 🚨 核心修复：使用 setTimeout 将动画推迟 50 毫秒执行
		// 这样可以完美避开浏览器的渲染帧，确保虚拟滚动已经把新 DOM 插入到了页面上
		setTimeout(() => {
			
			// 此时再判断，如果它真的在屏幕可视范围内（没有被滑走），就开始闪烁
			if (el.isConnected) {
				// 原生底层动画 API：纯 GPU 渲染，不改 style，不引发排错乱
				el.animate([
					{ opacity: 1 }, // 0ms: 完全显示
					{ opacity: 0 }, // 500ms: 渐隐到透明
					{ opacity: 1 }  // 1000ms: 恢复正常
				], {
					duration: 1000,     // 动画耗时 1 秒
					iterations: 1,      // 执行 1 次
					easing: 'ease-in-out' // 平滑过渡
				});
			}
			
		}, 50); // 50ms 刚好能跨过 requestAnimationFrame 的防抖周期

		// 4. 依然可以同步返回该 DOM 元素，不影响你原有的业务逻辑
		return realIndex;
	}
}
function 跳转索引(chatIndex, options)
{
	if(chatIndex === undefined)return
	if(mt_settings['虚拟滚动'] == '关闭')$(`.消息:eq(${chatIndex})`)[0].scrollIntoView(options)
	else window.chatList.scrollToIndex(chatIndex, options)
}
function 获取索引(element)
{
	if(mt_settings['虚拟滚动'] == '关闭')return $('.消息').index(element.closest('.消息'))
	else return element.closest('.消息').__vs_chatIndex
}
function 向前追加(chatIndex, message)
{
	if(mt_settings['虚拟滚动'] == '关闭')$(`.消息:eq(${chatIndex})`).before(message);
	else window.chatList.insertBeforeMessage(chatIndex, message);
}
function 向后追加(chatIndex, message)
{
	if(mt_settings['虚拟滚动'] == '关闭')$(`.消息:eq(${chatIndex})`).after(message);
	else window.chatList.insertAfterMessage(chatIndex, message);
}
function 末尾追加(message)
{
	if(mt_settings['虚拟滚动'] == '关闭')$('.消息底座').before(message);
	else window.chatList.appendMessage(message);
}
function 消息替换(chatIndex, message)
{
	if(mt_settings['虚拟滚动'] == '关闭')$(`.消息:eq(${chatIndex})`)[0].outerHTML = message;
	else window.chatList.updateMessage(chatIndex, message);
}
function 删除消息(chatIndex)
{
	if(mt_settings['虚拟滚动'] == '关闭')$(`.消息:eq(${chatIndex})`).remove();
	else window.chatList.removeMessage(chatIndex);
}
