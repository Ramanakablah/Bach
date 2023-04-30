const mongoose = require("mongoose")

const {Schema} = mongoose

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        max:100,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    contact_number:{
        type:Number,
        max:10000000000,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        required:true,
    }
})

module.exports = UserModel = mongoose.model("Users",UserSchema)