const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "textFiles");

// Middleware to create the textFiles folder if it doesn't exist
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}
const createTextFilesFolder = (req, res, next) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  next();
};
app.use(createTextFilesFolder);

// Endpoint to create a text file with current timestamp
app.post("/createFile", (req, res) => {
  const timestamp = Date.now();
  const fileName = `${timestamp}.txt`;
  const filePath = path.join(folderPath, fileName);
  fs.writeFile(filePath, timestamp.toString(), (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send("File created successfully");
  });
});

// Endpoint to retrieve all text files
app.get("/getAllFiles", (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(files);
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
