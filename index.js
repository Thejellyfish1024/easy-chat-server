const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors');
require('dotenv').config();
// const jwt = require('jsonwebtoken')
const app = express()
const port = process.env.port || 5000
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

    app.get('/users', async (req, res) => {
      // console.log('hitting');
      const email = req?.params.email;
      console.log(email);
      const result = await userCollection.findOne({email : email})
      res.send(result);
    })


    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

run().catch(console.dir);
