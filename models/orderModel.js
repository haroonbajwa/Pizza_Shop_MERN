// Import necessary modules
const mongoose = require("mongoose");

// Define the order schema
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  products: [],
  totalAmount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the order model
const Order = mongoose.model("orders", orderSchema);

// Export the model
module.exports = Order;
