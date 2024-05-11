const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require("http");
const cookieParser = require('cookie-parser');
const userRoutes = require('./app/modules/user/user.routes');

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

// ALL APIS
// <------ user related api ------->
app.use('/users', userRoutes)





//   app.put("/update-user-name/:email", async (req, res) =>
//     updateUserName(req, res, userCollection)
//   );
//   app.put("/update-user-about/:email", async (req, res) =>
//     updateUserAbout(req, res, userCollection)
//   );
//   app.put("/update-user-phone/:email", async (req, res) =>
//     updateUserPhone(req, res, userCollection)
//   );
//   app.put("/update-image/:email", async (req, res) =>
//     updateUserImage(req, res, userCollection)
//   );



//   app.get("/users-search", async (req, res) =>
//     getSearchedUsers(req, res, userCollection)
//   );


module.exports = server;