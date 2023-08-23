const express = require("express");
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ dest: "uploads/", storage: storage });

app.get('/uploads', (req, res) => {
  
  console.log(req.url);
    res.set('Access-Control-Allow-Origin', '*');
  res.send([{ "msg": `${req.url}` }])
  })

  
  app.post('/uploads', upload.single(`image`), (req, res) => {
    console.log(req.file.filename);
    
  // Access the uploaded file using req.file
  // Process the file (e.g., save to storage, update database)
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
