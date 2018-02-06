/**
 * template 本项目中没有使用此文件
 */
;
(function () {
    'use strict';
    angular.module('controllers.businessVolume')
        .controller('busDataUploadCtrl', busDataUploadCtrl);

    function busDataUploadCtrl($scope, busDataUploadServer, $http, $state, $stateParams) {
        $scope.templateId = {
            templateId: 2
        }
        $scope.init = function () {
            //if ($stateParams.flowId === '') {
            busDataUploadServer.initUpload($scope.templateId, function (res) {
                if (res.success === true) {
                    $scope.flowId = res.data.flowId;
                }
            });

            // }else{
            // $scope.flowId = $stateParams.flowId;
            // }
            console.log($scope.flowId)

        }

//文件上传
        $scope.save = function (flowId) {
            $scope.submit(flowId, $scope.file);
        }
        $scope.submit = function (flowId, file) {
            var fd = new FormData();
            var file = document.querySelector('input[type=file]').files[0];
            fd.append('filename', file);
            fd.append('flowId', flowId);
            $http({
                method: 'POST',
                url: "/nssa/businessDataAnalyze/dataUpload",
                data: fd,
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity,
                uploadEventHandlers: {
                    progress: function (e) {
                        $("#progress").show(); //显示进度条
                        $("#shade-two").show(); //蒙罩
                        var objTip = document.getElementById('pTip');
                        var total = e.total; //总大小
                        var loaded = e.loaded; //已经上传大小情况
                        if (total == loaded) {
                            objTip.innerHTML = "上传完成";
                            $("#progress").hide();
                            $("#shade-two").hide();
                        } else {
                            var percentage = Math.floor(loaded / total * 100);
                            $("#proDownFile").val(percentage);
                            objTip.innerHTML = "已上传" + percentage + "%";
                        }
                    }
                },
            })
                .success(function (response) {
                    //上传成功的操作
                    $state.go('nssa.businessVolume.fieldAnalysis', {
                        flowId: flowId
                    });
                });
        }


        $("#shade-two").hide();
        /* 文件上传 */
        $(function () {
            $("input[type=file]").change(function () {
                $(this).parents(".uploader").find(".filename").val($(this).val());
            });
            $("input[type=file]").each(function () {
                if ($(this).val() == "") {
                    $(this).parents(".uploader").find(".filename").val("请选择文件");
                }
            });

        })
    }
})();
