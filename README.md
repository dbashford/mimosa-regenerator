mimosa-regenerator
===========

## Overview

This module uses [Facebook's regenerator tool](https://github.com/facebook/regenerator) to transpile ES6 generators to valid ES5.

For more information regarding Mimosa, see http://mimosa.io

## Usage

Add `'regenerator'` to your list of modules.  That's all!  Mimosa will install the module for you when you start `mimosa watch` or `mimosa build`.

## Functionality

During processing of JavaScript files, this module will compile your ES6 generator syntax to valid ES5 before the file is written to the destination directory.

The output ES5 code depends on a `wrapGenerator` function.  If you wish that function to be built into the compiled files, set includeRuntime to `true`

## Default Config

```javascript
regenerator:
  includeRuntime: false
```

* `includeRuntime`: Whether or not to include the runtime library (which includes the `wrapGenerator` function) in the compiled output for each file.

