const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
    {
        name: "Kvalvika's Beach",
        image: "https://images.unsplash.com/photo-1502954819424-7ed05cf95b43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
        description: "orange tent sea facing"
    },
    {
        name: "Glen Lake",
        image: "https://images.unsplash.com/photo-1496718412302-96e78da39b72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
        description: "person barbequing marshmellow"
    },
    {
        name: "Steamboat Springs",
        image: "https://images.unsplash.com/photo-1507670543100-227212c1cbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
        description: "A woman enjoying tea near her tent"
    }
]


function seedDB() {
    //Remove all the campgrounds
    Campground.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds");
        data.forEach((seed) => {
            // Add few campgrounds
            Campground.create((seed), (err, campground) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(campground);
                    //Create a comments
                    Comment.create(
                        {
                            text: "This place is great but i wish there was internet",
                            author: "Andrew Welch"
                        }, (err, comment) => {
                            if (err) {
                                console.log(err);
                            }
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new comment");
                        }
                    )
                }
            })
        })
    })

    // Add a few comments
}

module.exports = seedDB;