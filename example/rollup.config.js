import path from 'path'
import babel from 'rollup-plugin-babel'
import multiInput from 'rollup-plugin-multi-input'

import namedOutput from '../src/index'

export default {
  input: ['example/src/**/index.js'],
  output: {
    format: 'cjs',
    dir: path.join(__dirname, 'build')
  },
  plugins: [babel(), multiInput({ relative: 'example/src' }), namedOutput()]
}
