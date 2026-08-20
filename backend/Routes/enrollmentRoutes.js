const express = require("express");
const {
    enrollCourse,
    getMyCourses
} = require("../Countoller/enrollmentController");

const {verifyToken,verifyUser} = require("../Middleware/authMiddleware");

const routes = express.Router();

routes.post("/enroll", verifyToken, enrollCourse);

routes.get("/my-courses", verifyToken, verifyUser, getMyCourses);

module.exports = routes;