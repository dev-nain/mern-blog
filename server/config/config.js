import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("8000"),
  LOG_LEVEL: z.string().default("debug"),
  MONGO_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default("7d"),
  IMAGE_KIT_PUBLIC_KEY: z.string(),
  IMAGE_KIT_PRIVATE_KEY: z.string(),
  IMAGE_KIT_APP_ID: z.string(),
});

const {
  PORT,
  MONGO_URL,
  LOG_LEVEL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  IMAGE_KIT_APP_ID,
  IMAGE_KIT_PRIVATE_KEY,
  IMAGE_KIT_PUBLIC_KEY,
} = envSchema.parse(process.env);

const config = {
  port: PORT,
  mongo_url: MONGO_URL,
  log_level: LOG_LEVEL,
  jwt_secret: JWT_SECRET,
  jwt_expires_in: JWT_EXPIRES_IN,
  google_client_id: "",
  imagekit: {
    public_key: IMAGE_KIT_PUBLIC_KEY,
    private_key: IMAGE_KIT_PRIVATE_KEY,
    app_id: IMAGE_KIT_APP_ID,
  },
};

export default config;
