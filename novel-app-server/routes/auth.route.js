const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const db = require('../models');

const AuthRouter = express.Router();

// Đăng ký
AuthRouter.post('/register', async (req, res, next) => {
    try {
        const { username, email, password, confirmPassword, avatar } = req.body; // Thêm avatar vào req.body

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Kiểm tra tên người dùng
        const existingUsername = await db.Users.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Kiểm tra email
        const existingUser = await db.Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new db.Users({
            username,
            email,
            password: hashedPassword,
            avatar, // Lưu avatar vào trường avatar trong MongoDB
            createdAt: new Date()
        });

        const savedUser = await newUser.save();
        res.status(201).json({
            message: "User registered successfully",
            userId: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            avatar: savedUser.avatar // Trả về avatar nếu cần
        });
    } catch (error) {
        next(error);
    }
});

// Đăng nhập
AuthRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.Users.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        // Kiem tra status cua user
        if (user.status == 'banned') {
            return res.status(401).json({ message: 'Your account banned' });
        }

        // So sánh mật khẩu người dùng nhập với mật khẩu đã lưu trong cơ sở dữ liệu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Không tạo token mà trả về ID và username
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
});



// Quên mật khẩu
AuthRouter.post("/forgot-password", async (req, res) => {
    const { username, email } = req.body;

    try {
        const user = await db.Users.findOne({ username, email });
        if (!user) {
            return res.status(404).json({ status: "User or Email not found!" });
        }

        const secret = process.env.JWT_SECRET + user.password;
        const token = jwt.sign(
            { email: user.email, id: user._id },
            secret,
            { expiresIn: "10m" }
        );

        const link = `http://localhost:9999/auth/reset-password/${user._id}/${token}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Reset Your Password",
            text: `Click the link to reset your password: ${link}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: "Error in sending email" });
            }
            console.log("Email sent: " + info.response);
            return res.json({ status: "Check your inbox for a reset link!" });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Something went wrong!" });
    }
});

// Đặt lại mật khẩu
AuthRouter.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password, confirmPassword } = req.body;

    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ status: "Passwords do not match!" });
        }

        const user = await db.Users.findById(id);
        if (!user) {
            return res.status(404).json({ status: "User Not Found!" });
        }

        const secret = process.env.JWT_SECRET + user.password;
        jwt.verify(token, secret);

        const encryptedPassword = await bcrypt.hash(password, 10);
        await db.Users.updateOne(
            { _id: id },
            { $set: { password: encryptedPassword } }
        );

        return res.json({ status: "Password change successful!" });
    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({ status: "Invalid or expired token!" });
    }
});

module.exports = AuthRouter;
