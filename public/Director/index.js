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
    Registration.style.display = 'block'
}
function Registrationdisplaynone() {
    Registration.style.display = 'none'
}



function Searchdisplayblock() {
    menubutoondisplayblock()
    Search.style.display = 'block'
    editUserById.style.display = "none"
    cardCategory.style.display = 'none'
    ShowAll.style.display = 'none'
    UsersList.style.display = 'none'
    Registration.style.display = 'none'
    AddShelf.style.display = 'none'
    ShelfList.style.display = 'none'
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
                    cardboxcatygory.innerHTML += `<div class="A_line_in_a_category" onclick="PullThiscCategory(event)">${elm}</div>`
                })
            }
            else {
                cardboxcatygory.innerHTML = '<h1>אין מה להציג</h1>'
            }
        })
}


function PullThiscCategory(event) {
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
            Registration.style.display = 'none'
            cardCategory.style.display = 'none'
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
                `<tr onclick="PullInformation('${elm._id}')">
                <td>${elm.Location}</td> 
                <td>${elm.ExpiryDate}</td>
                <td>${elm.Name}</td>
                <td>${elm.UPS}</td>
                <td class="flexdeleteuser">
                <a action="Edit" class="editshelf" style="margin: 5px 15px;cursor: pointer;" onclick='editShelf("${elm._id}")'><img src="/img/edit-button.png"></a>
                <a action="Delete" class="deleteShelf"  style="margin: 5px 15px;cursor: pointer;" onclick='deleteShelf("${elm._id}")'><img src="/img/deleteuser.png"></a>
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
                AddShelf.style.display = 'none'
                ShelfList.style.display = 'none'
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
                <option style="display: none;">${data.role}</option>
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

    const firstRow = document.querySelector('#firstRow')
    const lastRow = document.querySelector('#lastRow')
    const numberOfAreas = document.querySelector('#numberOfAreas')
    const numberOfShelfs = document.querySelector('#numberOfShelfs')
    const maxWight = document.querySelector('#maxWight')


    let tempTotalRowNumber = lastRow.value - firstRow.value;
    let tempFirstRow = firstRow.value;
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O']
    let tempNewRows = []


    for (i = 1; i <= tempTotalRowNumber + 1; i++) {

        for (j = 1; j <= numberOfAreas.value; j++) {

            for (k = 1; k <= numberOfShelfs.value; k++) {

                console.log(`${i}${letters[j - 1]}${k}`)
                tempNewRows.push({
                    Line: tempFirstRow,
                    Area: `${letters[j - 1]}`,
                    Floor: k,
                    UPS_Shelfs: `${tempFirstRow}-${letters[j - 1]}-${k}`,
                    // NumberOfProductsonShelf:Number, //Optional
                    MaximumWeight: maxWight.value,
                    // CurrentWeight: Number,//Optional
                    // height: Number//Optional
                })
            }
        }
        tempFirstRow++
    }

    console.log(tempNewRows)
    console.log(JSON.stringify(tempNewRows))
    handleAddShelftext.innerHTML = ''

    fetch("/shelf-creation", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tempNewRows)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
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
            UsersList.style.display = 'none'
            AddShelf.style.display = 'none'
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
        <th>משקל מדף</th>
        <th>משקל מקסימלי</th>
    </tr>
</thead>
    <tbody>
    
        ${data.map(elm =>
            `<tr>
        <td class="flexdeleteuser">
        <a action="Edit" class="editshelf" style="margin: 5px 15px;cursor: pointer;" onclick='editShelf("${elm._id}")'><img src="/img/edit-button.png"></a>
        <a class="deleteShelf"  style="margin: 5px 15px;cursor: pointer;" onclick='deleteShelf("${elm}")'><img src="/img/deleteuser.png"></a>
        </td>
                <td style="direction: initial;">${elm.UPS_Shelfs}</td>
                <td>${elm.NumberOfProductsonShelf}</td>
                <td>${elm.CurrentWeight}</td> 
                <td>${elm.MaximumWeight}</td> 
                
        </tr>

`).join('')}
</table>`;
}

function deleteShelf(shelf_to_delete) {

    fetch("/delete-shelf", {
        method: 'DELETE',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body: JSON.stringify(shelf_to_delete)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)





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

