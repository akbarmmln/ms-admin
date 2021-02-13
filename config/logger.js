// 'use strict';
require('dotenv').config();
const log4js = require('log4js');
if(process.env.ENVIRONMENT !== 'LOCAL'){
  log4js.configure({
    appenders: { everything: { type: 'file', filename: '../log/ms-admin-running.log' } },
    categories: { default: { appenders: ['everything'], level: 'ALL' } }
  });  
}
const logger = log4js.getLogger();
logger.level = process.env.LOGGING_LEVEL ? process.env.LOGGING_LEVEL : 'debug';
module.exports = logger;

// if(process.env.ENVIRONMENT === 'LOCAL'){
//   const log4js = require('log4js');
//   const logger = log4js.getLogger();
//   logger.level = process.env.LOGGING_LEVEL ? process.env.LOGGING_LEVEL : 'debug';
//   module.exports = logger;
// }else{
//   const moment = require('moment');
//   const fs = require("fs");
//   const Logger = {};
//   let loggerStream;
//   loggerStream = fs.createWriteStream(`../log/ms-admin-${moment().format('YYYYMMDDHHmmssSSS')}.log`);
//   Logger.info = function(msg) {
//     var message = `[${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}] [INFO]` + " : " + msg + "\n";
//     loggerStream.write(message);
//   };
  
//   Logger.debug = function(msg) {
//     var message = `[${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}] [DEBUG]` + " : " + msg + "\n";
//     loggerStream.write(message);
//   };
  
//   Logger.error = function(msg) {
//     var message = `[${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}] [ERROR]` + " : " + msg + "\n";
//     loggerStream.write(message);
//   };
  
//   module.exports = Logger;
// }