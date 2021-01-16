"use strict";

var express = require('express');

var app = express(); ///server;

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express["static"]('public'));
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("listen ".concat(port));
});