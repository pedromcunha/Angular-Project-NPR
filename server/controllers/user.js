'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = require('../models/user.js');

//create a user
exports.create = function(req, res) {
    var user = new User();
    user.username = req.body.username;

    user.save(function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send({
                message: 'User Created'
            });
        }
    });
};