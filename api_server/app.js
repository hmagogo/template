"use strict";
/**
 * created by hmx on 2015/5/28.
 * 启动:  npm start
 * 注意： 需要安装 supervisor
 * 访问： localhost:3000
 *
 * http://www.tuicool.com/articles/U7buiy
 */
var express = require("express");
var logger = require("morgan");     // 日志模块
var path = require("path");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var multiparty = require("connect-multiparty");
var routers = require("./routers");

var app = express();

var appPath = process.cwd() + "\\app";			// process.cwd() 获取工程目录的绝对路径
// __dirname 	获取当前模块的绝对路径

app.set("views", appPath);             			// 设置视图在跟目录下
app.engine(".html", ejs.__express);      		// 让模板引擎支持 html
app.set("view engine", "html");         		// 替换文件扩展名ejs为 html

// app.use(logger("dev"));							// 在后台打印请求路径

// app.use(bodyParser.json({ type: 'application/*+json' }));			// 解析不同定制JSON类型为JSON
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));	// 一些自定义的解析为一个缓冲区
// app.use(bodyParser.text({ type: 'text/html' }));					// 解析HTML身体成一个字符串
app.use(bodyParser.json());              				// 解析 application/json
app.use(bodyParser.urlencoded({ extended: false }));    // 解析 application/x-www-form-urlencoded

app.use(express.static(path.join(appPath)));          	// 设置跟目录下的文件为静态文件

    /**     配置上传的目录，不配置默认值为temp文件夹,一般情况下是建议配置       **/
app.use(multiparty({uploadDir: "./api_server/storage", keepExtensions: true}));
app.use("/", routers);

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.write('you posted:\n');
  res.end(JSON.stringify(req.body, null, 2));
});

// 抓住404或错误页面   --注：这个中间件要放置到最后
app.use(function (req, res, next) {
    var err = new error("not found");
    err.status = 404;
    next(err);
});

module.exports = app;
