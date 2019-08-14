var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
     if(req.isAuthenticated()){
        return next();
    }
    // flash(key, message)
    // flash will not flash right away; next route, router.get("/login"), can access it
    // the statement runs before redirection!!!
    // gives next route capability to show a one-time error message
    req.flash("error", "You need to be logged in to do that!"); 
    res.redirect("/login");
};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
     // if is user logged in
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err) {
                req.flash("error", "Campground not found!");
                res.redirect("back");
            } else {
                // if user own the campground?
                // if (foundCampground.author.id === req.user._id) // mongoose object vs. a String
                if (foundCampground.author.id.equals(req.user._id)) {
                     next();
                 } else {
                    req.flash("error", "You do not have permission to do that!");
                    // otherwise, redirect
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        // otherwise, redirect
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
     // if is user logged in
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err) {
                res.redirect("back");
            } else {
                // if user own the comment?
                if (foundComment.author.id.equals(req.user._id)) {
                     next();
                 } else {
                    req.flash("error", "You do not have permission to do that.");
                    // otherwise, redirect
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        // otherwise, redirect
        res.redirect("back");
    }
};

module.exports = middlewareObj;