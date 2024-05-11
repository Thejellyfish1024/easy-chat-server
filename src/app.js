const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require("http");
const cookieParser = require('cookie-parser');
// const bookRoutes = require('./app/modules/book/book.routes')
// const userRoutes = require('./app/modules/user/user.route');

// 
const app = express();
const server = createServer(app);


// middlewares
app.use(cors({
    origin: ["http://localhost:5173", "https://easy-chat-client.vercel.app"],
    methods: ["GET", "PATCH", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 204,
}))
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Route is working",
    });
});

// app.use('/books', bookRoutes)
// app.use('/users', userRoutes)



module.exports = server;