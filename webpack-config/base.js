/**
 * Webpack Shared Configuration
 */

const {join, resolve} = require('path');
const webpack = require('webpack');
const nodeEnv = process.env.NODE_ENV || 'development';
const isVerbose = process.env.npm_config_loglevel === 'verbose' ? true : false;
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function() {
  return {
    context: resolve(__dirname, '../src/'),
    output: {
      path: join(__dirname, '../dist/assets'),
      filename: 'js/[name].bundle.js',
      publicPath: '/assets/',
      sourceMapFilename: '[name].map'
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ],
        exclude: /node_modules/
      }, {
        test: /\.(jpg|png|svg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '/assets/images/',
            outputPath: 'images/'
          }
        }
      }, {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '/assets/fonts/',
            outputPath: 'fonts/'
          }
        }
      }, {
        test: /\.mp4$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '/assets/videos/',
            outputPath: 'videos/',
            mimetype: 'video/mp4'
          }
        }
      }]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          // set node environment to development to use react unminified
          // https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build
          'NODE_ENV': JSON.stringify(nodeEnv)
        }
      }),
      new CopyWebpackPlugin([
        {from: resolve(__dirname, '../src/assets/fonts/'), to: resolve(__dirname, '../dist/assets/fonts/')},
        {from: resolve(__dirname, '../src/assets/json/'), to: resolve(__dirname, '../dist/assets/json/')},
        {from: resolve(__dirname, '../src/assets/images/app-icons/'), to: resolve(__dirname, '../dist/assets/images/app-icons/')},
      ])
    ],
    // https://webpack.js.org/configuration/stats/
    stats: {
      assets: true,
      colors: true,
      hash: true,
      version: true,
      timings: true,
      chunks: isVerbose,
      chunkModules: isVerbose,
      cached: isVerbose,
      cachedAssets: isVerbose,
      warnings: isVerbose
    }
  };
};
