const express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

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
    const newCampground = { name: name, image: image, description: description };
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
router.get("/new", (req, res) => {
    res.render("campgrounds/new");
})

//SHOW - shows more info about one capground
router.get("/:id", (req, res) => {
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
module.exports = router;