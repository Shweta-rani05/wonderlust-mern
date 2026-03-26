const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://www.istockphoto.com/photo/city-skyline-and-buildings-with-empty-asphalt-road-at-sunrise-gm1091165998-292719054",
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews : [
    {
    type: Schema.Types.ObjectId,
    ref:"Review",
     }
  ],
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({id:{$in:listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
