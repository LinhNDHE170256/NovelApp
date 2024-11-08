const express = require('express');
const bodyParser = require('body-parser');
const db = require('../models'); // Sử dụng db để quản lý model
const { categoryController } = require("../controllers");

const categoryRouter = express.Router();

// CRUD: Create new category
categoryRouter.post("/create", async (req, res, next) => {
    try {
        const newCategory = new db.Categories(req.body); // Sử dụng db.Categories thay vì import riêng
        const newDoc = await newCategory.save();
        res.status(201).json({
            message: "Create successfully",
            result: {
                catId: newDoc._id,
                catName: newDoc.name,
                desc: newDoc.description
            }
        });
    } catch (error) {
        next(error);
    }
});
// Add category with novels
categoryRouter.post("/add", async (req, res, next) => {
    try {
        const newCategory = new db.Categories(req.body);
        const novels = req.body.novels; // Sử dụng novels thay vì products

        const newDoc = await newCategory.save();
        if (newDoc && Array.isArray(novels)) { // Kiểm tra novels có tồn tại và là mảng
            const id = newDoc._id;
            const newNovels = novels.map(n => ({
                ...n,
                categories: id // Thêm danh mục vào từng tiểu thuyết
            }));

            const novelInsertionResult = await db.Novels.insertMany(newNovels);
            if (novelInsertionResult) {
                return res.status(200).json({
                    message: "Category and novels added successfully",
                    category: newDoc,
                    novels: novelInsertionResult
                });
            } else {
                return res.status(304).json({
                    message: "Novels were not inserted"
                });
            }
        } else {
            return res.status(400).json({
                message: "Category not created or invalid novels data"
            });
        }
    } catch (error) {
        next(error);
    }
});

// Get all categories
categoryRouter.get("/get-all", categoryController.getAll);

// Find novels by category
categoryRouter.get("/novels/:categoryId", async (req, res, next) => {
    try {
        const novels = await db.Novels.find({ categories: req.params.categoryId }).populate('categories');
        if (novels.length === 0) {
            return res.status(404).json({
                message: "No novels found for this category"
            });
        }
        res.status(200).json({
            message: "Novels found",
            novels
        });
    } catch (error) {
        next(error);
    }
});

module.exports = categoryRouter;