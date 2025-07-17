import { imagekit } from "../config/image-kit.js";
import catchAsync from "../utils/catch-async.js";
import { blogSchema, userBlogsQueryParams } from "../validators/blog.js";
import {
  calculateReadingTime,
  extractTextFromBlocks,
} from "../utils/reading-time.js";
import Tag from "../models/tag.model.js";
import Blog from "../models/blog.model.js";
import ApiError from "../utils/api-error.js";
import User from "../models/user.model.js";
import { paginationParams } from "../validators/pagination.js";
import Interaction from "../models/interaction.model.js";

const buildBaseBlogQuery = (skip, limit) => {
  return Blog.find()
    .populate("tags", "name")
    .populate("author", "username name avatar")
    .select("-content -__v")
    .sort({ publishedAt: -1, _id: -1 })
    .skip(skip)
    .limit(limit);
};

export const getBlogs = catchAsync(async (req, res) => {
  const params = paginationParams.parse(req.query);
  const skip = (params.page - 1) * params.limit;

  const where = { publishedAt: { $ne: null, $lte: new Date() } };

  const blogs = await buildBaseBlogQuery(skip, params.limit).find(where);
  const totalItems = await Blog.countDocuments(where);

  return res.json({
    data: blogs,
    page: params.page,
    limit: params.limit,
    totalItems,
  });
});

export const getUserRecommendedBlogs = catchAsync(async (req, res) => {
  const user = await getUserByUsername(req.params.username);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const viewedBlogIds = await Interaction.find({ user: user._id }).distinct(
    "blog"
  );

  const tagAgg = await Interaction.aggregate([
    { $match: { user: userId } },
    {
      $lookup: {
        from: "blogs",
        localField: "blog",
        foreignField: "_id",
        as: "blogInfo",
      },
    },
    { $unwind: "$blogInfo" },
    { $unwind: "$blogInfo.tags" },
    {
      $group: {
        _id: "$blogInfo.tags",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  const topTagIds = tagAgg.map((t) => t._id);

  const recommendedWhere = {
    publishedAt: { $ne: null, $lte: new Date() },
    tags: { $in: topTagIds },
    _id: { $nin: viewedBlogIds },
  };

  const recommendedBlogs = await buildBaseBlogQuery(skip, params.limit).find(
    recommendedWhere
  );
  const totalItems = await Blog.countDocuments(recommendedWhere);

  return res.json({
    data: recommendedBlogs,
    page: params.page,
    limit: params.limit,
    totalItems,
  });
});

const getUserByUsername = async (username) => {
  return await User.findOne({ username });
};

export const getUserBlogs = catchAsync(async (req, res) => {
  const params = userBlogsQueryParams.parse(req.query);
  const skip = (params.page - 1) * params.limit;

  const author = await getUserByUsername(req.params.username);

  if (!author) {
    throw new ApiError(400, "User not found");
  }

  const where = { author: author._id };

  if (!author._id.equals(req.user._id) && params.type === "draft") {
    throw new ApiError(403, "Forbidden");
  }

  where.publishedAt =
    params.type === "draft" ? null : { $ne: null, $lte: new Date() };

  const blogs = await Blog.find(where)
    .select({ content: 0, __v: 0 })
    .populate("tags", "name")
    .populate("author", "username name avatar")
    .sort({ publishedAt: -1, _id: -1 })
    .skip(skip)
    .limit(params.limit);

  const totalItems = await Blog.countDocuments(where);

  return res.send({
    data: blogs,
    page: params.page,
    limit: params.limit,
    totalItems,
  });
});

async function getTagIds(tags) {
  const tagIds = [];
  for (let name of tags) {
    const tag = await Tag.findOneAndUpdate(
      { name },
      { name },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    tagIds.push(tag._id);
  }
  return tagIds;
}

export const createBlog = catchAsync(async (req, res) => {
  const { content, summary, tags, thumbnail, title, type } = blogSchema.parse(
    req.body
  );
  const author = req.user;
  let text;
  try {
    text = extractTextFromBlocks(JSON.parse(content));
  } catch (error) {
    throw new ApiError(
      400,
      "Invalid content format: content must be valid JSON"
    );
  }

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
    publishedAt: type === "publish" ? new Date() : null,
  });

  const populatedBlog = await blog.populate(["author", "tags"]);

  res.status(201).json({ data: populatedBlog });
});

export const getBlogBySlug = catchAsync(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug })
    .populate("tags", "name")
    .populate("author", "username name avatar");

  if (!blog) {
    throw new ApiError(404, "No such Blog found");
  }

  if (req.user) {
    await Interaction.findOneAndUpdate(
      { user: req.user._id, blog: blog._id },
      { viewedAt: new Date() },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }

  res.send({
    data: blog,
  });
});

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

export const uploadBlogThumbnail = catchAsync(async (req, res) => {
  const image = req.file;
  if (!image) {
    throw new ApiError(400, "No image file provided");
  }
  const uploadedImage = await imagekit.upload({
    file: image.buffer,
    fileName: image.originalname,
    folder: "/blogs",
    tags: ["blog", "image"],
    useUniqueFileName: true,
  });

  res.status(201).json({
    fileUrl: uploadedImage.url,
  });
});
