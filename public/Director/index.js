const Searchselect = document.querySelector("#Searchselect")
const inputSearch = document.querySelector("#inputSearch")
const Search = document.querySelector('.Search')
const cardboxcatygory = document.querySelector('.cardboxcatygory')
const cardCategory = document.querySelector('.cardCategory')
const carbox = document.querySelector('.carbox')
const titlecategory = document.querySelector('.titlecategory')
const ShowAll = document.querySelector('.ShowAll')
const message = document.querySelector("#message")
const Registration = document.querySelector('.Registration')
const AddShelf = document.querySelector('.AddShelf')
const textmessage = document.querySelector('.textmessage')
const Searchtml = document.querySelector('.Searchtml')
const outcome = document.querySelector('.outcome')
const cardtext = document.querySelector('.cardtext')
const menu = document.querySelector(".menu")
const menubutoon = document.querySelector(".menubutoon")
const UsersList = document.getElementById('UsersList');
const ShelfList = document.getElementById('ShelfList');
const handleAddShelftext = document.querySelector(".handleAddShelftext")
const cardlogin = document.querySelector('.cardlogin')
const alluserconnected = document.querySelector('.alluserconnected')
const addNewProductclass = document.querySelector('.addNewProductclass')
let shelfOptionsGlobal = [];
const init = () => {
    getShelfList();
}

function connected() {

    fetch('/alluserconnected')
        .then(res =>
            res.json()
        )
        .then(data => {
            console.log(data)
            document.getElementById('UsersList').innerHTML =
                `<img src="/img/delete.png" class="displaynone" onclick="UsersListnone()">
                <h1>משתמשים מחוברים</h1>
    <table>
    <thead>
        <tr>
            <th></th>
            <th>זהות משתמש</th>
            <th>שם משתמש</th>
            <th>תפקיד</th>
        </tr>
    </thead>
        <tbody>
            ${data.data.map(elm =>
                    `<tr>
            <td class="flexdeleteuser">
            <a action="Edit" class="deleteuser" onclick='editUser("${elm._id}")'><img src="/img/edit-button.png"></a>
            <a action="Delete" class="deleteuser" onclick='deleteUser("${elm._id}")'><img src="/img/deleteuser.png"></a>
            </td>
                    <td>${elm.id_user}</td>
                    <td>${elm.userName}</td>
                    <td>${elm.role}</td> 
            </tr>
    
    `).join('')}</tbody>
    </table>`;
            outcome.style.display = 'none'
            Registration.style.display = 'none'
            Search.style.display = 'none'
            ShowAll.style.display = 'none'
            cardCategory.style.display = 'none'
            AddShelf.style.display = 'none'
            ShelfList.style.display = 'none'
            editUserById.style.display = 'none'
            editProductById.style.display = 'none'
            addNewProductclass.style.display = 'none'
            menubutoondisplayblock()
            UsersList.style.display = 'block'

        })
}

const xdeta = new Date().getHours()
let hour

if (xdeta >= 6 && xdeta < 12) {
    hour = "בוקר טוב"
}
if (xdeta >= 12 && xdeta < 18) {
    hour = "צהרים טובים"
}
if (xdeta >= 18 && xdeta < 23) {
    hour = "ערב טוב"
}
if (xdeta >= 23 || xdeta >= 0 && xdeta < 6) {
    hour = "לילה טוב"
}

setInterval(function () { testcoocik() }, 100000);

