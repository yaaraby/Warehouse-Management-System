const error = document.getElementById('error')

const handleLogin = (event) => {
    event.preventDefault();
    let userName = event.target.children.userName.value;
    let password = event.target.children.password.value;

    if (userName.length == 0 && password.length == 0) {
        error.innerHTML = 'הזן שם וסיסמה'
    }else if (userName.length == 0) {
        error.innerHTML = 'הזן שם משתמש'
    } else if (password.length == 0) {
        error.innerHTML = 'הזן סיסמה'
    }else {
        error.innerHTML = '<img src="/img/rotete.gif">'

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
                if (data.validate) {
                    window.location.replace('/index/index.html')
                } else {
                    error.innerHTML = "פרטים שגויים נסה שנית";
                }
            })
    }
}
