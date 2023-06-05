import { z } from "zod";

export const imageCreateSchema = z.object({
  urlImage: z.string().min(1).max(255),
});

export const imageReturnSchema = imageCreateSchema.extend({
  id: z.string().uuid(),
});
