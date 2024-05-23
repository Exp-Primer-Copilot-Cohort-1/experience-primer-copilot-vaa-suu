// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const comments = require('./comments');

// create server
http.createServer((req, res) => {
    // parse url
    const parsedUrl = url.parse(req.url, true);
    // get query string
    const query = parsedUrl.query;
    // get pathname
    const pathname = parsedUrl.pathname;

    // handle request
    if (pathname === '/api/comments' && req.method === 'GET') {
        // get comments
        comments.getComments((err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            }
        });
    } else if (pathname === '/api/comments' && req.method === 'POST') {
        // read data
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            body = JSON.parse(body);
            // add comment
            comments.addComment(body, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(data));
                }
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
    }
}).listen(3000, () => {
    console.log('Server is running at http://localhost:3000/');
});

// Path: comments.js
// read comments
const fs = require('fs');
const path = require('path');

const commentsPath = path.join(__dirname, 'comments.json');

const getComments = (callback) => {
    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) {
            callback(err);
        } else {
            callback(null, JSON.parse(data));
        }
    });
};

const addComment = (comment, callback) => {
    getComments((err, data) => {
        if (err) {
            callback(err);
        } else {
            data.push(comment);
            fs.writeFile(commentsPath, JSON.stringify(data), (err) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, data);
                }
            });
        }
    });
}; // Add closing parenthesis here
