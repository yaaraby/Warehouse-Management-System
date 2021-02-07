"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Searchselect = document.querySelector("#Searchselect");
var inputSearch = document.querySelector("#inputSearch");
var Search = document.querySelector('.Search');
var cardboxcatygory = document.querySelector('.cardboxcatygory');
var cardCategory = document.querySelector('.cardCategory');
var carbox = document.querySelector('.carbox');
var titlecategory = document.querySelector('.titlecategory');
var ShowAll = document.querySelector('.ShowAll');
var message = document.querySelector("#message");
var Registration = document.querySelector('.Registration');
var AddShelf = document.querySelector('.AddShelf');
var textmessage = document.querySelector('.textmessage');
var Searchtml = document.querySelector('.Searchtml');
var outcome = document.querySelector('.outcome');
var cardtext = document.querySelector('.cardtext');
var menu = document.querySelector(".menu");
var menubutoon = document.querySelector(".menubutoon");
var UsersList = document.getElementById('UsersList');
var ShelfList = document.getElementById('ShelfList');
var handleAddShelftext = document.querySelector(".handleAddShelftext");
var cardlogin = document.querySelector('.cardlogin');
var alluserconnected = document.querySelector('.alluserconnected');
var addNewProductclass = document.querySelector('.addNewProductclass');
var shelfOptionsGlobal = [];

var init = function init() {
  getShelfList();
};

function connected() {
  fetch('/alluserconnected').then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);
    document.getElementById('UsersList').innerHTML = "<img src=\"/img/delete.png\" class=\"displaynone\" onclick=\"UsersListnone()\">\n                <h1>\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD \u05DE\u05D7\u05D5\u05D1\u05E8\u05D9\u05DD</h1>\n    <table>\n    <thead>\n        <tr>\n            <th></th>\n            <th>\u05D6\u05D4\u05D5\u05EA \u05DE\u05E9\u05EA\u05DE\u05E9</th>\n            <th>\u05E9\u05DD \u05DE\u05E9\u05EA\u05DE\u05E9</th>\n            <th>\u05EA\u05E4\u05E7\u05D9\u05D3</th>\n        </tr>\n    </thead>\n        <tbody>\n            ".concat(data.data.map(function (elm) {
      return "<tr>\n            <td class=\"flexdeleteuser\">\n            <a action=\"Edit\" class=\"deleteuser\" onclick='editUser(\"".concat(elm._id, "\")'><img src=\"/img/edit-button.png\"></a>\n            <a action=\"Delete\" class=\"deleteuser\" onclick='deleteUser(\"").concat(elm._id, "\")'><img src=\"/img/deleteuser.png\"></a>\n            </td>\n                    <td>").concat(elm.id_user, "</td>\n                    <td>").concat(elm.userName, "</td>\n                    <td>").concat(elm.role, "</td> \n            </tr>\n    \n    ");
    }).join(''), "</tbody>\n    </table>");
    outcome.style.display = 'none';
    Registration.style.display = 'none';
    Search.style.display = 'none';
    ShowAll.style.display = 'none';
    cardCategory.style.display = 'none';
    AddShelf.style.display = 'none';
    ShelfList.style.display = 'none';
    editUserById.style.display = 'none';
    editProductById.style.display = 'none';
    addNewProductclass.style.display = 'none';
    menubutoondisplayblock();
    UsersList.style.display = 'block';
  });
}

var xdeta = new Date().getHours();
var hour;

if (xdeta >= 6 && xdeta < 12) {
  hour = "בוקר טוב";
}

if (xdeta >= 12 && xdeta < 18) {
  hour = "צהרים טובים";
}

if (xdeta >= 18 && xdeta < 23) {
  hour = "ערב טוב";
}

if (xdeta >= 23 || xdeta >= 0 && xdeta < 6) {
  hour = "לילה טוב";
}

setInterval(function () {
  testcoocik();
}, 100000);
testcoocik();

function testcoocik() {
  fetch('/Cookie-test').then(function (r) {
    return r.json();
  }).then(function (data) {
    if (data.validated == "ok") {
      document.body.style.display = "block";
      cardlogin.innerHTML = "<div class=\"textcardlogin\">".concat(hour, "</div><img onclick='editUsercardlogin(\"").concat(data.id, "\")' src=\"/img/user.jpg\" alt=\"\"><div class=\"textcardlogin\">").concat(data.name, "</div>");
    } else if (data.validate == 'none') {
      location.href = '/userRegular/index.html';
    } else {
      location.href = '/login/login.html';
    }
  });
}

