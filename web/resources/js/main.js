//gui操作
var gui = require('nw.gui');
var win = gui.Window.get();
//console.log(gui.App.argv);//启动app的参数
console.log('app version:'+gui.App.manifest.version);//获取配置参数
console.log('node-webkit version:'+process.versions['node-webkit']);
// Listen to `open` event
gui.App.on('open', function(path) {
  console.log('Opening file: ' + path);
});
//创建托盘
var tray = new gui.Tray({
	title: '征征出品',
	icon: 'icon.png'
});
tray.tooltip = '征征出品';
var menu = new gui.Menu();
menu.append(new gui.MenuItem({
		type: 'normal',
		//icon: "icon.png",
		label: '恢复',
		click: function() {
			win.restore();
		}
	})
);
menu.append(new gui.MenuItem({
		type: 'normal',
		//icon: "icon.png",
		label: '退出',
		click: function() {
			gui.App.closeAllWindows();
		}
	})
);
//menu.items[0].click = function() {}
tray.menu = menu;
tray.on('click', function() {
	win.restore();
});

//加载完成事件
win.on('loaded', function() {
	//设置按钮
	document.getElementById('set').onclick = function() {
		var setWin = gui.Window.open('set.html', {
				"title": "征征出品",
				"icon": "icon.png",
				"toolbar": false,
				"frame": false,
				"width": 600,
				"height": 300,
				"position": "center",
				"resizable": false,
				"show_in_taskbar": false,
				"inject-js-end": "app/skins/skins.js"
		});
	}
	//关闭
	document.getElementById('close').onclick = function() {
		//win.close();
		gui.App.closeAllWindows();//先关闭所有窗口再退出app
		//gui.App.quit();//直接退出整个app，有黑屏
	}
	//切换选项卡
	$('#tabs li').click(function(){
		$('#tabs li').removeClass('current');
		$(this).addClass('current');
		/*var id = $('#tabs li').index($(this));
		alert($("#con"+id).offset().top);
		$("#content").animate({scrollTop:$("#con"+id).offset().top}, 200);*/
	});
});
function switchSkin(name) {
	localStorage.skin = name;		//永久范围
	//sessionStorage.skin = name;	//session范围
	document.getElementById('skin').setAttribute('href','skins/'+name+'/style.css');
}
/*
// Open URL with default browser.
gui.Shell.openExternal('https://github.com/rogerwang/node-webkit');

// Open a text file with default text editor.
gui.Shell.openItem('test.txt');

// Open a file in file explorer.
gui.Shell.showItemInFolder('test.txt');

win.on('close', function() {
	//this.hide();
	//if(confirm('确定退出？')) {
		if (win != null)
			win.close(true);
		this.close(true);
	//}
});
win.on('closed', function() {
	win = null;
});*/
//document-start、document-end 用于iframe
//focus//获取焦点时
//blur//失去焦点时
//minimize//最小化
//restore//最小化恢复
//maximize//最大化
//unmaximize//最大化恢复
//move//移动
//enter-fullscreen//全屏
//leave-fullscreen//退出全屏
//new-win-policy//启动新窗体时iframe、target等
//resize//窗体尺寸改变时

/*//数据存储
var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
// Create table and insert one line
db.transaction(function (tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS foo (id unique, text)');
	tx.executeSql('INSERT INTO foo (id, text) VALUES (1, "synergies")');
	tx.executeSql('INSERT INTO foo (id, text) VALUES (2, "luyao")');
});

// Query out the data
db.transaction(function (tx) {
	tx.executeSql('SELECT * FROM foo', [], function (tx, results) {
		var len = results.rows.length, i;
		for (i = 0; i < len; i++) {
			alert(results.rows.item(i).text);
		}
	});
});*/