var express = require('express');
const SERVER = express();

SERVER.use(express.static('public'));

SERVER.listen (3000, function() {
  console.log ('Server is up on port: 3000');
});
