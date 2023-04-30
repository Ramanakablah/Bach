const UserModel = require("../../../Schemas/UsersSchema")
const {Comparer} = require("../../../methods/Passwords/HashBcrypt")
const {validationResult} = require("express-validator")
const {Tokenize} = require("../../../methods/JWTS/JsonWebTokens")
const Response = require("../../../methods/Response/respond")

module.exports.DBCheckuser = async (req,res) => {
  const obj = res.locals.obj
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

module.exports.Loginchecker = async(req,res)=>{
  const user = res.locals.user;
  try {
    try {
      const Existinguser = await UserModel.findOne({email:user.username})
      if(Existinguser===null){
        Response(res,200,"Failed",null,"User does not exist")
      }
      else{
        try {
          console.log(user,Existinguser)
          const Matchuser = await Comparer(user.password,Existinguser.password);
          console.log(Matchuser)
          if(Matchuser===true){
            const token = await Tokenize({id:Existinguser._id})
            console.log(token)
            Response(res,200,"Success",{msg:"User Logged in 😎😎⭐",token:token},null)
          }
          else{
            Response(res,400,"Failed",null,"Password does not match 🥶🥶")
          }
        } catch (error) {
          console.log(error)
          Response(res,400,"Failed",null,"Server Facing issues try after 10 mins 😎🙏")

        }
      }
    } catch (error) {
      Response(res,400,"Failed",null,"Server Facing issues try after 20 mins 😎🙏")
    }
  } catch (error) {
    Response(res,400,"Failed",null,"Server is Down 😎😎")
  }

}