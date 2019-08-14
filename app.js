var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seeds");

// requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

// mongoose.connect('mongodb://localhost:27017/yelp_camp_v12', { useNewUrlParser: true }); // for development (running locally)
//mongoose.connect("mongodb://xuwang278:123abc@ds145694.mlab.com:45694/xuwang278_mlab"); // for production (has a url)

// add environmental variable to show either development or production mode it is: 
// cmd: export DATABASEURL=mongodb://localhost:27017/yelp_camp_v12
// heruku - Config Vars: DATABASEURL - mongodb://xuwang278:123abc@ds145694.mlab.com:45694/xuwang278_mlab
var url = process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp_v12";
mongoose.connect(url); 

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // seed the database

// PASSORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again, Rusty wins!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pass in currentUser in every routes/template
// pass in error and success in every routes/templates for header usage
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// make template path shorter
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelp server has started!!!")
});