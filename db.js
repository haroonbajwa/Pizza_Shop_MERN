const mongoose = require("mongoose");

var mongoURL = process.env.MONGO_URI;

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongo DB connection successfull");
});

db.on("error", () => {
  console.log("Mongo DB connection failed");
});

module.exports = mongoose;
