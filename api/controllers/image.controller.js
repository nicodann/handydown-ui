exports.create = async (req, res) => {

  let imageFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e., "imageFile") is used to retrieve the uploaded file
  imageFile = req.files.imageFile;
  uploadPath = __dirname + '/assets/images' + imageFile.name;

  // Use the mv() method to place the file somewhere on your server
  imageFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('File uploaded!');
  });
};