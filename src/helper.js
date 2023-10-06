import { createFilter } from '@rollup/pluginutils'

const justExt = (file) => {
  const match = /[^/\\]\.([^./\\]*)$/.exec(file)
  return match ? match[1] : ''
}

export function getFilter(opts) {
  const filter = createFilter(opts.include, opts.exclude)

  const exts = Array.isArray(opts.ext) ? opts.ext : [opts.ext || 'riot']
  if (!exts.length) {
    return filter
  }

  exts.forEach((e, i, arr) => {
    if (e[0] === '.') {
      arr[i] = e.substr(1)
    }
  })

  return (name) => filter(name) && exts.indexOf(justExt(name)) > -1
}
