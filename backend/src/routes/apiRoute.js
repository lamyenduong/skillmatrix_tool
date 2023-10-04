const express = require("express");
const apiRouter = express.Router();
const {
  getFormById,
  createForm,
  getFormOwner,
  getFormManager,
  getFormParticipants,
  getFormJoinInByUser,
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
  getDomainByFormId,
} = require("../controllers/domainController");
const {
  loginUser,
  registerUser,
  refreshToken,
} = require("../controllers/authController");
const { getAllTeams } = require("../controllers/teamController");

const apiRoute = (app) => {
  //auth
  apiRouter.post("/register", registerUser);
  apiRouter.post("/login", loginUser);
  apiRouter.post("/refresh-token", refreshToken);
  //form
  apiRouter.get("/forms/owner/:user_id", getFormOwner);
  apiRouter.get("/forms/:form_id", getFormById);
  apiRouter.get("/forms/manager/:user_id", getFormManager);
  apiRouter.get("/forms/participants/:form_id", getFormParticipants);
  apiRouter.get("/forms/participants/:user_id", getFormJoinInByUser);
  apiRouter.post("/create-form", createForm);
  //user
  apiRouter.get("/users", getAllUsers);
  apiRouter.get("/users/:user_id", getUserById);
  apiRouter.get("/users/full-name", getUserByName);
  apiRouter.get("/users/email", getUserByEmail);
  //domain
  apiRouter.get("/domains", getAllDomains);
  apiRouter.get("/domains/:domain_id", getDomainById);
  apiRouter.get("/domains/:form_id", getDomainByFormId);
  apiRouter.post("/create-domain", createDomain);
  //team
  apiRouter.get("/teams", getAllTeams);
  //skill
  app.use("/", apiRouter);
};

module.exports = apiRoute;
