'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.user, { allowNull: false });
      models.user.hasMany(Message); // FK `userId` defined in Messages table
      models.conversation.hasMany(Message); // FK `conversationId` defined in Messages table
      Message.belongsTo(models.conversation, { allowNull: false });
    }
  }
  Message.init({
    body: {
      type: DataTypes.STRING, 
      alowNull: false
    }
  }, {
    sequelize,
    modelName: 'message',
  });
  return Message;
};