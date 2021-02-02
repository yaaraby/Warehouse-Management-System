let UsersList = document.getElementById('UsersList');
let message = document.getElementById('message');
let shelfOptions = [];
 
const init = () => {
    //first function to run
    getShelfList();
}
function getListUsers() {

    fetch('/get-List-Users')
        .then(res =>
            res.json()
        )
        .then(data=>{ 
            
            if (data.data != null) {
                data.data.forEach(element => {
                    document.getElementById('UsersList').innerHTML =
                        `<div class="col-sm-4">
                        <button type="button" class="btn btn-info add-new"> Add New</button>
                    </div>
                    <table>
                    <thead>
                        <tr>
                                <th>
                                    <a>שם מלא</a>
                                </th>
                                <th>
                                    <a>שם משתמש</a>
                                </th>
                                <th>
                                    <a>איימל</a>
                                </th>
                                <th>
                                    <a>טלפון</a>
                                </th>
                                <th>
                                    <a>תפקיד</a>
                                </th>
                            </tr>
                        </thead>
                            <tbody>
                                ${data.data.map(elm => 
                                    `<tr style="border-bottom: 5px solid black">
                                        <td>   ${elm.name}   </td>
                                        <td>   ${elm.userName}   </td>
                                        <td>   ${elm.email}   </td> 
                                        <td>   ${elm.phone}   </td>
                                        <td>   ${elm.role}   </td> 
                                        <td>       </td>
                                        <td>
                                        <a action="Edit" onclick='editUser(${elm.id_user})'>    Edit</a> |
                                        <a action="Details">    Details</a> |
                                        <a action="Delete" onclick='deleteUser(${elm.id_user})'>    Delete</a>
                                    </td>
                                         
                        </tr>
                        
                        `).join('')}</tbody>
                        </table>`;
              
                })
                
            };
        })
        
}

const deleteUser = (userId) => {
    fetch('/' + userId, {
      
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res =>
        res.json()
    )
        
        .then(data => {
                document.getElementById('UsersList').innerHTML =
                    `<div class="col-sm-4">
            <button type="button" class="btn btn-info add-new"> Add New</button>
        </div>
        <table>
        <thead>
            <tr>
                    <th>
                        שם מלא
                    </th>
                    <th>
                        שם משתמש
                    </th>
                    <th>
                        איימל
                    </th>
                    <th>
                        טלפון
                    </th>
                    <th>
                        תפקיד
                    </th>
                </tr>
            </thead>
                <tbody>
                    ${data.map(elm =>
                        `<tr style="border-bottom: 5px solid black">
                            <td>   ${elm.name}   </td>
                            <td>   ${elm.userName}   </td>
                            <td>   ${elm.email}   </td> 
                            <td>   ${elm.phone}   </td>
                            <td>   ${elm.role}   </td> 
                            <td>       </td>
                            <td>
                            <a action="Edit" onclick='editUser(${elm.id_user})'>    Edit</a> |
                            <a action="Details">    Details</a> |
                            <a action="Delete" onclick='deleteUser(${elm.id_user})'>    Delete</a>
                        </td>
                             
            </tr>
            
            `).join('')}</tbody>
            </table>`;
            })

}

const editUser = (userId) => {
    letdistinctResult= []; 
     fetch('/get-details-users' + userId,{
               method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res =>
            res.json()
        )
        .then(data => {
             document.getElementById('editUserById').innerHTML =
                   
                    `<h1>עריכת משתמש</h1>
                    <form onsubmit="handleEditUser(event)">
                    
                 <div class="userDetails">
                 
                     <label for="id_user">מספר זהות:
                    <input type="text" name="id_user" id="id_user" value="${data.id_user}" disabled="disabled" autocomplete='off'></br>
                </label>
                <label for="name">שם:
                    <input type="text" name="name" id="name" value="${data.name}" autocomplete='off'></br>
                </label>
                <label for="userName">שם משתמש:
                    <input type="text" name="username" id="userName" value=${data.userName} autocomplete='off'></br>
                </label>
                <label for="password">סיסמה:
                    <input type="text" name="password" id="password" value=${data.password} autocomplete='off'></br>
                </label>
                <label for="email">אימייל:
                    <input type="email" name="email" id="email" value=${data.email} autocomplete='off'></br>
                </label>
                <label for="phone">פלאפון:
                    <input type="text" name="phone" id="phone" value=${data.phone} autocomplete='off'></br>
                </label>
            </div>
            <select name="role" id="role" value=${data.role}>
                <option style="display: none;">${data.role}</option>
                <option value="public">מחסנאי</option>
                <option value="admin">מנהל</option>
            </select></br>
            <div id="message"></div></br>
            <input type="submit" value="אישור">
        </form>`
        })
     }

 function handleEditUser(e) {
     e.preventDefault();


    let id_user = e.target[0].value;
    let name = e.target[1].value;
    let userName = e.target[2].value;
    let password = e.target[3].value;
    let email = e.target[4].value;
    let phone = e.target[5].value;
    let role = e.target[6].value;

let message = document.getElementById('message');
message.innerHTML=''
        if (name.length < 2) {
        message.innerHTML = 'נדרש להזין שם מלא תקין'
    } else if (userName.length < 2) {
        message.innerHTML = 'נדרש להזין שם משתמש</br> המכיל 2 תווים לפחות '
    } else if (password.length < 6) {
        message.innerHTML = 'בחר/י סיסמה המכילה 6</br> תווים לפחות'
    } else if (email.length == 0) {
        message.innerHTML = 'נדרש להזין כתובת מייל'
    } else if (phone.length !== 9 && phone.length !== 10) {
        message.innerHTML = 'מספר טלפון לא תקין'
    } else if (role == "דירוג") {
        message.innerHTML = 'בחר דירוג למשתמש'
    } else {

    //  console.log(id_user, name,userName,password, email, role  )
 
        fetch("/update" , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_user, name, userName, password, email, phone , role})
        })
            .then(res => res.json())
            .then(data => {
                if (data.message == 'ok') {
                message.innerHTML  = 'המשתמש עודכן במערכת'


                } else {
                    message.innerHTML = data.message
                }
                  
            }) 
    }
}

