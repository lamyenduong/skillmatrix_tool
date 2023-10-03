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

const createForm = async (req, res) => {
  const reqForm = req.body;
  //logic here
  const newForm = {
    form_name: reqForm.form_name,
    form_description: reqForm.form_description,
    form_deadline: new Date(reqForm.form_deadline),
    create_date: new Date(reqForm.create_date),
    user: (reqForm.user = {
      user_id: reqForm.user._id,
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
    }),
  };
  try {
    const db = getDb();
    const formCollection = db.collection("form");
    const form = await formCollection.insertOne(newForm);
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

const getFormManager = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const db = getDb();
    const formCollection = db.collection("form");
    const forms = await formCollection.aggregate([
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
        $lookup: {
          from: "user",
          localField: "participants.user.user_id",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $unwind: "$users",
      },
      {
        $match: {
          "user.user_id": ObjectId(user_id),
        },
      },
      {
        $project: {
          _id: 0,
          form: "$$ROOT",
        },
      },
    ]);
    res.status(200).json(forms);
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
          $project: {
            _id: 0,
            f: "$participants.user",
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

module.exports = {
  getFormById,
  createForm,
  getFormOwner,
  getFormManager,
  getFormParticipants,
};
