const mongoose = require("mongoose");

const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("MongoDB Atlas connected");
            console.log(mongoose.connection.host);
            console.log(mongoose.connection.name)
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = { connectDB };