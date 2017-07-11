/**
 * Created by HMX on 2015/9/2.
 * 作用：固定 bootstrap 下拉框 (不推荐，使用 ngStopDropdown)
 */
(function () {
    'use strict';
    angular.module('app').directive('ngDropdown', ngDropdown);

    ngDropdown.$inject = ['$document'];

    function ngDropdown($document) {
        return {
            link: function (scope, el, attr) {

                var clearMenus = function (e) {
                    el.each(function () {
                        var _parent = el.parent(),
                            p_sib = _parent.siblings();
                        var relatedTarget = {relatedTarget: el[0]};

                        if (e && e.type=='click' && $.contains(_parent[0], e.target)) {
                            return ;
                        }
                        el.attr('aria-expanded', 'false');
                        _parent.trigger( $.Event('hide.bs.dropdown', relatedTarget) );

                        if (p_sib.hasClass('open')) {
                            // console.log(p_sib)
                        }
                        _parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget);
                    });
                };

                el.on('click', function (e) {
                    var _parent = $(this).parent();
                    var isActive = _parent.hasClass('open');

                    clearMenus();

                    if (!isActive) {
                        var relatedTarget = { relatedTarget: el[0] };
                        _parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));
                        if (e.isDefaultPrevented()) {
                            return ;
                        }
                        el.trigger('focus').attr('aria-expanded', 'true');
                        _parent.toggleClass('open').trigger('shown.bs.dropdown', relatedTarget);
                    }
                    return false;
                });

                $document.on('click', clearMenus);
            }
        };
    }
})();