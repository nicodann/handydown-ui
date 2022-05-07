module.exports = app => {
  const items = require("../controllers/item.controller.js");
  const router = require("express").Router();
  // Create a new Item
  router.post("/", items.create);
  // Retrieve all items
  router.get("/", items.findAll);
  // Retrieve all published items
  // router.get("/published", items.findAllPublished);
  // Retrieve a single Item with id
  // router.get("/:id", items.findOne);
  // Update a Item with id
  router.put("/:id", items.update);
  // Delete a Item with id
  router.delete("/:id", items.delete);
  // Create a new Item

  app.use('/api/items', router);
};