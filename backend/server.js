const express = require("express");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("image"), (req, res) => {
  // Access the uploaded file using req.file
  // Process the file (e.g., save to storage, update database)
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
