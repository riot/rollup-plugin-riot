import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/index.js',
  plugins: [buble()],
  external: ['object-assign', 'riot-compiler', 'rollup-pluginutils'],
  targets: [
    { dest: 'dist/rollup-plugin-riot.cjs.js', format: 'cjs' },
    { dest: 'dist/rollup-plugin-riot.es6.js', format: 'es' }
  ]
}
