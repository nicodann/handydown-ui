require('dotenv').config(); 
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

const db = {};

db.Sequelize = Sequelize; // maybe delete
db.sequelize = sequelize;
db.users = require("./user.model.js")(sequelize);
db.items = require("./item.model.js")(sequelize);
db.messages = require("./message.model.js")(sequelize);
db.conversations = require("./conversation.model.js")(sequelize);

db.users.hasMany(db.items);
db.users.hasMany(db.messages);
db.users.belongsToMany(db.conversations, { through: 'usersconversations' });

db.items.belongsTo(db.users);
db.items.hasMany(db.conversations);

db.messages.belongsTo(db.users);
db.messages.hasMany(db.conversations);

db.conversations.belongsToMany(db.users, { through: 'usersconversations' });
db.conversations.belongsTo(db.items);
db.conversations.belongsTo(db.messages);

module.exports = db;