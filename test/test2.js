'use strict';
var oniyiLogger = require('../');

oniyiLogger('this should be on info level');
oniyiLogger.info('this should be on info level');
oniyiLogger.warn('this should be on warn level');
oniyiLogger.debug('this should be on debug level');
oniyiLogger.error('this should be on error level');

var labeledLogger = oniyiLogger.makeLabeledLogger('my label');

labeledLogger('this should be on info level');
labeledLogger.info('this should be on info level');
labeledLogger.warn('this should be on warn level');
labeledLogger.debug('this should be on debug level');
labeledLogger.error('this should be on error level');