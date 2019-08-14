var express    = require("express");
var router     = express.Router({mergeParams: true}); // access id in line 22
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleware = require("../middleware");

// NEW ROUTE: show new comment form
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find campground by id 
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
           console.log(err); 
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
    
});

// CREATE ROUTE - create a new comment and then redirect
router.post("/", middleware.isLoggedIn, function(req, res){
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    req.flash("error", "Something went wrong!");
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save the comment
                    comment.save();
                    // connect new comment to that campground
                    campground.comments.push(comment);
                    // save the campground
                    campground.save();
                    // redirect to campground show page
                    req.flash("success", "Successfully added comment!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
  
});

// show edit form
//full path:  "/campgrounds/:id/comments/:comment_id/edit"
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err) {
            res.redirect("back");
        } else {
            // edit.ejs only takes campground_id, so not necessary to pass in entire campground
           res.render("comments/edit", {campground_id: req.params.id, comment: foundComment}); 
        }
    });
});

// handle update logic
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// show destory 
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err) {
            console.log(err);
        } else {
            req.flash("success", "Comment deleted!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });

});


module.exports = router;