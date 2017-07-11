/**
 * Created by HMX on 2015/7/6.
 */
'use strict';
app.controller('mainController', ['$scope',
    function ($scope) {

        /**
         * 定义应用配置参数
         * @type {{settings: {headerFixed: boolean, asideFixed: boolean, ...}}}
         */
        $scope.app = {
            settings: {
                headerFixed: true,
                asideFixed: true,
                asideFolded: false
            }
        };

        //弹出框控制器
        $scope.modal = {
            title: "",      //弹出框标题信息
            message: "",    //弹出框信息
            to: "",         //当前要去做的业务
            sureTo: "",     //确定时调用的方法
            set: function (title, message, to, func) {
                this.title = title;
                this.message = message;
                this.to = to;
                this.sureTo = func;
            },
            sure: function () {
                //当点击确定按钮，跳转到指定方法
                if (this.sureTo) {
                    this.sureTo();
                }
            }
        };

        (function () {
            // 在窗口（屏幕）或浏览器发生改变或调整大小时触发
            window.onresize = function () {
                let clientWidth = document.body.clientWidth,    // 获取浏览器可见区域宽
                    clientHeight = document.body.clientHeight;  // 获取浏览器可见区域高
                // console.log(clientWidth + '   ' + clientHeight);
            }
        })();

    }
]);
