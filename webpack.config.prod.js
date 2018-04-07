const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackCommon = require('./webpack.config.common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = merge(webpackCommon, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new ExtractTextPlugin('./style.css', {
      allCunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ],
  module: {
    rules: [
      {
        test: /(\.s?css)$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      }
    ]
  }
});
