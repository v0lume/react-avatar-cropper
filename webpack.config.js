var path = require('path');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './example/src/index.js']
  },

  output: {
    path: './build',
    filename: 'bundle.js',
    publicPath: '/assets/'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?optional=es7.objectRestSpread'},
    ]
  },

  devServer: {
    contentBase: './example',
    host: 'localhost',
    inline: true,
    info: false
  }
};
