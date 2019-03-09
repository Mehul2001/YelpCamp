const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

var campgrounds = [
    {
        name: "Salmon Creek",
        image: "https://images.unsplash.com/photo-1475710534222-6165a8b45449?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "Granite Hill",
        image: "https://images.unsplash.com/photo-1499363145340-41a1b6ed3630?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "Mountain Goat's Rest",
        image: "https://images.unsplash.com/photo-1541959378160-7c0cff4a0966?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "Salmon Creek",
        image: "https://images.unsplash.com/photo-1475710534222-6165a8b45449?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "Granite Hill",
        image: "https://images.unsplash.com/photo-1499363145340-41a1b6ed3630?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "Mountain Goat's Rest",
        image: "https://images.unsplash.com/photo-1541959378160-7c0cff4a0966?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "Salmon Creek",
        image: "https://images.unsplash.com/photo-1475710534222-6165a8b45449?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "Granite Hill",
        image: "https://images.unsplash.com/photo-1499363145340-41a1b6ed3630?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "Mountain Goat's Rest",
        image: "https://images.unsplash.com/photo-1541959378160-7c0cff4a0966?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
    }
];
app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", { campgrounds });
})

app.post("/campgrounds", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = { name: name, image: image };
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
})

app.listen(port, console.log(`YelpCamp is listening on ${port}`));