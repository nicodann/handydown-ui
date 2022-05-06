const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Message = sequelize.define('message', {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  return Message;
};