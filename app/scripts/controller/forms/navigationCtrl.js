/**
 * Created by huangminxuan on 2016/12/30.
 */
(function() {
    'use strict';
    angular.module('app').controller('navigationCtrl', navigationCtrl);
    // 注入
    navigationCtrl.$inject = ['$scope'];

    function navigationCtrl($scope) {
        var _this  = this;

        _this.exhibition = exhibition;       //小导航切换显示
        _this.showSubLayer = showSubLayer;   //显示导航子层
        _this.hideSubLayer = hideSubLayer;   //隐藏导航子层

    }

    /**
     * 小导航切换显示
     */
    function exhibition(event, view) {
        var current = $(event.currentTarget);
        // 清除 activeBottom 样式
        if (current.siblings().hasClass('activeBottom')) {
            current.siblings().removeClass('activeBottom');
        }
        if (current.siblings().children().hasClass('activeBottom')) {
            current.siblings().children().removeClass('activeBottom');
        }
        if (current.parent().siblings().hasClass('activeBottom')) {
            current.parent().siblings().removeClass('activeBottom');
        }
        if (current.parent().siblings().children().hasClass('activeBottom')) {
            current.parent().siblings().children().removeClass('activeBottom');
        }
        // 添加 activeBottom 样式
        if (current.hasClass('poi')) {
            current.children().addClass('activeBottom');
        } else {
            current.addClass('activeBottom');
        }

        // 鼠标离开，设置 flag
        if (current.parent().attr('ng-mouseleave')) {
            current.parent().siblings().attr('flag', 'true');
            current.parent().siblings().children('span.hideSub').hide();
            current.parent().attr('flag', 'false');
        }
        if (current.siblings().attr('ng-mouseleave')) {
            current.siblings().children('span.hideSub').hide();
            current.siblings().attr('flag', 'true');
        }

        this.viewCtrl = view;
    }
    /**
     * 鼠标移入显示小导航子层
     */
    function showSubLayer(event) {
        var current = $(event.currentTarget);
        current.children().show();
    }
    /**
     * 鼠标移出隐藏小导航子层
     */
    function hideSubLayer(event) {
        var current = $(event.currentTarget);
        if (current.attr('flag') === 'true') {
            current.children('span.hideSub').hide();
        }
    }

})();
