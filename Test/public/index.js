let UsersList = document.getElementById('UsersList');

function getListUsers() {
    fetch('/get-List-Users')
        .then(res =>
            res.json()
        )
        .then(data => {
            reloadTable(data)
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
            reloadTable(data)
        })

}


function dat(data) {
    data.data.forEach(element => {
    document.querySelector('.insertuserdetails').innerHTML =
    `<div class="id">${element.id_user}</div>
        <div class="name">${element.name}</div>
        <div class="username">${element.userName}</div>
        <div class="email">${element.email}</div>
        <div class="tel">${element.phone}</div>
        <div class="role">${element.role}</div>`
    });
}


function editItem(name, price, image) {

    console.log(name, price, image)
    fetch("/update", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price, image })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
}


