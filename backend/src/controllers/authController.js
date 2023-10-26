const { getDb } = require("../config/database");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET_KEY;

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
    const accessToken = jwt.sign({ user_id: user._id }, secretKey, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ user_id: user._id }, secretKey, {
      expiresIn: "30d",
    });
    const currentUser = {
      user_id: user._id,
      password: user.password,
      full_name: user.full_name,
      gender: user.gender,
      phone_number: user.phone_number,
      birthday: user.birthday,
      email: user.email,
      status: user.status,
      role: user.role,
      create_date: user.create_date,
      avatar: user.avatar,
      team: user.team,
    };
    res.json({ accessToken, refreshToken, user: currentUser });
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
      return;
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
      avatar:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      team: {
        team_id: user.team.team_id,
        team_name: user.team.team_name,
      },
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
  const accessToken = jwt.sign({ user_id: user._id }, secretKey, {
    expiresIn: "1d",
  });
  res.json({ accessToken });
};

const checkAccessToken = (req, res) => {
  const { accessToken } = req.body;
  if (accessTokenIsValid(accessToken, secretKey)) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
};

function accessTokenIsValid(accessToken, secretKey) {
  try {
    const decodedToken = jwt.verify(accessToken, secretKey);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp && currentTime > decodedToken.exp) {
      return false;
    }
    if (decodedToken.role !== "user") {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  loginUser,
  registerUser,
  refreshToken,
  checkAccessToken,
};
