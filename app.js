if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
};

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");


const User = require("./models/user.js");

const listingRouter= require("./routes/listing.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");
const searchRouter = require("./routes/search.js"); //search

const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch(err => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(dbUrl);
}

//views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//to connect public folder (style.css)
app.use(express.static(path.join(__dirname, "/public")));


//session store 
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret: process.env.SECRET || "fallbacksecret",       
    },
    touchAfter:24*3600,
    ttl: 7 * 24 * 60 * 60,
});

store.on("error",(err)=>{
    console.log("ERROR IN MONGO SESSION STORE",err);
});

const sessionOptions = {
    store,
    secret:  process.env.SECRET || "fallbackecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,//present date to 7 days 
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,//for cross-scripting attacks in browser (security)
    },
};



app.use(session(sessionOptions));//session add with website 
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // store information related to user
passport.deserializeUser(User.deserializeUser());//remove session related infortaion of the user.


app.use((req, res, next) => {
    res.locals.success = req.flash("success") || [];
    res.locals.error = req.flash("error") || [];
    res.locals.currUser = req.user ||null ;
    res.locals.mapToken = process.env.MAP_TOKEN;
    next();
});


app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter)
app.use("/", userRouter);

app.use("/search", searchRouter);//search route 

app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "PAGE NOT FOUND!"));
});

//middleware
app.use((err, req, res, next) => {
    console.log("ERROR:", err);

    const { statusCode = 500 } = err;
    let { message } = err;

    if (!message || message.trim() === "") {
        message = "Something went wrong";
    }

    // ✅ Prevent headers error
    if (res.headersSent) {
        return next(err);
    }

    res.status(statusCode).render("error.ejs", { message });
});

// app.listen 
app.listen(8080, () => {
    console.log("server is listening to port 8080");
});

