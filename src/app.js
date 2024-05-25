const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const cookieParser = require('cookie-parser');
const userRoutes = require('./app/modules/user/user.routes');
const chatRoutes = require('./app/modules/chat/chat.routes');

// 
const app = express();
const server = createServer(app);


// middlewares
// app.use(cors({
//     origin: ["http://localhost:5173", "https://easy-chat-client.vercel.app"],
//     methods: ["GET", "PATCH", "POST", "PUT", "DELETE"],
//     credentials: true,
//     optionsSuccessStatus: 204,
// }))
app.use(cors())

app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Route is working",
    });
});

// ALL APIS
// <------ user related api ------->
app.use('/users', userRoutes)
// <------ chat related api ------->
app.use('/chats', chatRoutes)






module.exports = server;