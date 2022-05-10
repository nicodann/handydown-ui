require('dotenv').config();

const express = require('express');
const cookieSession = require('cookie-session');
const logger = require('morgan');

const app = express();

app.use(logger('dev')); // log HTTP requests and errors to console
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(cookieSession({ name: 'session', keys: ['key1'] }));

const db = require("./models");
// db.sequelize.sync({ force: true }).then(() => {
  //   console.log("Drop and re-sync db.");
  // });

//require routes here after app is defined?
require("./routes/items.routes")(app);
require("./routes/users.routes")(app);
require("./routes/conversations.routes")(app)

app.get('/', (req, res) => {
  res.json({"message": 'Welcome to the HandyDown API'});
 
});

const startApp = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await db.sequelize.sync({ force: true })
    // await db.sequelize.sync()
    console.log('All models have been (re)created!')
    app.listen(process.env.PORT, () => {
      console.log(`HandyDown API listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startApp();


