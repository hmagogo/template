/**
 * Created by huangminxuan on 2016/10/12.
 */
(function() {
    'use strict';

    angular.module('app').controller('excelCtrl', excelCtrl);
    angular.module('app').filter('nicsFilter', nicsFilter);
    angular.module('app').filter('disksFilter', disksFilter);
    // 注入
    excelCtrl.$inject = ['$scope', 'FileUploader'];

    function excelCtrl($scope, FileUploader) {

        let _this = this;
        _this.excelTableData = excelTable.data;

        let uploadExcel = _this.uploadExcel = new FileUploader({
            url: '/parsing/excel',
            autoUpload: true
        });

        /** Excel 导出操作 **/
        _this.excelExport = function () {
            return ExcellentExport.excel(_this, 'nodeTable', 'Sheet Name Here');
        };

        /** 导入 Excel 操作 **/
        _this.ReadExcel = function () {
            // XLSX.readFile('someExcel.xlsx');
        };

        $('#excelFile').change(function (e) {
            let files = e.target.files;

            let fileReader = new FileReader();
            fileReader.onload = function (ev) {
                try {
                    let data = ev.target.result;
                    console.log(data);
                } catch (e) {
                    console.log('文件类型不正确！');
                    return;
                }
            }
        });
    }

    /**
     * 网卡过滤器 (将选中的数组提取name)
     */
    function nicsFilter() {
        return function (arr, type) {
            var strArr = [];
            arr = arr || [];
            if (arr.length == 0) {
                return '没有找到网卡';
            }
            for (var i = 0; i < arr.length; i++) {
                if (type && arr[i].selected && arr[i].network === type) {
                    strArr.push(arr[i].name);
                } else if (!type && arr[i].selected) {
                    strArr.push(arr[i].name);
                }
            }
            var retStr = strArr.toString();
            if (retStr.length > 30) {
                return retStr.substr(0, 30) + '...';
            } else {
                return retStr;
            }
        };
    }

    function disksFilter() {
        return function (arr, type) {
            var strArr = [];
            arr = arr || [];
            if (arr.length == 0) {
                return '没有找到磁盘';
            }
            for (var i = 0; i < arr.length; i++) {
                if (type && arr[i].selected && arr[i].purpose === type) {
                    strArr.push(arr[i].name);
                } else if (!type && arr[i].selected) {
                    strArr.push(arr[i].name);
                }
            }
            var retStr = strArr.toString();
            if (retStr.length > 30) {
                return retStr.substr(0, 30) + '...';
            } else {
                return retStr;
            }
        };
    }

    var excelTable = {
        'message': 'Default success message.',
        'data': [
            {
                'checkTime': 1478080448.57549,
                'hostid': 'localhost',
                'disks': [
                    {
                        'vendor': 'VMware',
                        'name': 'sdb',
                        'selected': 1,
                        'purpose': 'osddisk',
                        'capacity': 17179869184,
                        'type': 'HDD',
                        'wwid': '6000c295902e6827aef2775d0a6abf71'
                    },
                    {
                        'vendor': 'VMware',
                        'name': 'sdc',
                        'selected': 0,
                        'purpose': 'osddisk',
                        'capacity': 32212254720,
                        'type': 'HDD',
                        'wwid': '6000c29b9d154e7fff443eb38f6df464'
                    }
                ],
                'nics': [
                    {
                        'slot': '1',
                        'status': 'OK',
                        'name': 'eth0',
                        'selected': 1,
                        'mac': '00:50:56:ab:0c:f2',
                        'network': 'om_bussiness'
                    },
                    {
                        'slot': '2',
                        'status': 'OK',
                        'name': 'eth1',
                        'selected': 1,
                        'mac': '00:50:56:ab:77:ac',
                        'network': 'cluster'
                    },
                    {
                        'slot': '3',
                        'status': 'OK',
                        'name': 'eth2',
                        'selected': 1,
                        'mac': '00:50:56:8e:72:c0',
                        'network': 'cluster'
                    }
                ],
                'selected': 1,
                'humanCheckTime': '2016-11-02 17:54:08   CST',
                'publicIP': {
                    'netmask': '255.255.255.0',
                    'ipaddr': '126.251.6.31',
                    'gateway': '0.0.0.0'
                },
                'clusterIP': {
                    'netmask': '255.255.255.0',
                    'ipaddr': '126.251.5.31'
                },
                'bussinessIP': {
                    'netmask': '255.255.255.0',
                    'ipaddr': '126.251.6.31',
                    'gateway': '0.0.0.0'
                },
                'originalIp': {
                    'netmask': '255.0.0.0',
                    'ipaddr': '10.10.5.31'
                },
                'progress': -1,
                'osSupport': {
                    'min_version_support': 1,
                    'max_version_support': 1,
                    'kernel_version_support_list': [
                        '2.6.32-431.el6.x86_64',
                        '3.10.0-229.el7.x86_64',
                        '3.10.0-327.el7.x86_64',
                        '3.10.0+10'
                    ],
                    'kernel_version_name': '3.10.0-229.el7.x86_64'
                }
            },
            {
                'checkTime': 1478080448.30076,
                'hostid': 'ai126252006032',
                'disks': [
                    {
                        'vendor': 'VMware',
                        'name': 'sdb',
                        'selected': 1,
                        'purpose': 'osddisk',
                        'capacity': 17179869184,
                        'type': 'HDD',
                        'wwid': '6000c29356a86930ec2e3798c4e277b7'
                    },
                    {
                        'vendor': 'KINGSTON',
                        'name': 'sdb',
                        'selected': 0,
                        'purpose': 'rwcache',
                        'capacity': 120034123776,
                        'type': 'SSD',
                        'wwid': '5000'
                    },
                    {
                        'vendor': 'KINGSTON',
                        'name': 'sdc3',
                        'selected': 0,
                        'purpose': 'rwcache',
                        'capacity': 17179869184,
                        'type': 'SSD',
                        'wwid': 'fcbc57006b785002-part3'
                    },
                    {
                        'vendor': 'KINGSTON',
                        'name': 'sdc4',
                        'selected': 0,
                        'purpose': 'rwcache',
                        'capacity': 1024,
                        'type': 'SSD',
                        'wwid': 'fcbc57006b785002-part4'
                    }
                ],
                'nics': [
                    {
                        'slot': '1',
                        'status': 'OK',
                        'name': 'eth0',
                        'selected': 1,
                        'mac': '00:50:56:ab:37:14',
                        'network': 'om_bussiness'
                    },
                    {
                        'slot': '2',
                        'status': 'OK',
                        'name': 'eth1',
                        'selected': 1,
                        'mac': '00:50:56:8e:4c:a4',
                        'network': 'cluster'
                    },
                    {
                        'slot': '3',
                        'status': 'OK',
                        'name': 'eth2',
                        'selected': 1,
                        'mac': '00:50:56:8e:7e:38',
                        'network': 'cluster'
                    }
                ],
                'selected': 1,
                'humanCheckTime': '2016-11-02 17:54:08   CST',
                'publicIP': {
                    'netmask': '255.255.255.0',
                    'ipaddr': '126.251.6.32',
                    'gateway': '0.0.0.0'
                },
                'clusterIP': {
                    'netmask': '255.255.255.0',
                    'ipaddr': '126.251.5.32'
                },
                'bussinessIP': {
                    'netmask': '255.255.255.0',
                    'ipaddr': '126.251.6.32',
                    'gateway': '0.0.0.0'
                },
                'originalIp': {
                    'netmask': '255.0.0.0',
                    'ipaddr': '10.10.5.32'
                },
                'progress': -1,
                'osSupport': {
                    'min_version_support': 1,
                    'max_version_support': 1,
                    'kernel_version_support_list': [
                        '2.6.32-431.el6.x86_64',
                        '3.10.0-229.el7.x86_64',
                        '3.10.0-327.el7.x86_64',
                        '3.10.0+10'
                    ],
                    'kernel_version_name': '3.10.0-229.el7.x86_64'
                }
            },
            {
                'checkTime': 1478080449.084361,
                'hostid': 'localhost',
                'disks': [
                    {
                        'vendor': 'VMware',
                        'name': 'sdb',
                        'selected': 1,
                        'purpose': 'osddisk',
                        'capacity': 12884901888,
                        'type': 'HDD',
                        'wwid': '6000c2990bc2fe76ac5c1ef3143e491a'
                    }
                ],
                'nics': [
                    {
                        'slot': '1',
                        'status': 'OK',
                        'name': 'eth0',
                        'selected': 1,
                        'mac': '00:50:56:ab:55:9d',
                        'network': 'om_bussiness'
                    },
                    {
                        'slot': '2',
                        'status': 'OK',
                        'name': 'eth1',
                        'selected': 1,
                        'mac': '00:50:56:8e:73:89',
                        'network': 'cluster'
                    },
                    {
                        'slot': '3',
                        'status': 'OK',
                        'name': 'eth2',
                        'selected': 1,
                        'mac': '00:50:56:8e:31:bd',
                        'network': 'cluster'
                    }
                ],
                'selected': 1,
                'humanCheckTime': '2016-11-02 17:54:09   CST',
                'publicIP': {
                    'netmask': '255.255.255.0',
                    'ipaddr': '126.251.6.33',
                    'gateway': '0.0.0.0'
                },
                'clusterIP': {
                    'netmask': '255.255.255.0',
                    'ipaddr': '126.251.5.33'
                },
                'bussinessIP': {
                    'netmask': '255.255.255.0',
                    'ipaddr': '126.251.6.33',
                    'gateway': '0.0.0.0'
                },
                'originalIp': {
                    'netmask': '255.0.0.0',
                    'ipaddr': '10.10.5.33'
                },
                'progress': -1,
                'osSupport': {
                    'min_version_support': 1,
                    'max_version_support': 1,
                    'kernel_version_support_list': [
                        '2.6.32-431.el6.x86_64',
                        '3.10.0-229.el7.x86_64',
                        '3.10.0-327.el7.x86_64',
                        '3.10.0+10'
                    ],
                    'kernel_version_name': '3.10.0-229.el7.x86_64'
                }
            }
        ],
        'success': 1
    };
})();
