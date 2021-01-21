
 const handleRegistration = async (e) => {
    e.preventDefault();

    let id_user = e.target.children.id_user.value;
    let name = e.target.children.name.value;
    let username = e.target.children.username.value;
    let password = e.target.children.password.value;
    let email = e.target.children.email.value;
    let phone = e.target.children.phone.value;
    let role = e.target.children.role.value;
    
    let concat = {
        "id_user": id_user,
        "name": name,
        "username": username,
        "password": password,
        "email": email,
        "phone": phone,
        "role": role,
    }
    console.log(concat)


    await fetch('http://localhost:600/send-User-details_sign_up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(concat)
        }).then(res =>
            res.json()
        )
        .then(data => {
            if (data) {
                window.location.href = 'index.html';
            } else {
                document.getElementById('root').innerHTML = "ERROR, TRY AGAIN";
            }
        })
}