/* eslint-disable fp/no-delete */
import { compile } from '@riotjs/compiler'
import { getFilter } from './helper'

export default function riot(options) {
  // clone options
  options = Object.assign({}, options)

  const filter = getFilter(options)

  // drop properties not necessary for Riot compiler
  ;['ext', 'include', 'parsers', 'sourcemap'].forEach((key) => {
    delete options[key]
  })

  return {
    transform(src, id) {
      if (!filter(id)) {
        return null
      }

      const { code, map } = compile(src, {
        file: id,
        ...options,
      })

      return { code, map }
    },
  }
}
