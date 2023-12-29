const { response } = require("express");
const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const Conversation = require("../models/conversationModel");

router.post("/create/:userId", async (req, res) => {
  try {
    // Extract userId from request body or parameters
    const { userId } = req.params;

    // Find the admin user where isAdmin is true
    const adminUser = await User.findOne({ isAdmin: true });

    // Check if the admin user exists
    if (!adminUser) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    // Check if the conversation already exists
    const existingConversation = await Conversation.findOne({
      members: { $all: [userId, adminUser._id] },
    });

    if (existingConversation) {
      return res.status(400).json({ message: "Conversation already exists" });
    }

    // Create a new conversation
    const newConversation = new Conversation({
      members: [userId, adminUser._id],
    });
    const savedConversation = await newConversation.save();

    res.status(201).json(savedConversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const conversations = await Conversation.find();
    res.send(conversations);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const conversation = await Conversation.findOne({
      members: { $in: [userId] },
    }).populate({
      path: "messages",
      populate: {
        path: "sender",
        model: "users",
      },
    });
    res.send(conversation);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
