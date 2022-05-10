const db = require('../models');
const Conversation = db.conversations;
const Message = db.messages;

// Create a new message belonging to a conversation with conversationId
const create = async (req, res) => {
  try {
    const { body, conversationId, userId } = req.body;
    const message = await Message.create({
      body,
      conversationId,
      userId
    });

    return res.json(message);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = { create };