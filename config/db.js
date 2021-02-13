'use strict';
const Sequelize = require('sequelize');
const settings = require('../setting').mysql;
const logger = require('./logger');
const utils = require('../utils/utils');
const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};

const sequelize = new Sequelize(settings.dbname, settings.username, settings.password, {
  operatorsAliases,
  host: settings.hostname,
  dialect: 'mysql',
  pool: {
    max: 3000,
    min: 0,
    acquire: 30000,
    idle: 30000,
    idleTimeoutMillis: 3000,
    evict: 30000
  },
  // logging: console.log,
  logging: (sql, queryObject) => {
    utils.sendToElasticAndLogToConsole(sql, queryObject)
  },
  logging: true,
  // logging: '',
  logging: logger.debug.bind(logger),
  timezone: '+07:00'
});

sequelize.authenticate()
  .then(() => {
    logger.debug('Connection has been established successfully.')
  })
  .catch(err => {
    logger.error(`Unable to connect to the database: ${err}`)
  });

module.exports = {
  Sequelize: sequelize
}