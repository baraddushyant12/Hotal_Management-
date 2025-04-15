const express = require("express");
const router = express.Router();
const user=require("../models/user");
const passport = require("passport");
const { saveRedirectUrl } = require("../midd");
const userController=require("../controllers/users")

router.get("/singUp",userController.rendersingup);
  
  router.post("/singUp",userController.signup );

  router.get("/login",userController.renderLogin)

  router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",{
      failureRedirect:"/login",
      failureFlash: true,
    }),
    userController.login
  )

  router.get("/logout",userController.Logout );
  

module.exports = router;
