[![NPM info](https://nodei.co/npm/oniyi-logger.png?downloads=true)](https://nodei.co/npm/oniyi-logger.png?downloads=true)

> A simple loglevel and label wrapper around process.stdout


## Install

```sh
$ npm install --save oniyi-logger
```


## Usage

all log functions work similar to console.log() and can take multiple arguments in a printf()-like way. *Note* that the `debug()` method is a noop per default. To enable `debug()` logging, you must use a labled logger, and list the label in the `NODE_DEBUG` environment variable. `NODE_DEBUG` must be a comma`,` or space` ` separated list


```js
var fs = require('fs');

// standard use-case, will log to process.stdout
var logger = require('oniyi-logger')('my-awesome-module');

logger.info('my %s message', 'info');
// INFO [my-awesome-module] my info message
logger.debug('my debug message');
// Does not log anything
logger.warn('my warn message');
// WARN [my-awesome-module] my warn message
logger.error('my error message');
// ERROR [my-awesome-module] my error message


// log to a file
var labeledFileLog = require('oniyi-logger')('file', {sink: fs.createWriteStream('file.log, {flags: 'a'}')});

labeledFileLog.info('my info message');
// writes "INFO [file] my info message" to file.log
labeledFileLog.debug('my debug message');
// writes does not write anything to file.log
labeledFileLog.warn('my warn message');
// writes "WARN [file] my warn message" to file.log
labeledFileLog.error('my error message');
// writes "ERROR [file] my wrror message" to file.log

```

You can use nested lables to controle debug messages with finer granularity.

so with `process.env.NODE_DEBUG = 'foo:bar'`, you get this:

```
const oniyiLogger = require('oniyi-logger');
const fooLogger = oniyiLogger('foo');
const barLogger = oniyiLogger('foo:bar');

fooLogger.debug('my debug message');
// Does not log anything

barLogger.debug('my debug message');
// DEBUG [foo:bar] my debug message

```

and with `process.env.NODE_DEBUG = 'foo:*'`, you get this:

```
const oniyiLogger = require('oniyi-logger');
const fooLogger = oniyiLogger('foo');
const barLogger = oniyiLogger('foo:bar');

fooLogger.debug('my debug message');
// DEBUG [foo] my debug message

barLogger.debug('my debug message');
// DEBUG [foo:bar] my debug message

```

## License

Apache 2.0 © [Benjamin Kroeger]()
