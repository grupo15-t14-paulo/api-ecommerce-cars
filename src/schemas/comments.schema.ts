import { z } from "zod";

export const commentsCreateSchema = z.object({
  comment: z.string(),
});
export const userId = z.object({
  id: z.string().uuid(),
});

export const returnCommentSchema = commentsCreateSchema.extend({
  id: z.string().uuid(),
  user: userId,
});

export const returnPatchComment = returnCommentSchema.omit({ user: true });
