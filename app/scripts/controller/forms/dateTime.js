/**
 * Created by MinXuan.Wong on 2017/04/17.
 */
(function() {
    'use strict';

    angular.module('app').controller('datepickerCtrl', datepickerCtrl);
    // 注入
    datepickerCtrl.$inject = ['$scope'];

    function datepickerCtrl($scope) {
        let _this = this;

        $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'yyyy-MM-dd hh:mm:ss', 'shortDate'];
        _this.format = $scope.formats[0];

        $scope.today = function () {   // 创建一个当天日期的方法，
            $scope.dt = new Date().Format(_this.format);    // 定义一个属性来接收当天日期
        };
        $scope.today();

        /** 清除日期 **/
        $scope.clear = function () {
            $scope.dt = null;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            //minDate: getDate(9),       /* 最小日期为：当天的前十天 */
            //maxDate: new Date().Format($scope.format),
            class: 'datepicker'
        };

        $scope.open = function ($event) {
            $event.preventDefault();    // 取消事件的默认行为
            $event.stopPropagation();   // 阻止事件冒泡到DOM树上

            $scope.opened = true;
        };

        // http://www.jianshu.com/p/663f2a86dd22

        _this.datetime_1 = {
            lang: 'ch',             //语言选择中文 注：旧版本 新版方法：$.datetimepicker.setLocale('ch');
            timepicker: true,
            format: 'Y-m-d H:i',    //格式化日期
            formatDate: 'Y-m-d H:i',
            maxDate: 'today',
            step: 1
        };

        _this.datetime_2 = {
            lang: 'ch',
            timepicker: false,      //关闭时间选项
            format: 'Y-m',
            weekStart: 1,
            autoclose: true,
            startView: 3,
            minView: 3,
            forceParse: false,
            formatDate: 'Y-m',
            maxDate: 'today',
            step: 2
        };
    }
})();
