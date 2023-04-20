const {Hasher} = require("../../../methods/Passwords/HashBcrypt")
// const {validationResult} = require("express-validator")
const ErrorMessage = require("../../../methods/Response/errormessage");
const Isitvalid = require("../../../methods/Datavalidators/Valid");

module.exports.LoginValid = async (req,res,next)=>{
    const user = {...req.body};
    res.locals.obj = user
    next()
}

module.exports.Newadds = async (req,res,next)=>{
    try {
        const result = Isitvalid(req,res)
        if(result){
            const user = {...req.body};
            res.locals.user = user;
        }
        else{
            return;
        }
    } catch (error) {
        console.log(error)
        ErrorMessage(res,404,null,null,"Error in Format")
        return;
    }
    next()
} 

module.exports.Signinvalid = async (req,res,next)=>{
    try {
        const user = {...req.body};
        res.locals.user = user;
        user.password = await Hasher(user.password)
    } catch (error) {
        console.log(error)
    }
    next();
}