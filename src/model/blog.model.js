const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  avatar: String,
});

const BlogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    image: String,
    author: AuthorSchema,
    date: {
      type: Date,
      required: true,
    },
    readTime: String,
    category: String,
    tags: [String],
    tableOfContents: [String],

    // views: { type: Number, default: 0 },
    // likes: { type: Number, default: 0 },
    // comments: { type: Number, default: 0 },
    // shares: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogPost", BlogPostSchema);
