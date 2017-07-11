/**
 * Created by huangminxuan on 2016/10/13.
 */
(function () {
    'use strict';
    angular.module('app').directive('multSelect', multSelect);

    multSelect.$inject = ['$compile'];

    function multSelect($compile) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'views/model/multSelect2.html',
            link: function ($scope, $elem, attrs) {

                var el = angular.element($elem[0]);

                el.children('.ms-selectable').find('li').on('click', function (e) {
                    // 向 .ms-selection ul li 追加元素
                    var selection_ul = el.children('.ms-selection').find('ul'),
                        _this = angular.element(this);
                    selection_ul.append(_this.clone());
                    _this.addClass('ms-selected');
                });

                el.children('.ms-selection').find('ul').on('mouseenter', function () {
                    var _this = $(this);
                    if (_this.find('li').length > 0) {
                        _this.find('li').one('click', function () {
                            $(this).remove();
                            var n = $(this).attr('ms-value');
                            el.children('.ms-selectable').find('[ms-value="'+n+'"]').removeClass('ms-selected');
                        });
                    }
                });
            }
        };
    }
})();
