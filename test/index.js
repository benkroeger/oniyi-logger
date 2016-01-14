/* eslint-env mocha */
'use strict';

const expect = require('chai').expect;
const loggerFactory = require('../lib');

// define a noop function
function noop() {}

// small fake stream class
function FakeStream() {
  this.writeCallback = noop;
}

FakeStream.prototype.onWrite = function onWrite(fn) {
  const self = this;
  if (typeof fn === 'function') {
    // allow each writeCallback only to be called once
    // override with noop directly afterwards
    self.writeCallback = function writeCallback() {
      fn.apply(self, arguments);
      self.writeCallback = noop;
    };
  } else {
    self.writeCallback = noop;
  }
  return this;
};

FakeStream.prototype.write = function write(data) {
  this.writeCallback(data);
};

describe('unlabled logger', function unlabledLoggerTest() {
  // create fake streams for outSink and errSink
  const outSink = new FakeStream();
  const errSink = new FakeStream();

  // create the logger and define outSink
  const logger = loggerFactory(false, {
    outSink, errSink,
  });

  // the test message
  const logMessage = 'foo';

  it('should log with level INFO', function (done) {
    outSink
      .onWrite(function verifyInfoLevel(data) {
        const re = new RegExp('^INFO\\s' + logMessage);
        expect(data).to.match(re, 'Wrong logLevel or message');
        done();
      });

    logger.info(logMessage);
  });

  it('should NOT log with level DEBUG', function (done) {
    const timeout = setTimeout(function closeDebugTest() {
      errSink.onWrite(false);
      return done();
    }, 50);

    errSink
      .onWrite(function verifyDebugLevel(data) {
        clearTimeout(timeout);
        done(new Error('retrieved DEBUG statement: ' + data));
      });

    logger.debug(logMessage);
  });

  it('should log with level WARN', function (done) {
    outSink
      .onWrite(function verifyWarnLevel(data) {
        const re = new RegExp('^WARN\\s' + logMessage);
        expect(data).to.match(re, 'Wrong logLevel or message');
        done();
      });

    logger.warn(logMessage);
  });

  it('should log with level ERROR', function (done) {
    errSink
      .onWrite(function verifyErrorLevel(data) {
        const re = new RegExp('^ERROR\\s' + logMessage);
        expect(data).to.match(re, 'Wrong logLevel or message');
        done();
      });

    logger.error(logMessage);
  });
});

describe('labled logger', function labledLoggerTest() {
  // create fake streams for outSink and errSink
  const outSink = new FakeStream();
  const errSink = new FakeStream();

  // create the logger and define outSink
  const loggerLabel = 'test-logger';
  const logger = loggerFactory(loggerLabel, {
    outSink, errSink,
  });

  // the test message
  const logMessage = 'foo';

  it('should log with level INFO', function (done) {
    outSink
      .onWrite(function verifyInfoLevel(data) {
        const re = new RegExp('^INFO\\s\\[' + loggerLabel + '\\]\\s' + logMessage);
        expect(data).to.match(re, 'Wrong logLevel or message');
        done();
      });

    logger.info(logMessage);
  });

  it('should NOT log with level DEBUG', function (done) {
    const timeout = setTimeout(function closeDebugTest() {
      errSink.onWrite(false);
      return done();
    }, 50);

    errSink
      .onWrite(function verifyDebugLevel(data) {
        clearTimeout(timeout);
        done(new Error('retrieved DEBUG statement: ' + data));
      });

    logger.debug(logMessage);
  });

  it('should log with level WARN', function (done) {
    outSink
      .onWrite(function verifyWarnLevel(data) {
        const re = new RegExp('^WARN\\s\\[' + loggerLabel + '\\]\\s' + logMessage);
        expect(data).to.match(re, 'Wrong logLevel or message');
        done();
      });

    logger.warn(logMessage);
  });

  it('should log with level ERROR', function (done) {
    errSink
      .onWrite(function verifyErrorLevel(data) {
        const re = new RegExp('^ERROR\\s\\[' + loggerLabel + '\\]\\s' + logMessage);
        expect(data).to.match(re, 'Wrong logLevel or message');
        done();
      });

    logger.error(logMessage);
  });
});

describe('labled logger with debug enabled', function () {
  // create fake streams for outSink and errSink
  const outSink = new FakeStream();
  const errSink = new FakeStream();

  // create the logger and define outSink
  const loggerLabel = 'test-logger-debug';

  // remember original NODE_DEBUG value
  const nodeDebug = process.env.NODE_DEBUG;

  process.env.NODE_DEBUG =
    process.env.NODE_DEBUG ?
    process.env.NODE_DEBUG + ' ' + loggerLabel : loggerLabel;

  const logger = loggerFactory(loggerLabel, {
    outSink, errSink,
  });

  // the test message
  const logMessage = 'foo';

  it('should log with level DEBUG', function (done) {
    errSink
      .onWrite(function verifyDebugLevel(data) {
        const re = new RegExp('^DEBUG\\s\\[' + loggerLabel + '\\]\\s' + logMessage);
        expect(data).to.match(re, 'Wrong logLevel or message');
        done();
      });

    logger.debug(logMessage);
  });

  // restore NODE_DEBUG
  process.env.NODE_DEBUG = nodeDebug;
});
