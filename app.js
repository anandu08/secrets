//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser")
const ejs=require("ejs")
const mongoose = require('mongoose');

// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true});
const userSchema={
    email: String,
    password: String
};
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

app.route('/register')
.get(function(req,res){




        res.render("register");
})
.post((req,res)=>{
let newUser=new User({
    email:req.body.username,
    password:req.body.password
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