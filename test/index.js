const expect = require('expect.js')
const rollup = require('rollup').rollup
const fsp = require('fs-extra')
const path = require('path')
const riot = require('..')
const cssnext = require('./helper/cssnext')

describe('rollup-plugin-riot', function() {
  const
    fixturesDir = path.join(__dirname, 'fixtures'),
    expectDir = path.join(__dirname, 'expect')

  function normalize(str) {
    return str.trim().replace(/[\n\r]+/g, '')
  }

  function readFile(name) {
    return fsp.readFile(path.join(expectDir, name), 'utf8')
      .then((content) => normalize(content))
  }

  function rollupRiot(filename, riotOpts, sourcemap) {
    const opts = {
      input: path.join(fixturesDir, filename),
      external: ['riot'],
      plugins: [riot(riotOpts || {})]
    }

    return rollup(opts).then((b) => b.generate({
      format: 'es',
      sourcemap
    })).then((result) => {
      expect(result).to.be.an('object')
      expect(result).to.have.property('code')
      result.code = normalize(result.code)
      return sourcemap ? result : result.code
    })
  }

  it('single tag', function() {
    const filename = 'single.js'

    return Promise.all([rollupRiot(filename), readFile(filename)])
      .then(([result, expected]) => {
        expect(result).to.be(expected)
      })
  })

  it('multiple tag', function() {
    const filename = 'multiple.js'

    return Promise.all([rollupRiot(filename), readFile(filename)])
      .then(([result, expected]) => {
        expect(result).to.be(expected)
      })
  })

  it('multiple tag in single file', function() {
    const filename = 'multiple2.js'

    return Promise.all([rollupRiot(filename), readFile(filename)])
      .then(([result, expected]) => {
        expect(result).to.be(expected)
      })
  })


  it('tag with another extension', function() {
    const filename = 'another-ext.js'
    const opts = { ext: 'html' }

    return Promise.all([rollupRiot(filename, opts), readFile(filename)])
      .then(([result, expected]) => {
        expect(result).to.be(expected)
      })
  })

  it('skip css', function() {
    const filename = 'skip.js'
    const opts = { skip: ['css'] }

    return Promise.all([rollupRiot(filename, opts), readFile(filename)])
      .then(([result, expected]) => {
        expect(result).to.be(expected)
      })
  })

  it('es6 import inside tag', function() {
    const filename = 'es6-in-tag.js'

    return Promise.all([rollupRiot(filename), readFile(filename)])
      .then(([result, expected]) => {
        expect(result).to.be(expected)
      })
  })

  it('compiles with custom parsers', function() {
    const filename = 'custom-parsers.js'
    const opts = { style: 'cssnext', parsers: { css: { cssnext } } }

    return Promise.all([rollupRiot(filename, opts), readFile(filename)])
      .then(([result, expected]) => {
        expect(result).to.be(expected)
      })
  })

  it('compiles with sourcemaps', function() {
    const filename = 'single.js'
    const opts = { sourcemap: true, globals: { riot: 'riot' } }

    return rollupRiot(filename, opts, true)
      .then((result) => {
        expect(result).to.be.an('object').ok()
        expect(result).to.have.property('map')
        expect(result.map).to.be.an('object').ok()
      })
  })
})
