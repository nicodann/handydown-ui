module.exports = app => {
  const conversations = require("../controllers/conversation.controller.js");
  const router = require("express").Router();
  // Retrieve all conversations belonging to a User
  // router.get("/by/user/:userId", conversations.getConversationsByUserId);
  // Create a new Conversation and its first message
  router.post("/", conversations.createConversation);
  // Create a new message belonging to conversation with conversationId
  // router.post("/:id/messages", conversations.createMessage)

  app.use('/api/conversations', router);
};