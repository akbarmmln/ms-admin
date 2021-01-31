const express = require('express');
const router = express.Router();
const controller = require('./controller');
const utils = require('../../../utils/utils');
const auth = require('../auth/controller');

router.get('/account-admin/akses', auth.verifyToken, controller.accountAkses);
router.get('/account-admin/:id', auth.verifyToken, controller.getAccount);
router.get('/account-admin/:page/:limit', auth.verifyToken, controller.accountAdmin);
router.get('/account-admin/:page/:limit/:keyword', auth.verifyToken, controller.accountAdmin);

module.exports = router;