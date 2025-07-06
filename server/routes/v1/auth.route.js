import { Router } from "express";
import {
  getProfile,
  googleAuth,
  login,
  register,
} from "../../controllers/auth.controller.js";
import authorize from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/google-login", googleAuth);

router.get("/me", authorize, getProfile);

export default router;
