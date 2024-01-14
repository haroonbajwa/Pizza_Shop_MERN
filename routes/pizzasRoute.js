const { response } = require("express");
const express = require("express");
const router = express.Router();

const Pizza = require("../models/pizzaModel");
const Category = require("../models/categoryModel");

router.get("/pizzas", async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.send(pizzas);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/add", async (req, res) => {
  try {
    const data = req.body;

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

router.post("/edit/:id", async (req, res) => {
  try {
    const pizzaId = req.params.id;
    const updatedData = req.body;

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

router.post("/add-category", async (req, res) => {
  try {
    const data = req.body;

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

router.post("/edit-category/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedData = req.body;

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

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
