var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareOBJ = {};

middlewareOBJ.isLoggedIn = function(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  } else {
  req.flash("error", "Please login to continue.");
  res.redirect("/login");
  }
};

middlewareOBJ.isUsersCampground = function(req, res, next) {
  if(req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err) {
        req.flash("error", "It seems there was an error");
        res.redirect("back");
      } else {
          if(foundCampground.author.id.equals(req.user._id)){
            next();
          } else {
            req.flash("You don't have permission to do that");
            res.redirect("back");
          }
        }
    });
  } else {
      req.flash("error", "You need to be logged in to do that.");
      res.redirect("back");
    }
};

middlewareOBJ.isUsersComment = function (req, res, next) {
  if(req.isAuthenticated) {
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err) {
        res.redirect("back");
      } else {
        if(foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

module.exports = middlewareOBJ;