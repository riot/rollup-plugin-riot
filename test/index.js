import test     from 'ava'
import { rollup }   from 'rollup'
import fs       from 'fs'
import { join } from 'path'
import riot     from '../dist/rollup-plugin-riot.cjs.js'

const
  fixturesDir = join(__dirname, 'fixtures'),
  expectDir   = join(__dirname, 'expect'),
  expected    = name => fs.readFileSync(join(expectDir, name), 'utf8').trim(),
  rollupRiot  = (filename, options = {}) => rollup({
    entry: join(fixturesDir, filename),
    external: ['riot'],
    plugins: [riot(options)]
  })

test('single tag', t =>
  rollupRiot('single.js')
    .then(b => { t.is(b.generate().code, expected('single.js')) }))

test('multiple tag', t =>
  rollupRiot('multiple.js')
    .then(b => { t.is(b.generate().code, expected('multiple.js')) }))

test('multiple tag in single file', t =>
  rollupRiot('multiple2.js')
    .then(b => { t.is(b.generate().code, expected('multiple2.js')) }))

test('tag with another extension', t =>
  rollupRiot('another-ext.js', { ext: 'html' })
    .then(b => { t.is(b.generate().code, expected('another-ext.js')) }))

test('skip css', t =>
  rollupRiot('skip.js', { skip: ['css'] })
    .then(b => { t.is(b.generate().code, expected('skip.js')) }))
