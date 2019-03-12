const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
    {
        name: "Kvalvika's Beach",
        image: "https://images.unsplash.com/photo-1502954819424-7ed05cf95b43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
        description: "Located in an isolated bay on the northern side of Moskenesøy and only reached by foot, Kvalvika feels as though it could be at the edge of the world, not an easy hour’s walk. Here turquoise waves crash on golden sands and vertical cliffs rise into the clouds in a display of Lofoten at its best. While quite popular as a day hike, Kvalvika is also a wonderful camping location, as most people leave in the late afternoon and you’ll have the place mostly to yourself. And why not go take a swim under the midnight sun and then sit by a campfire late into the night?"
    },
    {
        name: "Glen Lake",
        image: "https://images.unsplash.com/photo-1496718412302-96e78da39b72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
        description: "Glen Lake is a lake located in Leelanau County in the U.S. state of Michigan, near Lake Michigan. Several villages and hamlets lie along or near its shore, including Burdickville, Glen Arbor, and Glen Haven. The lake actually consists of two large bodies of water connected by a narrow channel crossed by the State Route 22 bridge, with the larger body to the east being referred to as \"Big Glen Lake\" and the smaller body to the west as \"Little Glen Lake\". The two bodies, collectively referred to as Glen Lake, are at the same level and hydrologically similar. The total surface area of the two bodies are 4,871 acres (20 km2) and 1,415 acres (6 km2), with maximum depths of 130 feet (40 m) and 13 ft (4 m) respectively. Big Glen Lake is nearly perfectly round, while Little Glen is more elongated. The lakes empty into Lake Michigan via the shallow Crystal River which winds through Glen Arbor."
    },
    {
        name: "Steamboat Springs",
        image: "https://images.unsplash.com/photo-1507670543100-227212c1cbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
        description: "When you visit Steamboat, you're vising a genuine Colorado mountain town that's steeped in history, surrounded by ranches, barns, horse and cattle, and just so happens to boast one of the biggest and best ski mountains in the country. We are in the heart of the American West, with a ranching heritage that is still such a big part of our community. But by no means are we rustic. We also know how to put our western hospitality to work and spoil you rotten. Like the people who live here, this place is real, genuine and friendly."
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