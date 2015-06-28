// load dependencies

// node core modules
var util = require('util');

// define avaliable loglevels
var levels = [
  'DEBUG', 'INFO', 'WARN', 'ERROR'
];

// make the main exported function a logger on level "INFO"
module.exports = function() {
  console.log('INFO %s', util.format.apply(util, arguments));
};

// create logging function for each level
levels.forEach(function(level) {
  module.exports[level.toLowerCase()] = function() {
    console.log('%s %s', level, util.format.apply(util, arguments));
  };
});

// create a logger that prefixes every statement with the provided label
module.exports.makeLabeledLogger = function(label) {
  
  // when there is no label provided, just return this module's exports
  if (typeof label !== 'string') {
    return module.exports;
  }

  // create a plain logger function
  var logger = function() {
    console.log('[%s] INFO %s', label, util.format.apply(util, arguments));
  };

  // create logging function for each level
  levels.forEach(function(level) {
    logger[level.toLowerCase()] = function() {
      console.log('[%s] %s %s', label, level, util.format.apply(util, arguments));
    };
  });

  return logger;
};
