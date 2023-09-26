const { getDb } = require("../config/database");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

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

const registerUser = async (req, res) => {
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

module.exports = {
  getAllUsers,
  registerUser,
  getUserById,
  getUserByName,
  getUserByEmail,
};
