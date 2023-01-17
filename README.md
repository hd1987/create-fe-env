# Frontend Environment Webpack5

## Code specification

Use eslint standard

## Develop with webpack

- install nodejs >= 16
- npm install
- run `npm start` to develop locally
- run `npm run build` to genarate dist files

## The directory structure

    dist (Automatically generated, example:)
    | example_page.bundle.js
    | myProject.css
    | myProject.js
    | ...
    node_modules
    | ...
    src
    | images
    | | ...
    | js
    | | modules (Automatic import)
    | | | example.js
    | | | ...
    | | pages (Manual import via main.js)
    | | | example.js
    | | utils (Public method)
    | | | exampleUtil.js
    | | | ...
    | | | index.js
    | | main.js
    | scss
    | | base
    | | | _breakpoints.scss
    | | | _reset.scss [2]
    | | | _variables.scss
    | | layout
    | | | example.scss
    | | mixins
    | | | _media-queries.scss [1]
    | | style.scss
    | | ...
    | index.js
    .babelrc.json
    .eslintcache
    .eslintrc.json
    .gitignore
    .prettierrc.json
    .stylelintrc.json
    favicon.ico
    index.html
    logo.svg
    package-lock.json
    package.json
    postcss.config.js
    README.md
    webpack.common.js
    webpack.dev.js
    webpack.prod.js

## Reference
1. [Breakpoints and media queries in SCSS](https://medium.com/codeartisan/breakpoints-and-media-queries-in-scss-46e8f551e2f2)
2. [normalize.css](github.com/necolas/normalize.css)