const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");

//Index Route
router.get("/", (req, res) => {
    // GET all campgrounds from database
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds, currentUser: req.user });
        }
    })
});


// CREATE - Add a new campground to db
router.post("/", (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    const newCampground = { name: name, image: image, description: description, author: author };
    //Create a new campground and save to DB
    // campgrounds.push(newCampground);
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
})

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
})

//SHOW - shows more info about one capground
router.get("/:id", middleware.isLoggedIn, (req, res) => {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, campgrounds) => {
        if (err) {
            console.log(err);
        } else {
            console.log("found campground");
            // render the show template with that campground
            res.render("campgrounds/show", { campgrounds });
        }
    })
})

// Edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", { campgrounds: foundCampground });
    });
});
// Update Campground route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

// Destroy campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})
module.exports = router;