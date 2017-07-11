/**
 * Config for the router
 * $ocLazyLoad是AngularJS的模块按需加载器
 */
(function () {
    'use strict';
    angular.module('app').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', routing]);

    function routing($stateProvider, $urlRouterProvider, $locationProvider) {
        // $locationProvider.html5Mode(true);  使用这个时，html中加入<base href="/">
        //也可以忽略次检查
        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: false
        // });
        $urlRouterProvider.otherwise('/app/homePage'); //默认跳转
        $stateProvider
            .state('app', {
                abstract: true, // abstract: true 表明此状态不能被显性激活，只能被子状态隐性激活
                url: '/app',
                templateUrl: 'views/app.html'
            })
            .state('app.homePage', {
                url: '/homePage',
                templateUrl: 'views/section/homePage.html'
            })
            // backTest
            .state('app.backTest', {
                url: '/backTest',
                template: '<div ui-view></div>'
            })
            .state('app.backTest.query', {
                url: '/query',
                templateUrl: 'views/section/backTest/query.html',
                resolve: {
                    deps: ['uiLoad', function(uiLoad) {
                        return uiLoad.load('scripts/controller/backTest/query.js');
                    }]
                }
            })
            .state('app.backTest.transmit', {
                url: '/transmit',
                templateUrl: 'views/section/backTest/transmit.html',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controller/backTest/transmit.js',
                            'scripts/services/transmitService.js'
                        ]);
                    }]
                }
            })
            .state('app.backTest.socketIo', {
                url: '/socketIo',
                templateUrl: 'views/section/backTest/socketIo.html',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            // 'components/socket.io-client/lib/socket.js',
                            'scripts/controller/backTest/socketIo.js'
                        ]);
                    }]
                }
            })
            // table
            .state('app.table', {
                url: '/table',
                template: '<div ui-view></div>'
            })
            .state('app.table.bootstrapTable', {
                url: '/bootstrapTable',
                templateUrl: 'views/section/table/bootstrapTable.html',
                controller: 'btCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('bootstrapTable').then(function() {
                            return $ocLazyLoad.load('scripts/controller/table/btCtrl.js');
                        });
                    }]
                }
            })
            .state('app.table.JTabledit', {
                url: '/JTabledit',
                templateUrl: 'views/section/table/JTabledit.html',
                controller: 'tableditCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controller/table/tableditCtrl.js');
                    }]
                }
            })
            .state('app.table.flexigrid', {
                url: '/flexigrid',
                templateUrl: 'views/section/table/flexigrid.html',
                controller: 'flexigridCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('jqueryFlexigrid').then(function() {
                            return $ocLazyLoad.load([
                                'scripts/controller/table/flexigrid.js',
                                'scripts/services/table/flexigridService.js'
                            ]);
                        });
                    }]
                }
            })
            .state('app.table.anguFixedHeader', {
                url: '/anguFixedHeader',
                templateUrl: 'views/section/table/anguFixedHeader.html'
            })
            .state('app.table.dataTables', {
                url: '/dataTables',
                templateUrl: 'views/section/table/dataTables.html',
                controller: 'dataTablesCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('datatables').then(function() {
                            return $ocLazyLoad.load([
                                'scripts/controller/table/dataTablesCtrl.js'
                            ]);
                        });
                    }]
                }
            })
            .state('app.table.ngGrid', {
                url: '/ngGrid',
                templateUrl: 'views/section/table/ngGrid.html',
                //  resolve 里的属性如果返回的是 promise对象，那么resolve将会在view加载之前执行
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        // 在这里可以延迟加载任何文件或者刚才预定义的 modules
                        return $ocLazyLoad.load('gridModule').then(function() {
                            return $ocLazyLoad.load([
                                'scripts/controller/table/ngGridCtrl.js'
                            ]);
                        });
                    }]
                }
            })
            // form
            .state('app.form', {
                url: '/form',
                template: '<div ui-view class="fade-in-up"></div>'
            })
            .state('app.form.select', {
                url: '/select',
                templateUrl: 'views/section/forms/select.html',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('ui.select').then(function() {
                            return $ocLazyLoad.load('scripts/controller/forms/selectCtrl.js');
                        });
                    }]
                }
            })
            .state('app.form.dateTime', {
                url: '/dateTime',
                templateUrl: 'views/section/forms/dateTime.html',
                resolve: {
                    deps: ['uiLoad', function(uiLoad) {
                        return uiLoad.load(['scripts/controller/forms/dateTime.js']);
                    }]
                }
            })
            .state('app.form.navigation', {
                url: '/navigation',
                templateUrl: 'views/section/forms/navigation.html',
                resolve: {
                    deps: ['uiLoad', function(uiLoad) {
                        return uiLoad.load(['scripts/controller/forms/navigationCtrl.js']);
                    }]
                }
            })
            .state('app.form.validation', {
                url: '/validation',
                templateUrl: 'views/section/forms/validation.html',
                resolve: {
                    deps: ['uiLoad', function(uiLoad) {
                        return uiLoad.load([
                            'bower_components/angular-ui-validate/dist/validate.min.js',
                            'scripts/controller/forms/validationCtrl.js'
                        ]);
                    }]
                }
            })
            .state('app.form.imageCrop', {
                url: '/imageCrop',
                templateUrl: 'views/section/forms/imageCrop.html',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('ngImgCrop').then(function() {
                            return $ocLazyLoad.load('scripts/controller/forms/imageCropController.js');
                        });
                    }]
                }
            })
            .state('app.form.fileUpload', {
                url: '/fileUpload',
                templateUrl: 'views/section/forms/fileUpload.html',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('angularFileUpload').then(function() {
                            return $ocLazyLoad.load('scripts/controller/forms/fileUploadCtrl.js');
                        });
                    }]
                }
            })
            .state('app.form.webUploader', {
                url: '/webUploader',
                templateUrl: 'views/section/forms/webUploader.html',
                resolve: {
                    // deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    //     return $ocLazyLoad.load('webUploader').then(function() {
                    //         return $ocLazyLoad.load('scripts/controller/forms/webUploaderCtrl.js');
                    //     });
                    // }]
                    deps: ['uiLoad', function(uiLoad) {
                        return uiLoad.load([
                            'bower_components/fex-webuploader/dist/webuploader.css',
                            'bower_components/fex-webuploader/dist/webuploader.js',
                            'scripts/controller/forms/webUploaderCtrl.js'
                        ]);
                    }]
                }
            })
            .state('app.form.storageFile', {
                url: '/storageFile',
                templateUrl: 'views/section/forms/storageFile.html',
                resolve: {
                    deps: ['uiLoad', function(uiLoad) {
                        return uiLoad.load([
                            'scripts/controller/forms/storageFile.js'
                        ]);
                    }]
                }
            })
            .state('app.form.excel', {
                url: '/excel',
                templateUrl: 'views/section/forms/excel.html',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('angularFileUpload').then(function() {
                            return $ocLazyLoad.load([
                                'bower_components/excellentexport/excellentexport.min.js',
                                'components/xlsx/jszip.js',
                                'components/xlsx/xlsx.js',
                                'scripts/controller/forms/excel.js'
                            ]);
                        });
                    }]
                    // deps: ['uiLoad', function(uiLoad) {
                    //     return uiLoad.load([
                    //         'bower_components/excellentexport/excellentexport.min.js',
                    //         'components/xlsx/jszip.js',
                    //         'components/xlsx/xlsx.js',
                    //         'scripts/controller/forms/excel.js'
                    //     ]);
                    // }]
                }
            })
            //chart
            .state('app.chart', {
                url: '/chart',
                template: '<div ui-view></div>'
            })
            .state('app.chart.echarts', {
                url: '/echarts',
                templateUrl: 'views/section/chart/echarts.html',
                resolve: {
                    deps: ['uiLoad', function(uiLoad) {
                        return uiLoad.load([
                            'bower_components/echarts/dist/echarts.min.js',
                            'scripts/controller/chart/echartsCtrl.js'
                        ]);
                    }]
                }
            })
            // icinga
            .state('app.icinga', {
                url: '/icinga',
                template: '<div ui-view></div>'
            })
            .state('app.icinga.commands', {
                url: '/commands',
                templateUrl: 'views/section/icinga/commands.html',
                resolve: {
                    deps: ['uiLoad', function(uiLoad) {
                        return uiLoad.load([
                            'scripts/controller/icinga/commands.js',
                            'scripts/services/icinga/commandService.js'
                        ]);
                    }]
                }
            })
            // html 5
            .state('app.html5', {
                url: '/html5',
                template: '<div ui-view></div>'
            })
            .state('app.html5.canvas', {
                url: '/canvas',
                templateUrl: 'views/section/html5/canvas.html',
                resolve: {
                    deps: ['uiLoad', function(uiLoad) {
                        return uiLoad.load([
                            'scripts/controller/html5/canvasCtrl.js'
                        ]);
                    }]
                }
            })
        ;
    }
})();
