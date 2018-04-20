var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//COMMENT NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

//COMMENT CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err) {
      req.flash("error", "It seems there was an issue proccessing your request");
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          req.flash("error", "It seems there was an issue proccessing your request");
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          req.flash("success", "Your comment has been successfully posted!");
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
 });

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.isUsersComment, function(req, res) {
  Comment.findById(req.params.comment_id, function(err, foundComment){
    res.render("comments/edit", {comment: foundComment, campground: req.params.id});
  });  
});

//COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.isUsersComment, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
    if(err){
      req.flash("error", "It seems there was an issue proccessing your request");
      res.redirect("back");
    } else {
      req.flash("success", "Your changes have been saved!");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });  
});

//COMMENT DELETE ROUTE
router.delete("/:comment_id", middleware.isUsersComment, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err) {
      req.flash("error", "It seems there was an issue proccessing your request");
      res.redirect("/campgrounds/" + req.params.id);
    } else {
      req.flash("success", "Successfully deleted comment!")
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

module.exports = router;