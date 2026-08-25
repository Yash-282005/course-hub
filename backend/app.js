require("dotenv").config();
const express = require("express");
const { connectDB } = require("./db");
const routes = require("./Routes/courseRoutes");
const userRoutes = require("./Routes/userRoutes");
const enrollmentRoutes = require("./Routes/enrollmentRoutes");
const cors = require("cors");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/enrollment", enrollmentRoutes);

app.use("/course", routes);
app.use("/auth", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`server is running on port ${PORT}`);
});