/**
 * Created by HMX on 2015/5/20.
 */
app.controller('validationCtrl', function ($scope, $timeout) {
    'use strict';

    /**
     * 此表达式最重要的是要维护后缀列表，对于普通用户来说，修改为常用的邮箱后缀(cn|com|net)
     * 即可也可以防止部分垃圾邮件，当需要扩大范围时增加邮箱后缀。
     * @type {RegExp}  邮箱正规表达式
     */
    $scope.emailRegular = new RegExp("[_a-z\\d\\-\\./]+@[_a-z\\d\\-]+(\\.[_a-z\\d\\-]+)*" +
        "(\\.(info|biz|com|edu|gov|net|am|bz|cn|cx|hk|jp|tw|vc|vn))$");

    $scope.openAlert = function (event) {
        var _this = angular.element(event.target);
        _this.parent().append('<div class="alert alert-success" style="position:fixed; top:53px; left:50%;" role="alert">cc</div>');
        $timeout(function () {
            _this.parent().find('.alert').remove();
        }, 2000, false);
    };

    /**
     * 是否确认
     */
    $scope.isConfirm = function () {
        $scope.modal.set('确定框', '是否确认？<br/>注意：此操作不可回退', null, $scope.confirm);
        $('#confirmModal').modal('show');
    };
    $scope.confirm = function () {
        $('#confirmModal').modal('hide');
        console.log('.../ confirm')
    };

    $scope.register = {};
    $scope.registerForm = function (registers) {
        console.log(registers);
    };

    $scope.contact = {};
    /**
     * 验证码检查的方法
     * @param val 验证码
     */
    $scope.verification = function (val) {
        var index = ['PEHV', 'pehv'].indexOf(val);
        if (index > 0) {
            return true;
        } else {
            return false;
        }
    };

    $scope.selectDate = {
        group: 'Alaskan/Hawaiian Time Zone',
        key: 'AK',
        value: 'Alaska'
    };
});
