/**
 * TODO 对query datetimepicker 进行封装
 * Created by HMX on 2015/10/28.
 */
(function () {
    'use strict';
    angular.module('app').directive('ngDatepicker', ngDatepicker);

    ngDatepicker.$inject = ['$parse'];

    function ngDatepicker($parse) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                var getter = $parse(attrs.ngDatepicker),
                    opt = getter(scope) || {},
                    tmp;

                var defaultConfig = {
                    lang: 'ch',
                    timepicker: true,
                    format: 'Y-m-d H:i',
                    formatDate: 'Y-m-d H:i',
                    maxDate: 'today',
                    step: 1
                };

                function initEvent () {
                    var format = opt.format || 'Y-m-d';
                    tmp = opt ? angular.extend(defaultConfig, opt) : defaultConfig;
                    
                    tmp.onSelectDate = function (val) {
                        scope.$apply(function () {
                            ctrl.$setViewValue(val.dateFormat(format));
                        });
                        if (opt.onSelectDate) {
                            opt.onSelectDate();
                        }
                        this.trigger('close.xdsoft');
                    };

                    tmp.onSelectTime = function (val, element) {
                        scope.$apply(function () {
                            ctrl.$setViewValue(val.dateFormat(format));
                        });
                        if (opt.onSelectTime) {
                            opt.onSelectTime();
                        }
                    };
                }
                initEvent();

                element.datetimepicker(tmp);

                element.datetimepicker({
                    validateOnBlur: false
                });

                scope.$watch(attrs.datepicker, function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        initEvent();
                        element.datetimepicker(tmp);
                    }
                }, true);
            }
        };
    }
})();