const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const { isLoggedIn,isReviewAuthor,validateReview } = require("../middleware.js");
const reviewController=require("../controllers/reviews.js");

//Reviews Post route
router.post("/",validateReview,isLoggedIn,wrapAsync(reviewController.createReview))

//Reviews Delete Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.DeleteReview));

module.exports=router;