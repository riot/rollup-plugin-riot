/* eslint-disable fp/no-delete */
import { compile } from '@riotjs/compiler'
import { getFilter } from './helper'

function generateHotReloadCode() {
  return `
const __riot_hot_reload__ = (component) =>
  import('@riotjs/hot-reload').then(({ default: hotReload }) =>
    hotReload(component),
  )

if (import.meta.hot) {
  import.meta.hot.accept((mod) => {
    if (mod && mod.default) {
      __riot_hot_reload__(mod.default)
    }
  })
} else if (typeof module !== 'undefined' && module.hot) {
  module.hot.accept()
}
`
}

export default function riot(options) {
  // clone options
  options = Object.assign({}, options)

  const filter = getFilter(options)
  const hot = options.hot

  // drop properties not necessary for Riot compiler
  ;['ext', 'include', 'parsers', 'sourcemap', 'hot'].forEach((key) => {
    delete options[key]
  })

  return {
    name: 'riot',
    transform(src, id) {
      if (!filter(id)) {
        return null
      }

      const { code, map } = compile(src, {
        file: id,
        ...options,
      })

      if (hot) {
        return {
          code: `${code}\n${generateHotReloadCode()}`,
          map,
        }
      }

      return { code, map }
    },
  }
}
