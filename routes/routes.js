const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");
const{isLogedIn}=require("../midd");
const { validateReview } = require("../middleware");
const reviewController=require("../controllers/riviews")

//Reviews 
router.post("/",isLogedIn, validateReview,reviewController.createReview);

//delete review
  router.delete("/:reviewId",isLogedIn,reviewController.destroyReview );
  
    module.exports = router;

  
  