let UsersList = document.getElementById('UsersList');

function getListUsers() {
    `<table><tr>
<td></td>`

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
            console.log(data)
            if (data) {
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
            } else {
                document.getElementById('message').innerHTML ='Try again'
            }})

}

function editItem(name, price, image) {

    console.log(name, price, image)
        fetch("/update", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name,price, image })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
}


