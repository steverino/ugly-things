const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require('fs');

const corsOptions = {
  origin: "http://localhost:3000",
};
const app = express();

app.use(cors(corsOptions));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
    
  },
});
const upload = multer({ dest: "uploads/", storage: storage });

let uglyImages = [];

app.get("/uploads", (req, res) => {
  res.send(uglyImages);
  //   res.set('Access-Control-Allow-Origin', '*');
  // res.send([{ "msg": `${req.url}` }])
});

app.post("/uploads", upload.single(`image`), (req, res) => {
  const imageName = req.file.filename;
  
  if (!fs.existsSync('data.json')) {
    //create new file if not exist
    fs.closeSync(fs.openSync('data.json', 'w'));
}
  
  myArray=[]
  newData = {title: imageName, picUrl: `/uploads/${imageName}`}

  const file = fs.readFileSync('data.json')
  console.log(file.toString());
  if (file.length == 0) {
    //add data to json file
    fs.writeFileSync("data.json", JSON.stringify(newData))
} else {
    //append data to jso file
    const json = JSON.parse(file.toString())
    //add json element to json object
    json.push(newData);
    fs.writeFileSync("data.json", JSON.stringify(newData))
}
  
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
