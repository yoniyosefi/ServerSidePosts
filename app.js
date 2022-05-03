const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app= express();

mongoose.connect("mongodb+srv://yoniy:Yy123456@cluster0.pecwe.mongodb.net/mearn?retryWrites=true&w=majority")
    .then(()=>{
        console.log("Connected to database!");
    }).catch(error=>{
        console.log(error);
    })

app.use(bodyParser.json());
app.use("/assets/images",express.static(path.join("assets/images")))

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods",
    "GET,POST,DELETE,PATCH,PUT,OPTIONS")
    next();
})

app.use('/api/posts',postsRoutes);
app.use('/api/user',userRoutes);
module.exports = app;

