const express = require("express");
const apiRouter = express.Router();
const {
  getFormById,
  createForm,
  getFormOwner,
  getFormParticipants,
  getDomainByFormId,
  getFormJoinInByUser,
  createFormParticipant,
  createFormSkill,
} = require("../controllers/formController");
const {
  getAllUsers,
  getUserById,
  getUserByName,
  getUserByEmail,
  getUserInTeam,
  updateUser,
} = require("../controllers/userController");
const {
  getAllDomains,
  getDomainById,
  createDomain,
} = require("../controllers/domainController");
const {
  loginUser,
  registerUser,
  refreshToken,
} = require("../controllers/authController");
const { getAllTeams } = require("../controllers/teamController");
const {
  getSkillInDomain,
  getAllSkills,
} = require("../controllers/skillController");

const apiRoute = (app) => {
  //auth
  apiRouter.post("/register", registerUser);
  apiRouter.post("/login", loginUser);
  apiRouter.post("/refresh-token", refreshToken);
  //form
  apiRouter.get("/forms/owner/:user_id", getFormOwner);
  apiRouter.get("/forms/:form_id", getFormById);
  apiRouter.get("/forms/participants/:form_id", getFormParticipants);
  apiRouter.get("/forms/participant/:user_id", getFormJoinInByUser);
  apiRouter.get("/forms/domains/:form_id", getDomainByFormId);
  apiRouter.post("/create-form", createForm);
  apiRouter.post("/create-formparticipant", createFormParticipant);
  apiRouter.post("/create-formskill", createFormSkill);
  //user
  apiRouter.get("/users", getAllUsers);
  apiRouter.get("/users/:user_id", getUserById);
  apiRouter.get("/users/full-name", getUserByName);
  apiRouter.get("/users/email", getUserByEmail);
  apiRouter.get("/users/team/:team_id", getUserInTeam);
  apiRouter.patch("/user/profile/:user_id", updateUser);
  //domain
  apiRouter.get("/domains", getAllDomains);
  apiRouter.get("/domains/:domain_id", getDomainById);
  apiRouter.post("/create-domain", createDomain);
  //team
  apiRouter.get("/teams", getAllTeams);
  //skill
  apiRouter.get("/skills", getAllSkills);
  apiRouter.get("/skills/:domain_id", getSkillInDomain);
  app.use("/api", apiRouter);
};

module.exports = apiRoute;
