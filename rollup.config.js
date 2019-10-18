import babel from 'rollup-plugin-babel'

export default ['esm', 'cjs'].map(format => ({
  input: 'src/index.js',
  output: {
    format,
    file: `lib/index.${format}.js`
  },
  plugins: [babel()],
  external: ['fs', 'path']
}))
