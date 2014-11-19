'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String
});

module.exports = function(UserSchema) {
	return mongoose.model('User', UserSchema);
};