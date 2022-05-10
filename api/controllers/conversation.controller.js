const { Op } = require("sequelize");
const db = require('../models');
const Conversation = db.conversations;
const Item = db.items;
const Message = db.messages;

// Retrieve all conversations belonging to a User
const getByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("USER ID", userId)
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: [ { creatorId: userId }, { receiverId: userId }],
      },
      include: Message, 
    });
    return res.json(conversations);
  } catch (err) {
    console.log(err);
    res.status(500).send(err); 
  }
};

// Create a new Conversation and its first message
const create = async (req, res) => {
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

module.exports = { getByUserId, create };