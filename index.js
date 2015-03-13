'use strict';
var express = require('express');
var app = express();


app.use(express.static(__dirname + '/public'));


app.get('/iframe', function (req, res) {
  res.type('html');
  res.sendFile(__dirname + '/public/iframe.html');
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('started');
});