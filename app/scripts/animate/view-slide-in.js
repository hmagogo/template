/**
 * Created by HMX on 2015/4/29.
 */

app.animation('.repeat-animation', function () {
    'use strict';
    return {
        enter : function (element, done) {
            var width = element.width();
            element.css({
                position: 'relative',
                left: -10,
                opacity: 0
            });
            element.animate({
                left: 0,
                opacity: 1
            }, done);
        },
        leave : function (element, done) {
            element.css({
                position: 'relative',
                left: 0,
                opacity: 1
            });
            element.animate({
                left: -10,
                opacity: 0
            }, done);
        },
        move : function (element, done) {
            element.css({
                left: '2px',
                opacity: 0.5
            });
            element.animate({
                left: '0px',
                opacity: 1
            }, done);
        }
    };
});