  //=====================//
//APP SETUP
//=====================//
var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    passport         = require("passport"),
    flash            = require("connect-flash");
    LocalStrategy    = require("passport-local"),
    Campground       = require("./models/campground"),
    Comment          = require("./models/comment"),
    User             = require("./models/user"),
    seedDB           = require("./seeds"),
    methodOverride   = require("method-override");
    
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes    = require("./routes/comments");
var indexRoutes      = require("./routes/index");

mongoose.connect(process.env.DATABASEURL);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//=======================//
//DATABASE SEED FUNCTION
//======================//

//seedDB();

//=====================//
//PASSPORT CONFIGURATION
//====================//

app.use(require("express-session")({
  secret: "It's mah birthday!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});


app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server has Started");
});