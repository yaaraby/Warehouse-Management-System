setInterval(function () {
    fetch('/Cookie-test')
        .then(r => r.json())
        .then(data => {
            if (data.validated !== true) {
                window.location.replace('/login/login.html')
            }
        })
}, 1000);

const message = document.querySelector("#message")
const Registration = document.querySelector('.Registration')
function Addauser() {
    Registration.style.display = 'block'
}
function Registrationdisplaynone(){
    Registration.style.display = 'none'
}
function Output(){
    window.location.replace('/login/login.html')
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

    if (id_user.value.length == 0) {
        message.innerHTML = 'הזן מספר זהות'
    } else if (name.length == 0) {
        message.innerHTML = 'הזן שם פרטי'
    } else if (userName.value.length == 0) {
        message.innerHTML = 'הזן שם לכניסה'
    } else if (password.value.length == 0) {
        message.innerHTML = 'הזן סיסמה'
    } else if (email.value.length == 0) {
        message.innerHTML = 'הזן מייל'
    } else if (phone.value.length == 0) {
        message.innerHTML = 'הזן מספר טלפון'
    } else if (role.value == "דירוג") {
        message.innerHTML = 'הזן דירוג למשתמש'
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

                } else {
                    message.innerHTML = data.message
                }
            })
    }
}