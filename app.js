if(process.env.NODE_ENV!="producion"){
  require("dotenv").config();   
}const express= require("express")
require('dotenv').config();

const app=express();
const mongoose = require("mongoose")
const Review = require("./models/Review");
const path = require("path"); 
const methodOverride=require("method-override")
const ejsmate = require("ejs-mate");
const { validateReview } = require("./middleware"); 
const listingRoutes = require("./routes/listing.js");
const reviewRoutes = require("./routes/routes.js");
const UserRoutes = require("./routes/user.js");
const User = require('./models/user.js'); 
const session = require("express-session");
const flash = require("connect-flash");
const passport=require("passport")
const LocalStrategy=require("passport-local")
const { register } = require("module");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"/public")))
app.use(methodOverride("_method"))
app.engine("ejs", ejsmate);

async function main() {
  console.log("MONGO_URI:", process.env.MONGO_URI); 
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected ");
}

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.error(err);
  });

  const sessionOptions = {
    secret: "secretkeyforpassport",
    resave: false,
    saveUninitialized: false,
  };  

  app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false
  }));
    
  
  app.use(flash());
  app.use((req, res, next) => {
    res.locals.currUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
  });
  app.post('/submit-rating', (req, res) => {
    const rating = req.body.rating;
    console.log("Rating mila:", rating); 
    res.send("Thanks for your rating!");
  });

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/listings", listingRoutes);
app.use("/listings/:id/review", reviewRoutes);
app.use("/", UserRoutes);

passport.deserializeUser(async (id, done) => {
  console.log("DESERIALIZING USER ID:", id);
  const user = await User.findById(id);
  console.log("FOUND USER:", user);
  done(null, user);
});

app.use((err,req,res,next)=>{
  let{stauscode=500,message="somthing wrong!"}=err
  res.status(stauscode).render("error.ejs",{message})
})  

app.listen(8080,()=>{
    console.log("server is running on port 5001");
})