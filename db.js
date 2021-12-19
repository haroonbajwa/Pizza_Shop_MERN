const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://haroonbajwa99:hbgp9999@cluster0.qggaq.mongodb.net/mern-pizza';

mongoose.connect(mongoURL, { useUnifiedTopology:true, useNewUrlParser:true });

var db = mongoose.connection;

db.on('connected', () => {
    console.log("Mongo DB connection successfull");
})

db.on('error', () => {
    console.log("Mongo DB connection failed");
})

module.exports = mongoose