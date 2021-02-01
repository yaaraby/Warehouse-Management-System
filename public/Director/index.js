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
// const allShelfs = document.getElementById('allShelfs');

testcoocik()
function testcoocik() {
    fetch('/Cookie-test')
        .then(r => r.json())
        .then(data => {
            if (data.validated == "ok") {
            } else if (data.validate == 'none') {
                location.href = '/userRegular/index.html'
            } else {
                location.href = '/login/login.html'
            }
        })
}


function Output() {
    location.href = '/login/login.html'
    fetch('/Output')
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
                                    <th>מקט - UPS </th>
                                    <th>שם המוצר</th>
                                    <th>תאריך תפוגה</th>
                                      <th>מיקום</th>
                                </tr>
                            </thead>
                                <tbody>
                                    ${data.data.map(elm =>
                                            ` <tr>
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
            <div class="text"><b>מיקום:</b>${data.data[0].Location}</div>`
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
    cardCategory.style.display = 'block'
    cardboxcatygory.innerHTML = ''
    fetch('/get-category')
        .then(res =>
            res.json()
        )
        .then(data => {
            data.data.forEach(element => {
                if (aryycategory.indexOf(element.Category) == -1) {
                    aryycategory.push(element.Category)
                }
            });
            aryycategory.forEach(elm => {
                cardboxcatygory.innerHTML += `<div class="A_line_in_a_category" onclick="PullThiscCategory(event)">${elm}</div>`
            })
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
            console.log(data)
            titlecategory.innerHTML = eventCategory
            carbox.innerHTML += `<table>
<thead>
    <tr>
        <th>מיקום</th>
        <th>תאריך תפוגה</th>
        <th>שם המוצר</th>
        <th>מקט - UPS </th>
    </tr>
</thead>
    <tbody>
        ${data.data.map(elm =>
                ` <tr>
                <td>${elm.Location}</td> 
                <td>${elm.ExpiryDate}</td>
                <td>${elm.Name}</td>
                <td>${elm.UPS}</td>
        </tr>
`).join('')}</tbody>
</table>`;

            //     data.data.forEach(elm => {
            //         carbox.innerHTML += `
            //         <div class="list"><b>UPS-מקט:</b></br></br>${elm.UPS}</div>
            //         <div class="list"><b>שם המוצר:</b></br></br>${elm.Name}</div>
            //     <div class="list"><b>תאריך תפוגה:</b></br></br>${elm.ExpiryDate}</div> 
            //     <div class="list"><b>מיקום:</b></br></br>${elm.Location}</div> 
            // </div>`


            //         ${data.map(elm =>
            //             `<tr>
            //         <td class="flexdeleteuser">
            //         <a action="Edit" class="deleteuser" onclick='editUser("${elm._id}")'><img src="/img/edit-button.png"></a>
            //         <a action="Delete" class="deleteuser" onclick='deleteUser("${elm._id}")'><img src="/img/deleteuser.png"></a>
            //         </td>
            //                 <td>${elm.id_user}</td>
            //                 <td>${elm.userName}</td>
            //                 <td>${elm.role}</td> 
            //         </tr>

            // `).join('')}
            // })
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
                `<img src="/img/return.png" onclick="editUserByIddisplaynone()">
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



    let tempTotalRowNumber = lastRow.value - firstRow.value;
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K']
    let tempNewRows = []

    console.log(firstRow.value, lastRow.value, numberOfAreas.value, numberOfShelfs.value);
    for (i = 1; i <= tempTotalRowNumber + 1; i++) {

        for (j = 1; j <= numberOfAreas.value; j++) {
            for (k = 1; k <= numberOfShelfs.value; k++) {

                console.log(`${i}${letters[j - 1]}${k}`)
                tempNewRows.push({
                    Line: i,
                    Area: `${letters[j - 1]}`,
                    Floor: k,
                    UPS_Shelfs: `${i}-${letters[j - 1]}-${k}`,
                    // NumberOfProductsonShelf:Number,
                    // MaximumWeight: Number,
                    // CurrentWeight: Number,
                    // height: Number
                })

                // Object.assign(tempNewRows, {row:`${i}${letters[j-1]}${k}`});
            }
        }
    }

    console.log(JSON.stringify(tempNewRows))


    fetch("/shelf-creation", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tempNewRows)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data.data)
            if (data == false) {
                console.log(data)


            } else {
                message.innerHTML = data.message
            }
        })



    AddShelf.style.display = 'none'




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
            if (data.data != null) {
                outcome.style.display = 'none'
                Registration.style.display = 'none'
                Search.style.display = 'none'
                ShowAll.style.display = 'none'
                cardCategory.style.display = 'none'
                editUserById.style.display = "none"
                UsersList.style.display = 'none'
                AddShelf.style.display = 'none'
                //need to change the userlist to shelf list
                ShelfList.style.display = 'block'
                allShelfs(data.data)
            }

        })
}
function shelfObservationDisplayNone() {
    ShelfList.style.display = 'none'


}

function allShelfs(data) {
    menubutoondisplayblock()
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
        <a action="Edit" class="editshelf" onclick='editShelf("${elm._id}")'><img src="/img/edit-button.png"></a>
        <a action="Delete" class="deleteShelf" onclick='deleteShelf("${elm._id}")'><img src="/img/deleteuser.png"></a>
        </td>
                <td class="rtl">${elm.UPS_Shelfs}</td>
                <td>${elm.NumberOfProductsonShelf}</td>
                <td>${elm.MaximumWeight}</td> 
                <td>${elm.CurrentWeight}</td> 
                
        </tr>

`).join('')}
</table>`;
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

