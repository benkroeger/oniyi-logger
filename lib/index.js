'use strict';

// load dependencies

// node core modules
var util = require('util');

// define avaliable loglevels
var logLevels = [{
  label: 'INFO',
  sink: 'out'
}, {
  label: 'WARN',
  sink: 'out'
}, {
  label: 'ERROR',
  sink: 'err'
}];

function Logger(label, options) {
  var self = this;
  options = options || {};

  // default sink to process.stdout
  self.outSink = options.outSink && options.outSink.write ? options.outSink : process.stdout;
  self.errSink = options.errSink && options.errSink.write ? options.errSink : process.stderr;

  // use template based on weather label was provided or not
  if (typeof label === 'string' && label) {
    self.template = util.format('%%s [%s] %%s', label); // level, label, message
    self.label = label;
  } else {
    self.template = '%s %s'; // level, message
  }

  // create methods for each logLevel, writing to the preferred sink
  logLevels.forEach(function (logLevel) {
    var sinkName = logLevel.sink ? logLevel.sink + 'Sink' : 'outSink';
    var sink = self[sinkName];
    self[logLevel.label.toLowerCase()] = function () {
      self.write(util.format(self.template, logLevel.label, util.format.apply(util, arguments)), sink);
    };
  });

  // Debug logging
  // Note: debug log statements will go th to errSink
  // disable debug per default
  self.debug = function noop() {};

  // enable debug logging only on loggers with label and if `NODE_DEBUG` contains `label`
  // in a comma or space separated list
  var re = new RegExp('[\s,]{0,1}' + self.label + '[\s,]{0,1}', 'i');
  if (self.label && process.env.NODE_DEBUG && re.test(process.env.NODE_DEBUG)) {
    self.debug = function debug() {
      self.write(util.format(self.template, 'DEBUG', util.format.apply(util, arguments)), self.errSink);
    };
  }
}

Logger.prototype.write = function (message, sink) {
  // default to outSink
  sink = sink || this.outSink;
  sink.write(message + '\n');
};

module.exports = function (label, options) {
  return new Logger(label, options);
};
