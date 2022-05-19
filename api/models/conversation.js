'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate(models) {
      models.user.hasMany(Conversation, { foreignKey: 'creatorId' });
      models.user.hasMany(Conversation, { foreignKey: 'receiverId' });
      Conversation.belongsTo(models.user, { as: 'creator', foreignKey: 'creatorId', allowNull: false });
      Conversation.belongsTo(models.user, { as: 'receiver', foreignKey: 'receiverId', allowNull: false });
      models.item.hasMany(Conversation); // FK `itemId` defined in conversations
      Conversation.belongsTo(models.item, { allowNull: false });
    }
  }
  Conversation.init({
  }, {
    sequelize,
    modelName: 'conversation',
  });
  return Conversation;
};