const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const userRoutes = require("./classroom/routes/user.js");
app.use("/users", userRoutes);
const User = require("./models/user.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch(err => {
        console.log(err);
    });
async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
//to connect public folder (style.css)
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
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
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");

    next();
})



app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "PAGE NOT FOUND!"));
});

//middleware
app.use((err, req, res, next) => {
    console.log("ERROR MESSAGE:", err.message);
    let { statusCode = 500, message } = err;

    if (!message || message.trim() === "") {
        message = "Something went wrong"; // ✅ FORCE fallback
    }

    console.log("ERROR MESSAGE:", message);

    res.status(statusCode).render("error.ejs", { message });
});

app.get("/demouser", async (req, res) => {
    let fakeUser = new User({
        email: "student@gmail.com",
        username: "delta-student",
    });
    let registeredUser = await User.register(fakeUser, "helloworld");//automatically check for unique user
    res.send(registeredUser);
});


// app.listen 
app.listen(8080, () => {
    console.log("server is listening to port 8080");
});

