const {getUser} = require('../service/auth')


async function restrictToLoggedInUserOnly(req,res,next){
    // console.log("restrictToLoggedInUserOnly middleware running"); 

    const userUid=req.cookies?.uid; //this uid we had sent to the browser when we successfully logged in

    if(!userUid)
         return res.redirect('/login');   // tere paas uid hi nahi hai

    const user=getUser(userUid);


    if(!user) return res.redirect("/login");  //tere paas uid hai magar tu user nahi hai

    req.user=user;  //wrap the user object in req and send it to next

    next();


}

async function checkAuth(req,res,next) {

    const userUid=req.cookies?.uid; //this uid we had sent to the browser when we successfully logged in

   

    const user=getUser(userUid);


    req.user=user;  //wrap the user object in req and send it to next

   

    next();

    
}


module.exports={
    restrictToLoggedInUserOnly,
    checkAuth,
};