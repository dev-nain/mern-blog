import { Router } from "express";
import {
  getBlogs,
  createBlog,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} from "../../controllers/blogs.controller.js";
import authorize from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", getBlogs);
router.post("/", authorize, createBlog);
router.get("/:slug", getBlogBySlug);
router.put("/:slug", updateBlog);
router.delete("/:slug", deleteBlog);

export default router;
