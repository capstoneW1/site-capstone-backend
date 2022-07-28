const express = require("express");
const Product = require("../models/product");
const { BadRequestError, NotFoundError } = require("../utils/errors");
const router = express.Router();

router.get("/", async (req, res, next) => {
  // route to get a list of products from shoes table.
  try {
    const products = await Product.getAllProducts();
    return res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
});

router.get("/id/:productId", async (req, res, next) => {
  // route to get a single product by productId.
  // req.params.productId is of type integer
  try {
    const productId = req.params.productId;
    const product = await Product.getProductById(productId);
    return res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
});

router.post("/search", async (req, res, next) => {
  try {
    // route to get a list of products given a search query.
    // req.body is an object in the format {"query": "Jordan"}
    const products = await Product.searchProducts(req.body.query);
    return res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
