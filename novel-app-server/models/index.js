const mongoose = require('mongoose');
const Category = require('./category.model');
const User = require('./user.model');
const Novel = require('./novel.model');


//khoi tao doi tuong co so du lieu
const db = {};

//bo sung entity objects
db.Categories = Category;
db.Users = User;
db.Novels = Novel;

//thuc hien ket noi voi co so du lieu
db.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log('Connect to MongoDB successfully!'))
    } catch (error) {
        next(error);
        process.exit();
    }
}

module.exports = db;