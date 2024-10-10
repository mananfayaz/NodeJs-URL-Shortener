const User=require("../models/users");
const {v4: uuidv4}= require('uuid');
const {getUser,setUser}=require("../service/auth");

async function handleUserSignup(req,res) {
    const name =req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}

async function handleUserLogin(req,res) {
    const email=req.body.email;
    const password=req.body.password;
    const user=await User.findOne({email,password});
    if(!user) return res.render('login',{
        error: "Invalid username or password"
});

    // const sessionId=uuidv4();   //generate sessionId
    const token=setUser(user);    //allocate sessionId to user(map)
    // res.cookie('uid', sessionId);   // send it to user with name 'uid'
    res.cookie('uid',token);
    return res.redirect("/");   //render to app on success

}


module.exports={handleUserSignup,handleUserLogin};