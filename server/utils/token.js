import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (userId) => {
  return jwt.sign({ userId }, config.jwt_secret, {
    expiresIn: config.jwt_expires_in,
  });
};
