const { getDb } = require("../config/database");
const { ObjectId } = require("mongodb");

const getFormById = async (req, res) => {
  const form_id = req.params.form_id;
  try {
    const db = getDb();
    const formCollection = db.collection("form");
    const form = await formCollection.findOne({ _id: new ObjectId(form_id) });
    res.status(200).json(form);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getFormOwner = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const db = getDb();
    const formCollection = db.collection("form");
    const forms = await formCollection
      .find({
        "user.user_id": new ObjectId(user_id),
      })
      .toArray();
    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getDomainByFormId = async (req, res) => {
  const form_id = req.params.form_id;
  try {
    const db = getDb();
    const formCollection = db.collection("form");
    const domains = await formCollection
      .aggregate([
        {
          $lookup: {
            from: "form-skill",
            localField: "_id",
            foreignField: "form.form_id",
            as: "domains",
          },
        },
        { $unwind: "$domains" },
        {
          $match: {
            _id: new ObjectId(form_id),
          },
        },
        {
          $replaceRoot: {
            newRoot: "$domains.domain",
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

const getFormParticipants = async (req, res) => {
  const form_id = req.params.form_id;
  try {
    const db = getDb();
    const formCollection = db.collection("form");
    const users = await formCollection
      .aggregate([
        {
          $lookup: {
            from: "form-participant",
            localField: "_id",
            foreignField: "form.form_id",
            as: "participants",
          },
        },
        { $unwind: "$participants" },
        {
          $match: {
            _id: new ObjectId(form_id),
          },
        },
        {
          $replaceRoot: {
            newRoot: "$participants.user",
          },
        },
      ])
      .toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getFormJoinInByUser = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const db = getDb();
    const userCollection = db.collection("user");
    const forms = await userCollection
      .aggregate([
        {
          $lookup: {
            from: "form-participant",
            localField: "_id",
            foreignField: "user.user_id",
            as: "userForm",
          },
        },
        { $unwind: "$userForm" },
        {
          $match: {
            _id: new ObjectId(user_id),
          },
        },
        {
          $lookup: {
            from: "form",
            localField: "userForm.form.form_id",
            foreignField: "_id",
            as: "forms",
          },
        },
        { $unwind: "$forms" },
        {
          $project: {
            _id: 0,
            form_id: "$forms._id",
            form_name: "$forms.form_name",
            form_description: "$forms.form_description",
            create_date: "$forms.create_date",
            user: "$forms.user",
          },
        },
      ])
      .toArray();
    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const createForm = async (req, res) => {
  const reqForm = req.body;
  try {
    const db = getDb();
    const formCollection = db.collection("form");
    const formCheck = await formCollection.findOne({
      form_name: reqForm.form_name,
    });
    if (formCheck) {
      res.status(400).json({ error: "Form name already exists" });
      return;
    } else {
      const newForm = {
        form_name: reqForm.form_name,
        form_description: reqForm.form_description,
        form_deadline: new Date(reqForm.form_deadline),
        create_date: new Date(reqForm.create_date),
        user: {
          user_id: new ObjectId(reqForm.user._id),
          full_name: reqForm.user.full_name,
          email: reqForm.user.email,
          password: reqForm.user.password,
          create_date: new Date(reqForm.user.create_date),
          gender: reqForm.user.gender,
          phone_number: reqForm.user.phone_number,
          role: reqForm.user.role,
          status: reqForm.user.status,
          birthday: reqForm.user.birthday,
          avatar: reqForm.user.avatar,
          team: {
            team_id: new ObjectId(reqForm.user.team.team_id),
            team_name: reqForm.user.team.team_name,
          },
        },
      };
      const form = await formCollection.insertOne(newForm);
      res.status(200).json(form);
    }
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const createFormParticipant = async (req, res) => {
  const reqFp = req.body;
  if (reqFp.form) {
    const newFp = {
      form: {
        form_id: new ObjectId(reqFp.form._id),
        form_name: reqFp.form.form_name,
        form_description: reqFp.form.form_description,
        form_deadline: new Date(reqFp.form.form_deadline),
        create_date: new Date(reqFp.form.create_date),
        user: {
          user_id: new ObjectId(reqFp.form.user.user_id),
          full_name: reqFp.form.user.full_name,
          email: reqFp.form.user.email,
          password: reqFp.form.user.password,
          create_date: new Date(reqFp.form.user.create_date),
          gender: reqFp.form.user.gender,
          phone_number: reqFp.form.user.phone_number,
          role: reqFp.form.user.role,
          status: reqFp.form.user.status,
          birthday: reqFp.form.user.birthday,
          avatar: reqFp.form.user.avatar,
          team: {
            team_id: new ObjectId(reqFp.form.user.team.team_id),
            team_name: reqFp.form.user.team.team_name,
          },
        },
      },
      user: {
        user_id: new ObjectId(reqFp.user._id),
        full_name: reqFp.user.full_name,
        email: reqFp.user.email,
        password: reqFp.user.password,
        create_date: new Date(reqFp.user.create_date),
        gender: reqFp.user.gender,
        phone_number: reqFp.user.phone_number,
        role: reqFp.user.role,
        status: reqFp.user.status,
        birthday: reqFp.user.birthday,
        avatar: reqFp.user.avatar,
        team: {
          team_id: new ObjectId(reqFp.user.team.team_id),
          team_name: reqFp.user.team.team_name,
        },
      },
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
  }
};

const createFormSkill = async (req, res) => {
  const repFs = req.body;
  if (repFs.form) {
    const newFs = {
      form: {
        form_id: new ObjectId(repFs.form._id),
        form_name: repFs.form.form_name,
        form_description: repFs.form.form_description,
        form_deadline: new Date(repFs.form.form_deadline),
        create_date: new Date(repFs.form.create_date),
        user: {
          user_id: new ObjectId(repFs.form.user.user_id),
          full_name: repFs.form.user.full_name,
          email: repFs.form.user.email,
          password: repFs.form.user.password,
          create_date: new Date(repFs.form.user.create_date),
          gender: repFs.form.user.gender,
          phone_number: repFs.form.user.phone_number,
          role: repFs.form.user.role,
          status: repFs.form.user.status,
          birthday: repFs.form.user.birthday,
          avatar: repFs.form.user.avatar,
          team: {
            team_id: new ObjectId(repFs.form.user.team.team_id),
            team_name: repFs.form.user.team.team_name,
          },
        },
      },
      domain: {
        domain_id: new ObjectId(repFs.domain._id),
        domain_name: repFs.domain.domain_name,
      },
    };
    try {
      const db = getDb();
      const fsCollection = db.collection("form-skill");
      const fs = await fsCollection.insertOne(newFs);
      res.status(200).json(fs);
    } catch (error) {
      console.error("Error fetching forms:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  }
};

module.exports = {
  getFormById,
  createForm,
  createFormParticipant,
  createFormSkill,
  getFormOwner,
  getFormParticipants,
  getDomainByFormId,
  getFormJoinInByUser,
};
