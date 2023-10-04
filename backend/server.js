const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
require("dotenv").config();
const apiRoute = require("./src/routes/apiRoute");
const { connectToMongoDB, getDb } = require("./src/config/database");

const app = express();
const port = process.env.PORT || 8081;
const host = process.env.HOST;

app.use(
  cors({
    origin: "http://localhost:4200",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

apiRoute(app);
connectToMongoDB();

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
