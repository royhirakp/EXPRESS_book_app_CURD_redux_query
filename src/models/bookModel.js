const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BookSchma = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  ratting: { type: Number, required: true },
  description: { type: String, required: true },
  comments: { type: Array },
  user: { type: ObjectId, ref: "user" },
});
const BlogModel = mongoose.model("Book", BookSchma);
module.exports = BlogModel;
