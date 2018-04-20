var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res) {
  res.render("landing");
});

router.get("/register", function(req, res){
  res.render("authentication/register");
});

router.post("/register", function(req, res){
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err) {
      req.flash("error", err.message);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        req.flash("success", "Thank you for joining Yelpcamp " + user.username + "!");
        res.redirect("/campgrounds");
      });
    }
  });
});

router.get("/login", function(req, res){
  res.render("authentication/login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect : "/campgrounds",
  successFlash : "Succesfully Logged in!",
  failureRedirect : "/login",
  failureFlash : true
}), function(req, res) {
  if(err) {
    console.log(err);
  }  
});

router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "You have been logged out.");
  res.redirect("/campgrounds");
});
module.exports = router;