
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: './Scripts/index.js',
    output: {
        path: __dirname + '/Assets/Scripts',
        filename: 'index.min.js',
        library: 'bcc'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /[\\/]node_modules[\\/]/,
                use: {
                    loader: 'babel-loader',       
                }
            }
        ]
    },
    mode: 'production'
}