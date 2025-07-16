import { Schema, model } from "mongoose";
import slugify from "../utils/slugify.js";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    readingTime: {
      minutes: Number,
      text: String,
    },
    summary: { type: String, maxLength: 200 },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

blogSchema.pre("save", function (next) {
  this.slug = slugify(this.title);
  next();
});

const Blog = model("Blog", blogSchema);

export default Blog;
