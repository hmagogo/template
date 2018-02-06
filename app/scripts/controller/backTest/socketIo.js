/**
 * Created by HMX on 2015/8/30.
 */
!(function (Angular, socketController) {
    socketController.$inject = ['$scope', '$compile'];
    Angular.module('app').controller('socketController', socketController);
}(angular, function ($scope, $compile) {
    'use strict';
    var _this = this, ws = null;

    // 判断浏览器是否支持 WebSocket
    if ("WebSocket" in window) {
        // 建立websocket连接
        ws = new WebSocket("ws://localhost:3001/chatPush");
        // ws.onopen = function () {
        //     console.log(textarea)
        //     ws.send(textarea);
        // };

        ws.onmessage = function (event) {
            console.log(event.data)
        }
    }

}));

// app.controller("socketController", ["$scope", "$compile", function ($scope, $compile) {
//     $scope.textareaA = null;
//     $scope.textareaB = null;
//     var ws = null;
//
//     $scope.pushA = function () {
//         if ($scope.textareaA !== null) {
//             webSocketLink($scope.textareaA);
//             $scope.textareaA = null;
//         }
//     };
//
//     $scope.pushB = function () {
//         if ($scope.textareaB !== null) {
//             webSocketLink($scope.textareaB);
//             $scope.textareaB = null;
//         }
//     };
//
//     function webSocketLink(textarea) {
//
//         if () {
//
//
//             ws.onclose = function() {
//                 // 关闭 websocket
//             };
//         } else {
//             // 浏览器不支持 WebSocket
//             alert("您的浏览器不支持 WebSocket!");
//         }
//     }
//
//     // // 监听message事件，打印消息信息
//     // socket.on("message", function (response) {
//     //     var panelBody = $("#panelBody");
//     //     var text = "<p style='text-align:right;margin-bottom:20px;'><span style='padding:7px 15px;border-radius:7px;background-color:"+response.color+";'>"+response.text+"</span></p>";
//     //     panelBody.append(text);
//     //
//     //     //判断聊天的内容是否高过固定窗口的高度，如高过固定大小出现滚动条，则跟着文字向下滚动
//     //     var divHeight = panelBody.height();
//     //     var contentHeight = panelBody.children().length * 40;
//     //     if (divHeight < contentHeight) {
//     //         var gap = contentHeight - divHeight;
//     //         panelBody.scrollTop(gap);
//     //     }
//     //
//     // });
//
//       $scope.minimize = function () {
//         var oPanel = $("#oPanel");
//         oPanel.addClass("hide");
//         var text = $compile("<button id='open1' ng-click='openDiv()'>open</button>")($scope); //动态添加元素需要手动进行angular编译
//         oPanel.parent().append(text);
//     };
//
//     $scope.openDiv = function () {
//         $("#oPanel").removeClass("hide");
//         $("#open1").remove();
//     };
// }]);
