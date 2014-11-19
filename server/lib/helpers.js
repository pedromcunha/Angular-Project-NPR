//Library of helpers functions
module.exports = {
    toObjectId: function(input) {
        var ObjectId = require('mongoose').Types.ObjectId;
        return new ObjectId(input);
    }
};