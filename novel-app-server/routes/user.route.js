const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../models'); // Giả sử các mô hình đã được định nghĩa trong models
const mongoose = require('mongoose');

const UserRouter = express.Router();




// Đổi mật khẩu
UserRouter.post('/change-password', async (req, res, next) => {
    const { userId, oldPassword, newPassword } = req.body;

    try {
        const user = await db.Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Kiểm tra mật khẩu cũ
        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordValid) {
            return res.status(401).json({ message: 'Old password is incorrect' });
        }

        // Mã hóa mật khẩu mới trước khi lưu
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error in change-password:', error);
        next(error);
    }
});

// Lấy thông tin profile
UserRouter.get('/profile/:id', async (req, res, next) => {
    try {
        const user = await db.Users.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

// Cập nhật profile
UserRouter.post('/update-profile/:id', async (req, res, next) => {
    const { email, avatar } = req.body; // Chỉ lấy email và avatar
    try {
        const updatedUser = await db.Users.findByIdAndUpdate(
            req.params.id,
            { email, avatar }, // Cập nhật email và avatar
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

UserRouter.post('/add-to-history', async (req, res) => {
    const { user_id, novel_id } = req.body;

    try {
        const user = await db.Users.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const novel = await db.Novels.findById(novel_id);
        if (!novel) {
            return res.status(404).json({ message: 'Novel not found' });
        }
        if (user.history.includes(novel_id)) {
            return res.status(400).json({ message: 'Novel already added to history' });
        }
        user.history.push(novel_id);
        await user.save();
        res.status(200).json({ message: 'Novel added to history successfully' });
    } catch (error) {
        console.error('Error while adding to history:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


UserRouter.post('/get-history', async (req, res) => {
    const { user_id } = req.body;
    try {
        if (!user_id) {
            return res.status(400).json({ error: 'user_id is required' });
        }
        const user = await db.Users.find({ _id: user_id });
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const history = user[0].history;
        if (!history || history.length === 0) {
            return res.status(404).json({ message: 'No history found for the user' });
        }

        const novels = await db.Novels.find({
            '_id': { $in: history }
        });


        if (novels.length === 0) {
            return res.status(404).json({ message: 'No novels found in history' });
        }

        res.status(200).json({ history: novels });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



module.exports = UserRouter;
