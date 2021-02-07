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

var secret = 'gvfdgb%$^$%&3$4054423654073467$6@$&*(@%$^&2310*/-/+';
var url = "mongodb+srv://yaara:987Yaara@cluster0.uya8d.mongodb.net/test";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var Users = mongoose.model('User', {
  id_user: String,
  userName: String,
  name: String,
  password: String,
  email: String,
  phone: String,
  role: String,
  status: String
});
var Shelfs = mongoose.model('Shelf', {
  Line: Number,
  Area: String,
  Floor: Number,
  UPS_Shelfs: String,
  NumberOfProductsonShelf: Number,
  MaximumWeight: Number,
  CurrentWeight: Number,
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
}); // const testShelf = new Shelfs({
//     Line: 3,
//     Area: 'F',
//     Floor: 5,
//     UPS_Shelfs: ``,
//     NumberOfProductsonShelf:32,
//     MaximumWeight: 500,
//     CurrentWeight: 300,
//     height: 50
// });
// testShelf.save().then(doc => console.log(doc)).catch(e =>console.log(e));
// const product1 = new Products({
//     UPS: '81726',
//     Name: 'כוס',
//     price: '450',
//     Category: 'זכוכית',
//     Weight: '5',
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
app["delete"]('/:userId', function _callee2(req, res) {
  var userId, data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userId = req.params.userId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Users.findByIdAndDelete(userId));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(Users.find({}));

        case 6:
          data = _context2.sent;
          res.send(data);
          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); // login.html

var newDate = new Date().getTime();
var role = "מחסנאי";
var ok = false;
var token;
app.get('/Output', function _callee3(req, res) {
  var checkCookie, decoded, _id;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          checkCookie = req.cookies.validated;
          decoded = jwt.decode(checkCookie, secret);
          _id = decoded.id;
          _context3.next = 5;
          return regeneratorRuntime.awrap(Users.updateOne({
            _id: _id
          }, {
            status: 'false'
          }));

        case 5:
          res.cookie('validated', token, {
            maxAge: 0,
            httpOnly: true
          });
          res.send(true);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.get('/alluserconnected', function _callee4(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Users.find({
            status: true
          }));

        case 2:
          data = _context4.sent;
          res.send({
            data: data
          });

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.post('/send-Login-details', function _callee5(req, res) {
  var _req$body, userName, password, validate, id, data;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$body = req.body, userName = _req$body.userName, password = _req$body.password;
          validate = false;
          _context5.next = 5;
          return regeneratorRuntime.awrap(Users.find({}));

        case 5:
          data = _context5.sent;
          i = 0;

        case 7:
          if (!(i < data.length)) {
            _context5.next = 22;
            break;
          }

          if (!(userName == data[i].userName && password == data[i].password)) {
            _context5.next = 17;
            break;
          }

          id = data[i]._id;
          _context5.next = 12;
          return regeneratorRuntime.awrap(Users.updateOne({
            _id: id
          }, {
            status: 'true'
          }));

        case 12:
          validate = true;

          if (data[i].role == 'מנהל') {
            role = 'ok';
          } else {
            role = 'none';
          }

          return _context5.abrupt("break", 22);

        case 17:
          role = 'מחסנאי';
          console.log("no match ".concat(data[i].userName));

        case 19:
          i++;
          _context5.next = 7;
          break;

        case 22:
          newDate = new Date().getTime();
          token = jwt.encode({
            role: role,
            userName: userName,
            id: id,
            newDate: newDate
          }, secret);

          if (validate) {
            res.cookie('validated', token, {
              maxAge: 86400000,
              httpOnly: true
            });
          }

          res.send({
            validate: validate,
            role: role
          });
          _context5.next = 31;
          break;

        case 28:
          _context5.prev = 28;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0.message);

        case 31:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 28]]);
}); // index.html

