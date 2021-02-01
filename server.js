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

const secret = 'gvfdgb%$^$%&3$4054423654073467$6@$&*(@%$^&2310*/-/+'

const url = "mongodb+srv://yaara:987Yaara@cluster0.uya8d.mongodb.net/test";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });


const Users = mongoose.model('User', {
    id_user: String,
    userName: String,
    name: String,
    password: String,
    email: String,
    phone: String,
    role: String
});

const Shelfs = mongoose.model('Shelf', {
    Line: Number,
    Area: String,
    Floor: Number,
    UPS_Shelfs: String,
    NumberOfProductsonShelf: Number,
    MaximumWeight: Number,
    CurrentWeight: Number,
    height: Number
});

const Products = mongoose.model('product', {
    UPS: String,
    Name: String,
    price: Number,
    Amount: Number,
    Category: String,
    Weight: Number,
    height: Number,
    ExpiryDate: String,
    Image: String,
    Location: String

});


// const testShelf = new Shelfs({
//     Line: 3,
//     Area: 'F',
//     Floor: 5,
//     UPS_Shelfs: ``,
//     NumberOfProductsonShelf:32,
//     MaximumWeight: 500,
//     CurrentWeight: 300,
//     height: 50
// });
// testShelf.save().then(doc => console.log(doc)).catch(e =>console.log(e));


// const product1 = new Products({
//     UPS: '81726',
//     Name: 'כוס',
//     price: '450',
//     Category: 'זכוכית',
//     Weight: '5',
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


app.get('/get-List-Users', async (req, res) => {
    const data = await Users.find()
    res.send({ data })
})


app.delete('/:userId', async (req, res) => {
    try {
        let userId = req.params.userId;
        await Users.findByIdAndDelete(userId);
        const data = await Users.find({})
        res.send(data)
    } catch (e) {
        console.log(e)
    }
})

// login.html
let role = "מחסנאי"
let ok = false
let token

app.get('/Output', async (req, res) => {
    res.cookie('validated', token, { maxAge: 0, httpOnly: true })
    res.send(true)
})


app.post('/send-Login-details', async (req, res) => {
    try {
        const { userName, password } = req.body
        let validate = false


        const data = await Users.find({})
        for (i = 0; i < data.length; i++) {
            if (userName == data[i].userName && password == data[i].password) {
                validate = true;
                if (data[i].role == 'מנהל') {
                    role = 'ok'
                } else {
                    role = 'none'
                }
                break
            } else {
                role = 'מחסנאי'
                console.log(`no match ${data[i].userName}`)
            }
        }
        token = jwt.encode({ role }, secret)

        if (validate) {
            res.cookie('validated', token, { maxAge: 10086400, httpOnly: true })
        }
        res.send({ validate, role });
    }
    catch (e) {
        console.log(e.message)
    }
})

// index.html
app.get('/Cookie-test', (req, res) => {
    let validated
    let checkCookie = req.cookies.validated

    if (checkCookie) {
        let decoded = jwt.decode(checkCookie, secret);
        validated = decoded.role

    } else {
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


//yehial------------------------------------------------------------------
app.get('/pull-Shelf', async (req, res) => {
    const data = await Shelfs.find({ NumberOfProductsonShelf: { $gte: 1 } })
    res.send({ data })
})



app.post('/shelf-creation', async (req, res) => {
    console.log(req);


    res.send();
})

app.put("/shelf-creation", async (req, res) => {

    // console.log(req.body.UPS_Shelfs)


    req.body.forEach(element => {
        const testShelf = new Shelfs(

            {
                Line: element.Line,
                Area: element.Area,
                Floor: element.Floor,
                UPS_Shelfs: element.UPS_Shelfs,
                NumberOfProductsonShelf: 1,
                MaximumWeight: 0,
                CurrentWeight: 0,
                height: 0
            });

        testShelf.save();


    });
    res.send({ ok: true })
});


app.post('/PullThiscCategory', async (req, res) => {
    const { eventCategory } = req.body
    const data = await Products.find({ Category: eventCategory })
    res.send({ data })
})


// Search

app.post('/Searchdeta', async (req, res) => {
    const { placeholder, inputvalue } = req.body
    // return false 
    if (placeholder == 'UPS-מקט') {
        const data = await Products.find({ UPS: inputvalue })
        if (data.length == 0) {
            res.send({ message: 'UPS לא נמצא' })
        }
        else {
            res.send({ data })
        }
    }
    else if (placeholder == 'חיפוש לפי שם מוצר') {
        const data = await Products.find({ Name: inputvalue })
        if (data.length == 0) {
            res.send({ message: 'פריט לא קיים' })
        }
        else {
            res.send({ data })
        }
    }
    else if (placeholder == 'חיפוש לפי תאריך תפוגה') {
        const data = await Products.find({ ExpiryDate: inputvalue })
        if (data.length == 0) {
            res.send({ message: 'לא נמצא מוצר לפי תאריך תפוגה זה' })
        }
        else {
            res.send({ data })
        }
    }
    else if (placeholder == 'חיפוש לפי מדף / מיקום') {
        const data = await Products.find({ Location: inputvalue })
        if (data.length == 0) {
            res.send({ message: 'מדף לא קיים' })
        }
        else {
            res.send({ data })
        }
    }
})

app.post('/PullInformation', async (req, res) => {
    const { e } = req.body
    const data = await Products.find({ UPS: e })
    res.send({ data })
})


app.put("/update", async (req, res) => {
    const data = await Users.find({})
    for (i = 0; i < data.length; i++) {
        if (req.body.id_user !== data[i].id_user) {
            if (req.body.userName == data[i].userName) {
                message = 'שם משתמש כבר קיים'
                break
            } else if (req.body.email == data[i].email) {
                message = 'מייל זה כבר קיים במערכת'
                break
            } else {
                message = 'ok'
                break
            }
        }
    }

    if (message == 'ok') {

        var myquery = { id_user: req.body.id_user };
        var newvalues = {
            $set: {
                userName: req.body.userName
                , name: req.body.name
                , password: req.body.password
                , email: req.body.email
                , phone: req.body.phone
                , role: req.body.role
            }
        };
        await Users.update(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");

        });
    }
    setTimeout(() => { res.send({ message }) }, 1000);
});


app.get('/get-details-users:userId', async (req, res) => {
    let { userId } = req.params
    console.log(userId)
    try {
        const findUser = await Users.findOne({ _id: userId });
        res.send(findUser)

    } catch (e) {
        console.log(e)
    }
})



const port = process.env.PORT || 8080;
app.listen(port, () => console.log('http://localhost:8080/login/login.html'))

