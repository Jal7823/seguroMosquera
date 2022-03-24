const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const { v4:uuidv4 } = require( 'uuid');

// configure
const port = process.env.PORT || 3000;
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

// midelware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + "/public")));
app.use(morgan("dev"));

const uploadDirs = path.join(__dirname, "public/img/uploads")
const storage = multer.diskStorage({
  destination: uploadDirs,
  filename: (req, file, cb, filename) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

// app.use(multer({ storage: storage }).single("image"));

app.use(multer({ storage }).single("imagenes"));

// db
const uri = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.uq1el.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() => {
    console.log(`<==/conect to db ${process.env.DBNAME} /==>`);
  })
  .catch((err) => {
    console.log("Error:", err);
  });

// router
app.use(require("./router/index"));

app.listen(port, (req, res) => {
  console.log("Server up in port", port);
});
