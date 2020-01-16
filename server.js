

var http = require('http'),
  fs = require('fs'),
  ejs = require('ejs'),
  qs = require('querystring');

var settings = require('./setting');
var server = http.createServer();
// var msg;
var template = fs.readFileSync(__dirname + '/public/bbs.ejs', 'utf-8');
var posts = [];
var n = 0;

function renderForm(posts, res) {
  var data = ejs.render(template, {
    posts: posts
  });
  res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.write('hello from' + req.url);
  res.write(data);
  res.end();
}

server.on('request', function (req, res) {
  if (req.method === 'POST') {
    req.data = '';
    req.on('data', function (chunk) {
      req.data += chunk;
    });
    req.on('end', function () {
      var query = qs.parse(req.data);
      posts.push(query.name);
      renderForm(posts, res);
    })
  } else {
    renderForm(posts, res);

  }
  // n++;
  // var data = ejs.render(template, {
  //   title: 'hello',
  //   content: '<strong>World!</strong>',
  //   n: n
  // });
  //レッスン３
  // fs.readFile(__dirname + '/public/hello.html', 'utf-8', function (err, data) {
    // if (err) {
    //   res.writeHead(404, { 'Content-Type': 'text/plain' });
    //   // res.write('hello from' + req.url);
    //   res.write('not found');
    //   res.end();
    // }

  // });
});
server.listen(settings.port, settings.host);
console.log('server listning...');
