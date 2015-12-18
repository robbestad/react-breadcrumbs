var webpack = require('webpack');
var path = require('path');
var isProd = process.env.NODE_ENV === 'production';

var plugins = [];

module.exports = {
  devtool: !isProd && 'eval',
  entry: './index.jsx',
  output: {
    path: __dirname,
    filename: './bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: plugins
}
