var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//Index Route
router.get("/", function(req, res) {
  Campground.find({}, function(err, dbCampgrounds) {
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/index",{campgrounds:dbCampgrounds, currentUser:req.user});
    }
  });
});

//New Route
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new");
});

//Create Route
router.post("/", middleware.isLoggedIn, function(req, res){
  console.log(req.body.campground);
  Campground.create(req.body.campground, function(err, createdCampground){
    if(err){
      req.flash("error", "It seems there was an issue proccessing your request")
    } else {
      createdCampground.author.id = req.user._id;
      createdCampground.author.username = req.user.username;
      createdCampground.save();
      req.flash("success", "Succesfully posted your campground!")
      res.redirect("/campgrounds");
    }
  });
});

//Show Route
router.get("/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err) {
      req.flash("error", "It seems there was an issue proccessing your request");
      res.redirect("/campgrounds")
    } else {
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.isUsersCampground, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err){
      req.flash("error", "It seems there was an issue proccessing your request");
      res.redirect("back")
    }
    res.render("campgrounds/edit", {campground: foundCampground});
  });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.isUsersCampground, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err) {
      req.flash("error" ,"It seems there was an issue proccessing your request");
      res.redirect("/campgrounds");
    } else {
      req.flash("success", "Changes have been saved!");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//DESTROY!!!!!! CAMPGROUND ROUTE
router.delete("/:id", middleware.isUsersCampground, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err) {
      req.flash("error", "It seems there was an issue proccessing your request");
      res.redirect("back");
    } else {
      req.flash("success", "You have succesfully removed your campground!");
      res.redirect("/campgrounds");
    }
  });
});
    
module.exports = router;