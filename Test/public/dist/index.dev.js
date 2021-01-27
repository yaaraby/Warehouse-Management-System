"use strict";

var UsersList = document.getElementById('UsersList');

function getListUsers() {
  "<table><tr>\n<td></td>";
  fetch('/get-List-Users').then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.data != null) {
      data.data.forEach(function (element) {
        document.getElementById('UsersList').innerHTML = "<div class=\"col-sm-4\">\n                        <button type=\"button\" class=\"btn btn-info add-new\"> Add New</button>\n                    </div>\n                    <table>\n                    <thead>\n                        <tr>\n                                <th>\n                                    <a>\u05E9\u05DD \u05DE\u05DC\u05D0</a>\n                                </th>\n                                <th>\n                                    <a>\u05E9\u05DD \u05DE\u05E9\u05EA\u05DE\u05E9</a>\n                                </th>\n                                <th>\n                                    <a>\u05D0\u05D9\u05D9\u05DE\u05DC</a>\n                                </th>\n                                <th>\n                                    <a>\u05D8\u05DC\u05E4\u05D5\u05DF</a>\n                                </th>\n                                <th>\n                                    <a>\u05EA\u05E4\u05E7\u05D9\u05D3</a>\n                                </th>\n                            </tr>\n                        </thead>\n                            <tbody>\n                                ".concat(data.data.map(function (elm) {
          return "<tr style=\"border-bottom: 5px solid black\">\n                                        <td>   ".concat(elm.name, "   </td>\n                                        <td>   ").concat(elm.userName, "   </td>\n                                        <td>   ").concat(elm.email, "   </td> \n                                        <td>   ").concat(elm.phone, "   </td>\n                                        <td>   ").concat(elm.role, "   </td> \n                                        <td>       </td>\n                                        <td>\n                                        <a action=\"Edit\" onclick='editUser(").concat(elm.id_user, ")'>    Edit</a> |\n                                        <a action=\"Details\">    Details</a> |\n                                        <a action=\"Delete\" onclick='deleteUser(").concat(elm.id_user, ")'>    Delete</a>\n                                    </td>\n                                         \n                        </tr>\n                        \n                        ");
        }).join(''), "</tbody>\n                        </table>");
      });
    }

    ;
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
    console.log(data);
    document.getElementById('UsersList').innerHTML = "<div class=\"col-sm-4\">\n            <button type=\"button\" class=\"btn btn-info add-new\"> Add New</button>\n        </div>\n        <table>\n        <thead>\n            <tr>\n                    <th>\n                        \u05E9\u05DD \u05DE\u05DC\u05D0\n                    </th>\n                    <th>\n                        \u05E9\u05DD \u05DE\u05E9\u05EA\u05DE\u05E9\n                    </th>\n                    <th>\n                        \u05D0\u05D9\u05D9\u05DE\u05DC\n                    </th>\n                    <th>\n                        \u05D8\u05DC\u05E4\u05D5\u05DF\n                    </th>\n                    <th>\n                        \u05EA\u05E4\u05E7\u05D9\u05D3\n                    </th>\n                </tr>\n            </thead>\n                <tbody>\n                    ".concat(data.map(function (elm) {
      return "<tr style=\"border-bottom: 5px solid black\">\n                            <td>   ".concat(elm.name, "   </td>\n                            <td>   ").concat(elm.userName, "   </td>\n                            <td>   ").concat(elm.email, "   </td> \n                            <td>   ").concat(elm.phone, "   </td>\n                            <td>   ").concat(elm.role, "   </td> \n                            <td>       </td>\n                            <td>\n                            <a action=\"Edit\" onclick='editUser(").concat(elm.id_user, ")'>    Edit</a> |\n                            <a action=\"Details\">    Details</a> |\n                            <a action=\"Delete\" onclick='deleteUser(").concat(elm.id_user, ")'>    Delete</a>\n                        </td>\n                             \n            </tr>\n            \n            ");
    }).join(''), "</tbody>\n            </table>");
  });
};