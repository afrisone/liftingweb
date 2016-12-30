/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');

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
};






// var path = require('path')
// var webpack = require('webpack');
//
// var BUILD_DIR = path.resolve(__dirname, 'src')
//
// var config = {
//   entry: `${BUILD_DIR}/js/app.js`,
//   output: {
//     path: BUILD_DIR,
//     filename: 'app.js'
//   },
//   module : {
//     loaders : [
//       {
//         test : /\.jsx?$/,
//         include : APP_DIR,
//         loader : 'babel-loader',
//         query: {
//           presets: ['es2015', 'react'],
//           plugins: ["transform-decorators-legacy"]
//         }
//       },
//       {
//         test: /\.scss$/,
//         loaders: ['style', 'css', 'sass']
//       }
//     ]
//   },
//   resolve : {
//     extensions: ['', '.scss', '.js']
//   }
// }
//
// module.exports = config
