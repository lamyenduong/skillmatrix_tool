const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const multer = require("multer");
const apiRoute = require("./src/routes/api");
const { connectToMongoDB, getDb } = require("./src/routes/database");

const app = express();
const port = 8080 || 8081;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
apiRoute(app);
connectToMongoDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
