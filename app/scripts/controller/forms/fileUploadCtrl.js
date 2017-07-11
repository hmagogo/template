/**
 * Created by HMX on 2015/7/16.
 * 文件上传 控制器
 * http://blog.csdn.net/lai_xu/article/details/49535847
 * ① input类型为file，需要指令：nvFileSelect(选择上传文件)
 */
(function() {
    'use strict';
    angular.module('app').controller('fileUploadCtrl', fileUploadCtrl);
    // 注入
    fileUploadCtrl.$inject = ['$scope', 'FileUploader'];

    function fileUploadCtrl($scope, FileUploader) {
        var _this  = this;
        var uploader = $scope.uploader = new FileUploader({
            // url: '/file/upload'
            url: 'nmcc/thesaurusMnagement/historyUpload'
        });

        // 文件过滤
        uploader.filters.push({
            name: 'customFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // 增加文件后执行
        uploader.onAfterAddingFile = function(fileItem) {
            _this.fileItem = fileItem._file;     //添加文件之后，把文件信息赋给this

            let size       = fileItem._file.size;
            let shardSize  = 5 * 1024 * 1024;               //以 5MB 为一个分片
            let shardCount = Math.ceil(size / shardSize);   //总片数

            for (let i = 0; i < shardCount; ++i) {
                // 计算每一片的起始与结束位置
                let start = i * shardSize,
                    end   = Math.min(size, start + shardSize);

                // 构造一个表单，FormData是HTML5新增的
                let form = new FormData();
                form.append("data", _this.fileItem.slice(start,end));  //slice方法用于切出文件的一部分
                form.append("name", name);
                form.append("total", shardCount);   //总片数
                form.append("index", i + 1);        //当前是第几片

            }

        };

        /**
         * 文件上传之前
         */
        uploader.onBeforeUploadItem = function () {

        };

        // 增加全部文件后执行
//    uploader.onAfterAddingAll = function(addedFileItems) {
//        console.info('onAfterAddingAll', addedFileItems);
//    };

        uploader.onCancelItem = function (fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
    }


})();
