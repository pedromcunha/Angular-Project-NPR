'use strict';

var user = require('../controllers/user.js');


module.exports = function(app) {
    app.post('/api/register', user.create);

    app.get('/api', function(req, res) {
        res.send('Api is up and running');
    });
};