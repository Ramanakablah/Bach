const express = require("express")
const {body} = require("express-validator")
const router = express.Router()
const {LoginValid,Newadds, Signinvalid} = require("../../Logics/BusinessLogic/Request/Uservalidation")
const {DBCheckuser,SigninChecker, EmailChecker,Loginchecker} = require("../../Logics/DataLogic/UserDataLogic/UserDataLogic")

// router.post("/login",[body("username").isEmail(),body("password").isStrongPassword()],LoginValid,DBCheckuser)
router.post("/add",Newadds,SigninChecker)
router.post("/signin",Signinvalid,EmailChecker)
router.post("/signup",[body("username").isEmail(),body("password").isLength({min:6})],Newadds,Loginchecker)
router.post("/bucket")




module.exports = router