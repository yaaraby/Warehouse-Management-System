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

function deletesearch() {
  Search.style.display = 'none';
  inputSearch.value = '';
}

function cardCategorydisplaynone() {
  cardCategory.style.display = 'none';
}

function Addauser() {
  cardCategory.style.display = 'none';
  ShowAll.style.display = 'none';
  Search.style.display = 'none';
  Registration.style.display = 'block';
}

function Registrationdisplaynone() {
  Registration.style.display = 'none';
}

function Searchdisplayblock() {
  Search.style.display = 'block';
  cardCategory.style.display = 'none';
  ShowAll.style.display = 'none';
  Registration.style.display = 'none';
  inputSearch.focus();
}

function functionSearch() {
  console.log(inputSearch.value);
  console.log(inputSearch.placeholder);

  if (inputSearch.placeholder == 'בחר סוג חיפוש >>') {
    textmessage.innerHTML = 'הזן סוג חיפוש';
  }
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
    message.innerHTML = '<img src="/img/rotete.gif">';
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
      } else {
        message.innerHTML = data.message;
      }
    });
  }
};

function getCategory() {
  var aryycategory = [];
  Registration.style.display = 'none';
  Search.style.display = 'none';
  ShowAll.style.display = 'none';
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
      carbox.innerHTML += "<div class=\"cardlist\">\n            <div class=\"list\"><b>\u05E9\u05DD \u05D4\u05DE\u05D5\u05E6\u05E8:</b></br></br>".concat(elm.Name, "</div>\n            <div class=\"list\"><b>\u05DE\u05E9\u05E7\u05DC:</b></br></br>").concat(elm.Weight, "</div>\n            <div class=\"list\" style=\"border: 0;\"><b>\u05DE\u05D7\u05D9\u05E8:</b></br></br>").concat(elm.price, " \u20AA</div>\n        \n        </div>");
    }); //<img src="${elm.price}">
  });
}