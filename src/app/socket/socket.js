const { Server } = require("socket.io");

let users = [];
let io;

// User management functions
const addUser = (userEmail, socketId) => {
    if (!users.some(user => user.userEmail === userEmail)) {
        users.push({ userEmail, socketId });
    }
};

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
};

// Initialize Socket.IO
const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173", "https://easy-chat-client.vercel.app"],
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("User Connected", socket.id);

        // Connect user
        socket.on("addUser", (userEmail) => {
            if (userEmail) {
                addUser(userEmail, socket.id);
                io.emit("getUsers", users);
                console.log(users);
            }
        });

        // Disconnect user
        socket.on("disconnect", () => {
            console.log("A user disconnected", socket.id);
            removeUser(socket.id);
            io.emit("getUsers", users);
            console.log(users);
        });
    });
};

// Function to get the io instance
const getIO = () => {
    if (!io) {
        throw new Error("Socket.io is not initialized!");
    }
    return io;
};

// Function to get the current users
const getUsers = () => users;

module.exports = {
    initializeSocket,
    getIO,
    getUsers,
};
