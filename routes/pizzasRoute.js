const { response } = require("express");
const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const router = express.Router();

const Pizza = require("../models/pizzaModel");
const Category = require("../models/categoryModel");
const upload = require("../uploadMiddleware");

router.get("/pizzas", async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.send(pizzas);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const data = req.body;

    // Add the image URL to the data object
    if (req.file) {
      const imageUrl = `${req.file.filename}`;
      data.image = imageUrl;
    }

    // Create a new product instance
    const newPizza = new Pizza(data);

    // Save the new product to the database
    const savedProduct = await newPizza.save();

    // Respond with the newly created product
    res
      .status(201)
      .json({ message: "New Product added successfully.", data: savedProduct });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/edit/:id", upload.single("image"), async (req, res) => {
  try {
    const pizzaId = req.params.id;
    const updatedData = req.body;

    // Add the image URL to the data object
    if (req.file) {
      const imageUrl = `${req.file.filename}`;
      updatedData.image = imageUrl;
    }

    const updatedPizza = await Pizza.findByIdAndUpdate(pizzaId, updatedData, {
      new: true,
    });
    if (!updatedPizza) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.send(updatedPizza);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const pizzaId = req.params.id;
    // Find the product by ID and remove it
    const deletedPizza = await Pizza.findByIdAndRemove(pizzaId);

    if (!deletedPizza) {
      return res.status(404).json({ message: "Product not found" });
    }

    try {
      const imagePath = path.join(__dirname, "../uploads", deletedPizza.image);
      await fs.unlink(imagePath);
    } catch (error) {}

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// categories routes
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/add-category", upload.single("image"), async (req, res) => {
  try {
    const data = req.body;

    // Add the image URL to the data object
    if (req.file) {
      const imageUrl = `${req.file.filename}`;
      data.image = imageUrl;
    }

    // Create a new category instance
    const newCategory = new Category(data);

    // Save the new category to the database
    const savedCategory = await newCategory.save();

    // Respond with the newly created category
    res.status(201).json({
      message: "New category added successfully.",
      data: savedCategory,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/edit-category/:id", upload.single("image"), async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedData = req.body;

    // Add the image URL to the data object
    if (req.file) {
      const imageUrl = `${req.file.filename}`;
      updatedData.image = imageUrl;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updatedData,
      {
        new: true,
      }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.send(updatedCategory);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.delete("/delete-category/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    // Find the product by ID and remove it
    const deletedCategory = await Category.findByIdAndRemove(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    try {
      const imagePath = path.join(
        __dirname,
        "../uploads",
        deletedCategory.image
      );
      await fs.unlink(imagePath);
    } catch (error) {}

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
