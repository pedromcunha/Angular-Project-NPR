'use strict';

var user = require('../controllers/user.js');


module.exports = function(app) {
    app.post('/register', user.create);

    app.get('/', function(req, res) {
        res.send('Api is up and running in user.js');
    });
};