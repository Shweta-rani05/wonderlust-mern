const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");

// 🔍 SEARCH ROUTE
router.get("/", async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim() === "") {
            req.flash("error", "Please enter something to search");
            return res.redirect("/listings");
        }

        // Search logic (case-insensitive)
        const results = await Listing.find({
            $or: [
                { title: { $regex: q, $options: "i" } },
                { location: { $regex: q, $options: "i" } },
                { country: { $regex: q, $options: "i" } }
            ]
        });

        // Render results page
        res.render("listings/index", { allListings: results });

    } catch (err) {
        console.error(err);
        req.flash("error", "Search failed");
        res.redirect("/listings");
    }
});

module.exports = router;