const express = require("express");
const { registerUser, loginUser, forgotPassword, resetPassword } = require("../Countoller/userController");

const routes = express.Router();

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.post("/forgot-password", forgotPassword);
routes.post("/reset-password/:token", resetPassword);

module.exports = routes;