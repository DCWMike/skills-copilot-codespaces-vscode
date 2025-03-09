// Create web server
// load module
const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const comments = require('./comments.json');

// create server
http.createServer((req, res) => {
  if (req.url === '/comments' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(comments));
  } else if (req.url === '/comments' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const comment = qs.parse(body);
      comments.push(comment);
      fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          res.end('Error writing file');
        } else {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(comment));
        }
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}).listen(3000, () => console.log('Server running on http://localhost:3000/'));