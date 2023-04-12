const bcrypt = require("brycpt")
const { body, validationResult } = require('express-validator');

module.exports.Validators = async (req,res,next)=>{
    body("username").isEmail().withMessage("Invalid Email")
    body("password").isLength({min:8}).withMessage("Password must be at least 8 characters long")

    next()
}