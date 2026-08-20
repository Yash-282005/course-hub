const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const userModel = require("../Models/userModel");

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const result = await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: result._id,
                name: result.name,
                email: result.email,
                role: result.role
            }
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Registration failed"
        });
    }
};


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            "mysecretkey",
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Login failed"
        });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(200).json({
                message: "If the email exists, a password reset link has been sent."
            });
        }

        
        const resetToken = crypto.randomBytes(32).toString("hex");

     
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;

        await user.save();

      
        const resetLink =
            `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

   
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

     
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Course Hub - Password Reset",
            html: `
                <h2>Password Reset</h2>

                <p>Hello ${user.name},</p>

                <p>You requested to reset your password.</p>

                <p>Click the button below to reset your password:</p>

                <a href="${resetLink}"
                   style="
                     display:inline-block;
                     padding:10px 20px;
                     background:#0d6efd;
                     color:white;
                     text-decoration:none;
                     border-radius:5px;
                   ">
                    Reset Password
                </a>

                <p>This link will expire in 15 minutes.</p>

                <p>If you did not request this, you can ignore this email.</p>
            `
        });

        res.status(200).json({
            message: "If the email exists, a password reset link has been sent."
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something went wrong while sending the reset email."
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Find user with this reset token
        const user = await userModel.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired reset token."
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password
        user.password = hashedPassword;

        // Clear reset token so it cannot be reused
        user.resetToken = null;
        user.resetTokenExpiry = null;

        await user.save();

        res.status(200).json({
            message: "Password reset successfully."
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Password reset failed."
        });
    }
};