//The backend of our code.. 
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt")

//Our backend application
app = express();

//Allow cross origin requests
app.use(cors(
    {
        origin:"'http://localhost:3000",
        methods: ['GET','POST'],
        credentials:true

    }))

//Middleware ot parse URL encoded data
app.use(express.urlencoded({extended:true}));
app.use(express.json());



//POST
app.post('/signincheck',function(req,res)
{
    console.log(req.body);
    res.send(("Recieved your request:: username:"+req.body["uname"]+" password "+req.body["pass"]));
})


app.listen(5000)



