import { Router } from "express";

import blogRouter from "./blogs.route.js";
import authRouter from "./auth.route.js";
import userRouter from "./users.route.js";
import uploadRouter from "./uploads.route.js";

const router = Router();

router.use("/api/v1/blogs", blogRouter);
router.use("/api/v1/auth", authRouter);
router.use("/api/v1/users", userRouter);
router.use("/api/v1/uploads", uploadRouter);

export default router;
