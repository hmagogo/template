/**
 * Created by HMX on 2016/07/20.
 *
 */
app.controller('flexigridCtrl', ['$scope', 'flexigridService', function($scope, flexigridService) {
	'use strict';

	// flexigridService.query1(function (response) {
	// 	if (response.success) {
	// 		$scope.table1 = response.data;
	// 	}
	// });

	$('#flexme1').flexigrid({
		url : '/table/jf1',
		dataType: 'json',
		colModel: [
			{display: '级别', name: 'level', width : 80, sortable : true, align: 'center'},
			{display: '状态', name: 'status', width : 80, sortable : true, align: 'center'},
			{display: '告警对象', name: 'alarmObject', width : 120, sortable : true, align: 'center'},
			{display: '产生时间', name: 'lasingTime', width : 120, sortable : true, align: 'center'}
		],
		preProcess: function (data) {
			// console.log(data)
		},
		onSuccess: function (response) {
			console.log(response)
		}
	});

	// $('#flexme2').flexigrid({
	// 	url : '/table/jf2',
	// 	dataType: 'json',
	// 	height:'auto',
	// 	colModel: [
	// 		{display: 'ID', name : 'id', width : 40, sortable : true, align: 'center'},
	// 		{display: '水果名', name : 'name', width : 40, sortable : true, align: 'center'},
	// 		{display: '价格', name : 'price', width : 40, sortable : true, align: 'center'},
	// 	]
	// });
}]);