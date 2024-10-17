import { z } from "zod";

export const scheduleSchema = z.object({
  date: z.string().datetime(),
});
