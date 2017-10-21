var webpackConfig = require('./config/webpack.config.test');

var configuration = {
  basePath: '',
  frameworks: ['mocha', 'chai-dom', 'chai', 'sinon'],
  files: [
    'node_modules/es6-promise/dist/es6-promise.auto.js',
    'test/test.ts'
  ],
  preprocessors: {
    'test/test.ts': ['webpack']
  },
  webpack: webpackConfig,
  webpackServer: { noInfo: true },
  reporters: ['mocha'],
  port: 9876,
  colors: true,
  autoWatch: false,
  browsers: ['ChromeHeadless'],
  mime: {
    'text/x-typescript': ['ts']
  },
  singleRun: true,
  customLaunchers: {
    Chrome_travis_ci: {
      base: 'Chrome',
      flags: ['--no-sandbox']
    },
    FirefoxHeadless: {
      base: 'Firefox',
      flags: [ '-headless' ],
    }
  }
};

if (process.env.TRAVIS) {
  configuration.browsers = ['Chrome_travis_ci'];
}

module.exports = function(config) {
  configuration.logLevel = config.LOG_INFO;
  config.set(configuration);
};
