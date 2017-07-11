/**
 * Created by HMX on 2015/8/19.
 */
app.controller('transmitController', ['$scope', '$interval', 'transmitService', function($scope, $interval, transmitService) {
    'use strict';

    $scope.dataArea = '';

    $scope.export = function() {
        var promise = transmitService.query(); // 同步调用，获得承诺接口
        promise.then(function(data) { // 调用承诺API获取数据 .resolve
            var ary = data.list.split(';'),
                c = 0;
            $interval(function() {
                $('textarea').select(); // 选择后再插入文本
                var rn = ary[c] + '\n';
                $scope.dataArea += rn;
                c++;
            }, 100, ary.length);
        }, function(data) { // 处理错误 .reject
            console.log('获取数据失败！');
        });
    };

    $scope.testIcinga = function() {
        transmitService.testIcinga();
    };

}]);