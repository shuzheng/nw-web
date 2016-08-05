// 初始化contextmenu
var contextmenu = new nw.Menu({type: 'contextmenu'});

// 分割线
var separator = new nw.MenuItem({
	type: 'separator'
});

var menu_item1 = new nw.MenuItem({
	label: 'Item 1'
});
var menu_item2 = new nw.MenuItem({
	label: 'Item 2'
});

// 添加到右键菜单
contextmenu.append(menu_item1);
contextmenu.append(separator);
contextmenu.append(menu_item2);

// 绑定右键菜单事件
document.body.addEventListener('contextmenu', function(e) {
	e.preventDefault();
	contextmenu.popup(e.x, e.y);
	return false;
});