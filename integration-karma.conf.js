var BaseKarmaConfig = require('./karma.conf');
module.exports = function (config) {
  BaseKarmaConfig(config);
  config.set({
    files: [
      'tests/integration/integration_index.js',
    ],
    preprocessors: {
      'tests/integration/integration_index.js': ['webpack'],
    },
  });
};
