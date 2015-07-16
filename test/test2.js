'use strict';
var fs = require('fs');

var writeFile = fs.createWriteStream('./file.log', {
	flags: 'a'
});
var oniyiLogger = require('../');

oniyiLogger.info('this should be on info level');
oniyiLogger.warn('this should be on warn level');
oniyiLogger.debug('this should be on debug level');
oniyiLogger.error('this should be on error level');

var labeledLogger = new oniyiLogger.Logger({label: 'my label', sink: writeFile});

labeledLogger.info('this should be on info level');
labeledLogger.warn('this should be on warn level');
labeledLogger.debug('this should be on debug level');
labeledLogger.error('this should be on error level');