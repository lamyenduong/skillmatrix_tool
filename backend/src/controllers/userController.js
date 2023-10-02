const { getDb } = require("../config/database");
const { ObjectId } = require("mongodb");
require("dotenv").config();

const getAllUsers = async (req, res) => {
  try {
    const db = getDb();
    const userCollection = db.collection("user");
    const users = await userCollection.find().toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getUserById = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const db = getDb();
    const userCollection = db.collection("user");
    const user = await userCollection.findOne({ _id: new ObjectId(user_id) });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getUserByName = async (req, res) => {
  const full_name = req.body;
  try {
    const db = getDb();
    const userCollection = db.collection("user");
    const user = await userCollection.find().sort({ full_name: full_name });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getUserByEmail = async (req, res) => {
  const email = req.body;
  try {
    const db = getDb();
    const userCollection = db.collection("user");
    const user = await userCollection.find().sort({ email: email });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getManagerByFormId = async (req, res) => {};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByName,
  getUserByEmail,
};
