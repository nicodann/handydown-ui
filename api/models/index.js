require('dotenv').config(); 
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model.js")(sequelize, DataTypes);
db.items = require("./item.model.js")(sequelize, DataTypes);
db.messages = require("./message.model.js")(sequelize, DataTypes);
db.conversations = require("./conversation.model.js")(sequelize, DataTypes);

db.users.hasMany(db.items);
db.users.hasMany(db.messages);
db.users.belongsToMany(db.conversations, { through: 'usersconversations' });

db.items.belongsTo(db.users);
db.items.hasMany(db.conversations);

db.messages.belongsTo(db.users);
db.messages.belongsTo(db.conversations);

db.conversations.belongsToMany(db.users, { through: 'usersconversations' });
db.conversations.belongsTo(db.items);
db.conversations.hasMany(db.messages);

module.exports = db;