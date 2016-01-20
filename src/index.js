import { createFilter } from 'rollup-pluginutils'
import compiler from 'riot-compiler'
import assign from 'object-assign'

export default function riot(options = {}) {
  const
    frag = "import riot from 'riot';",
    ext = options.ext || 'tag',
    filter = createFilter(options.include || `**/*.${ ext }`, options.exclude),
    skip = options.skip || false

  // clone options
  options = assign({}, options)

  // drop properties not necessary for Riot comipler
  delete options.include
  delete options.exclude
  delete options.skip
  delete options.ext

  // `exclude` is reserved by rollup, so we use `skip` instead
  options.exclude = skip

  return {
    transform (code, id) {
      if (!filter(id)) return null
      return frag + compiler.compile(code, options)
    }
  }
}