var editUsercardlogin = function editUsercardlogin(userId) {
  menubutoondisplayblock();
  outcome.style.display = 'none';
  Registration.style.display = 'none';
  Search.style.display = 'none';
  ShowAll.style.display = 'none';
  cardCategory.style.display = 'none';
  UsersList.style.display = 'none';
  AddShelf.style.display = 'none';
  ShelfList.style.display = 'none';
  addNewProductclass.style.display = 'none';
  fetch('/get-details-users' + userId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    editUserById.style.display = "block";
    document.getElementById('editUserById').innerHTML = "<img onclick='displaynoneeditusercardlogin()' src=\"/img/delete.png\" alt=\"\">\n                <h1>\u05E2\u05E8\u05D9\u05DB\u05EA \u05E4\u05E8\u05D8\u05D9\u05DD \u05D0\u05D9\u05E9\u05D9\u05D9\u05DD</h1>\n                    <form onsubmit=\"handleEditUser(event)\">\n                 <div class=\"rtl\">\n                     <label for=\"id_user\">\u05DE\u05E1\u05E4\u05E8 \u05D6\u05D4\u05D5\u05EA:\n                    <input type=\"text\" name=\"id_user\" id=\"id_user\" value=\"".concat(data.id_user, "\" disabled=\"disabled\" autocomplete='off'></br>\n                </label>\n                <label for=\"name\">\u05E9\u05DD:\n                    <input type=\"text\" name=\"name\" id=\"name\" value=\"").concat(data.name, "\" autocomplete='off'></br>\n                </label>\n                <label for=\"userName\">\u05E9\u05DD \u05DE\u05E9\u05EA\u05DE\u05E9:\n                    <input type=\"text\" name=\"username\" id=\"userName\" value=").concat(data.userName, " autocomplete='off'></br>\n                </label>\n                <label for=\"password\">\u05E1\u05D9\u05E1\u05DE\u05D4:\n                    <input type=\"text\" name=\"password\" id=\"password\" value=").concat(data.password, " autocomplete='off'></br>\n                </label>\n                <label for=\"email\">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC:\n                    <input type=\"email\" name=\"email\" id=\"email\" value=").concat(data.email, " autocomplete='off'></br>\n                </label>\n                <label for=\"phone\">\u05E4\u05DC\u05D0\u05E4\u05D5\u05DF:\n                    <input type=\"text\" name=\"phone\" id=\"phone\" value=").concat(data.phone, " autocomplete='off'></br>\n                </label>\n            </div>\n            <input type=\"text\" value=\"").concat(data.role, "\" disabled=\"disabled\" autocomplete='off'></br>\n            <div id=\"messag\"></div></br>\n            <input type=\"submit\" value=\"\u05E9\u05DE\u05D5\u05E8 \u05E9\u05D9\u05E0\u05D5\u05D9\u05D9\u05DD\">\n        </form>");
  });
};

function displaynoneeditusercardlogin() {
  editUserById.style.display = 'none';
}

function displaynoneeditProductardlogin() {
  editProductById.style.display = 'none';
}

function Output() {
  fetch('/Output').then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data) {
      location.href = '/login/login.html';
    }
  });
}

inputSearch.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    functionSearch();
  }
});

function deletesearch() {
  Search.style.display = 'none';
  inputSearch.value = '';
}

function cardCategorydisplaynone() {
  cardCategory.style.display = 'none';
}

function Addauser() {
  menubutoondisplayblock();
  editUserById.style.display = "none";
  cardCategory.style.display = 'none';
  ShowAll.style.display = 'none';
  Search.style.display = 'none';
  UsersList.style.display = 'none';
  addNewProductclass.style.display = 'none';
  Registration.style.display = 'block';
}

function Registrationdisplaynone() {
  Registration.style.display = 'none';
  addNewProductclass.style.display = 'none';
}

function Searchdisplayblock() {
  menubutoondisplayblock();
  Search.style.display = 'block';
  editUserById.style.display = "none";
  editProductById.style.display = "none";
  cardCategory.style.display = 'none';
  ShowAll.style.display = 'none';
  UsersList.style.display = 'none';
  Registration.style.display = 'none';
  AddShelf.style.display = 'none';
  ShelfList.style.display = 'none';
  addNewProductclass.style.display = 'none';
  inputSearch.focus();
}

function deleteoutcome() {
  outcome.style.display = 'none';
}

function functionSearch() {
  if (inputSearch.placeholder == 'בחר סוג חיפוש') {
    textmessage.innerHTML = 'הזן סוג חיפוש';
  } else {
    var placeholder = inputSearch.placeholder;
    var inputvalue = inputSearch.value;

    if (inputvalue.length == 0) {
      textmessage.innerHTML = 'הזן מידע לחיפוש';
    } else {
      textmessage.innerHTML = '<img src="/img/gif.gif">';
      fetch('/Searchdeta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          placeholder: placeholder,
          inputvalue: inputvalue
        })
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        Searchtml.innerHTML = "";

        if (data.message !== undefined) {
          textmessage.innerHTML = data.message;
        }

        if (data.data) {
          textmessage.innerHTML = placeholder;
          Searchtml.innerHTML += "<table>\n                            <thead>\n                                <tr>\n                                <th></th>\n                                    <th>\u05DE\u05E7\u05D8 - UPS </th>\n                                    <th>\u05E9\u05DD \u05D4\u05DE\u05D5\u05E6\u05E8</th>\n                                    <th>\u05EA\u05D0\u05E8\u05D9\u05DA \u05EA\u05E4\u05D5\u05D2\u05D4</th>\n                                      <th>\u05DE\u05D9\u05E7\u05D5\u05DD</th>\n                                </tr>\n                            </thead>\n                                <tbody>\n                                    ".concat(data.data.map(function (elm) {
            return " <tr onclick=\"PullInformation('".concat(elm._id, "')\">\n                            <td class=\"flexdeleteuser\">\n                            <a action=\"Edit\" class=\"editshelf\" style=\"margin: 5px 15px;cursor: pointer;\" onclick='editShelf(\"").concat(elm._id, "\")'><img src=\"/img/edit-button.png\"></a>\n                            <a action=\"Delete\" class=\"deleteShelf\"  style=\"margin: 5px 15px;cursor: pointer;\" onclick='deleteShelf(\"").concat(elm._id, "\")'><img src=\"/img/deleteuser.png\"></a>\n                            </td>\n                    \n                                            <td>").concat(elm.UPS, "</td>\n                                            <td>").concat(elm.Name, "</td>\n                                            <td>").concat(elm.ExpiryDate, "</td>\n                                            <td>").concat(elm.Location, "</td> \n                                    </tr>\n                            ");
          }).join(''), "</tbody>\n                            </table>");
        }
      });
    }
  }
}

