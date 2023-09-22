const express = require("express");
const apiRouter = express.Router();
const { getDb } = require("../routes/database");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();

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
      const form = formCollection.insertOne({
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
  app.post("/api/users", async (req, res) => {
    const user = req.body;
    const checkExistMail = await userCollection.findOne({
      email: user.email,
    });
    if (checkExistMail) {
      res.status(409).json({ message: "Mail already exists" });
    }
    const hashPassword = await bcrypt.hashSync(user.password, salt);
    const newUser = {
      full_name: user.full_name,
      email: user.email,
      phone_number: user.phone_number,
      birthday: user.birthday,
      password: hashPassword,
      create_date: new Date(Date.now()),
      role: "Contractor",
      status: "",
      gender: user.gender,
      avatar: "",
    };
    try {
      const db = getDb();
      const userCollection = db.collection("user");
      const users = await userCollection.insertOne(newUser);
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching forms:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const db = getDb();
      const userCollection = db.collection("user");
      const user = await userCollection.findOne({ email });
      if (!user) {
        res.json({ message: "Invalid email" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.json({ message: "Invalid password" });
      }
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      res.json({ token });
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
