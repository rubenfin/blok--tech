// express en port voor het starten van een server
const express = require('express')
const app = express()
const port = 3000

//package voor het gebruiken van .env
const dotenv = require("dotenv").config();
const path = require('path');

// packages die je nodig hebt voor het gebruiken van een database, mongodb.
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");


// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")))

// de template engine die ik gebruik, ejs.
app.set("view engine", "ejs");



// het maken van een database variabele zodat ik die overal kan opvragen.
let db;

app.get('/', (req, res) => {
  res.send("Hallo")
})

app.get('/users', async (req, res) => {
  const options = { sort: { name: 1 } };
  const users = await db.collection("users").find({}, options).toArray();
  // RENDER PAGE
  const title = users.length == 0 ? "No movies were found" : "Movies";
  res.render('users.ejs', { users })
})

/* work in progress.
app.get('/users/:userId', (req, res) => {
  res.redirect('/users/:userId/:name')
}) */


app.get('/users/:userId/:name', async (req, res) => {
  const query = { _id: ObjectId(req.params.userId) };
  const users = await db.collection("users").findOne(query);
  // RENDER PAGE
  const title = users.length == 0 ? "No users were found" : "Users";

  res.render('userprofile.ejs', { users })
})

async function connectDB() {
  const uri = process.env.DB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    UseUnifiedTopology: true,
  });
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
  } catch (error) {
    throw error;
  }
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);

  
  console.log(process.env.TESTVAR);
  connectDB().then(console.log("we have a connection to mongo"));
})