// oclazyload config  延迟加载
// http://blog.csdn.net/qq673318522/article/details/50733878

(function () {
    'use strict';
    angular.module('app')
    .config(['$ocLazyLoadProvider', 'Modules_Config', loadProvider]);

    function loadProvider($ocLazyLoadProvider, Modules_Config) {
        //这里使用了 oclazyload 进行异步加载程序 js
        $ocLazyLoadProvider.config({
            // debug: true,
            debug: false,
            events: true,
            modules: Modules_Config
        });
    }
})();
