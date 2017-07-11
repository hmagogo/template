'use strict';

var app = angular.module('app', [
    'ngAnimate',    /* 产生动画效果的模板 */
    'ui.router',
    'ui.bootstrap',
    'ui.load',
    'ui.jq',
    // 'ui.validate',
    'oc.lazyLoad',
    'restangular',
    'anguFixedHeaderTable'
]);

// ui.grid Module
(function () {
  angular.module('gridModule', ['ui.grid', 'ui.grid.resizeColumns', 'ui.grid.edit']);
})();
