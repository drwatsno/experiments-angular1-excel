"use strict";
const webpack = require("webpack");
let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname + "/assets",
    entry: "./js",
    output: {
        path: __dirname + "/public",
        publicPath: "/",
        filename: "app.bundle.js"
    },

    watch: true,

    devtool: "source-map",

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style", "css!less")
            }
        ],
        noParse: /angular\/angular.js/
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new ExtractTextPlugin("app.bundle.css")
    ]
};
