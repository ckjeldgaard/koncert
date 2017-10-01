var parseArgs = require('minimist');
var webpackConfig = require('./config/webpack.config.coverage');

var coverageThreshold = 20;

var args = parseArgs(process.argv.slice(2), {
  string: ['env'],
  default: {
    'env': 'mocha'
  }
});

var reporters = ['mocha', 'coverage'];

if (args.env === 'tc') {
  reporters = ['teamcity', 'coverage'];
}

if (args.env === 'jk') {
  reporters = ['junit', 'coverage'];
}

var configuration = {
  basePath: '',
  frameworks: ['mocha', 'chai-dom', 'chai', 'sinon'],
  files: [
    'node_modules/es6-promise/dist/es6-promise.auto.js',
    'test/test.ts'
  ],
  reporters: reporters,
  preprocessors: {
    'test/test.ts': ['webpack']
  },
  webpack: {
    devtool: 'inline-source-map',
    resolve: webpackConfig.resolve,
    module: webpackConfig.module
  },
  webpackServer: {
    noInfo: true
  },
  junitReporter: {
    outputDir: 'reports/'
  },
  coverageReporter: {
    reporters: [{
      type: 'json',
      dir: 'coverage/json',
      subdir: '.'
    }],
    includeAllSources: true,
    check: {
      global: {
        statements: coverageThreshold
      }
    }
  },
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
    }
  }
};

if(process.env.TRAVIS) {
  configuration.browsers = ['Chrome_travis_ci'];
}

module.exports = function(config) {
  configuration.logLevel = config.LOG_INFO;
  config.set(configuration);
};
