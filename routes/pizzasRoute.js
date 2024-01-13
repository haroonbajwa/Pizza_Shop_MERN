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

router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
