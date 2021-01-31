"use strict";

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
var ShelfList = document.getElementById('ShelfList'); // const allShelfs = document.getElementById('allShelfs');

testcoocik();

function testcoocik() {
  fetch('/Cookie-test').then(function (r) {
    return r.json();
  }).then(function (data) {
    if (data.validated == "ok") {} else if (data.validate == 'none') {
      window.location.replace('/userRegular/index.html');
    } else {
      window.location.replace('/login/login.html');
    }
  });
}

function Output() {
  window.location.replace('/login/login.html');
  fetch('/Output');
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
  Registration.style.display = 'block';
}

function Registrationdisplaynone() {
  Registration.style.display = 'none';
}

function Searchdisplayblock() {
  menubutoondisplayblock();
  Search.style.display = 'block';
  editUserById.style.display = "none";
  cardCategory.style.display = 'none';
  ShowAll.style.display = 'none';
  UsersList.style.display = 'none';
  Registration.style.display = 'none';
  AddShelf.style.display = 'none';
  ShelfList.style.display = 'none';
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
          data.data.forEach(function (elm) {
            Searchtml.innerHTML += "<div class=\"cardlist\" onclick=\"PullInformation('".concat(elm.UPS, "')\">\n                    <div class=\"list\"><b>UPS-\u05DE\u05E7\u05D8:</b></br></br>").concat(elm.UPS, "</div>\n                    <div class=\"list\"><b>\u05E9\u05DD \u05D4\u05DE\u05D5\u05E6\u05E8:</b></br></br>").concat(elm.Name, "</div>\n                    <div class=\"list\"><b>\u05EA\u05D0\u05E8\u05D9\u05DA \u05EA\u05E4\u05D5\u05D2\u05D4:</b></br></br>").concat(elm.ExpiryDate, "</div>\n                    <div class=\"list\"><b>\u05DE\u05D9\u05E7\u05D5\u05DD:</b></br></br>").concat(elm.Location, "</div>\n                </div>");
          });
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
    cardtext.innerHTML = "<div class=\"text\"><b>\u05E9\u05DD \u05DE\u05D5\u05E6\u05E8:</b>".concat(data.data[0].Name, "</div>\n            <div class=\"text\"><b>\u05EA\u05D0\u05E8\u05D9\u05DA \u05EA\u05E4\u05D5\u05D2\u05D4:</b>").concat(data.data[0].ExpiryDate, "</div>\n            <div class=\"text\"><b>\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4:</b>").concat(data.data[0].Category, "</div>\n            <div class=\"text\"><b>UPS-\u05DE\u05E7\u05D8:</b>").concat(data.data[0].UPS, "</div>\n            <div class=\"text\"><b>\u05DE\u05E9\u05E7\u05DC:</b>").concat(data.data[0].Weight, "</div>\n            <div class=\"text\"><b>\u05DE\u05D7\u05D9\u05E8:</b>").concat(data.data[0].price, "</div>\n            <div class=\"text\"><b>\u05DE\u05D9\u05E7\u05D5\u05DD:</b>").concat(data.data[0].Location, "</div>");
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
  cardCategory.style.display = 'block';
  cardboxcatygory.innerHTML = '';
  fetch('/get-category').then(function (res) {
    return res.json();
  }).then(function (data) {
    data.data.forEach(function (element) {
      if (aryycategory.indexOf(element.Category) == -1) {
        aryycategory.push(element.Category);
      }
    });
    aryycategory.forEach(function (elm) {
      cardboxcatygory.innerHTML += "<div class=\"A_line_in_a_category\" onclick=\"PullThiscCategory(event)\">".concat(elm, "</div>");
    });
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
    ShowAll.style.display = 'block';
    console.log(data);
    titlecategory.innerHTML = eventCategory;
    data.data.forEach(function (elm) {
      carbox.innerHTML += "<div class=\"cardlist\" onclick=\"PullInformation('".concat(elm.UPS, "')\">\n                <div class=\"list\"><b>UPS-\u05DE\u05E7\u05D8:</b></br></br>").concat(elm.UPS, "</div>\n                <div class=\"list\"><b>\u05E9\u05DD \u05D4\u05DE\u05D5\u05E6\u05E8:</b></br></br>").concat(elm.Name, "</div>\n            <div class=\"list\"><b>\u05EA\u05D0\u05E8\u05D9\u05DA \u05EA\u05E4\u05D5\u05D2\u05D4:</b></br></br>").concat(elm.ExpiryDate, "</div> \n            <div class=\"list\"><b>\u05DE\u05D9\u05E7\u05D5\u05DD:</b></br></br>").concat(elm.Location, "</div> \n        </div>");
    });
  });
}

