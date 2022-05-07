const db = require("../models");
const User = db.users;
// const Op = db.Sequelize.Op; //maybe use if more routes

exports.create = (req,res) => {
  //validate
  if (!req.body.username) {
    res.status(400).send({
      message: "User needs a username!"
    });
    return;
  }
  const { username, email, password, location } = req.body;
  //create
  const user = {
    username,
    email,
    password,
    location
  }
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while creating the User."
      });
    });
};

exports.show = (req,res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while retrieving user."
      });
    });
};