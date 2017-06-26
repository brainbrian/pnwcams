/**
 * Webpack Development Specific Configuration
 */

const { resolve } = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');
const SassLintPlugin = require('sasslint-webpack-plugin');

module.exports = function() {
  return webpackMerge(commonConfig(), {
    entry: {
      app: [
        // activate HMR for React
        'react-hot-loader/patch',
        // bundle the client for webpack-dev-server
        // connect to the provided endpoint
        'webpack-dev-server/client?http://localhost:8888',
        // bundle the client for hot reloading
        'webpack/hot/only-dev-server',
        // entry point of our app
        './scripts/index.js'
      ]
    },
    devtool: 'cheap-module-source-map',
    devServer: {
      hot: true, // enable HMR on the server
      contentBase: resolve(__dirname, '../dist'), // match the output path
      publicPath: '/assets/', // match the output `publicPath`
      host: 'localhost',
      port: 8888,
      historyApiFallback: true,
      noInfo: false
    },
    module: {
      rules: [{
        test: /\.(css|scss)$/,
        use: [{
          loader: 'style-loader',
          options: {
            // will turn on source maps when bug is fixed
            // https://github.com/webpack-contrib/css-loader/issues/296
            // https://github.com/webpack-contrib/css-loader/issues/232
            // http://stackoverflow.com/questions/37288886/webpack-background-images-not-loading
            // sourceMap: true
          }
        }, {
          loader: 'css-loader',
          options: {
            // sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            // sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            // sourceMap: true,
            includePaths: [
              resolve(__dirname, '../src/styles/')
            ]
          }
        }]
      }]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(), // enable HMR globally
      new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
      new SassLintPlugin({
        configFile: resolve(__dirname, '../.sass-lint.yml')
      })
    ]
  });
};
