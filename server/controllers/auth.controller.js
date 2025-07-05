import { registerSchema, loginSchema } from "../validators/auth.js";
import User from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/hash-password.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import catchAsync from "../utils/catch-async.js";
import ApiError from "../utils/api-error.js";

export const register = catchAsync(async (req, res) => {
  const { name, email, password } = registerSchema.parse(req.body);

  const user = await User.create({ name, email, password });

  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  res
    .status(201)
    .json({ message: "User created successfully", user: userWithoutPassword });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = jwt.sign({ userId: user._id }, config.jwt_secret, {
    expiresIn: config.jwt_expires_in,
  });

  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  res
    .status(200)
    .json({ message: "Login successful", token, user: userWithoutPassword });
});
