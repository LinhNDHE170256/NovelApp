const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const httpErrors = require('http-errors');
const cors = require('cors'); // Import thư viện CORS
require('dotenv').config();

const db = require('./models');
const { CategoryRouter, NovelRouter, UserRouter, AuthRouter } = require('./routes');

// Khởi tạo một express web server
const app = express();

// Thêm các middleware vào web server -> kiểm soát các request
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors()); // Thêm CORS middleware (có thể cấu hình tùy ý)

app.get('/', async (req, res, next) => {
    res.status(200).json({ 'message': 'Welcome to ExpressJS server' });
});

// Định tuyến theo các chức năng thực tế
app.use("/category", CategoryRouter);
app.use("/novel", NovelRouter);
app.use("/user", UserRouter);
app.use("/auth", AuthRouter);

app.use(async (req, res, next) => {
    next(httpErrors.BadRequest('Error: Invalid request'));
});

app.use(async (err, req, res, next) => {
    res.status = err.status;
    res.send({
        "error": {
            "status": err.status || 500,
            "message": err.message
        }
    });
})

const HOST = process.env.HOST_NAME;
const PORT = process.env.PORT || 8080;

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
    db.connectDB();
});
