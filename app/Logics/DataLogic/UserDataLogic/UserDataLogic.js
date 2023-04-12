const UserModel = require("../../../Schemas/UsersSchema")
const {Comparer} = require("../../../methods/Passwords/HashBcrypt")
const {validationResult} = require("express-validator")
const {Tokenize} = require("../../../methods/JWTS/JsonWebTokens")
const Response = require("../../../methods/Response/respond")

module.exports.DBCheckuser = async (req,res) => {
  const obj = res.locals.obj
  // const Hasher = res.locals.hasheer
  // const DepInj = await Hasher(req.body.name)
  // console.log(DepInj)
  // console.log(obj , req.body)
  // const resp = await Comparer(req.body.password,obj.password)
  // console.log(resp)
    const Existinguser = await UserModel.findOne({ email: obj.email })
    if(Existinguser!==null){
      console.log("Its null")
      Response(res,200,"Failed","User already exists",null)
    }
    else{
      const Createuser = await UserModel.create(obj);
      console.log(Createuser)
      Response(res,200,"Success",null,Createuser)
    }
}

module.exports.SigninChecker = async (req,res)=>{
   const user = res.locals.user
   console.log("Good",user)
   const Existinguser = await UserModel.find({email:user.email})
  console.log(Existinguser)
   if(Existinguser.length===0){
   try {
     const Creatinguser = await UserModel.create(user)
     Response(res,200,"Success","User created",null)
   } catch (error) {
    console.log(error)
    Response(res,500,"Success","Server at error",null)
   }

   }
   else{
    Response(res,200,"Failed","User already exists",null)
   }
}

module.exports.EmailChecker = async (req,res)=>{
   const user = res.locals.user;
   try {
    const Existinguser = await UserModel.findOne({email:user.email})
    console.log(Existinguser)
    if(Existinguser===null){
      try {
        // const Creatinguser = await UserModel.create(user)
        Response(res,200,"Success","User created",null)
      } catch (error) {
        console.log(error)
        Response(res,500,"Failed",null,"Error at server")
      }
    }
    else{
      Response(res,200,"Failed","User already exists",null)
    }
   } catch (error) {
    console.log(error)
    Response(res,400,"Failed",null,"Error at server")
   }
}