function getListUsers() {
  menu.style.right = '-100%';
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
      AddShelf.style.display = 'none';
      ShelfList.style.display = 'none';
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
  letdistinctResult = [];
  fetch('/get-details-users' + userId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    editUserById.style.display = "block";
    UsersList.style.display = 'none';
    document.getElementById('editUserById').innerHTML = "<img src=\"/img/return.png\" onclick=\"editUserByIddisplaynone()\">\n                    <h1>\u05E2\u05E8\u05D9\u05DB\u05EA \u05DE\u05E9\u05EA\u05DE\u05E9</h1>\n                    <form onsubmit=\"handleEditUser(event)\">\n                    \n                 <div class=\"rtl\">\n                 \n                     <label for=\"id_user\">\u05DE\u05E1\u05E4\u05E8 \u05D6\u05D4\u05D5\u05EA:\n                    <input type=\"text\" name=\"id_user\" id=\"id_user\" value=\"".concat(data.id_user, "\" disabled=\"disabled\" autocomplete='off'></br>\n                </label>\n                <label for=\"name\">\u05E9\u05DD:\n                    <input type=\"text\" name=\"name\" id=\"name\" value=\"").concat(data.name, "\" autocomplete='off'></br>\n                </label>\n                <label for=\"userName\">\u05E9\u05DD \u05DE\u05E9\u05EA\u05DE\u05E9:\n                    <input type=\"text\" name=\"username\" id=\"userName\" value=").concat(data.userName, " autocomplete='off'></br>\n                </label>\n                <label for=\"password\">\u05E1\u05D9\u05E1\u05DE\u05D4:\n                    <input type=\"text\" name=\"password\" id=\"password\" value=").concat(data.password, " autocomplete='off'></br>\n                </label>\n                <label for=\"email\">\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC:\n                    <input type=\"email\" name=\"email\" id=\"email\" value=").concat(data.email, " autocomplete='off'></br>\n                </label>\n                <label for=\"phone\">\u05E4\u05DC\u05D0\u05E4\u05D5\u05DF:\n                    <input type=\"text\" name=\"phone\" id=\"phone\" value=").concat(data.phone, " autocomplete='off'></br>\n                </label>\n            </div>\n            <select name=\"role\" id=\"role\" value=").concat(data.role, ">\n                <option style=\"display: none;\">").concat(data.role, "</option>\n                <option value=\"public\">\u05DE\u05D7\u05E1\u05E0\u05D0\u05D9</option>\n                <option value=\"admin\">\u05DE\u05E0\u05D4\u05DC</option>\n            </select></br>\n            <div id=\"messag\"></div></br>\n            <input type=\"submit\" value=\"\u05E9\u05DE\u05D5\u05E8 \u05E9\u05D9\u05E0\u05D5\u05D9\u05D9\u05DD\">\n        </form>");
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
  var firstRow = document.querySelector('#firstRow');
  var lastRow = document.querySelector('#lastRow');
  var numberOfAreas = document.querySelector('#numberOfAreas');
  var numberOfShelfs = document.querySelector('#numberOfShelfs');
  var tempTotalRowNumber = lastRow.value - firstRow.value;
  var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K'];
  var tempNewRows = [];
  console.log(firstRow.value, lastRow.value, numberOfAreas.value, numberOfShelfs.value);

  for (i = 1; i <= tempTotalRowNumber + 1; i++) {
    for (j = 1; j <= numberOfAreas.value; j++) {
      for (k = 1; k <= numberOfShelfs.value; k++) {
        console.log("".concat(i).concat(letters[j - 1]).concat(k));
        tempNewRows.push({
          Line: i,
          Area: "".concat(letters[j - 1]),
          Floor: k,
          UPS_Shelfs: "".concat(i, "-").concat(letters[j - 1], "-").concat(k) // NumberOfProductsonShelf:Number,
          // MaximumWeight: Number,
          // CurrentWeight: Number,
          // height: Number

        }); // Object.assign(tempNewRows, {row:`${i}${letters[j-1]}${k}`});
      }
    }
  }

  console.log(JSON.stringify(tempNewRows));
  fetch("/shelf-creation", {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tempNewRows)
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data.data);

    if (data == false) {
      console.log(data);
    } else {
      message.innerHTML = data.message;
    }
  });
  AddShelf.style.display = 'none';
}

function addShelfDisplayNone() {
  AddShelf.style.display = 'none';
}

function shelfObservation() {
  fetch('/pull-Shelf').then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.data != null) {
      outcome.style.display = 'none';
      Registration.style.display = 'none';
      Search.style.display = 'none';
      ShowAll.style.display = 'none';
      cardCategory.style.display = 'none';
      editUserById.style.display = "none";
      UsersList.style.display = 'none';
      AddShelf.style.display = 'none'; //need to change the userlist to shelf list

      ShelfList.style.display = 'block';
      allShelfs(data.data);
    }
  });
}

function shelfObservationDisplayNone() {
  ShelfList.style.display = 'none';
}

function allShelfs(data) {
  menubutoondisplayblock();
  document.getElementById('ShelfList').innerHTML = "<img src=\"/img/delete.png\" class=\"displaynone\" onclick=\"shelfObservationDisplayNone()\">\n        <div class=\"col-sm-4\">\n        <button class=\"addNewShelf\" onclick=\"addNewShelf()\"><img src=\"/img/+.png\"></button>\n        </div>\n<table>\n<thead>\n    <tr>\n        <th></th>\n        <th>\u05DE\u05E1\u05E4\u05E8 \u05DE\u05D3\u05E3</th>\n        <th>\u05DB\u05DE\u05D5\u05EA \u05DE\u05D5\u05E6\u05E8\u05D9\u05DD</th>\n        <th>\u05DE\u05E9\u05E7\u05DC \u05DE\u05D3\u05E3</th>\n        <th>\u05DE\u05E9\u05E7\u05DC \u05DE\u05E7\u05E1\u05D9\u05DE\u05DC\u05D9</th>\n    </tr>\n</thead>\n    <tbody>\n    \n        ".concat(data.map(function (elm) {
    return "<tr>\n        <td class=\"flexdeleteuser\">\n        <a action=\"Edit\" class=\"editshelf\" onclick='editShelf(\"".concat(elm._id, "\")'><img src=\"/img/edit-button.png\"></a>\n        <a action=\"Delete\" class=\"deleteShelf\" onclick='deleteShelf(\"").concat(elm._id, "\")'><img src=\"/img/deleteuser.png\"></a>\n        </td>\n                <td class=\"rtl\">").concat(elm.UPS_Shelfs, "</td>\n                <td>").concat(elm.NumberOfProductsonShelf, "</td>\n                <td>").concat(elm.MaximumWeight, "</td> \n                <td>").concat(elm.CurrentWeight, "</td> \n                \n        </tr>\n\n");
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
}