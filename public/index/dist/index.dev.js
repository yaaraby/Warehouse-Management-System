"use strict";

// setInterval(function () {
//     fetch('/Cookie-test')
//         .then(r => r.json())
//         .then(data => {
//             if (data.validated !== true) {
//                 window.location.replace('/login/login.html')
//             }
//         })
// }, 1000);
var message = document.querySelector("#message");
var Registration = document.querySelector('.Registration');

function Addauser() {
  Registration.style.display = 'block';
}

function Registrationdisplaynone() {
  Registration.style.display = 'none';
}

function Output() {
  window.location.replace('/login/login.html');
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

  if (id_user.value.length == 0) {
    message.innerHTML = 'הזן מספר זהות';
  } else if (name.length == 0) {
    message.innerHTML = 'הזן שם פרטי';
  } else if (userName.value.length == 0) {
    message.innerHTML = 'הזן שם לכניסה';
  } else if (password.value.length == 0) {
    message.innerHTML = 'הזן סיסמה';
  } else if (email.value.length == 0) {
    message.innerHTML = 'הזן מייל';
  } else if (phone.value.length == 0) {
    message.innerHTML = 'הזן מספר טלפון';
  } else if (role.value == "דירוג") {
    message.innerHTML = 'הזן דירוג למשתמש';
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