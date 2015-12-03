'use strict';

// load dependencies

// node core modules
var util = require('util');

// define avaliable loglevels
var logLevels = [
  'DEBUG', 'INFO', 'WARN', 'ERROR'
];

function Logger(label, options) {
  if (!(this instanceof Logger)) {
    return new Logger(label, options);
  }

  options = options || {};

  // default sink to process.stdout
  this.sink = options.sink && options.sink.write ? options.sink : process.stdout;

  // use template based on weather label was provided or not
  if (typeof label === 'string' && label) {
    this.template = util.format('%%s [%s] %%s', label); // level, label, message
    this.label = label;
  } else {
    this.template = '%s %s'; // level, message
  }
}

Logger.prototype.write = function (message) {
  this.sink.write(message + '\n');
};

logLevels.forEach(function (logLevel) {
  Logger.prototype[logLevel.toLowerCase()] = function () {
    this.write(util.format(this.template, logLevel, util.format.apply(util, arguments)));
  };
});

module.exports = function (label, options) {
  return new Logger(label, options);
};
