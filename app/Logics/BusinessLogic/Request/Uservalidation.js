const {Hasher} = require("../../../methods/Passwords/HashBcrypt")

module.exports.LoginValid = async (req,res,next)=>{
    const user = {...req.body};
    res.locals.obj = user
    next()
}

module.exports.Newadds = async (req,res,next)=>{
    const user = {...req.body};
    res.locals.user = user;
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