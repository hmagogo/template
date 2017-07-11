/**
 * Created by HMX on 2016/07/20.
 *
 * http://www.jb51.net/article/73896.htm
 * http://markcell.github.io/jquery-tabledit/#examples
 */
app.controller('tableditCtrl', ['$scope', function($scope) {
	'use strict';

	// Tabledit URL 请求不了nodeJS 的 /table/jt1 路径
	$('#example1').Tabledit({
		url: '/table/jt1',
		columns: {
			identifier: [0, 'id'],
			editable: [
				[1, 'nickname'],
				[2, 'firstname'],
				[3, 'lastname']
			]
		}
	});
}]);