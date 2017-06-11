'use strict';

const path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'dev';

module.exports = {

    entry: './app/index.js',
    output: {
        filename: 'bundle.js',
        publicPath: '/dist/',
        path: path.resolve(__dirname, 'dist')
    },

    watch: NODE_ENV == 'dev',

    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'app'),
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader',
                include: path.resolve(__dirname, 'app')
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
            //PointTarget: 'react-point'
        })
    ],

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx']
    },
    resolveLoader: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx']
    }
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                sequences : true,
                booleans : true,
                loops : true,
                unused : true,
                warnings : false,
                drop_console : true,
                unsafe : true
            }
        })
    );
}