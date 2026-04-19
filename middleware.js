const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");

module.exports.isLoggedIn = (req,res,next)=>{
    // console.log(req.user); //to check the login user detail
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged-in to create listing");
        return  res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl) {
       res.locals.redirectUrl = req.session.redirectUrl ;
    }
    next(); 
};

module.exports.isOwner = async (req,res,next)=>{
    let {id}=req.params;
       let listing = await Listing.findById(id);
       if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing ");
        return res.redirect(`/listings/${id}`);
       }
       next();
}

module.exports.validateListing =(req,res,next)=>{
     let {error} = listingSchema.validate(req.body);
     if(error){
        console.log("Validation Error:", error.details);//added line 
        let errMsg = error.details.map((el) => el.message).join(",");

     if (!errMsg) {
        errMsg = "Invalid listing data"; // ✅ fallback message
    }

throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};


module.exports.validateReview =(req,res,next)=>{
     let {error} = reviewSchema.validate(req.body);
     if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");//for additional details print 
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};



module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;

    let review = await Review.findById(reviewId);

    // ✅ IMPORTANT: handle null
    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect(`/listings/${id}`);
    }

    // ✅ ownership check
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }

    next();
};
