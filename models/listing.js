const { defaults } = require("figlet");
const mongoose = require("mongoose");
const Review = require("./Review.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url:String,
    filename:String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
   owner:{  
    type:Schema.Types.ObjectId,
    ref:"User"
   }
  });

listingSchema.post("findOneAndDelete",async(Listing)=>{
if(Listing){
await Review.deleteMany({_id:{$in:Listing.reviews}});

}
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
