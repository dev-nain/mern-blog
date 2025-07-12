import { Router } from "express";
import Multer from "multer";
import {
  getBlogs,
  createBlog,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  uploadImage,
} from "../../controllers/blogs.controller.js";
import authorize from "../../middleware/auth.middleware.js";

const storage = Multer.memoryStorage();

const multer = Multer({ storage });

const router = Router();

router.get("/", getBlogs);
router.post("/", authorize, createBlog);
router.get("/:slug", getBlogBySlug);
router.put("/:slug", updateBlog);
router.delete("/:slug", deleteBlog);
router.post("/upload-image", authorize, multer.single("image"), uploadImage);

export default router;
