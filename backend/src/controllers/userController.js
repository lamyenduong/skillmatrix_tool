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

const getUserInTeam = async (req, res) => {
  const team_id = req.params.team_id;
  try {
    const db = getDb();
    const userCollection = db.collection("user");
    const user = await userCollection
      .find({
        "team.team_id": new ObjectId(team_id),
      })
      .toArray();
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const updateUser = async (req, res) => {
  const user_id = req.params.user_id;
  const user = req.body;
  console.log(req.body);
  try {
    const db = getDb();
    const userCollection = db.collection("user");
    const filter = { _id: new ObjectId(user_id) };
    const updateDoc = {
      $set: {
        user_id: new ObjectId(user_id),
        full_name: user.full_name,
        email: user.email,
        password: user.password,
        create_date: new Date(user.create_date),
        gender: user.gender,
        phone_number: user.phone_number,
        role: user.role,
        status: user.status,
        birthday: user.birthday,
        avatar: user.avatar,
        team: user.team,
      },
    };
    const newUser = await userCollection.updateOne(filter, updateDoc);
    res.status(200).json(newUser);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByName,
  getUserByEmail,
  getUserInTeam,
  updateUser,
};
