const express = require("express");
const apiRouter = express.Router();
const {
  getFormById,
  createForm,
  getFormOwner,
  getFormManager,
} = require("../controllers/formController");
const {
  getAllUsers,
  registerUser,
  getUserById,
  getUserByName,
  getUserByEmail,
  loginUser,
} = require("../controllers/userController");
const {
  getAllDomains,
  getDomainById,
  createDomain,
} = require("../controllers/domainController");

const apiRoute = (app) => {
  //form
  apiRouter.get("/forms/owner/:user_id", getFormOwner);
  apiRouter.get("/forms/:form_id", getFormById);
  apiRouter.get("/forms/manager/:user_id", getFormManager);
  apiRouter.post("/create-form", createForm);
  //user
  apiRouter.get("/users", getAllUsers);
  apiRouter.get("/users/:user_id", getUserById);
  apiRouter.get("/users/full-name", getUserByName);
  apiRouter.get("/users/email", getUserByEmail);
  apiRouter.post("/create-user", registerUser);
  apiRouter.post("/login", loginUser);
  //domain
  apiRouter.get("/domains", getAllDomains);
  apiRouter.get("/domains/:domain_id", getDomainById);
  apiRouter.post("/create-domain", createDomain);

  app.use("/", apiRouter);
};

module.exports = apiRoute;