function PullInformation(e) {
  fetch('/PullInformation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      e: e
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    outcome.style.display = 'flex';
    console.log(data);
    cardtext.innerHTML = "<div class=\"text\"><b>\u05E9\u05DD \u05DE\u05D5\u05E6\u05E8:</b>".concat(data.data[0].Name, "</div>\n            <div class=\"text\"><b>\u05EA\u05D0\u05E8\u05D9\u05DA \u05EA\u05E4\u05D5\u05D2\u05D4:</b>").concat(data.data[0].ExpiryDate, "</div>\n            <div class=\"text\"><b>\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4:</b>").concat(data.data[0].Category, "</div>\n            <div class=\"text\"><b>UPS-\u05DE\u05E7\u05D8:</b>").concat(data.data[0].UPS, "</div>\n            <div class=\"text\"><b>\u05DE\u05E9\u05E7\u05DC:</b>").concat(data.data[0].Weight, "</div>\n            <div class=\"text\"><b>\u05DE\u05D7\u05D9\u05E8:</b>").concat(data.data[0].price, "</div>\n            <div class=\"text\" style=\"direction:revert;\"><b>\u05DE\u05D9\u05E7\u05D5\u05DD:</b>").concat(data.data[0].Location, "</div>");
  });
}

function valueselect(event) {
  inputSearch.placeholder = event.target.value;
  textmessage.innerHTML = inputSearch.placeholder;
}

var handleRegistration = function handleRegistration(e) {
  e.preventDefault();
  var id_user = document.querySelector('#id_user');
  var name = document.querySelector('#name');
  var userName = document.querySelector('#userName');
  var password = document.querySelector('#password');
  var email = document.querySelector('#email');
  var phone = document.querySelector('#phone');
  var role = document.querySelector('#role');

  if (id_user.value.length !== 9) {
    message.innerHTML = 'מספר זהות לא תקין';
  } else if (name.value.length < 2) {
    message.innerHTML = 'נדרש להזין שם מלא תקין';
  } else if (userName.value.length < 2) {
    message.innerHTML = 'נדרש להזין שם משתמש</br> המכיל 2 תווים לפחות ';
  } else if (password.value.length < 6) {
    message.innerHTML = 'בחר/י סיסמה המכילה 6</br> תווים לפחות';
  } else if (email.value.length == 0) {
    message.innerHTML = 'נדרש להזין כתובת מייל';
  } else if (phone.value.length !== 9 && phone.value.length !== 10) {
    message.innerHTML = 'מספר טלפון לא תקין';
  } else if (role.value == "דירוג") {
    message.innerHTML = 'בחר דירוג למשתמש';
  } else {
    var concat = {
      "id_user": id_user.value,
      "name": name.value,
      "userName": userName.value,
      "password": password.value,
      "email": email.value,
      "phone": phone.value,
      "role": role.value
    };
    message.innerHTML = '<img src="/img/gif.gif">';
    fetch('/send-User-details-sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(concat)
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      console.log(data.message);

      if (data.message == 'ok') {
        message.innerHTML = "הוספת המשתמש בוצע בהצלחה";
        console.log('הוספת המשתמש בוצע בהצלחה');
        id_user.value = '';
        name.value = '';
        userName.value = '';
        password.value = '';
        email.value = '';
        phone.value = '';
        role.value = 'דירוג';
        setTimeout(function () {
          getListUsers();
        }, 500);
      } else {
        message.innerHTML = data.message;
      }
    });
  }
};

function getCategory() {
  menubutoondisplayblock();
  var aryycategory = [];
  editUserById.style.display = "none";
  Registration.style.display = 'none';
  Search.style.display = 'none';
  ShowAll.style.display = 'none';
  UsersList.style.display = 'none';
  AddShelf.style.display = 'none';
  ShelfList.style.display = 'none';
  cardboxcatygory.innerHTML = '';
  addNewProductclass.style.display = 'none';
  cardCategory.style.display = 'block';
  fetch('/get-category').then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.data.length > 0) {
      data.data.forEach(function (element) {
        if (aryycategory.indexOf(element.Category) == -1) {
          aryycategory.push(element.Category);
        }
      });
      aryycategory.forEach(function (elm) {
        cardboxcatygory.innerHTML += "<div class=\"A_line_in_a_category\" onclick=\"PullThiscCategory(event)\">".concat(elm, "</div>");
      });
    } else {
      cardboxcatygory.innerHTML = '<h1>הנתונים לא זמינים</h1>';
    }
  });
}

