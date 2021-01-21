const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jwt-simple');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'))
const mongoose = require('mongoose');

const secret = 'gvfdgb%$^$%&$4054423654073467$6@$&*(@%$^&2310*/-/+'

const url = "mongodb+srv://yaara:987Yaara@cluster0.uya8d.mongodb.net/test";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const Users = mongoose.model('user', {
    id_user: String,
    userName: String,
    name: String,
    password: String,
    email: String,
    phone: String,
    role: String
});

const Products = mongoose.model('product', {
    UPS: String,
    Name: String,
    price: String,
    Category: String,
    Weight: String,
    ExpiryDate: String

});
// hh()
// async function hh(){
// const ff = await Products.find({})
// console.log(ff)
// }
// const product1 = new Products({
//     UPS: '81726',
//     Name: 'Milk',
//     price: '4.5',
//     Category: 'Milk',
//     Weight: '1',
//     ExpiryDate: '30/02/2021'

// })
// product1.save().then(doc => console.log(doc)).catch(e =>console.log(e));


// const user = new Users({
//     id_user: '123456',
//     userName:'הלל',
//     name: 'הלל',
//     password: '2580',
//     email: 'A4105962@GMAIL.COM',
//     phone: '054-6080982',
//     role: 'admin'
// });

//  user.save().then(doc => console.log('doc')).catch(e =>console.log(e));

// login.html

let ok = false
app.post('/send-Login-details', async (req, res) => {
    try {
        const { userName, password } = req.body
        let validate = false
        let role = 'public'

        const data = await Users.find({})
        data.forEach(elm => {
            if (userName == elm.userName && password == elm.password) {
                validate = true;
                role = elm.role
            } else {
                console.log(`no match ${elm.userName}`)
            }
        })

        let token = jwt.encode({ role }, secret);

        if (validate) {
            res.cookie('validated', token, { maxAge: 100000000, httpOnly: true })
        }
        setTimeout(() => { res.send({ validate }) }, 1000);
    }
    catch (e) {
        console.log(e.message)
    }
})

// index.html
app.get('/Cookie-test', (req, res) => {
    let validated = true

    const checkCookie = req.cookies.validated
    console.log(checkCookie)

    if (checkCookie == undefined) {
        validated = false
    }
    res.send({ validated })
})

app.post('/send-User-details-sign-up', async (req, res) => {

    let message = ''
    const { id_user, name, userName, password, email, phone, role } = req.body

    const data = await Users.find({})
    for (i = 0; i < data.length; i++) {
        if (id_user == data[i].id_user) {
            message = 'מספר זהות קיים'
            break
        } else if (userName == data[i].userName) {
            message = 'שם משתמש כבר קיים'
            break
        } else if (email == data[i].email) {
            message = 'מייל זה כבר קיים במערכת'
            break
        } else {
            message = 'ok'
            break
        }
    }

    if (message == 'ok') {
        const user = new Users({ id_user, name, userName, password, email, phone, role });
        await user.save().then(doc => console.log(doc)).catch(e => console.log(e));
    }

    setTimeout(() => { res.send({ message }) }, 1000);
})

app.get('/get-category', async (req, res) => {
    const data = await Products.find({}, { Category: 1 })
    res.send({ data })
})

app.post('/PullThiscCategory', async (req, res) => {
    const { eventCategory } = req.body
    const data = await Products.find({ Category: eventCategory })
    res.send({ data })
})




const port = process.env.PORT || 8080;
app.listen(port, () => console.log('server listen on port ', port))

