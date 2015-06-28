[![NPM info](https://nodei.co/npm/oniyi-logger.png?downloads=true)](https://nodei.co/npm/oniyi-logger.png?downloads=true)

[![dependencies](https://david-dm.org/benkroeger/oniyi-logger.png)](https://david-dm.org/benkroeger/oniyi-logger.png)

> A simple loglevel wrapper around console.log


## Install

```sh
$ npm install --save oniyi-logger
```


## Usage

```js
var logger = require('oniyi-logger');

logger('my info message');
logger.info('my info message');
logger.debug('my debug message');
logger.warn('my warn message');
logger.error('my error message');

var labeledLogger = logger.makeLabeledLogger('my label');

labeledLogger('my info message');
labeledLogger.info('my info message');
labeledLogger.debug('my debug message');
labeledLogger.warn('my warn message');
labeledLogger.error('my error message');

```


## License

MIT © [Benjamin Kroeger]()


[npm-image]: https://badge.fury.io/js/oniyi-logger.svg
[npm-url]: https://npmjs.org/package/oniyi-logger
[travis-image]: https://travis-ci.org/benkroeger/oniyi-logger.svg?branch=master
[travis-url]: https://travis-ci.org/benkroeger/oniyi-logger
[daviddm-image]: https://david-dm.org/benkroeger/oniyi-logger.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/benkroeger/oniyi-logger
