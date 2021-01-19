const handleLogin = (event) => {
    event.preventDefault();

    let userName = event.target.children.userName.value;
    let password = event.target.children.password.value;

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
                document.getElementById('root').innerHTML = "You are not allowed";
            }
        })
}
