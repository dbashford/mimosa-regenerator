mimosa-regenerator
===========

## Overview

This module uses [Facebook's regenerator tool](https://github.com/facebook/regenerator) to transpile ES6 generators to valid ES5.

For more information regarding Mimosa, see http://mimosa.io

## Usage

Add `'regenerator'` to your list of modules.  That's all!  Mimosa will install the module for you when you start `mimosa watch` or `mimosa build`.

## Functionality

During processing of JavaScript files, this module will compile your ES6 generator syntax to valid ES5 before the file is written to the destination directory.

The output ES5 code depends on a `wrapGenerator` function.  You could have that included in each file that gets transpiled.  Or you can choose to have that function written as a separate file. \

## Default Config

```javascript
regenerator: {
  includeRuntime: false,
  writeRuntime: true,
  runtimePath: 'wrapGenerator.js'
}
```

* `includeRuntime`: Whether or not to include the runtime library (which includes the `wrapGenerator` function) in the compiled output for each file.
* `writeRuntime`: whether or not to write the runtime as a separate file
* `runtimePath`: valid when `writeRuntime` is true. Where you would like the runtime library to be written. The path is relative to `watch.javascriptDir`.