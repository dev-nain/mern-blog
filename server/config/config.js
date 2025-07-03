import { z } from "zod";
import dotenv from 'dotenv';

dotenv.config()

const envSchema = z.object({
    PORT: z.string().default("8000"),
    LOG_LEVEL: z.string().default("debug"),
    MONGO_URL: z.string()
})

const {PORT, MONGO_URL, LOG_LEVEL} = envSchema.parse(process.env)


const config = {
    port: PORT,
    mongo_url: MONGO_URL,
    log_level: LOG_LEVEL
}

export default config;