module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('conversation', 
    {
      receiverId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
      },
      senderId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    }
  );
  return Conversation;
};