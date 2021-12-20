const express = require("express");

const Pizza = require("./models/pizzaModel")

const db = require('./db');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server Working!");
});

app.get("/pizzas", (req, res) => {
    Pizza.find({}, (error, doc) => {
        if(error){
            console.log(error);
        } else{
            res.send(doc);
        }
    })
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));