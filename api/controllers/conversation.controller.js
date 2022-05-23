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
      ],
      order: [
        ['updatedAt', 'DESC'],
      ]
    });
    return res.json(conversations);
  } catch (err) {
    console.log(err);
    res.status(500).send(err); 
  }
};

exports.markAsRead = async (req,res) => {
  const convId = req.params.conversationId;
  try {
    const result = await Conversation.update(
      {read: true},
      {where: {id: convId}}
    )
    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
