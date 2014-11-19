'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

//create a user
exports.create = function(req, res) {
    var User = require('../models/user.js');
    var user = new User.model({
        username: req.body.username
    });
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