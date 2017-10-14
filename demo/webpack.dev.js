const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.jsx',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    port: 3030,
    hot: true,
    inline: true,
    compress: true,
    historyApiFallback: true,
    contentBase: 'dist/'
  }
}
