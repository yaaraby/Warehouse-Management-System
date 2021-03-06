const error = document.getElementById('error')
document.querySelector("#userna").focus()

testcoocik()

function testcoocik() {
    fetch('/Cookie-test')
        .then(r => r.json())
        .then(data => {
            if (data.validated == "ok") {
                location.href='/Director/index.html'
            } else if (data.validate == 'none') {
                location.href='/userRegular/index.html'
            }else{
                document.body.style.display="flex"
            }
        })
}


const handleLogin = (event) => {
    event.preventDefault();
    let userName = event.target.children.userName.value;
    let password = event.target.children.password.value;

    if (userName.length == 0 && password.length == 0) {
        error.innerHTML = 'הזן שם וסיסמה'
    } else if (userName.length == 0) {
        error.innerHTML = 'הזן שם משתמש'
    } else if (password.length == 0) {
        error.innerHTML = 'הזן סיסמה'
    } else {
        error.innerHTML = '<img src="/img/gif.gif">'

        fetch('/send-Login-details', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.validate == true && data.role == 'ok') {
                    window.location.replace('/Director/index.html')
                } else if (data.validate == true && data.role == 'none') {
                    window.location.replace('/userRegular/index.html')
                } else {
                    error.innerHTML = "פרטים שגויים נסה שנית";
                }
            })
    }
}
