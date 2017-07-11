"use strict";
/**
 * created by hmx on 2017/05/20.
 *       WebSocket
 */
var WebSocketServer = require('ws').Server,
    ws = new WebSocketServer({ port: 3001, path: '/chatPush' });

ws.on('connection', function (ws) {
    console.log('收到客户端的连接，即将进行通信！');
    ws.on('message', function (message) {
        console.log('收到的数据：' + message);
    });
});


module.exports = ws;