testcoocik()
function testcoocik() {
    fetch('/Cookie-test')
        .then(r => r.json())
        .then(data => {
            if (data.validated == "ok") {
                document.body.style.display = "block"
                cardlogin.innerHTML = `<div class="textcardlogin">${hour}</div><img onclick='editUsercardlogin("${data.id}")' src="/img/user.jpg" alt=""><div class="textcardlogin">${data.name}</div>`

            } else if (data.validate == 'none') {
                location.href = '/userRegular/index.html'
            } else {
                location.href = '/login/login.html'
            }
        })
}
const editUsercardlogin = (userId) => {
    menubutoondisplayblock()
    outcome.style.display = 'none'
    Registration.style.display = 'none'
    Search.style.display = 'none'
    ShowAll.style.display = 'none'
    cardCategory.style.display = 'none'
    UsersList.style.display = 'none'
    AddShelf.style.display = 'none'
    ShelfList.style.display = 'none'
    addNewProductclass.style.display = 'none'

    fetch('/get-details-users' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => {
            editUserById.style.display = "block"

            document.getElementById('editUserById').innerHTML =
                `<img onclick='displaynoneeditusercardlogin()' src="/img/delete.png" alt="">
                <h1>עריכת פרטים אישיים</h1>
                    <form onsubmit="handleEditUser(event)">
                 <div class="rtl">
                     <label for="id_user">מספר זהות:
                    <input type="text" name="id_user" id="id_user" value="${data.id_user}" disabled="disabled" autocomplete='off'></br>
                </label>
                <label for="name">שם:
                    <input type="text" name="name" id="name" value="${data.name}" autocomplete='off'></br>
                </label>
                <label for="userName">שם משתמש:
                    <input type="text" name="username" id="userName" value=${data.userName} autocomplete='off'></br>
                </label>
                <label for="password">סיסמה:
                    <input type="text" name="password" id="password" value=${data.password} autocomplete='off'></br>
                </label>
                <label for="email">אימייל:
                    <input type="email" name="email" id="email" value=${data.email} autocomplete='off'></br>
                </label>
                <label for="phone">פלאפון:
                    <input type="text" name="phone" id="phone" value=${data.phone} autocomplete='off'></br>
                </label>
            </div>
            <input type="text" value="${data.role}" disabled="disabled" autocomplete='off'></br>
            <div id="messag"></div></br>
            <input type="submit" value="שמור שינויים">
        </form>`
        })
}

function displaynoneeditusercardlogin() {
    editUserById.style.display = 'none'
}

function displaynoneeditProductardlogin() {
    editProductById.style.display = 'none'
}

function Output() {
    fetch('/Output')
        .then(res =>
            res.json()
        )
        .then(data => {
            if (data) {
                location.href = '/login/login.html'
            }
        })
}


inputSearch.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        functionSearch()
    }
})

function deletesearch() {
    Search.style.display = 'none'
    inputSearch.value = ''
}

function cardCategorydisplaynone() {
    cardCategory.style.display = 'none'
}

function Addauser() {
    menubutoondisplayblock()
    editUserById.style.display = "none"
    cardCategory.style.display = 'none'
    ShowAll.style.display = 'none'
    Search.style.display = 'none'
    UsersList.style.display = 'none'
    addNewProductclass.style.display = 'none'
    Registration.style.display = 'block'
}
function Registrationdisplaynone() {
    Registration.style.display = 'none'
    addNewProductclass.style.display = 'none'
}



function Searchdisplayblock() {
    menubutoondisplayblock()
    Search.style.display = 'block'
    editUserById.style.display = "none"
    editProductById.style.display = "none"
    cardCategory.style.display = 'none'
    ShowAll.style.display = 'none'
    UsersList.style.display = 'none'
    Registration.style.display = 'none'
    AddShelf.style.display = 'none'
    ShelfList.style.display = 'none'
    addNewProductclass.style.display = 'none'
    inputSearch.focus()
}
function deleteoutcome() {
    outcome.style.display = 'none'
}

