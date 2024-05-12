const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { Server } = require("socket.io");
const { createServer } = require("http");
const postMessage = require('./controllers/chats/postMessage');
const getSingleUser = require('./controllers/users/getSingleUser');
const getSpecificChats = require('./controllers/chats/getSpecificChats');
const postNewUser = require('./controllers/users/postNewUser');
const getSearchedUsers = require('./controllers/users/getSearchedUsers');
const postNewContact = require('./controllers/contacts/postNewContact');
const cookieParser = require('cookie-parser');
const { updateUserName, updateUserAbout, updateUserPhone } = require('./controllers/users/updateUserInfo');
const contactRequests = require('./controllers/contacts/contactRequests');
const deleteRequest = require('./controllers/contacts/deleteRequest');
const updateUserImage = require('./controllers/users/updateUserImage');
const deleteMessage = require('./controllers/chats/deleteMessage');

const app = express()
const port = process.env.port || 5000
const server = createServer(app);

// middlewares
app.use(cors({
  origin: ["http://localhost:5173", "https://easy-chat-client.vercel.app"],
  methods: ["GET", "PATCH", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 204,
}))
app.use(express.json())

app.use(cookieParser());

// socket server
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173", "https://easy-chat-client.vercel.app"],
//     methods: ["GET", "PATCH", "POST", "PUT", "DELETE"],
//     credentials: true,
//     optionsSuccessStatus: 204,
//   }
// })

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://easy-chat-client.vercel.app"],
    methods: ["GET", "POST"], // Only GET and POST methods are relevant for WebSocket connections
    credentials: true
  }
});





let users = [];


//Check for duplicate user
const addUser = (userEmail, socketId) => {
  !users?.some(user => user.userEmail === userEmail) &&
    users.push({ userEmail, socketId });
}

//Remove user after disconnect
const removeUser = (socketId) => {
  users = users.filter(user => user.socketId !== socketId);
}


// //Get user 
// const getUser = userEmail => {
//   return users.find(user => user?.userEmail === userEmail);
// }

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  //Connect user
  socket.on("addUser", userEmail => {
    if (userEmail) {
      // console.log(`socket id of ${userEmail} is ${socket?.id}`);
      addUser(userEmail, socket.id);
      // console.log("users", users);
      io.emit("getUsers", users);
    }
  });


  //Disconnect user
  socket.on("disconnect", () => {
    console.log("A user disconnected")
    removeUser(socket.id);
    io.emit("getUsers", users);
  })

})

// io.on("connection", (socket) => {
//   // Handle WebSocket connection
//   console.log("A user connected");

//   // Implement CORS logic here if needed
//   // For example, you can check the origin of the WebSocket connection
//   // and decide whether to allow or reject it based on your requirements
//   const allowedOrigins = ["http://localhost:5173", "https://easy-chat-client.vercel.app"];
//   const origin = socket.handshake.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     // Allow the connection
//     console.log("Connection allowed from origin:", origin);

//     //Connect user
//     socket.on("addUser", userEmail => {
//       if (userEmail) {
//         // console.log(`socket id of ${userEmail} is ${socket?.id}`);
//         addUser(userEmail, socket.id);
//         // console.log("users", users);
//         io.emit("getUsers", users);
//       }
//     });

//     //Disconnect user
//     socket.on("disconnect", () => {
//       console.log("A user disconnected")
//       removeUser(socket.id);
//       io.emit("getUsers", users);
//     })

//   } else {
//     // Reject the connection
//     console.log("Connection rejected for origin:", origin);
//     socket.disconnect(true);
//     return;
//   }

//   // Handle events, etc.
// });






app.get('/', (req, res) => {
  res.send('Hello World!')
})


// const uri = `mongodb+srv://${process?.env.DB_USER}:${process?.env.DB_PASS}@cluster0.s79pxyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

//Database collection
const database = client.db('EasyChatDB');
const userCollection = database.collection('users');
const chatCollection = database.collection('chats');

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // <------ ALL APIS ------->

    // <------ user related api ------->

    app.post("/users", async (req, res) =>
      postNewUser(req, res, userCollection)
    );
    app.put("/update-user-name/:email", async (req, res) =>
      updateUserName(req, res, userCollection)
    );
    app.put("/update-user-about/:email", async (req, res) =>
      updateUserAbout(req, res, userCollection)
    );
    app.put("/update-user-phone/:email", async (req, res) =>
      updateUserPhone(req, res, userCollection)
    );
    app.put("/update-image/:email", async (req, res) =>
      updateUserImage(req, res, userCollection)
    );

    app.get("/users/:email", async (req, res) =>
      getSingleUser(req, res, userCollection)
    );

    app.get("/users-search", async (req, res) =>
      getSearchedUsers(req, res, userCollection)
    );

    // done

    // <------- chat related api ------->

    app.post("/send-message", async (req, res) =>
      postMessage(req, res, chatCollection, io, users)
    );

    app.get("/chats", async (req, res) =>
      getSpecificChats(req, res, chatCollection)
    );
    app.delete("/delete-message/:id", async (req, res) =>
      deleteMessage(req, res, chatCollection)
    );

    // <------- contact related api ------->

    app.post("/add-contact", async (req, res) =>
      postNewContact(req, res, userCollection)
    );
    app.put("/contact-request", async (req, res) =>
      contactRequests(req, res, userCollection)
    );
    app.put("/delete-request/:email", async (req, res) =>
      deleteRequest(req, res, userCollection)
    );

    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

run().catch(console.dir);
