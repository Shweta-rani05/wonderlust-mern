const express =require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const{isLoggedIn, isOwner,validateListing} =require("../middleware.js");


//Index route 
router.get("/",wrapAsync(async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
}));

//new route 
router.get("/new" ,isLoggedIn,(req,res)=>{
   res.render("listings/new.ejs");
});

//show route 
router.get("/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner");//for all information of review - populate call 
    if(!listing){
        req.flash("error","listing you requested doesnot exist !");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("./listings/show.ejs",{listing});
}));


//Create route 
router.post(
    "/",isLoggedIn,
    validateListing,
    wrapAsync(async(req,res,next)=>{
        const newListing = new Listing({
    ...req.body.listing,
    image: {
        url: req.body.listing.image || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        filename: "listingimage"
    }
    });
        newListing.owner =req.user._id;
         await newListing.save();
         req.flash("success","New Listing Created");
        res.redirect("/listings"); 
    })
);

//edit route 
router.get("/:id/edit" ,isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
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
    isLoggedIn,
    isOwner,
    validateListing, 
    wrapAsync(async(req,res)=>{
       let{id} = req.params;

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
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let deletedListings = await Listing.findByIdAndDelete(id);
    console.log(deletedListings);
    req.flash("success","listing deleted");
    res.redirect("/listings");

    }
));

module.exports = router;