var fs = require('fs');
var express = require('express');
var multipart = require('connect-multiparty');
//var multiparty = require('multiparty');
var mysql = require('mysql');
var xlsx = require('xlsx');
var multer = require('multer');
var webuploader = require('node-webuploader-server');

// data
var bt = require('./data/table/bootstrapTable.js');
var jf = require('./data/table/jqueryFlexigrid.js');
var ec = require('./data/echartsData.js');

var router = express.Router();
var multipartMiddleware = multipart();

var pool = mysql.createPool({       // 连接 mysql 池
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'node'
});

// 页面访问 根目录 时跳转到 index.html
router.get('/', function (req, res) {
    res.render('index');
});

router.post('/backstage/query', function (req, res) {
    pool.getConnection(
        function (err, connection) {
            var count = 0;
            var sql = 'SELECT * FROM test';
            var sql2 = 'SELECT COUNT(id) AS `totalCount` FROM test';
            connection.query(sql2, function (err, result) {
                count = result;
            });
            connection.query(sql, function (err, result2, fields) {
                if (err) {
                    throw err;
                }
                res.send({list: result2, page: count});
                connection.release();       //释放
            });
        }
    );
});

router.post('/backstage/add', function (req, res) {
    pool.getConnection(
        function (err, connection) {
            var sql = 'INSERT INTO test(USERNAME, PASSWORD) VALUES(?,?)';
            var params = jsonSwitchArray(req.body.params);
            connection.query(sql, params, function (err, result) {
                if (err) {
                    console.log('[INSERT ERROR] - ',err.message);
                    return;
                }
                console.log('INSERT affectedRows ',result.affectedRows);
                connection.release();
            });
        }
    );
    res.send();
});

router.post('/backstage/amend', function (req, res) {
    pool.getConnection(
        function (err, connection) {
            var sql = 'UPDATE test SET `username`=?, `password`=? WHERE id=?';
            var params = jsonSwitchArray(req.body.params);  // 获取页面转送参数，然后转换成数组
            connection.query(sql, params, function (err, result) {
                if (err) {
                    console.log('[UPDATE ERROR] - ',err.message);
                    return;
                }
                console.log('UPDATE affectedRows ',result.affectedRows);
                connection.release();
            });
        }
    );
    res.send();
});

router.get('/backstage/remove/:id', function (req, res) {
    pool.getConnection(
        function (err, connection) {
            var sql = 'DELETE FROM test where id=?';
            connection.query(sql, req.params.id, function (err, result) {
                if (err) {
                    console.log('[DELETE ERROR] - ',err.message);
                    return;
                }
                console.log('DELETE affectedRows ',result.affectedRows);
                connection.release();
            });
        }
    );
    res.send();
});

/**
 * 导出详情，后台数据
 */
router.post('/backstage/export', function (req, res) {
    res.send({ list:'Mess:aa 1121 3213 sdf;Mess:aasss 222222222;Mess:vvvvvv gggggg;Mess:sadasdasdasd;'+
        'Mess:6666666666;Mess:ggggggggggg;Mess:55555555555;Mess:gggggggggg;Mess:7777777777777;'+
        'Mess:ffffffffff;Mess:aaaaaaaaaa;Mess:dddddddddddd;Mess:vvvvvvvvvvv;Mess:bbbbbbbbbbbbb;'+
        'Mess:6666666666;Mess:kkkkkkkkkkkkk;Mess:hhhhhhhhhhhhh;Mess:mmmmmmmmmmmmmm;Mess:nnnnnnnnnnnnnn;'+
        'Mess:pppppppppppp;Mess:ooooooooooooooo;Mess:uuuuuuuuuuu;Mess:ttttttttttt;Mess:7777777777777;'+
        'Mess:6666666666;Mess:ggggggggggg;Mess:55555555555;Mess:gggggggggg;Mess:................;'+
        'Mess:6666666666;Mess:ggggggggggg;Mess:55555555555;Mess:gggggggggg;Mess:.................;'+
        'Mess:dfsdddddddddddd;Mess:yyyyyyjjjjjjjjjjj;Mess:(ghjghjsfdsfg);Mess:,,,,,,,,,,,,,,;Mess:7777777777777;'+
        'Mess:ffffffffff;Mess:aaaaaaaaaa;Mess:dddddddddddd;Mess:vvvvvvvvvvv;Mess:bbbbbbbbbbbbb;'+
        'Mess:6666666666;Mess:kkkkkkkkkkkkk;Mess:hhhhhhhhhhhhh;Mess:mmmmmmmmmmmmmm;Mess:nnnnnnnnnnnnnn;'+
        'Mess:pppppppppppp;Mess:ooooooooooooooo;Mess:uuuuuuuuuuu;Mess:ttttttttttt;Mess:7777777777777;'+
        'Mess:6666666666;Mess:ggggggggggg;Mess:55555555555;Mess:gggggggggg;Mess:................;'+
        'Mess:6666666666;Mess:ggggggggggg;Mess:55555555555;Mess:gggggggggg;Mess:.................;'+
        'Mess:dfsdddddddddddd;Mess:yyyyyyjjjjjjjjjjj;Mess:(ghjghjsfdsfg);Mess:,,,,,,,,,,,,,,;Mess:7777777777777;'+
        'Mess:ffffffffffffff;Mess:eeeeeeeeee;Mess:rrrrrrrrrrr;Mess:qqqqqqqqqqqq;Mess:kkkkkkkkkkkkkkkk;完毕'});
});

