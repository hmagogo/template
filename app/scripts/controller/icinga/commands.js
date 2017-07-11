/**
 * Created by hadoop on 2016/1/18.
 */
app.controller('commandsCtrl', ['$scope', 'commandService', function ($scope, commandService) {
    'use strict';
    // ��ʼ����ҳ����
    $scope.listParams = {
        'pageNo': 1,
        'pageSize': 10
    };

    /**
     * ҳ���ʼ������
     */
    $scope.initPage = function () {
        $scope.queryCommand();
    };

    /**
     * ��ѯ��������
     * @param pageSize      ҳ���¼��
     * @param goPage        ��תҳ��
     * @param queryParams   ��ѯ����
     */
    $scope.queryCommand = function (pageSize, goPage, queryParams) {
        //GO�Ŀ���ת
        if (pageSize && goPage) {
            $scope.listParams.pageSize = pageSize;
            $scope.listParams.pageNo = goPage;
        }

        /**
         * ��������ѯ�������
         * @param params        ��ѯ����
         * @param callback      ���ؽ����
         */
        commandService.queryCommand($scope.listParams, function (response) {
            $scope.resultList = response.data.results;
            // ���÷�ҳ
            $scope.page = response.data;
            $scope.page.totalCount = response.data.totalCount;
            $scope.page.pageSize = response.data.pageSize;
            $scope.page.currentPage = response.data.pageNo;
        });
    };


}]);