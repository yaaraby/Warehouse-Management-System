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
const textmessage = document.querySelector('.textmessage')
const Searchtml = document.querySelector('.Searchtml')
const outcome = document.querySelector('.outcome')
const cardtext = document.querySelector('.cardtext')
const menu = document.querySelector(".menu")
const menubutoon =document.querySelector(".menubutoon")
const UsersList = document.getElementById('UsersList');

testcoocik()
function testcoocik() {
    fetch('/Cookie-test')
        .then(r => r.json())
        .then(data => {
            if (data.validated !== true) {
                window.location.replace('/login/login.html')
            }
        })
}


function Output() {
    window.location.replace('/login/login.html')
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
    cardCategory.style.display = 'none'
    ShowAll.style.display = 'none'
    UsersList.style.display = 'none'
    Registration.style.display = 'none'
    inputSearch.focus()
}
function deleteoutcome() {
    outcome.style.display = 'none'
}

function functionSearch() {
    if (inputSearch.placeholder == 'בחר סוג חיפוש >>') {
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
                        data.data.forEach(elm => {
                            Searchtml.innerHTML += `<div class="cardlist" onclick="PullInformation('${elm.UPS}')">
                    <div class="list"><b>UPS-מקט:</b></br></br>${elm.UPS}</div>
                    <div class="list"><b>שם המוצר:</b></br></br>${elm.Name}</div>
                    <div class="list"><b>תאריך תפוגה:</b></br></br>${elm.ExpiryDate}</div>
                    <div class="list"><b>מיקום:</b></br></br>${elm.Location}</div>
                </div>`
                        })
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
            <div class="text" style="direction: initial;"><b>מיקום:</b>${data.data[0].Location}</div>
            <div class="text"><img src="${data.data[0].Picture}"></div>`
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
    Registration.style.display = 'none'
    Search.style.display = 'none'
    ShowAll.style.display = 'none'
    UsersList.style.display = 'none'
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
            data.data.forEach(elm => {
                carbox.innerHTML += `<div class="cardlist" onclick="PullInformation('${elm.UPS}')">
                <div class="list"><b>UPS-מקט:</b></br></br>${elm.UPS}</div>
                <div class="list"><b>שם המוצר:</b></br></br>${elm.Name}</div>
            <div class="list"><b>תאריך תפוגה:</b></br></br>${elm.ExpiryDate}</div> 
            <div class="list" style="direction: initial;"><b>מיקום:</b></br></br>${elm.Location}</div> 
        </div>`
            })
        })
}



function getListUsers() {
    menu.style.right = '-100%'


    fetch('/get-List-Users')
        .then(res =>
            res.json()
        )
        .then(data=>{ 
            outcome.style.display = 'none'
            Registration.style.display = 'none'
            Search.style.display = 'none'
            ShowAll.style.display = 'none'
            cardCategory.style.display = 'none'
            UsersList.style.display = 'block'

            if (data.data != null) {
                data.data.forEach(element => {
                    UsersList.innerHTML =
                        `<div class="col-sm-4">
                        <button class="Addanewuser" onclick="Addauser()"><img src="/img/adduser.png"></button>
                        </div>
                    <table>
                    <thead>
                        <tr>
                                <th>
                                    <a>שם מלא</a>
                                </th>
                                <th>
                                    <a>שם משתמש</a>
                                </th>
                                <th>
                                    <a>תפקיד</a>
                                </th>
                            </tr>
                        </thead>
                            <tbody>
                                ${data.data.map(elm => 
                                    `<tr>
                                        <td>   ${elm.name}   </td>
                                        <td>   ${elm.userName}   </td>
                                        <td>   ${elm.role}   </td> 
                                        <td>
                                        <a action="Edit" onclick='editUser(${elm._id})'>    Edit</a> |
                                        <a action="Details">    Details</a> |
                                        <a action="Delete" onclick='deleteUser("${elm._id}")'>    Delete</a>
                                    </td>
                                         
                        </tr>
                        
                        `).join('')}</tbody>
                        </table>`;
              
                })
                
            };
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
            console.log(data)
                document.getElementById('UsersList').innerHTML =
                    `<div class="col-sm-4">
                    <button class="Addanewuser" onclick="Addauser()"><img src="/img/adduser.png"></button>
                    </div>
        <table>
        <thead>
            <tr>
                    <th>
                        שם מלא
                    </th>
                    <th>
                        שם משתמש
                    </th>
                    <th>
                        תפקיד
                    </th>
                </tr>
            </thead>
                <tbody>
                    ${data.map(elm =>
                        `<tr>
                            <td>   ${elm.name}   </td>
                            <td>   ${elm.userName}   </td>
                            <td>   ${elm.role}   </td> 
                            <td>
                            <a action="Edit" onclick='editUser(${elm._id})'>    Edit</a> |
                            <a action="Details">    Details</a> |
                            <a action="Delete" onclick='deleteUser("${elm._id}")'>    Delete</a>
                        </td>
                             
            </tr>
            
            `).join('')}</tbody>
            </table>`;
            })

}







function displayblockmenu(event) {
        menu.style.right = '0'
        // event.target.style.display='none'
}

function menubutoondisplayblock() {
        menu.style.right = '-100%'
}