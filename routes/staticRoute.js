const express= require("express");
const router=express.Router();
const URL = require("../models/url");



router.get("/",async (req,res)=>{
  if(!req.user) return res.redirect("/login");
    const allUrls = await URL.find({createdBy:req.user._id});
    res.render("home",{
      urls: allUrls,
        //passing values to html from our server
    });    //render the view from ejs
})

router.get("/signup",(req,res)=>{
    return res.render("signup");
})

router.get("/login",(req,res)=>{
  res.render("login");
})


module.exports=router;