app.get('/Cookie-test', function _callee6(req, res) {
  var validated, name, id, checkCookie, decoded;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          checkCookie = req.cookies.validated;
          newDate = new Date().getTime();

          if (!checkCookie) {
            _context6.next = 14;
            break;
          }

          decoded = jwt.decode(checkCookie, secret);
          validated = decoded.role;
          name = decoded.userName;
          id = decoded.id;

          if (!(decoded.newDate + 86400000 < newDate)) {
            _context6.next = 12;
            break;
          }

          _context6.next = 10;
          return regeneratorRuntime.awrap(Users.updateOne({
            _id: id
          }, {
            status: 'false'
          }));

        case 10:
          res.cookie('validated', token, {
            maxAge: 0,
            httpOnly: true
          });
          validated = false;

        case 12:
          _context6.next = 15;
          break;

        case 14:
          validated = false;

        case 15:
          res.send({
            validated: validated,
            name: name,
            id: id
          });

        case 16:
        case "end":
          return _context6.stop();
      }
    }
  });
});
app.post('/send-User-details-sign-up', function _callee7(req, res) {
  var message, _req$body2, id_user, name, userName, password, email, phone, role, data, user;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          message = '';
          _req$body2 = req.body, id_user = _req$body2.id_user, name = _req$body2.name, userName = _req$body2.userName, password = _req$body2.password, email = _req$body2.email, phone = _req$body2.phone, role = _req$body2.role;
          _context7.next = 4;
          return regeneratorRuntime.awrap(Users.find({}));

        case 4:
          data = _context7.sent;
          i = 0;

        case 6:
          if (!(i < data.length)) {
            _context7.next = 27;
            break;
          }

          if (!(id_user == data[i].id_user)) {
            _context7.next = 12;
            break;
          }

          message = 'מספר זהות קיים';
          return _context7.abrupt("break", 27);

        case 12:
          if (!(userName == data[i].userName)) {
            _context7.next = 17;
            break;
          }

          message = 'שם משתמש כבר קיים';
          return _context7.abrupt("break", 27);

        case 17:
          if (!(email == data[i].email)) {
            _context7.next = 22;
            break;
          }

          message = 'מייל זה כבר קיים במערכת';
          return _context7.abrupt("break", 27);

        case 22:
          message = 'ok';
          return _context7.abrupt("break", 27);

        case 24:
          i++;
          _context7.next = 6;
          break;

        case 27:
          if (!(message == 'ok')) {
            _context7.next = 31;
            break;
          }

          user = new Users({
            id_user: id_user,
            name: name,
            userName: userName,
            password: password,
            email: email,
            phone: phone,
            role: role
          });
          _context7.next = 31;
          return regeneratorRuntime.awrap(user.save().then(function (doc) {
            return console.log(doc);
          })["catch"](function (e) {
            return console.log(e);
          }));

        case 31:
          setTimeout(function () {
            res.send({
              message: message
            });
          }, 1000);

        case 32:
        case "end":
          return _context7.stop();
      }
    }
  });
});
app.get('/get-category', function _callee8(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(Products.find({}, {
            Category: 1
          }));

        case 2:
          data = _context8.sent;
          res.send({
            data: data
          });

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
}); //yehial------------------------------------------------------------------

