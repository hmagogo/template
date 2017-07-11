/**
 * Created by HMX on 2016/7/30.
 */
app.controller('dataTablesCtrl', ['$scope', function ($scope) {
    'use strict';

    $scope.dtOptions = {
        "bProcessing": true,
        "bServerSide": true,
        iDisplayLength: 5,
        sAjaxSource: 'http://10.188.192.200:8080/employee/page?deptId=' + data,
        sAjaxDataProp: 'aaData',
        "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
        sPaginationType: "full_numbers",
        "aoColumns": [
            {"mData": "employeeId"},
            {
                "mData": "employeeName",
                "sClass": "center",
                "mRender": function (data, type, full) {
                    return '<a class="emplyeeInfoLink" href="javascript:;">哈哈哈哈</a>';
                }
            },
            {"mData": "employeeEmail"},
            {"mData": "employeeMobilePhoneMaster"}
        ],
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            oSettings.jqXHR = $.ajax({
                "url": sUrl,
                beforeSend: function(xhr) {
                    xhr.withCredentials = true;
                },
                "data": aoData,
                "type": 'get',
                "success": fnCallback,
                "cache": false
            });
        }
    }
}]);
