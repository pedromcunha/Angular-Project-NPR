'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var User = require('../models/user.js');
var helpers = require('../lib/helpers.js');
var ObjectId = mongoose.Types.ObjectId;
//create a user
exports.create = function(req, res) {
    var user = new User.model({
        username: req.body.username
    });
    user.save(function(err, createdUser) {
        if (err) {
            res.send(err);
        } else {
            res.send({
                message: 'User Created',
                user: createdUser
            });
        }
    });
};

exports.getUsers = function(req, res) {
    User.model.find(function(err, users) {
        if (err) return console.error(err);
        res.send(users);
    });
};

exports.deleteUser = function(req, res) {
    if (req.body.id) {
        User.model.findByIdAndRemove(req.body.id, function(err, user) {
            if (err) {
                res.send(err);
            } else {
                if (user == null) {
                    res.send({
                        message: 'User has already been deleted'
                    })
                } else {
                    res.send({
                        message: 'User Deleted',
                        user: user
                    });
                }
            }
        });
    } else {
        res.send('Missing User Id');
    }
};