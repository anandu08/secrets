//jshint esversion:6
require('dotenv').config()
const express=require("express");
const bodyParser=require("body-parser")
const ejs=require("ejs")
const mongoose = require('mongoose');
const md5=require("md5");



// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true});
const userSchema=new mongoose.Schema({
    email: String,
    password: String
});


const User= new mongoose.model('user',userSchema);
const app=express();
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
res.render("home");
});
app.get("/login",function(req,res){
    res.render("login");
});
app.post("/login",function(req,res){
const username=req.body.username;
const password=md5(req.body.password);
User.findOne({email: username}).then((found) => {
    if (found===null)
        res.render("login");
    else if(found.password===password)
        res.render("secrets");
});


})
app.route('/register')
.get(function(req,res){




        res.render("register");
})
.post((req,res)=>{
let newUser=new User({
    email:req.body.username,
    password:md5(req.body.password)
});
newUser.save().then((doc)=>{
    if(doc!=newUser)
    console.log("SOrry error");
    else
    res.render("secrets");
});


})







app.listen(3000,function(){

    console.log("Server started at port 3000");
})