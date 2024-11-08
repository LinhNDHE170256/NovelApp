const db = require('../models');

async function getAll(req, res, next) {
    try {
        const categories = await db.Categories.find().exec();
        // if (!categories) {
        //     return res.status(404).json({ message: 'No categories found' });
        // }
        const newResult = categories?.map(c => ({
            code: c._id,
            name: c.name,
            description: c.description
        }));

        if (categories) {
            res.status(200).json({
                message: 'List of categories',
                data: newResult
            });
        }
    } catch (error) {
        next(error);
    }
}

const categoryController = {
    getAll
}

module.exports = categoryController

