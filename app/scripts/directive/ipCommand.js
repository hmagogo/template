/**
 * Created by huangminxuan on 2015/4/27.
 */
app.directive("ipCommand", function () {
    "use strict";
    return {
        restrict: "E",
        replace: true,       //替换指令所在的元素
        templateUrl: "views/model/ipTemplate.html",
        controller: function ($scope) {
            /**
             * 按键按下时  阻止非数字的输入
             * @param event  当前事件
             */
            $scope.keyDownEvent = function (event) {
                var code = event.keyCode;       //获取键盘的编号
                var next = angular.element(event.target).next(); //得到下一个节点；
                //阻止非数字输入
                if (!((code >= 48 && code <= 57) || (code >= 96 && code <= 105) || code == 190 || code == 110 || code == 13 ||
                    code == 9 || code == 39 || code == 8 || code == 46 || code == 99 || code == 37)) {
                    event.originalEvent.returnValue = false;
                    event.preventDefault();
                }
                //判断 Enter键 和 .符号键，然后获取下一个节点的焦点
                if (code == 13 || code == 110 || code == 190) {
                    event.originalEvent.returnValue = false;
                    event.preventDefault();
                    next.focus();
                }
            };
            /**
             * 按键按起时  进行验证当前输入的值
             * @param event 当前事件
             */
            $scope.keyUpEvent = function (event) {
                var ipReg = /^(0{1,2}\d{1,2})$/;
                var code = event.keyCode;       //获取键盘的编号
                var currentObj = angular.element(event.target);
                var currentVal = currentObj.val();
                // 阻止 0开头的数字。如：01,00
                if (ipReg.test(currentVal)) {
                    currentObj.val(parseInt(currentVal, 10));
                }
                if (currentVal > 255) {
                    currentObj.val(255);
                    return;
                }
                //Left Arrow,Right Arrow,Shift,Tab,Enter
                if (currentVal.length >= 3 && code != 37 && code != 39 && code != 16 && code != 9 && code != 13) {
                    currentObj.next().focus();
                }
            };
            /**
             * 获取IP值   返回数组类型
             */
            $scope.getIpValue = function () {
                var childrens = $(".IPDiv").children();
                var ipVal = "";
                for (var i = 0; i < childrens.size(); i++) {
                    var events = angular.element(childrens[i]);
                    if (i == 3 || i == 7 || i == 11 || i == 15) {
                        ipVal += events.val() +  ";";
                    } else {
                        ipVal += events.val() +  ".";
                    }
                }
                return ipVal.split(";");
            };
            /**
             * 清空IP的值
             */
            $scope.clearIpValue = function () {
                var childrens = $(".IPDiv").children();
                for (var i = 0; i < childrens.size(); i++) {
                    angular.element(childrens[i]).val("");
                }
            };

            // 输入框得到焦点时，触发Div的样式
            $(".IPInput").on("focus", function (event) {
                angular.element(event.target).parent().addClass("IPDivBorder");
            });
            // 输入框失去焦点时，删掉Div的样式
            $(".IPInput").on("blur", function (event) {
                angular.element(event.target).parent().removeClass("IPDivBorder");
            });
        }
    };
});