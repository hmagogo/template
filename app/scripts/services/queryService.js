/**
 * Created by HMX on 2015/7/14.
 */
app.factory("queryService", ["Restangular", function (Restangular) {
    "use strict";
    return {
        query : function (params, callback) {
            Restangular.all(reqUrl.get("query")).post(params).then(callback);
        }
    };
}]);