/**
 * Created by HMX on 2016/08/23.
 */

(function () {
	'use strict';
    angular.module('app').controller('echartsCtrl', echartsCtrl);

    echartsCtrl.$inject = ['$scope', '$http'];

    function echartsCtrl($scope, $http) {
        // 简单的环形 图表
        (function () {
            var ringSimple = echarts.init(document.getElementById('ringSimple'));
            ringSimple.setOption(getEchartCapacityPieOption(60, 40, ['85%', '98%']));
        })();

        (function () {
            var ringInside = echarts.init(document.getElementById('ringInside'));
            ringInside.setOption(getEchartCapacityRingOption(60, 40, ['85%', '98%']));
        })();

        // 简单的饼 图表
        (function () {
            var pieSimple = echarts.init(document.getElementById('pieSimple'));
            pieSimple.setOption(getEchartCapacityPieOption(30, 70, '98%'));
        })();

        // 面积图表
        // (function () {
        //     $http.get('/echart/area')
        //         .success(function (datas) {
        //             manageLineData(datas);
        //         })
        //         .error(function () {
        //             console.log('获取 /echart/area 失败！');
        //         });
        //     // var area = echarts.init(document.getElementById('area'));
        //     // area.setOption();
        // })();

        // 玫瑰图
        (function () {
            var roseSimple = echarts.init(document.getElementById('rose'));
            roseSimple.setOption(getEchartCapacityRoseOption(30, 70, '98%'));
        })();

        /**
         * 处理 线型图数据
         */
        function manageLineData(datas) {
            if (datas.success) {
                var pointDatas = datas.data.datapoints,
                    points = [],
                    value = [],
                    tow = [];
                for (var i = 0; i < pointDatas.length; i++) {
                    points.push(pointDatas[i][0]);

                    if (pointDatas[i][1] === null || pointDatas[i][1] === undefined) {
                        if (i > 0 && pointDatas[i - 1][1] !== null && pointDatas[i - 1][1] !== undefined) {
                            value.push(pointDatas[i - 1][1].toFixed(2));
                        } else {
                            value.push(0);
                        }
                    }
                }
            }
        }
    }

    /**
     * 获取容量圆饼的选项
     * @param usedVal       使用值
     * @param freeVal       空闲值
     * @param radiusVal     半径值 (可决定 环、饼)
     */
    function getEchartCapacityPieOption(usedVal, freeVal, radiusVal) {
        var labelFromatter = {
            normal: {
                label: {
                    formatter: function(params) {
                        return 100 - params.value + '%'
                    },
                    textStyle: {
                        baseline: 'top'
                    }
                }
            },
            emphasis: {
                label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                        fontSize: '16',
                        fontWeight: 'bold'
                    }
                }
            }
        };
        var usedSpace = {
            normal: {
                color: '#1D95D4',
                label: {
                    show: false,
                    position: 'center',
                    formatter: '{b}',
                    textStyle: {
                        baseline: 'bottom'
                    }
                },
                labelLine: {
                    show: false
                }
            }
        };
        var freeSpace = {
            normal: {
                color: '#DAE3E8',
                label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                        color: '#353535'
                    }
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                color: '#ccc',
                borderWidth: 0
            }
        };

        var option = {
            calculable: false,
            toolbox: {
                show: false,
                feature: {
                    dataView: {
                        show: false,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: 'pie',
                        option: {
                            funnel: {
                                width: '100%',
                                height: '100%',
                                itemStyle: {
                                    normal: {
                                        label: {
                                            formatter: function(params) {
                                                return 'other\n' + params.value + '%\n';
                                            },
                                            textStyle: {
                                                baseline: 'middle'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            series: [{
                type: 'pie',
                center: ['50%', '50%'],
                radius: radiusVal,
                x: '0%', // for funnel
                itemStyle: labelFromatter,
                data: [{
                    name: 'used',
                    value: usedVal,
                    itemStyle: usedSpace
                }, {
                    name: 'free',
                    value: freeVal,
                    itemStyle: freeSpace
                }]
            }]
        };

        return option;
    }

    function getEchartCapacityRingOption(usedVal, freeVal, radiusVal) {
        var dataStyle = {
            normal: {
                label: {show:false},
                labelLine: {show:false}
            }
        };
        var placeHolderStyle = {
            normal : {
                color: 'rgba(0,0,0,0)',
                label: {show:false},
                labelLine: {show:false}
            },
            emphasis : {
                color: 'rgba(0,0,0,0)'
            }
        };
        var option = {
            color:['#E9F5FA', '#BBE0F1', '#39B3EF'],
            series : [
                {
                    name:'1',
                    type:'pie',
                    clockWise:true,
                    radius : [65, 75],
                    itemStyle : dataStyle,
                    data:[
                        {
                            value:100,
                            name:'68%的人表示过的不错'
                        },
                        {
                            value:0,
                            name:'invisible',
                            itemStyle : placeHolderStyle
                        }
                    ]
                },
                {
                    name:'2',
                    type:'pie',
                    clockWise:true,
                    radius : [55, 65],
                    itemStyle : dataStyle,
                    data:[
                        {
                            value:90, 
                            name:'29%的人表示生活压力很大'
                        },
                        {
                            value:10,
                            name:'invisible',
                            itemStyle : placeHolderStyle
                        }
                    ]
                },
                {
                    name:'3',
                    type:'pie',
                    clockWise:true,
                    radius : [45, 55],
                    itemStyle : dataStyle,
                    data:[
                        {
                            value:75, 
                            name:''
                        },
                        {
                            value:25,
                            name:'invisible',
                            itemStyle : placeHolderStyle
                        }
                    ]
                }
            ]
        };

        return option;
    }

    function getEchartCapacityRoseOption(usedVal, freeVal, radiusVal) {
        var labelFromatter = {
            normal: {
                label: {
                    formatter: function(params) {
                        return 100 - params.value + '%'
                    },
                    textStyle: {
                        baseline: 'top'
                    }
                }
            },
            emphasis: {
                label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                        fontSize: '16',
                        fontWeight: 'bold'
                    }
                }
            }
        };
        var usedSpace = {
            normal: {
                color: '#1D95D4',
                label: {
                    show: false,
                    position: 'center',
                    formatter: '{b}',
                    textStyle: {
                        baseline: 'bottom'
                    }
                },
                labelLine: {
                    show: false
                }
            }
        };
        var freeSpace = {
            normal: {
                color: '#DAE3E8',
                label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                        color: '#353535'
                    }
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                color: '#ccc',
                borderWidth: 0
            }
        };

        var option = {
            color:['#498CAD', '#358ACF', '#1790CF', '#1BB2D8', 
                '#75ABD0', '#88B0BB','#99D2DD','#BFDEE3'],
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            calculable : true,
            series : [
                {
                    name:'半径模式',
                    type:'pie',
                    radius : [0, 80],
                    center : ['50%', '50%'],
                    roseType : 'radius',
                    width: '40%',       // for funnel
                    max: 40,            // for funnel
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        }
                    },
                    data:[
                        {value:10, name:'rose1'},
                        {value:5, name:'rose2'},
                        {value:15, name:'rose3'},
                        {value:25, name:'rose4'},
                        {value:20, name:'rose5'},
                        {value:35, name:'rose6'},
                        {value:30, name:'rose7'},
                        {value:40, name:'rose8'}
                    ]
                }
            ]
        };

        return option;
    }

    function getEchartLineOption() {
    }
})();
