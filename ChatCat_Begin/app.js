
// require express frame work
var express = require('express'),
    app = express(),
    path = require('path');

// set hogan view paths to point to views directory
app.set('views', path.join(__dirname, 'views'));

// hogan templating engine
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');

// set express static assets lets express find all static files in ./public
app.use(express.static(path.join(__dirname, 'public')));

// define route
app.route('/').get(function(req, res, next){
   //res.send( '<h1>Hello World!</h1>' );
    // respones.render, render index file inside the views folder
    res.render('index', {})
});

// define port number and log to console using callback function
app.listen(3000, function(){
   console.log('ChatCAT working on port 3000');
});