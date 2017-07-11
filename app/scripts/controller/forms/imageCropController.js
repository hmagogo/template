/**
 * Created by HMX on 2015/5/15.
 */
app.controller("imageCropController", ["$scope", function ($scope) {
    "use strict";

    $scope.myImage = "";
    $scope.myCroppedImage = "";
    $scope.cropType = "circle";

    var handleFileSelect = function (event){
        var file = event.currentTarget.files[0]; //获得其监听器触发了事件的那个元素。
        var reader = new FileReader();           //html5 文件读取
        reader.onload = function (event) {
            $scope.$apply(function ($scope) {    // $apply机制，将数据模型的变化在整个应用范围内进行通知
                $scope.myImage = event.target.result; //当前事件目标元素的结果
            });
        };
        reader.readAsDataURL(file);
    }

    angular.element(document.querySelector("#fileInput")).on("change", handleFileSelect);
}]);