/**
 * Created by HMX on 2015/5/28.
 */
app.controller('queryController', ['$scope', '$http', function ($scope, $http) {
    'use strict';
    // 初始化分页参数
    $scope.listParams = {
        'goPage': 1,
        'pageSize': 10
    };

    $scope.common = {      //初始化保存参数
        username: '',
        password: ''
    };

    $scope.initPage = function () {
       $scope.query();
    };

    $scope.query = function () {
        $http.post('/backstage/query')
            .success(function (data) {
                $scope.datas = data.list;
                $scope.page = data.page;
                $scope.page.pageSize = $scope.listParams.pageSize;
                $scope.page.currentPage = $scope.listParams.goPage;
            })
            .error(function () {
                console.log('获取失败！');
            })
        ;
    };
    
    $scope.add = function () {
        $('#commonModal').modal({backdrop: 'static', keyboard: false});
        $scope.confirm = '保存';
    };
    
    $scope.amend = function (obj) {
        $('#commonModal').modal({backdrop: 'static', keyboard: false});
        $scope.common.username = obj.username;
        $scope.common.password = obj.password;
        $scope.common.id = obj.id;
        $scope.confirm = '修改';
    };

    $scope.save = function () {
        if ($scope.common.username !== '' && $scope.common.password !== '') {
            if ($scope.confirm == '保存') {
                $http.post('/backstage/add', {params: $scope.common})
                    .success(function () {
                        $scope.closeModal();
                        $scope.query();
                    })
                    .error(function () {
                        console.log('增加失败！');
                    });

            } else if ($scope.confirm == '修改') {
                $http.post('/backstage/amend', {params: $scope.common})
                    .success(function () {
                        $scope.closeModal();
                        $scope.query();
                    })
                    .error(function () {
                        console.log('修改失败！');
                    });
            }
        }
    };
    
    $scope.remove = function (id) {
        if (confirm('确认要删除吗？')) {
            $http.get('/backstage/remove/'+id)
                .success(function () {
                    $scope.query();
                })
                .error(function () {
                    console.log('删除失败！');
                });
        }
    };

    /**
     * 关闭 Modal 并清空 Modal 中的值
     */
    $scope.closeModal = function (){
        $scope.common.username = '';
        $scope.common.password = '';
        $('#commonModal').modal('hide');
    };

}]);