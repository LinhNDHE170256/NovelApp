const express = require('express');
const db = require('../models');

const NovelRouter = express.Router();

// Tạo novel
NovelRouter.post('/novel-create', async (req, res, next) => {
    try {
        const newNovel = new db.Novels(req.body);
        const savedNovel = await newNovel.save();
        res.status(201).json({
            message: "Novel created successfully",
            novelId: savedNovel._id
        });
    } catch (error) {
        next(error);
    }
});

// Chỉnh sửa thông tin của novel
NovelRouter.put('/novel-update/:id', async (req, res, next) => {
    try {
        const updatedNovel = await db.Novels.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedNovel) {
            return res.status(404).json({ message: 'Novel not found' });
        }

        res.status(200).json(updatedNovel);
    } catch (error) {
        next(error);
    }
});

// Thêm chapter vào novel
NovelRouter.post('/:novelId/add-chapter', async (req, res, next) => {
    try {
        const novel = await db.Novels.findById(req.params.novelId);
        if (!novel) {
            return res.status(404).json({ message: 'Novel not found' });
        }

        const newChapter = {
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            content: req.body.content, // Hoặc lưu đường dẫn file
            created_at: new Date()
        };

        novel.chapters.push(newChapter);
        await novel.save();

        res.status(201).json({
            message: "Chapter added successfully",
            chapterId: newChapter._id
        });
    } catch (error) {
        next(error);
    }
});

// Chỉnh sửa thông tin chapter
NovelRouter.put('/:novelId/update-chapter/:chapterId', async (req, res, next) => {
    try {
        const novel = await db.Novels.findById(req.params.novelId);
        if (!novel) {
            return res.status(404).json({ message: 'Novel not found' });
        }

        const chapter = novel.chapters.id(req.params.chapterId);
        if (!chapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }

        chapter.title = req.body.title || chapter.title;
        chapter.content = req.body.content || chapter.content;

        await novel.save();

        res.status(200).json({
            message: "Chapter updated successfully",
            chapter
        });
    } catch (error) {
        next(error);
    }
});

// Lấy danh sách novel (cùng với các chapter)
NovelRouter.get('/get-novel', async (req, res, next) => {
    try {
        // Lấy tất cả novels và populate các trường author_id và categories
        const novels = await db.Novels.find()
            .populate('author_id') // Populates author details
            .populate('categories') // Populates categories details

        res.status(200).json(novels);
    } catch (error) {
        next(error);
    }
});


// Xóa novel
NovelRouter.delete('/delete-novel/:id', async (req, res, next) => {
    try {
        const deletedNovel = await db.Novels.findByIdAndDelete(req.params.id);
        if (!deletedNovel) {
            return res.status(404).json({ message: 'Novel not found' });
        }

        res.status(200).json({ message: 'Novel deleted successfully' });
    } catch (error) {
        next(error);
    }
});

// Xóa chapter
NovelRouter.delete('/:novelId/delete-chapter/:chapterId', async (req, res, next) => {
    try {
        const novel = await db.Novels.findById(req.params.novelId);
        if (!novel) {
            return res.status(404).json({ message: 'Novel not found' });
        }

        const chapter = novel.chapters.id(req.params.chapterId);
        if (!chapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }

        chapter.remove(); // Xóa chapter
        await novel.save();

        res.status(200).json({ message: 'Chapter deleted successfully' });
    } catch (error) {
        next(error);
    }
});

const mongoose = require('mongoose');

NovelRouter.post('/get-novel-by-author', async (req, res, next) => {
    try {
        const { authorId } = req.body;

        if (!authorId) {
            return res.status(400).json({ message: 'Author ID is required.' });
        }

        console.log("Author ID from body:", authorId); // Kiểm tra giá trị authorId
        const novels = await db.Novels.find({ author_id: authorId });
        console.log("Novels found:", novels); // Kiểm tra kết quả novels


        if (!novels.length) {
            return res.status(404).json({ message: 'No novels found for this author.' });
        }
        res.status(200).json(novels);
    } catch (error) {
        console.error(error);
        next(error);
    }
});






module.exports = NovelRouter;
