"use strict";

var UsersList = document.getElementById('UsersList');

function getListUsers() {
  fetch('/get-List-Users').then(function (res) {
    return res.json();
  }).then(function (data) {
    reloadTable(data);
  });
}

var deleteUser = function deleteUser(userId) {
  fetch('/' + userId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    reloadTable(data);
  });
};

function dat(data) {
  data.data.forEach(function (element) {
    document.querySelector('.insertuserdetails').innerHTML = "<div class=\"id\">".concat(element.id_user, "</div>\n        <div class=\"name\">").concat(element.name, "</div>\n        <div class=\"username\">").concat(element.userName, "</div>\n        <div class=\"email\">").concat(element.email, "</div>\n        <div class=\"tel\">").concat(element.phone, "</div>\n        <div class=\"role\">").concat(element.role, "</div>");
  });
}

function editItem(name, price, image) {
  console.log(name, price, image);
  fetch("/update", {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      price: price,
      image: image
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);
  });
}