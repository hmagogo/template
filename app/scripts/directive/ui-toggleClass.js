/**
 * Created by HMX on 2015/7/5.
 */
(function () {
    'use strict';
    angular.module('app').directive('uiToggleClass', uiToggleClass);

    uiToggleClass.$inject = ['$timeout', '$document'];

    function uiToggleClass($timeout, $document) {
        return {
            restrict: 'AC',
            link: function (scope, el, attr) {
                el.on('click', function (e) {
                    e.preventDefault();
                    var classes = attr.uiToggleClass.split(','),  // 获取 ui-toggle-class 里的属性值 active
                        targets = (attr.target && attr.target.split(',')) || Array(el), // 获取当前对象的属性target 或 当前事件对象
                        key = 0;
                    angular.forEach(classes, function (clas) {  // 循环数组classes，相当于for循环
                        var target = targets[(targets.length && key)];  // 得到当前对象target的属性值
                        ( clas.indexOf( '*' ) !== -1 ) && magic(clas, target);
                        $(target).toggleClass(clas);
                        key++;
                    });

                    $(el).toggleClass('active');

                    // 检索 ui-toggle-class的属性值 与 target的属性值
                    function magic(clas, target) {
                        // RegExp 对象用于存储检索模式
                        var patt = new RegExp('\\s' + clas.replace(/\*/g, '[A-Za-z0-9-_]+').split(' ').join('\\s|\\s') +
                            '\\s', 'g');
                        var cn = ' ' + $(target)[0].className + ' ';  // 获取当前对象的class属性值
                        // test()用于检测一个字符串是否匹配某个模式.
                        while( patt.test(cn) ){
                            cn = cn.replace(patt, ' ');
                        }
                        $(target)[0].className = $.trim(cn);  // trim()用于去掉字符串首尾的空白字符
                    }
                });
            }
        };
    }
})();
