const express= require("express");
const {generateNewShortURL,getAnalytics}= require("../controllers/url");


const router=express.Router();


router.post("/",generateNewShortURL);

// router.get("/:shortid",renderShortURL);

router.get("/analytics/:shortId",getAnalytics);

router.get("/manan",(req,res)=>{
    console.log("whatsup");
});


module.exports= router;
