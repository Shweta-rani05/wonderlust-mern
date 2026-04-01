const express =require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview} = require("../middleware.js");


//review route 
  //post route of reviews 
router.post("/",validateReview,//for middleware 
    wrapAsync( async(req,res)=>{//for error handling 
     let listing = await Listing.findById(req.params.id);
     let newReview =new Review(req.body.review);

     listing.reviews.push(newReview);

     await newReview.save();
     await listing.save();
     req.flash("success","New review Created!");

     res.redirect(`/listings/${listing._id}`);

}));

//delete review route
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    // Remove review reference from listing
    await Listing.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId }
    });

    // Delete review from DB
    await Review.findByIdAndDelete(reviewId);
     req.flash("success","Review Deleted !");
    // Redirect back
    res.redirect(`/listings/${id}`);
}));

module.exports = router;


