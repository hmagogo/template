/**
 * Created by hadoop on 2016/1/18.
 */
app.controller('commandsCtrl', ['$scope', 'commandService', function ($scope, commandService) {
    'use strict';
    // 初始化分页参数
    $scope.listParams = {
        'pageNo': 1,
        'pageSize': 10
    };

    /**
     * 页面初始化函数
     */
    $scope.initPage = function () {
        $scope.queryCommand();
    };

    /**
     * 查询监控命令函数
     * @param pageSize      页面记录数
     * @param goPage        跳转页数
     * @param queryParams   查询参数
     */
    $scope.queryCommand = function (pageSize, goPage, queryParams) {
        //GO的空跳转
        if (pageSize && goPage) {
            $scope.listParams.pageSize = pageSize;
            $scope.listParams.pageNo = goPage;
        }

        /**
         * 按条件查询监控命令
         * @param params        查询参数
         * @param callback      返回结果集
         */
        commandService.queryCommand($scope.listParams, function (response) {
            $scope.resultList = response.data.results;
            // 设置分页
            $scope.page = response.data;
            $scope.page.totalCount = response.data.totalCount;
            $scope.page.pageSize = response.data.pageSize;
            $scope.page.currentPage = response.data.pageNo;
        });
    };


}]);