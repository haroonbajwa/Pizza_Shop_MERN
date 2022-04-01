const express = require("express");
const Pizza = require("./models/pizzaModel");
const pizzasRoute = require('./routes/pizzasRoute');
const userRoute = require("./routes/userRoute");
const db = require('./db');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server Working!");
});

app.use('/api/pizzas/', pizzasRoute);
app.use('/api/users/', userRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));