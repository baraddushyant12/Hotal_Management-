const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,    },
  comment: {
    type: String,
    required: true,
  }
});


module.exports = mongoose.models.Review || mongoose.model("Review", reviewSchema);
