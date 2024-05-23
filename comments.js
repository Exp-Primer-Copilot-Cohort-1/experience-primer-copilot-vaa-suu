// create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

var comments = {
  '1': 'This is a comment',
  '2': 'This is another comment',
  '3': 'This is yet another comment'
};

// create server
http.createServer(function(req, res) {
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  var query = urlObj.query;

  if (pathname === '/') {
    pathname = '/index.html';
  }

  // handle read
  if (pathname === '/index.html') {
    var filePath = path.join(__dirname, pathname);
    fs.readFile(filePath, 'utf-8', function(err, data) {
      if (err) {
        console.log(err);
        res.writeHead(404, 'Not Found', {
          'Content-Type': 'text/plain'
        });
        res.end('Not Found');
      } else {
        res.writeHead(200, 'OK', {
          'Content-Type': 'text/html'
        });
        res.end(data);
      }
    });
  }

  // handle write
  else if (pathname === '/addComment') {
    var comment = query.comment;
    var id = new Date().getTime();
    comments[id] = comment;
    res.writeHead(200, 'OK', {
      'Content-Type': 'text/plain'
    });
    res.end('OK');
  }

  // handle read
  else if (pathname === '/getComments') {
    var data = [];
    for (var i in comments) {
      data.push(comments[i]);
    }
    res.writeHead(200, 'OK', {
      'Content-Type': 'text/plain'
    });
    res.end(data.join('\n'));
  }

  // handle delete
  else if (pathname === '/deleteComment') {
    var id = query.id;
    delete comments[id];
    res.writeHead(200, 'OK', {
      'Content-Type': 'text/plain'
    });
    res.end('OK');
  }

  // handle update
  else if (pathname === '/updateComment') {
    var id = query.id;
    var comment = query.comment;
    comments[id] = comment;
    res.writeHead(200, 'OK', {
      'Content-Type': 'text/plain'
    });
    res.end('OK');
  }