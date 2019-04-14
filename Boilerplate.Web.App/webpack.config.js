﻿const env = process.env.NODE_ENV;
const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        app: './ReactScript/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'wwwroot/dist'),
        chunkFilename: '[name].bundle.js',
        publicPath: '/wwwroot'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(s?)css$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: { loader: "babel-loader" }
            },
            {
                test: /\.html$/,
                use: { loader: "html-loader" }
            },

            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'file-loader', options: {
                        name: '[name].[ext]',
                        outputPath: 'dist/',
                        publicPath: url => `../dist/${url}`
                    }
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader'
                }]
            }


        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            BLOG_API: JSON.stringify('http://localhost:58830')
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
        new ExtractTextPlugin(
            { filename: 'style.bundle.css', disable: false, allChunks: true }
        ),
        new HtmlWebPackPlugin({
            inject: false,
            hash: true,
            template: "./Views/Home/index.cshtml",
            filename: "index.html"
        })
    ]
};