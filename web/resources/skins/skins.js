(function(){
	// ============== 加载皮肤 ==============
	var skin = 'chrome';
	if(localStorage.skin)
		skin = localStorage.skin;
	var head = document.getElementsByTagName('head')[0];
	var link = document.createElement('link');
		link.setAttribute('id', 'skin');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('href', 'resources/skins/'+ skin +'/' + skin + '.css');
	head.appendChild(link);
	// 加载标题栏
	var body = document.getElementsByTagName('body')[0];
	var titlebar = document.createElement('div');
		titlebar.setAttribute('id', 'titlebar');
	
	var icon = document.createElement('img');
		icon.setAttribute('src', document.getElementById('icon').getAttribute('href'));
	var title = document.createElement('span');
		title.innerText = document.title;
	var caption = document.createElement('div');
		caption.setAttribute('id', 'caption');
		caption.appendChild(icon);
		caption.appendChild(title);
		
	titlebar.appendChild(caption);
		var buttons = document.createElement('div');
			buttons.setAttribute('id', 'buttons');
			var set = document.createElement('a');
				set.setAttribute('id', 'set');
				set.setAttribute('title', '设置');
			var min = document.createElement('a');
				min.setAttribute('id', 'min');
				min.setAttribute('title', '最小化');
			var max = document.createElement('a');
				max.setAttribute('id', 'max');
				max.setAttribute('title', '最大化');
				max.setAttribute('class', 'max1');
			var close = document.createElement('a');
				close.setAttribute('id', 'close');
				close.setAttribute('title', '关闭');
		buttons.appendChild(set);
		buttons.appendChild(min);
		buttons.appendChild(max);
		buttons.appendChild(close);
		
	titlebar.appendChild(buttons);
	body.insertBefore(titlebar, document.getElementById('main'));

	// ============== 设置菜单 ==============
	// 初始化contextmenu
	var contextmenu = new nw.Menu({type: 'contextmenu'});
	// 分割线
	var separator = new nw.MenuItem({
		type: 'separator'
	});
	var set_menu = new nw.MenuItem({
		label: '系统设置',
		click: function() {
			var setWin = nw.Window.open('/web/set.html', {
				'new_instance': false,
				'resizable': false,
				'position': 'center',
				"frame": false,
				"width": 400,
				"height": 200
				/*,
				"inject-js-end": 'app/skins/skins.js'
				"title": "征征出品",
				"icon": "icon.png",
				"show_in_taskbar": false,*/
			});
		}
	});
		// 子菜单
		var menu_item1_1 = new nw.MenuItem({
			label: 'Adobe',
			type: 'checkbox',
			click: function() {
				if (menu_item1_1.checked == false) {
					menu_item1_1.checked = true;
					return false;
				}
				localStorage.skin = 'adobe';
				link.setAttribute('href', 'resources/skins/adobe/adobe.css');
				menu_item1_2.checked = false;
				menu_item1_3.checked = false;
				menu_item1_4.checked = false;
			}
		});
		var menu_item1_2 = new nw.MenuItem({
			label: 'Chrome',
			type: 'checkbox',
			click: function() {
				if (menu_item1_2.checked == false) {
					menu_item1_2.checked = true;
					return false;
				}
				localStorage.skin = 'chrome';
				link.setAttribute('href', 'resources/skins/chrome/chrome.css');
				menu_item1_1.checked = false;
				menu_item1_3.checked = false;
				menu_item1_4.checked = false;
			}
		});
		var menu_item1_3 = new nw.MenuItem({
			label: 'QQ2015',
			type: 'checkbox',
			click: function() {
				if (menu_item1_3.checked == false) {
					menu_item1_3.checked = true;
					return false;
				}
				localStorage.skin = 'qq2015';
				link.setAttribute('href', 'resources/skins/qq2015/qq2015.css');
				menu_item1_1.checked = false;
				menu_item1_2.checked = false;
				menu_item1_4.checked = false;
			}
		});
		var menu_item1_4 = new nw.MenuItem({
			label: 'QQ2016',
			type: 'checkbox',
			click: function() {
				if (menu_item1_4.checked == false) {
					menu_item1_4.checked = true;
					return false;
				}
				localStorage.skin = 'qq2016';
				link.setAttribute('href', 'resources/skins/qq2016/qq2016.css');
				menu_item1_2.checked = false;
				menu_item1_3.checked = false;
				menu_item1_1.checked = false;
			}
		});
		// 添加到换肤菜单
		var skins_menu = new nw.Menu();
		skins_menu.append(menu_item1_1);
		skins_menu.append(menu_item1_2);
		skins_menu.append(menu_item1_3);
		skins_menu.append(menu_item1_4);
	
	var skin_menu = new nw.MenuItem({
		label: '换　　肤',
		submenu: skins_menu
	});
	var update_menu = new nw.MenuItem({
		label: '检查更新',
		click: function() {
			alert('检查更新');
		}
	});
	var about_menu = new nw.MenuItem({
		label: '关　　于',
		click: function() {
			alert('关　　于');
		}
	});
	// 初始化选中菜单
	if(localStorage.skin) {
		if (localStorage.skin == 'adobe') {
			menu_item1_1.checked = true;
		}
		if (localStorage.skin == 'chrome') {
			menu_item1_2.checked = true;
		}
		if (localStorage.skin == 'qq2015') {
			menu_item1_3.checked = true;
		}
		if (localStorage.skin == 'qq2016') {
			menu_item1_4.checked = true;
		}
	}
	// 添加到右键菜单
	contextmenu.append(set_menu);
	contextmenu.append(separator);
	contextmenu.append(skin_menu);
	contextmenu.append(separator);
	contextmenu.append(update_menu);
	contextmenu.append(about_menu);
	

	// 绑定事件
	set.addEventListener('click', function(e) {
		e.preventDefault();
		contextmenu.popup(set.offsetLeft, set.offsetTop + set.offsetHeight);
		return false;
	});
	// 设置快捷键
	var shortcut = new nw.Shortcut({
		key : "Ctrl+Shift+S",
		active : function() {
			contextmenu.popup(set.offsetLeft, set.offsetTop + set.offsetHeight);
		},
		failed : function(msg) {
			console.log(msg);
		}
	});
	nw.App.registerGlobalHotKey(shortcut);
	//nw.App.unregisterGlobalHotKey(shortcut);
	
	// ============== gui操作 ==============
	var win = nw.Window.get();
	//加载完成事件
	win.on('loaded', function() {
		//显示win
		win.show();
	});
	//最小化
	min.onclick = function() {
		win.minimize();
	}
	//最大化
	var isMax = false;
	max.onclick = function() {
		if(isMax) {
			body.className = '';
			win.unmaximize();
			max.setAttribute('class', 'max1');max.setAttribute('title', '最大化')
		} else {
			body.className = 'body_max';
			win.maximize();
			max.setAttribute('class', 'max2');max.setAttribute('title', '还原')
		}
		isMax = !isMax;
	}
	//关闭
	close.onclick = function() {
		win.close();
	}
	window.onfocus = function() {
		//console.log("focus");
	}
	window.onblur = function() {
		//console.log("blur");
	}
}());