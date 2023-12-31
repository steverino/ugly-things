const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require('fs');
const path = require('path');

const corsOptions = {
  origin: "http://localhost:3000",
};
const app = express();

app.use(cors(corsOptions));


// setup multer for file upload
var storage = multer.diskStorage(
  {
      destination: '../public/images',
      filename: function (req, file, cb ) {
          cb( null, file.originalname);
      }
  }
);

const upload = multer({ storage: storage } )

app.use(express.json());
// serving front end build files
app.use(express.static(__dirname + "../public/images"));

fs.readdir('../public/images',(err,files)=>{
  if(err)throw err;
  // console.log(files);
  files.forEach(file => {
    const filePath = path.join('../public/images',file);
    console.log(filePath);
  })
})

app.get('/uploads', function (req,res){
// console.log(`../public/images/${req.file}`);
  res.send('test')
})

// route for file upload
app.post("/api/uploadfile", upload.single('myFile'), (req, res, next) => {
  
    console.log(req.file.originalname + " file successfully uploaded !!");

  res.sendStatus(200);
});

app.delete(`/api/delete/`,(req)=>{//req is being sent from axios delete {data:{imageName}}
  console.log(req.body.imageName);
  
  fs.unlink(`../public/${req.body.imageName}`,(err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File deleted successfully');
  });
  
} );

app.listen(5000, () => console.log("Listening on port 5000"));