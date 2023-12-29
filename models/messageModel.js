const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: "conversations" },
  message: String,
  timestamp: Date,
});

const Message = mongoose.model("messages", messageSchema);

module.exports = Message;
