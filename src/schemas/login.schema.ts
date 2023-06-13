import { z } from "zod";

export const createLoginSchema = z.object({
  email: z.string().max(45),
  password: z.string().max(45),
});
