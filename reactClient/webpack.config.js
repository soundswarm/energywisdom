var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname);

var config = {
  entry: APP_DIR + '/main.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      { test : /\.js?/, include : APP_DIR, exclude: /node_modules/, loader : 'babel' }
    ]
  }
};

module.exports = config;