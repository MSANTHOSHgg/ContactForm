// require('dotenv').config();
// const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ContactModel = require("./models/Contact");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose
    .connect("mongodb://localhost:27017/ContactForm")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB:", err));

app.post("/contactform", (req, res) => {
    ContactModel.create(req.body)
        .then((feedback) => res.json(feedback))
        .catch((err) => res.status(500).json("Error occurred: " + err.message));
});

app.listen(3001, () => {
    console.log("Server is running successfully on port 3001");
  });