require("dotenv").config();
const { BadRequestError, NotFoundError } = require("../utils/errors");
const db = require("../db");

class Product {
  static async getAllProducts() {
    // returns all products in shoes table
    const results = await db.query(`SELECT * FROM shoes;`);
    return results.rows;
  }

  static async getProductById(productId) {
    // returns a single product by productId from shoes table.
    // :param productId: product id of type integer
    const results = await db.query(`SELECT * FROM shoes WHERE id=$1;`, [
      productId,
    ]);
    return results.rows[0];
  }

  static async searchProducts(query) {
    // returns a list of all products where search query is found
    // in product name, brand, silhouette, description, or colorway
    // of shoes table.
    // :param query: search query of type text/string
    const results = await db.query(
      `SELECT * FROM shoes WHERE LOWER(name) LIKE LOWER($1) 
      OR LOWER(brand) LIKE LOWER($1)
      OR LOWER(silhouette) LIKE LOWER($1)
      OR LOWER(description) LIKE LOWER($1) 
      OR LOWER(colorway) LIKE LOWER($1);`,
      [`%${query}%`]
    );
    return results.rows;
  }

  static async getShoeHistoryById(productId) {
    //Gets shoe id from params and then is used to collect
    //price history to display in a graph component
    const results = await db.query(`SELECT sep, oct, nov, dec, jan, feb, mar, apr, may, jun, jul, aug FROM shoe_history WHERE shoe_id=$1;`, [
      productId,
    ]);
    return results.rows[0];
  }

}

module.exports = Product;
