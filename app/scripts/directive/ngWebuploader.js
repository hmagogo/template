/**
 * Created by huangminxuan on 2017/1/21.
 */
(function () {
    'use strict';
    angular.module('app').directive('ngWebuploader', ngWebuploader);

    ngWebuploader.$inject = ['$modal'];

    function ngWebuploader($modal) {
        let directive = {
            restrict: 'AE',
            scope: {
                accept: '=accept'
            },
            link: webUploaderLink
        };
        return directive;

        function webUploaderLink(scope, element, attrs) {
            // $modal.open();
            element.bind('click',function(){

            });
        }
    }

})();
