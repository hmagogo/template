/**
 * Created by huangminxuan on 2017/2/13.
 * 通用的一些过滤器
 */
(function () {
    'use strict';
    angular.module('app').filter('byteAdaptiveUnit', byteAdaptiveUnit);  // byte自适应转换其他单位
    angular.module('app').filter('cycleWrap', cycleWrap);
    angular.module('app').filter('trusted', trusted);


    //注入依赖
    trusted.$inject = ['$sce'];

    /**
     * byte自适应转换其他单位
     * 单位：'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'
     */
    function byteAdaptiveUnit() {
        return function (bytes) {
            if (!bytes) {
                return 0;
            }
            var retStyle = arguments[1] ? arguments[1] : 'value_unit';
            var limit = arguments[2] ? arguments[2] : 1;
            if (!limit || isNaN(limit)){
                limit = 1;
            }
            var sizeUnit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var quantity = bytes;
            var index = 0;
            while (quantity >= 1024) {
                quantity /= 1024;
                index += 1;
            }
            if (retStyle == 'value'){
                return quantity.toFixed(limit);
            } else if (retStyle == 'unit') {
                return sizeUnit[index];
            } else if (retStyle == 'index'){
                //增加一个功能，直接指定使用哪个作为单位，用法 capacity | BytesToKMGTB: 'index':3
                quantity = bytes;
                for(var i=0;i<limit;i++){
                    quantity /= 1024;
                }
                return quantity.toFixed(0) + sizeUnit[limit];
            } else {
                return quantity.toFixed(limit) + ' ' + sizeUnit[index];
            }
        };
    }

    /**
     * 该过滤器作用是将传送的内容转换成html可信任的内容。如果在 ng-bind-html 中未指定该过滤器，则报如下错误：
     * Error: [$sce:unsafe] Attempting to use an unsafe value in a safe context.
     */
    function trusted($sce) {
        return function (text) {
            return $sce.trustAsHtml(text); //该方法将值转换为特权所接受并能安全地使用“ng-bind-html”。
        };
    }

    /**
     * 循环数组外层
     */
    function cycleWrap() {
        return function (arr) {
            if (!isUndefined(arr)) {
                for (var i = 0; i < arr.length; i++) {
                    return arr[i];
                }
            }
        };
    }
})();
