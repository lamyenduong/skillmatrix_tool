const express = require("express");
const apiRouter = express.Router();
const {
  getFormById,
  createForm,
  getFormOwner,
  getFormManager,
  getFormParticipants,
} = require("../controllers/formController");
const {
  getAllUsers,
  getUserById,
  getUserByName,
  getUserByEmail,
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
  getUserInfo,
} = require("../controllers/authController");
const { getAllTeams } = require("../controllers/teamController");
const {
  createFormParticipant,
} = require("../controllers/formPaticipantController");

const apiRoute = (app) => {
  //auth
  apiRouter.post("/register", registerUser);
  apiRouter.post("/login", loginUser);
  apiRouter.post("/refresh-token", refreshToken);
  // apiRouter.get("/after-login", getUserInfo);
  //form
  apiRouter.get("/forms/owner/:user_id", getFormOwner);
  apiRouter.get("/forms/:form_id", getFormById);
  apiRouter.get("/forms/manager/:user_id", getFormManager);
  apiRouter.get("/forms/participants/:user_id", getFormParticipants);
  apiRouter.post("/create-form", createForm);
  //user
  apiRouter.get("/users", getAllUsers);
  apiRouter.get("/users/:user_id", getUserById);
  apiRouter.get("/users/full-name", getUserByName);
  apiRouter.get("/users/email", getUserByEmail);
  //domain
  apiRouter.get("/domains", getAllDomains);
  apiRouter.get("/domains/:domain_id", getDomainById);
  apiRouter.post("/create-domain", createDomain);
  //team
  apiRouter.get("/teams", getAllTeams);
  //form participant
  apiRouter.post("/participants", createFormParticipant);
  //skill
  app.use("/", apiRouter);
};

module.exports = apiRoute;
