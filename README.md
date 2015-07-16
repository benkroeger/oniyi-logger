[![NPM info](https://nodei.co/npm/oniyi-logger.png?downloads=true)](https://nodei.co/npm/oniyi-logger.png?downloads=true)

[![dependencies](https://david-dm.org/benkroeger/oniyi-logger.png)](https://david-dm.org/benkroeger/oniyi-logger.png)

> A simple loglevel wrapper around console.log


## Install

```sh
$ npm install --save oniyi-logger
```


## Usage

all log functions work similar to console.log() and can take multiple arguments in a printf()-like way


```js
var fs = require('fs');

// standard use-case, will log to process.stdout
var logger = require('oniyi-logger');

logger.info('my %s message', 'info');
logger.debug('my debug message');
logger.warn('my warn message');
logger.error('my error message');


// log with labels
var labeledLogger = logger.Logger({label: 'my label'});

labeledLogger.info('my info message');
labeledLogger.debug('my debug message');
labeledLogger.warn('my warn message');
labeledLogger.error('my error message');


// log to a file
var labeledFileLog = logger.Logger({label: 'file', sink: fs.createWriteStream('file.log, {flags: 'a'}')});

labeledFileLog.info('my info message');
labeledFileLog.debug('my debug message');
labeledFileLog.warn('my warn message');
labeledFileLog.error('my error message');

```


## License

MIT © [Benjamin Kroeger]()


[npm-image]: https://badge.fury.io/js/oniyi-logger.svg
[npm-url]: https://npmjs.org/package/oniyi-logger
[travis-image]: https://travis-ci.org/benkroeger/oniyi-logger.svg?branch=master
[travis-url]: https://travis-ci.org/benkroeger/oniyi-logger
[daviddm-image]: https://david-dm.org/benkroeger/oniyi-logger.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/benkroeger/oniyi-logger
