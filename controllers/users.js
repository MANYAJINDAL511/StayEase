const User=require("../models/user");

module.exports.signup=(req,res)=>{
    res.render("user/signup.ejs");
}

module.exports.signupAuthenticate=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        const regUser=await User.register(newUser,password);
        req.login(regUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to StayEase");
            res.redirect("/listings");
        })
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    } 
}

module.exports.login=(req,res)=>{
    res.render("user/login.ejs");
}

module.exports.userAuthenticate=async(req,res)=>{
    req.flash("success","Welcome back to StayEase!");
    let redirectUrl=res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are successfully loged out!");
        res.redirect("/listings");
    })
}