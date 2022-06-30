// express en port voor het starten van een server
const express = require("express");
const app = express();
const port = 3000;
const helmet = require("helmet");

//package voor het gebruiken van .env
const dotenv = require("dotenv").config();

// packages die je nodig hebt voor het gebruiken van een database, mongodb.
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

// middleware
const path = require("path");

//helmet
app.use(helmet());

// zorgt ervoor dat de ejs files werken en dat er wordt gewerkt met json data
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

// de template engine die ik gebruik, ejs.
app.set("view engine", "ejs");

// het maken van een database variabele zodat ik die overal kan opvragen.
let db;

// startpagina
app.get("/", (req, res) => {
  res.send("Hallo");
});

app.get("/users", async (req, res) => {
  const options = { sort: { name: 1 } };
  const users = await db.collection("users").find({}, options).toArray();
  res.render("users.ejs", { users });
});

app.get("/users/:userId/", async (req, res) => {
  const query = { _id: ObjectId(req.params.userId) };
  const user = await db.collection("users").findOne(query);
  res.render("userprofile.ejs", { user });
});

app.get("/users/:userId/edit", async (req, res) => {
  const query = { _id: ObjectId(req.params.userId) };
  const user = await db.collection("users").findOne(query);

  res.render("edituserprofile.ejs", { user });
});

app.post("/users/:userId/edit", async (req, res) => {
  const user = await db.collection("users").updateOne(
    { _id: ObjectId(req.body.userId) },
    {
      $set: {
        _id: ObjectId(req.body.userId),
        country: req.body.country,
        city: req.body.city,
        phone: req.body.phone,
        dob: req.body.dob,
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
      },
    }
  );
  res.render("userprofile.ejs", { user: req.body });
});

// error 404 pagina, wanneer je naar een link gaat die niet bestaat
app.use("", (req, res, next) => {
  res.status(404).send("Page not found");
});

// verbinding maken met de database
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

// starten van de database
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);

  console.log(process.env.TESTVAR);
  connectDB().then(console.log("we have a connection to mongo"));
});
