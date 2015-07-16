// load dependencies

// node core modules
var util = require('util');

// define avaliable loglevels
var levels = [
  'DEBUG', 'INFO', 'WARN', 'ERROR'
];

function Logger(options) {
  options = options || {};
  this._sink = (options.sink && options.sink.write) ? options.sink : process.stdout;
  if (options.label) {
    this._label = options.label;
  }

  if (typeof this._label === 'string') {
    this._template = util.format('%%s [%s] %%s', this._label); // level, label, message
  } else {
    this._template = '%s %s'; // level, message
  }
}

Logger.prototype._write = function(message){
  this._sink.write(message + '\n');
};

levels.forEach(function(level){
  Logger.prototype[level.toLowerCase()] = function(){
    this._write(util.format(this._template, level, util.format.apply(util, arguments)));
  };
});

// create and export default logger (to stdout)
var logger = new Logger();
module.exports = logger;

// also export the constructor to allow others to create labelled loggers or even define their own sink
module.exports.Logger = Logger;