import { createFilter } from 'rollup-pluginutils'

const justExt = (file) => {
  const match = /[^/\\]\.([^./\\]*)$/.exec(file)
  return match ? match[1] : ''
}

// eslint-disable-next-line fp/no-rest-parameters
export function extend(src, ...args) {
  args
    .filter(Boolean)
    .forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object' && typeof src[key] === 'object')
          src[key] = extend(src[key], obj[key])
        else if (typeof obj[key] !== 'undefined')
          src[key] = obj[key]
      })
    })
  return src
}

export function getFilter(opts) {
  const filter = createFilter(opts.include, opts.exclude)

  const exts = Array.isArray(opts.ext) ? opts.ext : [opts.ext || 'tag']
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
