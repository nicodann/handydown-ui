module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const router = require("express").Router();

  router.post("/", users.create);
  
  router.get("/:id", users.show);

  app.use('/api/users', router);
}