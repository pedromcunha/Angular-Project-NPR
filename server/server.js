//Require npm modules
var express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    TwitterStrategy = require('passport-twitter'),
    GoolgeStrategy = require('passport-google'),
    FacebookStrategy = require('passport-facebook'),
    database;

var app = express();

if(process.env.PORT){
    database = 'mongodb://pedrocunha:trailerparke@ds053380.mongolab.com:53380/trailerparke';
}
else {
    database = 'mongodb://localhost/trailerParke';
}
mongoose.connect(database, function(err) {
    if (err) {
        console.log('error connecting to database.');
    }
});

//===============PASSPORT===============
// var local = require('./passports/local.js');

// passport.use(new BasicStrategy(local.strategy));

//===============LIBS===============
var helpers = require('./lib/helpers.js');

//===============EXPRESS================
//Express config

// app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(methodOverride);

//Passport Init
app.use(passport.initialize());
app.use(passport.session());

//===============ROUTES===============
var userRoutes = require('./routes/user.js');
var authRoutes = require('./routes/uauth.js');
app.use('/api', userRoutes);
app.use('/auth', authRoutes);

//Main front end route
app.use(express.static( path.resolve('../public')));

//===============PORT=================
var port = process.env.PORT || 1337; //select your port or let it pull from your .env file
app.listen(port);
console.log("listening on " + port + "!");