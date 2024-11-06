require('dotenv').config();
const nodemailer = require('nodemailer');
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

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP connection error:', error);
    } else {
        console.log('SMTP server is ready to take messages');
    }
});

app.post("/contactform", async (req, res) => {
    try {
        const contact = await ContactModel.create(req.body);

        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: req.body.email, 
            subject: 'Contact Form Submission',
            text: `Hello ${req.body.name},\n\nThank you for reaching out to us! We’ve received your message and will get back to you as soon as possible. In the meantime, if you have any further questions, feel free to reply to this email.\n\nBest regards,\nThe ContactForm Team`,
        };

        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error:', error); 
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});


app.listen(3001, () => {
    console.log("Server is running successfully on port 3001");
});