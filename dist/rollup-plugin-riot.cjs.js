'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rollupPluginutils = require('rollup-pluginutils');
var compiler = _interopDefault(require('riot-compiler'));
var assign = _interopDefault(require('object-assign'));

function riot(options) {
  if ( options === void 0 ) options = {};

  var
    frag = "import riot from 'riot';",
    ext = options.ext || 'tag',
    filter = rollupPluginutils.createFilter(options.include, options.exclude),
    skip = options.skip || false,
    re = new RegExp(("." + ext + "$"));

  // clone options
  options = assign({}, options);

  // drop properties not necessary for Riot comipler
  delete options.include;
  delete options.exclude;
  delete options.skip;
  delete options.ext;

  // `exclude` is reserved by rollup, so we use `skip` instead
  options.exclude = skip;

  return {
    transform: function transform (code, id) {
      if (!re.test(id)) { return null }
      if (!filter(id)) { return null }
      return frag + compiler.compile(code, options)
    }
  }
}

module.exports = riot;
