const
  postcss = require('postcss'),
  cssnext = require('postcss-cssnext')

module.exports = function(css) {
  return { code: postcss([cssnext]).process(css).css }
}