app.get('/pull-Shelf', function _callee9(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(Shelfs.find({
            NumberOfProductsonShelf: {
              $gte: 1
            }
          }));

        case 2:
          data = _context9.sent;
          res.send({
            data: data
          });

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
});
app.put("/shelf-creation", function _callee11(req, res) {
  var message, letters, tempNewRows, firstRow, lastRow, numberOfAreas, numberOfShelfs, maxHeight, maxWight, _i, j, k, errorMessage, exCheck, saveToDataBase;

  return regeneratorRuntime.async(function _callee11$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          saveToDataBase = function _ref3(aprovedArry) {
            aprovedArry.forEach(function _callee10(element) {
              var testShelf;
              return regeneratorRuntime.async(function _callee10$(_context11) {
                while (1) {
                  switch (_context11.prev = _context11.next) {
                    case 0:
                      testShelf = new Shelfs({
                        Line: element.Line,
                        Area: element.Area,
                        Floor: element.Floor,
                        UPS_Shelfs: element.UPS_Shelfs,
                        NumberOfProductsonShelf: 1,
                        //1 for test
                        MaximumWeight: element.MaximumWeight,
                        CurrentWeight: 0,
                        height: element.CurrentHeight
                      });
                      console.log(testShelf);
                      testShelf.save();

                    case 3:
                    case "end":
                      return _context11.stop();
                  }
                }
              });
            });
            res.send(true);
          };

          exCheck = function _ref2(arrayToCheck) {
            var flag, _i2, theTest;

            return regeneratorRuntime.async(function exCheck$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    console.log(arrayToCheck);
                    _i2 = 0;

                  case 2:
                    if (!(_i2 < arrayToCheck.length)) {
                      _context10.next = 12;
                      break;
                    }

                    _context10.next = 5;
                    return regeneratorRuntime.awrap(Shelfs.exists({
                      Line: arrayToCheck[_i2].Line
                    }).then(function (token) {
                      return token;
                    }));

                  case 5:
                    theTest = _context10.sent;

                    if (!(theTest == true)) {
                      _context10.next = 9;
                      break;
                    }

                    flag = false;
                    return _context10.abrupt("break", 12);

                  case 9:
                    _i2++;
                    _context10.next = 2;
                    break;

                  case 12:
                    return _context10.abrupt("return", flag);

                  case 13:
                  case "end":
                    return _context10.stop();
                }
              }
            });
          };

          errorMessage = function _ref() {
            message = 'שורה אחת ו\או כמה קיימת\ות כבר בחר שורות אחרות ';
            res.send({
              message: message
            });
          };

          message = ""; //console.log(req.body)

          letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P'];
          tempNewRows = [];
          firstRow = parseInt(req.body.firstRow);
          lastRow = parseInt(req.body.lastRow);
          numberOfAreas = parseInt(req.body.numberOfAreas);
          numberOfShelfs = parseInt(req.body.numberOfShelfs);
          maxHeight = parseInt(req.body.shelfHeight);
          maxWight = parseInt(req.body.maxWight); //new shelfs builder

          for (_i = firstRow; _i <= lastRow; _i++) {
            for (j = 0; j < numberOfAreas; j++) {
              for (k = 0; k < numberOfShelfs; k++) {
                // console.log(`${i+1}${letters[j]}${k+1}`) //For test
                tempNewRows.push({
                  Line: _i,
                  Area: "".concat(letters[j]),
                  Floor: k + 1,
                  UPS_Shelfs: "".concat(_i, "-").concat(letters[j], "-").concat(k + 1),
                  // NumberOfProductsonShelf:Number, //Optional
                  MaximumWeight: maxWight,
                  // CurrentWeight: Number,//Optional
                  CurrentHeight: maxHeight //Optional

                });
              }
            }
          }

          exCheck(tempNewRows).then(function (res, rej) {
            //console.log(res)
            if (res == false) {
              errorMessage();
            } else {
              saveToDataBase(tempNewRows);
            }
          });

        case 14:
        case "end":
          return _context12.stop();
      }
    }
  });
});
app.post('/delete-shelf', function _callee12(req, res) {
  return regeneratorRuntime.async(function _callee12$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          console.log(req.body.shelfToDelete);
          Shelfs.deleteOne({
            UPS_Shelfs: "".concat(req.body.shelfToDelete)
          }, function (err) {
            if (Shelfs.findOne({
              UPS_Shelfs: "".concat(req.body.shelfToDelete)
            })) {//  res.send(false)
            }
          });
          res.send(true);

        case 3:
        case "end":
          return _context13.stop();
      }
    }
  });
});
app["delete"]('/PullThiscCategory', function _callee13(req, res) {
  var eventCategory, data;
  return regeneratorRuntime.async(function _callee13$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          eventCategory = req.body.eventCategory;
          _context14.next = 3;
          return regeneratorRuntime.awrap(Products.find({
            Category: eventCategory
          }));

        case 3:
          data = _context14.sent;
          res.send({
            data: data
          });

        case 5:
        case "end":
          return _context14.stop();
      }
    }
  });
}); // Search