function functionSearch() {
    if (inputSearch.placeholder == 'בחר סוג חיפוש') {
        textmessage.innerHTML = 'הזן סוג חיפוש'
    }
    else {
        const placeholder = inputSearch.placeholder
        const inputvalue = inputSearch.value

        if (inputvalue.length == 0) {
            textmessage.innerHTML = 'הזן מידע לחיפוש'
        }
        else {
            textmessage.innerHTML = '<img src="/img/gif.gif">'

            fetch('/Searchdeta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ placeholder, inputvalue })
            }).then(res =>
                res.json()
            )
                .then(data => {
                    Searchtml.innerHTML = ""

                    if (data.message !== undefined) {
                        textmessage.innerHTML = data.message
                    }
                    if (data.data) {
                        textmessage.innerHTML = placeholder
                        Searchtml.innerHTML += `<table>
                            <thead>
                                <tr>
                                <th></th>
                                    <th>מקט - UPS </th>
                                    <th>שם המוצר</th>
                                    <th>תאריך תפוגה</th>
                                      <th>מיקום</th>
                                </tr>
                            </thead>
                                <tbody>
                                    ${data.data.map(elm =>
                            ` <tr onclick="PullInformation('${elm._id}')">
                            <td class="flexdeleteuser">
                            <a action="Edit" class="editshelf" style="margin: 5px 15px;cursor: pointer;" onclick='editShelf("${elm._id}")'><img src="/img/edit-button.png"></a>
                            <a action="Delete" class="deleteShelf"  style="margin: 5px 15px;cursor: pointer;" onclick='deleteShelf("${elm._id}")'><img src="/img/deleteuser.png"></a>
                            </td>
                    
                                            <td>${elm.UPS}</td>
                                            <td>${elm.Name}</td>
                                            <td>${elm.ExpiryDate}</td>
                                            <td>${elm.Location}</td> 
                                    </tr>
                            `).join('')}</tbody>
                            </table>`;
                    }
                })
        }
    }
}
function PullInformation(e) {
    fetch('/PullInformation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ e })
    }).then(res =>
        res.json()
    )
        .then(data => {
            outcome.style.display = 'flex'

            console.log(data)
            cardtext.innerHTML =
                `<div class="text"><b>שם מוצר:</b>${data.data[0].Name}</div>
            <div class="text"><b>תאריך תפוגה:</b>${data.data[0].ExpiryDate}</div>
            <div class="text"><b>קטגוריה:</b>${data.data[0].Category}</div>
            <div class="text"><b>UPS-מקט:</b>${data.data[0].UPS}</div>
            <div class="text"><b>משקל:</b>${data.data[0].Weight}</div>
            <div class="text"><b>מחיר:</b>${data.data[0].price}</div>
            <div class="text" style="direction:revert;"><b>מיקום:</b>${data.data[0].Location}</div>`
        })
}

function valueselect(event) {
    inputSearch.placeholder = event.target.value
    textmessage.innerHTML = inputSearch.placeholder
}

const handleRegistration = (e) => {
    e.preventDefault();

    let id_user = document.querySelector('#id_user')
    let name = document.querySelector('#name')
    let userName = document.querySelector('#userName')
    let password = document.querySelector('#password')
    let email = document.querySelector('#email')
    let phone = document.querySelector('#phone')
    let role = document.querySelector('#role')

    if (id_user.value.length !== 9) {
        message.innerHTML = 'מספר זהות לא תקין'
    } else if (name.value.length < 2) {
        message.innerHTML = 'נדרש להזין שם מלא תקין'
    } else if (userName.value.length < 2) {
        message.innerHTML = 'נדרש להזין שם משתמש</br> המכיל 2 תווים לפחות '
    } else if (password.value.length < 6) {
        message.innerHTML = 'בחר/י סיסמה המכילה 6</br> תווים לפחות'
    } else if (email.value.length == 0) {
        message.innerHTML = 'נדרש להזין כתובת מייל'
    } else if (phone.value.length !== 9 && phone.value.length !== 10) {
        message.innerHTML = 'מספר טלפון לא תקין'
    } else if (role.value == "דירוג") {
        message.innerHTML = 'בחר דירוג למשתמש'
    } else {
        let concat = {
            "id_user": id_user.value,
            "name": name.value,
            "userName": userName.value,
            "password": password.value,
            "email": email.value,
            "phone": phone.value,
            "role": role.value,
        }
        message.innerHTML = '<img src="/img/gif.gif">'

        fetch('/send-User-details-sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(concat)
        }).then(res =>
            res.json()
        )
            .then(data => {
                console.log(data.message)
                if (data.message == 'ok') {
                    message.innerHTML = "הוספת המשתמש בוצע בהצלחה"
                    console.log('הוספת המשתמש בוצע בהצלחה')
                    id_user.value = ''
                    name.value = ''
                    userName.value = ''
                    password.value = ''
                    email.value = ''
                    phone.value = ''
                    role.value = 'דירוג'

                    setTimeout(() => {
                        getListUsers()
                    }, 500);

                } else {
                    message.innerHTML = data.message
                }
            })
    }
}