/**
 * 文件上传 forms/fileUpload
 * app.js中设置 multiparty
 */
router.post('/file/upload', multipartMiddleware, function (req, res, next) {
    var filePath = req.files.file.path;              // 获取上传的文件路径
    var fileName = req.files.file.originalFilename;  //获取上传的原文件名

    /**
     * fs.rename(oldPath/, newPath, [callback(err)])
     * oldPath      原路径
     * newPath      新路径
     * callback     回调，传递一个err异常参数
     */
    fs.rename(filePath, './api_server/storage/'+fileName, function (err) {
        if (err) {
            console.log('修改文件名失败！查看第二字段是否写错。');
            throw err;
        }
    });
    res.send();
});

/**
 * 解析上传的Excel文件
 * app.js中设置 multiparty
 */
router.post('/parsing/excel', multipartMiddleware, function (req, res, next) {
    var filePath = req.files.file.path;              // 获取上传的文件路径
    var fileName = req.files.file.originalFilename;  //获取上传的原文件名

    fs.rename(filePath, './api_server/storage/'+fileName, function (err) {
        if (err) { throw err; }
    });
    var workbook = xlsx.readFile('./api_server/storage/' + fileName);
    console.log('......................................../parsing/excel')
    res.send();
});

/**
 * 大文件分片上传 forms/fileUpload
 */
router.post('/file/shardUpload', multipartMiddleware, function (req, res, next) {
    var filePath = req.files.file.path;              //获取上传的文件路径
    var fileName = req.files.file.originalFilename;  //获取上传的原文件名
    // 读取上传的文件，将内容追加到 ./api_server/storage/ 目录下的原文件中，达到合并的目的
    fs.readFile(filePath, function (err, data) {
        if (err) throw err;

        fs.appendFile('./api_server/storage/' + fileName, data, function (err) {
            if (err) {
                console.log('合并文件时，追加内容出错！');
                throw err;
            }
            // 删除分片文件
            fs.unlink(filePath, function (err) {
                if (err) throw err;
            })
        });
    });
    res.send();
});

/**
 * 获取 ./api_server/storage/ 目录下的文件，并以 json 格式返回
 */
router.get('/getStorageFile', function (req, res, next) {
    var fileStats = [];
    var files = fs.readdirSync('./api_server/storage/');
    // 如果查看 ./api_server/storage/ 目录下存在文件，有文件情况下
    if (files.length !== 0) {
        for (var i = 0; i < files.length; i++) {
            // fs.stat 可以检查一个文件是否存在，并且能查看该文件的详情
            // statSync与stat相同，好处可以返回一个 fs.Stats 实例。
            var temp = fs.statSync('./api_server/storage/' + files[i]);
            temp['fileName'] = files[i];   //插入 fileName
            fileStats.push(temp);
        }
    }
    res.send(fileStats);
});

/**
 * 下载 ./api_server/storage/ 目录下的文件
 */
router.get('/downloadStorageFile', function (req, res, next) {
    res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename=WebUploadTest.zip'
        // 'Content-Length': stats.size
    });
    //+fileName   +encodeURI(fileName)
    res.download('./api_server/storage/WebUploadTest.zip');
    res.end();

    // res.set({
    //     "Content-type":"application/octet-stream",
    //     "Content-Disposition":"attachment;filename=WebUploadTest.zip"
    // });
    // let readStream = fs.createReadStream('./api_server/storage/WebUploadTest.zip');
    // readStream.on("data", (chunk) => res.write(chunk, 'binary') );
    // readStream.on("end",function () {
    //     res.end();
    // });
});

// table
router.post('/table/bt2', function (req, res) {
    res.send(bt.table2);
});

router.post('/table/jt1', function (req, res) {
    console.log('................................ /table/jt1 ')
    // res.send(bt.table2);
});

router.post('/table/jf1', function (req, res) {
    res.send(jf.table1);
});

router.post('/table/jf2', function (req, res) {
    res.send(jf.table2);
});

router.get('/table/grid', function (req, res) {
    res.send(jf.table1);
});

router.get('/echart/area', function (req, res) {
    res.send(ec.area);
});

/**
 * 取出json的值，将值转成数组类型
 * @param jsonData
 * @returns {Array}
 */
function jsonSwitchArray(jsonData) {
    var arr = new Array();
    for (var data in jsonData) {
        arr.push(jsonData[data]);
    }
    return arr;
}

module.exports = router;
