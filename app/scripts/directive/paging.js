/**
 * Created by huangminxuan on 2015/4/20.
 */
app.directive('page', function () {
    'use strict';
    return {
        restrict: 'E',
        scope: {
            totalCount: '=',
            pageCount: '=',          //每页展示的记录数
            currentPage: '=',        //当前页
            selectSize: '&',
            goPage: '&',
            showMaxPage: '@',        //显示最大页数
            firstText: '@',
            lastText: '@',
            previousText: '@',
            nextText: '@',
            GO: '@'
        },
        replace: true,
        templateUrl: 'views/model/paging.html',
        controller: function ($scope, $attrs, $parse) {
            var self = this;

            //获得每页展示多少条记录，并求得页数
            this.init = function (defaultItemsPerPage) {
                if ($attrs.pageCount) {
                    $scope.$parent.$watch($parse($attrs.pageCount), function (value) {
                        self.pageCount = parseInt(value, 10);
                        $scope.totalPage = self.calculateTotalPages();
                    });
                } else {
                    this.pageCount = defaultItemsPerPage;
                }
            };

            //计算页数  --总记录数/每页的记录数，然后向上取整。
            this.calculateTotalPages = function () {
                return Math.ceil($scope.totalCount / $scope.pageCount);
            };

            //监控记录数，如不到回填PAGESIZE值
            $scope.$watch('pageCount', function (value) {
                $scope.selectCount = value;
            });

            //监控总记录条数是否发生变化，如改变，需要重新计算页数
            $scope.$watch('totalCount', function () {
                $scope.totalPage = self.calculateTotalPages();
                if ($scope.totalPage === undefined || isNaN($scope.totalPage)) {
                    $scope.totalPage = 1;
                }
            });

            //监控总页数，调整展示页码
            $scope.$watch('totalPage', function () {
                $scope.pages = self.getPages($scope.totalPage, $scope.currentPage);
            });

            //跳转到某一页
            $scope.setCurrentPage = function (pageno) {
                if (pageno == '...' || pageno === '' || pageno === 0) {
                    return;
                } else if (pageno > $scope.totalPage) {
                    pageno = $scope.totalPage;
                }

                $scope.goPage({currentPage: pageno, pageCount: this.pageCount});
                if (pageno != $scope.GO) {
                    $scope.GO = '';
                }
            };

            //监控跳转的页数只能为数字
            $scope.$watch('GO', function () {
                var re = /[^\d]/g;
                if ($scope.GO !== '' && !re.test($scope.GO) && $scope.GO > 0) {
                    $scope.pages = self.getPages($scope.totalPage, $scope.currentPage);
                } else {
                    $scope.GO = '';
                }
            });

            //监控当前页，然后调整展示页码
            $scope.$watch('currentPage', function () {
                $scope.pages = self.getPages($scope.totalPage, $scope.currentPage);
                // 更改分页中首页、上页、下页和尾页 是否可用状态
                if ($scope.currentPage == 1 && $scope.currentPage == $scope.totalPage) {
                    $scope.pageHome = 'disabled';
                    $scope.pagePrevious = 'disabled';
                    $scope.pageNext = 'disabled';
                    $scope.pageTrailer = 'disabled';
                } else if ($scope.currentPage == 1 && $scope.currentPage !== $scope.totalPage) {
                    $scope.pageHome = 'disabled';
                    $scope.pagePrevious = 'disabled';
                    $scope.pageNext = '';
                    $scope.pageTrailer = '';
                } else if ($scope.currentPage == $scope.totalPage && $scope.currentPage !== 1) {
                    $scope.pageHome = '';
                    $scope.pagePrevious = '';
                    $scope.pageNext = 'disabled';
                    $scope.pageTrailer = 'disabled';
                } else {
                    $scope.pageHome = '';
                    $scope.pagePrevious = '';
                    $scope.pageNext = '';
                    $scope.pageTrailer = '';
                }
            });

        },
        link: function (scope, element, attrs, ctrl) {

            //根据总页数，当前页，以及页面展示最大数目，来取得展示情况
            // 1、总页数为0：展示第一页
            // 2、总页数<展示最大数目：展示全部
            // 3、当前页到末页<展示最大数据： 展示后6页
            // 4、首页与第二页: 展示前三页+'...'+后两页
            // 5、保持当前页在第二个页码列中。
            ctrl.getPages = function (totalPage, currentPage) {
                var pages = [];
                currentPage = parseInt(currentPage, 10);
                totalPage = parseInt(totalPage, 10);
                if (totalPage === 0) {
                    pages.push(1);
                } else if (totalPage <= attrs.showMaxPage) {
                    for (var i = 1; i <= totalPage; i++) {
                        pages.push(i);
                    }
                } else if (totalPage - currentPage < attrs.showMaxPage) {
                    if (currentPage < 5) {
                        for (var j = 1; j <= attrs.showMaxPage; j++) {
                            pages.push(j);
                        }
                    } else {

                        if (totalPage - currentPage < 5) {
                            for (var u = 0; u < 5; u++) {
                                if (currentPage == (totalPage - u)) {
                                    for (var p = attrs.showMaxPage - (u + 1); p >= 0 ; p--) {
                                        pages.push(currentPage - p);
                                    }
                                    for (var e = 1; e <= u ; e++) {
                                        pages.push(currentPage + e);
                                    }
                                }
                            }
                        } else {
                            pages.push(currentPage - 4, currentPage - 3, currentPage - 2, currentPage - 1);
                            pages.push(currentPage);
                            pages.push(currentPage + 1, currentPage + 2, currentPage + 3, currentPage + 4);
                        }

                    }
                } else if (totalPage > attrs.showMaxPage && (currentPage - 4) < 1) {
                    for (var k = 1; k <= attrs.showMaxPage; k++) {
                        pages.push(k);
                    }
//                    pages.push('...');
//                    for (var l = totalPage - 1; l <= totalPage; l++) {
//                        pages.push(l);
//                    }
                } else if (totalPage > attrs.showMaxPage && (currentPage - 4) > 0) {
//                    pages.push(1,2);
//                    pages.push('...');
                    for (var m = currentPage - 4; m <= currentPage + 4; m++) {
                        pages.push(m);
                    }
//                    pages.push('....');
//                    pages.push(totalPage);
                }
                return pages;
            };
        }
    };
});