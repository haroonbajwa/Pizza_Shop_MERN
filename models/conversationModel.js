const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "messages",
    },
  ],
});

const Message = mongoose.model("conversations", messageSchema);

module.exports = Message;
