const {validationResult}= require("express-validator")
const ErrorMessage = require("../Response/errormessage")

function Isitvalid(req,res){
   const result = validationResult(req,res)
   if(result.isEmpty()){
    return true
   }
   else{
     const message = `${result.errors[0].msg} of ${result.errors[0].param}`
     ErrorMessage(res,404,null,null,message)
     return false
   }
}

module.exports = Isitvalid