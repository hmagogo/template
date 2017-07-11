/**
 * Created by HMX on 2016/8/3.
 * 作用：根据表格的布局已经固定好 表头、表列，然后通过此指令进行 JS 操作
 */
(function () {
    'use strict';
    angular.module('app').directive('ngFixedCol', ngFixedCol);

    function ngFixedCol() {
        return {
            link: function ($scope, $elem, $attrs, $ctrl) {
                /**
                 * closest() 方法获得匹配选择器的第一个祖先元素，从当前元素开始沿 DOM 树向上找。
                 */
                var self          = $elem[0],
                    $self         = angular.element(self),
                    $wrapper      = $self.closest('.table-wrapper'),
                    $fixedHeads   = $wrapper.find('.fixed-body'),
                    $fixedColumns = $wrapper.find('.fixed-column');

                /*
                 * return void
                 * bind scroll event
                 */
                $self.bind('scroll', function() {
                    // col
                    $fixedColumns.find('.tbody table').css({
                        'margin-top': -$self.scrollTop()
                    });
                    // head
                    $fixedHeads.find('.thead table').css({
                        'margin-left': -this.scrollLeft
                    });
                });

            }
        };
    }
})();