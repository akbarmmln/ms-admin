'use strict';
require('dotenv').config();
const app = require('./app');
const moment = require('moment');
const logger = require('./config/logger');
const rp = require('request-promise');
// const shclr = require('./api/v1/sceduler/controller')
// Constants
let PORT = process.env.PORT || 8099;
let ENVIRONMENT = process.env.ENVIRONMENT
const server = app.listen(PORT, () => logger.debug(`API Server started. Listening on port:${PORT} - environment:${ENVIRONMENT}`));

module.exports = server;