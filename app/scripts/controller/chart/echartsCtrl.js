/**
 * Created by HMX on 2016/08/23.
 * echarts url: http://echarts.baidu.com/echarts2/doc/example.html
 */

(function () {
	'use strict';
    angular.module('app').controller('echartsCtrl', echartsCtrl);

    echartsCtrl.$inject = ['$scope', '$http', 'uiLoad'];

    function echartsCtrl($scope, $http, uiLoad) {
        var _this = this;
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

        // 柱状图
        (function () {
            var histogram = echarts.init(document.getElementById('histogram'));
            histogram.setOption(getEchartHistogramOption());
        })();

        // 地图
        (function (angular, echarts, uiLoad) {
            _this.isMapDown = false;
            var provinces = [
                { name: '安徽', js: 'anhui.js', flag: false },
                { name: '澳门', js: 'aomen.js', flag: false },
                { name: '北京', js: 'beijing.js', flag: false },
                { name: '重庆', js: 'chongqing.js', flag: false },
                { name: '福建', js: 'fujian.js', flag: false },
                { name: '甘肃', js: 'gansu.js', flag: false },
                { name: '广东', js: 'guangdong.js', flag: false },
                { name: '广西', js: 'guangxi.js', flag: false },
                { name: '贵州', js: 'guizhou.js', flag: false },
                { name: '海南', js: 'hainan.js', flag: false },
                { name: '河北', js: 'hebei.js', flag: false },
                { name: '黑龙江', js: 'heilongjiang.js', flag: false },
                { name: '河南', js: 'henan.js', flag: false },
                { name: '湖北', js: 'hubei.js', flag: false },
                { name: '湖南', js: 'hunan.js', flag: false },
                { name: '江苏', js: 'jiangsu.js', flag: false },
                { name: '江西', js: 'jiangxi.js', flag: false },
                { name: '吉林', js: 'jilin.js', flag: false },
                { name: '辽宁', js: 'liaoning.js', flag: false },
                { name: '内蒙古', js: 'neimenggu.js', flag: false },
                { name: '宁夏', js: 'ningxia.js', flag: false },
                { name: '青海', js: 'qinghai.js', flag: false },
                { name: '山东', js: 'shandong.js', flag: false },
                { name: '上海', js: 'shanghai.js', flag: false },
                { name: '山西', js: 'shanxi.js', flag: false },
                { name: '陕西', js: 'shanxi1.js', flag: false },
                { name: '四川', js: 'sichuan.js', flag: false },
                { name: '天津', js: 'tianjin.js', flag: false },
                { name: '香港', js: 'xianggang.js', flag: false },
                { name: '新疆', js: 'xinjiang.js', flag: false },
                { name: '西藏', js: 'xizang.js', flag: false },
                { name: '云南', js: 'yunnan.js', flag: false },
                { name: '浙江', js: 'zhejiang.js', flag: false }
            ];

            var atlas1 = echarts.init(document.getElementById('atlas1'));
            atlas1.setOption(getEchartAtlasOption());

            var atlas2 = echarts.init(document.getElementById('atlas2'));
            atlas2.setOption(getEchartMapOption());

            // 点击该省份，加载该省份的 JS文件
            atlas2.on('click', function (params) {
                angular.forEach(provinces, function (province) {
                    if (params.name == province.name) {
                        uiLoad.loadScript(
                            'bower_components/echarts/map/js/province/' + province.js
                        ).then(function () {
                            _this.isMapDown = true;
                            atlas2.clear();   // 清空缓存
                            atlas2.setOption(getEchartProvinceOption(params.name));
                        });
                    }
                });
            });

            // 放回地图图表
            _this.backMap = function () {
                atlas2.clear();
                atlas2.setOption(getEchartMapOption());
                _this.isMapDown = false;
            }
        })(angular, echarts, uiLoad);

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

    /**
     * 获取柱状图的选项
     */
    function getEchartHistogramOption() {
        return {
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['Mon\n女装\n男装', 'Tue\n女装\n男装', 'Wed\n女装\n男装', 'Thu\n女装\n男装', 'Fri\n女装\n男装',
                        'Sat\n女装\n男装', 'Sun\n女装\n男装'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '60%',
                    data:[10, 52, 200, 334, 390, 330, 220]
                }
            ]
        };
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

    function getEchartLineOption() {}

    function getEchartAtlasOption() {
        return {
            title: {
                // 是否显示
                show: true,
                // 主标题文本，'\n'指定换行
                text: 'iphone销量',
                // 主标题文本超链接
                // link: 'http://www.baidu.com',
                // 指定窗口打开主标题超链接，支持'self' | 'blank'，不指定等同为'blank'（新窗口）
                target: 'self',
                // subtext: '纯属虚构',    // 副标题文本，'\n'指定换行
                // sublink: 'http://www.baidu.com',    // 副标题文本超链接
                // 指定窗口打开副标题超链接，支持'self' | 'blank'，不指定等同为'blank'（新窗口）
                subtarget: 'self',
                // 水平安放位置，默认为左侧，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
                x: 'center',
                // 垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
                y: 'top',
                // 水平对齐方式，默认根据x设置自动调整，可选为： left' | 'right' | 'center
                textAlign: 'center',
                // backgroundColor: 'rgba(0,0,0,0.1)',      // 标题背景颜色，默认透明
                // borderColor: '#66FF00',      // 标题边框颜色
                // borderWidth: 1,              // 标题边框线宽，单位px，默认为0（无边框）
                // 标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距，同css，见下图
                // padding: [20,40,20,40],
                // 主副标题纵向间隔，单位px，默认为10
                itemGap: 20,
                // 主标题文本样式
                textStyle: {
                    // 颜色
                    color: '#ff7462',
                    // 水平对齐方式，可选为：'left' | 'right' | 'center'
                    align: 'left',
                    // 垂直对齐方式，可选为：'top' | 'bottom' | 'middle'
                    baseline: 'bottom',
                    // 字体系列
                    fontFamily: 'Arial, 宋体, sans-serif',
                    // 字号 ，单位px
                    fontSize: 20,
                    // 样式，可选为：'normal' | 'italic' | 'oblique'
                    fontStyle: 'italic',
                    // 粗细，可选为：'normal' | 'bold' | 'bolder' | 'lighter' | 100 | 200 |... | 900
                    fontWeight: 'normal'
                },
                // 副标题文本样式
                subtextStyle: {
                    // 颜色
                    color: '#FF7F50',
                    // 水平对齐方式，可选为：'left' | 'right' | 'center'
                    align: 'left',
                    // 垂直对齐方式，可选为：'top' | 'bottom' | 'middle'
                    baseline: 'bottom',
                    // 字体系列
                    fontFamily: 'Arial, 宋体, sans-serif',
                    // 字号 ，单位px
                    fontSize: 15,
                    // 样式，可选为：'normal' | 'italic' | 'oblique'
                    fontStyle: 'italic',
                    // 粗细，可选为：'normal' | 'bold' | 'bolder' | 'lighter' | 100 | 200 |... | 900
                    fontWeight: 'normal'
                }
            },
            // 工具提示
            tooltip : {
                // 显示策略，可选为：true（显示） | false（隐藏）
                show: true,
                // tooltip主体内容显示策略，只需tooltip触发事件或显示axisPointer而不需要显示内容时可配置该项为false
                showContent: true,
                // 触发类型，默认数据触发，见下图，可选为：'item' | 'axis'
                trigger: 'item',
                // 位置指定，传入{Array}，如[x, y]， 固定位置[x, y]；传入{Function}，如function([x, y]) {return [newX,newY]}，默认显示坐标为输入参数，用户指定的新坐标为输出返回。
                // position: getTooltipPosition(0,0),
                // 内容格式器：{string}（Template） | {Function}，支持异步回调
                /*formatter: function(data){
                 console.log(data);
                 return data[1]+"："+data[5].count;
                 }*/
                // 拖拽重计算独有，数据孤岛内容格式器：{string}（Template） | {Function}，见表格下方
                // islandFormatter:
                // 显示延迟，添加显示延迟可以避免频繁切换，特别是在详情内容需要异步获取的场景，单位ms
                showDelay: 0,
                // 隐藏延迟，单位ms
                hideDelay: 0,
                // 动画变换时长，单位s，如果你希望tooltip的跟随实时响应，showDelay设置为0是关键，同时transitionDuration设0也会有交互体验上的差别。
                transitionDuration: 0,
                // 鼠标是否可进入详情气泡中，默认为false，如需详情内交互，如添加链接，按钮，可设置为true。
                //enterable: false,
                // 提示背景颜色，默认为透明度为0.7的黑色
                backgroundColor: 'rgba(0,0,0,0.5)',
                // 提示边框颜色
                borderColor: '#FF7F50',
                // 提示边框圆角，单位px，默认为4
                borderRadius: 10,
                // 提示边框线宽，单位px，默认为0（无边框）
                borderWidth: 2,
                // 提示内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距，同css
                padding: [10,10,10,10],
                // 坐标轴指示器
                /*axisPointer: {
                    // 默认type为line，可选为：'line' | 'cross' | 'shadow' | 'none'(无)，指定type后对应style生效
                    type: 'line',
                    // lineStyle设置直线指示器
                    lineStyle: {
                        // 颜色
                        color:'#48b',
                        // 线条样式，可选为：'solid' | 'dotted' | 'dashed'， 树图还可以选：'curve' | 'broken'
                        type:'solid',
                        // 线宽
                        width:10,
                        // 折线主线(IE8+)有效，阴影色彩，支持rgba
                        shadowColor:'rgba(0,0,0,0)',
                        // 折线主线(IE8+)有效，阴影模糊度，大于0有效
                        shadowBlur:5,
                        // 折线主线(IE8+)有效，阴影横向偏移，正值往右，负值往左
                        shadowOffsetX:3,
                        // 折线主线(IE8+)有效，阴影纵向偏移，正值往下，负值往上
                        shadowOffsetY:3
                    },
                    // crossStyle设置十字准星指示器
                    crossStyle:{
                        // 颜色
                        color:'#48b',
                        // 线条样式，可选为：'solid' | 'dotted' | 'dashed'， 树图还可以选：'curve' | 'broken'
                        type:'solid',
                        // 线宽
                        width:10,
                        // 折线主线(IE8+)有效，阴影色彩，支持rgba
                        shadowColor:'rgba(0,0,0,0)',
                        // 折线主线(IE8+)有效，阴影模糊度，大于0有效
                        shadowBlur:5,
                        // 折线主线(IE8+)有效，阴影横向偏移，正值往右，负值往左
                        shadowOffsetX:3,
                        // 折线主线(IE8+)有效，阴影纵向偏移，正值往下，负值往上
                        shadowOffsetY:3
                    },
                    // shadowStyle设置阴影指示器，areaStyle.size默认为'auto'自动计算，可指定具体宽度
                    shadowStyle:{
                        // 颜色
                        color: 'rgba(150,150,150,0.3)',
                        width: 'auto',
                        // 填充样式，目前仅支持'default'(实填充)
                        type: 'default'
                    }
                }*/
                // 文本样式，默认为白色字体
                textStyle:{
                    // 颜色
                    color: '#FF7F50',
                    // 水平对齐方式，可选为：'left' | 'right' | 'center'
                    align: 'left',
                    // 垂直对齐方式，可选为：'top' | 'bottom' | 'middle'
                    baseline: 'bottom',
                    // 字体系列
                    fontFamily: 'Arial, 宋体, sans-serif',
                    // 字号 ，单位px
                    fontSize: 16,
                    // 样式，可选为：'normal' | 'italic' | 'oblique'
                    fontStyle: 'italic',
                    // 粗细，可选为：'normal' | 'bold' | 'bolder' | 'lighter' | 100 | 200 |... | 900
                    fontWeight: 'normal'
                }
            },
            legend: {
                // 显示策略，可选为：true（显示） | false（隐藏）
                show: true,
                // 布局方式，默认为水平布局，可选为：'horizontal' | 'vertical'
                orient: 'vertical',
                // 水平安放位置，默认为全图居中，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
                x: 'left',
                // 垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
                y: 'top',
                // 图例背景颜色，默认透明
                backgroundColor: 'rgba(0,0,0,0.1)',
                // 图例边框颜色
                borderColor: '#0066FF',
                // 图例边框线宽，单位px，默认为0（无边框）
                borderWidth: 1,
                // 图例内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距，同css
                padding: [5,5,5,5],
                // 各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
                itemGap: 5,
                // 图例图形宽度
                itemWidth: 18,
                // 图例图形高度
                itemHeight: 10,
                // 默认只设定了图例文字颜色,更个性化的是，要指定文字颜色跟随图例,可设color为'auto'
                textStyle:{
                    // 颜色
                    color: '#FF7F50',
                    // 水平对齐方式，可选为：'left' | 'right' | 'center'
                    align: 'left',
                    // 垂直对齐方式，可选为：'top' | 'bottom' | 'middle'
                    baseline: 'bottom',
                    // 字体系列
                    fontFamily: 'Arial, 宋体, sans-serif',
                    // 字号 ，单位px
                    fontSize: 14,
                    // 样式，可选为：'normal' | 'italic' | 'oblique'
                    fontStyle: 'italic',
                    // 粗细，可选为：'normal' | 'bold' | 'bolder' | 'lighter' | 100 | 200 |... | 900
                    fontWeight: 'normal'
                },
                // 文本格式器：{string}（Template） | {Function}，模板变量为'{name}'，函数回调参数为name
                /*formatter: function(data){
                 console.log(data);
                 return data[1]+"："+data[5].count;
                 },*/
                // 选择模式，默认开启图例开关，可选single，multiple
                selectedMode: true,
                // 配置默认选中状态，可配合LEGEND.SELECTED事件做动态数据载入
                /*selected: {
                 '降水量' : false
                 },*/
                // 图例内容数组
                data: [
                    {name:'iphone3'/*,textStyle:{Object},icon:{string}*/},
                    {name:'iphone4'/*,textStyle:{Object},icon:{string}*/},
                    {name:'iphone5'/*,textStyle:{Object},icon:{string}*/}
                ]
            },
            // 值域选择，每个图表最多仅有一个值域控件
            dataRange: {
                // 显示策略，可选为：true（显示） | false（隐藏）
                show: true,
                // 布局方式，默认为垂直布局，可选为：'horizontal' | 'vertical'
                orient: 'horizontal',
                // 水平安放位置，默认为全图左对齐，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
                x: 'left',
                // 垂直安放位置，默认为全图底部，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
                y: 'bottom',
                // 值域控件背景颜色，默认透明
                backgroundColor: 'rgba(0,0,0,0.1)',
                // 图例边框颜色
                borderColor: '#0066FF',
                // 图例边框线宽，单位px，默认为0（无边框）
                borderWidth: 1,
                // 图例内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距，同css
                padding: [5,5,5,5],
                // 各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
                itemGap: 20,
                // 图例图形宽度
                itemWidth: 10,
                // 图例图形高度
                itemHeight: 100,
                // 指定的最小值，eg: 0，默认无，必须参数，唯有指定了splitList时可缺省min。
                min: 0,
                // 指定的最大值，eg: 100，默认无，必须参数，唯有指定了splitList时可缺省max
                max: 2500,
                // 小数精度，默认为0，无小数点，当 min ~ max 间在当前精度下无法整除splitNumber份时，精度会自动提高以满足均分，不支持不等划分
                precision: 1,
                // 分割段数，默认为5，为0时为线性渐变，calculable为true是默认均分100份
                splitNumber: 10,
                // 自定义分割方式，支持不等距分割。splitList被指定时，splitNumber将被忽略。
                /*splitList: [
                    {start: 1500},
                    {start: 900, end: 1500},
                    {start: 310, end: 1000},
                    {start: 200, end: 300},
                    {start: 10, end: 200, label: '10 到 200（自定义label）'},
                    {start: 5, end: 5, label: '5（自定义特殊颜色）', color: 'black'},
                    {end: 10}
                ]*/
                // 用于设置dataRange的初始选中范围。calculable为true时有效。
                range: [0, 2500],
                // 选择模式，默认开启值域开关，可选single，multiple
                selectedMode: 'multiple',
                // 是否启用值域漫游，启用后无视splitNumber和splitList，值域显示为线性渐变
                calculable : true,
                // 是否启用地图hover时的联动响应
                hoverLink: true,
                // 值域漫游是否实时显示，在不支持Canvas的浏览器中该值自动强制置为false
                realtime:true,
                // 值域颜色标识，颜色数组长度必须>=2，颜色代表从数值高到低的变化，即颜色数组低位代表数值高的颜色标识 ，支持Alpha通道上的变化（rgba）
                color:['#e42515','#fad3d0'],
                // 内容格式器：{string}（Template） | {Function}，模板变量为'{value}'和'{value2}'，代表数值起始值和结束值，函数参数两个，含义同模板变量，当calculable为true时模板变量仅有'{value}'
                /*formatter: function (v, v2) {
                    if (v2 < 1000) {
                        return '低于' + v2;
                    } else if (v > 1000) {
                        return '高于' + v;
                    } else {
                        return '中';
                    }
                },*/
                // 	值域文字显示，splitNumber生效时默认以计算所得数值作为值域文字显示，可指定长度为2的文本数组显示简介的值域文本，如['高', '低']，'\n'指定换行
                text:['高','低'],
                // 默认只设定了值域控件文字颜色
                textStyle:{
                    // 颜色
                    color: '#FF7F50',
                    // 水平对齐方式，可选为：'left' | 'right' | 'center'
                    align: 'left',
                    // 垂直对齐方式，可选为：'top' | 'bottom' | 'middle'
                    baseline: 'bottom',
                    // 字体系列
                    fontFamily: 'Arial, 宋体, sans-serif',
                    // 字号 ，单位px
                    fontSize: 16,
                    // 样式，可选为：'normal' | 'italic' | 'oblique'
                    fontStyle: 'italic',
                    // 粗细，可选为：'normal' | 'bold' | 'bolder' | 'lighter' | 100 | 200 |... | 900
                    fontWeight: 'normal'
                }
            },
            // 工具箱，每个图表最多仅有一个工具箱
            toolbox: {
                // 显示策略，可选为：true（显示） | false（隐藏）
                show: true,
                // 布局方式，默认为水平布局，可选为：'horizontal' | 'vertical'
                orient: 'horizontal',
                // 水平安放位置，默认为全图居中，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
                x: 'right',
                // 垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
                y: 'bottom',
                // 工具箱背景颜色，默认透明
                backgroundColor: 'rgba(218,112,214,0.6)',
                // 工具箱边框颜色
                borderColor: '#0066FF',
                // 工具箱边框线宽，单位px，默认为0（无边框）
                borderWidth: 1,
                // 工具箱内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距，同css
                padding: [5, 5, 5, 5],
                // 各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
                itemGap: 20,
                // 工具箱icon大小，单位（px）
                itemSize: 10,
                // 工具箱icon颜色序列，循环使用，同时支持在具体feature内指定color
                color: ['#1e90ff', '#22bb22', '#4b0082', '#d2691e'],
                // 禁用颜色定义
                disableColor: '#fff',
                // 生效颜色定义
                effectiveColor: 'red',
                // 是否显示工具箱文字提示，默认启用
                showTitle: true,
                // 工具箱提示文字样式
                textStyle:{
                    // 颜色
                    color: '#FF7F50',
                    // 水平对齐方式，可选为：'left' | 'right' | 'center'
                    align: 'left',
                    // 垂直对齐方式，可选为：'top' | 'bottom' | 'middle'
                    baseline: 'bottom',
                    // 字体系列
                    fontFamily: 'Arial, 宋体, sans-serif',
                    // 字号 ，单位px
                    fontSize: 20,
                    // 样式，可选为：'normal' | 'italic' | 'oblique'
                    fontStyle: 'italic',
                    // 粗细，可选为：'normal' | 'bold' | 'bolder' | 'lighter' | 100 | 200 |... | 900
                    fontWeight: 'normal'
                },
                // 启用功能，目前支持feature见下，工具箱自定义功能回调处理
                feature : {
                    // 辅助线标志,分别是启用，删除上一条，删除全部,可设置更多属性
                    mark : {
                        show : true,
                        title : {
                            mark : '辅助线开关',
                            markUndo : '删除辅助线',
                            markClear : '清空辅助线'
                        },
                        lineStyle : {
                            width : 2,
                            color : '#1e90ff',
                            type : 'dashed'
                        }
                    },
                    // 框选区域缩放，自动与存在的dataZoom控件同步，上图icon左数4/5，分别是启用，缩放后退
                    dataZoom : {
                        show : true,
                        title : {
                            dataZoom : '区域缩放',
                            dataZoomReset : '区域缩放后退'
                        }
                    },
                    // 数据视图，上图icon左数6，打开数据视图，可设置更多属性
                    dataView : {
                        show : true,
                        title : '数据视图',
                        readOnly: false,
                        lang: ['数据视图', '关闭', '刷新']
                    },
                    // 动态类型切换，支持直角系下的折线图、柱状图、堆积、平铺转换，上图icon左数6~14，分别是切换为堆积，切换为平铺，
                    // 切换折线图，切换柱形图，切换为力导向布局图，切换为和弦图，切换为饼图，切换为漏斗图
                    magicType: {
                        show : true,
                        title : {
                            line : '折线图切换',
                            bar : '柱形图切换',
                            stack : '堆积',
                            tiled : '平铺',
                            force: '力导向布局图切换',
                            chord: '和弦图切换',
                            pie: '饼图切换',
                            funnel: '漏斗图切换'
                        },
                        option: {
                            // line: {...},
                            // bar: {...},
                            // stack: {...},
                            // tiled: {...},
                            // force: {...},
                            // chord: {...},
                            // pie: {...},
                            // funnel: {...}
                        },
                        type : []
                    },
                    // 还原，复位原始图表
                    restore : {
                        show : true,
                        title : '还原'
                    },
                    // 保存图片（IE8-不支持），可设置更多属性
                    saveAsImage : {
                        show : true,
                        title : '保存为图片',
                        type : 'png',
                        lang : ['点击保存']
                    }
                }
            },
            // 缩放漫游组件，仅对地图有效
            roamController: {
                // 显示策略，可选为：true（显示） | false（隐藏）
                show: true,
                // 水平安放位置，默认为左侧，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
                x: 'right',
                // 垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
                y: 'top',
                // 指定宽度，决定4向漫游圆盘大小，可指定 {number}（宽度，单位px）
                width: 120,
                // 指定高度，缩放控制键默认会在指定高度的最下方最大化显示，可指定 {number}（高度，单位px）
                height:200,
                // 缩放漫游组件背景颜色，默认透明
                backgroundColor:'rgba(0,0,0,0.1)',
                // 缩放漫游组件边框颜色
                borderColor: '#1e90ff',
                // 缩放漫游组件边框线宽，单位px，默认为0（无边框）
                borderWidth: 1,
                // 缩放漫游组件内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距，同css
                padding: [15,15,15,15],
                // 漫游组件文字填充颜色
                fillerColor:'#000',
                // 控制手柄主体颜色
                handleColor:'#e3655a',
                // 4向漫游移动步伐，单位px
                step:10,
                // 必须，指定漫游组件可控地图类型
                mapTypeControl: {
                    'china': true
                }
            },
            series: [
                {
                    // 图表类型，必要参数！如为空或不支持类型，则该系列数据不被显示。可选为：
                    // 'line'（折线图） | 'bar'（柱状图） | 'scatter'（散点图） | 'k'（K线图）
                    // 'pie'（饼图） | 'radar'（雷达图） | 'chord'（和弦图） | 'force'（力导向布局图） | 'map'（地图）
                    type: 'map',
                    // 系列名称
                    name: 'iphone3',
                    // 地图类型，支持world，china及全国34个省市自治区
                    mapType: 'china',
                    // 是否开启滚轮缩放和拖拽漫游,默认为false（关闭），其他有效输入为true（开启），'scale'（仅开启滚轮缩放），'move'（仅开启拖拽漫游）
                    roam: true,
                    // 图形样式
                    itemStyle:{
                        // 默认状态下地图的文字
                        normal:{label:{show:true}},
                        // 鼠标放到地图上面显示文字
                        emphasis:{label:{show:true}}
                    },
                    data:[
                        {name: '北京',value: Math.round(Math.random()*1000)},
                        {name: '天津',value: Math.round(Math.random()*1000)},
                        {name: '上海',value: Math.round(Math.random()*1000)},
                        {name: '重庆',value: Math.round(Math.random()*1000)},
                        {name: '河北',value: Math.round(Math.random()*1000)},
                        {name: '河南',value: Math.round(Math.random()*1000)},
                        {name: '云南',value: Math.round(Math.random()*1000)},
                        {name: '辽宁',value: Math.round(Math.random()*1000)},
                        {name: '黑龙江',value: Math.round(Math.random()*1000)},
                        {name: '湖南',value: Math.round(Math.random()*1000)},
                        {name: '安徽',value: Math.round(Math.random()*1000)},
                        {name: '山东',value: Math.round(Math.random()*1000)},
                        {name: '新疆',value: Math.round(Math.random()*1000)},
                        {name: '江苏',value: Math.round(Math.random()*1000)},
                        {name: '浙江',value: Math.round(Math.random()*1000)},
                        {name: '江西',value: Math.round(Math.random()*1000)},
                        {name: '湖北',value: Math.round(Math.random()*1000)},
                        {name: '广西',value: Math.round(Math.random()*1000)},
                        {name: '甘肃',value: Math.round(Math.random()*1000)},
                        {name: '山西',value: Math.round(Math.random()*1000)},
                        {name: '内蒙古',value: Math.round(Math.random()*1000)},
                        {name: '陕西',value: Math.round(Math.random()*1000)},
                        {name: '吉林',value: Math.round(Math.random()*1000)},
                        {name: '福建',value: Math.round(Math.random()*1000)},
                        {name: '贵州',value: Math.round(Math.random()*1000)},
                        {name: '广东',value: Math.round(Math.random()*1000)},
                        {name: '青海',value: Math.round(Math.random()*1000)},
                        {name: '西藏',value: Math.round(Math.random()*1000)},
                        {name: '四川',value: Math.round(Math.random()*1000)},
                        {name: '宁夏',value: Math.round(Math.random()*1000)},
                        {name: '海南',value: Math.round(Math.random()*1000)},
                        {name: '台湾',value: Math.round(Math.random()*1000)},
                        {name: '香港',value: Math.round(Math.random()*1000)},
                        {name: '澳门',value: Math.round(Math.random()*1000)}
                    ]
                },
                {
                    name: 'iphone4',
                    type: 'map',
                    mapType: 'china',
                    itemStyle:{
                        normal:{label:{show:true}},
                        emphasis:{label:{show:true}}
                    },
                    data:[
                        {name: '北京',value: Math.round(Math.random()*1000)},
                        {name: '天津',value: Math.round(Math.random()*1000)},
                        {name: '上海',value: Math.round(Math.random()*1000)},
                        {name: '重庆',value: Math.round(Math.random()*1000)},
                        {name: '河北',value: Math.round(Math.random()*1000)},
                        {name: '安徽',value: Math.round(Math.random()*1000)},
                        {name: '新疆',value: Math.round(Math.random()*1000)},
                        {name: '浙江',value: Math.round(Math.random()*1000)},
                        {name: '江西',value: Math.round(Math.random()*1000)},
                        {name: '山西',value: Math.round(Math.random()*1000)},
                        {name: '内蒙古',value: Math.round(Math.random()*1000)},
                        {name: '吉林',value: Math.round(Math.random()*1000)},
                        {name: '福建',value: Math.round(Math.random()*1000)},
                        {name: '广东',value: Math.round(Math.random()*1000)},
                        {name: '西藏',value: Math.round(Math.random()*1000)},
                        {name: '四川',value: Math.round(Math.random()*1000)},
                        {name: '宁夏',value: Math.round(Math.random()*1000)},
                        {name: '香港',value: Math.round(Math.random()*1000)},
                        {name: '澳门',value: Math.round(Math.random()*1000)}
                    ]
                },
                {
                    name: 'iphone5',
                    type: 'map',
                    mapType: 'china',
                    itemStyle:{
                        normal:{label:{show:true}},
                        emphasis:{label:{show:true}}
                    },
                    data:[
                        {name: '北京',value: Math.round(Math.random()*1000)},
                        {name: '天津',value: Math.round(Math.random()*1000)},
                        {name: '上海',value: Math.round(Math.random()*1000)},
                        {name: '广东',value: Math.round(Math.random()*1000)},
                        {name: '台湾',value: Math.round(Math.random()*1000)},
                        {name: '香港',value: Math.round(Math.random()*1000)},
                        {name: '澳门',value: Math.round(Math.random()*1000)}
                    ]
                }
            ]
        }
    }

    function getEchartMapOption() {
        return {
            tooltip: {
                // show: false,   // 不显示提示标签
                formatter: '{b}', // 提示标签格式
                backgroundColor: "#ff7f50", //提示标签背景颜色
                textStyle:{color:"#fff"}    //提示标签字体颜色
            },
            series: [
                {
                    type: 'map',
                    mapType: 'china',
                    label: {
                        normal: {
                            show: true,                 //显示省份标签
                            textStyle:{color:"#c71585"} //省份标签字体颜色
                        },
                        emphasis: {                     //对应的鼠标悬浮效果
                            show: true,
                            textStyle:{color:"#800080"}
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: .5,            //区域边框宽度
                            borderColor: '#009fe8',     //区域边框颜色
                            areaColor:"#ffefd5",        //区域颜色
                        },
                        emphasis: {
                            borderWidth: .5,
                            borderColor: '#4b0082',
                            areaColor:"#ffdead",
                        }
                    },
                    data: [
                        {name:'广东', selected:true}      // 福建为选中状态
                    ]
                }
            ]
        }
    }

    function getEchartMapOption2() {
        return {
            title : {
                text: '订单量',
                subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                x:'left',
                data:['订单量']
            },
            dataRange: {
                x: 'left',
                y: 'bottom',
                splitList: [
                    {start: 1500},
                    {start: 900, end: 1500},
                    {start: 310, end: 1000},
                    {start: 200, end: 300},
                    {start: 10, end: 200, label: '10 到 200（自定义label）'},
                    {start: 5, end: 5, label: '5（自定义特殊颜色）', color: '#E0915D'},
                    {end: 10}
                ],
                color: ['#E0022B', '#E09107', '#A3E00B']
            },
            toolbox: {
                show: true,
                orient : 'vertical',
                x: 'right',
                y: 'center',
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            roamController: {
                show: true,
                x: 'right',
                mapTypeControl: {
                    'china': true
                }
            },
            series : [
                {
                    name: '订单量',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    itemStyle:{
                        normal:{
                            label:{
                                show:true,
                                textStyle: {
                                    color: "rgb(249, 249, 249)"
                                }
                            }
                        },
                        emphasis:{label:{show:true}}
                    },
                    data:[
                        {name: '北京',value: Math.round(Math.random()*2000)},
                        {name: '天津',value: Math.round(Math.random()*2000)},
                        {name: '上海',value: Math.round(Math.random()*2000)},
                        {name: '重庆',value: Math.round(Math.random()*2000)},
                        {name: '河北',value: 0},
                        {name: '河南',value: Math.round(Math.random()*2000)},
                        {name: '云南',value: 5},
                        {name: '辽宁',value: 305},
                        {name: '黑龙江',value: Math.round(Math.random()*2000)},
                        {name: '湖南',value: 200},
                        {name: '安徽',value: Math.round(Math.random()*2000)},
                        {name: '山东',value: Math.round(Math.random()*2000)},
                        {name: '新疆',value: Math.round(Math.random()*2000)},
                        {name: '江苏',value: Math.round(Math.random()*2000)},
                        {name: '浙江',value: Math.round(Math.random()*2000)},
                        {name: '江西',value: Math.round(Math.random()*2000)},
                        {name: '湖北',value: Math.round(Math.random()*2000)},
                        {name: '广西',value: Math.round(Math.random()*2000)},
                        {name: '甘肃',value: Math.round(Math.random()*2000)},
                        {name: '山西',value: Math.round(Math.random()*2000)},
                        {name: '内蒙古',value: Math.round(Math.random()*2000)},
                        {name: '陕西',value: Math.round(Math.random()*2000)},
                        {name: '吉林',value: Math.round(Math.random()*2000)},
                        {name: '福建',value: Math.round(Math.random()*2000)},
                        {name: '贵州',value: Math.round(Math.random()*2000)},
                        {name: '广东',value: Math.round(Math.random()*2000)},
                        {name: '青海',value: Math.round(Math.random()*2000)},
                        {name: '西藏',value: Math.round(Math.random()*2000)},
                        {name: '四川',value: Math.round(Math.random()*2000)},
                        {name: '宁夏',value: Math.round(Math.random()*2000)},
                        {name: '海南',value: Math.round(Math.random()*2000)},
                        {name: '台湾',value: Math.round(Math.random()*2000)},
                        {name: '香港',value: Math.round(Math.random()*2000)},
                        {name: '澳门',value: Math.round(Math.random()*2000)}
                    ]
                }
            ]
        }
    }

    /**
     * 获取省份地图，需要传入省份的名字，如 广东、广西
     * @param mapType  省份的名字
     * @returns {{tooltip: {formatter: tooltip.formatter, trigger: string}, series: [*]}}
     */
    function getEchartProvinceOption(mapType) {
        return {
            tooltip : {
                formatter: function (val) {
                    return val.name;
                },
                trigger: 'item'
            },
            series : [
                {
                    name: '',
                    type: 'map',
                    mapType: mapType,
                    roam: false,
                    itemStyle:{
                        normal:{

                            borderColor: '#BAD5C2',     //区域边框颜色
                            areaColor:"#cbe9e3",
                            label:{
                                show:true,
                                textStyle: {
                                    color: "#676161"
                                }
                            }
                        },
                        // 鼠标移在区域的样式
                        emphasis: {
                            label:{show:true},
                            borderWidth: .5,
                            borderColor: '#72e0cc',
                            areaColor:"#91e0d2"
                        }
                    }
                }
            ]
        }
    }
})();
