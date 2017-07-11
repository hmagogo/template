/**
 * Created by HMX on 2016/3/16.
 * 使用方法：
 * 在 html 页面上 input 等标签下使用
 * < div class="form-group" ng-repeat="checks in CheckTypeList">
 *   < input class="form-control" type="text" ng-for-model="checks" param="checkType,historyNo" manner="historyNums"/>
 * < /div>
 * ng-for-model：ng-repeat循环的记录
 * param：键值参数。第一个参数用来作（键），第二个参数用来作值
 * manner：定义集合名称。如下面
 *
 * 在范围的页面 controller 中定义，如：$scope.historyNums = {}; 使用集合接收键值参数。
 */
(function () {
    'use strict';
    angular.module('app').directive('ngForModel', ngForModel);

    ngForModel.$inject = ['$parse', '$compile'];

    function ngForModel($parse, $compile) {
        return {
            link: function (scope, element, attrs) {
                var parsedModel = $parse(attrs.ngForModel),
                    modelValue = parsedModel(scope) || {};

                var param = attrs.param,
                    params = param.split(',');

                var manner = attrs.manner,
                    attrValue = manner + '.' + modelValue[params[0]];

                element.attr('ng-model', attrValue);
                element.removeAttr('ng-for-model');
                element.removeAttr('manner');
                element.removeAttr('param');

                $compile(element[0])(scope);
                scope[manner][modelValue[params[0]]] = modelValue[params[1]];
            }
        };
    }
})();
