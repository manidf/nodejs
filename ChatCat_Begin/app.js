// require express frame work
var express = require('express'),
    app = express(),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    config = require('./config/config.js'),
    ConnectMongo = require('connect-mongo')(session),
    mongoose = require('mongoose').connect(config.dbURL),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Stategy;

// set hogan view paths to point to views directory
app.set('views', path.join(__dirname, 'views'));

// hogan templating engine
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');

// set express static assets lets express find all static files in ./public
app.use(express.static(path.join(__dirname, 'public')));

// Session Management
app.use(cookieParser());
app.use(session({ secret: 'catscanfly', saveUnitialized:true, resave:true}));
//saveUnitialized: init a session even when it is not modified
//resave: resaves a sesasion even though it has not been modified


//mongodb schema
var userSchema = mongoose.Schema({
    username:String,
    password:String,
    fullname:String
});

//monogodb model
var Person = mongoose.model('users', userSchema);

// store a record
var Mannuel = new Person({
    username: 'Mannuel',
    password: 'silver09',
    fullname: 'Mannuel Ferreira'
});

Mannuel.save(function(err){
    console.log("Done!")
});

// Creating configurations DEV and PRODUCTION modes
var env = process.env.NODE_ENV || 'development';
if(env === 'development') {
    // dev settings
    app.use(session({secret:config.sessionSecret}));
} else {
    // production settings
    app.use(session({
        secret: config.sessionSecret,
        // set to new instance of connect mongo
        store: new ConnectMongo({
            //url: config.dbURL, //url in json file to connect to database
            mongoose_connection:mongoose.connection[0],
            stringify: true // session values converted to string
        })
    }));
}

// require
require('./auth/passportAuth.js')(passport, FacebookStrategy, config, mongoose);

// define route, and invoke the express function with two arguments that reference the module exports function
require('./routes/routes.js')(express, app);

/*
app.route('/').get(function(req, res, next){
   //res.send( '<h1>Hello World!</h1>' );
    // respones.render, render index file inside the views folder
    res.render('index', {title: 'Welcome to ChatCAT!'})
});
*/

// define port number and log to console using callback function
app.listen(3000, function(){
    console.log('ChatCAT working on port 3000');
    console.log('Mode ', env);
});

// Mongolab db
// mongodb://chatcatuser:silver09@ds059682.mongolab.com:59682/chatcat
