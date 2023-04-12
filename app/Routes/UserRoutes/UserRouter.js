const express = require("express")
const {body} = require("express-validator")
const router = express.Router()
const {LoginValid,Newadds, Signinvalid} = require("../../Logics/BusinessLogic/Request/Uservalidation")
const {DBCheckuser,SigninChecker, EmailChecker} = require("../../Logics/DataLogic/UserDataLogic/UserDataLogic")

router.post("/login",[body("username").isEmail(),body("password").isStrongPassword()],LoginValid,DBCheckuser)
router.post("/add",Newadds,SigninChecker)
router.post("/signin",Signinvalid,EmailChecker)


module.exports = router