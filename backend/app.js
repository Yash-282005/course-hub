const express = require("express");
const { connectDB } = require("./db");
const routes = require("./Routes/courseRoutes");
const userRoutes = require("./Routes/userRoutes");
const cors = require("cors");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/course", routes);
app.use("/auth", userRoutes);

app.listen(4000, () => {
    console.log("server is running....");
});