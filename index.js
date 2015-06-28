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