# Frontend Environment Webpack4
## Code specification

Use eslint standard

## Supprot Nodejs version

Support nodejs versions below v14

## Command

- `npm install` Install and execute once
- `npm run-script` build to production
- `npm start` watch js and scss css develop

## The directory structure

    dist
    |  font
    |  |  ...
    |  images
    |  |  ...
    |  js
    |  |  index.js
    |  css
    |  |  styles.css
    node_modules
    src
    |  font
    |  |  ...
    |  images
    |  |  ...
    |  js
    |  |  module
    |  |  |  loading.js
    |  |  |  ...
    |  |  index.js
    |  scss
    |  |  base
    |  |  |  ...
    |  |  function
    |  |  |  ...
    |  |  layout
    |  |  |  ...
    |  |  mixin
    |  |  |  ...
    |  |  _variables.scss
    |  |  styles.scss
    package.json
    webpack.config.js
    webpack.config.entry.js（Multiple js entry documents）