// express en port voor het starten van een server
const express = require('express')
const app = express()
const port = 3000

//package voor het gebruiken van .env
const dotenv = require("dotenv").config();

// packages die je nodig hebt voor het gebruiken van een database, mongodb.
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const { resourceUsage } = require('process');

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// de template engine die ik gebruik, ejs.
app.set("view engine", "ejs");



// het maken van een database variabele zodat ik die overal kan opvragen.
let db;

app.get('/', (req, res) => {
  res.send("Hallo")
})

app.get('/user/:name', async (req, res) => {
  const query = { name: req.params.name };
  const user = await db.collection("users").findOne(query);
  res.render('index.ejs', { user })
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
  console.log(`Example app listening on port ${port}`)

  
  console.log(process.env.TESTVAR);
  connectDB().then(console.log("we have a connection to mongo"));
})