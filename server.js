const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express(cors());

const dtb_conn =
  "mongodb+srv://lamyenduong:0123456789@lamyenduong.jmhil0n.mongodb.net/?retryWrites=true&w=majority";
const dtb_name = process.env.DATABASE_NAME;
const port = process.env.PORT || 5799;
const host = process.env.HOST;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

MongoClient.connect(dtb_conn, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  const dtb = client.dtb(dtb_name);
  console.log("Connected to MongoDB");
});

app.listen(port, host);
