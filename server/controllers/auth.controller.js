import { OAuth2Client } from "google-auth-library";
import { registerSchema, loginSchema } from "../validators/auth.js";
import User from "../models/user.model.js";
import { comparePassword } from "../utils/hash-password.js";
import config from "../config/config.js";
import catchAsync from "../utils/catch-async.js";
import ApiError from "../utils/api-error.js";
import { generateToken } from "../utils/token.js";

const client = new OAuth2Client(config.google_client_id);


export const register = catchAsync(async (req, res) => {
  const { name, email, password } = registerSchema.parse(req.body);

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  res
    .status(201)
    .json({ message: "User created successfully", user: userWithoutPassword, token });
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

  const token = generateToken(user._id);

  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  res
    .status(200)
    .json({ message: "Login successful", token, user: userWithoutPassword });
});

export const googleAuth = catchAsync(async (req, res) => {
  const { idToken } = req.body;

  const ticket = await client.verifyIdToken({
    idToken,
    audience: config.google_client_id, 
  });

  const payload = ticket.getPayload();
  const { email, sub: googleId, name, picture } = payload;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      email,
      fullName: name,
      avatar: picture,
      googleId,
    });
  }

  if (user.googleId && user.googleId !== googleId) {
    return res.status(401).json({ message: "Google ID mismatch" });
  }

  const token = generateToken(user._id);

  res.status(200).json({ message: "Login successful", token, user });
});

