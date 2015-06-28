'use strict';
var assert = require('assert');
var oniyiLogger = require('../');

var stdout = process.stdout;

describe('oniyi-logger node module', function () {
  it('must log on level "INFO"', function () {
  	function verifyInfoLevel(data){
  		assert.equal(data, 'INFO foo', '"foo" was not logged on "INFO" level');
  		stdout.off(verifyInfoLevel);
  	}

  	stdout.on('data', verifyInfoLevel);

    oniyiLogger('foo');
  });
});
