const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const upload = require("../uploadMiddleware");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({ name, email, password });
  try {
    newUser.save();
    res.send("User Registered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/all", async (req, res) => {
  const allUsers = await User.find();
  res.status(200).json(allUsers);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      res.send(user);
    } else {
      return res.status(400).json({ message: "User login failed!" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong! " });
  }
});

router.post("/update", upload.single("image"), async (req, res) => {
  try {
    const { _id, name } = req.body;

    // Ensure that the provided _id is valid
    if (!_id) {
      return res.status(400).json({ message: "Invalid _id provided" });
    }

    // Add the image URL to the data object
    let updatedImage = "";
    if (req.file) {
      updatedImage = `${req.file.filename}`;
    }

    const updateData = { name };
    if (updatedImage) {
      updateData.image = updatedImage;
    }

    // Update only the specified fields (excluding _id, isAdmin, email)
    const updatedUser = await User.findOneAndUpdate({ _id }, updateData, {
      new: true,
      omitUndefined: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
