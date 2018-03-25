const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackCommon = require('./webpack.config.common');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = merge(webpackCommon, {
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new cleanWebpackPlugin(['client/dist']),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('./style.css', {
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ]
});