function PullThiscCategory(event) {
  var eventCategory = event.target.innerText;
  carbox.innerHTML = '';
  fetch('/PullThiscCategory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      eventCategory: eventCategory
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    Registration.style.display = 'none';
    cardCategory.style.display = 'none';
    addNewProductclass.style.display = 'none';
    ShowAll.style.display = 'block';
    titlecategory.innerHTML = eventCategory;
    carbox.innerHTML += "<table>\n<thead>\n    <tr>\n        <th>\u05DE\u05D9\u05E7\u05D5\u05DD</th>\n        <th>\u05EA\u05D0\u05E8\u05D9\u05DA \u05EA\u05E4\u05D5\u05D2\u05D4</th>\n        <th>\u05E9\u05DD \u05D4\u05DE\u05D5\u05E6\u05E8</th>\n        <th>\u05DE\u05E7\u05D8 - UPS </th>\n        <th></th>\n    </tr>\n</thead>\n    <tbody>\n        ".concat(data.data.map(function (elm) {
      return "<tr>\n                <td>".concat(elm.Location, "</td> \n                <td>").concat(elm.ExpiryDate, "</td>\n                <td>").concat(elm.Name, "</td>\n                <td>").concat(elm.UPS, "</td>\n                <td class=\"flexCrudProduct\">\n                <div class=\"list\" onclick=\"editProduct('").concat(elm._id, "')\"><img src=\"/img/edit-button.png\"></div>\n                <div class=\"list\" onclick=\"deleteProduct('").concat(elm._id, "')\"><img src=\"/img/deleteuser.png\"></div>\n                </td>\n        </tr>\n");
    }).join(''), "</tbody>\n</table>");
  });
}

function getListUsers() {
  menu.style.right = '-220px';
  fetch('/get-List-Users').then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.data != null) {
      outcome.style.display = 'none';
      Registration.style.display = 'none';
      Search.style.display = 'none';
      ShowAll.style.display = 'none';
      cardCategory.style.display = 'none';
      editUserById.style.display = "none";
      editProductById.style.display = "none";
      AddShelf.style.display = 'none';
      ShelfList.style.display = 'none';
      addNewProductclass.style.display = 'none';
      UsersList.style.display = 'block';
      alluser(data.data);
    }
  });
}

var deleteUser = function deleteUser(userId) {
  fetch('/' + userId, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    alluser(data);
  });
};

function displayblockmenu(event) {
  menu.style.right = '0'; // event.target.style.display='none'
}

function menubutoondisplayblock() {
  menu.style.right = '-220px';
}

function UsersListnone() {
  UsersList.style.display = 'none';
}

function alluser(data) {
  document.getElementById('UsersList').innerHTML = "\n        <img src=\"/img/delete.png\" class=\"displaynone\" onclick=\"UsersListnone()\"><div class=\"col-sm-4\">\n        <button class=\"Addanewuser\" onclick=\"Addauser()\"><img src=\"/img/adduser.png\"></button>\n        </div>\n<table>\n<thead>\n    <tr>\n        <th></th>\n        <th>\u05D6\u05D4\u05D5\u05EA \u05DE\u05E9\u05EA\u05DE\u05E9</th>\n        <th>\u05E9\u05DD \u05DE\u05E9\u05EA\u05DE\u05E9</th>\n        <th>\u05EA\u05E4\u05E7\u05D9\u05D3</th>\n    </tr>\n</thead>\n    <tbody>\n        ".concat(data.map(function (elm) {
    return "<tr>\n        <td class=\"flexdeleteuser\">\n        <a action=\"Edit\" class=\"deleteuser\" onclick='editUser(\"".concat(elm._id, "\")'><img src=\"/img/edit-button.png\"></a>\n        <a action=\"Delete\" class=\"deleteuser\" onclick='deleteUser(\"").concat(elm._id, "\")'><img src=\"/img/deleteuser.png\"></a>\n        </td>\n                <td>").concat(elm.id_user, "</td>\n                <td>").concat(elm.userName, "</td>\n                <td>").concat(elm.role, "</td> \n        </tr>\n\n");
  }).join(''), "</tbody>\n</table>");
}

var editUserById = document.querySelector("#editUserById");

function editUserByIddisplaynone() {
  editUserById.style.display = "none";
  UsersList.style.display = 'block';
}

