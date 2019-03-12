const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

//route route
router.get("/", (req, res) => {
    res.render("landing");
});

//register form route
router.get("/register", (req, res) => {
    res.render("register");
})

//handle sign up logic
router.post("/register", (req, res) => {
    const newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", (req, res) => {
    res.render("login");
})

//handle login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), (req, res) => {

    });

//logout route
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
});

//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
module.exports = router;