'use strict';

// node core modules
const util = require('util');

// 3rd party modules

// internal modules
const { debugEnabled, enableDebugNamespaces } = require('./utils');

const loggerCatalog = {};

// define avaliable loglevels
const logLevels = [{
  label: 'INFO',
  sink: 'out',
}, {
  label: 'WARN',
  sink: 'out',
}, {
  label: 'ERROR',
  sink: 'err',
}];

function Logger(label, options) {
  const self = this;
  const loggerOptions = options || {};
  // default sink to process.stdout
  self.outSink = loggerOptions.outSink && loggerOptions.outSink.write ? loggerOptions.outSink : process.stdout;
  self.errSink = loggerOptions.errSink && loggerOptions.errSink.write ? loggerOptions.errSink : process.stderr;

  // use template based on weather label was provided or not
  self.template = util.format('%%s [%s] %%s', label); // level, label, message
  self.label = label;

  // create methods for each logLevel, writing to the preferred sink
  logLevels.forEach((logLevel) => {
    const sinkName = logLevel.sink ? `${logLevel.sink}Sink` : 'outSink';
    const sink = self[sinkName];
    self[logLevel.label.toLowerCase()] = function writeLevel(...args) {
      self.write(util.format(self.template, logLevel.label, util.format(...args)), sink);
    };
  });

  // Debug logging
  // Note: debug log statements will go th to errSink
  // disable debug per default
  self.debug = function noop() {
    return self;
  };

  // enable debug logging only on loggers with label and if `NODE_DEBUG` contains `label`
  // in a comma or space separated list
  if (self.label && (debugEnabled(self.label))) {
    self.debug = function debug(...args) {
      self.write(util.format(self.template, 'DEBUG', util.format(...args)), self.errSink);
      return self;
    };
  }
}

Logger.prototype.write = function loggerWrite(message, sink) {
  // default to outSink
  const activeSink = sink || this.outSink;
  activeSink.write(`${message}\n`);
  return this;
};

Logger.prototype.enableDebug = function enableDebug() {
  const self = this;
  self.warn('enableDebug() is deprecated. add "%s" to env var "NODE_DEBUG" instead', self.label);
  return self;
};

module.exports = function loggerFactory(label = '', options = {}) {
  if (!(label && typeof label === 'string')) {
    throw new TypeError('"label" must be a non-empty String');
  }

  enableDebugNamespaces(process.env.NODE_DEBUG);
  if (loggerCatalog[label]) {
    return loggerCatalog[label];
  }

  const instance = new Logger(label, options);
  loggerCatalog[label] = instance;
  return instance;
};
