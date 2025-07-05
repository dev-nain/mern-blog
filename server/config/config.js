import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("8000"),
  LOG_LEVEL: z.string().default("debug"),
  MONGO_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default("1d"),
});

const { PORT, MONGO_URL, LOG_LEVEL, JWT_SECRET, JWT_EXPIRES_IN } = envSchema.parse(process.env);

const config = {  
  port: PORT,
  mongo_url: MONGO_URL,
  log_level: LOG_LEVEL,
  jwt_secret: JWT_SECRET,
  jwt_expires_in: JWT_EXPIRES_IN,
  google_client_id: '',
};

export default config;
