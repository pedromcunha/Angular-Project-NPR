'use strict';

var uauthCtrl = require('../controllers/uauth.js');
var express = require('express');
var router = express.Router();

router.post('/login', uauthCtrl.login);

module.exports = router;