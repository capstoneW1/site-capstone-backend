const express = require("express");
const Wishlist = require("../models/wishlist");
const { BadRequestError, NotFoundError } = require("../utils/errors");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    // req.body consists of
    // { user_id, shoe_id }
    const wishlistItem = await Wishlist.createWishlistItem(req.body);
    return res.status(200).json({ wishlistItem });
  } catch (err) {
    next(err);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    // req.body consists of
    // { user_id, shoe_id }
    await Wishlist.deleteWishlistItem(req.body);
    return res.status(200).json("Item deleted");
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const userId = req.headers["user_id"];
    if (!userId) {
      throw new BadRequestError("'user_id' header not passed in");
    }
    const wishlist = await Wishlist.listWishlistForUser(userId);
    return res.status(201).json({ wishlist });
  } catch (err) {
    next(err);
  }
});

router.post("/shoeInWishlist", async (req, res, next) => {
  try {
    
    const wishlist = await Wishlist.shoeExistsInWishlist(req.body);
    return res.status(201).json({ wishlist });
  } catch (err) {
    next(err);
  }
});

router.get("/:wishlistId", async (req, res, next) => {
  try {
    //  It should send a JSON response back to the client
    // with the wishlist instance that matches the :wishlistId
    // parameter like so: { "wislist": { ... } }
    const wishlistId = req.params.wishlistId;
    const wishlist = await Wishlist.fetchWishlistById(wishlistId);
    if (!wishlist) {
      throw new NotFoundError("Invalid wishlist id");
    }
    return res.status(200).json({ wishlist });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
