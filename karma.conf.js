var path = require('path');
var webpack = require('webpack');

module.exports = function (config) {
  config.set({

    basePath: '',

    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      'tests/unit/unit_index.js',
    ],

    reporters: ['dots'],

    preprocessors: {
      'tests/unit/unit_index.js': ['webpack'],
    },
    client: {
      captureConsole: true,
      mocha: {
        bail: true,
      },
    },
    webpack: {
      resolve: {
        fallback: [
          path.join(__dirname, './src/app/moriana/helpers'),
          path.join(__dirname, './src/app/shipments/helpers'),
        ],
      },
      module: {
        loaders: [
          { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
          { test: /\.hbs$/, loader: 'handlebars-loader' },
        ],
      },
      plugins: [
          new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            'window.jQuery': 'jquery',
            _: 'underscore',
            Backbone: 'backbone',
            chai: 'chai',
          }),
      ],
    },

    webpackMiddleware: {
      stats: {
        colors: true,
      },
      quiet: true,
    },

    reporters: ['spec'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_DEBUG,

    autoWatch: true,

    browserDisconnectTimeout: 10000,

    browserNoActivityTimeout: 30000,

    browsers: ['Chrome'],

    captureTimeout: 60000,

    singleRun: false,

    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-sinon'),
      require('karma-sourcemap-loader'),
      require('karma-spec-reporter'),
      require('karma-chrome-launcher'),
    ],
  });
};
