const { getDb } = require("../config/database");
const { ObjectId } = require("mongodb");

const getFormSkill = async (req, res) => {
  const form_id = req.params.form_id;
  try {
    const db = getDb();
    const formSkillCollection = db.collection("form-skill");
    const formSkill = await formSkillCollection
      .find({
        "form.form_id": new ObjectId(form_id),
      })
      .toArray();
    res.status(200).json(formSkill);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  getFormSkill,
};
