var path = require( 'path' )
  , fs = require( 'fs' )
  , wrench = require ( 'wrench' )
  , regenerator = require( "regenerator" )
  , config = require( './config' )
  , hasGenerator = /\bfunction\s*\*/
  , wroteRuntime = false
  , logger = null;

var _writeRuntime = function ( mimosaConfig ) {
  fs.exists( mimosaConfig.regenerator.fullRuntimePath, function ( exists ) {
    if ( !exists ) {
      var dirname = path.dirname( mimosaConfig.regenerator.fullRuntimePath );
      fs.exists( dirname, function( dirExists ) {
        if ( !dirExists ) {
          wrench.mkdirSyncRecursive( dirname, 0777 );
        }
        fs.readFile( regenerator.runtime.dev, function( err, text) {
          if ( err ) {
            logger.error( "mimosa-regenerator could not read runtime text at [[ " + regenerator.runtime.dev + " ]], " + err);
          } else {
            fs.writeFile( mimosaConfig.regenerator.fullRuntimePath, text, function( err ) {
              if ( err ) {
                logger.error( "mimosa-regenerator could not write [[ " + mimosaConfig.regenerator.fullRuntimePath + " ]], " + err);
              } else {
                logger.info( "mimosa-regenerator wrote [[ " + mimosaConfig.regenerator.fullRuntimePath + " ]]" );
              }
            });
          }
        });
      });
    }
  });
};

var _regenerate = function ( mimosaConfig, options, next ) {
  var hasFiles = options.files && options.files.length > 0;
  if ( !hasFiles ) {
    return next();
  }

  var includeRuntime = mimosaConfig.regenerator.includeRuntime
    , madeTransform = false;

  options.files.forEach( function( file ) {
    if ( hasGenerator.test(file.outputFileText) ) {
      try {
        var outText = regenerator( file.outputFileText, { includeRuntime: includeRuntime } );
        file.outputFileText = outText;
        madeTransform = true;
      } catch ( err ) {
        logger.error( "Could not run ES6 generator transpile on source. Error: ", err );
      }
    }
  });

  // if haven't already written it, and a transform was made and configured
  // to write the runtime, the write runtime lib
  if ( !wroteRuntime && madeTransform && mimosaConfig.regenerator.writeRuntime ) {
    _writeRuntime( mimosaConfig );
  }

  next();
};

var registration = function (mimosaConfig, register) {
  logger = mimosaConfig.log;
  register(
    ['add','update','buildFile'],
    'afterCompile',
    _regenerate,
    mimosaConfig.extensions.javascript );
};

module.exports = {
  registration: registration,
  defaults: config.defaults,
  placeholder: config.placeholder,
  validate: config.validate
};