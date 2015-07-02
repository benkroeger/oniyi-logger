// load dependencies

// node core modules
var util = require('util');

// define avaliable loglevels
var levels = [
  'DEBUG', 'INFO', 'WARN', 'ERROR'
];

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

  var logger = {};

  // create logging function for each level
  levels.forEach(function(level) {
    logger[level.toLowerCase()] = function() {
      console.log('%s [%s] %s', level, label, util.format.apply(util, arguments));
    };
  });

  return logger;
};
