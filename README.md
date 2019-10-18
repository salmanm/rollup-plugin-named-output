# rollup-plugin-named-output

## Install

```
npm i rollup-plugin-named-output -D
```

## Usage
and in `rollup.config.js`. Typically you'll want to use this plugin along side of [multi-input](https://www.npmjs.com/package/rollup-plugin-multi-input).

```js
import multiInput from 'rollup-plugin-multi-input';
import namedOutput from 'rollup-plugin-named-output';

export default {
    input: ['src/**/index.js'],
    output: {
      format: 'esm',
      dir: 'build'
    },
    plugins: [multiInput(), namedOutput()],
};
```

### Options

#### `mapper` (optional)
Type: (fileName) => newFileName

This is called for every output bundle with the `fileName`. It can either alter the output file name or return a falsy value to leave the file name unchanged.

## Motivation
When building libraries we may have a structure similar to the following in `src`.

```
.
├── Button
│   ├── Button.js
│   ├── index.js
├── Other
│   ├── Other.js
│   ├── index.js
├── Thing
│   ├── Thing.js
│   ├── index.js
...
```

And we use [multi-input](https://www.npmjs.com/package/rollup-plugin-multi-input) plugin with an input glob like `src/**/index.js` to allow us to have multiple entry points. The output that gets generated looks like this

```
.
├── Button
│   ├── index.js
├── Other
│   ├── index.js
├── Thing
│   ├── index.js
...
```

But what if we want the output to be named exactly like how we had in `src`?

## Solution

This plugin allows you to generate named output files. It's similar (or counterpart) to [`named-directory`](https://github.com/frostney/rollup-plugin-named-directory#rollup-plugin-named-directory) plugin, which allows you to take the named input.

Use case explained in the above section can be addressed using this plugin, simply use the plugin as described in the [Usage](#usage) section. You can also optionally pass in a [`mapper`](#mapper-optional) function if you want to customize the filename further.
