'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    trailers: { type : Array , "default" : [] }
});

//Validation to check if user has already been created
UserSchema.path('username').validate(function(value, done) {
    this.model('User').count({ username: value }, function(err, count) {
        if (err) {
            return done(err);
        } 
        // If `count` is greater than zero, "invalidate"
        done(!count);
    });
}, 'Username already exists');

module.exports = {
    model: mongoose.model('User', UserSchema)
};