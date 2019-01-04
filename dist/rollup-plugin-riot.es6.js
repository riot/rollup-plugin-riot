/*
  rollup-plugin-riot v2.1.0
  @license MIT
*/
/*eslint-disable*/
import { createFilter } from 'rollup-pluginutils';
import MagicString from 'magic-string';
import compiler from 'riot-compiler';

const justExt = (file) => {
  const match = /[^/\\]\.([^./\\]*)$/.exec(file);
  return match ? match[1] : ''
};

// eslint-disable-next-line fp/no-rest-parameters
function extend(src, ...args) {
  args
    .filter(Boolean)
    .forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object' && typeof src[key] === 'object')
          src[key] = extend(src[key], obj[key]);
        else if (typeof obj[key] !== 'undefined')
          src[key] = obj[key];
      });
    });
  return src
}

function getFilter(opts) {
  const filter = createFilter(opts.include, opts.exclude);

  const exts = Array.isArray(opts.ext) ? opts.ext : [opts.ext || 'tag'];
  if (!exts.length) {
    return filter
  }

  exts.forEach((e, i, arr) => {
    if (e[0] === '.') {
      arr[i] = e.substr(1);
    }
  });

  return (name) => filter(name) && exts.indexOf(justExt(name)) > -1
}

/* eslint-disable fp/no-delete */

function riot(options) {
  // clone options
  options = Object.assign({}, options);

  const filter = getFilter(options);

  extend(compiler.parsers, options.parsers);

  // `exclude` is reserved by rollup, so we use `skip` instead
  options.exclude = options.skip || false;

  // drop properties not necessary for Riot comipler
  delete options.ext;
  delete options.include;
  delete options.skip;
  delete options.parsers;
  delete options.sourcemap;

  return {
    transform(src, id) {
      if (!filter(id)) {
        return null
      }

      const str = new MagicString(compiler.compile(src, options, id));
      const map = str.generateMap({
        source: id,
        hires: true,
        includeContent: true
      });

      return {
        code: str.prepend('import riot from \'riot\';').toString(),
        map
      }
    }
  }
}

export default riot;
