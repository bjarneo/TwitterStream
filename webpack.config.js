'use strict';

var webpack = require('webpack');
var path = require('path');

var production = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: 'eval',
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['jsx?harmony'], exclude: /node_modules/ }
        ],
        noParse: [/react/]
    },

    output: {
        path: path.join(__dirname, 'public', 'js'),
        filename: 'app.min.js',
        publicPath: '/public/js'
    },

    entry: path.join(__dirname, '/src/app.js'),

    plugins: production ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin()
    ] : [
        new webpack.NoErrorsPlugin()
    ]
};
