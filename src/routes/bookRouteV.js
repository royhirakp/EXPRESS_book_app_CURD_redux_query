const express = require("express");
const router = express.Router();
const BookModel = require("../models/bookModel");

router.get("/", async (req, res) => {
  try {
    let books = await BookModel.find();
    res.json({
      status: "susecss",
      books,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      messege: error.messege,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let book = await BookModel.find({ _id: req.params.id });
    res.json({
      status: "susecss",
      book,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      messege: error.messege,
    });
  }
});

module.exports = router;
