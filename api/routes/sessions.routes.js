module.exports = app => {
  const users = require("../controllers/session.controller.js");
  const router = require("express").Router();

  router.post('/login', sessions.login)

  router.post('/logout', sessions.logout)

  app.use('/api/sessions', router)
}