import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().trim().min(3).max(255),
  summary: z.string().trim().max(200),
  thumbnail: z.string().trim(),
  tags: z.array(z.string().trim()).max(5),
  content: z.string(),
  type: z.enum(["draft", "publish"]).default("publish"),
});
