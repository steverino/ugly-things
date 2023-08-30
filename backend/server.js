// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const fs = require('fs');

// const corsOptions = {
//   origin: "http://localhost:3000",
// };
// const app = express();

// app.use(cors(corsOptions));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
    
//   },
// });
// const upload = multer({ dest: "uploads/", storage: storage });

// let uglyImages = [];

// app.get("/uploads", (req, res) => {
//   res.send(uglyImages);
//   //   res.set('Access-Control-Allow-Origin', '*');
//   // res.send([{ "msg": `${req.url}` }])
// });

// app.post("/uploads", upload.single(`image`), (req, res) => {
//   const imageName = req.file.filename;
  
//   if (!fs.existsSync('data.json')) {
//     //create new file if not exist
//     fs.closeSync(fs.openSync('data.json', 'w'));
// }
  
//   myArray=[]
//   newData = {title: imageName, picUrl: `/uploads/${imageName}`}

//   const file = fs.readFileSync('data.json')
//   console.log(file.toString());
//   if (file.length == 0) {
//     //add data to json file
//     fs.writeFileSync("data.json", JSON.stringify(newData))
// } else {
//     //append data to jso file
//     const json = JSON.parse(file.toString())
//     //add json element to json object
//     json.push(newData);
//     fs.writeFileSync("data.json", JSON.stringify(newData))
// }
  
// });

// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });


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
console.log(req.params);
  res.send('test')
})

// route for file upload
app.post("/api/uploadfile", upload.single('myFile'), (req, res, next) => {
  console.log(req.file.originalname + " file successfully uploaded !!");
  res.sendStatus(200);
});

app.listen(5000, () => console.log("Listening on port 5000"));
///////////////////////////////////////////////////////////////////////

