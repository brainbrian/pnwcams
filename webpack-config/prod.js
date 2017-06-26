/**
 * Webpack Production Specific Configuration
 */

/* eslint-disable camelcase */

const { resolve } = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('css/[name].css');

module.exports = function() {
  return webpackMerge(commonConfig(), {
    entry: {
      app: [
        // entry point of our app
        './scripts/index.js'
      ]
    },
    module: {
      rules: [{
        test: /\.(css|scss)$/,
        use: extractCSS.extract({
          fallback: "style-loader",
          use: [
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  resolve(__dirname, '../src/styles/')
                ]
              }
            }
          ]
        })
      }]
    },
    plugins: [
      extractCSS,
      new webpack.LoaderOptionsPlugin({minimize: true, debug: false}),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
      })
    ]
  });
};
