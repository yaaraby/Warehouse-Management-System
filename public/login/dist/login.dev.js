"use strict";

var error = document.getElementById('error');
document.querySelector("#userna").focus();
testcoocik();

function testcoocik() {
  fetch('/Cookie-test').then(function (r) {
    return r.json();
  }).then(function (data) {
    if (data.validated == "ok") {
      window.location.replace('/Director/index.html');
    } else if (data.validate == 'none') {
      window.location.replace('/userRegular/index.html');
    }
  });
}

var handleLogin = function handleLogin(event) {
  event.preventDefault();
  var userName = event.target.children.userName.value;
  var password = event.target.children.password.value;

  if (userName.length == 0 && password.length == 0) {
    error.innerHTML = 'הזן שם וסיסמה';
  } else if (userName.length == 0) {
    error.innerHTML = 'הזן שם משתמש';
  } else if (password.length == 0) {
    error.innerHTML = 'הזן סיסמה';
  } else {
    error.innerHTML = '<img src="/img/gif.gif">';
    fetch('/send-Login-details', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: userName,
        password: password
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.validate == true && data.role == 'ok') {
        window.location.replace('/Director/index.html');
      } else if (data.validate == true && data.role == 'none') {
        window.location.replace('/userRegular/index.html');
      } else {
        error.innerHTML = "פרטים שגויים נסה שנית";
      }
    });
  }
};