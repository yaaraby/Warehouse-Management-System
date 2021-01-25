const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//const jwt = require('jwt-simple');

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
     userName:String,
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
    Weight: Number,
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
    Location:String

});

app.get('/get-List-Users', async (req, res) => {
    const data = await Users.find()
        res.send({ data})
   
    
})

app.delete('/:userId',async (req, res, next) => {
    let userId = req.params.userId;
    try {
        let isusersExists = isUsersExists(userId);

        if (!isusersExists) {
            res.status(500).send('Error: User does not exists')
        } else {
            await Users.deleteOne({ id_user: userId });
            res.send(true)
        }
    } catch (e) {
        console.log(e)
    }
})
/* 
app.put("/update", (req, res) => { 
    const userId = req.body.userId

    Users.updateOne({ id_user: userId }, {
            $set: {}
        }
    
    
    console.log(products)
    
    
        res.send({ ok: true })
    }) */

let isUsersExists = async (userId) => {
    let isExists = false;
    const data = await Users.find({})
    for (i = 0; i < data.length; i++) {
        console.log(data[i].id_user)
        if (userId == data[i].id_user) {
            isExists = true;
        }
    }       
        console.log(isExists)
        return isExists;
    }






    const port = process.env.PORT || 8081;
    app.listen(port, () => console.log('server listen on port ', port))