function getCategory() {
    menubutoondisplayblock()
    let aryycategory = []
    editUserById.style.display = "none"
    Registration.style.display = 'none'
    Search.style.display = 'none'
    ShowAll.style.display = 'none'
    UsersList.style.display = 'none'
    AddShelf.style.display = 'none'
    ShelfList.style.display = 'none'
    cardboxcatygory.innerHTML = ''
    addNewProductclass.style.display = 'none'
    cardCategory.style.display = 'block'
    fetch('/get-category')
        .then(res =>
            res.json()
        )
        .then(data => {
            if (data.data.length > 0) {
                data.data.forEach(element => {
                    if (aryycategory.indexOf(element.Category) == -1) {
                        aryycategory.push(element.Category)
                    }
                });
                aryycategory.forEach(elm => {
                    cardboxcatygory.innerHTML += `<img src="/img/delete.png" class="displaynone" onclick="categoriesDisplayNone()">
                    <button class="addProduct" onclick="addProductStyle()"><img src="/img/+.png"></button>
                    <div class="A_line_in_a_category" onclick="PullThiscCategory(event)">${elm}</div>`
                })
            }
            else {
                cardboxcatygory.innerHTML = '<h1>הנתונים לא זמינים</h1>'
            }
        })
}

function categoriesDisplayNone() {
    cardCategory.style.display = 'none'


}

function addProductStyle() {
    menubutoondisplayblock()
    cardCategory.style.display = 'none'
    addNewProductclass.style.display = 'block'
}
function editProductByIddisplaynone() {
    editProductById.style.display = "none"
    cardCategory.style.display = 'block'
    carbox.style.display = 'block'
    titlecategory.style.display = 'block'
}

let globalCategories = [];
function PullThiscCategory(event) {
    globalCategories = event;

    const eventCategory = event.target.innerText
    carbox.innerHTML = ''

    fetch('/PullThiscCategory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventCategory })
    }).then(res =>
        res.json()
    )
        .then(data => {
            outcome.style.display = 'none'
            Registration.style.display = 'none'
            Search.style.display = 'none'
            cardCategory.style.display = 'none'
            editUserById.style.display = "none"
            editProductById.style.display = "none"
            AddShelf.style.display = 'none'
            ShelfList.style.display = 'none'
            addNewProductclass.style.display = 'none'
            UsersList.style.display = 'none'
            ShowAll.style.display = 'block'
            titlecategory.innerHTML = eventCategory
            carbox.innerHTML += `<table>
        
<thead>
    <tr>
        <th>מיקום</th>
        <th>תאריך תפוגה</th>
        <th>שם המוצר</th>
        <th>מקט - UPS </th>
        <th></th>
    </tr>
</thead>
    <tbody>
        ${data.data.map(elm =>
                 `<tr>
                <td>${elm.Location}</td> 
                <td>${elm.ExpiryDate}</td>
                <td>${elm.Name}</td>
                <td>${elm.UPS}</td>
                <td class="flexCrudProduct">
                <div class="list" onclick="editProduct('${elm._id}')"><img src="/img/edit-button.png"></div>
                <div class="list" onclick="deleteProduct('${elm._id}')"><img src="/img/deleteuser.png"></div>
                </td>
        </tr>
`).join('')}</tbody>
</table>`;
        })
}



function getListUsers() {
    menu.style.right = '-220px'

    fetch('/get-List-Users')
        .then(res =>
            res.json()
        )
        .then(data => {
            if (data.data != null) {

                outcome.style.display = 'none'
                Registration.style.display = 'none'
                Search.style.display = 'none'
                ShowAll.style.display = 'none'
                cardCategory.style.display = 'none'
                editUserById.style.display = "none"
                editProductById.style.display = "none"
                AddShelf.style.display = 'none'
                ShelfList.style.display = 'none'
                addNewProductclass.style.display = 'none'
                UsersList.style.display = 'block'
                alluser(data.data)
            }
        })
}


