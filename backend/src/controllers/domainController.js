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

const getDomainByFormId = async (req, res) => {
  const form_id = req.params.form_id;
  try {
    const db = getDb();
    const domainCollection = db.collection("skill-domain");
    const domains = await domainCollection
      .aggregate([
        {
          $lookup: {
            from: "skill",
            localField: "_id",
            foreignField: "skill_domain.skill_domain_id",
            as: "skills",
          },
        },
        {
          $unwind: "$skills",
        },
        {
          $lookup: {
            from: "form-skill",
            localField: "skills._id",
            foreignField: "skill.skill_id",
            as: "formSkills",
          },
        },
        {
          $unwind: "$formSkills",
        },
        {
          $match: {
            "formSkills.form.form_id": ObjectId(form_id),
          },
        },
        {
          $group: {
            _id: "$_id",
            domain_name: { $first: "$domain_name" },
          },
        },
        {
          $project: {
            _id: 0,
            domain_id: "$_id",
            domain_name: 1,
          },
        },
      ])
      .toArray();
    res.status(200).json(domains);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  getAllDomains,
  getDomainById,
  createDomain,
  getDomainByFormId,
};
