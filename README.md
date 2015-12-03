[![NPM info](https://nodei.co/npm/oniyi-logger.png?downloads=true)](https://nodei.co/npm/oniyi-logger.png?downloads=true)

> A simple loglevel and label wrapper around process.stdout


## Install

```sh
$ npm install --save oniyi-logger
```


## Usage

all log functions work similar to console.log() and can take multiple arguments in a printf()-like way


```js
var fs = require('fs');

// standard use-case, will log to process.stdout
var logger = require('oniyi-logger')();

logger.info('my %s message', 'info');
// INFO my info message
logger.debug('my debug message');
// DEBUG my debug message
logger.warn('my warn message');
// WARN my warn message
logger.error('my error message');
// ERROR my error message


// log with labels
var labeledLogger = require('oniyi-logger')('my label');

labeledLogger.info('my info message');
// INFO [my label] my info message
labeledLogger.debug('my debug message');
// DEBUG [my label] my debug message
labeledLogger.warn('my warn message');
// WARN [my label] my warn message
labeledLogger.error('my error message');
// ERROR [my label] my error message


// log to a file
var labeledFileLog = require('oniyi-logger')('file', {sink: fs.createWriteStream('file.log, {flags: 'a'}')});

labeledFileLog.info('my info message');
// writes "INFO [file] my info message" to file.log
labeledFileLog.debug('my debug message');
// writes "DEBUG [file] my debug message" to file.log
labeledFileLog.warn('my warn message');
// writes "WARN [file] my warn message" to file.log
labeledFileLog.error('my error message');
// writes "ERROR [file] my wrror message" to file.log

```


## License

Apache 2.0 © [Benjamin Kroeger]()
