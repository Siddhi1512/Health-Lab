const express= require ("express");
const ejs=require("ejs");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
const app=express();

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/detailsdb",{useNewurlParser:true});

const dataSchema=new mongoose.Schema({
    name:String,
    email:String,
    date:String,
    time:String,
    department:String
    
});

const Data=mongoose.model("Data",dataSchema);

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/" ,function(req,res){
    res.render("index");
});

app.get("/appointment",function(req,res){  
    res.render("appointment");
});

app.get("/services",function(req,res){
    res.render("services");

});

app.get("/doctors",function(req,res){
    res.render("doctors");
});

app.get("/gallery",function(req,res){
    res.render("gallery");
});

app.get("/contact",function(req,res){
    res.render("contact");
});

app.get("/success",function(req,res){
    res.render("success");
});

app.post("/appointment",function(req,res){
    const newData=new Data({
        name:req.body.name,       
        email:req.body.email,
        date:req.body.date,
        time:req.body.time,
        department:req.body.appointmentfor

    })
    newData.save(function(err){
        if(!err){
            res.redirect("/success");
        }else{
            console.log(err);
        }
    });
})

app.listen(3000,function(req,res){
    console.log("Server started");
})