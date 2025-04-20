const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const UserController=require("../controllers/users.js");

router.route("/signup")
.get(UserController.signup)
.post(wrapAsync(UserController.signupAuthenticate));

router.route("/login")
.get(UserController.login)
.post(saveRedirectUrl,
    passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
    UserController.userAuthenticate
);

router.get("/logout",UserController.logout);

module.exports=router;