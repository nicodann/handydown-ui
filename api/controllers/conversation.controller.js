const db = require('../models');
const Conversation = db.conversations;
const Item = db.items;
const Message = db.messages;

// Retrieve all conversations belonging to a User
const getConversationsByUserId = async (req, res) => {
  return 0;
}

// Create a new Conversation and its first message
const createConversation = async (req, res) => {
  try {
    const { userId, itemId, body } = req.body;
    const item = await Item.findByPk(itemId);
    
    const conversation = await Conversation.create({
      creatorId: userId,
      receiverId: item.userId,
      itemId: itemId
    });

    const message = await Message.create({
      body: body,
      conversationId: conversation.id,
      userId: userId
    });

    return res.json(message);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
// Create a new message belonging to conversation with conversationId
const createMessage = async (req, res) => {
  return 0;
};

module.exports = { createConversation };