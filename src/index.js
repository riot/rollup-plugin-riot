/* eslint-disable fp/no-delete */
import { compile } from '@riotjs/compiler'
import { getFilter } from './helper'

export default function riot(options) {
  // clone options
  options = Object.assign({}, options)

  const filter = getFilter(options)

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

      const { code, map } = compile(src, {
        file: id,
        ...options
      })

      return { code, map }
    }
  }
}
