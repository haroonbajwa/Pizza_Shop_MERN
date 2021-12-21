const { response } = require('express');
const express = require('express');
const router = express.Router();

const Pizza = require('../models/pizzaModel');

router.get('/pizzas', async (req, res) => {
    try {
        const pizzas = await Pizza.find({});
        res.send(pizzas);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;