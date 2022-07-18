const express = require("express");
const Product = require("../models/product");
const { BadRequestError, NotFoundError } = require("../utils/errors");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.getAllProducts();
    // console.log("products in routes", products);
    return res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    // req.body is an object in the format {"query": "Jordan"}
    const products = await Product.searchProducts(req.body);
    // console.log("products in routes", products);
    return res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
