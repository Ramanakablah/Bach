const mongoose = require("mongoose")

module.exports.Connection = ()=>{
    mongoose.connect(process.env.MONGO_URI,()=>{
        console.log("Database online ...... ")
    })
}

