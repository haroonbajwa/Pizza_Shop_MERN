const express = require("express");
const router = express.Router();

const Order = require("../models/orderModel");
const User = require("../models/userModel");

// Route to handle placing an order
router.post("/place-order", async (req, res) => {
  try {
    const { user, items, totalAmount } = req.body;

    // Create a new order
    const order = new Order({
      user,
      products: items,
      totalAmount,
    });

    // Save the order to the database
    const savedOrder = await order.save();

    // Respond with the saved order
    res.status(201).json({
      message: "Order placed successfully",
      data: savedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get a user's orders
router.get("/user-orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const adminUser = await User.findOne({ isAdmin: true });
    let userOrders = [];
    if (adminUser._id.toString() === userId) {
      userOrders = await Order.find().populate("user");
    } else {
      userOrders = await Order.find({ user: userId }).populate("user");
    }

    // Respond with the user's orders
    res.status(200).json(userOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.get("/all", async (req, res) => {
//   try {
//     const conversations = await Conversation.find();
//     res.send(conversations);
//   } catch (error) {
//     return res.status(400).json({ message: error });
//   }
// });

module.exports = router;
