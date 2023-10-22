const { getDb } = require("../config/database");
const { ObjectId } = require("mongodb");

const getAllDomains = async (req, res) => {
  try {
    const db = getDb();
    const domainCollection = db.collection("skill-domain");
    const domains = await domainCollection.find().toArray();
    res.status(200).json(domains);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getDomainById = async (req, res) => {
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

const createDomain = async (req, res) => {
  const newDomain = req.body;
  try {
    const db = getDb();
    const domainCollection = db.collection("skill-domain");
    const domain = await domainCollection.insertOne(newDomain);
    res.status(200).json(domain);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  getAllDomains,
  getDomainById,
  createDomain,
};