var editUser = function editUser(userId) {
  menubutoondisplayblock();
  letdistinctResult = [];
  fetch('/get-details-users' + userId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data.Location);
    editUserById.style.display = "block";
    UsersList.style.display = 'none';
    document.getElementById('editUserById').innerHTML = "<img class=\"imgdeleteeditUser\" src=\"/img/return.png\" onclick=\"editUserByIddisplaynone()\">\n                    <h1>\u05E2\u05E8\u05D9\u05DB\u05EA \u05DE\u05E9\u05EA\u05DE\u05E9</h1>\n                    <form onsubmit=\"handleEditUser(event)\">\n                    \n                 <div class=\"rtl\">\n                 \n                     <label for=\"id_user\">\u05DE\u05E1\u05E4\u05E8 \u05D6\u05D4\u05D5\u05EA:\n                    <input type=\"text\" name=\"id_user\" id=\"id_user\" value=\"".concat(data.id_user, "\" disabled=\"disabled\" autocomplete='off'></br>\n                </label>\n                <label for=\"name\">\u05E9\u05DD:\n                    <input type=\"text\" name=\"name\" id=\"name\" value=\"").concat(data.name, "\" autocomplete='off'></br>\n                </label>\n                <label for=\"userName\">\u05E9\u05DD \u05DE\u05E9\u05EA\u05DE\u05E9:\n                    <input type=\"text\" name=\"username\" id=\"userName\" value=").concat(data.userName, " autocomplete='off'></br>\n                </label>\n                <label for=\"password\">\u05E1\u05D9\u05E1\u05DE\u05D4:\n                    <input type=\"text\" name=\"password\" id=\"password\" value=").concat(data.password, " autocomplete='off'></br>\n                </label>\n                <label for=\"email\">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC:\n                    <input type=\"email\" name=\"email\" id=\"email\" value=").concat(data.email, " autocomplete='off'></br>\n                </label>\n                <label for=\"phone\">\u05E4\u05DC\u05D0\u05E4\u05D5\u05DF:\n                    <input type=\"text\" name=\"phone\" id=\"phone\" value=").concat(data.phone, " autocomplete='off'></br>\n                </label>\n            </div>\n            <select name=\"role\" id=\"role\" value=").concat(data.role, ">\n                <option selected disabled hidden>").concat(data.role, "</option>\n                <option>\u05DE\u05D7\u05E1\u05E0\u05D0\u05D9</option>\n                <option>\u05DE\u05E0\u05D4\u05DC</option>\n            </select></br>\n            <div id=\"messag\"></div></br>\n            <input type=\"submit\" value=\"\u05E9\u05DE\u05D5\u05E8 \u05E9\u05D9\u05E0\u05D5\u05D9\u05D9\u05DD\">\n        </form>");
  });
};

function handleEditUser(e) {
  e.preventDefault();
  var id_user = e.target[0].value;
  var name = e.target[1].value;
  var userName = e.target[2].value;
  var password = e.target[3].value;
  var email = e.target[4].value;
  var phone = e.target[5].value;
  var role = e.target[6].value;
  var message = document.getElementById('messag');
  message.innerHTML = '';

  if (name.length < 2) {
    message.innerHTML = 'נדרש להזין שם מלא תקין';
  } else if (userName.length < 2) {
    message.innerHTML = 'נדרש להזין שם משתמש</br> המכיל 2 תווים לפחות ';
  } else if (password.length < 6) {
    message.innerHTML = 'בחר/י סיסמה המכילה 6</br> תווים לפחות';
  } else if (email.length == 0) {
    message.innerHTML = 'נדרש להזין כתובת מייל';
  } else if (phone.length !== 9 && phone.length !== 10) {
    message.innerHTML = 'מספר טלפון לא תקין';
  } else if (role == "דירוג") {
    message.innerHTML = 'בחר דירוג למשתמש';
  } else {
    console.log(id_user, name, userName, password, email, role);
    fetch("/update", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_user: id_user,
        name: name,
        userName: userName,
        password: password,
        email: email,
        phone: phone,
        role: role
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.message == 'ok') {
        message.innerHTML = 'המשתמש עודכן במערכת';
        getListUsers();
      } else {
        message.innerHTML = data.message;
      }
    });
  }
} //Yehial!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


function handleAddShelf(e) {
  e.preventDefault();
  var firstRow = document.querySelector('#firstRow').value;
  var lastRow = document.querySelector('#lastRow').value;
  var numberOfAreas = document.querySelector('#numberOfAreas').value;
  var numberOfShelfs = document.querySelector('#numberOfShelfs').value;
  var shelfHeight = document.querySelector('#shelfHight').value;
  var maxWight = document.querySelector('#maxWight').value; // let tempTotalRowNumber = lastRow.value - firstRow.value;
  // let tempFirstRow = firstRow.value;
  // console.log(tempNewRows)
  // console.log(JSON.stringify({tempFirstRow , tempTotalRowNumber,numberOfAreas,numberOfShelfs,maxWight}))

  handleAddShelftext.innerHTML = '';
  fetch("/shelf-creation", {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstRow: firstRow,
      lastRow: lastRow,
      numberOfAreas: numberOfAreas,
      numberOfShelfs: numberOfShelfs,
      shelfHeight: shelfHeight,
      maxWight: maxWight
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log('Got Frome Server');

    if (data == true) {
      shelfObservation();
    } else {
      handleAddShelftext.innerHTML = data.message;
    }
  });
}

function addShelfDisplayNone() {
  AddShelf.style.display = 'none';
}

function shelfObservation() {
  fetch('/pull-Shelf').then(function (res) {
    return res.json();
  }).then(function (data) {
    ShelfList.style.display = 'block';
    outcome.style.display = 'none';
    Registration.style.display = 'none';
    Search.style.display = 'none';
    ShowAll.style.display = 'none';
    cardCategory.style.display = 'none';
    editUserById.style.display = "none";
    editProductById.style.display = "none";
    UsersList.style.display = 'none';
    AddShelf.style.display = 'none';
    addNewProductclass.style.display = 'none';
    menubutoondisplayblock();

    if (data.data[0] == undefined) {
      document.getElementById('ShelfList').innerHTML = "<img src=\"/img/delete.png\" class=\"displaynone\" onclick=\"shelfObservationDisplayNone()\"><button class=\"addNewShelf\" onclick=\"addNewShelf()\"><img src=\"/img/+.png\"></button><h1 style=\"text-align: center;\">\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05DE\u05D3\u05E4\u05D9\u05DD</h1>";
    } else {
      allShelfs(data.data);
    }
  });
}

function shelfObservationDisplayNone() {
  ShelfList.style.display = 'none';
}

