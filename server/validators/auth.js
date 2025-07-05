import { z } from "zod";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const registerSchema = z.object({
  name: z.string().min(6).max(50),
  email: z
    .string()
    .min(3)
    .max(255)
    .regex(emailRegex, "Please enter a valid email address"),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(3)
    .max(255)
    .regex(emailRegex, "Please enter a valid email address"),
  password: z.string().min(8),
});
