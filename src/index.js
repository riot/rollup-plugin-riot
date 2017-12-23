import { createFilter } from 'rollup-pluginutils'
import compiler from 'riot-compiler'
import assign from 'object-assign'
import { extend } from './helper'
import MagicString from 'magic-string'

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

      const str = new MagicString(compiler.compile(src, options, id))
      const map = str.generateMap({
        source: id,
        hires: true,
        includeContent: true
      })

      return {
        code: str.prepend("import riot from 'riot';").toString(),
        map
      }
    }
  }
}
