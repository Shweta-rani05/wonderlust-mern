const User = require("../models/user");

//signup form
module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs", { role: req.query.role || 'user' });
};
module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;

        const newUser = new User({ email, username, role: role || 'user' });
        const registeredUser = await User.register(newUser, password);

        console.log(registeredUser);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err); // ✅ IMPORTANT
            }

            req.flash("success", "Welcome To Wonderlust !!");
            res.redirect("/listings");
        });

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};



//login form 
module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs", { role: req.query.role || 'user' });
};

//login
module.exports.login = async(req,res)=>{ 
    try{
     req.flash("success","Welcome to Wonderlust. You are logged In !! ");
     let redirectUrl = res.locals.redirectUrl || "/listings";
     res.redirect(redirectUrl);

}catch (err) {
        req.flash("error", "Login failed!");
        res.redirect("/login");
    }
};


//logout
module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out !");
        res.redirect("/listings");
    });
};

module.exports.ownerDashboard = async (req, res) => {
    const Listing = require("../models/listing");
    const allListings = await Listing.find({ owner: req.user._id });
    res.render("listings/index.ejs", { allListings, pageTitle: "My Listings" });
};

