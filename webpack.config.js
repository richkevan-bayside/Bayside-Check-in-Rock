const webpack = require('webpack');
const  UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: './Scripts/index.js',
    output: {
        path: __dirname + '/Assets/Scripts',
        filename: 'index.min.js'
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
    mode: 'development'
}