'use strict';

var rollupPluginutils = require('rollup-pluginutils');
var compiler = require('riot-compiler');
compiler = 'default' in compiler ? compiler['default'] : compiler;
var assign = require('object-assign');
assign = 'default' in assign ? assign['default'] : assign;

function riot() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var frag = "import riot from 'riot';",
      ext = options.ext || 'tag',
      filter = rollupPluginutils.createFilter(options.include || '**/*.' + ext, options.exclude),
      skip = options.skip || false;

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
    transform: function transform(code, id) {
      if (!filter(id)) return null;
      return frag + compiler.compile(code, options);
    }
  };
}

module.exports = riot;