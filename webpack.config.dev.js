const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackCommon = require('./webpack.config.common');

module.exports = merge(webpackCommon, {
  mode: 'development',
  devServer: {
    contentBase: './client/public'
  },
  devtool: 'inline-sourcemap',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /(\.s?css)$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
});
