
// require express frame work
var express = require('express'),
    app = express(),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

// set hogan view paths to point to views directory
app.set('views', path.join(__dirname, 'views'));

// hogan templating engine
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');

// set express static assets lets express find all static files in ./public
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(cookieParser());
app.use(session({ secret: 'catscanfly', saveUnitialized:true, resave:true}));
//saveUnitialized: init a session even when it is not modified
//resave: resaves a session even though it has not been modified

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
});

// Mongolab db
// mongodb://chatcatuser:silver09@ds059682.mongolab.com:59682/chatcat