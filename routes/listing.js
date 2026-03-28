const express =require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");


const validateListing =(req,res,next)=>{
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

//Index route 
router.get("/",wrapAsync(async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
}));

//new route 
router.get("/new" ,(req,res)=>{
   res.render("listings/new.ejs");
});

//show route 
router.get("/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");//for all information of review - populate call 
    if(!listing){
        req.flash("error","listing you requested doesnot exist !");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs",{listing});
}));


//Create route 
router.post(
    "/",
    validateListing,
    wrapAsync(async(req,res,next)=>{
        const newListing = new Listing({
    ...req.body.listing,
    image: {
        url: req.body.listing.image || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        filename: "listingimage"
    }
    });
         await newListing.save();
         req.flash("success","New Listing Created");
        res.redirect("/listings"); 
    })
);

//edit route 
router.get("/:id/edit" ,wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing =  await Listing.findById(id);
    // console.log("IMAGE DATA:", listing.image); // ✅ ADD HERE

    if(!listing){
        req.flash("error","listing you requested doesnot exist");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
}));

//update Route 
router.put(
    "/:id",
    validateListing, 
    wrapAsync(async(req,res)=>{
       let {id}=req.params;
       await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
    image: {
        url: req.body.listing.image,
        filename: "listingimage"||"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",filename: "listingimage"
    }
    });
       req.flash("success","Listing Updated");
       res.redirect(`/listings/${id}`);
    })
);




//Delete route
router.delete("/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let deletedListings = await Listing.findByIdAndDelete(id);
    console.log(deletedListings);
    req.flash("success","listing deleted");
    res.redirect("/listings");

}));

module.exports = router;