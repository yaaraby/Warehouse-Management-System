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
var textmessage = document.querySelector('.textmessage');
var Searchtml = document.querySelector('.Searchtml');
var outcome = document.querySelector('.outcome');
var cardtext = document.querySelector('.cardtext');
var menu = document.querySelector(".menu");
var menubutoon = document.querySelector(".menubutoon");
var UsersList = document.getElementById('UsersList');
testcoocik();

function testcoocik() {
  fetch('/Cookie-test').then(function (r) {
    return r.json();
  }).then(function (data) {
    if (data.validated !== true) {
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
  cardCategory.style.display = 'none';
  ShowAll.style.display = 'none';
  UsersList.style.display = 'none';
  Registration.style.display = 'none';
  inputSearch.focus();
}

function deleteoutcome() {
  outcome.style.display = 'none';
}

function functionSearch() {
  if (inputSearch.placeholder == 'בחר סוג חיפוש >>') {
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
    cardtext.innerHTML = "<div class=\"text\"><b>\u05E9\u05DD \u05DE\u05D5\u05E6\u05E8:</b>".concat(data.data[0].Name, "</div>\n            <div class=\"text\"><b>\u05EA\u05D0\u05E8\u05D9\u05DA \u05EA\u05E4\u05D5\u05D2\u05D4:</b>").concat(data.data[0].ExpiryDate, "</div>\n            <div class=\"text\"><b>\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4:</b>").concat(data.data[0].Category, "</div>\n            <div class=\"text\"><b>UPS-\u05DE\u05E7\u05D8:</b>").concat(data.data[0].UPS, "</div>\n            <div class=\"text\"><b>\u05DE\u05E9\u05E7\u05DC:</b>").concat(data.data[0].Weight, "</div>\n            <div class=\"text\"><b>\u05DE\u05D7\u05D9\u05E8:</b>").concat(data.data[0].price, "</div>\n            <div class=\"text\" style=\"direction: initial;\"><b>\u05DE\u05D9\u05E7\u05D5\u05DD:</b>").concat(data.data[0].Location, "</div>\n            <div class=\"text\"><img src=\"").concat(data.data[0].Picture, "\"></div>");
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
  Registration.style.display = 'none';
  Search.style.display = 'none';
  ShowAll.style.display = 'none';
  UsersList.style.display = 'none';
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
      carbox.innerHTML += "<div class=\"cardlist\" onclick=\"PullInformation('".concat(elm.UPS, "')\">\n                <div class=\"list\"><b>UPS-\u05DE\u05E7\u05D8:</b></br></br>").concat(elm.UPS, "</div>\n                <div class=\"list\"><b>\u05E9\u05DD \u05D4\u05DE\u05D5\u05E6\u05E8:</b></br></br>").concat(elm.Name, "</div>\n            <div class=\"list\"><b>\u05EA\u05D0\u05E8\u05D9\u05DA \u05EA\u05E4\u05D5\u05D2\u05D4:</b></br></br>").concat(elm.ExpiryDate, "</div> \n            <div class=\"list\" style=\"direction: initial;\"><b>\u05DE\u05D9\u05E7\u05D5\u05DD:</b></br></br>").concat(elm.Location, "</div> \n        </div>");
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
  menu.style.right = '-100%';
}

function alluser(data) {
  document.getElementById('UsersList').innerHTML = "<div class=\"col-sm-4\">\n        <button class=\"Addanewuser\" onclick=\"Addauser()\"><img src=\"/img/adduser.png\"></button>\n        </div>\n<table>\n<thead>\n    <tr>\n        <th></th>\n        <th>\u05D6\u05D4\u05D5\u05EA \u05DE\u05E9\u05EA\u05DE\u05E9</th>\n        <th>\u05E9\u05DD \u05DE\u05E9\u05EA\u05DE\u05E9</th>\n        <th>\u05EA\u05E4\u05E7\u05D9\u05D3</th>\n    </tr>\n</thead>\n    <tbody>\n        ".concat(data.map(function (elm) {
    return "<tr>\n        <td class=\"flexdeleteuser\">\n        <a action=\"Edit\" class=\"deleteuser\" onclick='editUser(".concat(elm._id, ")'><img src=\"/img/edit-button.png\"></a>\n        <a action=\"Delete\" class=\"deleteuser\" onclick='deleteUser(\"").concat(elm._id, "\")'><img src=\"/img/deleteuser.png\"></a>\n        </td>\n                <td>").concat(elm.id_user, "</td>\n                <td>").concat(elm.userName, "</td>\n                <td>").concat(elm.role, "</td> \n        </tr>\n\n");
  }).join(''), "</tbody>\n</table>");
}