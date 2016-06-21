'use strict';

let path = require('path');
let webpack = require('webpack');

let entry = './src/app/router.js';
let output = {
    path: __dirname,
    filename: 'router.js',
  };

module.exports.development = {
  debug: true,
  devtool: 'eval',
  entry: entry,
  output: output,
  // not working how I'd hoped, abandoning pushstate
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
  resolve: {
    fallback: [
      path.join(__dirname, './src/app/helpers'),
    ],
  },
  plugins: [
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        'window.jQuery': 'jquery',
        _: 'underscore',
        Backbone: 'backbone',
      }),
  ],
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.hbs$/, loader: 'handlebars-loader' },
    ],
  },
};
