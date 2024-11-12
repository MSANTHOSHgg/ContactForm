const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const ContactModel = mongoose.model('contactforms', ContactSchema);

module.exports =  ContactModel;