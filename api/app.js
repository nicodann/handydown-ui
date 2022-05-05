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
app.use(express.urlencoded({ extended: false })); // allow HTML form data on POST or PUT/UPDATE 
app.use(cookieSession({ name: 'session', keys: ['key1'] }));

// app.use("/api/v1/users", usersRouter);
// app.use("/api/v1/items", itemsRouter);
// app.use("/api/v1/conversations", conversationsRouter);
// app.use("/api/v1/messages", messagesRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the HandyDown API!');
});

app.listen(process.env.PORT, () => {
  console.log(`HandyDown API listening on port ${process.env.PORT}`);
});
