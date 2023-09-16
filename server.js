const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const multer = require("multer");

const app = express();

const dtb_conn =
  "mongodb+srv://lamyenduong:Yen.Duong.2002@lamyenduong.jmhil0n.mongodb.net/?retryWrites=true&w=majority";
const dtb_name = "SkillMatrixTool";
const port = 8080 || 8081;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

MongoClient.connect(dtb_conn)
  .then((client) => {
    const dtb = client.dtb(dtb_name);
    console.log("Connected to MongoDB");
    app.listen(port, host, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
