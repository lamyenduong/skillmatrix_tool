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
      const forms = await formCollection.findOne({ _id: ObjectId(form_id) });
      res.status(200).json(forms);
    } catch (error) {
      console.error("Error fetching forms:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  app.get("", async (req, res) => {
    const form_id = req.params.form_id;
    try {
      const db = getDb();
      const formCollection = db.collection("form");
      const formParticipantCollection = db.collection("form-participant");
      const participants = await formParticipantCollection
        .aggregate([
          {
            $match: { "form.form_id": form_id },
          },
          {
            $lookup: {
              from: "user",
              localField: "user.user_id",
              foreignField: "user_id",
              as: "participant_user",
            },
          },
          {
            $unwind: "$participant_user",
          },
          {
            $project: {
              _id: 0,
              "participant_user.user_name": 1,
            },
          },
        ])
        .toArray();
      res.status(200).json(participants);
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

  app.use("/", apiRouter);
};

module.exports = apiRoute;
