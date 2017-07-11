/**
 * Created by HMX on 2015/9/6.
 */

(function () {
    'use strict';
    angular.module('app').controller('selectCtrl', selectCtrl);
    angular.module('app').filter('propsFilter', propsFilter);

    // 注入
    selectCtrl.$inject = ['$scope', '$http'];

    function selectCtrl($scope, $http) {
        var _this = this;
        _this.storage = {};

        // $scope.disabled = undefined;
        // /** 使用 **/
        // $scope.enable = function() {
        //     $scope.disabled = false;
        // };
        // /** 禁用 **/
        // $scope.disable = function() {
        //     $scope.disabled = true;
        // };
        //
        // $scope.multipleSelect = '';      // 定义多重选择 ng-model 的值
        // $scope.person = {};              // 定义 repeat 中循环得出的结果
        //
        // /**
        //  * 分组   [以people数据中的name首字母，即0为目标进行作判断]
        //  * @param item  [repeat中的people数据]
        //  */
        // $scope.someGroup = function (item) {
        //     if (item.name[0 ] >= 'A' && item.name[0] <= 'M') {
        //         return 'From name: A - M';
        //     }
        //     if (item.name[0] >= 'N' && item.name[0] <= 'Z') {
        //         return 'From name: N - Z';
        //     }
        // };
        //
        // $scope.people = [
        //     { name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
        //     { name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
        //     { name: 'Estefania', email: 'estefania@email.com', age: 21, country: 'Argentina' },
        //     { name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' },
        //     { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30, country: 'Ecuador' },
        //     { name: 'Samantha',  email: 'samantha@email.com',  age: 30, country: 'United States' },
        //     { name: 'Nicole',    email: 'nicole@email.com',    age: 43, country: 'Colombia' },
        //     { name: 'Natasha',   email: 'natasha@email.com',   age: 54, country: 'Ecuador' },
        //     { name: 'Michael',   email: 'michael@email.com',   age: 15, country: 'Colombia' },
        //     { name: 'Nicolas',   email: 'nicolas@email.com',    age: 43, country: 'Colombia' }
        // ];

        /**
         * 获取下框中的值
         * @param val
         */
        _this.selectFun = function (val) {
            console.log(val);
        };

        // 第一行 单选、单选组 的数据获取
        $http.get('staticData/select/other.json').success(function (data) {
            // singleSelect Data
            _this.Australian = data.Australian;

            // singleWithGroup Data
            _this.storage.singleWithGroup = '深圳';
            _this.cities = data.cities;
        });

        // 省-市-区 联动 数据获取
        $http.get('staticData/select/region.json').success(function (data) {
            _this.china = {
                province: null,
                city: null,
                district: null
            };
            _this.region = data;
        });

    }

    /**
     *  该过滤器作用：跟据 name 和 age 进行筛选出指定的数据返回下拉框
     *  如：propsFilter: {name: 'Adam', age: '21'} 观察下拉框中的内容
     */
    function propsFilter() {
        return function (items, props) {
            var out = [];
            if (angular.isArray(items)) {
                items.forEach(function (item) {
                    var itemMatches = false;
                    var keys = Object.keys(props);   // 得到props的键，以数组返回
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toString().toLowerCase();  // 得到props中的键对应的值，以小写形式返回
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }
                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                out = items;
            }
            return out;
        };
    }

})();
