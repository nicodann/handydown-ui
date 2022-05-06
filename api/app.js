require('dotenv').config(); 

const express = require('express');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
} )

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
})

// const usersRouter = require('./routes/users');
// const itemsRouter = require('./routes/items');
// const conversationsRouter = require('./routes/conversations');
// const messagesRouter = require('./routes/messages');

const app = express();

app.use(logger('dev')); // log HTTP requests and errors to console
app.use(express.urlencoded({ extended: false })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(cookieSession({ name: 'session', keys: ['key1'] }));

// app.use("/api/v1/users", usersRouter);
// app.use("/api/v1/items", itemsRouter);
// app.use("/api/v1/conversations", conversationsRouter);
// app.use("/api/v1/messages", messagesRouter);

app.get('/', (req, res) => {
  res.json({"message": 'Welcome to the HandyDown'});
 
});

const startApp = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: true })
    console.log('All models have been (re) created!')
    app.listen(process.env.PORT, () => {
      console.log(`HandyDown API listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startApp();


