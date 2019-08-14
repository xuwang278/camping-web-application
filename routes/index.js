var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");


router.get("/", function(req, res) {
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
    res.render("register");
});

// handle sign up logic
router.post("/register", function(req, res){
    // get user object with target username
    var newUser = new User({username: req.body.username});
    // store the user with hashed password in db
    User.register(newUser, req.body.password, function(err, user){
        // if the user has been already registered or other errs, handle the err
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        } 
        // if the user has successfully registered, log in and redirect
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// show log in form
router.get("/login", function(req, res){
   // res.render("login");
    res.render("login", {message: req.flash("error")}); // message is defined in app.js, so no need to pass in it to routes
});

// handel log in logic with middleware, which call auth method to verify password
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged You Out!");
    res.redirect("/campgrounds");
});

module.exports = router;