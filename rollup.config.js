const banner = '/* Rollup Riot.js Plugin, @license MIT */'

export default {
  input: './src/index.js',
  output: [
    {
      banner,
      file: './dist/rollup-plugin-riot.cjs',
      format: 'cjs',
    },
    {
      banner,
      file: './dist/rollup-plugin-riot.js',
      format: 'es',
    },
  ],
}
