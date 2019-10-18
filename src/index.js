import path from 'path'

const DEFAULT_MAPPER = (fileName) => {
  if (!fileName.endsWith('/index.js')) return

  const dirName = path.basename(path.dirname(fileName))
  return fileName.replace('/index.js', `/${dirName}.js`)
}

const DEFAULT_OPTIONS = {
  mapper: DEFAULT_MAPPER
}

export default function namedOutput ({
  mapper = DEFAULT_MAPPER
} = DEFAULT_OPTIONS) {
  return {
    generateBundle (options, bundle) {
      const keys = Object.keys(bundle)
      keys.forEach((key) => {
        const obj = bundle[key]
        obj.fileName = mapper(obj.fileName) || obj.fileName
      })

      return null
    }
  }
}
