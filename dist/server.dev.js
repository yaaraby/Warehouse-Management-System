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
}); // const user = new Users({
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
var port = process.env.PORT || 8080;
app.listen(port, function () {
  return console.log('server listen on port ', port);
});