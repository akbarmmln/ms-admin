require('dotenv').config();
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const schedule = require('node-schedule');
const logger = require('./config/logger');
const utils = require('./utils/utils');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({
  limit: '50mb',
  type: 'application/json'
}));
app.use(helmet());

const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: 'Microservice micros API',
      version: '1.0.0',
      description: 'Microservice of micros API for apps',
    },
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ['./api/v1/*/index.js'],
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/', require('./routes'));

app.use((req, res, next) => {
  const err = new Error('Route Not Found');
  res.status(err.status || 404);
  res.json({
    message: err.message,
    error: true,
  });
});

module.exports = app;