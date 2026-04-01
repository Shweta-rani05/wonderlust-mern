const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {  //index 
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
}

module.exports.renderNewForm = (req, res) => { //new
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => { //show
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author"
        },
    }).populate("owner");//for all information of review - populate call 
    if (!listing) {
        req.flash("error", "listing you requested doesnot exist !");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("./listings/show.ejs", { listing });
};


module.exports.createlisting = async (req, res, next) => { //create
    const newListing = new Listing({
        ...req.body.listing,
        image: {
            url: req.body.listing.image || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
            filename: "listingimage"
        }
    });
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => { //edit 
    let { id } = req.params;
    const listing = await Listing.findById(id);
    // console.log("IMAGE DATA:", listing.image); // ✅ ADD HERE

    if (!listing) {
        req.flash("error", "listing you requested doesnot exist");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => { //update 
    let { id } = req.params;

    await Listing.findByIdAndUpdate(id, {
        ...req.body.listing,
        image: {
            url: req.body.listing.image,
            filename: "listingimage" || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85", filename: "listingimage"
        }
    });
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};


module.exports.destroyListing = async (req, res) => { //delete or destroy 
    let { id } = req.params;
    let deletedListings = await Listing.findByIdAndDelete(id);
    console.log(deletedListings);
    req.flash("success", "listing deleted");
    res.redirect("/listings");

};



