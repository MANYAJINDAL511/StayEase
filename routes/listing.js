const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js")
const listingController=require("../controllers/listings.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js")
const upload=multer({storage});

router.route("/")
.get(wrapAsync(listingController.index))
.post(upload.single("listing[image][url]"),validateListing, wrapAsync(listingController.newListing));


router.get("/search", wrapAsync(listingController.search));


router.get("/new",isLoggedIn,listingController.newRenderForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image][url]"),
    validateListing,wrapAsync(listingController.EditSuccess))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.DestroyListing));

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editRenderForm));

module.exports=router;