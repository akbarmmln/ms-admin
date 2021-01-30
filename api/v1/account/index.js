const express = require('express');
const router = express.Router();
const controller = require('./controller');
const utils = require('../../../utils/utils');

router.get('/account-admin/:id', controller.getAccount);
router.get('/account-admin/:page/:limit', controller.accountAdmin);
router.get('/account-admin/:page/:limit/:keyword', controller.accountAdmin);

module.exports = router;