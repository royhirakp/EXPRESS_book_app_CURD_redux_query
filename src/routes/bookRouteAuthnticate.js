const express = require("express");
const router = express.Router();
const BookModel = require("../models/bookModel");
const { v4: uuidv4 } = require("uuid");

// route only of create new book, delete boox, new commnet , comment delete
router.post("/", async (req, res) => {
  try {
    const createBlog = await BookModel.create({
      title: req.body.title,
      author: req.body.author,
      imageUrl: req.body.imageUrl,
      ratting: req.body.ratting,
      description: req.body.description,
      comments: [],
      user: req.userID || "1234",
    });
    res.json({
      createBlog: createBlog,
      status: "sucsess",
    });
  } catch (error) {
    res.json({
      status: "error",
      messege: error,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, ratting, comment } = req.body;
    const uniqueId = uuidv4();
    const commentObject = { name, ratting, comment, uniqueId };
    const book = await BookModel.find({ _id: req.params.id });
    let oldComment = book[0].comments;
    oldComment.push(commentObject);

    if (!name && !comment) {
      return res.status(400).json({
        messege: "req body is empty ",
      });
    }

    let data = await BookModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          comments: oldComment,
        },
      }
    );

    if (data.matchedCount === 0) {
      return res.status(404).json({
        eror: "no data",
      });
    }
    res.status(204).json({ h: "head", oldComment, data });
  } catch (error) {
    res.status(500).json({
      status: "error",
      messege: error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    let blog = await BookModel.find();
    res.json({
      status: "susecss",
      blog,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      messege: error.messege,
    });
  }
});

module.exports = router;