function allShelfs(data) {
  menubutoondisplayblock(); // data.sort((a, b) => { if (a.Line < b.Line) return -1; })
  // data.sort((a, b) => { if (a.Area < b.Area) return -1; })

  document.getElementById('ShelfList').innerHTML = "<img src=\"/img/delete.png\" class=\"displaynone\" onclick=\"shelfObservationDisplayNone()\">\n        <div class=\"col-sm-4\">\n        <button class=\"addNewShelf\" onclick=\"addNewShelf()\"><img src=\"/img/+.png\"></button>\n        </div>\n<table>\n<thead>\n    <tr>\n        <th></th>\n        <th>\u05DE\u05E1\u05E4\u05E8 \u05DE\u05D3\u05E3</th>\n        <th>\u05DB\u05DE\u05D5\u05EA \u05DE\u05D5\u05E6\u05E8\u05D9\u05DD</th>\n        <th>\u05D2\u05D5\u05D1\u05D4 \u05DE\u05D3\u05E3</th>\n        <th>\u05DE\u05E9\u05E7\u05DC \u05DE\u05D3\u05E3</th>\n        <th>\u05DE\u05E9\u05E7\u05DC \u05DE\u05E7\u05E1\u05D9\u05DE\u05DC\u05D9</th>\n    </tr>\n</thead>\n    <tbody>\n    \n        ".concat(data.map(function (elm) {
    return "<tr>\n        <td class=\"flexdeleteuser\">\n        <a action=\"Edit\" class=\"editshelf\" style=\"margin: 5px 15px;cursor: pointer;\" onclick='editShelf(\"".concat(elm._id, "\")'><img src=\"/img/edit-button.png\"></a>\n        <a class=\"deleteShelf\"  style=\"margin: 5px 15px;cursor: pointer;\" onclick='deleteShelf(\"").concat(elm, "\")'><img src=\"/img/deleteuser.png\"></a>\n        </td>\n                <td style=\"direction: initial;\">").concat(elm.UPS_Shelfs, "</td>\n                <td>").concat(elm.NumberOfProductsonShelf, "</td>\n                <td>").concat(elm.height, "</td> \n                <td>").concat(elm.CurrentWeight, "</td> \n                <td>").concat(elm.MaximumWeight, "</td> \n                \n        </tr>\n\n");
  }).join(''), "\n</table>");
}

function addNewShelf() {
  menubutoondisplayblock();
  ShelfList.style.display = 'none';
  AddShelf.style.display = 'block';
}

function addShelflist() {
  AddShelf.style.display = 'none';
  ShelfList.style.display = 'block';
} //yaara ------------------------------------


function getShelfList() {
  fetch('/get-Shelfs-list').then(function (res) {
    return res.json();
  }).then(function (data) {
    setShelfList(data.data);
  });
}

function setShelfList(shelfs) {
  var shelfOptions = shelfs.map(function (shelf) {
    return "<option style=\"direction: initial;\" value='".concat(shelf.UPS_Shelfs, "'>").concat(shelf.UPS_Shelfs, "</option>");
  });
  shelfOptionsGlobal = _toConsumableArray(shelfOptions); //  this.shelfOptions = shelfOptions

  document.getElementById("UPS_Shelfs").innerHTML = shelfOptionsGlobal.join(" ");
}

function addNewProduct(e) {
  var message, UPS, Name, price, Amount, Category, Weight, height, ExpiryDate, Location, validations, getWeight, checkCurrrentWeight, getHeight, checkHeight;
  return regeneratorRuntime.async(function addNewProduct$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          message = document.querySelector("#messagetext");
          e.preventDefault();
          UPS = e.target[0].value;
          Name = e.target[1].value;
          price = e.target[2].value;
          Amount = e.target[3].value;
          Category = e.target[4].value;
          Weight = e.target[5].value;
          height = e.target[6].value;
          ExpiryDate = e.target[7].value;
          Location = e.target[8].value;
          validations = Validations(UPS, Name, price, Amount, Category, Weight, height, ExpiryDate, Location);

          if (!(validations == true)) {
            _context.next = 22;
            break;
          }

          _context.next = 15;
          return regeneratorRuntime.awrap(getCurrrentWeight(Location));

        case 15:
          getWeight = _context.sent;
          checkCurrrentWeight = CalcWeight(getWeight, Weight);
          _context.next = 19;
          return regeneratorRuntime.awrap(getCurrrentHeight(Location));

        case 19:
          getHeight = _context.sent;
          checkHeight = CalcHeight(getHeight, height);

          if (checkHeight == false) {
            message.innerHTML = 'גובה המדף אינו מתאים לגובה המוצר, יש לבחור מדף אחר';
          } else if (checkCurrrentWeight == false) {
            message.innerHTML = 'המדף הנבחר מלא, יש לבחור מדף אחר';
          } else {
            fetch('/add_Products', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                UPS: UPS,
                Name: Name,
                price: price,
                Amount: Amount,
                Category: Category,
                Weight: Weight,
                height: height,
                ExpiryDate: ExpiryDate,
                Location: Location
              })
            }).then(function (res) {
              return res.json();
            }).then(function (data) {
              console.log(data);

              if (data.status == true) {
                message.innerHTML = "המוצר נוצר בהצלחה";
                setTimeout(function () {
                  getCategory();
                }, 500);
              } else {
                message.innerHTML = 'המוצר אינו נוסף למערכת, נסה שנית';
              }
            });
          }

        case 22:
        case "end":
          return _context.stop();
      }
    }
  });
}

