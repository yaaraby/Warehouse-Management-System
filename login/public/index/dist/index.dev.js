"use strict";

setInterval(function () {
  fetch('/Cookie-test').then(function (r) {
    return r.json();
  }).then(function (data) {
    if (data.validated) {
      console.log('ur good');
    } else {
      window.location.replace('/login/login.html');
    }
  });
}, 1000);