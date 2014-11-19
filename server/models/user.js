'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required:true, unique:true}
});

module.exports = {
	model: mongoose.model('User', UserSchema)
};