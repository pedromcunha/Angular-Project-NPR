'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = require('../models/user.js'),
    bcrypt = require('bcryptjs'),
    helpers = require('../lib/helpers.js'),
    BSON = require('mongodb').BSONPure;

//create a user
exports.create = function(req, res) {
    var hash = helpers.createHash(req.body.password);

    var user = new User.model({
        username: req.body.username,
        password: hash
    });
    
    user.save(function(err, createdUser, numAffected) {
        if (err) {
            res.send({
                message: err.errors.username.message,
                user: null
            });
        } else {
            res.send({
                message: 'Your account has been created!',
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

exports.getUser = function(req, res) {
    var objectId = BSON.ObjectID.createFromHexString(req.param('id'));
    User.model.findOne({_id: objectId}, function(err, user) {
        if(err) {
            res.send({
                message: err,
                user: null
            });
        }
        else if(user === null) {
            res
            .status(404)
            .send({
                message: 'User not found',
                user: null
            });
        }
        else {
            res.send({
                user: user
            });
        }
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
                    });
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