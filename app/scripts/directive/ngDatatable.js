/**
 * Created by HMX on 2016/7/30.
 */
(function () {
    'use strict';
    angular.module('app').directive('ngDatatable', ngDatatable);

    function ngDatatable() {
        return {
            restrict: "A",
            link: function ($scope, $elem, attrs) {
                var options = {};

                // Start with the defaults. Change this to your defaults.
                options = {};

                // If dtOptions is defined in the controller, extend our default option.
                if (typeof $scope.dtOptions !== 'undefined') {
                    angular.extend(options, $scope.dtOptions);
                }

                // If dtoptions is undefined, check the other options
                if (attrs['dtoptions'] === undefined) {
                    // 得到的属性, 把它放在一个选项
                    // 这时需要做一个开关 /case because attributes does not retain case
                    // and datatables options are case sensitive. Damn. It's okay! We need to detect
                    // the callbacks anyway and call it as functions, so it works out!
                    // I put what I needed, most of my settings are not dynamics except those 2.
                    for (a in attrs) {
                        switch (a) {
                            // This is the ajax source
                            case 'sajaxsource':
                                options['sAjaxSource'] = attrs[a];
                                break;
                            // This is the ajax data prop. For example, your result might be
                            // {code: 200, data: [ .. ]} -> in the case, sAjaxDataProp is data
                            case 'sajaxdataprop':
                                options['sAjaxDataProp'] = attrs[a];
                                break;
                        }
                    }
                } else {
                    // If dtoptions is declare, extend the current options with it.
                    angular.extend(options, $scope.dtOptions);
                }

                // Just some basic validation.
                if (typeof options['sAjaxSource'] === 'undefined') {
                    throw "Ajax Source not defined! Use sajaxsource='/api/v1/blabla'";
                }

                // for Angular http inceptors
                if (typeof options['fnServerData'] === 'undefined') {
                    options['fnServerData'] = function (sSource, aoData, resultCb) {
                        $http.get(sSource, aoData).then(function (result) {
                            resultCb(result.data);
                        });
                    };
                }

                // Get the column options, put it in a aocolumn object.
                // Obviously, mdata is the only one required.
                // I personally just needed those 3, if you need other more feel free to add it.
                // mData also accepts a function; I'm sure there's a more elegant way but for now
                // it detects if it's a function, and if it is, do it.
                options.aoColumns = [];

                // Get the thead rows.
                $elem.find('thead th').each(function() {
                    var colattr = angular.element(this).data();

                    //console.log(colattr);
                    //console.log('demodeo');
                    // Detects if it's a function. Must exist in scope.
                    if (colattr.mdata.indexOf("()") > 1) {
                        // Simple one-liner that removes the ending ()
                        var fn = $scope[colattr.mdata.substring(0, colattr.mdata.length - 2)];
                        // Throw an error if it's not a function.
                        if (typeof fn === 'function') {
                            options.aoColumns.push({
                                mData: fn,
                                sClass: colattr.sclass,
                                bVisible: colattr.bvisible,
                                mRender: colattr.mrender
                            });
                        } else {
                            throw "mData function does not exist in $scope.";
                        }
                    } else {
                        //console.log('<1?');
                        options.aoColumns.push({
                            mData: colattr.mdata,
                            sClass: colattr.sclass,
                            bVisible: colattr.bvisible,
                            mRender: colattr.mrender
                        });
                    }
                });

                // Load the datatable!
                $elem.dataTable(options);
                //console.log(options);
            }
        };
    }
})();
app.directive("ngDatatable", [, function () {
    "use strict";
    
}]);