function addNewProduct() {

}
function getShelfList(){

    fetch('/get-Shelfs-list')
        .then(res =>
            res.json()
        )
        .then(data=>{
             setShelfList(data.data);
        })

}
function setShelfList (shelfs) {
     const shelfOptions = shelfs.map(shelf => `<option value='${shelf.UPS_Shelfs}'>${shelf.UPS_Shelfs}</option>`);
    this.shelfOptions = [...shelfOptions];
    //  this.shelfOptions = shelfOptions
    document.getElementById("UPS_Shelfs").innerHTML = shelfOptions.join(" ");
}

// const setShelfList= (shelfs) =>{
//     const shelfOptions = shelfs.map(shelf => `<option value='${shelf.UPS_Shelfs}'>${shelf.UPS_Shelfs}</option>`);
//     document.getElementById("UPS_Shelfs").innerHTML = shelfOptions.join(" ");
//     // document.getElementById("Location").innerHTML = shelfOptions.join(" ");
// }

async function addNewProduct(e){
    const message = document.querySelector("#message")
     e.preventDefault();

        let UPS = e.target[0].value;
        let Name = e.target[1].value;
        let price = e.target[2].value;
        let Amount = e.target[3].value;
        let Category = e.target[4].value;
        let Weight = e.target[5].value;
        let height = e.target[6].value;
        let ExpiryDate = e.target[7].value;
        let Location = e.target[8].value;

    
      let validations = await Validations(UPS, Name, price, Amount, Category, Weight, height, ExpiryDate, Location)
      
      if(validations == true){
      
            let getWeight =  await getCurrrentWeight(Location) 
            let checkCurrrentWeight =  CalcWeight(getWeight, Weight)
            let getHeight = await getCurrrentHeight(Location)
            let checkHeight =  CalcHeight(getHeight, height)
   
      if(checkHeight == false){
            message.innerHTML = 'גובה המדף אינו מתאים לגובה המוצר, יש לבחור מדף אחר'
      }
      else if(checkCurrrentWeight == false){
            message.innerHTML = 'המדף הנבחר מלא, יש לבחור מדף אחר'
      }
        else{
           fetch('/add_Products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({UPS, Name, price, Amount, Category, Weight, height, ExpiryDate, Location})
        }).then(res =>res.json())
            .then(data => {
                console.log(data)
              if (data.status == true) { 
                    message.innerHTML = "המוצר נוצר בהצלחה"

              /*       setTimeout(() => {
                        getListUsers()
                    }, 500);  */
 
                 } else {
                     message.innerHTML = 'המוצר אינו נוסף למערכת, נסה שנית'
                 }
})
        
        }
        
}
}

function getListProductByCategory() {
    distinctCategory=[];
     fetch('/get-category')
        .then(res =>
            res.json()
        )
        .then(data=>{
             data.data.forEach(element => {
                if (distinctCategory.indexOf(element.Category) == -1) {
                    distinctCategory.push(element.Category)
                }
            });
            distinctCategory.forEach(elm => {
                ProductsList.innerHTML += `<div onclick="PullThiscCategory(event)">${elm}</div>`
            })
        })
 }

