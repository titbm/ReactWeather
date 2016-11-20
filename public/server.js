var express = require('express');
var SERVER = express();

const PORT = process.env.PORT || 3000;

// Open Weather Api допускает использование только http://-запросов (не https://)
SERVER.use(function(request, response, next) {
  if (request.headers['x-forwarder-proto'] === 'http') {
    next();
  } else {
    response.redirect('http://' + request.hostname + request.url);
  }
});

SERVER.use(express.static('public'));

SERVER.listen (PORT, function() {
  console.log ('Server is up on port: ' + PORT);
});
