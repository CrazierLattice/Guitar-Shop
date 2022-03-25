const router = require("express").Router();
require("dotenv").config();
const { userModel } = require("../models/user.model");
const { guitarModel } = require("../models/guitar.model");
const { orderModel } = require("../models/order.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//Login route
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(405)
        .send({ error: true, message: "Please fill all the required fields." });
    let user = await userModel.find(
      { email: username },
      { __v: false, id: false }
    );
    if (!user.length)
      return res
        .status(404)
        .send({ error: true, message: "Wrong username or password" });
    const verifiedPassword = await bcrypt.compare(password, user[0].password);
    if (!verifiedPassword)
      return res
        .status(404)
        .send({ error: true, message: "Wrong username or password" });
    //If verifeiedPassword - generate an access token and returns it to the client with the user data without the password

    user = await userModel.find(
      { email: username },
      { __v: false, password: false }
    );
    const token = jwt.sign({ user }, process.env.SECRET_CODE, {
      expiresIn: "1d",
    });
    res.json({ error: false, user, token });
  } catch (error) {
    console.log(error);
  }
});

//Disable or enable access to website when clicking on "Starting Shopping"
router.post('/handle-access/:userId', async (req, res) => {
  const { userId } = req.params
  const user = await userModel.findOne({ _id: userId })
  await userModel.findOneAndUpdate({ _id: user._id }, { has_access: !user.has_access })
    .then((user) => {
      res.send(user)
    })
    .catch((err) => {
      console.log(err)
    })
})

//Decode existing token and grant access to the website while refreshing
router.get("/refresh/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const data = jwt.decode(token);
    res.json({ error: false, data });
  } catch (error) {
    console.log(error);
  }
});

//Get amount of products and orders created in the store
router.get("/store-data", async (req, res) => {
  try {
    const guitars = await guitarModel.find();
    const orders = await orderModel.find();
    res.json({ error: false, guitars: guitars.length, orders: orders.length });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
