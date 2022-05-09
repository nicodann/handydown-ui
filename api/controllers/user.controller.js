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

exports.login = (req,res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log
  User.findOne({
    where: {
      email: email
    }
  })
    .then(user => {
      if (!user) {
        res.status(403).send("Error: this email is not registered.");
      } else if (password !== user.password) {
      // } else if (!bcrypt.compareSync(req.body.password, currentUser.password)) {
        res.status(403).send("Error: the password is incorrect.");
      } else {
        req.session.userID = user.id;
        res.redirect("/");
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "This email is not registered"
      })
    })
}