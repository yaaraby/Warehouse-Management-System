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
app.get('/get-details-users:userId', async (req, res, next) =>
 {
     let {userId} = req.params;
     console.log(userId)
     try {
     const findUser = await Users.findOne({ id_user : userId});

        res.send(findUser)
    } catch (e) {
        console.log(e)
    }
})

app.delete('/:userId',async (req, res, next) => {
    let userId = req.params.userId;
    try {
        let isusersExists = isUsersExists(userId);

        if (!isusersExists) {
            res.status(500).send('Error: User does not exists')
        } else {
            await Users.deleteOne({id_user: userId });
            const data = await Users.find({})
            res.send(data)
        }
    } catch (e) {
        console.log(e)
    }
})

 app.put("/update", async (req, res) => {
  const data = await Users.find({})
    for (i = 0; i < data.length; i++) {
        if(req.body.id_user !==  data[i].id_user){
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



  var myquery = {id_user:  req.body.id_user};
  var newvalues = { $set: {
                         userName: req.body.userName
                        , name:     req.body.name
                        , password: req.body.password
                        , email:    req.body.email
                        , phone:    req.body.phone
                        , role:     req.body.role} };
     await Users.update(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");

  });
    }
    setTimeout(() => { res.send({ message }) }, 1000);
}); 
         

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


