// 初始化menubar
var menubar = new nw.Menu({type: 'menubar'});

// 分割线
var separator = new nw.MenuItem({
	type: 'separator'
});

var menu1 = new nw.Menu();
menu1.append(new nw.MenuItem({
	label: 'Item A'
}));
menu1.append(separator);
menu1.append(new nw.MenuItem({
	label: 'Item B'
}));

menubar.append(new nw.MenuItem({
  label: 'First Menu',
  submenu: menu1
}));

// 添加到菜单栏
nw.Window.get().menu = menubar;