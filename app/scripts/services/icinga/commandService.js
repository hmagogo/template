/**
 * Created by hadoop on 2016/1/20.
 */
app.factory('commandService', ['Restangular', function (Restangular) {
    'use strict';

    return {
        queryCommand : function (params, callback) {
            Restangular.all(reqUrl.get('getCommands')).post(params).then(callback);
        }
    };
}]);