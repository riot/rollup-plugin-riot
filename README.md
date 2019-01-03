# Rollup Plugin for Riot

[![Build Status][travis-badge]][travis-url]
[![MIT License][license-badge]][license-url]
[![NPM downloads][downloads-badge]][npm-url]
[![NPM version][npm-badge]][npm-url]

Compiles tag files within rollup processes.

## Installation

```bash
npm install rollup-plugin-riot riot-compiler -D
```

Requires riot-compiler v3.5.x and Rollup v0.56 or above.

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
- `include`: a [minimatch](https://www.npmjs.com/package/minimatch) pattern for including files.
- `exclude`: a minimatch pattern for excluding files.
- `parsers`: extends parsers (it works the same as [riot.config.js](http://riot.js.org/guide/compiler/#es6-config-file)).

And other options of `riot-compiler` could be used.

## Recipes

- https://github.com/riot/examples/tree/gh-pages/rollup

[travis-badge]:     https://img.shields.io/travis/riot/rollup-plugin-riot.svg?style=flat-square
[travis-url]:       https://travis-ci.org/riot/rollup-plugin-riot
[license-badge]:    https://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:      LICENSE
[npm-badge]:        https://img.shields.io/npm/v/rollup-plugin-riot.svg?style=flat-square
[npm-url]:          https://npmjs.org/package/rollup-plugin-riot
[downloads-badge]:  https://img.shields.io/npm/dm/rollup-plugin-riot.svg?style=flat-square
[downloads-url]:    https://npm-stat.com/charts.html?package=rollup-plugin-riot