var getCurrrentWeight = function getCurrrentWeight(UPS_Shelfs) {
  var check;
  return regeneratorRuntime.async(function getCurrrentWeight$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetch('/get-Details-Shelfs' + UPS_Shelfs, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(function (res) {
            return res.json();
          }).then(function (data) {
            check = data.MaximumWeight;
          }));

        case 2:
          return _context2.abrupt("return", check);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var getCurrrentHeight = function getCurrrentHeight(UPS_Shelfs) {
  var check;
  return regeneratorRuntime.async(function getCurrrentHeight$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(fetch('/get-Details-Shelfs' + UPS_Shelfs, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(function (res) {
            return res.json();
          }).then(function (data) {
            check = data.height;
          }));

        case 2:
          return _context3.abrupt("return", check);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var CalcWeight = function CalcWeight(getWeight, weight) {
  if (Number(getWeight) > Number(weight)) {
    return true;
  } else {
    return false;
  }
};

var CalcHeight = function CalcHeight(getHeight, height) {
  if (Number(getHeight) > Number(height)) {
    return true;
  } else {
    return false;
  }
};

var Validations = function Validations(UPS, name, price, amount, category, weight, height, ExpiryDate, UPS_Shelfs, checkCurrrentWeight, checkHeight) {
  var message = document.querySelector("#messagetext");

  if (UPS.length < 3) {
    message.innerHTML = 'נדרש להזין מק"ט באורך 3 ומעלה';
  } else if (name.length == 0) {
    message.innerHTML = 'יש להזין את שם המוצר';
  } else if (amount.length == 0) {
    message.innerHTML = 'יש להזין את כמות המוצר';
  } else if (category.length == 0) {
    message.innerHTML = 'יש להזין את קטגוריית המוצר';
  } else if (weight.length == 0) {
    message.innerHTML = 'יש להזין את משקל המוצר';
  } else if (height.length == 0) {
    message.innerHTML = 'יש להזין את גובה המוצר';
  } else if (UPS_Shelfs.length == 0) {
    message.innerHTML = 'יש לבחור את המדף הרצוי למוצר';
  } else {
    return true;
  }
};

var deleteProduct = function deleteProduct(_id) {
  console.log(_id);
  fetch('/deleteProduct/' + _id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    getCategory();
  });
};

var editProduct = function editProduct(id) {
  menubutoondisplayblock();
  letdistinctResult = [];
  fetch('/get-details-product' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    carbox.style.display = 'none';
    titlecategory.style.display = 'none';
    ShowAll.style.display = 'none';
    editProductById.style.display = "block";
    document.getElementById('editProductById').innerHTML = "<h1>\u05E2\u05E8\u05D9\u05DB\u05EA \u05DE\u05D5\u05E6\u05E8</h1>\n                   <form onsubmit=\"handleEditProduct(event, '".concat(data.Amount, "', '").concat(data.Weight, "','").concat(data.Location, "')\">\n                   \n                <div class=\"productDetails\">\n                    <label for=\"UPS\">\u05DE\u05E7\"\u05D8:\n                   <input type=\"number\" name=\"UPS\" id=\"UPS\" value=\"").concat(data.UPS, "\" disabled=\"disabled\" autocomplete='off'></br>\n               </label>\n               <label for=\"Name\">\u05E9\u05DD:\n                   <input type=\"text\" name=\"Name\" id=\"Name\" value=\"").concat(data.Name, "\" autocomplete='off'></br>\n               </label>\n               <label for=\"price\">\u05DE\u05D7\u05D9\u05E8:\n                   <input type=\"text\" name=\"price\" id=\"price\" value=").concat(data.price, " autocomplete='off'></br>\n               </label>\n               <label for=\"Amount\">\u05DB\u05DE\u05D5\u05EA:\n                   <input type=\"number\" name=\"Amount\" id=\"Amount\" value=").concat(data.Amount, " autocomplete='off'></br>\n               </label>\n               <label for=\"Category\">\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4:\n                   <input type=\"text\" name=\"Category\" id=\"Category\" value=").concat(data.Category, " autocomplete='off'></br>\n               </label>\n               <label for=\"Weight\">\u05DE\u05E9\u05E7\u05DC:\n                   <input type=\"number\" name=\"Weight\" id=\"Weight\" value=").concat(data.Weight, " autocomplete='off'></br>\n               </label>\n                <label for=\"height\">\u05D2\u05D5\u05D1\u05D4:\n                   <input type=\"number\" name=\"height\" id=\"height\" value=").concat(data.height, " autocomplete='off'></br>\n               </label>\n               <label for=\"ExpiryDate\">\u05EA\u05D0\u05E8\u05D9\u05DA \u05EA\u05E4\u05D5\u05D2\u05D4:\n                   <input type=\"date\" name=\"ExpiryDate\" id=\"ExpiryDate\" value=").concat(data.ExpiryDate, " autocomplete='off'></br>\n               </label>\n           </div>\n            <select name='Location' id='Location'>\n           \n            </select></br>\n           <div id=\"checkValidation\"></div></br>\n           <input type=\"submit\" value=\"\u05D0\u05D9\u05E9\u05D5\u05E8\">\n       </form>");
    document.getElementById("Location").innerHTML = "<option style=\"direction: initial;\" selected hidden>".concat(data.Location, "</option>") + shelfOptionsGlobal.join(" ");
  })["catch"](function (err) {
    console.error(err);
  })["finally"](function () {
    console.log('im done');
  });
};
/* 
const editProduct = (id) =>{
   menubutoondisplayblock()
   letdistinctResult= []; 
   fetch('/get-details-product' + id,{
             method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(res =>
          res.json()
      )
      .then(data => {
          carbox.style.display = 'none'
          titlecategory.style.display = 'none' 
        ShowAll.style.display = 'none'
       editProductById.style.display = "block"
       document.getElementById('editProductById').innerHTML =
           `<img onclick='displaynoneeditProductardlogin()' src="/img/delete.png" alt="">
                 
                  <h1>עריכת מוצר</h1>
                  <form onsubmit="handleEditProduct(event, ${data.Amount})">
                  
               <div class="productDetails">
                   <label for="UPS">מק"ט:
                  <input type="number" name="UPS" id="UPS" value="${data.UPS}" disabled="disabled" autocomplete='off'></br>
              </label>
              <label for="Name">שם:
                  <input type="text" name="Name" id="Name" value="${data.Name}" autocomplete='off'></br>
              </label>
              <label for="price">מחיר:
                  <input type="text" name="price" id="price" value=${data.price} autocomplete='off'></br>
              </label>
              <label for="Amount">כמות:
                  <input type="number" name="Amount" id="Amount" value=${data.Amount} autocomplete='off'></br>
              </label>
              <label for="Category">קטגוריה:
                  <input type="text" name="Category" id="Category" value=${data.Category} autocomplete='off'></br>
              </label>
              <label for="Weight">משקל:
                  <input type="number" name="Weight" id="Weight" value=${data.Weight} autocomplete='off'></br>
              </label>
               <label for="height">גובה:
                  <input type="number" name="height" id="height" value=${data.height} autocomplete='off'></br>
              </label>
              <label for="ExpiryDate">תאריך תפוגה:
                  <input type="date" name="ExpiryDate" id="ExpiryDate" value=${data.ExpiryDate} autocomplete='off'></br>
              </label>
          </div>
           <select name='Location' id='Location'>
           <option value = ${data.ExpiryDate}> ${data.ExpiryDate} </option>
           </select></br>
          <div id="message"></div></br>
          <input type="submit" value="אישור">
      </form>`;
  // console.log(this.shelfOptions)
  document.getElementById("Location").innerHTML = shelfOptionsGlobal.join(" ");

      }).catch(err => {
          console.error(err);
      }).finally(() => {
          console.log('im done')
      } )
   
}  */


function handleEditProduct(e, PreviousAmount, PreviousWeight, PreviousLocation) {
  var UPS, Name, price, Amount, Category, Weight, height, ExpiryDate, Location, checkValidation, validations, getWeight, checkCurrrentWeight, getHeight, checkHeight;
  return regeneratorRuntime.async(function handleEditProduct$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          e.preventDefault();
          UPS = e.target[0].value;
          Name = e.target[1].value;
          price = e.target[2].value;
          Amount = e.target[3].value;
          Category = e.target[4].value;
          Weight = e.target[5].value;
          height = e.target[6].value;
          ExpiryDate = e.target[7].value;
          Location = e.target[8].value;
          checkValidation = document.getElementById('checkValidation');
          checkValidation.innerHTML = '';
          _context4.next = 14;
          return regeneratorRuntime.awrap(Validations(UPS, Name, price, Amount, Category, Weight, height, ExpiryDate, Location));

        case 14:
          validations = _context4.sent;

          if (!(validations == true)) {
            _context4.next = 25;
            break;
          }

          _context4.next = 18;
          return regeneratorRuntime.awrap(getCurrrentWeight(Location));

        case 18:
          getWeight = _context4.sent;
          checkCurrrentWeight = CalcWeight(getWeight, Weight);
          _context4.next = 22;
          return regeneratorRuntime.awrap(getCurrrentHeight(Location));

        case 22:
          getHeight = _context4.sent;
          checkHeight = CalcHeight(getHeight, height);

          if (checkHeight == false) {
            checkValidation.innerHTML = 'גובה המדף אינו מתאים לגובה המוצר, יש לבחור מדף אחר';
          } else if (checkCurrrentWeight == false) {
            checkValidation.innerHTML = 'המדף הנבחר מלא, יש לבחור מדף אחר';
          } else {
            fetch("/Product", {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                UPS: UPS,
                Name: Name,
                price: price,
                Amount: Amount,
                Category: Category,
                Weight: Weight,
                height: height,
                ExpiryDate: ExpiryDate,
                Location: Location,
                PreviousAmount: PreviousAmount,
                PreviousWeight: PreviousWeight,
                PreviousLocation: PreviousLocation
              })
            }).then(function (res) {
              return res.json();
            }).then(function (data) {
              console.log(data);

              if (message) {
                checkValidation.innerHTML = 'המוצר עודכן במערכת';
                /*    setTimeout(() => {
                       PullThiscCategory(e)
                   }, 500); */
              } else {
                checkValidation.innerHTML = data.message;
              }
            });
          }

        case 25:
        case "end":
          return _context4.stop();
      }
    }
  });
}