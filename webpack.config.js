/**
 * Created by huangminxuan on 2016/9/12.
 * 作用如同常规的 Gruntfile.js，告诉 webpack 它需要做什么。
 */
var webpack = require('webpack');

module.exports = {
    plugins: [
        // 去除代码块内的告警语句
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // 优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.OccurenceOrderPlugin()
    ],
    entry: {
        index : './src/script/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: './dist'
    }
}