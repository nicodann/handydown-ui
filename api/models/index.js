require('dotenv').config(); 
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
} )

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model.js")(sequelize, Sequelize);
module.exports = db;