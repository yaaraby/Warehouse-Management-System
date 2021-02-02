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
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);



const Users = mongoose.model('User', {
    id_user: String,
    userName: String,
    name: String,
    password: String,
    email: String,
    phone: String,
    role: String,
    status: String
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

let newDate = new Date().getTime()
let role = "מחסנאי"
let ok = false
let token

app.get('/Output', async (req, res) => {

    let checkCookie = req.cookies.validated
    let decoded = jwt.decode(checkCookie, secret);
    const _id = decoded.id

    await Users.updateOne({ _id }, { status: 'false' })

    res.cookie('validated', token, { maxAge: 0, httpOnly: true })
    res.send(true)
})



app.get('/alluserconnected', async (req, res) => {
    const data = await Users.find({status:true})
    res.send({ data })
})


app.post('/send-Login-details', async (req, res) => {
    try {
        const { userName, password } = req.body
        let validate = false
        let id

        const data = await Users.find({})
        for (i = 0; i < data.length; i++) {
            if (userName == data[i].userName && password == data[i].password) {
                id = data[i]._id

                await Users.updateOne({ _id: id }, { status: 'true' })

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
        newDate = new Date().getTime()
        token = jwt.encode({ role, userName, id, newDate}, secret)

        if (validate) {
            res.cookie('validated', token, { maxAge: 86400000, httpOnly: true })
        }
        res.send({ validate, role });
    }
    catch (e) {
        console.log(e.message)
    }
})


// index.html
app.get('/Cookie-test', async (req, res) => {
    let validated
    let name
    let id
    let checkCookie = req.cookies.validated
    newDate = new Date().getTime()

    
    if (checkCookie) {
        let decoded = jwt.decode(checkCookie, secret);
        validated = decoded.role
        name = decoded.userName
        id = decoded.id
        
        if (decoded.newDate + 86400000 < newDate){
            await Users.updateOne({ _id:id }, { status: 'false' })
            res.cookie('validated', token, { maxAge: 0, httpOnly: true })
            validated = false
        }
    } else {
        validated = false
    }

    res.send({ validated, name, id })
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


app.put("/shelf-creation", async (req, res) => {
    let message = ""
    // console.log(req.body)


    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O','P']
    let tempNewRows = []


    for(let i=0 ; i<req.body.tempTotalRowNumber;i++){


        for (let j = 0; j<req.body.numberOfAreas; j++) {
            
            for (let k = 0; k < req.body.numberOfShelfs; k++) {
                
                // console.log(`${i+1}${letters[j]}${k+1}`) //For test
                tempNewRows.push(
                    {
                     Line: i+1,
                     Area: `${letters[j]}`,
                     Floor: k+1,
                     UPS_Shelfs: `${i+1}-${letters[j]}-${k+1}`,
                    // NumberOfProductsonShelf:Number, //Optional
                     MaximumWeight: req.body.maxWight,
                    // CurrentWeight: Number,//Optional
                    // height: Number//Optional
                
            })
            
        }

    }
}

console.log(tempNewRows)

tempNewRows.forEach(async element => {
    
    const testShelf = new Shelfs(
                        {
                            Line: element.Line,
                            Area: element.Area,
                            Floor: element.Floor,
                            UPS_Shelfs: element.UPS_Shelfs,
                            NumberOfProductsonShelf: 1,      //1 for test
                            MaximumWeight: element.MaximumWeight,
                            CurrentWeight: 0,
                            height: 0
                        });
    
                        testShelf.save();

});


let flag 


for (let i=0; i<req.body.tempTotalRowNumber; i++)
 {
     if(await Shelfs.findOne({ Line: 1}).exec()===null){flag=null}
     //else{flag=true}
 }
 console.log(flag)
    // let flag = await Shelfs.findOne({ Line: 1 }).exec();
    // // console.log(req.body)
    // console.log(flag.Line)

    // req.body.forEach(async element => {
    //     let flag = await Shelfs.findOne({ Line: element.Line }).exec();

    //     if (flag == null) {
    //         req.body.forEach(element => {
    //             // console.log(req.body)
    //             const testShelf = new Shelfs(
    //                 {
    //                     Line: element.Line,
    //                     Area: element.Area,
    //                     Floor: element.Floor,
    //                     UPS_Shelfs: element.UPS_Shelfs,
    //                     NumberOfProductsonShelf: 1,
    //                     MaximumWeight: element.MaximumWeight,
    //                     CurrentWeight: 0,
    //                     height: 0
    //                 });
    //             testShelf.save();
    //         });
    //         res.send(true)
    //     }
    //     else {
    //         message = 'שורה זאת כבר קיימת'
    //         res.send({ message })
    //     }
    // })










    
    // for (i = 0; i <=tempTotalRowNumber ; i++) {
        

    //     for (j = 0; j <numberOfAreas.value;j++) {

    //         for (k = 0; k < numberOfShelfs.value; k++) {

    //             console.log(`${i+1}${letters[j]}${k+1}`)
    //             tempNewRows.push({
    //                 Line: tempFirstRow,
    //                 Area: `${letters[j]}`,
    //                 Floor: k,
    //                 UPS_Shelfs: `${tempFirstRow}-${letters[j]}-${k+1}`,
    //                 // NumberOfProductsonShelf:Number, //Optional
    //                 MaximumWeight: maxWight.value,
    //                 // CurrentWeight: Number,//Optional
    //                 // height: Number//Optional
    //             })
    //         }
    //     }
    //     tempFirstRow++
    // }




























    
   
});


app.post('/delete-shelf',async(req,res)=>{

    const temp = req.body.UPS_Shelfs;
    console.log(temp);
<<<<<<< HEAD
    

})




=======
    // res.send(temp)

})

>>>>>>> master
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
    const data = await Products.find({ _id: e })
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
        await Users.updateOne(myquery, newvalues, function (err, res) {
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

// yaara


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
        
app.get('/get-details-product:id', async (req, res) => {
    let  id  = req.params.id
    try {
        const findProduct = await Products.findOne({ _id: id });
        res.send(findProduct)

    } catch (e) {
        console.log(e)
    }
})



const port = process.env.PORT || 8080;
app.listen(port, () => console.log('http://localhost:8080/login/login.html'))

