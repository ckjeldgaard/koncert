#!/usr/bin/env bash
set -ev

npm run lint
npm run e2e
npm run build
npm run codecov
