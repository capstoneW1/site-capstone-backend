const express = require("express");

const nodemailer = require("nodemailer");

const emailRouter = express();

emailRouter.use(express.json());

emailRouter.post("/send", (req, res) => {
  // route to send an email
  // takes in an email address and a text body
  const { email, messageHtml } = req.body;
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    auth: {
      user: "workday1codepath@gmail.com",
      pass: process.env.EMAIL_PASS,
    },

    from: "workday1codepath@gmail.com",
  });

  const mail = {
    from: "Sneaker Store workday1codepath@gmail.com",
    to: email,
    subject: "You've Signed Up to Receive Alerts",
    html: messageHtml,
  };

  transporter.sendMail(mail, (err) => {
    if (err) {
      res.status(400).send("Fail");
    } else {
      res.status(200).send("Success");
    }
  });
});

module.exports = emailRouter;
