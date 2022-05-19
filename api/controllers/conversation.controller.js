const { Op } = require("sequelize");
const db = require('../models');
const Conversation = db.conversation;
const Item = db.item;
const Message = db.message;
const User = db.user;

// Retrieve all conversations belonging to a User
exports.getByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: [ { creatorId: userId }, { receiverId: userId }],
      },
      include:[
        Item, 
        Message, 
        {model: User, as: 'creator'},
        {model: User, as: 'receiver'}
      ]
    });
    return res.json(conversations);
  } catch (err) {
    console.log(err);
    res.status(500).send(err); 
  }
};

// Create a new Conversation and its first message
exports.create = async (req, res) => {
  const { userId, itemId, body } = req.body;
  console.log(itemId)
  try {
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
