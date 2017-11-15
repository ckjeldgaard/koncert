# Koncert

[![Build Status](https://travis-ci.org/ckjeldgaard/koncert.svg?branch=master)](https://travis-ci.org/ckjeldgaard/koncert)
[![codecov](https://codecov.io/gh/ckjeldgaard/koncert/branch/master/graph/badge.svg)](https://codecov.io/gh/ckjeldgaard/koncert)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/ckjeldgaard/koncert/blob/master/LICENSE.txt)
[![Cypress.io tests](https://img.shields.io/badge/cypress.io-tests-green.svg?style=flat-square)](https://dashboard.cypress.io/#/projects/88qhw8)

> A progressive web app displaying Danish concerts.

Watch it online on [ckjeldgaard.github.io/koncert/](https://ckjeldgaard.github.io/koncert/#/).

![Screenshots](https://imgur.com/fXUfYtp.png)

## Features

* Displays the concerts from the [Heavymetal.dk concert calendar](http://heavymetal.dk/koncertkalender).
* Search for a specific concert or filter by province or genre.
* Sign up for push notifications and receive a message when there's a new concert with a favorite artist.

## Tools and libraries

![Logos](https://i.imgur.com/28AMyei.png)

The web app is implemented using the JavaScript frontend framework [Vue.js](https://vuejs.org/) using [a CLI project template](https://github.com/ducksoupdev/vue-webpack-typescript) to set it up with [Webpack](https://webpack.github.io/) and [TypeScript](https://www.typescriptlang.org/).
[Firebase Realtime Database](https://firebase.google.com/) is used to store concerts, artists, provinces and genres.

### Other honorable mentions

* [Jest](http://facebook.github.io/jest/): JavaScript test framework.
* [vue-test-utils](https://vue-test-utils.vuejs.org/) to test Vue.js components.
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

# run the unit tests
npm test

# run the end-to-end tests
npm e2e

# build for production with minification
npm run build

# clean the production build
npm run clean
```
