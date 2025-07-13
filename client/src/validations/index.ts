import { z } from "zod";

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
  "image/gif",
  "image/webp",
];

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

export const IMAGE_SCHEMA = z
  .instanceof(File)
  .refine((file) => ALLOWED_FILE_TYPES.includes(file.type), {
    message: "Invalid image",
  })
  .refine((file) => file.size <= FILE_SIZE_LIMIT, {
    message: "File size should not exceed 5MB",
  });

export const blogSchema = z.object({
  title: z.string().trim().min(3).max(255),
  summary: z.string().trim().max(200),
  thumbnail: IMAGE_SCHEMA,
  tags: z.array(z.string().trim()).max(5),
  content: z.string(),
  type: z.enum(["draft", "publish"]).default("publish"),
});
