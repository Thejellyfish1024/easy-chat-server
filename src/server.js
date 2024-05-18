require("dotenv").config();
const mongoose = require("mongoose");
const server = require("./app");
const { Server } = require("socket.io");
const { initializeSocket } = require("./app/socket/socket");
const port = process.env.PORT || 5000;


async function main() {
    try {

        // connect database
        await mongoose.connect(process.env.DB_URI, { dbName: process.env.DB_NAME })
        console.log("Connected to the database successfully!");

        initializeSocket(server);

        // socket
        // const io = new Server(server, {
        //     cors: {
        //         origin: ["http://localhost:5173", "https://easy-chat-client.vercel.app"],
        //         methods: ["GET", "POST"], // Only GET and POST methods are relevant for WebSocket connections
        //         credentials: true
        //     }
        // });

        // let users = [];


        // //Check for duplicate user
        // const addUser = (userEmail, socketId) => {
        //     !users?.some(user => user.userEmail === userEmail) &&
        //         users.push({ userEmail, socketId });
        // }

        // //Remove user after disconnect
        // const removeUser = (socketId) => {
        //     users = users.filter(user => user.socketId !== socketId);
        // }
        
        // io.on("connection", (socket) => {
        //     console.log("User Connected", socket.id);

        //     //Connect user
        //     socket.on("addUser", userEmail => {
        //         if (userEmail) {
        //             // console.log(`socket id of ${userEmail} is ${socket?.id}`);
        //             addUser(userEmail, socket.id);
        //             // console.log("users", users);
        //             io.emit("getUsers", users);
        //         }
        //     });


        //     //Disconnect user
        //     socket.on("disconnect", () => {
        //         console.log("A user disconnected")
        //         removeUser(socket.id);
        //         io.emit("getUsers", users);
        //     })

        // })

        server.listen(port, () => {
            console.log(`server is running on ${port}`);
        });

    } catch (error) {
        console.log("Error :", error);
    }
}
main();



