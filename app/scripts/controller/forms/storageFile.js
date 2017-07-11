/**
 * Created by huangminxuan on 2017/2/22.
 */
(function () {
    'use strict';
    angular.module('app').controller('storageFile', storageFile);
    // 注入
    storageFile.$inject = ['$scope', '$http'];

    function storageFile($scope, $http) {
        var _this = this;

        (function () {
            $http.get('/getStorageFile')
                .success(function (data) {
                    _this.serverFiles = data;
                })
                .error(function () {
                    console.log('获取 /echart/area 失败！');
                });
        })();

        /**
         * 下载服务器上的文件
         */
        _this.fileDownload = function () {
            $http.get('/downloadStorageFile')
                .success(function (data) {
                    console.log('................../ downloadStorageFile');
                    console.log(data)
                    window.location.href = data;
                })
                .error(function () {
                    console.log('下载文件失败！');
                });
        };
    }

})();
