/**
 * Created by HMX on 2015/7/10.
 */
(function () {
    'use strict';
    angular.module('app').directive('uiScroll', uiScroll);

    uiScroll.$inject = ['$location', '$anchorScroll'];

    function uiScroll($location, $anchorScroll) {
        return {
            restrict: 'AC',
            link: function (scope, el, attr) {
                el.on('click', function (e) {
                    // $location.hash(attr.uiScroll);
                    $anchorScroll();
                });
            }
        };
    }
})();
