"use strict";

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var jwt = require('jwt-simple');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"]('public'));

var mongoose = require('mongoose');

var secret = 'gvfdgb%$^$%&$4054423654073467$6@$&*(@%$^&2310*/-/+';
var url = "mongodb+srv://yaara:987Yaara@cluster0.uya8d.mongodb.net/test";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var Users = mongoose.model('user', {
  id_user: String,
  userName: String,
  name: String,
  password: String,
  email: String,
  phone: String,
  role: String
});
var Products = mongoose.model('product', {
  UPS: String,
  Name: String,
  price: String,
  Category: String,
  Weight: String,
  ExpiryDate: String
}); // const product1 = new Products({
//     UPS: '81726',
//     Name: 'Milk',
//     price: '4.5',
//     Category: 'Milk',
//     Weight: '1',
//     ExpiryDate: '30/02/2021'
// })
// product1.save().then(doc => console.log(doc)).catch(e =>console.log(e));
// const user = new Users({
//     id_user: '123456',
//     userName:'הלל',
//     name: 'הלל',
//     password: '2580',
//     email: 'A4105962@GMAIL.COM',
//     phone: '054-6080982',
//     role: 'admin'
// });
//  user.save().then(doc => console.log('doc')).catch(e =>console.log(e));
// login.html

var ok = false;
app.post('/send-Login-details', function _callee(req, res) {
  var _req$body, userName, password, validate, role, data, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, userName = _req$body.userName, password = _req$body.password;
          validate = false;
          role = 'public';
          _context.next = 6;
          return regeneratorRuntime.awrap(Users.find({}));

        case 6:
          data = _context.sent;
          data.forEach(function (elm) {
            if (userName == elm.userName && password == elm.password) {
              validate = true;
              role = elm.role;
            } else {
              console.log("no match ".concat(elm.userName));
            }
          });
          token = jwt.encode({
            role: role
          }, secret);

          if (validate) {
            res.cookie('validated', token, {
              maxAge: 9999999999,
              httpOnly: true
            });
          }

          res.send({
            validate: validate
          });
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0.message);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); // index.html

app.get('/Cookie-test', function (req, res) {
  var validated = true;
  var checkCookie = req.cookies.validated;
  console.log(checkCookie);

  if (checkCookie == undefined) {
    validated = false;
  }

  res.send({
    validated: validated
  });
});
app.post('/send-User-details-sign-up', function _callee2(req, res) {
  var message, _req$body2, id_user, name, userName, password, email, phone, role, data, user;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          message = 'ok';
          _req$body2 = req.body, id_user = _req$body2.id_user, name = _req$body2.name, userName = _req$body2.userName, password = _req$body2.password, email = _req$body2.email, phone = _req$body2.phone, role = _req$body2.role;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Users.find({}));

        case 4:
          data = _context2.sent;
          i = 0;

        case 6:
          if (!(i < data.length)) {
            _context2.next = 29;
            break;
          }

          if (!(id_user == data[i].id_user)) {
            _context2.next = 12;
            break;
          }

          message = 'מספר זהות קיים';
          return _context2.abrupt("break", 29);

        case 12:
          if (!(email == data[i].email)) {
            _context2.next = 17;
            break;
          }

          message = 'מייל זה כבר קיים במערכת';
          return _context2.abrupt("break", 29);

        case 17:
          if (!(userName == data[i].userName)) {
            _context2.next = 22;
            break;
          }

          message = 'שם משתמש כבר קיים';
          return _context2.abrupt("break", 29);

        case 22:
          user = new Users({
            id_user: id_user,
            name: name,
            userName: userName,
            password: password,
            email: email,
            phone: phone,
            role: role
          });
          _context2.next = 25;
          return regeneratorRuntime.awrap(user.save().then(function (doc) {
            return console.log(doc);
          })["catch"](function (e) {
            return console.log(e);
          }));

        case 25:
          message = 'ok';

        case 26:
          i++;
          _context2.next = 6;
          break;

        case 29:
          res.send({
            message: message
          });

        case 30:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var port = process.env.PORT || 8080;
app.listen(port, function () {
  return console.log('server listen on port ', port);
});