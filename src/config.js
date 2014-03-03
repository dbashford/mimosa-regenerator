"use strict";

var path = require( "path" );

exports.defaults = function() {
  return {
    regenerator: {
      includeRuntime: false,
      writeRuntime: true,
      runtimePath: "wrapGenerator.js"
    }
  };
};

exports.placeholder = function() {
  return "\t\n\n" +
         "  regenerator:              # config settings for Facebook's regenerator tool, for\n" +
         "                            # transpiling ES6 generators to valid es5 code\n" +
         "    includeRuntime: false   # includes runtime\n" +
         "    writeRuntime: true      # whether or not to write the runtime as a separate file\n" +
         "    runtimePath: 'wrapGenerator.js'  # valid when writeRuntime is true. Where you would\n" +
         "                            # like the runtime to be written. The path is relative to\n" +
         "                            # watch.javascriptDir.\n";
};

exports.validate = function(config, validators) {
  var errors = [];

  if ( validators.ifExistsIsObject( errors, "regenerator config", config.regenerator ) ) {
    validators.ifExistsIsBoolean( errors, "regenerator.includeRuntime", config.regenerator.includeRuntime );

    if ( validators.ifExistsIsBoolean( errors, "regenerator.writeRuntime", config.regenerator.writeRuntime ) ) {
      if ( config.regenerator.writeRuntime ) {
        if ( validators.ifExistsIsString( errors, "regenerator.runtimePath", config.regenerator.runtimePath ) ) {
          var javascriptDir = path.join( config.watch.compiledDir, config.watch.javascriptDir );
          config.regenerator.fullRuntimePath = path.join( javascriptDir, config.regenerator.runtimePath );
        }
      }
    }
  }

  return errors;
};
