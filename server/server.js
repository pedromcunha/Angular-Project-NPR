//Require npm modules
var express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    TwitterStrategy = require('passport-twitter'),
    GoolgeStrategy = require('passport-google'),
    FacebookStrategy = require('passport-facebook');

var app = express();

mongoose.connect('mongodb://localhost/trailerParke', function(err) {
    if(err) {console.log('error connecting to database.')}
});

//===============PASSPORT===============

//Passports go in here

//===============LIBS===============
var helpers = require('./lib/helpers.js');

//===============EXPRESS================
//Express config

app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());

//Session information and CSRF token
app.use(express.cookieParser());
app.use(express.session({
    secret: '59B93087-78BC-4EB9-993A-A61FC844F6C9'
}));
// app.use(express.csrf());

//Passport Init
app.use(passport.initialize());
app.use(passport.session());

//===============ROUTES===============
var userRoutes = require('./routes/user.js');

app.use('/api', userRoutes);

//===============PORT=================
var port = process.env.PORT || 1337; //select your port or let it pull from your .env file
app.listen(port);
console.log("listening on " + port + "!");