app.post('/Searchdeta', function _callee14(req, res) {
  var _req$body3, placeholder, inputvalue, data, _data, _data2, _data3;

  return regeneratorRuntime.async(function _callee14$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _req$body3 = req.body, placeholder = _req$body3.placeholder, inputvalue = _req$body3.inputvalue; // return false 

          if (!(placeholder == 'UPS-מקט')) {
            _context15.next = 8;
            break;
          }

          _context15.next = 4;
          return regeneratorRuntime.awrap(Products.find({
            UPS: inputvalue
          }));

        case 4:
          data = _context15.sent;

          if (data.length == 0) {
            res.send({
              message: 'UPS לא נמצא'
            });
          } else {
            res.send({
              data: data
            });
          }

          _context15.next = 27;
          break;

        case 8:
          if (!(placeholder == 'חיפוש לפי שם מוצר')) {
            _context15.next = 15;
            break;
          }

          _context15.next = 11;
          return regeneratorRuntime.awrap(Products.find({
            Name: inputvalue
          }));

        case 11:
          _data = _context15.sent;

          if (_data.length == 0) {
            res.send({
              message: 'פריט לא קיים'
            });
          } else {
            res.send({
              data: _data
            });
          }

          _context15.next = 27;
          break;

        case 15:
          if (!(placeholder == 'חיפוש לפי תאריך תפוגה')) {
            _context15.next = 22;
            break;
          }

          _context15.next = 18;
          return regeneratorRuntime.awrap(Products.find({
            ExpiryDate: inputvalue
          }));

        case 18:
          _data2 = _context15.sent;

          if (_data2.length == 0) {
            res.send({
              message: 'לא נמצא מוצר לפי תאריך תפוגה זה'
            });
          } else {
            res.send({
              data: _data2
            });
          }

          _context15.next = 27;
          break;

        case 22:
          if (!(placeholder == 'חיפוש לפי מדף / מיקום')) {
            _context15.next = 27;
            break;
          }

          _context15.next = 25;
          return regeneratorRuntime.awrap(Products.find({
            Location: inputvalue
          }));

        case 25:
          _data3 = _context15.sent;

          if (_data3.length == 0) {
            res.send({
              message: 'מדף לא קיים'
            });
          } else {
            res.send({
              data: _data3
            });
          }

        case 27:
        case "end":
          return _context15.stop();
      }
    }
  });
});
app.post('/PullInformation', function _callee15(req, res) {
  var e, data;
  return regeneratorRuntime.async(function _callee15$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          e = req.body.e;
          _context16.next = 3;
          return regeneratorRuntime.awrap(Products.find({
            _id: e
          }));

        case 3:
          data = _context16.sent;
          res.send({
            data: data
          });

        case 5:
        case "end":
          return _context16.stop();
      }
    }
  });
});
app.put("/update", function _callee16(req, res) {
  var data, myquery, newvalues;
  return regeneratorRuntime.async(function _callee16$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return regeneratorRuntime.awrap(Users.find({}));

        case 2:
          data = _context17.sent;
          i = 0;

        case 4:
          if (!(i < data.length)) {
            _context17.next = 21;
            break;
          }

          if (!(req.body.id_user !== data[i].id_user)) {
            _context17.next = 18;
            break;
          }

          if (!(req.body.userName == data[i].userName)) {
            _context17.next = 11;
            break;
          }

          message = 'שם משתמש כבר קיים';
          return _context17.abrupt("break", 21);

        case 11:
          if (!(req.body.email == data[i].email)) {
            _context17.next = 16;
            break;
          }

          message = 'מייל זה כבר קיים במערכת';
          return _context17.abrupt("break", 21);

        case 16:
          message = 'ok';
          return _context17.abrupt("break", 21);

        case 18:
          i++;
          _context17.next = 4;
          break;

        case 21:
          if (!(message == 'ok')) {
            _context17.next = 26;
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
          _context17.next = 26;
          return regeneratorRuntime.awrap(Users.updateOne(myquery, newvalues, function (err, res) {
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
          return _context17.stop();
      }
    }
  });
});
app.get('/get-details-users:userId', function _callee17(req, res) {
  var userId, findUser;
  return regeneratorRuntime.async(function _callee17$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          userId = req.params.userId;
          console.log(userId);
          _context18.prev = 2;
          _context18.next = 5;
          return regeneratorRuntime.awrap(Users.findOne({
            _id: userId
          }));

        case 5:
          findUser = _context18.sent;
          res.send(findUser);
          _context18.next = 12;
          break;

        case 9:
          _context18.prev = 9;
          _context18.t0 = _context18["catch"](2);
          console.log(_context18.t0);

        case 12:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[2, 9]]);
}); // yaara

