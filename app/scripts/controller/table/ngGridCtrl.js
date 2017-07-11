/**
 * Created by HMX on 2016/7/30.
 * 闭包写法：再也不存在全局变量了
 *
 * https://segmentfault.com/search?q=ui-grid
 * http://my.oschina.net/gmd/blog/670895
 */
(function() {
    'use strict';
    angular.module('app').controller('ngGridCtrl', ngGridCtrl);
    // 注入
    ngGridCtrl.$inject = ['$scope', '$http'];

    function ngGridCtrl($scope, $http) {
        var _this  = this;
        var myData = [];
        var totalServerItems = 0;

        var pagingOptions = {
            pageSizes: [250, 500, 1000],
            pageSize: 250,
            currentPage: 1
        };

        var filterOptions = {
            filterText: '',
            useExternalFilter: true
        };

        _this.gridOptions = {};

        /**
         * 设置分页数据
         * @param data          数据
         * @param page          页数
         * @param pageSize      记录数
         */
        function setPagingData(data, page, pageSize) {
            // slice() 方法可提取字符串、数组的某个部分，并以新的字符串、数组返回被提取的部分。
            myData = data.slice((page - 1) * pageSize, page * pageSize);
            totalServerItems = data.length;
            // $$phase 是作为 angular 内部状态表示位，用来标示当前是处于哪个阶段。
            // 共有的阶段：$digest  or  $apply
            if (!$scope.$$phase) {
                $scope.$apply();
            }

            _this.gridOptions = {
                data: myData,
                columnDefs: [
                    {field: 'id', displayName: '序号'},
                    {field: 'level', displayName: '级别'},
                    {field: 'status', displayName: '状态'},
                    {field: 'alarmObject', displayName: '告警对象'},
                    {field: 'lasingTime', displayName: '产生时间'}
                ],
                enablePaging: true,
                showFooter: true,
                pagingOptions: pagingOptions,
                filterOptions: filterOptions
            };
        }

        /**
         * 异步获取分页数据
         * @param pageSize      记录数
         * @param currentPage   当前页
         * @param searchText    搜寻文本
         */
        function getPagedDataAsync(pageSize, currentPage, searchText) {
            setTimeout(function () {
                $http.get('/table/grid').success(function (largeLoad){
                    setPagingData(largeLoad.data, currentPage, pageSize);
                });
            }, 100);
        }

        getPagedDataAsync(pagingOptions.pageSize, pagingOptions.currentPage);

        // 监视 pagingOptions，及时更新分页数据
        // $scope.$watch('pagingOptions', function (newVal, oldVal) {
        //     if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
        //         $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        //     }
        // }, true);

        /********** 以下简单测试 **********/

        var mydefalutData = [{ name: 'Moroni', age: 50, birthday: 'Oct 28, 1970', salary: '60,000' },
                            { name: 'Tiancum', age: 43, birthday: 'Feb 12, 1985', salary: '70,000' },
                            { name: 'Jacob', age: 27, birthday: 'Aug 23, 1983', salary: '50,000' },
                            { name: 'Nephi', age: 29, birthday: 'May 31, 2010', salary: '40,000' },
                            { name: 'Enos', age: 34, birthday: 'Aug 3, 2008', salary: '30,000' },
                            { name: 'Moroni', age: 50, birthday: 'Oct 28, 1970', salary: '60,000' },
                            { name: 'Tiancum', age: 43, birthday: 'Feb 12, 1985', salary: '70,000' },
                            { name: 'Jacob', age: 27, birthday: 'Aug 23, 1983', salary: '40,000' },
                            { name: 'Nephi', age: 29, birthday: 'May 31, 2010', salary: '50,000' },
                            { name: 'Enos', age: 34, birthday: 'Aug 3, 2008', salary: '30,000' },
                            { name: 'Moroni', age: 50, birthday: 'Oct 28, 1970', salary: '60,000' },
                            { name: 'Tiancum', age: 43, birthday: 'Feb 12, 1985', salary: '70,000' },
                            { name: 'Jacob', age: 27, birthday: 'Aug 23, 1983', salary: '40,000' },
                            { name: 'Nephi', age: 29, birthday: 'May 31, 2010', salary: '50,000' },
                            { name: 'Enos', age: 34, birthday: 'Aug 3, 2008', salary: '30,000' }];

        /*_this.gridOptions = {
            data: mydefalutData,
            columnDefs: [
                {field: 'name', displayName: '名字'},
                {field: 'age', displayName: '年龄'},
                {field: 'birthday', displayName: '生日'},
                {field: 'salary', displayName: '工资'}
            ]
        };*/
    }
})();
