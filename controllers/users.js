const user=require("../models/user");

module.exports.rendersingup=(req, res) => {
    res.render("users/signup");
  }
module.exports.signup=async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const newUser = new user({ email, username });
      const registeredUser = await user.register(newUser, password);
        console.log(registeredUser);
      req.login(registeredUser,(err)=>{
        if(err){
          return next(err)
        }
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
      })
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/login");
    }
  }

  module.exports.renderLogin=(req,res)=>{
    res.render("users/login.ejs")
  }

  module.exports.login=async(req,res)=>{
    req.flash("success","Welcome  back to Wanderlust")
    let redirectUrl = res.locals.redirectUrl ||"/listings"
    res.redirect(redirectUrl)
  }

  module.exports.Logout= (req, res, next) => {
    req.logout(function(err) {
      if (err) {
        return next(err);
      }
      req.flash("success", "You are logged out");
      res.redirect("/listings");
    });
  }