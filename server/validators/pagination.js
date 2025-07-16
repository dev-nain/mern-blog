import { z } from "zod";

export const paginationParams = z.object({
  page: z.number({ coerce: true }).default(1),
  limit: z.number({ coerce: true }).default(10),
});
