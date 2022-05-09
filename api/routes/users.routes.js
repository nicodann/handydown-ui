module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const router = require("express").Router();

  router.post("/", users.create)

  router.post('/login', users.login)

  // router.post('/logout', users.logout)
  
  router.get("/:id", users.show);

  app.use('/api/users', router);
}