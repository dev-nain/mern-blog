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

const multer = Multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and WebP are allowed."));
    }
  },
});

const router = Router();

router.get("/", getBlogs);
router.post("/", authorize, createBlog);
router.get("/:slug", getBlogBySlug);
router.put("/:slug", updateBlog);
router.delete("/:slug", deleteBlog);
router.post("/upload-image", authorize, multer.single("image"), uploadImage);

export default router;
