"use strict";

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser'); //const jwt = require('jwt-simple');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"]('public'));

var mongoose = require('mongoose');

var secret = 'gvfdgb%$^$%&3$4054423654073467$6@$&*(@%$^&2310*/-/+';
var url = "mongodb+srv://yaara:987Yaara@cluster0.uya8d.mongodb.net/test";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var Users = mongoose.model('User', {
  id_user: String,
  userName: String,
  name: String,
  password: String,
  email: String,
  phone: String,
  role: String
});
var Shelfs = mongoose.model('Shelf', {
  Line: Number,
  Area: String,
  Floor: Number,
  UPS_Shelfs: String,
  Weight: Number,
  height: Number
});
var Products = mongoose.model('product', {
  UPS: String,
  Name: String,
  price: Number,
  Amount: Number,
  Category: String,
  Weight: Number,
  height: Number,
  ExpiryDate: String,
  Image: String,
  Location: String
});
app.get('/get-List-Users', function _callee(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Users.find());

        case 2:
          data = _context.sent;
          res.send({
            data: data
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
app["delete"]('/:userId', function _callee2(req, res, next) {
  var userId, data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userId = req.params.userId;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Users.findByIdAndDelete(userId));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(Users.find({}));

        case 6:
          data = _context2.sent;
          res.send(data); // }

          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
/* 
app.put("/update", (req, res) => { 
    const userId = req.body.userId

    Users.updateOne({ id_user: userId }, {
            $set: {}
        }
    
    
    console.log(products)
    
    
        res.send({ ok: true })
    }) */

var isUsersExists = function isUsersExists(userId) {
  var isExists, data;
  return regeneratorRuntime.async(function isUsersExists$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          isExists = false;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Users.find({}));

        case 3:
          data = _context3.sent;

          for (i = 0; i < data.length; i++) {
            console.log(data[i].id_user);

            if (userId == data[i].id_user) {
              isExists = true;
            }
          }

          console.log(isExists);
          return _context3.abrupt("return", isExists);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var port = process.env.PORT || 8081;
app.listen(port, function () {
  return console.log('server listen on port ', port);
});