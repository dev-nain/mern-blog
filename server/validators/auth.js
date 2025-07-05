import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(6).max(50),
  email: z.string().min(3).max(255).regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email address"),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().min(3).max(255).regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email address"),
  password: z.string().min(8),
});

