const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: function (value) {
                return value.length >= 3;
            },
            message: "Category name must be at least 3 characters long"
        },
        required: [true, "Category name is required"],
        unique: [true, "Category name must be unique"]
    },
    description: String
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;