function PullThiscCategory (e){
    const carbox = document.querySelector('.carbox')
const titlecategory = document.querySelector('.titlecategory')
    const eventCategory = event.target.innerText
    carbox.innerHTML = ''

    fetch('/PullThiscCategory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventCategory })
    }).then(res =>
        res.json()
    )
        .then(data => {

            console.log(data)
            data.data.forEach(elm => {
                carbox.innerHTML += `
                
                <div class="list"><b>UPS-מקט:</b></br></br>${elm.UPS}</div>
                <div class="list"><b>שם המוצר:</b></br></br>${elm.Name}</div>
              <div class="list"><b>תאריך תפוגה:</b></br></br>${elm.ExpiryDate}</div> 
            <div class="list"><b>מיקום:</b></br></br>${elm.Location}</div> 
            <div class="list" onclick="editProduct('${elm._id}')">    Edit</div>
            <div class="list" onclick="deleteProduct('${elm._id}')">    Delete</div>
            `
            })
        })
}

 const editProduct = (id) =>{

     letdistinctResult= []; 
     fetch('/get-details-product' + id,{
               method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res =>
            res.json()
        )
        .then(data => {
            console.log(data)
             document.getElementById('editProductById').innerHTML =
                   
                    `<h1>עריכת מוצר</h1>
                    <form onsubmit="handleEditProduct(event)">
                    
                 <div class="productDetails">
                     <label for="UPS">מק"ט:
                    <input type="number" name="UPS" id="UPS" value="${data.UPS}" disabled="disabled" autocomplete='off'></br>
                </label>
                <label for="Name">שם:
                    <input type="text" name="Name" id="Name" value="${data.Name}" autocomplete='off'></br>
                </label>
                <label for="price">מחיר:
                    <input type="text" name="price" id="price" value=${data.price} autocomplete='off'></br>
                </label>
                <label for="Amount">כמות:
                    <input type="number" name="Amount" id="Amount" value=${data.Amount} autocomplete='off'></br>
                </label>
                <label for="Category">קטגוריה:
                    <input type="text" name="Category" id="Category" value=${data.Category} autocomplete='off'></br>
                </label>
                <label for="Weight">משקל:
                    <input type="number" name="Weight" id="Weight" value=${data.Weight} autocomplete='off'></br>
                </label>
                 <label for="height">גובה:
                    <input type="number" name="height" id="height" value=${data.height} autocomplete='off'></br>
                </label>
                <label for="ExpiryDate">תאריך תפוגה:
                    <input type="date" name="ExpiryDate" id="ExpiryDate" value=${data.ExpiryDate} autocomplete='off'></br>
                </label>
            </div>
             <select name='Location' id='Location'</select></br>
            <div id="message"></div></br>
            <input type="submit" value="אישור">
        </form>`;
    // console.log(this.shelfOptions)
    document.getElementById("Location").innerHTML = this.shelfOptions.join(" ");

        }).catch(err => {
            console.error(err);
        }).finally(() => {
            console.log('im done')
        } )
     
} 

 
const getCurrrentWeight = async (UPS_Shelfs) =>{
    let check ;
    await fetch('/get-Details-Shelfs' + UPS_Shelfs, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data=>{
            check = data.MaximumWeight
            });
              return(check) 
}

 const getCurrrentHeight = async (UPS_Shelfs) =>{
    let check ;
    await fetch('/get-Details-Shelfs' + UPS_Shelfs, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data=>{
            check = data.height
            });
              return(check)
    
} 


   const CalcWeight =  (getWeight, weight) =>{
    if (Number(getWeight) > Number(weight)){
        return (true);
    }
    else {
        return (false)
    }
} 

   const CalcHeight = (getHeight, height) =>{
    if (Number(getHeight) > Number(height)){
        return (true);
    }
    else {
        return (false)
    }
} 

const Validations = (UPS, name, price, amount, category, weight, height, ExpiryDate, UPS_Shelfs, checkCurrrentWeight,checkHeight) =>{
    const message = document.querySelector("#message")
        if(UPS.length < 3){
            message.innerHTML = 'נדרש להזין מק"ט באורך 3 ומעלה'
        }
        else if(name.length == 0){
             message.innerHTML = 'יש להזין את שם המוצר'
        }
        else if(amount.length == 0){
            message.innerHTML = 'יש להזין את כמות המוצר'
        }
         else if(category.length == 0){
            message.innerHTML = 'יש להזין את קטגוריית המוצר'
        }
        else if(weight.length == 0){
            message.innerHTML = 'יש להזין את משקל המוצר'
        }
        else if(height.length == 0){
            message.innerHTML = 'יש להזין את גובה המוצר'
        }
        else if(UPS_Shelfs.length == 0){
            message.innerHTML = 'יש לבחור את המדף הרצוי למוצר'
        }
        else {
            return (true);
        }
}

 

const deleteProduct = (_id) =>{
    console.log(_id)
 fetch('/deleteProduct/' + _id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        
    }).then(res =>
        res.json()
    )
        
        .then(data => {
            getListProductByCategory()
        })
}


        


            


