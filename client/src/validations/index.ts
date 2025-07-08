import { z } from "zod";

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const registerSchema = z.object({
  type: z.literal("signup"),
  name: z
    .string()
    .min(6, { message: "Name must be at least 6 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  email: z
    .string()
    .max(255, { message: "Email cannot exceed 255 characters" })
    .regex(emailRegex, { message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const loginSchema = z.object({
  type: z.literal("signin"),
  email: z
    .string()
    .max(255, { message: "Email cannot exceed 255 characters" })
    .regex(emailRegex, { message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const authSchema = z.discriminatedUnion("type", [
  registerSchema,
  loginSchema,
]);
