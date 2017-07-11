/**
 * Created by HMX on 2015/8/19.
 */
app.factory('transmitService', ['$http', '$q', function ($http, $q) {
    'use strict';
    return {
        query : function () {
            var deferred = $q.defer();  // 声明延后执行，表示要去监控后面的执行
            $http({method: 'POST', url: '/backstage/export'}).
                success(function(data, status, headers, config) {
                    deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(data);   // 声明执行失败，即服务器返回错误
                });
            return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API
        },
        testIcinga : function () {
            var deferred = $q.defer();
            $http({method: 'POST', url: 'icinga/icingaHost/testIcinga'}).
                success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
    };
}]);