require('dotenv').config();

const express = require('express');
const cookieSession = require('cookie-session');
const logger = require('morgan');


// const usersRouter = require('./routes/users');
// const itemsRouter = require('./routes/items');
// const conversationsRouter = require('./routes/conversations');
// const messagesRouter = require('./routes/messages');

const app = express();


app.use(logger('dev')); // log HTTP requests and errors to console
app.use(express.json({ extended: false })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(cookieSession({ name: 'session', keys: ['key1'] }));


// app.use("/api/v1/users", usersRouter);
// app.use("/api/v1/items", itemsRouter);
// app.use("/api/v1/conversations", conversationsRouter);
// app.use("/api/v1/messages", messagesRouter);

const db = require("./models");
// db.sequelize.sync({ force: true }).then(() => {
  //   console.log("Drop and re-sync db.");
  // });

//require routes here after app is defined?
require("./routes/items.routes")(app);
require("./routes/users.routes")(app);

app.get('/', (req, res) => {
  res.json({"message": 'Welcome to the HandyDown API'});
 
});

const startApp = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
    // await db.sequelize.sync({ force: true })
    await db.sequelize.sync()
    console.log('All models have been (re)created!')
    app.listen(process.env.PORT, () => {
      console.log(`HandyDown API listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startApp();


