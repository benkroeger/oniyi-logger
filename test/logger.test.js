/* eslint-disable import/imports-first */
'use strict';

// node core modules

// 3rd party modules
import test from 'ava';
import uid from 'uid';

// internal modules
import loggerFactory from '../lib';

function makeWriteValidator(re, resolve, reject) {
  return function write(data) {
    if (re.test(data)) {
      return resolve();
    }
    return reject('Wrong logLevel or message');
  };
}

function messageRegex(level, label, message) {
  return new RegExp(`^${level}\\s\\[${label}]\\s${message}`);
}

test('throws when called with non-string label', (t) => {
  function implementation() {
    loggerFactory(false);
  }

  t.throws(implementation);
});

test('throws when called with empty string label', (t) => {
  function implementation() {
    loggerFactory('');
  }

  t.throws(implementation);
});

test('writes deprecation message when calling enableDebug()', () =>
  new Promise((resolve, reject) => {
    const label = uid();
    const re = /enableDebug.+deprecated/;

    const logger = loggerFactory(label, {
      outSink: { write: makeWriteValidator(re, resolve, reject) },
    });

    logger.enableDebug();
  }));

test('returns same instance when re-using label', (t) => {
  const label = 'same-instance';
  const logger1 = loggerFactory(label);
  const logger2 = loggerFactory(label);

  t.is(logger1, logger2, 'instances are not the same');
});

test('writes "info" message to outSink', () =>
  new Promise((resolve, reject) => {
    const message = 'foo';
    const label = uid();
    const re = messageRegex('INFO', label, message);

    const logger = loggerFactory(label, {
      outSink: { write: makeWriteValidator(re, resolve, reject) },
    });

    logger.info(message);
  }));

test('writes "warn" message to outSink', () =>
  new Promise((resolve, reject) => {
    const message = 'foo';
    const label = uid();
    const re = messageRegex('WARN', label, message);

    const logger = loggerFactory(label, {
      outSink: { write: makeWriteValidator(re, resolve, reject) },
    });

    logger.warn(message);
  }));

test('writes "error" message to errSink', () =>
  new Promise((resolve, reject) => {
    const message = 'foo';
    const label = uid();
    const re = messageRegex('ERROR', label, message);

    const logger = loggerFactory(label, {
      errSink: { write: makeWriteValidator(re, resolve, reject) },
    });

    logger.error(message);
  }));

test('does not write "debug" messages', () =>
  new Promise((resolve, reject) => {
    const message = 'foo';
    const label = uid();

    const timeout = setTimeout(resolve, 50);

    function write() {
      clearTimeout(timeout);
      reject('should not call "write" on any of the sinks');
    }

    const logger = loggerFactory(label, {
      outSink: { write },
      errSink: { write },
    });

    logger.debug(message);
  }));

test('writes "debug" message to errSink when enabled', () =>
  new Promise((resolve, reject) => {
    const message = 'foo';
    const label = 'test-label';

    const { NODE_DEBUG } = process.env;
    process.env.NODE_DEBUG = `${(NODE_DEBUG || '')} ${label}`;

    const re = messageRegex('DEBUG', label, message);

    const logger = loggerFactory(label, {
      errSink: { write: makeWriteValidator(re, resolve, reject) },
    });

    logger.debug(message);
  }));
