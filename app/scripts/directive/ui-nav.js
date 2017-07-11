/**
 * Created by HMX on 2015/7/6.
 */

(function () {
    'use strict';
    angular.module('app').directive('uiNav', uiNav);

    uiNav.$inject = ['$timeout'];

    function uiNav($timeout) {
        return {
            restrict: 'AC',
            link : function (scope, el, attr){
                var attrName = attr.uiNav;
                // 单击时展开
                el.on('click', 'a', function (e) {
                    var _this = $(this);
                    _this.parent().siblings('.active').toggleClass('active');//寻找父类中同类的元素属性为'.active'，并关闭样式'active'

                    if ('tabs' === attrName) {
                        var tabsId = angular.element(_this.attr('href'));
                        _this.parent().addClass('active');
                        tabsId.siblings('.active').toggleClass('active');
                        tabsId.addClass('active');
                    } else {
                        _this.next().is('ul') && _this.parent().toggleClass('active') &&  e.preventDefault();
                    }
                });
            }
        };
    }
})();
