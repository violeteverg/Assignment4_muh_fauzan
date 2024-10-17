import { z } from "zod";

export const courseSchema = z.object({
  name: z.string({ required_error: "course name is required" }).min(1).max(100),
  code: z.string({ required_error: "please input 5 characters" }).min(1).max(5),
  price: z.number().int(),
  description: z
    .string({ required_error: "description is required" })
    .min(1)
    .max(250),
  schedules: z
    .array(z.number().int({ message: "schedule ID must be an integer" }))
    .min(1, { message: "at least one schedule ID is required" }),
});