const deleteUser = (userId) => {

    fetch('/' + userId, {

        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res =>
        res.json()
    )
        .then(data => {

            alluser(data)
        })
}


function displayblockmenu(event) {
    menu.style.right = '0'
    // event.target.style.display='none'
}

function menubutoondisplayblock() {
    menu.style.right = '-220px'
}

function UsersListnone() {
    UsersList.style.display = 'none'
}


function alluser(data) {
    document.getElementById('UsersList').innerHTML =
        `
        <img src="/img/delete.png" class="displaynone" onclick="UsersListnone()"><div class="col-sm-4">
        <button class="Addanewuser" onclick="Addauser()"><img src="/img/adduser.png"></button>
        </div>
<table>
<thead>
    <tr>
        <th></th>
        <th>זהות משתמש</th>
        <th>שם משתמש</th>
        <th>תפקיד</th>
    </tr>
</thead>
    <tbody>
        ${data.map(elm =>
            `<tr>
        <td class="flexdeleteuser">
        <a action="Edit" class="deleteuser" onclick='editUser("${elm._id}")'><img src="/img/edit-button.png"></a>
        <a action="Delete" class="deleteuser" onclick='deleteUser("${elm._id}")'><img src="/img/deleteuser.png"></a>
        </td>
                <td>${elm.id_user}</td>
                <td>${elm.userName}</td>
                <td>${elm.role}</td> 
        </tr>

`).join('')}</tbody>
</table>`;
}

const editUserById = document.querySelector("#editUserById")

function editUserByIddisplaynone() {
    editUserById.style.display = "none"
    UsersList.style.display = 'block'
}


const editUser = (userId) => {
    menubutoondisplayblock()
    letdistinctResult = [];
    fetch('/get-details-users' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => {
            console.log(data.Location)
            editUserById.style.display = "block"
            UsersList.style.display = 'none'
            document.getElementById('editUserById').innerHTML =
                `<img class="imgdeleteeditUser" src="/img/return.png" onclick="editUserByIddisplaynone()">
                    <h1>עריכת משתמש</h1>
                    <form onsubmit="handleEditUser(event)">
                    
                 <div class="rtl">
                 
                     <label for="id_user">מספר זהות:
                    <input type="text" name="id_user" id="id_user" value="${data.id_user}" disabled="disabled" autocomplete='off'></br>
                </label>
                <label for="name">שם:
                    <input type="text" name="name" id="name" value="${data.name}" autocomplete='off'></br>
                </label>
                <label for="userName">שם משתמש:
                    <input type="text" name="username" id="userName" value=${data.userName} autocomplete='off'></br>
                </label>
                <label for="password">סיסמה:
                    <input type="text" name="password" id="password" value=${data.password} autocomplete='off'></br>
                </label>
                <label for="email">אימייל:
                    <input type="email" name="email" id="email" value=${data.email} autocomplete='off'></br>
                </label>
                <label for="phone">פלאפון:
                    <input type="text" name="phone" id="phone" value=${data.phone} autocomplete='off'></br>
                </label>
            </div>
            <select name="role" id="role" value=${data.role}>
                <option selected disabled hidden>${data.role}</option>
                <option>מחסנאי</option>
                <option>מנהל</option>
            </select></br>
            <div id="messag"></div></br>
            <input type="submit" value="שמור שינויים">
        </form>`
        })
}


function handleEditUser(e) {
    e.preventDefault();

    let id_user = e.target[0].value;
    let name = e.target[1].value;
    let userName = e.target[2].value;
    let password = e.target[3].value;
    let email = e.target[4].value;
    let phone = e.target[5].value;
    let role = e.target[6].value;


    let message = document.getElementById('messag');
    message.innerHTML = ''
    if (name.length < 2) {
        message.innerHTML = 'נדרש להזין שם מלא תקין'
    } else if (userName.length < 2) {
        message.innerHTML = 'נדרש להזין שם משתמש</br> המכיל 2 תווים לפחות '
    } else if (password.length < 6) {
        message.innerHTML = 'בחר/י סיסמה המכילה 6</br> תווים לפחות'
    } else if (email.length == 0) {
        message.innerHTML = 'נדרש להזין כתובת מייל'
    } else if (phone.length !== 9 && phone.length !== 10) {
        message.innerHTML = 'מספר טלפון לא תקין'
    } else if (role == "דירוג") {
        message.innerHTML = 'בחר דירוג למשתמש'
    } else {

        console.log(id_user, name, userName, password, email, role)

        fetch("/update", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_user, name, userName, password, email, phone, role })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message == 'ok') {
                    message.innerHTML = 'המשתמש עודכן במערכת'
                    getListUsers()

                } else {
                    message.innerHTML = data.message
                }
            })
    }
}


//Yehial!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function handleAddShelf(e) {
    e.preventDefault();

    const firstRow = document.querySelector('#firstRow').value
    const lastRow = document.querySelector('#lastRow').value
    const numberOfAreas = document.querySelector('#numberOfAreas').value
    const numberOfShelfs = document.querySelector('#numberOfShelfs').value
    const shelfHeight = document.querySelector('#shelfHight').value
    const maxWight = document.querySelector('#maxWight').value


    // let tempTotalRowNumber = lastRow.value - firstRow.value;
    // let tempFirstRow = firstRow.value;

    // console.log(tempNewRows)
    // console.log(JSON.stringify({tempFirstRow , tempTotalRowNumber,numberOfAreas,numberOfShelfs,maxWight}))
     handleAddShelftext.innerHTML = ''


    fetch("/shelf-creation", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({firstRow,lastRow,numberOfAreas,numberOfShelfs,shelfHeight,maxWight})
    })
        .then(res => res.json())
        .then(data => {
            console.log('Got Frome Server')
            if (data == true) {
                shelfObservation()
            } else {
                handleAddShelftext.innerHTML = data.message
            }
        })
}



