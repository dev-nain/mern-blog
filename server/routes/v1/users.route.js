import { Router } from "express";
import authorize from "../../middleware/auth.middleware.js";
import {
  getUserRecommendedBlogs,
  getUserBlogs,
} from "../../controllers/blogs.controller.js";

const router = Router();

router.get("/:username/blogs", authorize, getUserBlogs);
router.get("/:username/recommended-blogs/", authorize, getUserRecommendedBlogs);

export default router;
