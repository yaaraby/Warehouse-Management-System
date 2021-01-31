const inputSearch = document.querySelector("#inputSearch")
const Search = document.querySelector('.Search')
const cardboxcatygory = document.querySelector('.cardboxcatygory')
const cardCategory = document.querySelector('.cardCategory')
const carbox = document.querySelector('.carbox')
const titlecategory = document.querySelector('.titlecategory')
const ShowAll = document.querySelector('.ShowAll')
const message = document.querySelector("#message")
const AddShelf = document.querySelector('.AddShelf')
const textmessage = document.querySelector('.textmessage')
const Searchtml = document.querySelector('.Searchtml')
const outcome = document.querySelector('.outcome')
const cardtext = document.querySelector('.cardtext')
const menu = document.querySelector(".menu")
const menubutoon = document.querySelector(".menubutoon")
const ShelfList = document.getElementById('ShelfList');
const editUserById = document.querySelector("#editUserById")
const firstRow = document.querySelector('#firstRow')
const lastRow = document.querySelector('#lastRow')
const numberOfAreas = document.querySelector('#numberOfAreas')
const numberOfShelfs = document.querySelector('#numberOfShelfs')


testcoocik()
function testcoocik() {
    fetch('/Cookie-test')
        .then(r => r.json())
        .then(data => {
            if (data.validated !== true) {
                window.location.replace('/login/login.html')
            }
        })
}

function Output() {
    window.location.replace('/login/login.html')
    fetch('/Output')
}



function functionSearch() {

    if (inputSearch.placeholder == 'בחר סוג חיפוש') {
        textmessage.innerHTML = 'הזן סוג חיפוש'
    }else {
        const placeholder = inputSearch.placeholder
        const inputvalue = inputSearch.value

        if (inputvalue.length == 0) {
            textmessage.innerHTML = 'הזן מידע לחיפוש'
        }
        else {
            textmessage.innerHTML = '<img src="/img/gif.gif">'

            fetch('/Searchdeta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ placeholder, inputvalue })
            }).then(res =>
                res.json()
            )
                .then(data => {
                    Searchtml.innerHTML = ""

                    if (data.message !== undefined) {
                        textmessage.innerHTML = data.message
                    }
                    if (data.data) {
                        textmessage.innerHTML = placeholder
                        data.data.forEach(elm => {
                            Searchtml.innerHTML += `<div class="cardlist" onclick="PullInformation('${elm.UPS}')">
                    <div class="list"><b>UPS-מקט:</b></br></br>${elm.UPS}</div>
                    <div class="list"><b>שם המוצר:</b></br></br>${elm.Name}</div>
                    <div class="list"><b>תאריך תפוגה:</b></br></br>${elm.ExpiryDate}</div>
                    <div class="list"><b>מיקום:</b></br></br>${elm.Location}</div>
                </div>`
                        })
                    }
                })
        }
    }
}
function PullInformation(e) {
    fetch('/PullInformation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ e })
    }).then(res =>
        res.json()
    )
        .then(data => {
            outcome.style.display = 'flex'

            console.log(data)
            cardtext.innerHTML =
                `<div class="text"><b>שם מוצר:</b>${data.data[0].Name}</div>
            <div class="text"><b>תאריך תפוגה:</b>${data.data[0].ExpiryDate}</div>
            <div class="text"><b>קטגוריה:</b>${data.data[0].Category}</div>
            <div class="text"><b>UPS-מקט:</b>${data.data[0].UPS}</div>
            <div class="text"><b>משקל:</b>${data.data[0].Weight}</div>
            <div class="text"><b>מחיר:</b>${data.data[0].price}</div>
            <div class="text"><b>מיקום:</b>${data.data[0].Location}</div>`
        })
}

function valueselect(event) {
    inputSearch.placeholder = event.target.value
    textmessage.innerHTML = inputSearch.placeholder
}


function getCategory() {
    menubutoondisplayblock()
    let aryycategory = []
    editUserById.style.display = "none"
    Search.style.display = 'none'
    ShowAll.style.display = 'none'
    AddShelf.style.display = 'none'
    ShelfList.style.display = 'none'
    cardCategory.style.display = 'block'
    cardboxcatygory.innerHTML = ''
    fetch('/get-category')
        .then(res =>
            res.json()
        )
        .then(data => {
            data.data.forEach(element => {
                if (aryycategory.indexOf(element.Category) == -1) {
                    aryycategory.push(element.Category)
                }
            });
            aryycategory.forEach(elm => {
                cardboxcatygory.innerHTML += `<div class="A_line_in_a_category" onclick="PullThiscCategory(event)">${elm}</div>`
            })
        })
}


