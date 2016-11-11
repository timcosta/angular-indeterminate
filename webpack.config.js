const webpack = require('webpack');

module.exports = {
    entry: {
        'angular-indeterminate': './angular-indeterminate.js',
    },
    output: {
        path: './',
        filename: 'index.js',
    },
    devtool: 'cheap-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
};
