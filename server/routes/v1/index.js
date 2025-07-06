import { Router } from "express";

import blogRouter from "./blogs.route.js";
import authRouter from "./auth.route.js";

const router = Router();

router.use("/api/v1/blogs", blogRouter);
router.use("/api/v1/auth", authRouter);

export default router;