app.get('/get-Shelfs-list', function _callee18(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee18$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return regeneratorRuntime.awrap(Shelfs.find({}, {
            UPS_Shelfs: 1
          }));

        case 2:
          data = _context19.sent;
          console.log(data);
          res.send({
            data: data
          });

        case 5:
        case "end":
          return _context19.stop();
      }
    }
  });
});
app.get('/get-Details-Shelfs:UPS_Shelfs', function _callee19(req, res, next) {
  var UPS_Shelfs, CurrrentDetailsShelf;
  return regeneratorRuntime.async(function _callee19$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          UPS_Shelfs = req.params.UPS_Shelfs;
          _context20.prev = 1;
          _context20.next = 4;
          return regeneratorRuntime.awrap(Shelfs.findOne({
            UPS_Shelfs: UPS_Shelfs
          }));

        case 4:
          CurrrentDetailsShelf = _context20.sent;
          res.send(CurrrentDetailsShelf);
          _context20.next = 11;
          break;

        case 8:
          _context20.prev = 8;
          _context20.t0 = _context20["catch"](1);
          console.log(_context20.t0);

        case 11:
        case "end":
          return _context20.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
app.post('/add_Products', function _callee20(req, res) {
  var status, _req$body4, UPS, Name, price, Amount, Category, Weight, height, ExpiryDate, Location, products, sumProductOnShelf;

  return regeneratorRuntime.async(function _callee20$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          status = true;
          _req$body4 = req.body, UPS = _req$body4.UPS, Name = _req$body4.Name, price = _req$body4.price, Amount = _req$body4.Amount, Category = _req$body4.Category, Weight = _req$body4.Weight, height = _req$body4.height, ExpiryDate = _req$body4.ExpiryDate, Location = _req$body4.Location;
          products = new Products({
            UPS: UPS,
            Name: Name,
            price: price,
            Amount: Amount,
            Category: Category,
            Weight: Weight,
            height: height,
            ExpiryDate: ExpiryDate,
            Location: Location
          });
          _context21.next = 5;
          return regeneratorRuntime.awrap(products.save().then(function (doc) {
            return console.log(doc);
          })["catch"](function (e) {
            return console.log(e);
          }));

        case 5:
          _context21.next = 7;
          return regeneratorRuntime.awrap(updateNumberOfProduct(Amount, Location, Weight));

        case 7:
          sumProductOnShelf = _context21.sent;

          if (sumProductOnShelf == true) {
            res.send({
              status: status
            });
          }

        case 9:
        case "end":
          return _context21.stop();
      }
    }
  });
});

var updateNumberOfProduct = function updateNumberOfProduct(Amount, Location, Weight) {
  var data, ups_shelf, numberOfProductsonShelf, weight, myquery, newvalues;
  return regeneratorRuntime.async(function updateNumberOfProduct$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.next = 2;
          return regeneratorRuntime.awrap(Shelfs.find({}));

        case 2:
          data = _context22.sent;
          i = 0;

        case 4:
          if (!(i < data.length)) {
            _context22.next = 18;
            break;
          }

          if (!(Location == data[i].UPS_Shelfs)) {
            _context22.next = 15;
            break;
          }

          ups_shelf = data[i].UPS_Shelfs;
          numberOfProductsonShelf = data[i].NumberOfProductsonShelf;
          weight = data[i].CurrentWeight;
          numberOfProductsonShelf += eval(Amount);
          weight += eval(Weight);
          myquery = {
            UPS_Shelfs: Location
          };
          newvalues = {
            $set: {
              NumberOfProductsonShelf: numberOfProductsonShelf,
              CurrentWeight: weight
            }
          };
          _context22.next = 15;
          return regeneratorRuntime.awrap(Shelfs.updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
          }));

        case 15:
          i++;
          _context22.next = 4;
          break;

        case 18:
          return _context22.abrupt("return", true);

        case 19:
        case "end":
          return _context22.stop();
      }
    }
  });
};

