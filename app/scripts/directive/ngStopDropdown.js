/**
 * Created by huangminxuan on 2016/5/16.
 * 作用：固定 bootstrap 下拉框
 */
(function () {
    'use strict';
    angular.module('app').directive('ngStopDropdown', ngStopDropdown);

    function ngStopDropdown() {
        return {
	        restrict: 'A',
	        link: function (scope, element, attr) {
	            element.click(function (event) {
	                event.stopPropagation();    // 不再派发事件。
	            });
	        }
	    }
    }
})();
/** 
 * stopPropagation() 终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播。
 * 调用该方法后，该节点上处理该事件的处理程序将被调用，事件不再被分派到其他节点。
 */
