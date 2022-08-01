require("dotenv").config();
const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");
const axios = require("axios");
const fetch = require("node-fetch");

class Wishlist {
  static async createWishlistItem(product) {
    if (!product) {
      throw new BadRequestError("product is null");
    }

    const requiredFields = ["shoe_id", "user_id"];
    requiredFields.forEach((property) => {
      if (!product.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing ${property} in request body.`);
      }
    });
    const res = await db.query(
      `
      INSERT INTO wishlist 
      (shoe_id, user_id)
      VALUES ($1, $2) 
      RETURNING id, user_id, shoe_id, created_at;`,
      [product.shoe_id, product.user_id]
    );
    return res.rows;
  }

    //Deletes item from wishlist in database
  static async deleteWishlistItem(product) {
    if (!product) {
      throw new BadRequestError("product is null");
    }

    const requiredFields = ["shoe_id", "user_id"];
    requiredFields.forEach((property) => {
      if (!product.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing ${property} in request body.`);
      }
    });
    const res = await db.query(
      `
      DELETE FROM wishlist 
      WHERE shoe_id=$1 AND user_id=$2`,
      [product.shoe_id, product.user_id]
    );
    return;
  }

  static async listWishlistForUser(userId) {
    // Should list all wishlist instances in the database that
    //are owned by a particular user
    if (!userId) {
      throw new BadRequestError("userId is null");
    }
    const res = await db.query(`SELECT * FROM wishlist WHERE user_id=$1;`, [
      userId,
    ]);
    return res.rows;
  }

  static async shoeExistsInWishlist(product) {
    // Should list all wishlist instances in the database that
    //are owned by a particular user
    if (!product) {
      throw new BadRequestError("product is null");
    }

    const requiredFields = ["shoe_id", "user_id"];
    requiredFields.forEach((property) => {
      if (!product.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing ${property} in request body.`);
      }
    });
    const res = await db.query(`SELECT * FROM wishlist WHERE user_id=$1 AND shoe_id=$2;`, [
      product.user_id, product.shoe_id,
    ]);
    return res.rows;
  }

  static async fetchWishlistById(wishlistId) {
    //When supplied with a valid id, fetches a wishlist
    // instance from the database that matches that id.
    //
    //If no wishlist instance matches that id, throws a
    // NotFoundError (404 status code)
    if (!wishlistId) {
      throw new BadRequestError("wishlistId is null");
    }
    const res = await db.query(`SELECT * FROM wishlist WHERE id=$1;`, [
      wishlistId,
    ]);
    return res.rows[0];
  }
}

module.exports = Wishlist;
