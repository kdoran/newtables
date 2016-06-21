var BaseKarmaConfig = require('./karma.conf');
module.exports = function (config) {
  BaseKarmaConfig(config);
  config.set({
    files: [
      'tests/unit/unit_index.js',
    ],
    preprocessors: {
      'tests/unit/unit_index.js': ['webpack'],
    },
  });
};
