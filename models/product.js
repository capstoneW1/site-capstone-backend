require("dotenv").config();
const { BadRequestError, NotFoundError } = require("../utils/errors");
const axios = require("axios");
const fetch = require("node-fetch");
const StockXAPI = require("stockx-api");
const stockX = new StockXAPI();

// import fetch from "node-fetch";

// const { get } = require("../app");

class Product {
  static async getAllProducts() {
    const options = {
      url: "https://the-sneaker-database.p.rapidapi.com/sneakers",
      method: "GET",
      params: { limit: 10 },
      headers: {
        "X-RapidAPI-Key": "b644290787mshfee7bb22060308dp13940bjsnf0ed4c49b267",
        "X-RapidAPI-Host": "the-sneaker-database.p.rapidapi.com",
      },
    };
    // await stockX.login({
    //   user: "jenny.lee.site@codepath.org",
    //   password: "Hello123-",
    // });

    // console.log("Successfully logged in!");

    // const productList = await stockX.newSearchProducts("yeezy");
    // return productList;
    let response = null;
    try {
      response = await axios.request(options);
      //   console.log("getProducts response:", response);
      return response.data.results;
    } catch (err) {
      console.log(err);
    }
  }

  static async searchProducts(q) {
    const options = {
      method: "GET",
      url: "https://the-sneaker-database.p.rapidapi.com/search",
      params: { limit: 10, query: q.query },
      headers: {
        "X-RapidAPI-Key": "b644290787mshfee7bb22060308dp13940bjsnf0ed4c49b267",
        "X-RapidAPI-Host": "the-sneaker-database.p.rapidapi.com",
      },
    };

    let response = null;
    try {
      response = await axios.request(options);
      console.log("searchProducts response:", response);
      return response.data.results;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Product;
