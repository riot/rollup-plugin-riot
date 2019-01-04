/* eslint-disable fp/no-delete */
import { extend, getFilter } from './helper'
import MagicString from 'magic-string'
import compiler from 'riot-compiler'

export default function riot(options) {
  // clone options
  options = Object.assign({}, options)

  const filter = getFilter(options)

  extend(compiler.parsers, options.parsers)

  // `exclude` is reserved by rollup, so we use `skip` instead
  options.exclude = options.skip || false

  // drop properties not necessary for Riot comipler
  delete options.ext
  delete options.include
  delete options.skip
  delete options.parsers
  delete options.sourcemap

  return {
    transform(src, id) {
      if (!filter(id)) {
        return null
      }

      const str = new MagicString(compiler.compile(src, options, id))
      const map = str.generateMap({
        source: id,
        hires: true,
        includeContent: true
      })

      return {
        code: str.prepend('import riot from \'riot\';').toString(),
        map
      }
    }
  }
}
