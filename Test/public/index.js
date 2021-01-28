let UsersList = document.getElementById('UsersList');
let message = document.getElementById('message');

function getListUsers() {

    fetch('/get-List-Users')
        .then(res =>
            res.json()
        )
        .then(data=>{ 
            
            if (data.data != null) {
                data.data.forEach(element => {
                    document.getElementById('UsersList').innerHTML =
                        `<div class="col-sm-4">
                        <button type="button" class="btn btn-info add-new"> Add New</button>
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
                                    <a>איימל</a>
                                </th>
                                <th>
                                    <a>טלפון</a>
                                </th>
                                <th>
                                    <a>תפקיד</a>
                                </th>
                            </tr>
                        </thead>
                            <tbody>
                                ${data.data.map(elm => 
                                    `<tr style="border-bottom: 5px solid black">
                                        <td>   ${elm.name}   </td>
                                        <td>   ${elm.userName}   </td>
                                        <td>   ${elm.email}   </td> 
                                        <td>   ${elm.phone}   </td>
                                        <td>   ${elm.role}   </td> 
                                        <td>       </td>
                                        <td>
                                        <a action="Edit" onclick='editUser(${elm.id_user})'>    Edit</a> |
                                        <a action="Details">    Details</a> |
                                        <a action="Delete" onclick='deleteUser(${elm.id_user})'>    Delete</a>
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
      
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res =>
        res.json()
    )
        
        .then(data => {
                document.getElementById('UsersList').innerHTML =
                    `<div class="col-sm-4">
            <button type="button" class="btn btn-info add-new"> Add New</button>
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
                        איימל
                    </th>
                    <th>
                        טלפון
                    </th>
                    <th>
                        תפקיד
                    </th>
                </tr>
            </thead>
                <tbody>
                    ${data.map(elm =>
                        `<tr style="border-bottom: 5px solid black">
                            <td>   ${elm.name}   </td>
                            <td>   ${elm.userName}   </td>
                            <td>   ${elm.email}   </td> 
                            <td>   ${elm.phone}   </td>
                            <td>   ${elm.role}   </td> 
                            <td>       </td>
                            <td>
                            <a action="Edit" onclick='editUser(${elm.id_user})'>    Edit</a> |
                            <a action="Details">    Details</a> |
                            <a action="Delete" onclick='deleteUser(${elm.id_user})'>    Delete</a>
                        </td>
                             
            </tr>
            
            `).join('')}</tbody>
            </table>`;
            })

}

const editUser = (userId) => {
    letdistinctResult= []; 
     fetch('/get-details-users' + userId,{
               method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res =>
            res.json()
        )
        .then(data => {
             document.getElementById('editUserById').innerHTML =
                   
                    `<h1>עריכת משתמש</h1>
                    <form onsubmit="handleEditUser(event)">
                    
                 <div class="userDetails">
                 
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
                <option value="public">מחסנאי</option>
                <option value="admin">מנהל</option>
            </select></br>
            <div id="message"></div></br>
            <input type="submit" value="אישור">
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

let message = document.getElementById('message');
message.innerHTML=''
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

    //  console.log(id_user, name,userName,password, email, role  )
 
        fetch("/update" , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_user, name, userName, password, email, phone , role})
        })
            .then(res => res.json())
            .then(data => {
                if (data.message == 'ok') {
                message.innerHTML  = 'המשתמש עודכן במערכת'


                } else {
                    message.innerHTML = data.message
                }
                  
            }) 
    }
} 


