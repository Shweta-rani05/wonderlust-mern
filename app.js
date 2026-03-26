const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

main()
.then(()=>{
    console.log("connected to DB");
})
.catch(err =>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine" , "ejs");
app.set("views",path.join(__dirname ,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);
//to connect public folder (style.css)
app.use(express.static(path.join(__dirname,"/public")));

// //root route
// app.get("/" ,(req,res) => {
//     res.send("Hi ,I am root");
// });

app.get("/", (req, res) => {
  res.render("home.ejs");
});



//Index route 
app.get("/listings",wrapAsync(async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
}));

//new route 
app.get("/listings/new" ,(req,res)=>{
   res.render("listings/new.ejs");
});

const validateListing =(req,res,next)=>{
     let {error} = listingSchema.validate(req.body);
     if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");//for additional details print 
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

const validateReview =(req,res,next)=>{
     let {error} = reviewSchema.validate(req.body);
     if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");//for additional details print 
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

//Create route 
app.post(
    "/listings",
    validateListing,
    wrapAsync(async(req,res,next)=>{
        const newListing = new Listing(req.body.listing) ;
         await newListing.save();
        res.redirect("/listings"); 
    })
);

//edit route 
app.get("/listings/:id/edit" ,wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing =  await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//update Route 
app.put(
    "/listings/:id",
    validateListing, 
    wrapAsync(async(req,res)=>{
       let {id}=req.params;
       await Listing.findByIdAndUpdate(id,{...req.body.listing});
       res.redirect(`/listings/${id}`);
    })
);

//show route 
app.get("/listings/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");//for all information of review - populate call 
    res.render("./listings/show.ejs",{listing});
}));


//Delete route
app.delete("/listings/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let deletedListings = await Listing.findByIdAndDelete(id);
    console.log(deletedListings);
    res.redirect("/listings");

}));

//review route 
  //post route of reviews 
app.post("/listings/:id/reviews",validateReview,//for middleware 
    wrapAsync( async(req,res)=>{//for error handling 
     let listing = await Listing.findById(req.params.id);
     let newReview =new Review(req.body.review);

     listing.reviews.push(newReview);

     await newReview.save();
     await listing.save();

     res.redirect(`/listings/${listing._id}`);

}));

//delete review route
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    // Remove review reference from listing
    await Listing.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId }
    });

    // Delete review from DB
    await Review.findByIdAndDelete(reviewId);

    // Redirect back
    res.redirect(`/listings/${id}`);
}));


app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "PAGE NOT FOUND!"));
});

//middleware
app.use((err,req,res,next)=>{
    let{statusCode=500 , message="Something went wrong" }= err;
    res.status(statusCode).render("error.ejs", {message});
    // res.status(statusCode).send(message);
});


// app.listen 
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});

