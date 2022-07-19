const Wishlist = require("../models/wishlist");
const { BadRequestError, ForbiddenError } = require("../utils/errors");

const authedUserOwnsWishlist = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { wishlistId } = req.params.wishlistId;
    const wishlist = await Wishlist.fetchWishlistById(wishlistId);

    if (wishlist.user_id !== user.id) {
      throw new ForbiddenError(
        "User is not allowed to fetch wishlist that they do not own."
      );
    }

    res.locals.wishlist = wishlist;
    return next();
  } catch (err) {
    return next(err);
  }
};
module.exports = { authedUserOwnsWishlist };