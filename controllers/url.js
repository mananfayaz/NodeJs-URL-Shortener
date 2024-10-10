const shortid=require ("shortid");

const URL=require("../models/url");

const generateNewShortURL= async (req,res)=>{
    const body=req.body;
    if(!body.url) return res.status(400).json({error: "url is required"});
    const shortID= shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory:[],
        createdBy:req.user._id,
    })
    return res.render("home",{
        id:shortID,
    })
}

const homepage = (req,res)=>{
    const html="<h1> Welcome To Homepage</h1>";
    res.end(html);
};

async function getAnalytics (req,res) {
   const shortId=req.params.shortId;
   const result= await URL.findOne({shortId});
   return res.json({totalClicks:result.visitHistory.length,
    analytics: result.visitHistory,
   });

}



module.exports= {getAnalytics,generateNewShortURL,homepage};
