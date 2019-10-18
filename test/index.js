/* eslint-env mocha */

import path from 'path'
import assert from 'assert'
import sinon from 'sinon'

import mapOutput from '../src'

describe('mapOutput plugin', () => {
  it('should export a function', () => {
    assert.equal(typeof mapOutput, 'function')
  })

  it('should return object with generateBundle', () => {
    assert.equal(typeof mapOutput().generateBundle, 'function')
  })

  describe('with default mapper', () => {
    it('should map output files correctly', () => {
      const resolver = mapOutput()

      const mockedBundle = {
        'keyA': {
          fileName: 'DirA/index.js'
        },
        'keyB': {
          fileName: 'DirB/index.js'
        },
        'keyC': {
          fileName: 'DirC/other.js'
        }
      }

      const returnVal = resolver.generateBundle({}, mockedBundle)

      assert.strictEqual(mockedBundle.keyA.fileName, 'DirA/DirA.js', 'should map filename')
      assert.strictEqual(mockedBundle.keyB.fileName, 'DirB/DirB.js', 'should map filename')
      assert.strictEqual(mockedBundle.keyC.fileName, 'DirC/other.js', 'should not map filename')
      assert.strictEqual(returnVal, null, 'should return null')
    })
  })

  describe('with custom mapper', () => {
    it('should pass each output file names to mapper', () => {
      const mapperStub = sinon.stub()
      mapperStub.onCall(0).returns('DirFoo/bar.js')
      mapperStub.onCall(1).returns(undefined)
      mapperStub.onCall(2).returns('file.js')

      const resolver = mapOutput({
        mapper: mapperStub
      })

      const mockedBundle = {
        'keyA': {
          fileName: 'DirA/index.js'
        },
        'keyB': {
          fileName: 'DirB/index.js'
        },
        'keyC': {
          fileName: 'DirC/other.js'
        }
      }

      const returnVal = resolver.generateBundle({}, mockedBundle)

      assert.ok(mapperStub.getCall(0).calledWithExactly('DirA/index.js'), 'should call mapper with filename')
      assert.ok(mapperStub.getCall(1).calledWithExactly('DirB/index.js'), 'should call mapper with filename')
      assert.ok(mapperStub.getCall(2).calledWithExactly('DirC/other.js'), 'should call mapper with filename')

      assert.strictEqual(mockedBundle.keyA.fileName, 'DirFoo/bar.js', 'should map filename')
      assert.strictEqual(mockedBundle.keyB.fileName, 'DirB/index.js', 'should retain original filename')
      assert.strictEqual(mockedBundle.keyC.fileName, 'file.js', 'should map filename')
    })
  })
})
