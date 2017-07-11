
//    app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
//        $rootScope.$state = $state;
//        $rootScope.$stateParams = $stateParams;
//    }]);

(function () {
    'use strict';
    /**
     * 该代码对模块的注册，仅仅依赖了 ui.router 和 oc.LazyLoad。
     * 配置也只是简单配置了模块，以便在后面的js能识别到 app上的方法。
     */
    angular.module('app').config([
        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
            // lazy controller, directive and service (懒加载时的控制器, 指令和服务)
            app.controller = $controllerProvider.register;
            app.directive  = $compileProvider.directive;
            app.filter     = $filterProvider.register;
            app.factory    = $provide.factory;
            app.service    = $provide.service;
            app.constant   = $provide.constant;
            app.value      = $provide.value;
        }
    ]);
})();


// config是用来对生成的angular module进行配制属性的。
//app.config(function (RestangularProvider) {
//        //对Restangular加上返回过滤器，数据返回时进行过滤验证。
//        RestangularProvider.setResponseExtractor(function (response) {
//            return response;
//        });
//});
