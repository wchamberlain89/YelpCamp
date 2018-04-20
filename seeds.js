var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Fantastic Fields",
    image: "https://images.unsplash.com/photo-1502814828814-f57efb0dc974?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b85b41ac63fecc3ef432c48f0aaea1fa&auto=format&fit=crop&w=1050&q=80",
    description: "Fantastic Fields where the fields are FANTASTIC"
  },  
  {
    name: "Trecherous Peaks",
    image: "https://images.unsplash.com/photo-1519677249026-92ca90976deb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=557d4da14d49c108ee7f10b616cb4c47&auto=format&fit=crop&w=1071&q=80",
    description: "Not as Trecherous as they sound"
  },  
  {
    name: "Cotton Candy Hills",
    image: "https://images.unsplash.com/photo-1456072212651-c507cb43b26f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3bceb05f1c2c268c2938692f17b7bd81&auto=format&fit=crop&w=1050&q=80",
    description: "We serve cotton candy for breakfast"
  },
  {
    name: "Zues Canyon",
    image: "https://images.unsplash.com/photo-1507521555091-13bbbe8ac57b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=75a6f83b8f6288cc98363d78fca5c95c&auto=format&fit=crop&w=1053&q=80",
    description: "Made from Zeus's lightning itself"
  },
  {
    name: "Not Your House",
    image: "https://images.unsplash.com/photo-1451055959797-14c0cfba1a43?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8bbe7fa009893f34b3fd18d1e6423f39&auto=format&fit=crop&w=1050&q=80",
    description: "but I bet you wish it was!"
  }  
];

function seedDB(){
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("removed campgrounds")
    }
    // else {
    //   data.forEach(function(campSeed){
    //     Campground.create(campSeed, function(err, campground){
    //       if(err){
    //         console.log(err);
    //       } else {
    //         Comment.create({text:"This is a comment", author:"ward"},function(err, comment){
    //           if(err){
    //             console.log(err);
    //           } else {
    //             campground.comments.push(comment);
    //             campground.save();
    //             console.log("Created new comment for " + campground.name);
    //           }
    //         });
    //       }
    //     });
    //   }); 
    // }
  });
}

module.exports = seedDB;