app.put("/Product/", function _callee21(req, res) {
  var PreviousAmount, PreviousWeight, PreviousLocation, Amount, Weight, Location, data, myquery, newvalues, checkHighNumber;
  return regeneratorRuntime.async(function _callee21$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          console.log('nn');
          PreviousAmount = req.body.PreviousAmount;
          PreviousWeight = req.body.PreviousWeight;
          PreviousLocation = req.body.PreviousLocation;
          Amount = req.body.Amount;
          Weight = req.body.Weight;
          Location = req.body.Location;
          console.log(PreviousAmount, Amount, PreviousWeight, Weight, PreviousLocation, Location);
          _context23.next = 10;
          return regeneratorRuntime.awrap(Products.find({}));

        case 10:
          data = _context23.sent;
          myquery = {
            UPS: req.body.UPS,
            Location: req.body.Location
          };
          newvalues = {
            $set: {
              UPS: req.body.UPS,
              Name: req.body.Name,
              price: req.body.price,
              Amount: req.body.Amount,
              Category: req.body.Category,
              Weight: req.body.Weight,
              height: req.body.height,
              ExpiryDate: req.body.ExpiryDate,
              Location: req.body.Location
            }
          };
          checkHighNumber = theHighNumber(PreviousAmount, Amount, PreviousWeight, Weight, PreviousLocation, Location);
          console.log(checkHighNumber);

          if (!checkHighNumber) {
            _context23.next = 18;
            break;
          }

          _context23.next = 18;
          return regeneratorRuntime.awrap(Products.updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
          }));

        case 18:
          res.send({
            message: true
          });

        case 19:
        case "end":
          return _context23.stop();
      }
    }
  });
});

var theHighNumber = function theHighNumber(PreviousAmount, Amount, PreviousWeight, Weight, PreviousLocation, Location) {
  var sumAmount = 0;
  var sumWeight = 0;

  if (PreviousLocation != Location) {
    if (PreviousAmount == Amount) {
      updateMinusAmountPreviousShelf(PreviousAmount, PreviousWeight, PreviousLocation);
      updateNewShelf(Amount, Weight, Location);
    } else {
      sumAmount = PreviousAmount - Amount;
      sumWeight = PreviousWeight - Weight;
      updateMinusAmountPreviousShelf(sumAmount, sumWeight, PreviousLocation);
      updateNewInventory(sumAmount, sumWeight, Location);
    }
  } else {
    updateNewInventory(sumAmount, sumWeight, Location);
  }

  return true;
};

var updateMinusAmountPreviousShelf = function updateMinusAmountPreviousShelf(PreviousAmount, PreviousWeight, PreviousLocation) {
  var data, ups_shelf, numberOfProductsonShelf, weight, myquery, newvalues;
  return regeneratorRuntime.async(function updateMinusAmountPreviousShelf$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          console.log('aa');
          _context24.next = 3;
          return regeneratorRuntime.awrap(Shelfs.find({}));

        case 3:
          data = _context24.sent;
          i = 0;

        case 5:
          if (!(i < data.length)) {
            _context24.next = 20;
            break;
          }

          if (!(PreviousLocation == data[i].UPS_Shelfs)) {
            _context24.next = 17;
            break;
          }

          ups_shelf = data[i].UPS_Shelfs;
          numberOfProductsonShelf = data[i].NumberOfProductsonShelf;
          weight = data[i].CurrentWeight;
          numberOfProductsonShelf -= eval(PreviousAmount);
          weight -= eval(PreviousWeight);
          ;
          myquery = {
            UPS_Shelfs: PreviousLocation
          };
          newvalues = {
            $set: {
              NumberOfProductsonShelf: numberOfProductsonShelf,
              CurrentWeight: weight
            }
          };
          _context24.next = 17;
          return regeneratorRuntime.awrap(Shelfs.updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
          }));

        case 17:
          i++;
          _context24.next = 5;
          break;

        case 20:
        case "end":
          return _context24.stop();
      }
    }
  });
};

var updateNewShelf = function updateNewShelf(Amount, Weight, Location) {
  var data, ups_shelf, numberOfProductsonShelf, weight, myquery, newvalues;
  return regeneratorRuntime.async(function updateNewShelf$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          _context25.next = 2;
          return regeneratorRuntime.awrap(Shelfs.find({}));

        case 2:
          data = _context25.sent;
          i = 0;

        case 4:
          if (!(i < data.length)) {
            _context25.next = 18;
            break;
          }

          if (!(Location == data[i].UPS_Shelfs)) {
            _context25.next = 15;
            break;
          }

          ups_shelf = data[i].UPS_Shelfs;
          numberOfProductsonShelf = data[i].NumberOfProductsonShelf;
          weight = data[i].CurrentWeight;
          numberOfProductsonShelf += eval(Amount);
          weight += eval(Weight);
          myquery = {
            UPS_Shelfs: Location
          };
          newvalues = {
            $set: {
              NumberOfProductsonShelf: numberOfProductsonShelf,
              CurrentWeight: weight
            }
          };
          _context25.next = 15;
          return regeneratorRuntime.awrap(Shelfs.updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
          }));

        case 15:
          i++;
          _context25.next = 4;
          break;

        case 18:
        case "end":
          return _context25.stop();
      }
    }
  });
};

