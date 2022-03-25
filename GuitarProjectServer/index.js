//Imports
require("dotenv").config();
const { guitarModel } = require("./models/guitar.model");
const { ConnectToDb } = require("./dbsetup/dbconfig");
const express = require("express");
const cors = require("cors");
const { insert_data_to_db } = require("./dbsetup/dbconfig");

//Setup and middlewares
ConnectToDb();
const app = express();
// insert_data_to_db()

app.use(express.json());
app.use(cors());
app.use("/login", require("./routes/login.route"));
app.use("/register", require("./routes/register.route"));
app.use("/guitars", require("./routes/guitars.route"));
app.use("/cart", require("./routes/cart.route"));
app.use("/order", require("./routes/order.route"));
app.use("/admin", require("./routes/admin.route"));

app.get("/", async (req, res) => {
  await guitarModel
    .find()
    .then((products) => {
      res.status(200).json({ error: false, products });
    })
    .catch((err) => {
      console.log(err);
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on port ${PORT} `));
