const express= require("express")
const router = express.Router();
const { validateReview } = require("../middleware"); 
const Listing = require("../models/listing");
const{isLogedIn}=require("../midd");
const { Cursor } = require("mongoose");
const listingController = require('../controllers/listing');
const multer =require("multer");
const { wrap } = require("module");
const wrapasync = require("../utils/wrapAsync");
const {storage}=require("../cloudeConfig")
const upload =multer({storage })

// INDEX ROUTE
router
    .route("/")
   .get(wrapasync(listingController.index))
   .post(
    isLogedIn,
    upload.single("listing[image]"),
    // validateListing,
      wrapasync(listingController.createListing)
   )

  router.get("/new", isLogedIn,listingController.renderNewFrom);
    
  //show route
  router.get("/:id", listingController.showListing );

  //create route
    router.post("/",isLogedIn, listingController.createListing)
    
  //Edit route
  router.get("/:id/edit", isLogedIn,listingController.editListing);
    
  //update route
  router.put("/:id", 
    isLogedIn,
    upload.single("listing[image]"),
    listingController.updateListing);
  
    //delete route
  router.delete("/:id",isLogedIn,listingController.destroyListing );
  
    module.exports = router;
