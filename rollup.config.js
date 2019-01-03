const pkg = require('./package.json')
const external = Object.keys(pkg.dependencies)
const banner = `/*
  rollup-plugin-riot v${pkg.version}
  @license ${pkg.license}
*/
/*eslint-disable*/`

export default {
  input: pkg.source,
  plugins: [],
  external,
  output: [
    {
      banner,
      file: pkg.main,
      format: 'cjs',
      interop: false
    },
    {
      banner,
      file: pkg.module,
      format: 'es'
    }
  ]
}
