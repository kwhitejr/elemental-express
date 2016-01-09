var express = require('express');
var jade = require('jade');
var bodyParser = require('body-parser');

var app = express();

var server = app.listen(3000, function ()  {
  var port = server.address().port;
  console.log('All aboard the elemental express: ' + port);
});