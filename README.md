# Koncert

[![Build Status](https://travis-ci.org/ckjeldgaard/koncert.svg?branch=master)](https://travis-ci.org/ckjeldgaard/koncert)
[![codecov](https://codecov.io/gh/ckjeldgaard/koncert/branch/master/graph/badge.svg)](https://codecov.io/gh/ckjeldgaard/koncert)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/ckjeldgaard/koncert/blob/master/LICENSE.txt)

> A progressive web app displaying Danish concerts.

## Tools and libraries

![Logos](https://i.imgur.com/28AMyei.png)

The web app is implemented using the JavaScript frontend framework [Vue.js](https://vuejs.org/) using [a CLI project template](https://github.com/ducksoupdev/vue-webpack-typescript) to set it up with [Webpack](https://webpack.github.io/) and [TypeScript](https://www.typescriptlang.org/).
[Firebase Realtime Database](https://firebase.google.com/) is used to store concerts, artists, provinces and genres.

### Other honorable mentions

* [Mocha.js](https://mochajs.org/): JavaScript test framework.
* [Chai](http://chaijs.com/) and [Sinon](http://sinonjs.org/) for creating test assertions and test doubles.
* [Karma](https://karma-runner.github.io/1.0/index.html) to run tests.
* [avoriaz](https://eddyerburgh.gitbooks.io/avoriaz/content/) to test Vue.js components.
* [Surface](https://mildrenben.github.io/surface/) - Material Design, CSS only framework.
* [sw-precache](https://github.com/GoogleChromeLabs/sw-precache) to create a Service Worker.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# lint the Typescript
npm run lint

# run the tests
npm test

# run the tests on changes
npm run test:watch

# run the test suite and generate a coverage report
npm run coverage

# build for production with minification
npm run build

# clean the production build
npm run clean
```
