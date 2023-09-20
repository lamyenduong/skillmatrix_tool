const express = require("express");
const apiRouter = express.Router();
const { getDb } = require("../routes/database");
const { ObjectId } = require("mongodb");

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
      const form = await formCollection.findOne({ _id: new ObjectId(form_id) });
      res.status(200).json(form);
    } catch (error) {
      console.error("Error fetching forms:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  app.post("/api/create-form", async (req, res) => {
    const form_name = req.body.form_name;
    const form_description = req.body.form_description;
    const form_deadline = req.body.form_deadline;
    const create_date = new Date(Date.now());
    const user = "";
    try {
      const db = getDb();
      const formCollection = db.collection("form");
      const form = formCollection.insert({
        _id: new ObjectId(),
        form_name: form_name,
        form_description: form_description,
        form_deadline: form_deadline,
        create_date: create_date,
        user: Object(user),
      });
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
  //skill
  //skill-domain
  //form-skill
  app.get("/api/form-skill", async (req, res) => {
    try {
      const db = getDb();
      const formSkillCollection = db.collection("form-skill");
      const formSkills = await formSkillCollection.find().toArray();
      res.status(200).json(formSkills);
    } catch (error) {
      console.error("Error fetching forms:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  app.get("/api/form-skill/:form_id", async (req, res) => {
    const form_id = req.params.form_id;
    try {
      const db = getDb();
      const formSkillCollection = db.collection("form-skill");
      const formSkill = await formSkillCollection.findOne({
        "form.form_id": new ObjectId(form_id),
      });
      res.status(200).json(formSkill);
    } catch (error) {
      console.error("Error fetching forms:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  //form-participant
  //project
  //notification

  app.use("/", apiRouter);
};

module.exports = apiRoute;
