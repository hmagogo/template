/**
 * Created by HMX on 2015/9/1.
 */
'use strict';

/**
 * TODO 时间格式化方法
 * @param fmt
 * @returns {*}
 * @constructor
 */
Date.prototype.Format = function (fmt) {
    var o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'h+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        'S': this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
};

/*
 * TODO 取得当前时间前后多少天
 * @param day 前后多少天，可为负数
 */
function getDate(day) {
    var nowDate = new Date();
    var sDate = nowDate.getTime();
    var eDate = new Date(sDate - (day * 24 * 60 * 60 * 1000)).Format('yyyy-MM-dd');
    return eDate;
}

/**
 * TODO 去掉字符串前后空格
 * @param str 字符串
 */
function stringTrim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 * TODO 获取 div 里面的文本信息
 * @param  $div  jquery感染后的div
 */
function getDivText($div) {
    return stringTrim($div.textContent !== undefined ? $div.textContent : $div.innerText);
}
