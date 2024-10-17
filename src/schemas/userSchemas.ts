import { z } from "zod";

export const userSchema = z.object({
  fullName: z.string({ required_error: "fullname is required" }).min(1).max(20),
  username: z.string({ required_error: "username is required" }).min(1).max(10),
  email: z.string({ required_error: "email is requires" }).email(),
  password: z.string({ required_error: "password is required" }).min(1),
});
