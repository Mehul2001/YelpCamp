//all the middleware goes here
const middlewareObj = {};
const Campground = require("../models/campground");
const Comment = require("../models/comment");
middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    //if user is logged in
    if (req.isAuthenticated()) {

        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                res.redirect("back");
            } else {
                //does user own campground
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}
middlewareObj.checkCommentOwnership = function (req, res, next) {
    //if user is logged in
    if (req.isAuthenticated()) {

        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                res.redirect("back");
            } else {
                //does user own comment
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
module.exports = middlewareObj