const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.port || 5000
const { Server } = require("socket.io");
const { createServer } = require("http");
const server = createServer(app);

// socket server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "PATCH", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 204,
  }
})

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);
})

// middlewares
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "PATCH", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 204,
}))
app.use(express.json())



app.get('/', (req, res) => {
  res.send('Hello World!')
})


const uri = `mongodb+srv://${process?.env.DB_USER}:${process?.env.DB_PASS}@cluster0.s79pxyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//Database collection
const database = client.db('EasyChatDB');
const userCollection = database.collection('users');
const chatCollection = database.collection('chats');

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // APIS

    // user related api
    app.post('/users', async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      res.send(result)
    })

    app.post('/send-message', async (req, res) => {
      // console.log("hitting");
      const newMessage = req.body;
      // console.log(newMessage);
      const result = await chatCollection.insertOne(newMessage);
      res.send(result)
    })

    app.get('/users/:email', async (req, res) => {
      // console.log('hitting');
      const email = req?.params.email;
      // console.log(email);
      const result = await userCollection.findOne({ email: email })
      res.send(result);
    })


    app.get('/chats', async (req, res) => {
      console.log('hitting');
      const { sender, receiver } = req?.query
      console.log(sender, receiver);
      const result = await chatCollection.find({
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender }
        ]
      }).toArray();
      res.send(result);
    })


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
