const
  postcss = require('postcss'),
  cssnext = require('postcss-cssnext')

module.exports = function(tagName, css) {
  // A small hack: it passes :scope as :root to PostCSS.
  // This make it easy to use css variables inside tags.
  css = css.replace(/:scope/g, ':root')
  css = postcss([cssnext]).process(css).css
  css = css.replace(/:root/g, ':scope')
  return css
}
