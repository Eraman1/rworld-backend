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
    author: AuthorSchema,
    date: {
      type: Date,
      required: true,
    },
    readTime: String,
    category: String,
    tags: [String],
    tableOfContents: [String],
    featured: {
      type: Boolean,
      default: false,
    },

    // views: { type: Number, default: 0 },
    // likes: { type: Number, default: 0 },
    // comments: { type: Number, default: 0 },
    // shares: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Middleware → auto-generate slug from title
BlogPostSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});
module.exports = mongoose.model("BlogPost", BlogPostSchema);
