const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    './client/index.js'],
  output: {
    path: path.join(__dirname, 'client/dist/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        enforce: 'pre',
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        include: path.join(__dirname, '/client'),
        exclude: /node_modules/,
      },
      {
        test: /(\.s?css)$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.woff2(\?\S*)?$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.woff(\?\S*)?$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/octet-stream'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?name=/assets/img/[name].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        }],
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  node: {
    dns: 'empty',
    net: 'empty',
    fs: 'empty'
  }
};
