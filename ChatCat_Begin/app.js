
// require express frame work
var express = require('express'),
    app = express();

// define route
app.route('/').get(function(req, res, next){
   res.send( '<h1>Hello World!</h1>' );
});

// define port number and log to console using callback function
app.listen(3000, function(){
   console.log('ChatCAT working on port 3000');
});