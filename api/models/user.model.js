const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
