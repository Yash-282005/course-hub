const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    c_name:{
        type:String,
        required:true,

    },

    c_insturctor:{
        type:String,
        required:true
    },

      c_category:{
        type:String,
        required:true
    },
      c_dutration:{
        type:Number,
        required:true
    },
      c_level:{
        type:String,
         enum:["Beginner","Intermediate","Advance"],
        required:true
    },
     c_thumbnail:{
        type:String,
        required:true
    },
})

const courseModel = mongoose.model("course",courseSchema)

module.exports = courseModel