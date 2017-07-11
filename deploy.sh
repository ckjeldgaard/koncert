#!/usr/bin/env bash
set -ev

npm run lint
npm run build
npm run coverage:run
npm run codecov
