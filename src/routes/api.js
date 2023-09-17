const express = require("express");
const apiRouter = express.Router();
const { getDb } = require("../routes/database");

const apiRoute = (app) => {
  //get
  app.get("/api/forms", async (req, res) => {
    try {
      const db = getDb();
      const collection = db.collection("form");
      const forms = await collection.find().toArray();
      res.status(200).json(forms);
    } catch (error) {
      console.error("Error fetching forms:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });

  //post

  //put or patch

  //delete

  app.use("/", apiRouter);
};

module.exports = apiRoute;
