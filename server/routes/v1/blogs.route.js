import { Router } from "express";
import { getBlogs, createBlog, getBlogBySlug, updateBlog, deleteBlog } from "../../controllers/blogs.controller.js";

const router = Router();

router.get("/", getBlogs);
router.post("/", createBlog);
router.get("/:slug", getBlogBySlug);
router.put("/:slug", updateBlog);
router.delete("/:slug", deleteBlog);

export default router;
