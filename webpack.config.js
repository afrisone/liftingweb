/* eslint-disable no-var */
var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    './src/js/app.js'
  ],
  devtool: 'eval-source-map',
  output: {
    path: __dirname,
    filename: 'app.js',
    publicPath: '/js/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'src/js'),
      query: {
        presets: [
          "es2015"
        ],
        plugins: ["transform-decorators-legacy"]
      }
    }]
  }
}