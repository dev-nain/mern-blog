import { imagekit } from "../config/image-kit.js";
import catchAsync from "../utils/catch-async.js";
import { blogSchema } from "../validators/blog.js";
import {
  calculateReadingTime,
  extractTextFromBlocks,
} from "../utils/reading-time.js";
import Tag from "../models/tag.model.js";
import Blog from "../models/blog.model.js";

export const getBlogs = catchAsync(async (req, res) => {
  const publishedBlogs = await Blog.find({
    publishedAt: { $ne: null, $lte: new Date() },
  })
    .sort({ createdAt: -1 })
    .populate("tags")
    .populate("author", "username name avatar");


  res.json({
    data: publishedBlogs,
  });
});

async function getTagIds(tags) {
  const tagIds = [];
  for (let name of tags) {
    let tag = await Tag.findOne({ name });
    if (!tag) {
      tag = await Tag.create({ name });
    }
    tagIds.push(tag._id);
  }
  return tagIds;
}

export const createBlog = catchAsync(async (req, res) => {
  const { content, summary, tags, thumbnail, title, type } = blogSchema.parse(
    req.body
  );
  const author = req.user;

  const text = extractTextFromBlocks(JSON.parse(content));
  const readingTime = calculateReadingTime(text);

  const tagIds = await getTagIds(tags);

  const blog = await Blog.create({
    author: author._id,
    tags: tagIds,
    readingTime,
    content,
    summary,
    title,
    thumbnail,
    publishedAt: type === "publish" ? new Date().toISOString() : null,
  });

  res
    .status(201)
    .json({ data: (await blog.populate("author")).populate("tags") });
});

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

export const uploadImage = catchAsync(async (req, res) => {
  const image = req.file;
  const uploadedImage = await imagekit.upload({
    file: image.buffer,
    fileName: image.originalname,
    folder: "/blogs",
    tags: ["blog", "image"],
    useUniqueFileName: true,
  });

  res.status(200).json({
    filePath: uploadedImage.filePath,
  });
});
