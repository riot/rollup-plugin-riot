export function extend (src) {
  var args = arguments
  for (var i = 1; i < args.length; ++i) {
    const obj = args[i]
    if (obj) {
      for (var key in obj) {
        if (typeof obj[key] === 'object' && typeof src[key] === 'object')
          src[key] = extend(src[key], obj[key])
        else if (typeof obj[key] !== 'undefined')
          src[key] = obj[key]
      }
    }
  }
  return src
}
