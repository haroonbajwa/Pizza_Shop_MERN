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
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: [
      "pending",
      "processing",
      "45min",
      "30min",
      "15min",
      "delivered",
      "cancelled",
    ],
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
