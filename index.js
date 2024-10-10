const express=require("express");
const app=express();
const {connectMongoDB}=require("./connection");
const URL=require("./models/url");
const PORT=8001;
const path=require('path');
const cookieParser=require('cookie-parser');
const {restrictToLoggedInUserOnly,checkAuth}=require('./middlewares/auth');
const userRouter=require("./routes/user");
const urlRouter = require("./routes/url");           ///routers
const staticRoute=require("./routes/staticRoute");

connectMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=>{console.log("connected to MONGO DB") });



// app.set("view engine","ejs");  //set ejs as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());   // to parse json request body
app.use(express.urlencoded({extended: false})); //to parse from request body 
app.use(cookieParser());  //for parsing cookies



app.use('/url',restrictToLoggedInUserOnly,urlRouter); //if you want to access /url you have to go through middleware which we created
app.use("/user",userRouter);
app.use("/",checkAuth,staticRoute);


app.get("/:shortId",async (req,res)=>{
  const shortId=req.params.shortId;
  if(!shortId) res.status(400).send("bad request");
  const entry= await URL.findOneAndUpdate({shortId},{$push: {     //push add new item to object
     visitHistory:{timestamp:Date.now(),}
  }});
  if(!entry){
     return res.status(404).send("not found");
  }
  res.redirect(entry.redirectURL);  //redirect to url stored in database

})

app.listen(PORT, ()=>{
    console.log(`Server started at  ${PORT}`);
})