const { guitarModel } = require("../models/guitar.model");
const { categoryModel } = require("../models/category.model");
const verifyAdminToken = require("../middlewares/admin.middleware");

const router = require("express").Router();
//Get all the guitars

router.get("/", async (req, res) => {
  await guitarModel
    .find({}, { __v: false })
    .populate({
      path: "category",
    })
    .then((guitars) => res.json({ error: false, guitars }))
    .catch((err) => res.status(500).json({ error: true, err }));
});

//Get an guitar by category

router.get("/category/:id", async (req, res) => {
  const { id } = req.params;
  guitarModel
    .find({ category: { $eq: id } }, { __v: false })
    .populate({
      path: "category",
    })
    .then((guitars) => res.json({ error: false, guitars }))
    .catch((e) => console.log(e));
});


//Get categories
router.get("/categories", async (req, res) => {
  const categories = await categoryModel.find({}, { __v: false });
  res.json(categories);
});

//Get guitars by search filter
router.post("/filter", async (req, res) => {
  const { query } = req.body;
  if (!query.length) {
    const guitars = await guitarModel.find().populate({
      path: "category",
    });
    return res.json({ error: false, guitars });
  }
  await guitarModel
    .find({
      name: new RegExp(query, "i"),
    })
    .populate({
      path: "category",
    })
    .then((guitars) => {
      return res.json({ error: false, guitars });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
