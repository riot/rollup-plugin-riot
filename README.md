# Rollup Plugin for Riot

[![Build Status][ci-image]][ci-url]
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

Compiles tag files within rollup processes.

## Important

If you are using Riot.js < 4.0.0 please check the [v3 branch](https://github.com/riot/rollup-plugin-riot/tree/v3)

## Installation

```bash
npm install rollup-plugin-riot @riotjs/compiler -D
```

Requires @riotjs/compiler > 4.x.x and Rollup v1.x.x or above.

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

- `ext`: extension of tag file (default is 'riot')
- `include`: a [minimatch](https://www.npmjs.com/package/minimatch) pattern for including files.
- `exclude`: a minimatch pattern for excluding files.

And other options of `@riotjs/compiler` could be used.

## Recipes

- https://github.com/riot/examples/tree/gh-pages/rollup


[ci-image]:https://img.shields.io/github/actions/workflow/status/riot/rollup-plugin-riot/test.yml?style=flat-square
[ci-url]:https://github.com/riot/rollup-plugin-riot/actions

[license-image]:https://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:LICENSE

[npm-version-image]:https://img.shields.io/npm/v/rollup-plugin-riot.svg?style=flat-square
[npm-downloads-image]:https://img.shields.io/npm/dm/rollup-plugin-riot.svg?style=flat-square
[npm-url]:https://npmjs.org/package/rollup-plugin-riot