var updateNewInventory = function updateNewInventory(sumAmount, sumWeight, Location) {
  var data, ups_shelf, numberOfProductsonShelf, weight, myquery, newvalues;
  return regeneratorRuntime.async(function updateNewInventory$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          console.log('cc');
          _context26.next = 3;
          return regeneratorRuntime.awrap(Shelfs.find({}));

        case 3:
          data = _context26.sent;
          i = 0;

        case 5:
          if (!(i < data.length)) {
            _context26.next = 20;
            break;
          }

          if (!(Location == data[i].UPS_Shelfs)) {
            _context26.next = 17;
            break;
          }

          ups_shelf = data[i].UPS_Shelfs;
          numberOfProductsonShelf = data[i].NumberOfProductsonShelf;
          weight = data[i].CurrentWeight;
          numberOfProductsonShelf += eval(sumAmount);
          weight += eval(sumWeight);
          ;
          myquery = {
            UPS_Shelfs: Location
          };
          newvalues = {
            $set: {
              NumberOfProductsonShelf: numberOfProductsonShelf,
              CurrentWeight: weight
            }
          };
          _context26.next = 17;
          return regeneratorRuntime.awrap(Shelfs.updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
          }));

        case 17:
          i++;
          _context26.next = 5;
          break;

        case 20:
        case "end":
          return _context26.stop();
      }
    }
  });
};

app.get('/get-Shelfs-list', function _callee22(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee22$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          _context27.next = 2;
          return regeneratorRuntime.awrap(Shelfs.find({}, {
            UPS_Shelfs: 1
          }));

        case 2:
          data = _context27.sent;
          res.send({
            data: data
          });

        case 4:
        case "end":
          return _context27.stop();
      }
    }
  });
});
app["delete"]('/deleteProduct/:id', function _callee23(req, res, next) {
  var id, product;
  return regeneratorRuntime.async(function _callee23$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          console.log('gg');
          id = req.params.id;
          console.log(id);
          _context28.prev = 3;
          _context28.next = 6;
          return regeneratorRuntime.awrap(isProductExists(id));

        case 6:
          product = _context28.sent;

          if (product.isExists) {
            _context28.next = 11;
            break;
          }

          res.status(500).send('Error: Product does not exists');
          _context28.next = 14;
          break;

        case 11:
          _context28.next = 13;
          return regeneratorRuntime.awrap(Products.deleteOne({
            _id: id
          }));

        case 13:
          //  const data = await Products.find({})
          res.send({
            deleted: true
          });

        case 14:
          _context28.next = 19;
          break;

        case 16:
          _context28.prev = 16;
          _context28.t0 = _context28["catch"](3);
          console.log(_context28.t0);

        case 19:
        case "end":
          return _context28.stop();
      }
    }
  }, null, null, [[3, 16]]);
});

var isProductExists = function isProductExists(id) {
  var isExists, data;
  return regeneratorRuntime.async(function isProductExists$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          isExists = false;
          _context29.next = 3;
          return regeneratorRuntime.awrap(Products.find({
            _id: id
          }));

        case 3:
          data = _context29.sent;
          console.log(data);

          if (data !== null) {
            isExists = true;
          }

          console.log(isExists);
          return _context29.abrupt("return", {
            isExists: isExists,
            data: data
          });

        case 8:
        case "end":
          return _context29.stop();
      }
    }
  });
};

app.get('/get-details-product:id', function _callee24(req, res) {
  var id, findProduct;
  return regeneratorRuntime.async(function _callee24$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          id = req.params.id;
          _context30.prev = 1;
          _context30.next = 4;
          return regeneratorRuntime.awrap(Products.findOne({
            _id: id
          }));

        case 4:
          findProduct = _context30.sent;
          res.send(findProduct);
          _context30.next = 11;
          break;

        case 8:
          _context30.prev = 8;
          _context30.t0 = _context30["catch"](1);
          console.log(_context30.t0);

        case 11:
        case "end":
          return _context30.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
var port = process.env.PORT || 8080;
app.listen(port, function () {
  return console.log('http://localhost:8080/login/login.html');
});