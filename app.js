const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

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

//root route
app.get("/" ,(req,res) => {
    res.send("Hi ,I am root");
});


//Index route 
app.get("/listings",async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
});

//new route 
app.get("/listings/new" ,(req,res)=>{
   res.render("listings/new.ejs");
});

//Create route 
app.post(
    "/listings",
    wrapAsync(async(req,res,next)=>{
         const newListing = new Listing(req.body.listing) ;
         await newListing.save();
        res.redirect("/listings"); 
    })
);

// //edit route 
// app.get("/listings/:id/edit" ,async (req,res)=>{
//     let {id} = req.params;
//     const listing =  await Listing.findById(id);
//     res.render("listings/edit.ejs",{listing});
// });

//update Route 
app.put("/listings/:id", async(req,res)=>{
    const {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});

// EDIT route ✅ (FIRST)
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

// SHOW route ✅ (AFTER)
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs", { listing });
});


// //show route 
// app.get("/listings/:id",async (req,res)=>{
//     let {id} = req.params;
//     const listing = await Listing.findById(id);
//     res.render("./listings/show.ejs",{listing});
// });


//Delete route
app.delete("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let deletedListings = await Listing.findByIdAndDelete(id);
    console.log(deletedListings);
    res.redirect("/listings");

});

// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404 , "PAGE NOT FOUND !"));
// });

//middleware
app.use((err,req,res,next)=>{
    let{statusCode , message }= err;
    res.send("something went wrong !");
})


// app.listen 
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});

