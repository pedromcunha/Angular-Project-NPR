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
    var objectId = BSON.ObjectID.createFromHexString(req.query.id);
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

// trailers: [
//     {
//         url: String,
//         userRating: Number,
//         isSaved: Boolean
//     }
// ]

exports.updateTrailers = function(req, res) {
    var trailer = req.body.trailer;
    var userId = BSON.ObjectID.createFromHexString(req.body.userId);

    if(trailer && userId) {
        User.model.findOne({_id: userId}, function(err, user) {
            var trailerLength = user.trailers.length;
            var message;
            if(trailerLength > 0) {
                var i = 0;
                for(i; i < trailerLength; i++) {
                    if(trailer.url === user.trailers[i].url) {
                        //update the trailer object
                        user.trailers[i].userRating = trailer.userRating;
                        user.trailers[i].isSaved = trailer.isSaved;
                        message = 'Trailer successfully updated';
                    }
                }
            }
            //create a brand new trailer object if there is no message
            if(!message) {
                message = 'Trailer successfully created';
                var newTrailer = {
                    url: trailer.url,
                    userRating: trailer.userRating,
                    isSaved: trailer.isSaved
                };
                user.trailers.push(newTrailer);
            }
            //updates the trailer array for the user obj
            user.update({trailers: user.trailers}, function(err, numAffected) {
                if(err) {
                    res.send({
                        message: err,
                        user: null
                    });
                }
                else {
                    res.send({
                        message: message,
                        user: user
                    });
                }
            });
        });
    }
};