/**
 * Created by HMX on 2015/8/21.
 * grunt启动方式：grunt serve --base="D:/LocalRepository/node_modules"
 */
'use strict';

// 引入 path 模块
var path = require('path');

module.exports = function (grunt) {
    // 设置 node_modules 自定义目录  (共享 node_modules情况下)
    var node_modules = 'D:/LocalRepository/node_modules';

    // 重新设置 grunt 的项目路径，并且获取当前的 package.json 文件信息  (共享 node_modules情况下)
    grunt.file.setBase(__dirname);

    // 获取当前目录相对于共享 node_modules 目录的路径(以windows下面为例) (共享 node_modules情况下)
    var nodepath = path.relative(__dirname, node_modules);


    // Grunt 启动任务所花的时间，可以帮助在构建时优化时间
    //require('time-grunt')(grunt);

    // task.loadTasks 方法可以从指定的目录加载任务模块
    // task.loadNpmTasks 方法则根据当前项目下 Npm module 所在的安装目录来加载任务模块
    require('load-grunt-tasks')(grunt);  // 加载所有的任务，相当于一堆的 grunt.loadNpmTasks('xxx')

    // require(path.join(nodepath, "load-grunt-tasks"))(grunt);  (共享 node_modules情况下)

    // 加载任务  (共享 node_modules情况下)
    // grunt.task.loadTasks(path.join(nodepath, 'grunt-connect-proxy', 'tasks'));
    // grunt.task.loadTasks(path.join(nodepath, 'grunt-contrib-connect', 'tasks'));
    // grunt.task.loadTasks(path.join(nodepath, 'grunt-contrib-watch', 'tasks'));
    // grunt.task.loadTasks(path.join(nodepath, 'grunt-wiredep', 'tasks'));
    // grunt.task.loadTasks(path.join(nodepath, 'grunt-contrib-less','tasks'));

    var proxySnippet = require(path.join(nodepath, 'grunt-connect-proxy/lib/utils')).proxyRequest;

    // 配置的应用程序的路径。注意：在 bower.json 中注解有干扰，会引发该文件出错
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    // 初始化配置：定义的所有任务的配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        yeoman: appConfig,   // 项目设置

        // 监控操作
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            less: {
                files: ['<%= yeoman.app %>/styles/less/*.less'],
                tasks: ['less']     // 跳转到less的任务
            },
            livereload: {
                options: {
                    livereload: '<%=connect.options.livereload%>'  //监听connect下声明的端口  35729
                },
                files: [         //下面文件的改变就会实时刷新网页
                    '<%= yeoman.app %>/{,*/}*.html',
                    '<%= yeoman.app %>/scripts/*',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        // less文件编译成css文件
        less: {
            compile: {
                files: {
                    // 目标文件 : 源文件
                    '<%= yeoman.app %>/styles/app.css': '<%= yeoman.app %>/styles/less/app.less'
                }
            }
        },
        //自动注入组件到应用程序——在指定的页面上，以<bower:css>、<bower:js>内部进行注入组件。
        wiredep: {
            task: {
                src: ['<%= yeoman.app %>/index.html'],
                ignorePath: /\.\.\//
            }
        },
        connect: {
            options: {
                port: 7070,
                hostname: 'localhost',  // 可配置为本机或某个 IP，localhost 或域名
                livereload: 35727       //  声明给 watch 监听的端口
            },
            proxies: [
                {
                    context: '/nmcc',
                    host: 'localhost',
                    port: 8080
                }
            ],
            server: {
                options: {
                    middleware: function(connect, options) {
                        var middlewares = [];
                        middlewares.push(proxySnippet);            // 保存代理请求
                        options.base.forEach(function(base) {
                            middlewares.push(connect.static(base)); // 保存静态文件
                        });
                        return middlewares;
                    },
                    open: false,        // true：自动打开浏览器
                    base: [
                        '<%= yeoman.app %>'
                    ]
                }
            }
        }
    });


    // 默认任务
    grunt.registerTask('default', [
        'watch',
        'less',
        'wiredep'
    ]);

    /*  grunt.registerTask(taskName, [description,] taskFunction)
     taskName        任务名称，命令行里使用 grunt + taskName
     description     任务的描述
     taskFunction    任务的实现
     */
    // 注册 Grunt 任务，名为 serve
    grunt.registerTask('serve', '编译后开始连接的web服务器', function (target) {
        grunt.task.run([
            'configureProxies:proxy',   /* 在 connect 前加上 */
            'connect:server',
            'watch'
        ]);
    });

    grunt.registerTask('test-1', '简单的任务演示，根据参数打印不同的输出。', function (arg1, arg2) {
        /** 运行方式：grunt myTask 这是没带参数，带参数写法：grunt myTask:test **/
        if (arguments.length === 0) {
            grunt.log.writeln('Task ' + this.name + ', no params');
        } else if (arguments.length === 1) {
            grunt.log.writeln('Task ' + this.name + ', param 1: ' + arg1);
        } else {
            grunt.log.writeln('Task ' + this.name + ', param 1 and 2: ' + arg1 + ', ' + arg2);
        }
    });
};
