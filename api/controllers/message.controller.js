const db = require('../models');
const Conversation = db.conversation;
const Message = db.message;

// Create a new message belonging to a conversation with conversationId
exports.create = async (req, res) => {
  const { body, conversationId, userId } = req.body;
  try {
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
