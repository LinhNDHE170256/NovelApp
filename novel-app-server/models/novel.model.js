const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    contentFilePath: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const novelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cover_image: {
        type: String
    },
    author_id: {
        type: String
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    chapters: [chapterSchema]
});

const Novel = mongoose.model('Novel', novelSchema);

module.exports = Novel;
