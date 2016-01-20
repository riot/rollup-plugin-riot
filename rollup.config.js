import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/index.js',
  plugins: [babel()],
  external: ['object-assign', 'riot-compiler', 'rollup-pluginutils']
}
