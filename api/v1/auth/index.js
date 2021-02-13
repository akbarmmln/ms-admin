const express = require('express');
const router = express.Router();
const controller = require('./controller');
const utils = require('../../../utils/utils');

router.post('/login', controller.adminLogin);
router.post('/reset-password', controller.resetPassword);

module.exports = router;