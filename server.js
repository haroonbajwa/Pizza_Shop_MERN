const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const Pizza = require("./models/pizzaModel");
const User = require("./models/userModel");
const Message = require("./models/messageModel");
const Conversation = require("./models/conversationModel");

const pizzasRoute = require("./routes/pizzasRoute");
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");
const conversationRoute = require("./routes/conversationRoute");
const orderRoute = require("./routes/orderRoute");
const db = require("./db");

const expressPort = process.env.PORT || 5000;
// const socketIOPort = process.env.SOCKET_IO_PORT || 8080;

const app = express();
app.use(cors());

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// scoket io setup
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle chat events
  socket.on("sendMessage", async ({ conversationId, senderId, message }) => {
    try {
      // Create a new instance of the Message model
      const newMessage = new Message({
        sender: senderId,
        conversation: conversationId,
        message,
        timestamp: new Date(),
      });
      // Save the message to the database
      const savedMessage = await newMessage.save();

      // Update the conversation with the new message ID
      await Conversation.findByIdAndUpdate(
        conversationId,
        {
          $push: { messages: savedMessage._id },
        },
        { new: true }
      );

      const populatedMessage = await Message.findById(
        savedMessage._id
      ).populate("sender");

      // Emit the message to all users in the conversation except the sender
      socket.broadcast
        .to(`admin-${conversationId}`)
        .emit("receiveMessage", populatedMessage);

      // Emit the message to the sender
      socket.emit("receiveMessage", populatedMessage);
    } catch (error) {
      console.error(error);
    }
  });

  // Admin joins a room to receive messages
  socket.on("joinAdmin", ({ conversationId }) => {
    if (conversationId) console.log(`admin-${conversationId}`, "room joind");
    if (conversationId) socket.join(`admin-${conversationId}`);
  });
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Working!");
});

app.use("/api/pizzas/", pizzasRoute);
app.use("/api/users/", userRoute);
app.use("/api/messages/", messageRoute);
app.use("/api/conversations/", conversationRoute);
app.use("/api/orders/", orderRoute);

server.listen(expressPort, () =>
  console.log(`Server is running on port ${expressPort}`)
);
// server.listen(socketIOPort, () => {
//   console.log("Socket listening on port 8080");
// });
