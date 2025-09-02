const mongoose = require("mongoose");

const StockitAutorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  avatar: String,
});

const StockitBlogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
    },
    image: String,
    author: StockitAutorSchema,
    date: {
      type: Date,
      default: Date.now,
    },
    readTime: {
      type: String,
    },
    category: {
      type: String,
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("StockitBlogPost", StockitBlogPostSchema);
