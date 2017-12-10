import { createFilter } from 'rollup-pluginutils'
import compiler from 'riot-compiler'
import assign from 'object-assign'
import { extend } from './helper'
import MagicString from 'magic-string'

function generateCode(code) {
  const prefix = "import riot from 'riot';"
  return prefix + code
}

export default function riot(options = {}) {
  const ext = options.ext || 'tag',
    filter = createFilter(options.include, options.exclude),
    skip = options.skip || false,
    parsers = options.parsers || {},
    re = new RegExp(`.${ ext }$`)

  extend(compiler.parsers, parsers)

  // clone options
  options = assign({}, options)

  // drop properties not necessary for Riot comipler
  delete options.include
  delete options.exclude
  delete options.skip
  delete options.ext
  delete options.parsers
  delete options.sourcemap

  // `exclude` is reserved by rollup, so we use `skip` instead
  options.exclude = skip

  return {
    transform (src, id) {
      if (!re.test(id)) return null
      if (!filter(id)) return null
      const code = generateCode(compiler.compile(src, options, id))
      const map = new MagicString(code).generateMap({
        source: id,
        hires: true
      })

      return {
        code,
        map
      }
    }
  }
}
