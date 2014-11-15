//The Server
var express = require('express'),
    path = require('path'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    TwitterStrategy = require('passport-twitter'),
    GoolgeStrategy = require('passport-google'),
    FacebookStrategy = require('passport-facebook');

var config = require('./config.js'), //config file contains all tokens and other private info
    funct = require('./functions.js'); //funct file contains our helper functions for our Passport and database work

var app = express();

//===============PASSPORT===============

//Passports go in here

//===============EXPRESS================
//Express config

app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'supernova' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});

app.use(express.static(path.join(__dirname, 'public')));

//===============ROUTES===============
// app.get('/', function(req, res) {
//   res.sendfile(__dirname + '/public/index.html');
// });
//===============PORT=================
var port = process.env.PORT || 1337; //select your port or let it pull from your .env file
app.listen(port);
console.log("listening on " + port + "!");


