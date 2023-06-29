import { date, z } from "zod";

export const commentsCreateSchema = z.object({
  comment: z.string(),
});
export const userId = z.object({
  id: z.string().uuid(),
});

export const returnCommentSchema = commentsCreateSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().or(date()),
  user: userId,
});

export const returnPatchComment = returnCommentSchema.omit({ user: true });