function addShelfDisplayNone() {
    AddShelf.style.display = 'none'
}

function shelfObservation() {
    fetch('/pull-Shelf')
        .then(res =>
            res.json()
        )
        .then(data => {
            ShelfList.style.display = 'block'
            outcome.style.display = 'none'
            Registration.style.display = 'none'
            Search.style.display = 'none'
            ShowAll.style.display = 'none'
            cardCategory.style.display = 'none'
            editUserById.style.display = "none"
            editProductById.style.display = "none"
            UsersList.style.display = 'none'
            AddShelf.style.display = 'none'
            addNewProductclass.style.display = 'none'
            menubutoondisplayblock()


            if (data.data[0] == undefined) {
                document.getElementById('ShelfList').innerHTML = `<img src="/img/delete.png" class="displaynone" onclick="shelfObservationDisplayNone()"><button class="addNewShelf" onclick="addNewShelf()"><img src="/img/+.png"></button><h1 style="text-align: center;">לא נמצאו מדפים</h1>`
            }
            else {
                allShelfs(data.data)
            }
        })
}
function shelfObservationDisplayNone() {
    ShelfList.style.display = 'none'


}



function allShelfs(data) {
    menubutoondisplayblock()
    // data.sort((a, b) => { if (a.Line < b.Line) return -1; })
    // data.sort((a, b) => { if (a.Area < b.Area) return -1; })


    document.getElementById('ShelfList').innerHTML =
        `<img src="/img/delete.png" class="displaynone" onclick="shelfObservationDisplayNone()">
        <div class="col-sm-4">
        <button class="addNewShelf" onclick="addNewShelf()"><img src="/img/+.png"></button>
        </div>
<table>
<thead>
    <tr>
        <th></th>
        <th>מספר מדף</th>
        <th>כמות מוצרים</th>
        <th>גובה מדף</th>
        <th>משקל מדף</th>
        <th>משקל מקסימלי</th>
    </tr>
</thead>
    <tbody>
    
        ${data.map(elm =>
            `<tr>
        <td class="flexdeleteuser">
        <a action="Edit" class="editshelf" style="margin: 5px 15px;cursor: pointer;" onclick='editShelf("${elm._id}")'><img src="/img/edit-button.png"></a>
        <a class="deleteShelf"  style="margin: 5px 15px;cursor: pointer;" onclick='deleteShelf("${elm.UPS_Shelfs}")'><img src="/img/deleteuser.png"></a>
        </td>
                <td style="direction: initial;">${elm.UPS_Shelfs}</td>
                <td>${elm.NumberOfProductsonShelf}</td>
                <td>${elm.height}</td> 
                <td>${elm.CurrentWeight}</td> 
                <td>${elm.MaximumWeight}</td> 
                
        </tr>

`).join('')}
</table>`;
}

function deleteShelf(shelfToDelete){

    //console.log(shelfToDelete)

    fetch("/delete-shelf", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({shelfToDelete})
    })
        .then(res => res.json())
        .then(data => {
            console.log(data.data)
            console.log('Got Frome Server')
            if (data == true) {
                shelfObservation()
            } else {
                handleAddShelftext.innerHTML = data.message
            }
            
        })




}

function addNewShelf() {
    menubutoondisplayblock()
    ShelfList.style.display = 'none'
    AddShelf.style.display = 'block'

}

function addShelflist() {
    AddShelf.style.display = 'none'
    ShelfList.style.display = 'block'
}
  
//yaara ------------------------------------

function getShelfList(){

    fetch('/get-Shelfs-list')
        .then(res =>
            res.json()
        )
        .then(data=>{
             setShelfList(data.data);
        })
  
}
function setShelfList (shelfs) {
     const shelfOptions = shelfs.map(shelf => `<option style="direction: initial;" value='${shelf.UPS_Shelfs}'>${shelf.UPS_Shelfs}</option>`);
    shelfOptionsGlobal = [...shelfOptions];
    //  this.shelfOptions = shelfOptions
    document.getElementById("UPS_Shelfs").innerHTML = shelfOptionsGlobal.join(" ");
}

