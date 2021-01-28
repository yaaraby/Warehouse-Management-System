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
app.get('/get-details-users:userId', function _callee2(req, res, next) {
  var userId, findUser;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userId = req.params.userId;
          console.log(userId);
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(Users.findOne({
            _id: userId
          }));

        case 5:
          findUser = _context2.sent;
          res.send(findUser);
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](2);
          console.log(_context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
app["delete"]('/:userId', function _callee3(req, res, next) {
  var userId, isusersExists, data;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userId = req.params.userId;
          _context3.prev = 1;
          isusersExists = isUsersExists(userId);

          if (isusersExists) {
            _context3.next = 7;
            break;
          }

          res.status(500).send('Error: User does not exists');
          _context3.next = 13;
          break;

        case 7:
          _context3.next = 9;
          return regeneratorRuntime.awrap(Users.deleteOne({
            id_user: userId
          }));

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(Users.find({}));

        case 11:
          data = _context3.sent;
          res.send(data);

        case 13:
          _context3.next = 18;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](1);
          console.log(_context3.t0);

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 15]]);
});
app.put("/update", function _callee4(req, res) {
  var data, myquery, newvalues;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Users.find({}));

        case 2:
          data = _context4.sent;
          i = 0;

        case 4:
          if (!(i < data.length)) {
            _context4.next = 21;
            break;
          }

          if (!(req.body.id_user !== data[i].id_user)) {
            _context4.next = 18;
            break;
          }

          if (!(req.body.userName == data[i].userName)) {
            _context4.next = 11;
            break;
          }

          message = 'שם משתמש כבר קיים';
          return _context4.abrupt("break", 21);

        case 11:
          if (!(req.body.email == data[i].email)) {
            _context4.next = 16;
            break;
          }

          message = 'מייל זה כבר קיים במערכת';
          return _context4.abrupt("break", 21);

        case 16:
          message = 'ok';
          return _context4.abrupt("break", 21);

        case 18:
          i++;
          _context4.next = 4;
          break;

        case 21:
          if (!(message == 'ok')) {
            _context4.next = 26;
            break;
          }

          myquery = {
            id_user: req.body.id_user
          };
          newvalues = {
            $set: {
              userName: req.body.userName,
              name: req.body.name,
              password: req.body.password,
              email: req.body.email,
              phone: req.body.phone,
              role: req.body.role
            }
          };
          _context4.next = 26;
          return regeneratorRuntime.awrap(Users.update(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
          }));

        case 26:
          setTimeout(function () {
            res.send({
              message: message
            });
          }, 1000);

        case 27:
        case "end":
          return _context4.stop();
      }
    }
  });
});

var isUsersExists = function isUsersExists(userId) {
  var isExists, data;
  return regeneratorRuntime.async(function isUsersExists$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          isExists = false;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Users.find({}));

        case 3:
          data = _context5.sent;

          for (i = 0; i < data.length; i++) {
            console.log(data[i].id_user);

            if (userId == data[i].id_user) {
              isExists = true;
            }
          }

          console.log(isExists);
          return _context5.abrupt("return", isExists);

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var port = process.env.PORT || 8081;
app.listen(port, function () {
  return console.log('server listen on port ', port);
});