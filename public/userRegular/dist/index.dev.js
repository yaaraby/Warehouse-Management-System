"use strict";

var inputSearch = document.querySelector("#inputSearch");
var Search = document.querySelector('.Search');
var cardboxcatygory = document.querySelector('.cardboxcatygory');
var cardCategory = document.querySelector('.cardCategory');
var carbox = document.querySelector('.carbox');
var titlecategory = document.querySelector('.titlecategory');
var ShowAll = document.querySelector('.ShowAll');
var message = document.querySelector("#message");
var AddShelf = document.querySelector('.AddShelf');
var textmessage = document.querySelector('.textmessage');
var Searchtml = document.querySelector('.Searchtml');
var outcome = document.querySelector('.outcome');
var cardtext = document.querySelector('.cardtext');
var menu = document.querySelector(".menu");
var menubutoon = document.querySelector(".menubutoon");
var ShelfList = document.getElementById('ShelfList');
var editUserById = document.querySelector("#editUserById");
var firstRow = document.querySelector('#firstRow');
var lastRow = document.querySelector('#lastRow');
var numberOfAreas = document.querySelector('#numberOfAreas');
var numberOfShelfs = document.querySelector('#numberOfShelfs');
testcoocik();

function testcoocik() {
  fetch('/Cookie-test').then(function (r) {
    return r.json();
  }).then(function (data) {
    if (data.validated == 'none') {// window.location.replace('/userRegular/index.html')
    } else if (data.validated == "ok") {
      location.href = '/Director/index.html';
    } else {
      location.href = '/login/login.html';
    }
  });
}

function Output() {
  location.href = '/login/login.html';
  fetch('/Output');
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
          Searchtml.innerHTML += "<table>\n                        <thead>\n                            <tr>\n                                <th>\u05DE\u05E7\u05D8 - UPS </th>\n                                <th>\u05E9\u05DD \u05D4\u05DE\u05D5\u05E6\u05E8</th>\n                                <th>\u05EA\u05D0\u05E8\u05D9\u05DA \u05EA\u05E4\u05D5\u05D2\u05D4</th>\n                                  <th>\u05DE\u05D9\u05E7\u05D5\u05DD</th>\n                            </tr>\n                        </thead>\n                            <tbody>\n                                ".concat(data.data.map(function (elm) {
            return " <tr onclick=\"PullInformation('".concat(elm.UPS, "')\">\n                                        <td>").concat(elm.UPS, "</td>\n                                        <td>").concat(elm.Name, "</td>\n                                        <td>").concat(elm.ExpiryDate, "</td>\n                                        <td>").concat(elm.Location, "</td> \n                                </tr>\n                        ");
          }).join(''), "</tbody>\n                        </table>");
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

function deleteoutcome() {
  outcome.style.display = 'none';
}

function getCategory() {
  menubutoondisplayblock();
  var aryycategory = [];
  editUserById.style.display = "none";
  Search.style.display = 'none';
  ShowAll.style.display = 'none';
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
    cardCategory.style.display = 'none';
    ShowAll.style.display = 'block';
    console.log(data);
    titlecategory.innerHTML = eventCategory;
    carbox.innerHTML += "<table>\n                <thead>\n                    <tr>\n                        <th>\u05DE\u05D9\u05E7\u05D5\u05DD</th>\n                        <th>\u05EA\u05D0\u05E8\u05D9\u05DA \u05EA\u05E4\u05D5\u05D2\u05D4</th>\n                        <th>\u05E9\u05DD \u05D4\u05DE\u05D5\u05E6\u05E8</th>\n                        <th>\u05DE\u05E7\u05D8 - UPS </th>\n                    </tr>\n                </thead>\n                    <tbody>\n                        ".concat(data.data.map(function (elm) {
      return " <tr onclick=\"PullInformation('".concat(elm.UPS, "')\">\n                                <td>").concat(elm.Location, "</td> \n                                <td>").concat(elm.ExpiryDate, "</td>\n                                <td>").concat(elm.Name, "</td>\n                                <td>").concat(elm.UPS, "</td>\n                        </tr>\n                ");
    }).join(''), "</tbody>\n                </table>");
  });
}

function handleAddShelf(e) {
  e.preventDefault();
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
      Search.style.display = 'none';
      ShowAll.style.display = 'none';
      cardCategory.style.display = 'none';
      editUserById.style.display = "none";
      AddShelf.style.display = 'none';
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

function displayblockmenu(event) {
  menu.style.right = '0';
}

function menubutoondisplayblock() {
  menu.style.right = '-220px';
}

inputSearch.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    functionSearch();
  }
});

function deletesearch() {
  cardCategory.style.display = 'none';
  Search.style.display = 'none';
  outcome.style.display = 'none';
}

function Searchdisplayblock() {
  menubutoondisplayblock();
  Search.style.display = 'block';
  editUserById.style.display = "none";
  cardCategory.style.display = 'none';
  ShowAll.style.display = 'none';
  AddShelf.style.display = 'none';
  ShelfList.style.display = 'none';
  inputSearch.focus();
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