const path = require('node:path');
const db = require("../models");
const Item = db.item;
const User = db.user;
const Op = db.Sequelize.Op;

//Retrieve all Items from the db or search by name

exports.index = async (req, res) => {
  const name = req.body.name;
  const condition = name ? { name: { [Op.iLike]: `%${name}%`} } : null;
  try {
    const items = await Item.findAll({
      where: condition,
      include: User,
      order: [
        ['id', 'DESC'],
      ]
    })
    res.json(items);
  } catch (err) {
    res.status(499).send({
      message: err.message || "An error occured while retrieving items."
    });
  };
};

exports.show = async (req, res) => {
  console.log(req.params)
  const id = req.params.user_id;
  try {
    const data = await Item.findAll({where:{userId: id} })
    res.json(data);
  } catch (err) {
    res.status(499).send({
      message: err.message || "An error occured while retrieving items."
    });
  };
};

exports.create = async (req, res) => {

  const { name, description, userId, offered } = req.body
  
  let imageFile;
  let uploadPath;

  if (req.files) {
    imageFile = req.files.imageFile;
    uploadPath = path.join(__dirname, '..', 'assets/images', imageFile.name);
    console.log("DIRNAME:::::::::::::::::", __dirname);
    console.log("UPLOAD PATH:::::::::::::::::::::::::::::::::", uploadPath)
    // Use the mv() method to place the file somewhere on your server
    imageFile.mv(uploadPath, function(err) {
      if (err) {
        // return res.status(500).send(err);
        console.log(err);
      }
        console.log("imageFile.name", imageFile.name);
      // res.send('File uploaded!');
    }); 
  }
  

  //validate
  if (!name) {
    res.status(400).send({
      message: "Item needs a name!"
    });
    return;
  }
  //create
  const item = {
    name,
    description,
    userId,
    offered,
    image: imageFile ? `http://localhost:8080/images/${imageFile.name}` : `http://localhost:8080/images/glove2.jpg`
  };
  console.log(Item)
  //save
  try {
    data = await Item.create(item);
    const itemPlusUser = await Item.findByPk(data.dataValues.id, { include: User });
    res.json(itemPlusUser);
  } catch (err) {
      res.status(500).send({
        message: err.message || "An error occured while creating the Item."
      });
  };
};

exports.update = async (req,res) => {
  const id = req.params.id;
  try {
    const num = await Item.update({
        ...req.body
      }, {
        where: { id: id }
      })
    if (num == 1) {
      res.send({
        message: "Item was update successfully."
      });
    } else {
      res.send({
        message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!`
      });
    }
  } catch (err) {
      res.status(500).send({
      message: `Error updating Item with id=${id}.`
      });
  }
};

exports.destroy = async (req, res) => {
  const id = req.params.id;
  try {
    const num =  await Item.destroy({
        where: { id: id }
      })
    if (num == 1) {
      res.send({
        message: "Item was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete item with id=${id}. Maybe item was not found.`
      });
    }
  } catch (err) {
        res.status(500).send({
          message: `Could not delete Item with id=${id}.`
        });
  };
};

// exports.index = (req, res) => {
//   const name = req.query.name;
//   var condition = name ? { name: { [Op.iLike]: `%${name}%`} } : null;
//   Item.findAll({ where: condition })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(499).send({
//         message: err.message || "An error occured while retrieving items."
//       });
//     });
// };


// Create and save a new Item


// exports.create = (req, res) => {
//   //validate
//   if (!req.body.name) {
//     res.status(400).send({
//       message: "Item needs a name!"
//     });
//     return;
//   }
//   //create
//   const item = {
//     name: req.body.name,
//     description: req.body.description,
//     image: req.body.image,
//     userId: req.body.userId,
//     offered: req.body.offered ? true : false
//   };
//   //save
//   Item.create(item)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: err.message || "An error occured while creating the Item."
//       });
//     });
// };

//Find a single Item with an id ?????
// exports.findOne = (req,res) => {

// };

//Update an Item by the id in the request



// exports.update = (req,res) => {
//   const id = req.params.id;
//   Item.update({
//     ...req.body
//   }, {
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Item was update successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//       message: `Error updating Item with id=${id}.`
//       });
//     });
// };

// Delete an Item with the specified id in the request


// exports.destroy = (req, res) => {
//   const id = req.params.id;
//   Item.destroy({
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Item was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete item with id=${id}. Maybe item was not found.`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: `Could not delete Item with id=${id}.`
//       });
//     });
// };