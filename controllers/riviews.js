const Listing = require("../models/listing");
const Review = require("../models/Review");

module.exports.createReview=async (req, res) => {
    console.log("Form data:", req.body); 
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Listing Review");
    res.redirect(`/listings/${listing._id}`);
    
  }

  module.exports.destroyReview=async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId); 
    req.flash("success", "Review Deleted !");
    res.redirect(`/listings/${id}`);
  }