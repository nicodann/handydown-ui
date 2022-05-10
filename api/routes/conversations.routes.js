module.exports = app => {
  const conversations = require("../controllers/conversation.controller.js");
  const router = require("express").Router();
  // Retrieve all conversations belonging to a User
  router.get("/by/user/:userId", conversations.getByUserId);

  // Create a new Conversation and its first message
  router.post("/", conversations.create);

  app.use('/api/conversations', router);
};