const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const security = require("./middleware/security.js");
const { NotFoundError } = require("./utils/errors");
const { API_BASE_URL } = require("./constants")

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product.js");
const wishlistRoutes = require("./routes/wishlist");
const emailRouter = require("./routes/nodeMailer");

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requeseted-With, Content-Type, Accept"
  );
  next();
});

app.use(morgan("tiny"));
app.use(express.json());
//res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
// this variable allows us to make requests with nodemailer
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(security.extractUserFromJwt);

app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/nodemailer", emailRouter);

app.get("/", async (req, res, next) => {
  res.status(200).json({ ping: "pong" });
});

app.use((req, res, next) => {
  return next(new NotFoundError());
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
