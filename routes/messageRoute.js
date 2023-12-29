const { response } = require("express");
const express = require("express");
const router = express.Router();

const Message = require("../models/messageModel");

router.get("/all/:conversationId", async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversation: conversationId });
    res.send(messages);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
