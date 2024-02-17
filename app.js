const express = require("express");
const cros = require("cors");
const jsw = require("jsonwebtoken");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cros());

//route
const userR = require("./src/routes/userRoute");
const BookRoutsAutintcation = require("./src/routes/bookRouteAuthnticate");
const Book = require("./src/routes/bookRouteV");
// auth// tokren varifaction
const tokenVarification = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    jsw.verify(token, "hirak", (err, decode) => {
      if (err) {
        return res.status(403).json({
          status: "filed/ login againn",
        });
      }
      req.userID = decode.data;
      next();
    });
  } else {
    res.json({
      status: "failed",
      messege: "token missing ",
    });
  }
};
// login and register
app.use("/api/v1", userR);

// books and comment post // with auth
app.use("/api/v1/bookAuth", tokenVarification, BookRoutsAutintcation);
//get books list // get single book
app.use("/api/v1/book", Book);

app.use("*", (req, res) => {
  res.send({ status: "404" });
});
module.exports = app;
