const { getDb } = require("../config/database");
const { ObjectId } = require("mongodb");

const getAllSkills = async (req, res) => {
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

const getSkillInDomain = async (req, res) => {
  const domain_id = req.params.domain_id;
  try {
    const db = getDb();
    const skillCollection = db.collection("skill");
    const skills = await skillCollection
      .find({ "skill_domain.skill_domain_id": new ObjectId(domain_id) })
      .toArray();
    res.status(200).json(skills);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const createSkill = async (req, res) => {
  const newSkill = req.body;
  try {
    const db = getDb();
    const skillCollection = db.collection("skill");
    const skillCheck = await skillCollection.findOne({
      skill_name: newSkill.skill_name,
    });
    if (skillCheck) {
      res.status(400).json({ error: "Skill already exists" });
      return;
    } else {
      const skill = await skillCollection.insertOne(newSkill);
      res.status(200).json(skill);
    }
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  getAllSkills,
  getSkillInDomain,
  createSkill,
};
