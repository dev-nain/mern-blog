import { z } from "zod";

export const paginationParams = z.object({
  page: z.number({ coerce: true }).min(1, "Page must be at least 1").default(1),

  limit: z
    .number({ coerce: true })
    .min(1, "Limit must be at least 1")
    .max(100, "Limit cannot exceed 100")
    .default(10),
});
