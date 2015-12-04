/*eslint-env mocha */
'use strict';

var expect = require('chai').expect;
var loggerFactory = require('../lib');

// define a noop function
function noop() {}

// small fake stream class
function FakeStream() {
  this.writeCallback = noop;
}

FakeStream.prototype.onWrite = function onWrite(fn) {
  var self = this;
  if (typeof fn === 'function') {
    // allow each writeCallback only to be called once
    // override with noop directly afterwards
    self.writeCallback = function () {
      fn.apply(self, arguments);
      self.writeCallback = noop;
    };
  }
  return this;
};

FakeStream.prototype.write = function write(data) {
  this.writeCallback(data);
};

describe('unlabled logger', function () {
  // create fake streams for outSink and errSink
  var outSink = new FakeStream();
  var errSink = new FakeStream();

  // create the logger and define outSink
  var logger = loggerFactory(false, {
    outSink: outSink,
    errSink: errSink
  });

  // the test message
  var logMessage = 'foo';

  it('should log with level INFO', function (done) {
    outSink
      .onWrite(function verifyInfoLevel(data) {
        var re = new RegExp('^INFO\\s' + logMessage);
        expect(data).to.match(re, 'Wrong logLevel or message');
        done();
      });

    logger.info(logMessage);
  });

  it('should log with level DEBUG', function (done) {
    outSink
      .onWrite(function verifyDebugLevel(data) {
        var re = new RegExp('^DEBUG\\s' + logMessage);
        expect(data).to.match(re, 'Wrong logLevel or message');
        done();
      });

    logger.debug(logMessage);
  });

  it('should log with level WARN', function (done) {
    outSink
      .onWrite(function verifyWarnLevel(data) {
        var re = new RegExp('^WARN\\s' + logMessage);
        expect(data).to.match(re, 'Wrong logLevel or message');
        done();
      });

    logger.warn(logMessage);
  });

  it('should log with level ERROR', function (done) {
    errSink
      .onWrite(function verifyErrorLevel(data) {
        var re = new RegExp('^ERROR\\s' + logMessage);
        expect(data).to.match(re, 'Wrong logLevel or message');
        done();
      });

    logger.error(logMessage);
  });
});

describe('labled logger', function () {
  // create fake streams for outSink and errSink
  var outSink = new FakeStream();
  var errSink = new FakeStream();

  // create the logger and define outSink
  var loggerLabel = 'test-logger';
  var logger = loggerFactory(loggerLabel, {
    outSink: outSink,
    errSink: errSink
  });

  // the test message
  var logMessage = 'foo';

  it('should log with level INFO', function (done) {
    outSink
      .onWrite(function verifyInfoLevel(data) {
        var re = new RegExp('^INFO\\s\\[' + loggerLabel + '\\]\\s' + logMessage);
        expect(data).to.match(re, 'Wrong logLevel or message');
        done();
      });

    logger.info(logMessage);
  });

  it('should log with level DEBUG', function (done) {
    outSink
      .onWrite(function verifyDebugLevel(data) {
        var re = new RegExp('^DEBUG\\s\\[' + loggerLabel + '\\]\\s' + logMessage);
        expect(data).to.match(re, 'Wrong logLevel or message');
        done();
      });

    logger.debug(logMessage);
  });

  it('should log with level WARN', function (done) {
    outSink
      .onWrite(function verifyWarnLevel(data) {
        var re = new RegExp('^WARN\\s\\[' + loggerLabel + '\\]\\s' + logMessage);
        expect(data).to.match(re, 'Wrong logLevel or message');
        done();
      });

    logger.warn(logMessage);
  });

  it('should log with level ERROR', function (done) {
    errSink
      .onWrite(function verifyErrorLevel(data) {
        var re = new RegExp('^ERROR\\s\\[' + loggerLabel + '\\]\\s' + logMessage);
        expect(data).to.match(re, 'Wrong logLevel or message');
        done();
      });

    logger.error(logMessage);
  });
});