function PullThiscCategory(event) {
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
            cardCategory.style.display = 'none'
            ShowAll.style.display = 'block'
            console.log(data)
            titlecategory.innerHTML = eventCategory
            data.data.forEach(elm => {
                carbox.innerHTML += `<div class="cardlist" onclick="PullInformation('${elm.UPS}')">
                <div class="list"><b>UPS-מקט:</b></br></br>${elm.UPS}</div>
                <div class="list"><b>שם המוצר:</b></br></br>${elm.Name}</div>
            <div class="list"><b>תאריך תפוגה:</b></br></br>${elm.ExpiryDate}</div> 
            <div class="list"><b>מיקום:</b></br></br>${elm.Location}</div> 
        </div>`
            })
        })
}



function handleAddShelf(e){
    e.preventDefault();
        
    let tempTotalRowNumber=lastRow.value-firstRow.value;
    const letters=['A','B','C','D','E','F','G','H','I','K']
    let tempNewRows=[]

    console.log(firstRow.value,lastRow.value,numberOfAreas.value,numberOfShelfs.value);
    for(i=1;i<=tempTotalRowNumber+1;i++){
        
        for(j=1;j<=numberOfAreas.value;j++)
        {
           for(k=1;k<=numberOfShelfs.value;k++){

                console.log(`${i}${letters[j-1]}${k}`)
                tempNewRows.push({
                    Line: i,
                    Area: `${letters[j-1]}`,
                    Floor: k,
                    UPS_Shelfs: `${i}-${letters[j-1]}-${k}`,
                    // NumberOfProductsonShelf:Number,
                    // MaximumWeight: Number,
                    // CurrentWeight: Number,
                    // height: Number
                })

                // Object.assign(tempNewRows, {row:`${i}${letters[j-1]}${k}`});
            }
        }
    }

    console.log(JSON.stringify(tempNewRows))


    fetch("/shelf-creation", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tempNewRows)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data.data)
            if (data== false) {
                console.log(data)
                

            } else {
                message.innerHTML = data.message
            }
        })
        
        AddShelf.style.display='none'
    
}

function addShelfDisplayNone(){

AddShelf.style.display='none'
}

function shelfObservation() {
    fetch('/pull-Shelf')
        .then(res =>
            res.json()
        )
        .then(data => {
            if (data.data != null) {
                outcome.style.display = 'none'
                Search.style.display = 'none'
                ShowAll.style.display = 'none'
                cardCategory.style.display = 'none'
                editUserById.style.display = "none"
                AddShelf.style.display = 'none'
                ShelfList.style.display = 'block'
                allShelfs(data.data)
            }

        })
}
function shelfObservationDisplayNone(){
    ShelfList.style.display='none'


}

function allShelfs(data) {
    menubutoondisplayblock()
    document.getElementById('ShelfList').innerHTML =
        `<img src="/img/delete.png" class="displaynone" onclick="shelfObservationDisplayNone()">
        <div class="col-sm-4">
        <button class="addNewShelf" onclick="addNewShelf()"><img src="/img/+.png"></button>
        </div>
<table>
<thead>
    <tr>
        <th></th>
        <th>מספר מדף</th>
        <th>כמות מוצרים</th>
        <th>משקל מדף</th>
        <th>משקל מקסימלי</th>
    </tr>
</thead>
    <tbody>
    
        ${data.map(elm =>
            `<tr>
        <td class="flexdeleteuser">
        <a action="Edit" class="editshelf" onclick='editShelf("${elm._id}")'><img src="/img/edit-button.png"></a>
        <a action="Delete" class="deleteShelf" onclick='deleteShelf("${elm._id}")'><img src="/img/deleteuser.png"></a>
        </td>
                <td class="rtl">${elm.UPS_Shelfs}</td>
                <td>${elm.NumberOfProductsonShelf}</td>
                <td>${elm.MaximumWeight}</td> 
                <td>${elm.CurrentWeight}</td> 
                
        </tr>

`).join('')}
</table>`;
}


function displayblockmenu(event) {
    menu.style.right = '0'
}

function menubutoondisplayblock() {
    menu.style.right = '-220px'
}


inputSearch.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        functionSearch()
    }
})

function deletesearch() {
    cardCategory.style.display = 'none'
    Search.style.display = 'none'
    outcome.style.display = 'none'
}


function Searchdisplayblock() {
    menubutoondisplayblock()
    Search.style.display = 'block'
    editUserById.style.display = "none"
    cardCategory.style.display = 'none'
    ShowAll.style.display = 'none'
    AddShelf.style.display = 'none'
    ShelfList.style.display = 'none'
    inputSearch.focus()
}



function addNewShelf() {
    menubutoondisplayblock()
    ShelfList.style.display='none'
    AddShelf.style.display='block'

}

function addShelflist(){
    AddShelf.style.display='none'
    ShelfList.style.display='block'
}