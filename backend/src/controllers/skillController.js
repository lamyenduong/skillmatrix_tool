const { getDb } = require("../config/database");
const { ObjectId } = require("mongodb");

const getAllSkill = async (req, res) => {
  try {
    const db = getDb();
    const skillCollection = db.collection("skill");
    const skills = await skillCollection.find().toArray();
    res.status(200).json(skills);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getSkillByFormId = async (req, res) => {};

module.exports = {
  getAllSkill,
};
