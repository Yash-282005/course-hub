const mongoose = require('mongoose');

const connectDB = () =>{mongoose.connect("mongodb://localhost:27017/i2_course")
    .then(() => {
        console.log("connected..");
        
    }).catch((err) => {
        console.log(err);
        
    });
}

module.exports = {connectDB}