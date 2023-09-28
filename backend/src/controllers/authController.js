const { getDb } = require("../config/database");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretkey = process.env.JWT_SECRET_KEY;

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = getDb();
    const userCollection = db.collection("user");
    const user = await userCollection.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: "Invalid email" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.statusCode = 401;
    }
    const accessToken = jwt.sign({ user_id: user._id }, secretkey, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ user_id: user._id }, secretkey);
    res.json({ accessToken, refreshToken, user: user });
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(400).json({ error: "An error occurred" });
  }
};

const registerUser = async (req, res) => {
  const user = req.body;
  try {
    const db = getDb();
    const userCollection = db.collection("user");
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
      role: "",
      status: "Complete",
      gender: user.gender,
      avatar: "",
    };

    const users = await userCollection.insertOne(newUser);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken, user } = req.body;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
  const accessToken = jwt.sign({ user_id: user._id }, secretkey, {
    expiresIn: "1d",
  });
  res.json({ accessToken });
};

module.exports = {
  loginUser,
  registerUser,
  refreshToken,
};
