//Module Requirements
var bcrypt = require('bcryptjs');

//Library of helpers functions

module.exports = {
    toObjectId: function(input) {
        var ObjectId = require('mongoose').Types.ObjectId;
        return new ObjectId(input);
    },
    createHash: function(input) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(input, salt);

        return hash;
    }
};