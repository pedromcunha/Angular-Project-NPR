'use strict';

var userCtrl = require('../controllers/user.js');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('Api is up and running');
});

router.get('/users', userCtrl.getUsers);

router.get('/user', userCtrl.getUser);

router.post('/register', userCtrl.create);

router.delete('/user/delete', userCtrl.deleteUser);

module.exports = router;