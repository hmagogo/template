/**
 * Created by HMX on 2016/07/27.
 */
app.factory("flexigridService", ["Restangular", function (Restangular) {
    "use strict";
    return {
        query1 : function (callback) {
            Restangular.all(requestUrl.get("jf1")).post().then(callback);
        }
    };
}]);