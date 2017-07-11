/**
 * Created by HMX on 2016/07/11.
 *
 *
 * http://www.tuicool.com/articles/aAB7fei
 * http://www.cnblogs.com/huangzhen22/p/3918957.html
 * http://www.bubuko.com/infodetail-923383.html
 * http://www.wenzhixin.net.cn/2014/11/08/bootstrap-table
 */
app.controller('btCtrl', ['$scope', function($scope) {
	'use strict';

	$('#table2').bootstrapTable({
		method: 'post',
		contentType: "application/x-www-form-urlencoded",
		url: '/table/bt2',
		dataType: 'json',
		striped: true, 			//使表格带有条纹
		pagination: true, 		//在表格底部显示分页工具栏
		pageSize: 22,
		pageNumber: 1,
		pageList: [10, 20, 50, 100, 200, 500],
		idField: 'id',			//标识哪个字段为id主键
		showToggle: false, 		//名片格式
		cardView: false, 		//设置为True时显示名片（card）布局
		showColumns: true, 		//显示隐藏列  
		showRefresh: true, 		//显示刷新按钮
		singleSelect: true, 	//复选框只能选择一条记录
		search: false, 			//是否显示右上角的搜索框
		clickToSelect: true, 	//点击行即可选中单选/复选框
		sidePagination: 'server', 		//表格分页的位置
		// queryParams: queryParams, 		//参数
		queryParamsType: 'limit', 		//参数格式,发送标准的RESTFul类型的参数请求
		toolbar: '#toolbar', 			//设置工具栏的Id或者class
		// 列设置
		columns: [
			{
				field: 'state',
				checkbox: true
			}, {
				field: 'name',
				title: '姓名',
				width: 100
			}, {
				field: 'isActive',
				title: '活跃',
				width: 40
			}, {
				field: 'balance',
				title: '余额',
				width: 80
			}, {
				field: 'picture',
				title: '图片',
				width: 80
			}, {
				field: 'age',
				title: '年龄',
				width: 180
			}, {
				field: 'company',
				title: '公司',
				width: 100
			}, {
				field: 'email',
				title: '邮箱',
				width: 100
			}, {
				field: 'phone',
				title: '电话',
				width: 100
			}, {
				field: 'address',
				title: '地址',
				width: 100
			}, {
				field: 'registered',
				title: '是否注册',
				width: 100
			}, {
				field: 'latitude',
				title: '纬度',
				width: 100
			}, {
				field: 'longitude',
				title: '经度',
				width: 100
			}
		],
		silent: true, 	//刷新事件必须设置
		formatLoadingMessage: function() {
			return '请稍等，正在加载中...';
		},
		formatNoMatches: function() { 	//没有匹配的结果
			return '无符合条件的记录';
		},
		onLoadSuccess: function(response) {
			return response;
		},
		onLoadError: function(data) {
			$('#reportTable').bootstrapTable('removeAll');
		},
		onClickRow: function(row) {
			// window.location.href = '/qStock/qProInfo/' + row.ProductId;
		}
	});
}]);