/**
 * Created by hadoop on 2015/11/5.
 * angular全局常量类
 */
(function () {
	'use strict';
    angular.module('app')
    .constant('JQ_CONFIG', {
    	chosen: [
	    	'bower_components/chosen/chosen.css',
	    	'bower_components/chosen/chosen.jquery.js'
	    ],
	    datetimepicker: [
	        'bower_components/datetimepicker/jquery.datetimepicker.css',
	        'bower_components/datetimepicker/jquery.datetimepicker.js'
	    ]
    })
    .constant('Modules_Config', [
    	/* 组件引入，以：key/value对象方式 */
        {
            name: 'ngImgCrop',
            files: [
                'components/angularJS/ngImgCrop/ng-img-crop.css',
                'components/angularJS/ngImgCrop/ng-img-crop.js'
            ]
        }, {
            name: 'angularFileUpload',
            files: [
                'bower_components/angular-file-upload/dist/angular-file-upload.min.js'
            ]
        }, {
            name: 'ui.select',
            files: [
                'bower_components/angular-ui-select/dist/select.css',
                'bower_components/angular-ui-select/dist/select.js'
            ]
        }, {
            name: 'bootstrapTable',
            files: [
                'bower_components/bootstrap-table/dist/bootstrap-table.min.css',
                'bower_components/bootstrap-table/dist/bootstrap-table.min.js',
                'bower_components/bootstrap-table/src/extensions/toolbar/bootstrap-table-toolbar.js'
            ]
        }, {
            name: 'jqueryFlexigrid',
            files: [
                'bower_components/jquery-flexigrid/css/flexigrid.css',
                'bower_components/jquery-flexigrid/js/flexigrid.js'
            ]
        }, {
            name: 'datatables',
            files: [
                'bower_components/datatables/media/css/jquery.dataTables.css',
                'bower_components/datatables/media/js/jquery.dataTables.js'
            ]
        }, {
            name: 'gridModule',
            files: [
                'bower_components/angular-ui-grid/ui-grid.min.css',
                'bower_components/angular-ui-grid/ui-grid.min.js'
            ]
        }, {
            name: 'webUploader',
            files: [
                'bower_components/fex-webuploader/dist/webuploader.css',
                'bower_components/fex-webuploader/dist/webuploader.js'
            ]
        }
    ]);
})();
