import { Router } from "express";
import { getPublishedBlogs } from "../controllers/blogs.js";

const router = Router();

router.get("/published", getPublishedBlogs);

export default router;
