const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());

const CONNECTION_STRING =
  "mongodb+srv://lamyenduong:0123456789@lamyenduong.jmhil0n.mongodb.net/?retryWrites=true&w=majority";

const DATABASE_NAME = "SkillMatrixTool";
