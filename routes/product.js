const express = require("express");
const Product = require("../models/product");
const { BadRequestError, NotFoundError } = require("../utils/errors");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.getProducts();
    // console.log("products in routes", products);
    return res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
