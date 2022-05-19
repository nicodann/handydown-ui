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
    // Check for existing conversation
    // select * from conversations where itemID = $1, creatorId = $2, receiverId = $3
    // Conversation.findAll({

    // })
    // if query returns empty, then create conversation and then create message
    // if query returns a conversation (value > 0), create message with that conversationId, then update the updatedAt column in the Conversation record

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
