// server.js
require("dotenv").config();
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const sendEmail = payload => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ACCOUNT,
      pass: process.env.PASS
    }
  });

  const { message, email } = payload;

  return transporter.sendMail({
    from: "muresan.1andrei@gmail.com",
    to: email,
    subject: "This is an email from that lame meetup",
    text: message
  });
};

app.prepare().then(() => {
  express()
    .use(bodyParser.json())
    .post("/api/send-email", (req, res) => {
      sendEmail(req.body)
        .then(() => {
          res.status("200").send();
        })
        .catch(err => {
          console.log(err);
          res.status("500").send();
        });
    })
    .use(handle)
    .listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
});
