'use strict';

/**
 * 0.1.1
 * General-purpose jQuery wrapper. Simply pass the plugin name as the expression.
 *
 * It is possible to specify a default set of parameters for each jQuery plugin.
 * Under the jq key, namespace each plugin by that which will be passed to ui-jq.
 * Unfortunately, at this time you can only pre-define the first parameter.
 * @example { jq : { datepicker : { showOn:'click' } } }
 *
 * @param ui-jq {string} The $elm.[pluginName]() to call.
 * @param [ui-options] {mixed} Expression to be evaluated and passed as options to the function
 *     Multiple parameters can be separated by commas
 * @param [ui-refresh] {expression} Watch expression and refire plugin on changes
 *
 * @example <input ui-jq="datepicker" ui-options="{showOn:'click'},secondParameter,thirdParameter" ui-refresh="iChange">
 */
angular.module('ui.jq', ['ui.load']).
    value('uiJqConfig', {}).
    directive('uiJq', ['uiJqConfig', 'JQ_CONFIG', 'uiLoad', '$timeout', function uiJqInjectingFunction(uiJqConfig, JQ_CONFIG, uiLoad, $timeout) {

        return {
            restrict: 'A',
            compile: function uiJqCompilingFunction(tElm, tAttrs) {

                if (!angular.isFunction(tElm[tAttrs.uiJq]) && !JQ_CONFIG[tAttrs.uiJq]) {
                    throw new Error('ui-jq: The "' + tAttrs.uiJq + '" function does not exist');
                }
                var options = uiJqConfig && uiJqConfig[tAttrs.uiJq];

                return function uiJqLinkingFunction(scope, elm, attrs) {
                    // 如果 ui-jq 中的值与 JQ_CONFIG 中的常量相同，则延迟加载指定的插件
                    if (JQ_CONFIG[attrs.uiJq]) {
                        uiLoad.load(JQ_CONFIG[attrs.uiJq]).then(function () {
                            callPlugin();
                            refresh();
                        }).catch(function () {

                        });
                    } else {
                        callPlugin();
                        refresh();
                    }

                    // If change compatibility is enabled, the form input's "change" event will trigger an "input" event
                    if (attrs.ngModel && elm.is('select,input,textarea')) {
                        elm.bind('change', function () {
                            elm.trigger('input');
                        });
                    }

                    /**
                     * 获取 ui-options 中的传递参数
                     * @returns {Array} 数据类型的参数
                     */
                    function getOptions() {
                        var linkOptions = [];
                        // If ui-options are passed, merge (or override) them onto global defaults and pass to the jQuery method
                        // 如果 ui-options 有传递。通过jQuery的方法，将传递的数据合并(或覆盖)到全局的默认值中
                        if (attrs.uiOptions) {
                            linkOptions = scope.$eval('[' + attrs.uiOptions + ']');  // 获取 ui-options 中的值在作用域下的参数
                            if (angular.isObject(options) && angular.isObject(linkOptions[0])) {
                                linkOptions[0] = angular.extend({}, options, linkOptions[0]);
                            }
                        } else if (options) {
                            linkOptions = [options];
                        }
                        return linkOptions;
                    }

                    // Call jQuery method and pass relevant options --通过相关的设置，调用jQuery的方法
                    function callPlugin() {
                        $timeout(function () {
                            elm[attrs.uiJq].apply(elm, getOptions());
                        }, 0, false);
                    }

                    function refresh() {
                        // If ui-refresh is used, re-fire the the method upon every change
                        if (attrs.uiRefresh) {
                            scope.$watch(attrs.uiRefresh, function () {
                                callPlugin();
                            });
                        }
                    }
                };
            }
        };
    }]);