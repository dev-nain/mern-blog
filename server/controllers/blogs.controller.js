import Blog from "../models/blog.model.js";


export async function getBlogs(req, res) {
  res.json({
    message: "Blogs fetched successfully",
  });
}

export async function createBlog(req, res) {
  res.json({
    message: "Blog created successfully",
  });
}

export async function getBlogBySlug(req, res) {
  res.json({
    message: "Blog fetched successfully",
  });
}

export async function updateBlog(req, res) { 
  res.json({
    message: "Blog updated successfully",
  });
}

export async function deleteBlog(req, res) {
  res.json({
    message: "Blog deleted successfully",
  });
}
