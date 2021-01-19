"use strict";

var handleLogin = function handleLogin(event) {
  event.preventDefault();
  var userName = event.target.children.userName.value;
  var password = event.target.children.password.value;
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
    if (data.validate) {
      window.location.replace('/index/index.html');
    } else {
      document.getElementById('root').innerHTML = "You are not allowed";
    }
  });
};