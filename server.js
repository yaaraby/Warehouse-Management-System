const express = require('express')
const app = express(); ///server;
const bodyParser = require('body-parser');





app.use(bodyParser.json()) 


app.use(express.static('public'))




const port = process.env.PORT || 3000;
app.listen(port, ()=>{console.log(`listen ${port}`)})