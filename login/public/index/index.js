setInterval(function () {
    fetch('/Cookie-test')
        .then(r => r.json())
        .then(data => {
            if (data.validated) {
                console.log('ur good')
            } else {
                window.location.replace('/login/login.html')
            }
        })
}, 500);