module.exports = app => {
  const images = require("../controllers/image.controller.js");
  const router = require("express").Router();
  
  // Upload an image
  router.post("/", images.create);

  app.use('/api/images', router);
};
