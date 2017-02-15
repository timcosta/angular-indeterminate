const webpack = require('webpack');

module.exports = {
    entry: {
        'angular-indeterminate': './src/angular-indeterminate.js',
    },
    output: {
        path: './dist',
        filename: 'angular-indeterminate.js',
    },
    devtool: 'cheap-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['ng-annotate', 'babel-loader'],
            },
        ],
    },
};
