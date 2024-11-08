const e = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    images: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'author'],
    },
    status: {
        type: String,
        enum: ['active', 'banned'],
        default: 'active'
    },
    avatar: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    history: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Novel'
    }],
    follow: [{
        following_user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        followed_novel_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Novel',
            required: true
        }
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
