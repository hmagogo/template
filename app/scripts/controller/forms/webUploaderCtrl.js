/**
 * Created by huangminxuan on 2017/1/17.
 */
(function () {
    'use strict';
    angular.module('app').controller('webUploaderCtrl', webUploaderCtrl);
    // 注入
    webUploaderCtrl.$inject = ['$scope'];

    function webUploaderCtrl($scope) {
        var _this = this;

        (function () {
            let uploader = WebUploader.create({
                // 文件接收服务端。
                server: 'nmcc/thesaurusMnagement/historyUpload',
                // server: '/file/shardUpload',
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#picker',
                // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                resize: false
            });

            let state = 'pending',
                ctlBtn = $('#ctlBtn');

            uploader.on( 'all', function( type ) {
                if ( type === 'startUpload' ) {
                    state = 'uploading';
                } else if ( type === 'stopUpload' ) {
                    state = 'paused';
                } else if ( type === 'uploadFinished' ) {
                    state = 'done';
                }

                if ( state === 'uploading' ) {
                    ctlBtn.text('暂停上传');
                } else {
                    ctlBtn.text('开始上传');
                }
            });

            // 当有文件被添加进队列的时候
            uploader.on( 'fileQueued', function( file ) {
                // console.log(file)
            });

            // 上传同意
            uploader.on( 'uploadAccept', function( file ) {
                console.log('-----  上传')
            });

            uploader.on( 'uploadSuccess', function( file ) {
                console.log('上传成功')
            });

            uploader.on( 'uploadError', function( file ) {
                console.log('上传失败')
            });

            ctlBtn.on( 'click', function() {
                if ( state === 'uploading' ) {
                    uploader.stop();
                } else {
                    uploader.upload();
                }
            });
        })();

        (function () {
            let state = 'pending',
                uploadSpace = 2 * 1024 * 1024 * 1024,  //假设服务器上传空间容量 2G
                ctlBtn = $('#ctlBtnModal'),
                webuploaderTr = $('#webuploaderTr');

            _this.waitFiles = [];

            let uploaderBox = WebUploader.create({
                server: '/file/shardUpload',
                // formData: {
                //     'param1': 'a',
                //     'param2': 'b'
                // },
                // swf : '/web/public/Uploader.swf',
                chunked : true,     // 是否分片
                // duplicate : true,   // 去重， 根据文件名字、文件大小和最后修改时间来生成hash Key.
                // chunkSize : 2 * 1024 * 1024,              // 分片大小， 2M (默认值是5M，这里可以不用填上)
                // fileSingleSizeLimit : 10 * 1024 * 1024,   //文件大小限制
                // 只允许选择图片文件。 注意：其他文件添加无效
                // accept: {
                //     title: 'Images',
                //     extensions: 'gif,jpg,jpeg,bmp,png',
                //     mimeTypes: 'image/jpg,image/jpeg,image/png'
                // },
                // threads: 1,
                resize : false     // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
            });

            // 在点击弹出模态框的时，添加上传按钮，解决点击上传无反应问题
            $("#uploaderModal").on("shown.bs.modal",function(){
                _this.uploadSpaceErr = '';
                uploaderBox.addButton({
                    id: '#pickerModal',
                    innerHTML: '选择文件'
                });
            });


            uploaderBox.on('all', function( type ) {
                if ( type === 'startUpload' ) {
                    state = 'uploading';
                } else if ( type === 'stopUpload' ) {
                    state = 'paused';
                } else if ( type === 'uploadFinished' ) {
                    state = 'done';
                }

                if ( state === 'uploading' ) {
                    ctlBtn.text('暂停上传');
                } else {
                    ctlBtn.text('开始上传');
                }
            });

            // 当文件被加入队列之前触发，此事件的 handler返回值为false，则此文件不会被添加进入队列。
            uploaderBox.on( 'beforeFileQueued', function( file ) {
                if (uploadSpace > file.size) {
                    uploadSpace = uploadSpace - file.size;
                } else {
                    _this.uploadSpaceErr = '上传文件大于服务器可用空间，剩余空间：' +
                        parseInt(uploadSpace / 1024 / 1024) + 'MB';
                    $scope.$apply();
                    return false;
                }
            });

            // 当文件被加入队列以后触发
            uploaderBox.on( 'fileQueued', function( file ) {
                let waitFile = new Object();
                waitFile.id = file.id;
                waitFile.name = file.name;
                waitFile.size = file.size;
                waitFile.progress = 0;

                _this.waitFiles.push(waitFile);
                $scope.$apply();        //注意：push数据上去，页面没刷新，这时需要手动刷新
            });

            // 文件上传过程中创建进度条实时显示
            uploaderBox.on('uploadProgress', function (file, percentage) {
                let $percent = $('#' + file.id),
                    percentNum = percentage * 100;
                $percent.css( 'width', percentNum + '%' );
            });

            //成功后删除列表中的信息
            uploaderBox.on( 'uploadFinished', function() {
                removeWaitInfo();
            });

            $("#uploaderModal").on("hide.bs.modal", function () {
                $scope.$apply();
            });

            // 删除等待上传的文件操作
            _this.delWaitFile = function (fileid) {
                //根据文件ID进行删除
                if (uploaderBox.getFile(fileid) != undefined) {
                    uploaderBox.removeFile(uploaderBox.getFile(fileid));
                }
                removeWaitInfo(fileid);
            };

            // 删除等待上传文件信息
            function removeWaitInfo(fileId) {
                let wait = _this.waitFiles;

                if (fileId == undefined || fileId == null || fileId == '') {
                    _this.waitFiles = [];
                    return;
                }

                for (let i = 0; i < wait.length; i++) {
                    for (let k in wait[i]) {
                        if (wait[i].id === fileId) {
                            wait.splice(i, 1);
                            return;
                        }
                    }
                }
            }

            ctlBtn.on( 'click', function() {
                if ( state === 'uploading' ) {
                    uploaderBox.stop();
                } else {
                    uploaderBox.upload();
                }
            });
        })();

    }

})();
