const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


//createReview 
module.exports.createReview  = async(req,res)=>{//for error handling 
     let listing = await Listing.findById(req.params.id);
     let newReview =new Review(req.body.review);
     newReview.author = req.user._id;
     listing.reviews.push(newReview);
     await newReview.save();
     await listing.save();
     req.flash("success","New review Created!");

     res.redirect(`/listings/${listing._id}`);

};

module.exports.destroyReview = async (req, res) => {
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
};
