const mongoose = require("mongoose")

const {schema} = mongoose.Schema()

const ReportSchema = schema({
    Uid:{
      typeof:mongoose.Schema.Types.ObjectId,
      ref:"user"
    },
    startTime:{
        typeof:Date,
        required:true
    },
    stopTime:{
        typeof:Date,
        required:true
    },
    Day:{
        typeof:Date,
        required:true
    },
    Type:{
        typeof:String,
        required:true
    }
})

module.exports = mongoose.model("Report",ReportSchema)