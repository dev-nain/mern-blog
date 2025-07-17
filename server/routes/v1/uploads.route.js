import { Router } from "express";
import Multer from "multer";
import authorize from "../../middleware/auth.middleware.js";
import { uploadBlogThumbnail } from "../../controllers/blogs.controller.js";

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

router.post(
  "/blog-thumbnail",
  authorize,
  multer.single("image"),
  uploadBlogThumbnail
);

export default router;
