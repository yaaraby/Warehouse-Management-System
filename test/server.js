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
    NumberOfProductsonShelf:Number,
    MaximumWeight: Number,
    CurrentWeight: Number,
    height: Number


});
/*  
 const Shelf = new Shelfs({
    Line: 1,
    Area: 'A',
    Floor: 1,
    UPS_Shelfs: '1-A-1',
    NumberOfProductsonShelf:200,
    MaximumWeight: 650,
    CurrentWeight: 650,
    height: 30

})
Shelf.save().then(doc => console.log(doc)).catch(e =>console.log(e));
  */
 
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

app.get('/get-category', async (req, res) => {
    const data = await Products.find({}, { Category: 1 })
    res.send({ data })
})

app.get('/get-Shelfs-list', async (req, res) => {
    const data = await Shelfs.find({}, { UPS_Shelfs: 1 })
    res.send({ data })
})

app.get('/get-Details-Shelfs:UPS_Shelfs', async (req, res, next) =>
 {
     let {UPS_Shelfs} = req.params;
     try {
     const CurrrentDetailsShelf = await Shelfs.findOne({ UPS_Shelfs : UPS_Shelfs});

        res.send(CurrrentDetailsShelf)
    } catch (e) {
        console.log(e)
    }
})

app.post('/add_Products', async (req, res) => {
let status = true
    const { UPS, Name, price, Amount, Category, Weight, height, ExpiryDate, Location} = req.body


        const products = new Products({UPS, Name, price, Amount, Category, Weight, height, ExpiryDate, Location});
        await products.save().then(doc => console.log(doc)).catch(e => console.log(e));
        let sumProductOnShelf  = await updateNumberOfProduct(Amount, Location,Weight)

        if(sumProductOnShelf == true){
             res.send({ status })
        }
})

const  updateNumberOfProduct = async (Amount, Location, Weight)=>{

const data = await Shelfs.find({})
 for (i = 0; i < data.length; i++)
  {
        if(Location ==  data[i].UPS_Shelfs){
          let  ups_shelf = data[i].UPS_Shelfs
          let  numberOfProductsonShelf = data[i].NumberOfProductsonShelf 
          let  weight = data[i].CurrentWeight
          numberOfProductsonShelf += eval(Amount);
          weight += eval(Weight);

            var myquery = { UPS_Shelfs:  Location};
            var newvalues = { $set: {
                         NumberOfProductsonShelf: numberOfProductsonShelf,
                         CurrentWeight: weight
                       } };
     await Shelfs.update(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
            } )
  }      
  }
    return (true);
};



app.post('/PullThiscCategory', async (req, res) => {
    const { eventCategory } = req.body
    const data = await Products.find({ Category: eventCategory })
    res.send({ data })
})


app.get('/get-details-product:id', async (req, res) => {
    let  id  = req.params.id
    try {
        const findProduct = await Products.findOne({ _id: id });
        res.send(findProduct)

    } catch (e) {
        console.log(e)
    }
})

app.delete('/deleteProduct/:id', async (req, res, next) => {
    console.log('gg')
    let id = req.params.id;
    console.log(id);
    try {
        let product = await isProductExists(id);

        if (!product.isExists) {
            res.status(500).send('Error: Product does not exists')
        } else {
            await Products.deleteOne({_id:id});
            // const data = await Products.find({})
            res.send({deleted:true})
        }
    } catch (e) {
        console.log(e)
    }
})
let isProductExists = async (id) => {
    let isExists = false;
    const data = await Products.find({_id:id})
    console.log(data)
        if (data !== null ) {
            isExists = true;
        }
          
        console.log(isExists)
        return {isExists, data};
    }
         

let isUsersExists = async (userId) => {
    let isExists = false;
    const data = await Users.find({})
    for (i = 0; i < data.length; i++) {
        if (userId == data[i].id_user) {
            isExists = true;
        }
    }       
        console.log(isExists)
        return isExists;
    }






    const port = process.env.PORT || 8081;
    app.listen(port, () => console.log('server listen on port ', port))


