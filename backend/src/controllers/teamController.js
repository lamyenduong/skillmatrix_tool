const { getDb } = require("../config/database");
const { ObjectId } = require("mongodb");

const getAllTeams = async (req, res) => {
  try {
    const db = getDb();
    const teamCollection = db.collection("team");
    const teams = await teamCollection.find().toArray();
    res.status(200).json(teams);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getTeamById = async (req, res) => {
  const domain_id = req.params.domain_id;
  try {
    const db = getDb();
    const domainCollection = db.collection("skill-domain");
    const domain = await domainCollection.findOne({
      _id: new ObjectId(domain_id),
    });
    res.status(200).json(domain);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  getAllTeams,
};
