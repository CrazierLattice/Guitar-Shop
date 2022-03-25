const router = require("express").Router();
const verifyAdminToken = require("../middlewares/admin.middleware");
const { guitarModel } = require("../models/guitar.model");
//Add new product
router.post("/new-product", verifyAdminToken, async (req, res) => {
  const { name, category, price, picture } = req.body;
  if (!name || !category || !price || !picture)
    return res
      .status(403)
      .json({ error: false, message: "Missing some info." });
  await new guitarModel({
    name,
    category,
    price,
    picture,
  })
    .save()
    .then(() => {
      res
        .status(201)
        .json({ error: false, message: "Product added successfully!" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Edit  product by product id

router.put("/edit-product/:productId", verifyAdminToken, async (req, res) => {
  const { productId } = req.params;
  const { name, price, picture, category } = req.body;
  if (!name || !price || !picture || !category)
    return res.status(403).json({ error: true, message: "Missing some info" });
  console.log(req.body);
  //Find one and update
  await guitarModel
    .findOneAndUpdate({ _id: productId }, { name, price, picture, category })
    .then((product) => {
      console.log(product);
      res.status(201).json({ error: false, product });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
