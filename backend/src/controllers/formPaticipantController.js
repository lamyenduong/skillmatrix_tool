const { getDb } = require("../config/database");
const { ObjectId } = require("mongodb");
const { getFormById } = require("./formController");

const createFormParticipant = async (req, res) => {
  const { form_id, user_id } = req.params;
  const form = getFormById(form_id);
  const user = getUserById(user_id);
  const newFp = {
    form: form,
    user: user,
  };
  try {
    const db = getDb();
    const fpCollection = db.collection("form-participant");
    const fp = await fpCollection.insertOne(newFp);
    res.status(200).json(fp);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const addMemberInTeamToForm = async (req, res) => {
  const { form_id, user_id, team_id } = req.params;
  const db = getDb();
  const teamCollection = db.collection("team");
  const checkMemberTeam = await teamCollection.find().toA;
};

module.exports = {
  createFormParticipant,
};
