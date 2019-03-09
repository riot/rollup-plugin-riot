/*
  rollup-plugin-riot v4.0.0-alpha.1
  @license MIT
*/
/*eslint-disable*/
import { compile } from '@riotjs/compiler';
import { createFilter } from 'rollup-pluginutils';

const justExt = (file) => {
  const match = /[^/\\]\.([^./\\]*)$/.exec(file);
  return match ? match[1] : ''
};

function getFilter(opts) {
  const filter = createFilter(opts.include, opts.exclude);

  const exts = Array.isArray(opts.ext) ? opts.ext : [opts.ext || 'riot'];
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

      const { code, map } = compile(src, {
        file: id,
        ...options
      });

      return { code, map }
    }
  }
}

export default riot;
