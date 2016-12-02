[![Build Status][travis-image]][travis-url]
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

# Rollup Plugin for Riot

Compiles tag files within rollup processes.

## Installation

```bash
$ npm install --save-dev rollup-plugin-riot
```

## Usage

```js
import riot  from 'rollup-plugin-riot'
export default {
  entry: 'src/main.js',
  dest: 'dist/bundle.js',
  plugins: [riot()]
}
```

## Options

You can specify some `options`:

```js
import riot  from 'rollup-plugin-riot'
const options = {
  ext: 'html'
}
export default {
  entry: 'src/main.js',
  dest: 'dist/bundle.js',
  plugins: [riot(options)]
}
```

- `ext`: extension of tag file (default is 'tag')
- `skip`: `exclude` on Riot API. Ex. `html`, `css` or `js`
- `include`: a minimatch pattern for including files.
- `exclude`: a minimatch pattern for excluding files.
- `parsers`: extends parsers (it works the same as [riot.config.js](http://riotjs.com/guide/compiler/#es6-config-file)).

And other options of `riot-compiler` could be used.

## Recipes

- https://github.com/riot/examples/tree/gh-pages/rollup

[travis-image]:https://img.shields.io/travis/riot/rollup-plugin-riot.svg?style=flat-square
[travis-url]:https://travis-ci.org/riot/rollup-plugin-riot

[license-image]:http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:LICENSE.txt

[npm-version-image]:http://img.shields.io/npm/v/rollup-plugin-riot.svg?style=flat-square
[npm-downloads-image]:http://img.shields.io/npm/dm/rollup-plugin-riot.svg?style=flat-square
[npm-url]:https://npmjs.org/package/rollup-plugin-riot
