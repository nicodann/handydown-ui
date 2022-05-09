const db = require("../models");
const User = db.users;

exports.login = (req,res) => {
  const email = req.params.email;
  const password = req.params.password;
  User.findAll({
    where: {
      email: email
    }
    })
    .then(user => {

    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "This email is not registered"
      })
    })
}