async function addNewProduct(e){
    const message = document.querySelector("#messagetext")
     e.preventDefault();

        let UPS = e.target[0].value;
        let Name = e.target[1].value;
        let price = e.target[2].value;
        let Amount = e.target[3].value;
        let Category = e.target[4].value;
        let Weight = e.target[5].value;
        let height = e.target[6].value;
        let ExpiryDate = e.target[7].value;
        let Location = e.target[8].value;

    
      let validations = Validations(UPS, Name, price, Amount, Category, Weight, height, ExpiryDate, Location)
      
      if(validations == true){
      
            let getWeight =  await getCurrrentWeight(Location) 
            let checkCurrrentWeight =  CalcWeight(getWeight, Weight)
            let getHeight = await getCurrrentHeight(Location)
            let checkHeight =  CalcHeight(getHeight, height)
   
      if(checkHeight == false){
            message.innerHTML = 'גובה המדף אינו מתאים לגובה המוצר, יש לבחור מדף אחר'
      }
      else if(checkCurrrentWeight == false){
            message.innerHTML = 'המדף הנבחר מלא, יש לבחור מדף אחר'
      }
        else{
           fetch('/add_Products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({UPS, Name, price, Amount, Category, Weight, height, ExpiryDate, Location})
        }).then(res =>res.json())
            .then(data => {
                console.log(data)
              if (data.status == true) { 
                  message.innerHTML = "המוצר נוצר בהצלחה"
                  
                  e.target[0].value= ''
                  e.target[1].value = ''
                  e.target[2].value = ''
                  e.target[3].value = ''
                  e.target[4].value = ''
                  e.target[5].value = ''
                  e.target[6].value = ''
                  e.target[7].value = ''
                  e.target[8].value = ''

                     setTimeout(() => {
                        getCategory()
                     }, 500);  

                 } else {
                     message.innerHTML = 'המוצר אינו נוסף למערכת, נסה שנית'
                 }
})
        
        }
        
}
}


const getCurrrentWeight = async (UPS_Shelfs) =>{
    let check ;
    await fetch('/get-Details-Shelfs' + UPS_Shelfs, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data=>{
            check = data.MaximumWeight
            });
              return(check) 
}

 const getCurrrentHeight = async (UPS_Shelfs) =>{
    let check ;
    await fetch('/get-Details-Shelfs' + UPS_Shelfs, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data=>{
            check = data.height
            });
              return(check)
    
} 

   const CalcWeight =  (getWeight, weight) =>{
    if (Number(getWeight) > Number(weight)){
        return (true);
    }
    else {
        return (false)
    }
} 

   const CalcHeight = (getHeight, height) =>{
    if (Number(getHeight) > Number(height)){
        return (true);
    }
    else {
        return (false)
    }
} 

const Validations = (UPS, name, price, amount, category, weight, height, ExpiryDate, UPS_Shelfs, checkCurrrentWeight,checkHeight) =>{
    const message = document.querySelector("#messagetext")
        if(UPS.length < 3){
            message.innerHTML = 'נדרש להזין מק"ט באורך 3 ומעלה'
        }
        else if(name.length == 0){
             message.innerHTML = 'יש להזין את שם המוצר'
        }
        else if(amount.length == 0){
            message.innerHTML = 'יש להזין את כמות המוצר'
        }
         else if(category.length == 0){
            message.innerHTML = 'יש להזין את קטגוריית המוצר'
        }
        else if(weight.length == 0){
            message.innerHTML = 'יש להזין את משקל המוצר'
        }
        else if(height.length == 0){
            message.innerHTML = 'יש להזין את גובה המוצר'
        }
        else if(UPS_Shelfs.length == 0){
            message.innerHTML = 'יש לבחור את המדף הרצוי למוצר'
        }
        else {
            return (true);
        }
}


const deleteProduct = (_id) =>{
    console.log(_id)
 fetch('/deleteProduct/' + _id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        
    }).then(res =>
        res.json()
    )
        
        .then(data => {
            PullThiscCategory(globalCategories)
        })
}

