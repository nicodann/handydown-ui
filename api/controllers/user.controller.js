const bcrypt = require('bcrypt');
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op; //maybe use if more routes

exports.create = async (req,res) => {
  //validate
  if (!req.body.username) {
    res.status(400).send({
      message: "User needs a username!"
    });
    return;
  };
  const { username, email, password, location } = req.body;
  //hash password
  const hashedPass = bcrypt.hashSync(password, 10);
  //create
  const user = {
    username,
    email,
    password: hashedPass,
    location
  }
  console.log("User:", User)
  try {
    const data =  await User.create(user);
    res.json(data);
  } catch (err) {
      res.status(500).send({
        message: err.message || "An error occured while creating the User."
      });
  };
};

exports.show = async (req,res) => {
  const id = req.params.id;
  try {
    const data = await User.findByPk(id)
    res.json(data);
  } catch (err) {
      res.status(500).send({
        message: err.message || "An error occured while retrieving user."
      });
  };
};

exports.login = async (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await User.findOne({where: {
        username: username
      }
    })
    if (!user) {
      res.status(403).send("Error: this email is not registered.");
    // } else if (password !== user.password) {
    } else if (!bcrypt.compareSync(password, user.password)) {
      res.status(403).send("Error: the password is incorrect.");
    } else {
      req.session.userID = user.id;
      res.json(user)
      // res.redirect("/");
    }
  } catch (err) {
      res.status(500).send({
        message: err.message || "This username is not registered"
      })
  };
  
};

exports.logout =  (req, res) => {
  try {
    req.session = null;
    res.status(200).send("User is logged out")

  
  } catch (err) {
    res.status(500).send(err.message)
  }
};

// exports.create = (req,res) => {
//   //validate
//   if (!req.body.username) {
//     res.status(400).send({
//       message: "User needs a username!"
//     });
//     return;
//   };
//   const { username, email, password, location } = req.body;
//   //hash password
//   const hashedPass = bcrypt.hashSync(password, 10);
//   //create
//   const user = {
//     username,
//     email,
//     password: hashedPass,
//     location
//   }
//   User.create(user)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: err.message || "An error occured while creating the User."
//       });
//     });
// };

// exports.show = (req,res) => {
//   const id = req.params.id;
//   User.findByPk(id)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: err.message || "An error occured while retrieving user."
//       });
//     });
// };

// exports.login = (req,res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   console.log
//   User.findOne({where: {
//       email: email
//     }
//   })
//     .then(user => {
//       if (!user) {
//         res.status(403).send("Error: this email is not registered.");
//       // } else if (password !== user.password) {
//       } else if (!bcrypt.compareSync(password, user.password)) {
//         res.status(403).send("Error: the password is incorrect.");
//       } else {
//         req.session.userID = user.id;
//         res.redirect("/");
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: err.message || "This email is not registered"
//       })
//     });
  
// };

// exports.logout = (req, res) => {
//   req.session = null;
//   res.redirect("/");
// };