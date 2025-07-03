import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {},
  {
    timestamps: true,
  }
);

const Blog = model("Blog", userSchema);

export default Blog;
