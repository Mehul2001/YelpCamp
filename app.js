const express = require("express"),
    app = express(),
    port = 3000,
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelpcamp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


//Schema Setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Granite Hill",
//     image: "https://images.unsplash.com/photo-1499363145340-41a1b6ed3630?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
//     description: "This is a huge Granite Hill, no bathrooms. No water. Beautiful Granite."
// }, (err, campground) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(campground);
//     }
// })


app.get("/", (req, res) => {
    res.render("landing");
});


// INDEX - show all campgrounds
app.get("/campgrounds", (req, res) => {
    // GET all campgrounds from database
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { campgrounds });
        }
    })
});


// CREATE - Add a new campground to db
app.post("/campgrounds", (req, res) => {
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
app.get("/campgrounds/new", (req, res) => {
    res.render("new");
})

app.get("/campgrounds/:id", (req, res) => {
    // find the campground with provided ID
    Campground.findById(req.params.id, (err, campgrounds) => {
        if (err) {
            console.log(err);
        } else {
            // render the show template with that campground
            res.render("show", { campgrounds });
        }
    })
})

app.listen(port, console.log(`YelpCamp is listening on ${port}`));