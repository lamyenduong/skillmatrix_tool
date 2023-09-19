const express = require("express");
const apiRouter = express.Router();
const { getDb } = require("../routes/database");
const ObjectId = require("mongodb").ObjectId;

const apiRoute = (app) => {
  //form
  app.get("/api/forms", async (req, res) => {
    try {
      const db = getDb();
      const formCollection = db.collection("form");
      const forms = await formCollection.find().toArray();
      res.status(200).json(forms);
    } catch (error) {
      console.error("Error fetching forms:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  app.get("/api/forms/:form_id", async (req, res) => {
    const form_id = req.params.form_id;
    try {
      const db = getDb();
      const formCollection = db.collection("form");
      const form = await formCollection.findOne({ _id: ObjectId(form_id) });
      res.status(200).json(form);
      console.log(form);
    } catch (error) {
      console.error("Error fetching forms:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  //user
  app.get("/api/users", async (req, res) => {
    try {
      const db = getDb();
      const userCollection = db.collection("user");
      const users = await userCollection.find().toArray();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching forms:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  //team
  app.get("/api/teams", async (req, res) => {
    try {
      const db = getDb();
      const teamCollection = db.collection("team");
      const teams = await teamCollection.find().toArray();
      res.status(200).json(teams);
    } catch (error) {
      console.error("Error fetching forms:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  //domain
  app.get("/api/domains", async (req, res) => {
    try {
      const db = getDb();
      const domainCollection = db.collection("skill-domain");
      const domains = await domainCollection.find().toArray();
      res.status(200).json(domains);
    } catch (error) {
      console.error("Error fetching forms:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });

  app.use("/", apiRouter);
};

module.exports = apiRoute;