const editProduct = (id) =>{
    menubutoondisplayblock()
    letdistinctResult= []; 
    fetch('/get-details-product' + id,{
              method: 'GET',
           headers: {
               'Content-Type': 'application/json'
           }
       }).then(res =>
           res.json()
       )
        .then(data => {
            carbox.style.display = 'none'
           titlecategory.style.display = 'none' 
            ShowAll.style.display = 'none'
            editProductById.style.display = "block"

            document.getElementById('editProductById').innerHTML =
            `<img class="imgdeleteeditUser" src="/img/return.png" onclick="editProductByIddisplaynone()">    
                   <h1>עריכת מוצר</h1>
                   <form onsubmit="handleEditProduct(event, '${data._id}', '${data.Amount}', '${data.Weight}','${data.Location}')">
                   
                <div class="productDetails">
                    <label for="UPS">מק"ט:
                   <input type="number" name="UPS" id="UPS" value="${data.UPS}" disabled="disabled" autocomplete='off'></br>
               </label>
               <label for="Name">שם:
                   <input type="text" name="Name" id="Name" value="${data.Name}" autocomplete='off'></br>
               </label>
               <label for="price">מחיר:
                   <input type="text" name="price" id="price" value=${data.price} autocomplete='off'></br>
               </label>
               <label for="Amount">כמות:
                   <input type="number" name="Amount" id="Amount" value=${data.Amount} autocomplete='off'></br>
               </label>
               <label for="Category">קטגוריה:
                   <input type="text" name="Category" id="Category" value=${data.Category} autocomplete='off'></br>
               </label>
               <label for="Weight">משקל:
                   <input type="number" name="Weight" id="Weight" value=${data.Weight} autocomplete='off'></br>
               </label>
                <label for="height">גובה:
                   <input type="number" name="height" id="height" value=${data.height} autocomplete='off'></br>
               </label>
               <label for="ExpiryDate">תאריך תפוגה:
                   <input type="date" name="ExpiryDate" id="ExpiryDate" value=${data.ExpiryDate} autocomplete='off'></br>
               </label>
           </div>
            <select name='Location' id='Location'>
           
            </select></br>
           <div id="checkValidation"></div></br>
           <input type="submit" value="אישור">
       </form>`;
   document.getElementById("Location").innerHTML = `<option style="direction: initial;" selected hidden>${data.Location}</option>` + shelfOptionsGlobal.join(" ");

       }).catch(err => {
           console.error(err);
       }).finally(() => {
           console.log('im done')
       } )
    
} 


async function handleEditProduct(e, _id, PreviousAmount, PreviousWeight, PreviousLocation) {
    e.preventDefault();
    
   let UPS = e.target[0].value;
   let Name = e.target[1].value;
   let price = e.target[2].value;
   let Amount = e.target[3].value;
   let Category = e.target[4].value;
   let Weight = e.target[5].value;
   let height = e.target[6].value;
   let ExpiryDate = e.target[7].value;
   let Location = e.target[8].value;
   let checkValidation = document.getElementById('checkValidation');
   checkValidation.innerHTML=''
   let validations = await Validations(UPS, Name, price, Amount, Category, Weight, height, ExpiryDate, Location)
     if(validations == true){
     
           let getWeight =  await getCurrrentWeight(Location) 
           let checkCurrrentWeight =  CalcWeight(getWeight, Weight)
           let getHeight = await getCurrrentHeight(Location)
           let checkHeight =  CalcHeight(getHeight, height)
  
     if(checkHeight == false){
        checkValidation.innerHTML = 'גובה המדף אינו מתאים לגובה המוצר, יש לבחור מדף אחר'
     }
     else if(checkCurrrentWeight == false){
        checkValidation.innerHTML = 'המדף הנבחר מלא, יש לבחור מדף אחר'
     }
     else {
         
       fetch("/Product" , {
           method: 'PUT',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({_id,UPS, Name, price, Amount, Category, Weight, height, ExpiryDate, Location, PreviousAmount, PreviousWeight, PreviousLocation })
       })
           .then(res => res.json())
           .then(data => {
               console.log(data)
                if (message) {
                    checkValidation.innerHTML  = 'המוצר עודכן במערכת'
                
                     setTimeout(() => {
                         PullThiscCategory(globalCategories)
                         cardCategory.style.display = 'block'
                         carbox.style.display = 'block'
                         titlecategory.style.display = 'block'
                    }, 500); 


               } else {
                checkValidation.innerHTML = data.message
               } 
                 
           }) 
       }
     }
}
