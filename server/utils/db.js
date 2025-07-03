import config from "../config/config.js";
import mongoose from "mongoose";
import logger from "../config/logger.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongo_url);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
