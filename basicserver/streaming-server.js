
var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    host = '127.0.0.1',
    port = '9000';

// set MIME-TYPES
var mimes = {
    '.html' : 'text/html',
    '.css' : 'text/css',
    '.js' : 'text/javascript',
    '.gif' : 'image/gif',
    '.jpg' : 'image/jpeg'
};

var server = http.createServer(function(req, res) {

    var filepath = (req.url === '/') ? ('./index.html') : ('.' + req.url);

    var contentType = mimes[path.extname(filepath)];

    // check if file exists
    fs.exists(filepath, function(file_exists) {
       if(file_exists) {
           // read and serve
           fs.readFile(filepath, function(error, content) {
              if(error) {
                  res.writeHead(500);
                  res.end();
              } else {
                  res.writeHead(200, { 'Content-Type' : contentType });
                  res.end(content, 'utf-8');
              }
           })

       } else {
           res.writeHead(404);
           res.end('Sorry we could not find the file you requested');
       }
    });
}).listen(port, host, function() {
    console.log('Server Running on http://' + host + ':' + port);
});
