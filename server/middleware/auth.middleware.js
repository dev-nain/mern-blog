import jwt from "jsonwebtoken";

import config from "../config/config.js";
import User from "../models/user.model.js";
import ApiError from "../utils/api-error.js";

const authorize = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) throw new ApiError(401, "Unauthorized");

    const decoded = jwt.verify(token, config.jwt_secret);

    const user = await User.findById(decoded.userId);

    if (!user) throw new ApiError(401, "Unauthorized");

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export const optionalAuthorize = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, config.jwt_secret);
      const user = await User.findById(decoded.userId);

      req.user = user;
    }
    next();
  } catch (error) {
    next();
  }
};

export default authorize;
