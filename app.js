const express = require('express');
const routes = require('./routes');
const logger = require('./tools/log4js');
const app = express();
const connection = require('./db/connection');
const ml = require('./configs/ml')

global.ml = ml;

// Use log4js.connetctLogger for request logging.
app.use(logger.originalLog4js.connectLogger(logger.accessLogger, {
  level: logger.originalLog4js.INFO
}))

// Init all the routes.
routes.init(app);

// Log uncaught exceptions.
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception: ', err)
  logger.errorLogger.error('Uncaught Exception: ', err);
})

// Log unhandled rejections.
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: ', p, 'reason: ', reason);
  logger.errorLogger.error('Unhandled Rejection at: ', p, 'reason: ', reason);
})

const server = app.listen(5000, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`API listening at http://${host}:${port}`);
});