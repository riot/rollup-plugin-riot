const {expect} = require('chai')
const rollup = require('rollup').rollup
const fsp = require('fs-extra')
const { registerPreprocessor } = require('@riotjs/compiler')
const path = require('path')
const riot = require('..')
const cssnext = require('./helper/cssnext')

describe('rollup-plugin-riot', function() {
  const
    fixturesDir = path.join(__dirname, 'fixtures'),
    expectDir = path.join(__dirname, 'expect')

  function readExpectedString(name) {
    return fsp.readFile(path.join(expectDir, name.replace('.js', '.txt')), 'utf8')
      .then((content) => content)
  }

  function rollupRiot(filename, riotOpts, sourcemap) {
    const opts = {
      input: path.join(fixturesDir, filename),
      plugins: [riot(riotOpts || {})]
    }

    return rollup(opts).then((b) => b.generate({
      format: 'es',
      sourcemap
    })).then(({output}) => {
      const result = output[0]
      return sourcemap ? result : result.code
    })
  }

  it('single tag', function() {
    const filename = 'single.js'

    return Promise.all([rollupRiot(filename), readExpectedString(filename)])
      .then(([result, expected]) => {
        expect(result).to.have.string(expected)
      })
  })

  it('multiple tag', function() {
    const filename = 'multiple.js'

    return Promise.all([rollupRiot(filename), readExpectedString(filename)])
      .then(([result, expected]) => {
        expect(result).to.have.string(expected)
      })
  })

  it('multiple tag in single file', function() {
    const filename = 'multiple2.js'

    return Promise.all([rollupRiot(filename), readExpectedString(filename)])
      .then(([result, expected]) => {
        expect(result).to.have.string(expected)
      })
  })


  it('tag with another extension', function() {
    const filename = 'another-ext.js'
    const opts = { ext: 'html' }

    return Promise.all([rollupRiot(filename, opts), readExpectedString(filename)])
      .then(([result, expected]) => {
        expect(result).to.have.string(expected)
      })
  })

  it('compiles with custom parsers', function() {
    const filename = 'custom-parsers.js'
    registerPreprocessor('css', 'cssnext', cssnext)

    return Promise.all([rollupRiot(filename), readExpectedString(filename)])
      .then(([result, expected]) => {

        expect(result).to.have.string(expected)
      })
  })

  it('compiles with sourcemaps', function() {
    const filename = 'single.js'
    const opts = { sourcemap: true, globals: { riot: 'riot' } }

    return rollupRiot(filename, opts, true)
      .then((result) => {
        expect(result).to.be.an('object')
        expect(result).to.include.keys('map')
        expect(result.map).to.be.an('object')
      })
  })
})
