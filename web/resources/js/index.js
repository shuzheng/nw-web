var os = require('os');
console.log('You are running on ', os.platform());

$(function() {
	// 菜单栏
	$('#menubar a').mousedown(function() {
		$('#menubar a').removeClass('cur');
		$(this).addClass('cur');
	});
});