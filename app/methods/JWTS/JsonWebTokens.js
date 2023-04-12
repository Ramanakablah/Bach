const jwt = require("jsonwebtoken")

module.exports.Tokenize = async (obj)=>{
    const Token = jwt.sign(obj,process.env.AWSOME_TOKEN_KEY)
    return Token
} 

module.exports.Decoder = async (req,res,Token)=>{
     const Obj = jwt.verify(Token,process.env.AWSOME_TOKEN_KEY)
     return Obj;
}