import { createFilter } from 'rollup-pluginutils';
import compiler from 'riot-compiler';
import assign from 'object-assign';
import MagicString from 'magic-string';

function extend (src) {
  var args = arguments;
  for (var i = 1; i < args.length; ++i) {
    var obj = args[i];
    if (obj) {
      for (var key in obj) {
        if (typeof obj[key] === 'object' && typeof src[key] === 'object')
          { src[key] = extend(src[key], obj[key]); }
        else if (typeof obj[key] !== 'undefined')
          { src[key] = obj[key]; }
      }
    }
  }
  return src
}

function generateCode(code) {
  var prefix = "import riot from 'riot';";
  return prefix + code
}

function riot(options) {
  if ( options === void 0 ) options = {};

  var ext = options.ext || 'tag',
    filter = createFilter(options.include, options.exclude),
    skip = options.skip || false,
    parsers = options.parsers || {},
    re = new RegExp(("." + ext + "$"));

  extend(compiler.parsers, parsers);

  // clone options
  options = assign({}, options);

  // drop properties not necessary for Riot comipler
  delete options.include;
  delete options.exclude;
  delete options.skip;
  delete options.ext;
  delete options.parsers;
  delete options.sourcemap;

  // `exclude` is reserved by rollup, so we use `skip` instead
  options.exclude = skip;

  return {
    transform: function transform (src, id) {
      if (!re.test(id)) { return null }
      if (!filter(id)) { return null }
      var code = generateCode(compiler.compile(src, options, id));
      var map = new MagicString(code).generateMap({
        source: id,
        hires: true
      });

      return {
        code: code,
        map: map
      }
    }
  }
}

export default riot;
