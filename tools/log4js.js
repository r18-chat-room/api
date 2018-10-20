const log4js = require('log4js');

log4js.configure({
    appenders: {
        access: {
            type: 'file',
            filename: 'logs/access.log',
            maxLogSize: 1024
        },
        info: {
            type: 'file',
            filename: 'logs/info.log',
            maxLogSize: 1024
        },
        warn: {
            type: 'file',
            filename: 'logs/warn.log',
            maxLogSize: 1024
        },
        error: {
            type: 'file',
            filename: 'logs/debug.log',
            maxLogSize: 1024
        }
    },
    categories: {
        default: {
            appenders: ['info'],
            level: 'info'
        },
        access: {
            appenders: ['access'],
            level: 'info'
        },
        warn: {
            appenders: ['warn'],
            level: 'warn'
        },
        error: {
            appenders: ['error'],
            level: 'error'
        }
    }
});

module.exports = {
    originalLog4js: log4js,
    accessLogger: log4js.getLogger('access'),
    infoLogger: log4js.getLogger('info'),
    warnLogger: log4js.getLogger('warn'),
    errorLogger: log4js.getLogger('error')
}