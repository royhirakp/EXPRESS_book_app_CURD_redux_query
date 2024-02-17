require("dotenv").config();
let mongoose = require("mongoose");
let mongourl = process.env.mongoUrl;

// .env.mongo;
mongoose.set("strictQuery", false);
mongoose.connect(mongourl).then(() => {
  console.log("DB connected");
});
