import Blog from "../models/blog.js";
import catchAsync from "../utils/catch-async.js";

export const getPublishedBlogs = catchAsync(async (req, res) => {
  const blogs = await Blog.find({ publishedAt: { $ne: null } }).sort({
    publishedAt: -1,
  });

  res.json({
    count: blogs.length,
    data: blogs,
  });
});
